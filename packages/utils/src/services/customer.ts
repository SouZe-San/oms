import axios from "axios";
import { CartUpdateBody } from "@oms/types/api.type";
import { OrderStatus } from "@oms/types/order.type";

const BASE_URL = "http://localhost:5000/api";
const customerApi = axios.create({
  baseURL: BASE_URL + "/customer",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Products Routes
export const getProducts = async () => customerApi.get("/products");
export const getProductDetails = async (id: string) => customerApi.get(`/product/${id}`);
export const searchProducts = async (name: string) => customerApi.get(`/products/search/${name}`);

// Cart Routes
export const getCartProducts = async () => customerApi.get("/cart");
export const updateCart = async (cartBody: CartUpdateBody) => customerApi.put("cart", cartBody);

// Order Routes
export const getAllOrders = async () => customerApi.get("/orders");
export const getOrderDetails = async (id: string) => customerApi.get(`/order/${id}`);
export const createOrder = async (isOnlinePayment: boolean = false) => customerApi.post("/order", { isOnlinePayment });
export const updateOrder = async (id: string, orderData: { status: OrderStatus }) =>
  customerApi.put(`/order/${id}`, orderData);

//& This endpoint Gonna be Use in later Stage
export const deleteOrder = async (id: string) => customerApi.delete(`/order/${id}`);
