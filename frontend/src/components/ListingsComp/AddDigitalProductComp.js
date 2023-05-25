import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { addDigitalProductValidation } from '../../helper/validate';
import { getUsername } from '../../helper/helper';
import { addDigitalProduct } from '../../helper/helper';
import convertToBase64 from '../../helper/convert';
import { useNavigate } from 'react-router-dom';
import digitalProductImg from '../../assets/Creativity-bro.png';

export default function AddDigitalProductComp() {
  const navigate = useNavigate();
  const [img, setImg] = useState();
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState('');
  const [selectedFile, setSelectedFile] = useState();
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');
  const [dpLicense, setDpLicense] = useState('');

  const handleChange = (e) => {
    setDpLicense(e.target.value);
  };

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
      dpLicense: '12',
      dpImg: '',
      dpOwner: '',
    },
    validate: addDigitalProductValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append('dpImg', img);
      formData.append('dpFile', file);

      // Remove the dpImg property from values since it's already included in formData
      const { dpImg, ...otherValues } = values;

      // Merge the remaining form data with the formData object
      for (const key in otherValues) {
        formData.append(key, otherValues[key]);
      }

      // Make the API request with the formData object
      let addDigitalProductPromise = addDigitalProduct(formData);
      console.log(values);
      toast.promise(addDigitalProductPromise, {
        loading: 'Hold on your product is getting added...',
        success: <b>Product added successfully</b>,
        error: <b>Product couldn't be added</b>,
      });

      addDigitalProductPromise.then(function () {
        navigate('/listings');
      });
    },
  });

  /** Handler to preview Image */
  const onUpload = async (e) => {
    setImg(e.target.files[0]);
    const base64 = await convertToBase64(e.target.files[0]);
    setSelectedFile(base64);
  };

  /** Handler to preview Image */
  const onUploadFile = async (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
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

  const div2Style = {
    padding: '20px',
    width: '50vh',
    height: '50vh',
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

          height: 80%;
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
          <div className="container mx-auto my-5 flex">
            <form onSubmit={formik.handleSubmit} className="w-1/2">
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

              <div className="mb-5 mt-5">
                <div
                  {...formik.getFieldProps('dpLicense')}
                  className="flex flex-col mr-10"
                >
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio text-indigo-600 h-5 w-5"
                      name="dpLicense"
                      value="standardLicense"
                      onChange={handleChange}
                      checked={dpLicense === 'standardLicense'}
                    />
                    <span className="ml-2">Standard License</span>
                  </label>
                  <br />
                  <label className="inline-flex items-center">
                    <input
                      {...formik.getFieldProps('dpLicense')}
                      type="radio"
                      className="form-radio text-indigo-600 h-5 w-5"
                      name="dpLicense"
                      value="ultimateLicense"
                      onChange={handleChange}
                      checked={dpLicense === 'ultimateLicense'}
                    />
                    <span className="ml-2">Ultimate License</span>
                  </label>
                </div>
              </div>
              <div className="flex gap-16">
                <div className="w-1/2 max-w-md">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="dpImg"
                  >
                    Upload your cover image
                  </label>
                  <div style={div2Style}>
                    <label htmlFor="dpImg">
                      <p className="text-blue-500 underline cursor-pointer">
                        Browse
                      </p>
                      {img ? (
                        <>
                          <img src={img} alt={'Img Preview'} />
                        </>
                      ) : (
                        <>
                          <p className="text-gray-500 text-sm text-center">
                            A preview of your selected image will be shown here!
                          </p>
                        </>
                      )}
                    </label>
                    <img src={selectedFile} alt="" className="dpImg" />
                    <input
                      onChange={onUpload}
                      type="file"
                      id="dpImg"
                      name="dpImg"
                      className="dpImg"
                      accept="image/*"
                    />
                  </div>
                </div>
                <div>
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="dpFile"
                  >
                    Upload your file
                  </label>
                  <div style={div2Style}>
                    <label htmlFor="dpFile">
                      <p className="text-blue-500 underline cursor-pointer">
                        Browse
                      </p>
                    </label>
                    <br />

                    {file ? (
                      <>
                        <span>
                          Your selected file:
                          <span className="font-bold"> {fileName}</span>
                        </span>
                      </>
                    ) : (
                      <>
                        <p className="text-gray-500 text-sm text-center">
                          The file you selected will be shown here!
                        </p>
                      </>
                    )}
                    <p className="text-red-500 text-sm text-center mt-5">
                      NOTE: This is the file which the customer will recieve
                      after purchasing your product!
                    </p>
                    <input
                      onChange={onUploadFile}
                      type="file"
                      id="dpFile"
                      name="dpFile"
                      className="dpFile"
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <button
                  class="bg-blue-600 text-white py-3 px-5 rounded focus:outline-none focus:shadow-outline mt-10 transition duration-900 ease-in-out hover:bg-black"
                  type="submit"
                >
                  Add Product
                </button>
              </div>
            </form>
            <div>
              <img src={digitalProductImg} alt="digitalProductImg" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
