const router = require("express").Router();
const Order = require("../models/Order");

// CREATE SHOPPING Order 
router.post("/", async (req, res) => {

    const newOrder = new Order(req.body)

    try {
        const savedOrder = await newOrder.save()
        res.status(200).json(savedOrder)

    }catch(err){
        res.status(500).json(err)
    }

})


// UPDATE Order - future admin access only
router.put("/:id", async (req, res) => {

    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedOrder)
    } catch (err) {
        res.status(500).json(err)
    }
})

// DELETE SHOPPING CART

router.delete("/:id", async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json("Order successfully deleted");
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET User's Order

router.get("/find/:userId", async (req, res) => { // :iduserId
    try{
        const orders = await Order.find({userId: req.params.id}); //find() - each user can have multiple orders
        res.status(200).json(orders)
    }catch(err) {
        res.status(500).json(err)
    }

})

// GET ALL Orders from all users - future admin access only

router.get("/", async (req, res) => {
    try{
        const orders = await Order.find()
        res.status(200).json(orders)

    }catch(err) {
        res.status(500).json(err)
    }
});



module.exports = router