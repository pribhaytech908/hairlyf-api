import express from "express";
import {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
  moveToCart,
} from "../controllers/wishlistController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * /api/wishlist/add:
 *   post:
 *     summary: Add a product to the user's wishlist
 *     tags: [Wishlist]
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
 *             properties:
 *               productId:
 *                 type: string
 *                 example: 64e3c19f3f93e23893499a87
 *     responses:
 *       200:
 *         description: Product added to wishlist
 *       400:
 *         description: Product already in wishlist
 *       404:
 *         description: User or Product not found
 *       500:
 *         description: Server error
 */
router.post("/add", protect, addToWishlist);

/**
 * @swagger
 * /api/wishlist/remove:
 *   delete:
 *     summary: Remove a product from the user's wishlist
 *     tags: [Wishlist]
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
 *             properties:
 *               productId:
 *                 type: string
 *                 example: 64e3c19f3f93e23893499a87
 *     responses:
 *       200:
 *         description: Product removed from wishlist
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.delete("/remove", protect, removeFromWishlist);

/**
 * @swagger
 * /api/wishlist:
 *   get:
 *     summary: Get the wishlist of the authenticated user
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Wishlist retrieved successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.get("/", protect, getWishlist);

/**
 * @swagger
 * /api/wishlist/move-to-cart:
 *   post:
 *     summary: Move a product from wishlist to cart
 *     tags: [Wishlist]
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
 *             properties:
 *               productId:
 *                 type: string
 *                 example: 64e3c19f3f93e23893499a87
 *     responses:
 *       200:
 *         description: Product moved to cart
 *       400:
 *         description: Product not in wishlist
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.post("/move-to-cart", protect, moveToCart);

export default router;
