import express from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProduct,
  getProductByCategory,
  getProductsByPriceRange,
  getLatestProducts,
  updateStock,
  addProductReview,
  getProductReviews
} from "../controllers/productController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of products
 */
router.get("/products", getProducts);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: A product
 */
router.get("/products/:id", getProductById);

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product (Admin only)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *     responses:
 *       201:
 *         description: Product created
 *       403:
 *         description: Access denied
 */
router.post("/products", protect, isAdmin, createProduct);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Update a product (Admin only)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     requestBody:
 *       required: true
 *     responses:
 *       200:
 *         description: Product updated
 *       403:
 *         description: Access denied
 */
router.put("/products/:id", protect, isAdmin, updateProduct);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete a product (Admin only)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Product deleted
 *       403:
 *         description: Access denied
 */
router.delete("/products/:id", protect, isAdmin, deleteProduct);

/**
 * @swagger
 * /products/search:
 *   get:
 *     summary: Search products by name
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: name
 *         required: true
 *     responses:
 *       200:
 *         description: Matching products
 */
router.get("/products/search", searchProduct);

/**
 * @swagger
 * /products/category:
 *   post:
 *     summary: Get products by category
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *     responses:
 *       200:
 *         description: Products by category
 */
router.post("/products/category", getProductByCategory);

/**
 * @swagger
 * /products/pricerange:
 *   get:
 *     summary: Get products in a price range
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: min
 *         required: true
 *       - in: query
 *         name: max
 *         required: true
 *     responses:
 *       200:
 *         description: Products in price range
 */
router.get("/products/pricerange", getProductsByPriceRange);

/**
 * @swagger
 * /products/latest:
 *   get:
 *     summary: Get latest products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Latest products
 */
router.get("/products/latest", getLatestProducts);

/**
 * @swagger
 * /products/{id}/stock:
 *   patch:
 *     summary: Update stock quantity (Admin only)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     requestBody:
 *       required: true
 *     responses:
 *       200:
 *         description: Stock updated
 *       403:
 *         description: Access denied
 */
router.patch("/products/:id/stock", protect, isAdmin, updateStock);

/**
 * @swagger
 * /products/{id}/reviews:
 *   post:
 *     summary: Add product review (Authenticated users)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     requestBody:
 *       required: true
 *     responses:
 *       200:
 *         description: Review added
 */
router.post("/products/:id/reviews", protect, addProductReview);

/**
 * @swagger
 * /products/{id}/reviews:
 *   get:
 *     summary: Get product reviews
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Reviews list
 */
router.get("/products/:id/reviews", getProductReviews);

export default router;
