import mongoose from "mongoose";

const productSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        category: { type: String, enum: ['men', 'women'], required: true }, 
        stock: { type: Number, required: true, default: 0 },
        images: [{ type: String, required: true }],  
        isFeatured: { type: Boolean, default: false },
        ratings: { type: Number, default: 0 },
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
                color: { type: String, required: true },
                size: { type: String, required: true },
                stock: { type: Number, default: 0 },
                variantPrice: { type: Number, default: 0 }
            }
        ],
    },
    { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
