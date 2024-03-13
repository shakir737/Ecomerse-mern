import React, { useState, useEffect } from "react";
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import styles from "../styles/styles";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { addTocart, removeFromCart } from "../../redux/actions/cart";

const Cart = ({ setOpenCart }) => {
  const { getaUser } = useSelector((state) => state.user.user)
  const dispatch = useDispatch();
  const [cart, setCart] = useState(false);


  const removeFromCartHandler = (data) => {
    // dispatch(removeFromCart(data));
  };

  // const totalPrice = cart.reduce(
  //   (acc, item) => acc + item.qty * item.discountPrice,
  //   0
  // );

  const quantityChangeHandler = (data) => {
    // dispatch(addTocart(data));
  };
  useEffect(() => {
     if(getaUser){
      if(!getaUser.cart){
        setCart(false);
      } else {
        getaUser.cart.map((i, index) => {
          if(i.product){
            setCart(true);
          }
            
        })
      }
     }
 }, []);
  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
      <div className="fixed top-0 right-0 h-full w-[100%] 800px:w-[50%] bg-white flex flex-col overflow-y-scroll justify-between shadow-sm">
         { cart ?  (
          <>
            <div>
              <div className="flex w-full justify-end pt-5 pr-5">
                <RxCross1
                  size={25}
                  className="cursor-pointer"
                  onClick={() => setOpenCart(false)}
                />
              </div>
              {/* Item length */}
              <div className={`${styles.noramlFlex} p-4`}>
                <IoBagHandleOutline size={25} />
                <h5 className="pl-2 text-[20px] font-[500]">
                  {getaUser && getaUser.cart.length} items
                </h5>
              </div>

              {/* cart Single Items */}
              <br />
              <div className="w-full border-t">
                {getaUser &&
                  getaUser.cart.map((i, index) => (
                    <CartSingle
                      data={i.product}
                      count={i.count}
                      quantityChangeHandler={quantityChangeHandler}
                      removeFromCartHandler={removeFromCartHandler}
                    />
                  ))}
              </div>
            </div>

            <div className="px-5 mb-3">
              {/* checkout buttons */}
              <Link to="/checkout">
                <div
                  className={`h-[45px] flex items-center justify-center w-[100%] bg-[#e44343] rounded-[5px]`}
                >
                  <h1 className="text-[#fff] text-[18px] font-[600]">
                    Checkout Now (USD$)
                  </h1>
                </div>
              </Link>
            </div>
          </>
        )
        : (
          <div className="w-full h-screen flex items-center justify-center">
            <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3">
              <RxCross1
                size={25}
                className="cursor-pointer"
                onClick={() => setOpenCart(false)}
              />
            </div>
            <h5>Cart Items is empty!</h5>
          </div>
        ) }
      </div>
    </div>
  );
};

const CartSingle = ({ data, count, quantityChangeHandler, removeFromCartHandler }) => {
  const [value, setValue] = useState(count);
  const productState = useSelector((state) => state.product.products);
  const productDetail = productState.find(product => product._id === data);
  const [productTotal, setProductTotal ] = useState(productDetail.price);
  const increment = (val) => {
     if(val < productDetail.quantity){
      setValue(value + 1);
      const current = value + 1;
      const prodTotal = productDetail.price * current;
      setProductTotal(prodTotal);
     }
  };

  const decrement = (val) => {
    if( val > 0){
      setValue(value - 1);
      const current = value - 1;
      const prodTotal = productDetail.price * current;
      setProductTotal(prodTotal);
    }
  };

  return (
    <div className="border-b p-4">
      <div className="w-full flex items-center">
        <div>
          
        </div>
         <img
          src={`${productDetail.imageUrls[0]}`}
          alt=""
          className="w-[130px] h-min ml-2 mr-2 rounded-[5px]"
        /> 
        <div className="pl-[5px]">
          <h1>{productDetail.title}</h1> 
          <h4 className="font-[400] text-[15px] text-[#00000082]">
            {/* ${data.discountPrice} * {value} */}
          </h4>
          <h4 className="font-[600] text-[17px] pt-[3px] text-[#d02222] font-Roboto">
             {productDetail.description}
          </h4>
        </div>
        <div
            className={`bg-[#e44343] border border-[#e4434373] rounded-full w-[25px] h-[25px] ${styles.noramlFlex} justify-center cursor-pointer`}
            
          >
            <HiPlus size={18} color="#fff" onClick={() => increment(value)}/>
          </div>
          <span className="pl-[20px]">{value}</span> 
          <div
            className="bg-[#a7abb14f] ml-[20px] rounded-full w-[25px] h-[25px] flex items-center justify-center cursor-pointer"
           
          >
            <HiOutlineMinus size={16} color="#7d879c"  onClick={() => decrement(value)} />
          </div>
          <div>
           <h3 className="text-[#50C878] mr-[20px] ml-[20px]"> US$ {productDetail.price}</h3>
          </div> =
          <div>
           <h3 className="text-[#50C878] mr-[20px] ml-[20px]"> US$ {productTotal}</h3>
          </div>
        <RxCross1
          className="cursor-pointer"
          onClick={() => removeFromCartHandler(data)}
          title="Clear From Cart"
        />
      </div>
    </div>
  );
};

export default Cart;
