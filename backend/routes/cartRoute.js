
import express  from "express";
import { cartController } from "../controllers/cartController.js";
import { cartGetController } from "../controllers/cartController.js";
import { cartRemoveController } from "../controllers/cartController.js";


const router = express.Router();

//create cart

router.post('/create',cartController)
router.get('/get-cart',cartGetController)
router.post('/remove-item',cartRemoveController)

export default router;