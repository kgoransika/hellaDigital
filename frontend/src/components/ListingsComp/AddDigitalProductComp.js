import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { addDigitalProductValidation } from '../../helper/validate';
import { getUsername } from '../../helper/helper';
import { addDigitalProduct } from '../../helper/helper';
import convertToBase64 from '../../helper/convert';
import avatar from '../../assets/profile.png';
import styles from '../../styles/Username.module.css';

export default function AddDigitalProductComp() {
  const [file, setFile] = useState();
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    getUsername()
      .then((decodedToken) => {
        setUsername(decodedToken.username);
        setRole(decodedToken.role);
        formik.setValues((values) => ({
          ...values,
          dpOwner: decodedToken.username,
        }));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const formik = useFormik({
    initialValues: {
      dpName: 'product 1',
      dpDescription: 'this is a product',
      dpcategory: '',
      dpPrice: '32',
      dpQuantity: '12',
      dpImg: '',
      dpOwner: '',
    },
    validate: addDigitalProductValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = await Object.assign(values, { dpImg: file || '' });
      let addDigitalProductPromise = addDigitalProduct(values);
      console.log(values);
      toast.promise(addDigitalProductPromise, {
        loading: 'Hold on your product is getting added...',
        success: <b>Product added successfully</b>,
        error: <b>Product couldn't be added</b>,
      });

      addDigitalProductPromise.then(function () {});
    },
  });

  /** Handler to upload files */
  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  };

  const div1Style = {
    padding: '20px',
    width: '100%',
    height: 'auto',
    margin: '20px',
    border: '1px solid #dee2e6',
    boxShadow: '0 0 1px 1px #dee2e6',
    borderRadius: '10px',
  };

  return (
    <>
      <style>
        {`
          .dpImg {
            @apply border-4 border-gray-100 w-[135px] rounded-full shadow-lg cursor-pointer;
            @apply hover:border-gray-200;
          }

          input[type='file'] {
            display: none;
          }
        `}
      </style>

      <div className="mt-20 ml-20 mr-20">
        <Toaster position="top-center" reverseOrder={false}></Toaster>
        <div style={div1Style}>
          <h2>Add your digital product</h2>
          <div className="container mx-auto my-5">
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="dpName"
                >
                  Product Name / title
                </label>
                <input
                  {...formik.getFieldProps('dpName')}
                  className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="dpName"
                  type="text"
                  placeholder="Product name"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="dpDescription"
                >
                  Description
                </label>
                <textarea
                  {...formik.getFieldProps('dpDescription')}
                  className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="dpDescription"
                  placeholder="Product description"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="dpCategory"
                >
                  Category
                </label>
                <select
                  {...formik.getFieldProps('dpCategory')}
                  className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="dpCategory"
                >
                  <option value="">Select a category</option>
                  <option value="photos">Photos</option>
                  <option value="videos">Videos</option>
                  <option value="music">Music</option>
                  <option value="webtemplates">Web Templates</option>
                  <option value="ebooks">E-books</option>
                  <option value="printable">Printable</option>
                  <option value="graphicassets">Graphic Assets</option>
                </select>
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="dpPrice"
                >
                  Price
                </label>
                <input
                  {...formik.getFieldProps('dpPrice')}
                  className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="dpPrice"
                  type="number"
                  placeholder="Product price"
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="dpQuantity"
                >
                  Quantity
                </label>
                <input
                  {...formik.getFieldProps('dpQuantity')}
                  className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="dpQuantity"
                  type="number"
                  placeholder="Product quantity"
                />
              </div>
              <div className="w-1/2 max-w-md">
                <label htmlFor="dpImg">
                  <img src={file || avatar} alt="avatar" />
                </label>

                <input
                  onChange={onUpload}
                  type="file"
                  id="dpImg"
                  name="dpImg"
                  className="dpImg"
                  accept="image/*"
                />
              </div>
              <div className="flex items-center justify-center">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
