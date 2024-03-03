import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { Url } from "../url";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CartPage = () => {
  const [auth, setAuth] = useAuth(false);
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  //total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };

  //get cart
  console.log(cart);
  //because the page need to refres to add products after eact cart updation
  const getAllCart = async () => {
    try {
      const { data } = await axios.get(Url + "/api/v1/cart/get-cart");
      if (data?.success) {
        console.log(data.productCart);
        setCart(data.productCart);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllCart();
  }, []);

  //detele item
  const removeCartItem = async (proId) => {
    try {
      console.log(proId);

      const response = await axios.post(Url + "/api/v1/cart/remove-item", {
        productId: proId,
      });

      if (response.data.success) {
        // Update cart state based on response
        setCart((prevCart) =>
          prevCart.filter((item) => item.productId !== proId)
        );
      } else {
        // Handle error cases, potentially display error message
        console.error("Failed to remove item:", response.data.message);
      }
    } catch (error) {
      console.error("API request failed:", error);
      // Handle network errors or API request failures
    }
  };

 
  return (
    <Layout>
      {auth.token ? (
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="text-center bg-light p-2 mb-1">
                {`Hello ${auth?.token && auth?.user?.name}`}
              </h1>
              <h4 className="text-center">
                {cart?.length
                  ? `You Have ${cart.length} items in your cart ${
                      auth?.token ? "" : "please login to checkout"
                    }`
                  : " Your Cart Is Empty"}
              </h4>
            </div>
          </div>
          <div className="row">
            <div className="col-md-8">
              {cart?.map((p) => (
                <div className="row mb-2 p-3 card flex-row">
                  <div className="col-md-4">
                    <img
                      src={Url + `/api/v1/product/product-photo/${p.productId}`}
                      className="card-img-top"
                      alt={p.name}
                      width="100px"
                      height={"100px"}
                    />
                  </div>
                  <div className="col-md-8">
                    <p>{p.name}</p>
                    {/* <p>{p.description.substring(0, 30)}</p> */}
                    <p>Price : {p.price}</p>
                    <button
                      className="btn btn-danger"
                      onClick={() => removeCartItem(p.productId)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-md-4 text-center">
              <h2>Cart Summary</h2>
              <p>Total | Checkout | Payment</p>
              <hr />
              <h4>Total : {totalPrice()} </h4>
              {auth?.user?.address ? (
                <>
                  <div className="mb-3">
                    <h4>Current Address</h4>
                    <h5>{auth?.user?.address}</h5>
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>
                  </div>
                </>
              ) : (
                <div className="mb-3">
                  {auth?.token ? (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>
                  ) : (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() =>
                        navigate("/login", {
                          state: "/cart",
                        })
                      }
                    >
                      Plase Login to checkout
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <h1>Login to access cart</h1>
      )}
    </Layout>
  );
};

export default CartPage;
