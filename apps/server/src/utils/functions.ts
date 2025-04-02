// types
import { PrismaClient } from "@prisma/client";
import { CartProduct, CartProductWithDetails } from "@oms/types/cart.type";

// @SouZe-San
// Calculate total quantity of products in cart
const calculateTotalQuantity = (cartProducts: CartProduct[]): number => {
  return cartProducts.reduce((sum, item) => sum + item.quantity, 0);
};

// Calculate total items in cart/for Order
const calculateTotalItems = (cartProducts: CartProductWithDetails[] | CartProduct[]): number => {
  return cartProducts.length;
};

// Calculate total amount of products in cart
const calculateTotalAmount = (cartProducts: CartProductWithDetails[]): number => {
  return cartProducts.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
};

//@desc: Update stock in database after order and whenever NEED (*_~)
const stockUpdate = async (prisma: PrismaClient, cartProducts: CartProduct[] | CartProductWithDetails[]) => {
  await Promise.all(
    cartProducts.map((item) =>
      prisma.product.update({
        where: { id: item.productId },
        data: { stock: { decrement: item.quantity } }, // Decrease stock
      })
    )
  );
};

// @SouZe-San
// @useCase: stock availability check
// @desc: Check if order is possible or not
const checkIfOrderPossible = async (cartProducts: CartProductWithDetails[]) => {
  if (cartProducts.length === 0) throw new Error("Cart is empty");
  if (cartProducts.some((item) => item.product.stock < item.quantity)) return false;
  return true;
};

// all exports
export { checkIfOrderPossible, calculateTotalQuantity, calculateTotalAmount, calculateTotalItems, stockUpdate };
