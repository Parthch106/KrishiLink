const ensureAuthenticated = require('../Middlewares/Auth');
const Product = require('../Models/Product');
const router = require('express').Router();

// Create new product
router.post('/', ensureAuthenticated, async (req, res) => {
    try {
        console.log("Incoming Data:", req.body);

        // Check if required fields are missing
        const requiredFields = ["name", "price", "image", "farmer", "location", "category", "unit", "stock", "rating", "userId"];
        const missingFields = requiredFields.filter(field => !req.body[field]);

        if (missingFields.length > 0) {
            return res.status(400).json({ 
                message: `Missing required fields: ${missingFields.join(", ")}` 
            });
        }

        const newProduct = new Product(req.body);
        const savedProduct = await newProduct.save();

        console.log("Saved Product:", savedProduct);
        res.status(201).json(savedProduct);
    } catch (error) {
        console.error("Error saving product:", error);
        res.status(500).json({ 
            message: "Error adding product", 
            error: error.message,  
            stack: error.stack
        });
    }
});

// Fetch products (with optional approved filter)
router.get('/', ensureAuthenticated, async (req, res) => {
    try {
        console.log('---- logged in user detail ---', req.user);

        let filter = {};
        if (req.query.approved) {
            filter.approved = req.query.approved === "true"; // convert query string to boolean
        }

        const products = await Product.find(filter);
        console.log(products);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Error fetching products", error });
    }
});

// Fetch only approved products
router.get('/true', ensureAuthenticated, async (req, res) => {
    try {
        const products = await Product.find({ approved: true });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
});

module.exports = router;
