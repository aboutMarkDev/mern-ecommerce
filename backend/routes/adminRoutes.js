import express from "express";
import {
  getAdmin,
  logout,
  signIn,
  signUp,
  updateById,
} from "../controllers/adminControllers.js";
import adminProtect from "../middlewares/adminAuth.js";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({});
const upload = multer({ storage });

router.post("/sign-in", signIn);

router.post("/sign-up", signUp);

router.get("/", adminProtect, getAdmin);

router.patch("/:adminId", upload.single("imageUrl"), adminProtect, updateById);

router.post("/sign-out", logout);

export default router;
