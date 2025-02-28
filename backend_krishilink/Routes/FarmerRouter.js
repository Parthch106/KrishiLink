const ensureAuthenticated = require('../Middlewares/Auth');
const Product = require('../Models/Product');
const router = require('express').Router();

router.get("/", ensureAuthenticated, async (req, res) => {
    try {
        console.log(req.query); 

        const { userId } = req.query; // Extract userId properly
        console.log("User ID from Query:", userId);

        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const products = await Product.find({ userId: userId }); // Fetch only user's products
        console.log("Fetched Products:", products);

        res.json(products);
    } catch (err) {
        console.error("Error fetching products:", err);
        res.status(500).json({ message: "Error fetching products", error: err });
    }
});




module.exports = router;
