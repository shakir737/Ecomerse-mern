import React, { useState, useRef } from "react";
import { useEffect } from 'react';
import { Link } from "react-router-dom";
import Marquee from "react-fast-marquee";
import BlogCard from "../components/BlogCard";
import ProductCard from "../components/ProductCard";
import SpecialProduct from "../components/SpecialProduct";
import Container from "../components/Container";
import { getProduct, getProducts } from '../features/product/productSlice';
import Slide from '../components/Slides/Slide';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import '../css/home.css';
import queryString from 'query-string';
import { useSearchParams } from "react-router-dom";
import ProductDetailsCard from "../components/ProductDetailCard";
const Home = () => {

  const productState = useSelector((state) => state.product.products);
  const [parameters, setparameters] = useState();
  const [searchparams] = useSearchParams();
  const [open, setOpen] = useState(false);
  const [item, setItem] = useState(null);
  const product = useRef(null);
  const category = searchparams.get("category") || "";
  const detail = searchparams.get("detail") || "";
   useEffect(() => {
      if(detail){  
      setOpen(true);
      productDetail(detail);
      }
      else{
      console.log(detail)}
  }, [detail])
  const productDetail = (id) => {
    const filterProduct =  productState.filter(product => product._id === id);
    product.current = filterProduct;
    
  }
  const dispatch = useDispatch();
  useEffect(() => {
      dispatch(getProducts())
  }, [])

  const Mobiles =  productState.filter(product => product.category === "Mobiles");
  const Appliances =  productState.filter(product => product.category === "Appliances");
  const LapTops =  productState.filter(product => product.category === "Laptops");

  const porductInfo = product.current;

  return (
    <>
      {  detail ? (
      <Container class1="special-wrapper py-5 home-wrapper-2">
         <ProductDetailsCard setOpen={setOpen} open={open} />  
      </Container>
     ): null } 
     {  category == "" || category == "Mobiles" ? (
      <Container class1="special-wrapper py-5 home-wrapper-2">
      <h3 className="section-heading">Mobiles</h3>
         <div className="row">
           <div className="col-12">
            <div className="flex-wrap">
              <div className="carousel">   
              <Slide  Products={Mobiles}/>
            </div>
             </div>
          </div>
        </div> 
      </Container>
     ): null }
      
     {  category == "" || category == "Appliances" ? (
      <Container class1="special-wrapper py-5 home-wrapper-2">
      <h3 className="section-heading">Appliances</h3>
         <div className="row">
           <div className="col-12">
            <div className="flex-wrap">
              <div className="carousel">   
              <Slide  Products={Appliances}/>
            </div>
             </div>
          </div>
        </div> 
      </Container>
     ): null}

     {  category == "" || category == "Laptops" ? (
      <Container class1="special-wrapper py-5 home-wrapper-2">
      <h3 className="section-heading">LapTops</h3>
         <div className="row">
           <div className="col-12">
            <div className="flex-wrap">
              <div className="carousel">   
              <Slide  Products={LapTops}/>
            </div>
             </div>
          </div>
        </div> 
      </Container>
     ): null}
      <Container class1="special-wrapper py-5 home-wrapper-2">
      <h3 className="section-heading">Special Offers & Discount</h3>
         <div className="row">
           <div className="col-12">
            <div className="flex-wrap">
              <div className="carousel">   
              <Slide  Products={productState}/>
            </div>
             </div>
          </div>
        </div> 
      </Container>
      {/* <Container class1="featured-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Featured Collection</h3>
          </div>
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </Container> */}

     

      
      <Container class1="marque-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="marquee-inner-wrapper card-wrapper">
              <Marquee className="d-flex">
                <div className="mx-4 w-25">
                  <img src="images/brand-01.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-02.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-03.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-04.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-05.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-06.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-07.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-08.png" alt="brand" />
                </div>
              </Marquee>
            </div>
          </div>
        </div>
      </Container>

    </>
  );
};

export default Home;
