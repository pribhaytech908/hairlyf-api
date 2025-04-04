import User from "../models/User.js";
import Product from "../models/Product.js";

export const addToWishlist = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const { productId } = req.body;

        if (!user) return res.status(404).json({ message: "User not found" });

        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: "Product not found" });

        if (user.wishlist.includes(productId)) {
            return res.status(400).json({ message: "Product already in wishlist" });
        }

        user.wishlist.push(productId);
        await user.save();

        return res.status(200).json({ message: "Product added to wishlist", wishlist: user.wishlist });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const removeFromWishlist = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const { productId } = req.body;

        if (!user) return res.status(404).json({ message: "User not found" });

        user.wishlist = user.wishlist.filter((id) => id.toString() !== productId);
        await user.save();

        return res.status(200).json({ message: "Product removed from wishlist", wishlist: user.wishlist });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const getWishlist = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate("wishlist");

        if (!user) return res.status(404).json({ message: "User not found" });

        return res.status(200).json({ wishlist: user.wishlist });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const moveToCart = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const { productId } = req.body;

        if (!user) return res.status(404).json({ message: "User not found" });

        if (!user.wishlist.includes(productId)) {
            return res.status(400).json({ message: "Product not in wishlist" });
        }

        user.wishlist = user.wishlist.filter((id) => id.toString() !== productId);

        user.cart.push({ product: productId, quantity: 1 });
        await user.save();

        return res.status(200).json({ message: "Product moved to cart", wishlist: user.wishlist, cart: user.cart });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};
