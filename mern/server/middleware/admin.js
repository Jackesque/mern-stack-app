import User from "../models/User.js";

export const verifyAdmin = async (req, res, next) => {
  const user = await User.findById(req.decoded.id);
  try {
    if (!user.isAdmin) {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }
    next();
  } catch (error) {
    console.error("Admin middleware error:", error);
    res.status(500).json({ message: "Server error." });
  }
};
