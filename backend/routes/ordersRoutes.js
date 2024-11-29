import express from "express";
import checkToken from "../middlewares/userAuth.js";
import {
  deleteOrder,
  getAllOrders,
  getOrderById,
  getOrderByUserId,
  placeOrder,
  updateOrderStatus,
  updateProductStatus,
} from "../controllers/ordersControllers.js";

const router = express.Router();

// Create Placed-Order
// route: /orders/placed-order
// access: Private
router.get("/all", getAllOrders);

router.get("/:orderId", getOrderById);

router.post("/placed-order", checkToken, placeOrder);

router.get("/user/:userId", getOrderByUserId);

router.patch("/statusUpdate/:orderId", updateProductStatus);

router.patch("/checkAndUpdateOrder/:orderId", updateOrderStatus);

router.delete("/delete/:orderId", deleteOrder);

export default router;
