const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');
const ProductRouter = require('./Routes/ProductRouter');
const FarmerRouter = require('./Routes/FarmerRouter'); // Import the Farmer Router

require('dotenv').config();
require('./Models/db');

const PORT = 8080;

app.use(bodyParser.json());
app.use(cors());

app.use('/auth', AuthRouter);
app.use('/products', ProductRouter);
app.use('/farmers', FarmerRouter); // Add the Farmer Routes

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
