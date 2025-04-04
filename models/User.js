import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const userSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true, lowercase: true },
        password: { type: String, required: true },
        phoneNumber: { type: String, required: true },
        isAdmin: { type: Boolean, default: false },
        isVerified: { type: Boolean, default: false },
        verificationToken: { type: String },
        address: {
            street: { type: String },
            city: { type: String },
            state: { type: String },
            country: { type: String },
            zipCode: { type: String },
        },
        cart: [
            {
                product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
                quantity: { type: Number, required: true, default: 1 },
            }
        ],
        wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
        orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
        resetPasswordToken: { type: String },
        resetPasswordExpire: { type: Date },
    },
    { timestamps: true }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
});

const User = mongoose.model("User", userSchema);
export default User;
