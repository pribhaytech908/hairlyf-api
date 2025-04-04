import Order from "../models/Order.js";
import User from "../models/User.js";
import Product from "../models/Product.js";

export const placeOrder = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate("cart.product");

        if (!user) return res.status(404).json({ message: "User not found" });

        if (user.cart.length === 0) return res.status(400).json({ message: "Cart is empty" });

        const order = new Order({
            user: user._id,
            items: user.cart.map((item) => ({
                product: item.product._id,
                quantity: item.quantity,
                price: item.product.price,
            })),
            totalPrice: user.cart.reduce((total, item) => total + item.product.price * item.quantity, 0),
            status: "Pending",
        });

        await order.save();

        user.cart = [];
        await user.save();

        return res.status(201).json({ message: "Order placed successfully", order });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id }).populate("items.product");

        if (!orders.length) return res.status(404).json({ message: "No orders found" });

        return res.status(200).json({ orders });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate("user", "name email").populate("items.product");

        return res.status(200).json({ orders });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;

        const order = await Order.findById(orderId);

        if (!order) return res.status(404).json({ message: "Order not found" });

        order.status = status;
        await order.save();

        return res.status(200).json({ message: "Order status updated", order });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};
