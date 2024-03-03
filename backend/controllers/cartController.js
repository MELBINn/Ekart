import cartModel from "../models/cartModel.js";

export const cartController = async (req, res) => {
  try {
    console.log("Received request:", req.body);
    const { productid, User, Name, Price } = req.body;
    const existingProduct = await cartModel.findOne({
      productId: productid,
    });
    if (existingProduct) {
      console.warn("product already in cart", existingProduct.name);
      return res.status(409).json({ message: "Product already in cart" });
    }
    const newCartItem = new cartModel({
      name: Name,
      price: Price,
      productId: productid,
      userId: User,
    });

    // Save the new cart item to the database
    const savedCartItem = await newCartItem.save();

    // Respond with the saved cart item or a success message
    res.json(savedCartItem);
    console.log("successssssssssssss");
  } catch (error) {
    console.error("Error in /create endpoint:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const cartGetController = async (req, res) => {
  const productCart = await cartModel.find();
  console.log(productCart);
  res.status(200).send({
    success: true,
    message: "ALlcartProducts ",
    productCart,
  });
};
export const cartRemoveController = async (req, res) => {
  try {
    const { productId } = req.body;

    const removeProduct = await cartModel.findOneAndDelete({ productId });
    if (removeProduct) {
      return res
        .status(200)
        .json({
          success: true,
          message: "Product removed successfully",
          removeProduct,
        });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
