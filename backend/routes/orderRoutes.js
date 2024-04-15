const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
// const { isAdmin } = require('../middleware/authMiddleware');
// router.use(isAdmin);

// GET all commandes
router.get("/", orderController.getAllOrders);
//GET order by ID
router.get("/:id", orderController.getOrderById);
//Add new order
router.post("/", orderController.postOrder);
//UPDATE an existing order
router.put("/:id", orderController.updateOrder);
// DELETE an existing order
router.delete("/:id", orderController.deleteOrder);

module.exports = router;
