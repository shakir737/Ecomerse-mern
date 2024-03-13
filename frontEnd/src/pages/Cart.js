import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import BreadCrumb from "../components/BreadCrumb";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import Meta from "../components/Meta";
import watch from "../images/watch.jpg";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { getuser, updateCart } from "../features/user/userSlice";
const Cart = () => {
  const { getaUser } = useSelector((state) => state.user.user)
  const productState = useSelector((state) => state.product.products);
  const [displayCheckout, setDisplayCheckout] = useState(false);
  const [GrandTotal, setGrandTotal] = useState(1);
  const [id, setID] = useState("65d75db5a46392bcb41eb1bd");
  const [total, setTotal] =useState(1);
  const calculateTotal = () => {
  let productTotal = 0;
  getaUser.cart.map((i,index) => {
   i.cartDetail.map((i, index) =>{
    const result = i.orderQuantity * i.price;
    productTotal = productTotal + result;
    setGrandTotal(productTotal);
   })
  })
  setDisplayCheckout(true);
  }
  const Total = (id) => {
    const data =  productState.filter(product => product._id === id);
    const Total = data[0].quantity * data[0].price
    return Total
  }
  return (
    <>
      <Meta title={"Cart"} />
      <BreadCrumb title="Cart" />
      <Container class1="cart-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="cart-header py-3 d-flex justify-content-between align-items-center">
              <h4 className="cart-col-1">Product</h4>
              <h4 className="cart-col-2">Price</h4>
              <h4 className="cart-col-3">Quantity</h4>
              <h4 className="cart-col-4">Total</h4>
              <h4 className="cart-col-5">Actions</h4>
            </div>
            {getaUser &&
                  getaUser.cart.map((cart, index) => (
                    
                    cart.cartDetail.map((i, index) => (
                      <CartSingle
                      data={cart.product}
                      price={i.price}
                      count={i.orderQuantity}
                      color={i.color}
                      quantity={i.quantity}
                      setGrandTotal={setGrandTotal}
                      setDisplayCheckout={setDisplayCheckout}
                      // quantityChangeHandler={quantityChangeHandler}
                      // removeFromCartHandler={removeFromCartHandler}
                    />
                    ))
                  
            ))}
          </div>
         { displayCheckout ? (
          <div className="col-12 py-2 mt-4">
            <div className="d-flex justify-content-between align-items-baseline">
              <Link to="/" className="button">
                Continue To Shopping
              </Link>
              <div className="d-flex flex-column align-items-end">
                <h4>GrandTotal: US$ {GrandTotal}</h4>
                <p>Taxes and shipping calculated at checkout</p>
                <Link to="/checkout" className="button">
                  Checkout
                </Link>
              </div>
            </div>
          </div>
         ) : (
          <div className="d-flex flex-column align-items-left button">
          <button onClick={() => calculateTotal()}>Calculate Grand Total</button>
          </div>
         )}
        </div>
      </Container>
    </>
  );
};

const CartSingle = ({data,price,color, quantity, count, removeFromCartHandler}) => {
  const [value, setValue] = useState(count);
  const productState = useSelector((state) => state.product.products);
  const { getaUser } = useSelector((state) => state.user.user)
  const productDetail = productState.find(product => product._id === data)
  const [productTotal, setProductTotal ] = useState(price * count)
  const dispatch = useDispatch();
  const increment = (val, id, color) => {
    if(val < quantity){
     setValue(value + 1);
     const current = value + 1;
     const prodTotal = price * current;
     setProductTotal(prodTotal);
     const data = { current, id, color};
     dispatch(updateCart(data));
     dispatch(getuser(getaUser._id));
    } 
 };

 const decrement = (val, id , color) => {
   if( val > 0){
     setValue(value - 1);
     const current = value - 1;
     const prodTotal = price * current;
     setProductTotal(prodTotal);
     const data = { current, id, color};
     dispatch(updateCart(data));
     dispatch(getuser(getaUser._id));
   }
 };

return(
<>
<div className="cart-data py-3 mb-2 d-flex justify-content-between align-items-center">
              <div className="cart-col-1 gap-15 d-flex align-items-center">
                 <div className="w-25">
                  <img src={`${productDetail.imageUrls[0]}`} className="img-fluid" alt="product image" />
                </div>
                <div className="w-75">
                  <p>title: {productDetail.title}</p>
                  <p>{}</p>
                  <p>Color: {color}</p>
                </div>
              </div>
              <div className="cart-col-2">
                <h5 className="price">US$ {price}</h5>
              </div>
              <div className="cart-col-3 d-flex align-items-center gap-15">
              <div
                    className={`bg-[#e44343] border border-[#e4434373] rounded-full w-[25px] h-[25px]  justify-center cursor-pointer`} >
                     <HiPlus size={18} color="#fff" onClick={() => increment(value, productDetail._id, color)}/>
               </div>
               <span className="pl-[20px]">{value}</span> 
               <div className="bg-[#a7abb14f] ml-[20px] rounded-full w-[25px] h-[25px] flex items-center justify-center cursor-pointer" >
                <HiOutlineMinus size={16} color="#7d879c"  onClick={() => decrement(value, productDetail._id, color)} />
               </div>
                <div>
                  
                </div>
              </div>
              <div className="cart-col-4">
                <h5 className="price">us$ {productTotal}</h5>
              </div>
              <div className="cart-col-5">
              <AiFillDelete className="cursor-pointer" size={25} onClick={() => removeFromCartHandler(data)}
               title="Clear From Cart"/>
              </div> 
            </div>
           
</>
);
};
export default Cart;
