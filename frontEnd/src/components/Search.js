import React , { useEffect, useState } from 'react';
import {List, ListItem } from 'material-ui';
import { BsSearch } from "react-icons/bs";
import { getProducts } from '../features/product/productSlice';
import { useSelector, useDispatch } from 'react-redux';
import {  Link } from "react-router-dom";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export const Search = () => {
    const [text, setText] = useState('');
    const { Products } = useSelector((state) => state.product.products);
    const dispatch = useDispatch();
  
    useEffect(() => {
     dispatch(getProducts())
    },[dispatch])


    const getText = (text) => {
        setText(text);
      }
  return (
    <div>
    <MuiThemeProvider>
    <form>
       <div class="input-group">
                  <input type="text" onChange={(e) => getText(e.target.value)} className="form-control" placeholder="Search Products" aria-label="Search Products" aria-describedby="basic-addon2" />
                  <span class="input-group-text" id="basic-addon2"> <Link> <BsSearch /> </Link> </span>
               </div>
               {
                text && <List className='searchbar'>
                  {
                    Products.filter(product => product.title.toLowerCase().includes(text.toLocaleLowerCase())).map(product => (
                      <ListItem className='result'>
                      <Link to={`/Product/${product._id}`} onClick={() => setText('')}>
                       
                        {product.title}
                        </Link>
                      </ListItem>
                    ))
                  }
                </List>
               }
               </form>
               </MuiThemeProvider>
    </div>
  )
}

export default Search
