import React from 'react';
import { NavLink, Link } from "react-router-dom";

import { BiCartAdd } from "react-icons/bi";
import { AiFillShopping, AiTwotoneBell} from "react-icons/ai";
import { BsFillSuitHeartFill, BsBriefcaseFill, BsPerson, BsFillGearFill } from "react-icons/bs";
import { Search } from './Search';
const Header = () => {
  return (
    <>
      <header className="header-top-strip py-3">
        <div className="container-xxl">
          <div className="row">
             <div className="col-6">
              <p className="text-white mb-0"> Free Shipping Over $100 & Free Returns</p>   
            </div>
            <div className="col-6">
            <p className="text-end text-white">Hotline: <a className='text-white' href="tel:+91 8264954234"> +91 8264954234</a></p>
            </div>
          </div>
        </div>
      </header>
      <header className="header-upper py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-2">
              <h2>
                <Link className="header-logo">Al Othaim</Link>
              </h2>  
            </div>
            <div className="col-5">
              <Search />
            </div>
            <div className="col-5">
              <div className="header-uper-links d-flex align-items-center justify-content-between">
                <div>
                  <Link className="d-flex align-items-center  ">
                  <AiFillShopping className="react-icons"/><p className="text-[#FFFFFF]">2</p> 
                  </Link>
                </div>
                <div>
                <Link className="d-flex align-items-center ">
                    <BsFillSuitHeartFill className="react-icons"/>
                    
                </Link>
                </div>
                <div>
                <Link className="d-flex align-items-center ">
                    <BsBriefcaseFill className='react-icons'/>
                   
                </Link>
                </div>
                <div>
                <Link className="d-flex align-items-center  ">
                    <AiTwotoneBell className='react-icons'/>
                   
                </Link>
                </div>
                <div>
                <Link className="d-flex align-items-center  ">
                    <BsPerson className='react-icons'/>
                   
                </Link>
                </div>
                <div>
                <Link className="d-flex align-items-center gap-15 ">
                   <BsFillGearFill className='react-icons'/>
                    
                </Link>
                </div>
                <div>
                <Link className="d-flex align-items-center gap-15 ">
                   <BiCartAdd className='react-icons'/>
                    
                </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <header className="header-bottom py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="menu-bottom d-flex align-items-center gap-30 text-white">
                    <div className="link d-flex align-item-center gap-35 ">
                      <NavLink to="/" className="link">Home</NavLink>
                      <NavLink to="/Blogs" className="link">Blogs</NavLink>
                      <NavLink to="/contact" className="link">Contact us</NavLink>
                      <NavLink to="/Products/Grocery" className="link">Grocery</NavLink>
                      <NavLink to="/Products/Electronics" className="link">Electronics</NavLink>
                      <NavLink to="/Products/Appliances" className="link">Appliances</NavLink>
                      <NavLink to="/Travel" className="link">Travel</NavLink>
                      <NavLink to="/Products/Offers" className="link">Offers</NavLink>
                      <NavLink to="/Products/Beauty" className="link">Beauty</NavLink>
                      <NavLink to="/Products/Toys" className="link">Toys</NavLink>
                      <NavLink to="/Products/Mens" className="link">Mens</NavLink>
                      <NavLink to="/Products/Womens" className="link">Womens</NavLink>
                      <NavLink to="/Products/Kids" className="link">Kids</NavLink>


                    

                  </div>

              </div>
            </div>

          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
