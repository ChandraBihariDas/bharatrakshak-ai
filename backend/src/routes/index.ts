import { Router } from "express";
import { protect } from "../middleware/authMiddleware";
import { authorize } from "../middleware/roleMiddleware";
import authRoutes from "./authRoutes";


const router = Router();
router.get(
  "/admin-test",
  protect,
  authorize("authority"),
  (req, res) => {
    res.json({
      success: true,
      message: "Authority access granted",
    });
  }
);

router.get(
  "/responder-test",
  protect,
  authorize("responder"),
  (req, res) => {
    res.json({
      success: true,
      message: "Responder access granted",
    });
  }
);
router.use("/auth", authRoutes);

router.get("/protected", protect, (req, res) => {
  res.json({
    success: true,
    message: "Protected route accessed",
  });
});

export default router;