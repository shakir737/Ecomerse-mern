
import React  from 'react';
import Product from '../folder/product';
import 'react-multi-carousel/lib/styles.css';

  
export const AllProducts = ({ Products }) => {
 const Mobiles =  Products.objects.filter(category="Mobiles");
 console.log(Mobiles);
  return (
    <div className="flex">
      
         {/* {  
         Mobiles.map((item) =>  (
 
           <div style={{width:'25%'}}>
           <Product 
              id= {item._id}
              name={item.title}
              price={item.price}
              description={item.description}
              avatar={item.avatar.secure_url}
            />
            </div >
          ))
         
        } */}
        </div> 
  
  );
}
export default AllProducts