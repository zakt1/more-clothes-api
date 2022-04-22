const router = require("express").Router();
const Product = require("../models/Product");

// Add product
router.post("/", async (req, res) => {

    const newProduct = new Product(req.body)

    try {
        const savedProduct = await newProduct.save()
        res.status(200).json(savedProduct)

    }catch(err){
        res.status(500).json(err)
    }

})


// GET single product

router.get("/find/:id", async (req, res) => {
    try{
        const product = await Product.findById(req.params.id)
        res.status(200).json(product)
    }catch(err) {
        res.status(500).json(err)
    }

})

// GET ALL products

router.get("/", async (req, res) => {
    try{
        let products
        products = await Product.find()
        res.status(200).json(products)

    }catch(err) {
        res.status(500).json(err)
    }
});

module.exports = router