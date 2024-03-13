import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { BsCartPlus } from "react-icons/bs";
import styles from "../styles/styles";
import { AiOutlineHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
// import { removeFromWishlist } from "../../redux/actions/wishlist";
// import { addTocart } from "../../redux/actions/cart";

const Wishlist = ({ setOpenWishlist }) => {
  const { getaUser } = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const removeFromWishlistHandler = (data) => {
    // dispatch(removeFromWishlist(data));
  };

  const addToCartHandler = (data) => {
    const newData = {...data, qty:1};
    // dispatch(addTocart(newData));
    setOpenWishlist(false);
  }
 
  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
      <div className="fixed top-0 right-0 h-full w-[80%] overflow-y-scroll 800px:w-[25%] bg-white flex flex-col justify-between shadow-sm">
        {getaUser ? (
          <>
            <div>
              <div className="flex w-full justify-end pt-5 pr-5">
                <RxCross1
                  size={25}
                  className="cursor-pointer"
                  onClick={() => setOpenWishlist(false)}
                />
              </div>
              {/* Item length */}
              <div className={`${styles.noramlFlex} p-4`}>
                <AiOutlineHeart size={25} />
                <h5 className="pl-2 text-[20px] font-[500]">
                  {getaUser.wishlist.length} items
                </h5>
              </div>

              {/* cart Single Items */}
              <br />
              <div className="w-full border-t">
                {/* {getaUser &&
                  getaUser.Wishlist.map((data, index) => (
                    <CartSingle key={index} data={data} removeFromWishlistHandler={removeFromWishlistHandler} addToCartHandler={addToCartHandler} />
                  ))} */}
                  {getaUser && getaUser.wishlist.map((i, index) => (
                     <CartSingle data={i}  removeFromWishlistHandler={removeFromWishlistHandler} addToCartHandler={addToCartHandler}/>
                     
                  ))}
              </div>
            </div>
          </>
        )
        : (
          <div className="w-full h-screen flex items-center justify-center">
            <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3">
              <RxCross1
                size={25}
                className="cursor-pointer"
                onClick={() => setOpenWishlist(false)}
              />
            </div>
            <h5>PLEASE LOGIN TO SEE YOUR WISHLIST</h5>
          </div>
        ) }
      </div>
    </div>
  );
};

const CartSingle = ({ data, removeFromWishlistHandler, addToCartHandler }) => {
  const [value, setValue] = useState(1);
  const productState = useSelector((state) => state.product.products);
  const productDetail = productState.find(product => product._id === data)
  return (
     <div className="border-b p-4">
      <div className="w-full 800px:flex items-center">
         <RxCross1 className="cursor-pointer 800px:mb-['unset'] 800px:ml-['unset'] mb-2 ml-2"
         onClick={() => removeFromWishlistHandler(data)}
         />
         <img
           src={`${productDetail.imageUrls[0]}`}
           alt=""
           className="w-[130px] h-min ml-2 mr-2 rounded-[5px]"
         /> 

        <div className="pl-[5px]">
           <h1>{productDetail.title}</h1>
           <h4 className="font-[600] pt-3 800px:pt-[3px] text-[17px] text-[#d02222] font-Roboto">
             US${productDetail.price}
           </h4>
         </div>
         <div>
           <BsCartPlus size={20} className="cursor-pointer" tile="Add to cart"
            onClick={() => addToCartHandler(data)}
           />
        </div>
       </div>
    </div>
  );
};

export default Wishlist;
