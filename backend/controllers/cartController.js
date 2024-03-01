import cartModel from "../models/cartModel.js"

export const cartController= async (req, res) => {
  try {
    console.log('Received request:', req.body);
    const { product, User } = req.body;

    // Assuming you have a Cart model with fields `product` and `user`
    const newCartItem = new cartModel({
      productId: product,
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


