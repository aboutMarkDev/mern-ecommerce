import express from "express";
import checkToken from "../middlewares/userAuth.js";
import multer from "multer";
import {
  addProduct,
  deleteProductById,
  editProductById,
  getProductById,
  getProducts,
} from "../controllers/productsControllers.js";

const storage = multer.diskStorage({});
const upload = multer({ storage });

const router = express.Router();

// Create Placed-Order
// route: /orders/placed-order
// access: Private+

// Private
// , upload.single("file")
router.post(
  "/add",
  upload.fields([{ name: "imageUrl", maxCount: 1 }, { name: "varImgUrls" }]),
  addProduct
);

router.patch("/edit/:productId", editProductById);

router.delete("/delete/:productId", deleteProductById);

// Public
router.get("/all", getProducts);

router.get("/:productId", getProductById);

export default router;
