import cartModel from "../models/cartModel.js"

export const cartController= async (req, res) => {
  try {
    console.log('Received request:', req.body);
    const { productid, User, Name, Price } = req.body;
    //productid:productId,User:User,product:p
  //  {productid:productId,User:User,Name:name,Price:price}
    // Assuming you have a Cart model with fields `product` and `user`
    const newCartItem = new cartModel({
      name: Name,
      price :Price,
      productId: productid,
      userId: User,
    });
    
    // Save the new cart item to the database
    const savedCartItem = await newCartItem.save();
 
 
    // Respond with the saved cart item or a success message
    res.json(savedCartItem);
    console.log("successssssssssssss")
  } catch (error) {
    console.error('Error in /create endpoint:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const cartGetController = async (req,res)=>{
     const productCart = await cartModel.find();
     console.log(productCart)
     res.status(200).send({
      success: true,
      
      message: "ALlcartProducts ",
      productCart
    });
}

