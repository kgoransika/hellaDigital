import React, { useState } from 'react';
import avatar from '../../assets/profile.png';
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { profileValidation } from '../../helper/validate';
import convertToBase64 from '../../helper/convert';
import useFetch from '../../hooks/fetch.hook';
import { updateUser } from '../../helper/helper';
import { useNavigate } from 'react-router-dom';
import NavBar from '../NavbarComp/NavbarComp.js';

export default function SellerProfileView() {
  const [file, setFile] = useState();
  const [{ isLoading, apiData, serverError }] = useFetch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: apiData?.firstName || '',
      lastName: apiData?.lastName || '',
      email: apiData?.email || '',
      mobile: apiData?.mobile || '',
      address: apiData?.address || '',
    },
    enableReinitialize: true,
    validate: profileValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = await Object.assign(values, {
        profile: file || apiData?.profile || '',
      });
      let updatePromise = updateUser(values);

      toast.promise(updatePromise, {
        loading: 'Updating...',
        success: <b>Update Successful!</b>,
        error: <b>Could Not Update Profile</b>,
      });
    },
  });

  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  };

  function userLogout() {
    localStorage.removeItem('token');
    navigate('/');
  }

  if (isLoading) return <h1>Loading...</h1>;
  if (serverError)
    return <h1 className="text-xl text-red-500">{serverError.message}</h1>;

  return (
    <>
      <div>
        <NavBar />
        <div class="flex items-center justify-center h-screen bg-gray-100">
          <div class="bg-white p-8 rounded-lg shadow-lg">
            <div class="flex items-center">
              <label htmlFor="profile">
                <img
                  src={file || avatar}
                  className="h-24 w-24 rounded-full object-cover mr-6"
                  alt="avatar"
                />
              </label>

              <input
                onChange={onUpload}
                type="file"
                id="profile"
                name="profile"
              />
              <div>
                <h2 class="text-2xl font-semibold">John Doe</h2>
                <p class="text-gray-600 font-medium">Software Engineer</p>
              </div>
            </div>
            <div class="mt-6">
              <p class="text-gray-600 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                bibendum placerat augue, at malesuada velit volutpat sed.
              </p>
            </div>
            <div class="mt-8 flex justify-between">
              <div>
                <p class="text-gray-600 font-medium">Email:</p>
                <p class="text-gray-800 font-semibold">johndoe@example.com</p>
              </div>
              <div>
                <p class="text-gray-600 font-medium">Phone:</p>
                <p class="text-gray-800 font-semibold">123-456-7890</p>
              </div>
            </div>
            <div class="mt-10">
              <button class="bg-blue-500 text-white py-3 px-6 rounded-full font-medium">
                Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
