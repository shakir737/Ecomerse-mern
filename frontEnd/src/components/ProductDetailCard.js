import React, { useEffect, useState, useRef } from "react";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { BsCartFill } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/styles";
import { useDispatch, useSelector } from "react-redux";
import { chat, getProduct } from "../features/product/productSlice";
import { useSearchParams } from "react-router-dom";
import { AddToCart, RemoveCart, getuser, removeWishlist, wishlist } from "../features/user/userSlice";
import { deleteFromCart } from "../features/cart/cartSlice";


const ProductDetailsCard = (props) => {
const productState = useSelector((state) => state.product.products);
const { user } = useSelector((state) => state.auth)
const { getaUser } = useSelector((state) => state.user.user)
const [searchparams] = useSearchParams();
  const { setOpen, open} = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [count, setCount] = useState(1);
  const [imageUrl, setImageUrl] = useState("");
  const [productInfo, setProductInfo] = useState();
  const [detil, setDetail] = useState([{product: '', color: '', quantity: 0, price: 0, orderQuantity: 0,}]);
  const [click, setClick] = useState(false);
  const [cartInfo, setCartInfo] = useState()
  const [cart, setCart] = useState(false);
  const [message, setMessage] = useState("");
  const [active, setActive ] = useState(false);
  const detail = searchparams.get("detail");
  const [formData, setFormData] = useState([{
    message: ""
  }])
 
  //   const [select, setSelect] = useState(false);
useEffect(() => {
  
  if(detail){  
  setOpen(true);
  productDetail(detail);
  cartDetail();
  }
  else{
  console.log(detail);
}
}, [detail, getaUser, active])

useEffect(() => {
},[active])

const productDetail = (id) => {
  const filterProduct =  productState.filter(product => product._id === id);
  if(filterProduct){
    setProductInfo(filterProduct);
    
  }
}

const cartDetail = () => {
  if(getaUser){
    getaUser.cart.map((i, index) => {
      if(i.product === detail)
      cartFilter(i.product);
    })
  }
}

   const decrementCount = () => {
      if (count > 1) {
       setCount(count - 1);
     }
   };

  const incrementCount = (quantity) => {
   
  };
  const handleChange = (e, link, quantity) => {
    
    if(e.target.value != "" ){
    
      const {value} = e.target

     
        if(active){
          setActive(false);
        }
        const productDetail = [...detil];
        productDetail[link].orderQuantity = parseInt(value);
        productDetail[link].price = productInfo[0].productDetail[link].price;
        productDetail[link].color = productInfo[0].productDetail[link].color;
        productDetail[link].quantity = productInfo[0].productDetail[link].quantity;
        if(!detil[link + 1]){
          setDetail([...detil, { color: "", price: 0, quantity:0, orderQuantity:0,}]);
          
        }
       
     
    }
  }
  const handleChangeMessage = (e) => {
    const data = e.target.value;
    setMessage(data);

  }
  const handleSubmit = async (e) => {
    e.preventDefault();
   const data = {message, detail};

   const result = await dispatch(chat(data));
   setProductInfo(result.payload);
   setMessage("");
   
    
  }
 // const isItemExists = cart && cart.find((i) => i._id === id)
   const addToCart = (id, userID, order) => {
    const cartDetail = order.filter(product => product.orderQuantity != 0)
  const status =  cartDetail.map((detail) => {
      if(detail.orderQuantity > detail.quantity){
        setActive(true);
        return true;
      }
    }     
    );

     if(id && status[0] !== true){
      const cart = {id,userID,cartDetail};
      dispatch(AddToCart(cart));
      // dispatch(getuser(userID));
      
     }
   };
   const removeFromCart = async (id, userID) => {
    if(id && userID){
    const latest = await dispatch(RemoveCart(id));
    if(latest.type === "cart/remove-cart/fulfilled"){
      setCart(!cart);
    }
    }
   }
  useEffect(() => {
  
     if(getaUser){

    
        getaUser.cart.map((i, index) => {
          if(i.product === detail){
            console.log(i.product);
            cartFilter(i.product);
          }
          else {
            setCart(false);
          }
          
        } )
      
     const data = wishlistfilter();
     if(data.length === 1) {
         setClick(true);
      } else {
        setClick(false);
      }
      //   if(Incart.length === 1) {
      //   setCart(true);
      // } else {
      //   setCart(false);
      // }
     }
     if(productInfo){
      // console.log(productInfo.imageUrls)
     }
  }, [getaUser]);
  const wishlistfilter = () => {
    const data =  getaUser.wishlist.filter(product => product === detail);
    return data;
  }
  const cartFilter = (id) => {
    const data =  productState.filter(product => product._id === id);
    if(data.length === 1){
      setCart(true);
    }else {
      setCart(false);
    }
  }
  const removeFromWishlistHandler = async (id, userID) => {
    
   const latest = dispatch(removeWishlist(id));
   
  };

  const addToWishlistHandler = async (id, userID) => {
    
   const latest =  await dispatch(wishlist(id));
  
  
   };
     const closeCard = () => {
      setOpen(false);
      navigate("/");
     }
  return (
    <div className="bg-[#fff]">
       
        <div className="fixed w-full h-screen top-0 left-0 bg-[#00000030] z-40 flex items-center justify-center">
          <div className="w-[90%] 800px:w-[70%] h-[95vh] overflow-y-scroll 800px:h-[85vh] bg-white rounded-md shadow-sm relative p-4">
          <button  onClick={closeCard} >
          <RxCross1
              size={30}
              className="absolute right-3 top-3 z-50"
             
            />
          </button>

            <div className="block w-full 800px:flex">
              <div className="w-full 800px:w-[50%]">
               {productInfo && !imageUrl ? (
              
            <img src={`${productInfo[0].imageUrls[0]}`} alt="" className="w-[500px] h-[480px]" /> ):(
              <img src={`${imageUrl}`} alt="" className="w-[500px] h-[480px]" /> 
            )} 
                <div className="flex">
                  
                  {productInfo ? (
                    productInfo[0].imageUrls.map((product) =>(
                      <div onClick={() => setImageUrl(product)} className="flex">
                      <img
                      src={`${product}`}
                      alt=""
                      className="w-[50px] h-[50px] rounded-full mr-2"
                    />  
                     </div>
                     ))
                    ) 
                   :null} 
                    <div>
                      {/* <h3 className={`${styles.shop_name}`}>
                        {data.shop.name}
                      </h3> */}
                      
                    </div>
                  
                </div>
                <div
                  className={`${styles.button} border mt-4 rounded-[4px] `}
                //   onClick={handleMessageSubmit}
                >
                  Chat: {productInfo ? (productInfo[0].message.map((message) => (
                  <div  
                 // className={`${styles.button} border mt-4 rounded-[4px] `}
                  > {message.message}</div> 
                  )) ) : null }
                </div>
                <div
                  className={`${styles.button} bg-[#000] mt-4 rounded-[4px] h-10`}
                //   onClick={handleMessageSubmit}
                >
                  <div>
                  <form onSubmit={handleSubmit}>
                  <input
                      type="text"
                      className="form-control"
                      id="message"
                      name="message"
                      placeholder="Chat with Sealer"
                      onChange={(e) => setMessage(e.target.value)}
                      value={message}
                    />
                    <br />
                    <button  type="submit" className="button">submit</button>
                    </form>
                  </div>
                </div>
                
              </div>

              <div className="w-full 800px:w-[50%] pt-5 pl-[5px] pr-[5px]">
                <h1 className={`${styles.productTitle} text-[20px]`}>
                {productInfo ? (productInfo[0].title):null}
                </h1>
                {productInfo ? (productInfo[0].description):null}
                <div>Please Enter Correct Quantity on Correct Color which You Want To Buy</div>
                {productInfo ? (
                    productInfo[0].productDetail.map((product, link) => (
                      <div >
                      Color: {product.color}, Price: $ {product.price} , In Stock: {product.quantity} Nos, <br />
                      <span>      Order Quantity: </span>
                      <input type="number" readOnly={false} id="orderQuantity" name="orderQuantity" placeholder=' Quantity' className='border p-3 w-13 rounded-lg dark:bg-[#031156] ' value={product.orderQuantity}
                                 onChange={(e) => handleChange(e, link, product.quantity)} /> 
                  
                     </div>
                     ))
                    ) 
                   :null}
                
                <div
                  className={`${styles.button} mt-6 rounded-[4px] h-11 flex items-center`} >
                  { getaUser ? (
                    cart ? (
                       <span className="text-[#008000] flex items-center">
                        Remove From Cart <BsCartFill size={30}
                        className="cursor-pointer"
                        onClick={() => removeFromCart(detail, getaUser._id)}
                        title="Remove from Cart" />
                  </span>
                    ) : active ? (
                        <span> Please Enter Correct quantity </span>
                    ) :  (  <span className="text-[#008000] flex items-center">
                        Add To Cart <AiOutlineShoppingCart size={30}
                        className="cursor-pointer"
                        onClick={() => addToCart(detail, getaUser._id, detil)}
                        title="Add To Cart" />
                  </span>)) : (
                       <span className="text-[#008000] flex items-center">
                        Login First To Add In Cart
                        </span>
                    )
                  }
                  
                </div>
                <div
                  className={`${styles.button} mt-6 rounded-[4px] h-11 flex items-center`} >
                  { getaUser ? (
                    click ? (
                       <span className="text-[#008000] flex items-center">
                        Remove From Wishlist <AiFillHeart size={30}
                        className="cursor-pointer"
                        onClick={() => removeFromWishlistHandler(detail,getaUser._id)}
                        title="Add To Wishlist" />
                  </span>
                    ) : (
                         <span className="text-[#008000] flex items-center">
                        Add To Wishlist <AiOutlineHeart size={30}
                        className="cursor-pointer"
                        onClick={() => addToWishlistHandler(detail, getaUser._id)}
                        title="Add To Wishlist" />
                  </span>
                    )) : (
                       <span className="text-[#008000] flex items-center">
                        Login First To Add In Wishlist
                        </span>
                    )
                  }
                  
                </div>
              <div>
                <h5 className="text-[16px] text-[red] mt-5"> 
                {productInfo && !productInfo[0].sold === null  ?  (productInfo[0].sold):(0)} Items Sold Out</h5>
                </div>
                </div> 
            </div>
          </div>
        </div>
    
    </div>
  );
};

export default ProductDetailsCard;
