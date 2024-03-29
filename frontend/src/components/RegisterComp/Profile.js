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
import { CheckCircleIcon } from '@heroicons/react/20/solid';
import { XCircleIcon } from '@heroicons/react/20/solid';

export default function Profile() {
  const [file, setFile] = useState();
  const [identity, setIdentity] = useState();
  const [{ isLoading, apiData, serverError }] = useFetch();
  const [verified, setVerified] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [idVerified, setIdVerified] = useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    checkEmailVerified();
    checkIdVerified();
    checkverified();
  });

  function checkEmailVerified() {
    if (apiData?.emailVerified) {
      setEmailVerified(true);
    }
  }

  function checkIdVerified() {
    if (apiData?.idVerified) {
      setIdVerified(true);
    }
  }

  function checkverified() {
    if (apiData?.verified) {
      setVerified(true);
    }
  }

  const div1Style = {
    width: '100%',
    height: 'auto',
    padding: '40px',
    border: '1px solid #dee2e6',
    boxShadow: '0 0 1px 1px #dee2e6',
    borderRadius: '10px',
  };

  const username = apiData?.username || '';

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
        idImg: identity || apiData?.idImg || '',
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

  const onUploadId = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setIdentity(base64);
  };

  if (isLoading) return <h1>Loading...</h1>;
  if (serverError)
    return <h1 className="text-xl text-red-500">{serverError.message}</h1>;

  return (
    <>
      <div>
        <NavBar />
        <div>
          <div class="h-screen gap-10 m-20 mt-30 mb-40">
            <Toaster position="top-center" reverseOrder={false}></Toaster>
            <form onSubmit={formik.handleSubmit} style={div1Style}>
              <h2 className="text-center">Edit Profile</h2>
              <div class="">
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
                    <p class="text-gray-500 font-medium ms-auto">
                      SELLER LEVEL <span className="text-black">1</span>
                    </p>
                    <div className="flex gap-10">
                      <p class="text-gray-500 font-medium">
                        Username: <span className="text-black">{username}</span>
                      </p>
                    </div>
                  </div>
                  {verified ? (
                    <>
                      <p class="text-green-500 text-sm ms-auto">
                        ACCOUNT VERIFIED
                      </p>
                    </>
                  ) : (
                    <>
                      <p class="text-red-500 text-sm ms-auto">
                        ACCOUNT NOT VERIFIED
                      </p>
                    </>
                  )}
                </div>

                <div>
                  <hr />
                  <span className="flex">
                    <label class="text-xl">Verification Status</label>
                  </span>
                  <div class="mt-6 flex gap-4">
                    <span className="flex gap-2">
                      {emailVerified ? (
                        <>
                          <CheckCircleIcon className="h-5 w-5 text-green-500" />
                        </>
                      ) : (
                        <>
                          <XCircleIcon className="h-5 w-5 text-red-500" />
                        </>
                      )}
                      <p class="text-gray-500 font-medium">
                        Email Verification
                      </p>
                    </span>
                    <span className="flex gap-2">
                      {idVerified ? (
                        <>
                          <CheckCircleIcon className="h-5 w-5 text-green-500" />
                        </>
                      ) : (
                        <>
                          <XCircleIcon className="h-5 w-5 text-red-500" />
                        </>
                      )}
                      <p class="text-gray-500 font-medium">
                        Identity Verification
                      </p>
                    </span>
                  </div>
                  {!verified && (
                    <>
                      <label htmlFor="idImg" className="text-blue-500">
                        Upload ID Image
                      </label>

                      <input
                        onChange={onUploadId}
                        type="file"
                        id="idImg"
                        name="idImg"
                      />
                      <img
                        className="w-50 h-32 object-cover"
                        src={identity}
                        alt={'Img Preview'}
                      />
                    </>
                  )}
                  <hr />
                </div>
                <div class="mt-6 flex">
                  <input
                    {...formik.getFieldProps('firstName')}
                    type="text"
                    className="mr-2 border-2 border-gray-300 p-2 rounded-lg"
                    placeholder="FirstName"
                    autoComplete="off"
                  />
                  <input
                    {...formik.getFieldProps('lastName')}
                    type="text"
                    className="mr-2 border-2 border-gray-300 p-2 rounded-lg"
                    placeholder="LastName"
                    autoComplete="off"
                  />
                </div>
                <div class="mt-6 flex">
                  <div>
                    <input
                      {...formik.getFieldProps('email')}
                      className="mr-2 border-2 border-gray-300 p-2 rounded-lg"
                      type="text"
                      placeholder="Email"
                      autoComplete="off"
                    />
                    <input
                      {...formik.getFieldProps('mobile')}
                      className="mr-2 border-2 border-gray-300 p-2 rounded-lg"
                      type="text"
                      placeholder="Mobile No."
                      autoComplete="off"
                    />
                  </div>
                </div>
                <div class="mt-6">
                  <textarea
                    className="border-2 border-gray-300 p-2 rounded-lg w-full h-30 resize-none"
                    {...formik.getFieldProps('bio')}
                    placeholder="Bio"
                  />
                </div>

                <div className="mt-4">
                  <textarea
                    className="border-2 border-gray-300 p-2 rounded-lg w-full h-30 resize-none"
                    {...formik.getFieldProps('address')}
                    placeholder="Address"
                  />
                </div>
                <div class="mt-6 mx-auto">
                  <button
                    class="bg-blue-600 text-white py-3 px-6 rounded-lg font-medium"
                    type="submit"
                  >
                    Update Profile
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
