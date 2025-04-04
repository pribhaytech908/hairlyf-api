import Product from "../models/Product.js";

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch products", error });
    }
};

export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error fetching product", error });
    }
};

export const createProduct = async (req, res) => {
    const { name, description, price, category, stock, imageUrl } = req.body;

    if (!name || !description || !price || !category || !imageUrl) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const newProduct = new Product({ name, description, price, category, stock, imageUrl });
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(500).json({ message: "Error creating product", error });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: "Error updating product", error });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting product", error });
    }
};

export const searchProduct = async (req, res) => {
    try {
        const { name } = req.query;

        if (!name) return res.status(400).json({ message: "Search query is required" });

        const products = await Product.find(
            { name: { $regex: name, $options: "i" } }
        )
        .limit(10); 
        console.log(products)
        if (!products.length) {
            return res.status(404).json({ message: "No products found" });
        }

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
};
export const getProductByCategory=async (req,res)=> {
    try {
        const {category}=req.body;
        const products=await Product.find({category});
        if(!products.length){
            return res.status(404).json({ message: "No products found in this category" });
        }
        res.json(products)
    } catch (error) {
        res.status(500).json({ message: "Error fetching products", error });
    }
}

export const getProductsByPriceRange = async (req, res) => {
    try {
        const { min, max } = req.query;

        if (!min || !max) {
            return res.status(400).json({ message: "Min and Max price range are required" });
        }

        const products = await Product.find({
            price: { $gte: min, $lte: max }
        });

        if (!products.length) {
            return res.status(404).json({ message: "No products found in this price range" });
        }

        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Error fetching products", error });
    }
};

export const getLatestProducts = async (req, res) => {
    try {
        const latestProducts = await Product.find().sort({ createdAt: -1 }).limit(10);
        res.json(latestProducts);
    } catch (error) {
        res.status(500).json({ message: "Error fetching latest products", error });
    }
};

export const updateStock = async (req, res) => {
    try {
        const { id } = req.params;
        const { quantity } = req.body;

        if (!quantity) {
            return res.status(400).json({ message: "Quantity is required" });
        }

        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        product.stock = quantity;
        await product.save();

        res.json({ message: "Stock updated successfully", product });
    } catch (error) {
        res.status(500).json({ message: "Error updating stock", error });
    }
};

export const addProductReview = async (req, res) => {
    try {
        const { id } = req.params;
        const { rating, comment, userId } = req.body;

        if (!rating || !comment || !userId) {
            return res.status(400).json({ message: "Rating, comment, and user ID are required" });
        }

        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        const review = { userId, rating, comment, date: new Date() };
        product.reviews.push(review);

        await product.save();

        res.json({ message: "Review added successfully", product });
    } catch (error) {
        res.status(500).json({ message: "Error adding review", error });
    }
};

export const getProductReviews = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id).select("reviews");

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json(product.reviews);
    } catch (error) {
        res.status(500).json({ message: "Error fetching reviews", error });
    }
};
 