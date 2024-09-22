import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DropDown from "./DropDown";
import { productCategory } from './../static/data';
 import { IoIosArrowDown } from 'react-icons/io';
 import { IoIosArrowUp } from 'react-icons/io';
const NavbarChild = () => {
  const [open, setOpen] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [selected, setSelected] = useState("Home");
  return (
   <>
 <div onClick={() => setSelected("Home")} className={`${selected == "Home" ? "text-[#00ff00]" : null} lg:mr-3 ml-10 font-sans text-lg font-[500]`}>
              <Link to="/">Home</Link>
               </div>
              <div className="lg:mr-3 ml-10">
              <button onClick={() => setDropDown(!dropDown)}
                className={`${selected == "Products" ? "text-[#00ff00]" : null} flex font-sans text-lg font-[500]`}
              > 
               Products  {dropDown ? ( <IoIosArrowDown
                size={20}
                className=" cursor-pointer mt-1"
                onClick={() => setDropDown(!dropDown)}
              />) : (
                <IoIosArrowUp
                size={20}
                className=" cursor-pointer mt-1"
                onClick={() => setDropDown(!dropDown)}
              />
              )} 
              </button>
             
              {dropDown ? (
                <DropDown
                  categoriesData={productCategory}
                  setDropDown={setDropDown}
                  setSelected={setSelected}
                />
              ) : null}
              </div>
              <div onClick={() => setSelected("Cart")} className={`${selected == "Cart" ? "text-[#00ff00]" : null} lg:mr-3 ml-10 font-sans text-lg font-[500]`}>
              <Link to="/cart-page">Cart</Link>
               </div>
               <div onClick={() => setSelected("Sealer")} className={`${selected == "Sealer" ? "text-[#00ff00]" : null} lg:mr-3 ml-10 font-sans text-lg font-[500]`}>
              <Link to="/sealer">Sealer</Link>
               </div>
           
   </>
  )
}

export default NavbarChild
