import User from "../models/User.js";

/**
 * GET vendor profile
 */
export const getVendorProfile = async (req, res) => {
  try {
    const vendor = await User.findOne({
      _id: req.user.id,
      role: "vendor",
    }).select("-password");

    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    res.json(vendor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * UPDATE vendor profile
 */
export const updateVendorProfile = async (req, res) => {
  try {
    const vendor = await User.findOneAndUpdate(
      { _id: req.user.id, role: "vendor" },
      req.body,
      { new: true }
    ).select("-password");

    res.json(vendor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
