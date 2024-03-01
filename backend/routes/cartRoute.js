
import express  from "express";
import { cartController } from "../controllers/cartController.js";

const router = express.Router();

//create cart

router.post('/create',cartController)

export default router;