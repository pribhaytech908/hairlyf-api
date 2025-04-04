import mongoose from "mongoose";

const productSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        brand: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        discountPrice: { type: Number, default: 0 },
        discountPercentage: { type: Number, default: 0 },
        category: { type: String, required: true },
        stock: { type: Number, required: true, default: 0 },
        sold: { type: Number, default: 0 },
        imageUrl: { type: String, required: true },
        isFeatured: { type: Boolean, default: false },
        ratings: { type: Number, default: 0 },
        tags: [{ type: String }],
        reviews: [
            {
                userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
                rating: { type: Number, required: true },
                comment: { type: String, required: true },
                date: { type: Date, default: Date.now }
            }
        ],
        variants: [
            {
                color: { type: String },
                size: { type: String },
                stock: { type: Number, default: 0 }
            }
        ]
    },
    { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
