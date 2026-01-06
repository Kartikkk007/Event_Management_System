import express from "express";
import {
  getAllVendors,
  updateVendorStatus,

} from "../controllers/admin.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";
import roleMiddleware from "../middleware/role.middleware.js";

const router = express.Router();

/* ADMIN ONLY ROUTES */

router.get(
  "/vendors",
  authMiddleware,
  roleMiddleware("admin"),
  getAllVendors
);

router.patch(
  "/vendors/:vendorId",
  authMiddleware,
  roleMiddleware("admin"),
  updateVendorStatus
);

router.get(
  "/users",
  authMiddleware,
  roleMiddleware("admin"),
  
);

export default router;
