import express from "express";
import {
  getVendorProfile,
  updateVendorProfile,
} from "../controllers/vendor.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";
import roleMiddleware from "../middleware/role.middleware.js";

const router = express.Router();

/* VENDOR ONLY ROUTES */

router.get(
  "/profile",
  authMiddleware,
  roleMiddleware("vendor"),
  getVendorProfile
);

router.put(
  "/profile",
  authMiddleware,
  roleMiddleware("vendor"),
  updateVendorProfile
);

export default router;
