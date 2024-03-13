import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import {app}   from '../firebase';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField , Select,  MenuItem } from "@mui/material";
import { AiOutlineDelete, AiOutlinePlusCircle } from 'react-icons/ai';
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { BsLink45Deg, BsPencil } from "react-icons/bs";
import { useGetCitiesQuery, useGetCountriesQuery, useGetStatesQuery } from '../state/api';

const CreateUser = ({ id, setID, setOpen, setUpdated }) => {

  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const Products = useSelector((state) => state.users.users);
  const {data:country,isSuccess,isError,isLoading}= useGetCountriesQuery();
  const {data:city} = useGetCitiesQuery();
  const {data:state} = useGetStatesQuery();
  const [formData, setFormData] = useState({
    imageUrls:  [],
    firstname: '',
    lastname: '',
    email: '',
    address: '',
    country:  '',
    state: '',
    city: '',
    role: '',
    isAccessed: '',
    AccessURLS: [],

  });

  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ category, setCategory ] = useState([]);
  const [brand, setBrand] = useState([]);
  const [allowRoutes, setAllowRoutes] = useState([{headRoute: '', Route: '',}])
  
  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError('Image upload failed (2 mb max per image)');
          setUploading(false);
        });
    } else {
      setImageUploadError('You can only upload 6 images per listing');
      setUploading(false);
    }
  };
  useEffect(() => {
    
    console.log(country);
    console.log(state);
    console.log(city);
  },[])
  useEffect(() => {
    if(id){
      const filterProduct =  Products.filter(product => product._id === id);
      setFormData(filterProduct[0]);
    }
    // if(isSuccess) {
    //   const message = data?.message || "Product Added Successfully";
    //   toast.success(message);
    //   setFormData({
    //     imageUrls:  [],
    //     firstname: '',
    //     lastname: '',
    //     email: '',
    //     address: '',
    //     country:  '',
    //     state: '',
    //     city: '',
    //     role: '',
    //     isAccessed: '',
    //     AccessURLS: [],
    //   })
   // } 
    // if (isError) {    
    //     if(isError) {
    //       toast.error("Error In Adding Product");
    //     }
    // }
  },[])

  const storeImage = async (file) => {
    const promise =  new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          c
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
    return promise;
  };
  const handleDetailChanged = (link, value, name) => {
    const updatedDetail = [...detail];
    updatedDetail[link].color = value;
    setDetail(updatedDetail);
  }
  const handleAddDetail = () => {
     setDetail([...detail, {color: "", price: 0, quantity:0}]);
  }
  

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };
  const handleCategory = (e) => {
    setCategory(e.target.value);
  
    setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
  }
  const handleBrand = (e) => {
    setBrand(e.target.value);

    setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
  }
  const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
  };

  
  const handleSubmit = async (e) => {
    if(id){
      e.preventDefault();
      const data = {
        id: id,
        firstname: formData.firstname,
        lastname: formData.lastname,
        email: formData.email,
        country: formData.country,
        address: formData.address,
        state: formData.state,
        imageUrls: formData.imageUrls,
        city: formData.city,
        isAccessed: formData.isAccessed,
        AccessURLS: allowRoutes,
       }
       
       const message =  "Product Updated Successfully";
      toast.success(message);
      setUpdated(true);
      setOpen(false);
    }else{
      e.preventDefault();
      try {
      const data = {
        firstname: formData.firstname,
        country: formData.country,
        address: formData.address,
        state: formData.state,
        imageUrls: formData.imageUrls,
        city: formData.city,
        isAccessed: formData.isAccessed,
        AccessURLS: allowRoutes,
      }
     //  createProduct(data);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    }
   
  };
  return (
    <main className='p-3 max-w-4xl mx-auto'>
    {
      id ? (<h1 className='text-3xl font-semibold text-center my-7'>
        Update A User
      </h1>) : (<h1 className='text-3xl font-semibold text-center my-7'>
        Create A User
      </h1>)
    }
      
      <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-4'>
        <div className='flex flex-col gap-4 flex-1 '>
          <input
            type='text'
            placeholder='first name'
            className='border p-3 rounded-lg dark:bg-[#031156]'
            id='firstname'
            maxLength='62'
            minLength='10'
            required
            disabled
            onChange={handleChange}
            value={formData.firstname}
          />
           <input
            type='text'
            placeholder='last name'
            className='border p-3 rounded-lg dark:bg-[#031156]'
            id='lastname'
            maxLength='62'
            minLength='10'
            required
            disabled={true}
            onChange={handleChange}
            value={formData.lastname}
          />
          <input
            type='text'
            placeholder='Email'
            className='border p-3 rounded-lg dark:bg-[#031156]'
            id='email'
            maxLength='62'
            minLength='10'
            required
            disabled={true}
            onChange={handleChange}
            value={formData.email}
          />
           <input
            type='text'
            placeholder='Address'
            className='border p-3 rounded-lg dark:bg-[#031156]'
            id='address'
            maxLength='62'
            minLength='10'
            required
            disabled={true}
            onChange={handleChange}
            value={formData.address}
          />
         <Select
            name="country"
            onChange={(i) => handleCategory(i)}
            value={formData.country}
            className="form-control py-3 mb-3"
            id="country"
            sx={{ gridColumn: "span 1" }}
            displayEmpty={true}
            renderValue={value => value?.length ? Array.isArray(value) ? value.join(', ') : value : '-- Please Select Country --'}
          >
             <MenuItem value="">Select Country</MenuItem>
             {country && country.map((i, j) => {
              return (
                 <MenuItem key={j} value={i._id}>
                  {i.title}
                </MenuItem> 
              );
            })}   
          </Select>

          <Select
            name="state"
            onChange={(i) => handleBrand(i)}
            id="state"
            value={formData.state}
            className="form-control py-3 mb-3"
            sx={{ gridColumn: "span 1" }}
            displayEmpty={true}
            renderValue={value => value?.length ? Array.isArray(value) ? value.join(', ') : value : '-- Please Select State --'}
          >
            <MenuItem value="">Select State</MenuItem>
             {state && state.map((i, j) => {
              return (
                <MenuItem key={j} value={i._id}>
                  {i.title}
                </MenuItem>
              );
            })}  
          </Select>  
          
          <Select
            name="city"
            onChange={(i) => handleBrand(i)}
            id="city"
            value={formData.city}
            className="form-control py-3 mb-3"
            sx={{ gridColumn: "span 1" }}
            displayEmpty={true}
            renderValue={value => value?.length ? Array.isArray(value) ? value.join(', ') : value : '-- Please Select City --'}
          >
            <MenuItem value="">Select City</MenuItem>
             {city && city.map((i, j) => {
              return (
                <MenuItem key={j} value={i._id}>
                  {i.title}
                </MenuItem>
              );
            })}  
          </Select> 

          <Select
            name="role"
            onChange={(i) => handleCategory(i)}
            value={formData.role}
            className="form-control py-3 mb-3"
            disabled
            id="country"
            sx={{ gridColumn: "span 1" }}
            displayEmpty={true}
            renderValue={value => value?.length ? Array.isArray(value) ? value.join(', ') : value : '-- Please Select Roll --'}

          >
             <MenuItem value="user">user</MenuItem>
             <MenuItem value="admin">admin</MenuItem>
             <MenuItem value="finance">finance</MenuItem>
             <MenuItem value="accounts">accounts</MenuItem>
          </Select>
        </div>
        <div className='flex flex-col flex-1 gap-4'>
          <p className='font-semibold'>
            Images:
            <span className='font-normal text-gray-600 ml-2'>
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className='flex gap-4'>
            <input
              onChange={(e) => setFiles(e.target.files)}
              className='p-3 border border-gray-300 rounded w-full'
              type='file'
              id='images'
              accept='image/*'
              multiple
            />
            <button
              type='button'
              disabled={uploading}
              onClick={handleImageSubmit}
              className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'
            >
              {uploading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
          <p className='text-red-700 text-sm'>
            {imageUploadError && imageUploadError}
          </p>
          {formData.imageUrls  &&
            formData.imageUrls.map((url, index) => (
              <div
                key={url}
                className='flex justify-between p-3 border items-center'
              >
                <img
                  src={url}
                  alt='listing image'
                  className='w-20 h-20 object-contain rounded-lg'
                />
                <button
                  type='button'
                  onClick={() => handleRemoveImage(index)}
                  className='p-3 text-red-700 rounded-lg uppercase hover:opacity-75'
                >
                  Delete
                </button>
              </div>
            ))}
            {
                 allowRoutes.map((link, linkIndex) => (
                      
                      <div className='mb-2 block'>
                        <div className='w-full flex items-center justify-between'>
                                <label className="">Registered Routes Detail</label>
                                <AiOutlineDelete className={`${linkIndex === 0 ? "cursor-no-drop" : "cursor-pointer"} text-black dark:text-white text-xl`}
                                  onClick={() =>  {
                                    const updatedData = [...allowRoutes];
                                    updatedData.splice(linkIndex, 1);
                                    setAllowRoutes(updatedData);
                                    }}/>

                              </div>
                              <input type="text" name="headroute" id="headroute" placeholder='Select Head Route' className='border p-3 rounded-lg dark:bg-[#031156]  ' value={link.headRoute}
                                onChange={(e) => {
                                 const updatedDetail = [...allowRoutes];
                                 updatedDetail[linkIndex].headRoute = e.target.value;
                                 setAllowRoutes(updatedDetail);
                                 }} /> <br />
                              <input type="text" name="route" id="route" placeholder='Select Route' className='border p-3 rounded-lg dark:bg-[#031156]  ' value={link.Route}
                                onChange={(e) => {
                                 const updatedDetail = [...allowRoutes];
                                 updatedDetail[linkIndex].Route = e.target.value;
                                 setAllowRoutes(updatedDetail);
                                 }} /> <br />
                                <div className='mt-5 mb-4'>
                      <p className='flex items-center text-[16px] dark:text-white text-black cursor-pointer'
                      onClick={() => {
                        setAllowRoutes([...allowRoutes, {headRoute: '', Route: '',}]);
                    
                      }}>
                        <BsLink45Deg className="mr-2" />Add More Routes
                      </p>
                    </div>
                      </div>
                      
              
          ))}
          <button
            disabled={loading || uploading}
            className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
          >
            {id ? 'Update Product' : 'Create Product'}
          </button>
          {error && <p className='text-red-700 text-sm'>{error}</p>}
        </div>
      </form>
    </main>
  );
}
export default CreateUser;