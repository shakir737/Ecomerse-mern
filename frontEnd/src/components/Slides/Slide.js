import React from 'react';
 import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Product from '../folder/product';
import ProductCard from '../ProductCard';
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    slidesToSlide: 1 // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  }
};
  
export const Slide = ({ Products }) => {
  
  const product = Products.map((item) => (
    <Product
     _id={item._id} 
      name={item.title}
      price={item.productDetail[0].price}
      description={item.description}
      avatar={item.imageUrls[0]}
    />
  
  ));  
  return (
    <div className=''>
      <Carousel  swipeable={true}
  draggable={true}
  arrows={true}
  showDots={false}
  responsive={responsive}
  ssr={true} // means to render carousel on server-side.
  infinite={true}
  autoPlaySpeed={5000}
  autoPlay={true}
  transitionDuration={1000}
  containerClass=" carousel-buttons carousel"
  itemClass="carousel-item-padding-40-px">
        {product}
      </Carousel>
    </div>
  );
}
export default Slide
