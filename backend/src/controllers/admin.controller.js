import User from "../models/User.js";

/**
 * GET all vendors
 */
export const getAllVendors = async (req, res) => {
  try {
    const vendors = await User.find({ role: "vendor" }).select("-password");
    res.json(vendors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * APPROVE / BLOCK vendor
 */
export const updateVendorStatus = async (req, res) => {
  try {
    const { vendorId } = req.params;
    const { status } = req.body;

    if (!["approved", "blocked"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const vendor = await User.findOneAndUpdate(
      { _id: vendorId, role: "vendor" },
      { status },
      { new: true }
    ).select("-password");

    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    res.json({
      message: `Vendor ${status} successfully`,
      vendor,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
