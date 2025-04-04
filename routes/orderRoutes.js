import express from "express";
import {
  placeOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * /api/orders/place:
 *   post:
 *     summary: Place a new order for the authenticated user
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Order placed successfully
 *       400:
 *         description: Cart is empty
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.post("/place", protect, placeOrder);

/**
 * @swagger
 * /api/orders/user:
 *   get:
 *     summary: Get orders of the authenticated user
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user orders
 *       404:
 *         description: No orders found
 *       500:
 *         description: Server error
 */
router.get("/user", protect, getUserOrders);

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get all orders (Admin only)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all orders
 *       500:
 *         description: Server error
 */
router.get("/", protect, isAdmin, getAllOrders);

/**
 * @swagger
 * /api/orders/update-status/{orderId}:
 *   patch:
 *     summary: Update the status of an order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the order to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 example: "Shipped"
 *     responses:
 *       200:
 *         description: Order status updated
 *       404:
 *         description: Order not found
 *       500:
 *         description: Server error
 */
router.patch("/update-status/:orderId", protect, isAdmin, updateOrderStatus);

export default router;
