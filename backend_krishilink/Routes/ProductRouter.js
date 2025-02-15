const ensureAuthenticated = require('../Middlewares/Auth');
const Product = require('../Models/Product');
const router = require('express').Router();

router.post('/', ensureAuthenticated, async (req, res) => {
    try {
        console.log("Incoming Data:", req.body); // Log frontend data

        const newProduct = new Product(req.body);
        const savedProduct = await newProduct.save();

        console.log("Saved Product:", savedProduct);
        res.status(201).json(savedProduct);
    } catch (error) {
        console.error("Error saving product:", error);
        res.status(500).json({ 
            message: "Error adding product", 
            error: error.message,  
            stack: error.stack             });
    }
});

router.get('/', ensureAuthenticated, async (req, res) => {
    try {
        console.log('---- logged in user detail ---', req.user);
        const products = await Product.find();
        console.log(products);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Error fetching products", error });
    }
});

module.exports = router;
