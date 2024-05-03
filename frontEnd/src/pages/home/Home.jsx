import React from 'react'
import Banner from '../../components/Banner'
import Catagories from './Catagories'
import Testimonials from './Testimonials'
import OurServices from './OurServices'
import PopularProducts from './Popular'
import DiscountProducts from './Discount'
import OffersProducts from './Offer'
import  { useContext, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ProductDetailsCard from '../../components/productDetail'
import { useSearchParams } from "react-router-dom";
const Home = () => {
  const [searchparams] = useSearchParams();
  const [open,setOpen] = useState(false);
  const [id, setID] = useState();
  const product = searchparams.get("id");

  useEffect(() => {
    if(product){  
    setOpen(true);
    setID(product);
    }
    else{
    }
  }, [product])
  return (
    <>
     { product && (
      <ProductDetailsCard open={open} setOpen={setOpen} detail={id} setID={setID}/>
    ) } 
    <div>
       <Banner/>
       <PopularProducts/>
       <DiscountProducts/>
       <OffersProducts/>
       <OurServices/>
    </div>

    </>
   
  )
}

export default Home