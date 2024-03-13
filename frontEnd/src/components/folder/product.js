import React, { useState } from "react";
import '../../css/home.css';
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
//import { addToCart } from './../../../redux/actions/cartActions';
import ReactStars from "react-rating-stars-component";
import wish from "../../images/wish.svg";
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
  AiOutlineEye,
  AiOutlineEyeInvisible
} from "react-icons/ai";
import ProductDetailsCard from "../ProductDetailCard";
export default function Product(Products) {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState();
  const [open, setOpen] = useState(false);
  const [style, setStyle] = useState({display: 'none'});

  const productDetail = (id) => {
    Navigate(`?detail=${id}`);
  }
  
  return (
    <>
   
    <div>
    <div className="card" onMouseEnter={e => {
                     setStyle({display: 'block'});
                 }}
                 onMouseLeave={e => {
                     setStyle({display: 'none'})
                 }} >
    <div style={style} className="wishlist-icon position-absolute ">
            <button className="border-0 bg-transparent ">
              <AiOutlineHeart className="ai-icon"/>
            </button>
            <button className="border-0 bg-transparent ">
              <AiOutlineEye className="ai-icon"  onClick={() => productDetail(Products._id)}/>
            </button>
            <button className="border-0 bg-transparent ">
              <AiOutlineShoppingCart className="ai-icon"/>
            </button>
     </div>
       <img className="product--image" src={Products.avatar} alt="product" /> 

      <div>
      <h2>{Products.title}</h2>   
      <p>{Products.description}</p>   
      <p className="price">${Products.price}</p> 
      <ReactStars
              count={5}
              size={24}
              value={3}
              edit={false}
              activeColor="#ffd700"
            />
     </div>
    
    </div> 
    </div>
    <br />
    {/* {open ? <ProductDetailsCard setOpen={setOpen} data={data} /> : null} */}
  </>
  );
}