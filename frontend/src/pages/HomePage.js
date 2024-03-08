import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { useAuth } from "../context/auth";
import { Prices } from "../components/Prices";
import { Url } from "../url";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [auth] = useAuth();

  // const userId = auth.userId;
  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(Url+"/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);
  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(Url+`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
 

  //getTOtal COunt
  const getTotal = async () => {
    try {
      const { data } = await axios.get(Url+"/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);
  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(Url+`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // filter by cat
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };
  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  //get filterd product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(Url+"/api/v1/product/product-filters", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  const AddToCart = async (productId,p)=>{
    // console.log(productId)
    //console.log(p)
   
    //console.log(price)
    //add user and product id
    
    // console.log(userId);
    // console.log(auth.user)
    // // console.log(auth.user._id)
   

  
    const name = p.name
    const price = p.price
    const User = auth.user._id
    try{
      const res=await axios.post(Url+"/api/v1/cart/create",{productid:productId,User:User,Name:name,Price:price}
      ,{withCredentials: true})
      toast.success("Item Added to cart");
    }
    catch(err){
      console.error('Error in AddToCart:', err);
    }
  }
  return (
    <Layout title={" Products - Best offers"}>
      <div className="container-fluid row mt-3">
        <div className="col-md-2">
          <h4 className="text-center" style={{ fontFamily: 'YourDesiredFont, sans-serif' }}>Category</h4>
          <div className="d-flex flex-column">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          <h4 className="text-center mt-4" style={{ fontFamily: 'YourDesiredFont, sans-serif' }}> Price</h4>
          <div className="d-flex flex-column">
          <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio> 
                  {/* taking p. as product got mapped */}
                </div>
              ))}
                </Radio.Group>
          </div>
          <div className="d-flex flex-column">
            <button className="btn btn-danger" onClick={() => window.location.reload()}>
              RESET FILTERS
            </button>
          </div>
        </div>
        <div className="col-md-9 offset-1">
          <h1 className="home-page h1" style={{ fontFamily: 'YourDesiredFont, sans-serif' }}>All Products</h1>
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <div className="card m-2 home-page card" style={{ width: "18rem" }} key={p._id}>
               <img
                  src={Url+`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                  height={300} // Overridden by .home-page .card-img-top
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description.substring(0, 30)}...</p>
                  <p className="card-text"> $ {p.price}</p>
                  <button
                    className="btn btn-primary ms-1"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    More Details
                  </button>
                  <button
                    className="btn btn-secondary ms-1"
                    onClick={() => AddToCart(p._id, p)} // Pass the product object
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading ..." : "Loadmore"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;