

import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
    {
        productId:{
            type :String,
            required:true,
        },
    
      userId:{
        type:String,
        required:true,
      }
    }
)
export default mongoose.model("Cart", cartSchema)