

import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
    {

      name: {
        type: String,
        required: true,
      },
     
      
      
      price: {
        type: Number,
        required: true,
      },
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