import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, Stars } from "@react-three/drei";
import * as THREE from "three";

const AnimatedOrb = () => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const glowRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.15;
      meshRef.current.rotation.x = Math.sin(t * 0.1) * 0.1;
    }
    if (glowRef.current) {
      glowRef.current.scale.setScalar(1.35 + Math.sin(t * 0.8) * 0.05);
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <group>
        {/* Inner orb */}
        <Sphere ref={meshRef} args={[1.4, 64, 64]}>
          <MeshDistortMaterial
            color="#7c3aed"
            roughness={0.15}
            metalness={0.9}
            distort={0.25}
            speed={2}
            envMapIntensity={1}
          />
        </Sphere>

        {/* Outer glow shell */}
        <Sphere ref={glowRef} args={[1.55, 32, 32]}>
          <meshBasicMaterial
            color="#a855f7"
            transparent
            opacity={0.08}
            side={THREE.BackSide}
          />
        </Sphere>

        {/* Ring */}
        <mesh rotation={[Math.PI / 2.5, 0, 0]}>
          <torusGeometry args={[2.1, 0.03, 16, 100]} />
          <meshBasicMaterial color="#c084fc" transparent opacity={0.5} />
        </mesh>

        {/* Second ring */}
        <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
          <torusGeometry args={[2.3, 0.015, 16, 100]} />
          <meshBasicMaterial color="#f59e0b" transparent opacity={0.3} />
        </mesh>
      </group>
    </Float>
  );
};

const ParticleField = () => {
  const count = 200;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 3 + Math.random() * 4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  const ref = useRef<THREE.Points>(null!);
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.getElapsedTime() * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#c084fc" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
};

const CosmicOrb3D = () => {
  return (
    <div className="w-full h-[400px] md:h-[500px]">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={1} color="#a855f7" />
        <directionalLight position={[-3, -2, 4]} intensity={0.5} color="#3b82f6" />
        <pointLight position={[0, 0, 3]} intensity={0.8} color="#f59e0b" />
        <AnimatedOrb />
        <ParticleField />
        <Stars radius={50} depth={40} count={800} factor={2} fade speed={0.5} />
      </Canvas>
    </div>
  );
};

export default CosmicOrb3D;
