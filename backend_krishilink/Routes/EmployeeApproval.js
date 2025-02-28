const ensureAuthenticated = require('../Middlewares/Auth');
const mongoose = require('mongoose');
const express = require('express');
const Product = require('../Models/Product'); 
const router = express.Router();

// Employee approves a product
router.put('/:productId', ensureAuthenticated, async (req, res) => {
    const { productId } = req.params;

    try {
        // Validate productId format
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ message: "Invalid product ID" });
        }

        // Find product
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Approve the product
        product.approved = true;
        await product.save();

        return res.status(200).json({
            message: "Product approved successfully",
            product
        });
    } catch (error) {
        console.error("Error approving product:", error);

        return res.status(500).json({ 
            message: "Internal server error", 
            error: error.message 
        });
    }
});

router.get('/false', ensureAuthenticated,  async (req, res) => {
    try {
        const approved = req.query.approved = "false";
        const products = await Product.find({ approved });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
});


module.exports = router;
