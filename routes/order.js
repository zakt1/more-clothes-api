const router = require("express").Router();
const cartPriceSchema = require("../models/Order");
const Order = cartPriceSchema;




// CREATE SHOPPING Order 
router.post("/", async (req, res) => {

    const newOrder = new Order(req.body)
    // const totalPrice = 0

    try {
        const savedOrder = await newOrder.save()

        
        totalPrice = 0
        const subtotalPrice = savedOrder.products.forEach(product => {
                    const total = product.prodQuantity * product.price
                    totalPrice += total
                });
         if(totalPrice > 60) totalPrice -= 8 //shipping discount
         await Order.updateOne({_id: savedOrder["_id"]},
            {
             $set: {totalP: totalPrice}
         })
         
            
         res.status(200).json(totalPrice)
         console.log(savedOrder["_id"], "<< post res")
         console.log(savedOrder.totalP, '<totalP')
    

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