import { Router } from "express";
import { register } from "../controllers/authController";

import {
  citizenLogin,
  responderLogin,
  authorityLogin,
} from "../controllers/authController";

const router = Router();

router.post("/citizen-login", citizenLogin);
router.post("/responder-login", responderLogin);
router.post("/authority-login", authorityLogin);
router.post("/register", register);

export default router;