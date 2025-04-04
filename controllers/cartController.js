import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

// Add item to cart
export const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.user.id;

        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            cart = new Cart({ user: userId, items: [] });
        }

        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: "Product not found" });

        const existingItem = cart.items.find(item => item.product.toString() === productId);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.items.push({ product: productId, quantity });
        }

        await cart.save();
        res.status(200).json({ message: "Item added to cart", cart });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Get user's cart
export const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id }).populate("items.product");
        if (!cart) return res.status(404).json({ message: "Cart is empty" });

        res.status(200).json({ cart });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Remove item from cart
export const removeFromCart = async (req, res) => {
    try {
        const { productId } = req.params;
        const userId = req.user.id;

        const cart = await Cart.findOne({ user: userId });
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        cart.items = cart.items.filter(item => item.product.toString() !== productId);

        await cart.save();
        res.status(200).json({ message: "Item removed from cart", cart });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Update cart item quantity
export const updateCartQuantity = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.user.id;

        const cart = await Cart.findOne({ user: userId });
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        const item = cart.items.find(item => item.product.toString() === productId);
        if (!item) return res.status(404).json({ message: "Product not found in cart" });

        item.quantity = quantity;
        await cart.save();

        res.status(200).json({ message: "Cart updated", cart });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Clear user's cart
export const clearCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const cart = await Cart.findOne({ user: userId });

        if (!cart) return res.status(404).json({ message: "Cart not found" });

        cart.items = [];
        await cart.save();

        res.status(200).json({ message: "Cart cleared" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
