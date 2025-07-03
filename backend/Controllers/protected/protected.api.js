const Product = require('../../Models/product');

const protected = async (req, res) => {
    try {
        const products = await Product.find();
        res.json({ products }); // ✅ CORRECT KEY: 'products'
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch products', error: err.message });
    }
};

module.exports = {
    protected,
};