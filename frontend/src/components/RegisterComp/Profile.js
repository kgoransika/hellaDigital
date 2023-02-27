import React, { useState } from 'react';
import avatar from '../../assets/profile.png';
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { profileValidation } from '../../helper/validate';
import convertToBase64 from '../../helper/convert';
import useFetch from '../../hooks/fetch.hook';
import { updateUser } from '../../helper/helper';
import { useNavigate } from 'react-router-dom';
import bgImg from '../../assets/hellaDigitalBG1.png';
import styles from '../../styles/Username.module.css';
import extend from '../../styles/Profile.module.css';

export default function Profile() {
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
        success: <b>Update Successfully...!</b>,
        error: <b>Could not Update!</b>,
      });
    },
  });

  /** formik doensn't support file upload so we need to create this handler */
  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  };

  // logout handler function
  function userLogout() {
    localStorage.removeItem('token');
    navigate('/');
  }

  if (isLoading) return <h1 className="text-2xl font-bold">isLoading</h1>;
  if (serverError)
    return <h1 className="text-xl text-red-500">{serverError.message}</h1>;

  return (
    <div
      className="container mx-auto"
      style={{
        backgroundImage: `url(${bgImg})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        maxWidth: '100%',
        maxHeight: '100%',
      }}
    >
      <Toaster position="top-center" reverseOrder={false}></Toaster>

      <div className="flex justify-center items-center h-screen">
        <div className={styles.gradient}>
          <div className={`${styles.glass}`}>
            <div className="title flex flex-col items-center">
              <br></br>
              <h4 className="text-4xl font-bold">
                <span>HELLA</span>
                <span
                  style={{
                    color: '#0066ff',
                  }}
                >
                  {' '}
                  DIGITAL
                </span>
              </h4>
              <span
                className="py-4 text-xl text-center text-white"
                style={{ letterSpacing: '2px' }}
              >
                You can update your profile details.
              </span>
            </div>

            <form className="py-1" onSubmit={formik.handleSubmit}>
              <div className="profile flex justify-center py-4">
                <label htmlFor="profile">
                  <img
                    src={file || avatar}
                    className={`${styles.profile_img} ${extend.profile_img}`}
                    alt="avatar"
                  />
                </label>

                <input
                  onChange={onUpload}
                  type="file"
                  id="profile"
                  name="profile"
                />
              </div>

              <div className="textbox flex flex-col items-center gap-6">
                <div
                  className="name flex w-3/4 gap-10"
                  style={{ width: '95%' }}
                >
                  <input
                    {...formik.getFieldProps('firstName')}
                    className={`${styles.textbox} ${extend.textbox}`}
                    type="text"
                    placeholder="FirstName"
                  />
                  <input
                    {...formik.getFieldProps('lastName')}
                    className={`${styles.textbox} ${extend.textbox}`}
                    type="text"
                    placeholder="LastName"
                  />
                </div>

                <div
                  className="name flex w-3/4 gap-10"
                  style={{ width: '95%' }}
                >
                  <input
                    {...formik.getFieldProps('mobile')}
                    className={`${styles.textbox} ${extend.textbox}`}
                    type="text"
                    placeholder="Mobile No."
                  />
                  <input
                    {...formik.getFieldProps('email')}
                    className={`${styles.textbox} ${extend.textbox}`}
                    type="text"
                    placeholder="Email*"
                  />
                </div>

                <input
                  style={{ width: '95%' }}
                  {...formik.getFieldProps('address')}
                  className={`${styles.textbox} ${extend.textbox}`}
                  type="text"
                  placeholder="Address"
                />
                <button className={styles.btn} type="submit">
                  Update
                </button>
              </div>

              <div className="text-center py-4">
                <span className="text-black-500">
                  Wanna take a break?{' '}
                  <button onClick={userLogout} className="text-red-500" to="/">
                    Logout
                  </button>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
