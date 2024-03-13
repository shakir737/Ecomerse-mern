import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import watch from "../images/watch.jpg";
import Container from "../components/Container";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { useFormik } from "formik";
import { getCountries } from './../features/country/countrySlice';
import { getCities } from "../features/city/citySlice";
import { getStates } from './../features/State/stateSlice';
import { shippingDetail } from "../features/auth/authSlice";
let schema = yup.object().shape({
  fname: yup.string().required("first name is Required"),
  lname: yup.string().required("last name is Required"),
  Address: yup.string().required("Address is Required"),
  Appartment: yup.string().required("Appartment is Required"),
  country: yup.string().required("country is Required"),
  state: yup.string().required("state is Required"),
  city: yup.string().required("city is Required"),
  zipcode: yup.string().required("zipcode is Required"),
});
const Checkout = () => {
  const dispatch = useDispatch();
  const { getaUser } = useSelector((state) => state.user.user);
  const countries = useSelector((state) => state.countries.countries);
  const productState = useSelector((state) => state.product.products);
  const states = useSelector((state) => state.states.States);
  const cities = useSelector((state) => state.cities.Cities);
  const [country, setCountry ] = useState("");
  const [state, setState] = useState("");
  const [GrandTotal, setGrandTotal] = useState(0);

  useEffect(() => {

    dispatch(getCountries());
    dispatch(getCities());
    dispatch(getStates());
    calculateTotal();
  }, []);
  const calculateTotal = () => {
    let productTotal = 0;
    getaUser.cart.map((i,index) => {
      
     const result = Total(i.product)
     productTotal = productTotal + result;
     setGrandTotal(productTotal);
    })
  }
  const Total = (id) => {
    const data =  productState.filter(product => product._id === id);
    const Total = data[0].quantity * data[0].price
    return Total
  }
  
  const {handleChange, handleBlur, handleSubmit, resetForm, values, touched, errors, setFieldValue } = useFormik({
    enableReinitialize: true,
    initialValues: {
      fname: getaUser.firstname || "",
      lname: getaUser.lastname || "",
      Address: getaUser.address || "",
      Appartment: getaUser.appartment || "",
      country: getaUser.country || "",
      state: getaUser.state || "",
      city: getaUser.city || "",
      zipcode: getaUser.zipcode || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
    dispatch(shippingDetail(values));
    }
  })
  const handleCounry = (e) => {
     handleChange(e);
     console.log(e.target.item._id); 
     const filteredProducts =
     states.filter((product) =>
     product.country.includes(e.target.value)
     );
     setCountry(filteredProducts);
    
  }
  const handleState = (e) => {
    handleChange(e); 
    console.log(e.target.value);
     const filteredProducts =
     cities.filter((product) =>
     product.state.includes(e.target.value)
     );
     setState(filteredProducts);
   
 }
 const handleCity = (e) => {
  handleChange(e); 
  
}


  return (
    <>
      <Container class1="checkout-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-7">
            <div className="checkout-left-data">
              <h3 className="website-name">Shoping Cart</h3>
              <nav
                style={{ "--bs-breadcrumb-divider": ">" }}
                aria-label="breadcrumb"
              >
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link className="text-dark total-price" to="/cart">
                      Cart
                    </Link>
                  </li>
                  &nbsp; /&nbsp;
                  <li
                    className="breadcrumb-ite total-price active"
                    aria-current="page"
                  >
                    Information
                  </li>
                  &nbsp; /
                  <li className="breadcrumb-item total-price active">
                    Shipping
                  </li>
                  &nbsp; /
                  <li
                    className="breadcrumb-item total-price active"
                    aria-current="page"
                  >
                    Payment
                  </li>
                </ol>
              </nav>
              <h2 className="title total">Contact Information</h2>
              <p className="user-details total">
                { getaUser.email}
              </p>
              <h4 className="mb-3">Shipping Address</h4>
              <form
                action=""
                className="d-flex gap-15 flex-wrap justify-content-between"
                onSubmit={handleSubmit}
              >
                <div className="flex-grow-1">
                  <input
                    id="fname"
                    name="fname"
                    value={values.fname}
                    onChange={handleChange("fname")}
                    onBlur={handleBlur("fname")}
                    // error={!!touched.fname && !!errors.fname}
                    // helperText={touched.fname && errors.fname}
                    type="text"
                    placeholder="First Name"
                    className="form-control"
                  />
                </div>
                <div className="text-[#ff0000]">
                  {touched.fname && errors.fname}
                 </div>
                <div className="flex-grow-1">
                <input
                    id="lname"
                    name="lname"
                    value={values.lname}
                    onChange={handleChange("lname")}
                    onBlur={handleBlur("lname")}
                    // error={!!touched.lname && !!errors.lname}
                    // helperText={touched.lname && errors.lname}
                    type="text"
                    placeholder="last Name"
                    className="form-control"
                  />
                </div>
                <div className="text-[#ff0000]">
                  {touched.lname && errors.lname}
                 </div>
                <div className="w-100">
                  <select
                   name="country"
                   className="form-control form-select"
                   id="country"
                   value={values.country}
                   onChange={(i) => handleCounry(i)} >
                    {values.country == "" && 
                    <option selected >
                      Select Country
                    </option> }
                     {countries && countries.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                ))} 
              
                  </select>
                </div>
                <div className="text-[#ff0000]">
                  {errors.country}
                 </div>
                <div className="flex-grow-1">
                <select
                   name="state"
                   className="form-control form-select"
                   id="state"
                   value={values.state}
                   onChange={(e) => handleState(e)} >
                      {values.state == "" && 
                    <option>
                      Select State
                    </option> }
                     {states && states.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                ))} 
              
                  </select>
               
                <div className="text-[#ff0000]">
                  { errors.state}
                 </div>
                 </div>
                <div className="flex-grow-1">
                <select
                   name="city"
                   className="form-control form-select"
                   id="city"
                   value={values.city}
                   onChange={(e) => handleCity(e)} >
                     {values.city == "" && 
                    <option selected >
                      Select City
                    </option> }
                     {cities && cities.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                ))} 
               
                  </select>
               
                <div className="text-[#ff0000]">
                  {touched.city && errors.city}
                 </div>
                 </div>
                <div className="flex-grow-1">
                <input
                    id="zipcode"
                    name="zipcode"
                    value={values.zipcode}
                    onChange={handleChange("zipcode")}
                    onBlur={handleBlur("zipcode")}
                    // error={!!touched.zipcode && !!errors.zipcode}
                    // helperText={touched.zipcode && errors.zipcode}
                    type="text"
                    placeholder="zipcode"
                    className="form-control"
                  />
                </div>
                <div className="text-[#ff0000]">
                  {touched.zipcode && errors.zipcode}
                 </div>
                <div className="w-100">
                <input
                    id="Address"
                    name="Address"
                    value={values.Address}
                    onChange={handleChange("Address")}
                    onBlur={handleBlur("Address")}
                    // error={!!touched.Address && !!errors.Address}
                    // helperText={touched.Address && errors.Address}
                    type="text"
                    placeholder="Address"
                    className="form-control"
                  />
                </div>
                <div className="text-[#ff0000]">
                  {touched.Address && errors.Address}
                 </div>
                <div className="w-100">
                <input
                    id="Appartment"
                    name="Appartment"
                    value={values.Appartment}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.Appartment && !!errors.Appartment}
                    helperText={touched.Appartment && errors.Appartment}
                    type="text"
                    placeholder="Appartment"
                    className="form-control"
                  />
                </div>
                <div className="text-[#ff0000]">
                  {touched.Appartment && errors.Appartment}
                 </div>
                <div className="w-100">
                  <div className="d-flex justify-content-between align-items-center">
                    <Link to="/cart" className="text-dark">
                      <BiArrowBack className="me-2" />
                      Return to Cart
                    </Link>
                    {/* <Link to="/cart" className="button">
                      Continue to Shipping
                    </Link> */}
                     <button
                        className="button"
                        type="submit"> submit</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-5">
          {getaUser &&
                  getaUser.cart.map((i, index) => (
                    <CartSingle
                      data={i.product}
                      count={i.count}
                    
                    />
                  ))}
           
          
          <div className="border-bottom py-4">
              <div className="d-flex justify-content-between align-items-center">
                <p className="total">Subtotal</p>
                <p className="total-price">US$ {GrandTotal}</p>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <p className="mb-0 total">Shipping</p>
                <p className="mb-0 total-price">$ 10000</p>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center border-bootom py-4">
              <h4 className="total">Total</h4>
              <h5 className="total-price">US$ {GrandTotal + 10000}</h5>
            </div> 
            </div>
        </div>
      </Container>
    </>
  );
};

const CartSingle = ({ data, count }) => {
  const productState = useSelector((state) => state.product.products);
  const productDetail = productState.find(product => product._id === data);
return (
  <>
    <div className="border-bottom py-4">
              <div className="d-flex gap-10 mb-2 align-align-items-center">
                <div className="w-75 d-flex gap-10">
                  <div className="w-25 position-relative">
                    <span
                      style={{ top: "-10px", right: "2px" }}
                      className="badge bg-secondary text-white rounded-circle p-2 position-absolute"
                    >
                      {count}
                    </span>
                    <img className="img-fluid"  src={`${productDetail.imageUrls[0]}`} alt="product" />
                  </div>
                  <div>
                    <h5 className="total-price">{productDetail.title}</h5>
                    <p className="total-price">{productDetail.description}</p>
                  </div>
                </div>
                <div className="flex-grow-1">
                  <h5 className="total">{productDetail.price}</h5>
                </div>
              </div>
              </div>
            
  
  </>
)
}
export default Checkout;
