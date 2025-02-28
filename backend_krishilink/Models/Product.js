const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    farmer: { type: String, required: true },
    location: { type: String, required: true },
    category: { type: String, required: true },
    unit: { type: String, required: true },
    stock: { type: Number, required: true },
    rating: { type: Number, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true } ,
    approved: { type: Boolean, default: false },
});

module.exports = mongoose.model('Product', ProductSchema);
