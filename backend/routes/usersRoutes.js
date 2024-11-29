import express from "express";
import {
  addUserAddress,
  deleteOneAddress,
  deleteUserById,
  getAllUsers,
  getCurrentUser,
  getUserById,
  login,
  logout,
  register,
  updateUserById,
} from "../controllers/userControllers.js";
import checkToken from "../middlewares/userAuth.js";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({});
const upload = multer({ storage });

router.get("/all", getAllUsers);

router.post("/sign-up", register);

router.post("/sign-in", login);

router.post("/logout", logout);

router.post("/addAddress/:userId", addUserAddress);

router.delete("/deleteAddress/:userId", deleteOneAddress);

router.get("/current", checkToken, getCurrentUser);

router.get("/:id", checkToken, getUserById);

router.patch("/:id", upload.single("imageUrl"), updateUserById);

router.delete("/delete/:userId", deleteUserById);

// Do this if you've want to strengthen the security
// router.post("/refresh", getNewAccessToken);

// router.route('/profile').get().patch();

export default router;
