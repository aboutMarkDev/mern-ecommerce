import Order from "../models/ordersModel.js";
import User from "../models/userModel.js";

export const placeOrder = async (req, res) => {
  const { userId, cart, total, address } = req.body;

  try {
    if (!address) {
      return res.status(400).json({ message: "No address provided" });
    }

    const order = await Order.create({
      userId,
      products: cart.map((product) => {
        return { ...product, _id: product.id };
      }),
      totalFee: total,
      paymentMethod: "COD",
      shippingAddress: address,
    });

    if (!order) {
      return res.status(500).json({ message: "Server error" });
    }

    res.status(201).json(order);
  } catch (error) {
    console.log(error);
  }
};

export const getOrderByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const orders = await Order.find({ userId });

    if (!orders) {
      return res.status(400).json({ message: "Order not found" });
    }

    res.status(200).json(orders);
  } catch (error) {
    console.log(error);
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const allOrders = await Order.find();

    if (!allOrders || allOrders.length === 0) {
      return res.status(404).json({ message: "No orders found." });
    }

    // Use Promise.all to handle async map operations
    const result = await Promise.all(
      allOrders.map(async (order) => {
        const user = await User.findById(order.userId);

        const details = {
          orderId: order._id,
          status: order.status,
          total: order.totalFee,
          paymentMethod: order.paymentMethod,
          shippingAddress: order.shippingAddress,
          user: user ? user.name : null, // Check if user exists,
          products: order.products,
        };

        return details;
      })
    );

    // Send result as response
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getOrderById = async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await Order.findById(orderId);

    if (!order) {
      return console.log("Order not found");
    }

    res.status(200).json({
      products: order.products,
      status: order.status,
      totalFee: order.totalFee,
      via: order.paymentMethod,
      address: order.shippingAddress,
      userId: order.userId,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateProductStatus = async (req, res) => {
  const { orderId } = req.params;
  const { updatedStatus } = req.body;

  try {
    const orderToUpdate = await Order.findById(orderId);

    if (!orderToUpdate) {
      return console.log("Order not found");
    }

    orderToUpdate.products = orderToUpdate.products.map((item, i) => {
      return {
        ...item,
        productStatus: updatedStatus[i] || item.productStatus,
      };
    });

    const updatedOrder = await orderToUpdate.save();

    res.status(200).json({ message: "Status updated!" });
  } catch (error) {
    console.log(error);
  }
};

export const updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await Order.findById(orderId);

    // Helper functions to determine status
    const isPending = (items) =>
      items.some(
        (item) =>
          item.productStatus === "toPay" || item.productStatus === "toReceive"
      );

    const isCompleted = (items) =>
      items.every((item) => item.productStatus === "delivered");

    const isCancelled = (items) =>
      items.every((item) => item.productStatus === "cancelled");

    const isPartial = (items) =>
      items.some(
        (item) =>
          item.productStatus === "cancelled" ||
          item.productStatus === "delivered"
      );

    // Determine and update myStatus based on conditions
    if (isPending(order.products)) {
      order.status = "pending";
    } else if (isCompleted(order.products)) {
      order.status = "completed";
    } else if (isCancelled(order.products)) {
      order.status = "cancelled";
    } else if (isPartial(order.products)) {
      order.status = "partial";
    } else {
      order.status = "unknown"; // Handle any unclassified cases
    }

    // Save the updated order status in database
    const updatedOrder = await order.save();

    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
  }
};

export const deleteOrder = async (req, res) => {
  const { orderId } = req.params;

  try {
    const orderToDelete = await Order.findByIdAndDelete(orderId);

    if (!orderToDelete) {
      return res.status(403).json({ message: "Something went wrong." });
    }

    res.status(200).json({ message: "Order deleted!" });
  } catch (error) {
    console.log(error);
  }
};
