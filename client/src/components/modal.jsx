import React, { useState, useEffect } from "react";
import { RxCross1 } from "react-icons/rx";
import Header from "./Header";
import CreateProduct from "./createProduct";
import CreateUser from "./createUser";


const Modal = ({ setOpen, id, setID, setUpdated, child }) => {
  const closeModel = () => {
    setOpen(false);
    setID("");
  }
  return (
    <div className="fixed w-full h-screen top-0 left-0 z-40 flex items-center justify-center ">
          <div className="ml-20 w-[90%] 800px:w-[75%] h-[95vh] overflow-y-scroll overflow-x-scroll 800px:h-[95vh] bg-white dark:bg-[#031156] rounded-md shadow-sm relative p-4"> 
          <div className=" text-black dark:text-white block w-full 800px:flex">

           
            <button  onClick={() => closeModel()}>
          <RxCross1
              size={30}
              className="absolute right-3 top-3 z-50"
             
            />
          </button>
          </div>
          {
           child === "product" && ( <CreateProduct id={id} setID={setID} setOpen={setOpen} setUpdated={setUpdated} />) }
           {
           child === "user" && ( <CreateUser id={id} setID={setID} setOpen={setOpen} setUpdated={setUpdated} />)
           }
         
      </div>
    </div>
  );
};

export default Modal;
