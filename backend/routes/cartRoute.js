
import { express } from "express";
import { cartController } from "../controllers/cartController";

const router = express.Router();

//create cart

router.post('/create',cartController)

export default router;