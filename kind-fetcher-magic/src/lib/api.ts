const BASE_URL = "https://astronexus-backend.onrender.com";
const USER_URL = `${BASE_URL}/user`;

const getToken = () => localStorage.getItem("auth_token");

const headers = (auth = false): HeadersInit => {
  const h: HeadersInit = { "Content-Type": "application/json" };
  if (auth) {
    const token = getToken();
    if (token) h["Authorization"] = `Bearer ${token}`;
  }
  return h;
};

const handleRes = async (res: Response) => {
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || data.message || "Request failed");
  return data;
};

// Auth
export const signupBasic = (body: { name: string; email: string; password: string; confirmPassword: string; phone?: string }) =>
  fetch(`${USER_URL}/signup/basic`, { method: "POST", headers: headers(), body: JSON.stringify(body) }).then(handleRes);

export const signupAstrology = (body: Record<string, unknown>) =>
  fetch(`${USER_URL}/signup/astrology`, { method: "POST", headers: headers(true), body: JSON.stringify(body) }).then(handleRes);

export const login = (body: { email: string; password: string }) =>
  fetch(`${USER_URL}/login`, { method: "POST", headers: headers(), body: JSON.stringify(body) }).then(handleRes);

export const loginPhone = (body: { phone: string; password: string }) =>
  fetch(`${USER_URL}/login/phone`, { method: "POST", headers: headers(), body: JSON.stringify(body) }).then(handleRes);

export const refreshToken = (body: { refreshToken: string }) =>
  fetch(`${USER_URL}/refresh-token`, { method: "POST", headers: headers(), body: JSON.stringify(body) }).then(handleRes);

export const logout = () =>
  fetch(`${USER_URL}/logout`, { method: "POST", headers: headers(true) }).then(handleRes);

// Categories
export const getCategories = () =>
  fetch(`${USER_URL}/categories`, { headers: headers() }).then(handleRes);

// Products
export const getProducts = () =>
  fetch(`${USER_URL}/products`, { headers: headers() }).then(handleRes);

export const getProduct = (id: string) =>
  fetch(`${USER_URL}/products/${id}`, { headers: headers() }).then(handleRes);

// Cart
export const getCart = () =>
  fetch(`${USER_URL}/cart`, { headers: headers(true) }).then(handleRes);

export const addToCart = (body: { productId: string; quantity: number }) =>
  fetch(`${USER_URL}/cart/add`, { method: "POST", headers: headers(true), body: JSON.stringify(body) }).then(handleRes);

export const updateCart = (body: { productId: string; quantity: number }) =>
  fetch(`${USER_URL}/cart/update`, { method: "PUT", headers: headers(true), body: JSON.stringify(body) }).then(handleRes);

export const removeFromCart = (productId: string) =>
  fetch(`${USER_URL}/cart/remove/${productId}`, { method: "DELETE", headers: headers(true) }).then(handleRes);

// Orders
export const placeOrder = (body: Record<string, unknown>) =>
  fetch(`${USER_URL}/orders`, { method: "POST", headers: headers(true), body: JSON.stringify(body) }).then(handleRes);

export const getMyOrders = () =>
  fetch(`${USER_URL}/orders/my`, { headers: headers(true) }).then(handleRes);

export const getOrder = (id: string) =>
  fetch(`${USER_URL}/orders/${id}`, { headers: headers(true) }).then(handleRes);

// Addresses
export const getAddresses = () =>
  fetch(`${USER_URL}/addresses`, { headers: headers(true) }).then(handleRes);

export const addAddress = (body: Record<string, unknown>) =>
  fetch(`${USER_URL}/addresses/add`, { method: "POST", headers: headers(true), body: JSON.stringify(body) }).then(handleRes);

export const updateAddress = (id: string, body: Record<string, unknown>) =>
  fetch(`${USER_URL}/addresses/${id}`, { method: "PUT", headers: headers(true), body: JSON.stringify(body) }).then(handleRes);

export const deleteAddress = (id: string) =>
  fetch(`${USER_URL}/addresses/${id}`, { method: "DELETE", headers: headers(true) }).then(handleRes);

// Payments
export const createPayment = (body: Record<string, unknown>) =>
  fetch(`${USER_URL}/payment/create`, { method: "POST", headers: headers(true), body: JSON.stringify(body) }).then(handleRes);

export const verifyPayment = (body: Record<string, unknown>) =>
  fetch(`${USER_URL}/payment/verify`, { method: "POST", headers: headers(true), body: JSON.stringify(body) }).then(handleRes);

// Astrology Services
export const generateBirthChart = (body: {
  name: string;
  gender: string;
  birth_date: { year: number; month: number; day: number };
  birth_time: { hour: number; minute: number; ampm: string };
  place_of_birth: string;
  astrology_type?: string;
  ayanamsa?: string;
}) =>
  fetch(`${BASE_URL}/api/birthchart/generate`, { method: "POST", headers: headers(), body: JSON.stringify(body) }).then(handleRes);

export const askChatbot = (body: { session_id: string; question: string }) =>
  fetch(`${BASE_URL}/api/chatbot/ask`, { method: "POST", headers: headers(true), body: JSON.stringify(body) }).then(handleRes);

export const getRandomTarot = (n = 3) =>
  fetch(`${BASE_URL}/api/tarot/random?n=${n}`, { headers: headers(true) }).then(handleRes);
