import express from "express";
import {
  addToCart,
  getCart,
  removeFromCart,
  updateCartQuantity,
  clearCart,
} from "../controllers/cartController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * /api/cart/add:
 *   post:
 *     summary: Add item to cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - quantity
 *             properties:
 *               productId:
 *                 type: string
 *               quantity:
 *                 type: number
 *     responses:
 *       200:
 *         description: Item added to cart
 *       500:
 *         description: Server error
 */
router.post("/add", protect, addToCart);

/**
 * @swagger
 * /api/cart:
 *   get:
 *     summary: Get current user's cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns user's cart
 *       404:
 *         description: Cart is empty
 *       500:
 *         description: Server error
 */
router.get("/", protect, getCart);

/**
 * @swagger
 * /api/cart/remove/{productId}:
 *   delete:
 *     summary: Remove item from cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         schema:
 *           type: string
 *         required: true
 *         description: Product ID to remove from cart
 *     responses:
 *       200:
 *         description: Item removed from cart
 *       404:
 *         description: Cart not found
 *       500:
 *         description: Server error
 */
router.delete("/remove/:productId", protect, removeFromCart);

/**
 * @swagger
 * /api/cart/update:
 *   patch:
 *     summary: Update quantity of a cart item
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - quantity
 *             properties:
 *               productId:
 *                 type: string
 *               quantity:
 *                 type: number
 *     responses:
 *       200:
 *         description: Cart updated
 *       404:
 *         description: Product not found in cart
 *       500:
 *         description: Server error
 */
router.patch("/update", protect, updateCartQuantity);

/**
 * @swagger
 * /api/cart/clear:
 *   delete:
 *     summary: Clear user's entire cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cart cleared
 *       404:
 *         description: Cart not found
 *       500:
 *         description: Server error
 */
router.delete("/clear", protect, clearCart);

export default router;
