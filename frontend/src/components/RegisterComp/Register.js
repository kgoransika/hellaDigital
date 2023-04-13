import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import avatar from '../../assets/profile.png';
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { registerValidation } from '../../helper/validate';
import convertToBase64 from '../../helper/convert';
import bgImg from '../../assets/hellaDigitalBG1.png';
import styles from '../../styles/Username.module.css';
import { registerUser } from '../../helper/helper';

export default function Register() {
  const navigate = useNavigate();
  const [file, setFile] = useState();
  const [role, setRole] = useState();
  let successRole;

  const handleChange = (e) => {
    setRole(e.target.value);
  };

  if (role === 'dps') {
    successRole = 'Digital product Seller';
  } else if (role === 'dsp') {
    successRole = 'Digital Service Provider';
  } else if (role === 'client') {
    successRole = 'Client';
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      username: '',
      password: '',
      role: '',
    },
    validate: registerValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = await Object.assign(
        values,
        { profile: file || '' },
        { role: role }
      );
      let registerPromise = registerUser(values);
      console.log(values);
      toast.promise(registerPromise, {
        loading: 'Creating...',
        success: <b>Registered as {successRole}</b>,
        error: <b>Could not Register.</b>,
      });

      registerPromise.then(function () {
        navigate('/username');
      });
    },
  });

  /** Handler to upload files */
  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  };

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
        <div className={styles.gradient} style={{ width: '52%' }}>
          <div className={styles.glass}>
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
                Create your account to get started
              </span>
            </div>

            <form className="py-1" onSubmit={formik.handleSubmit}>
              <div className="profile flex justify-center py-4">
                <label htmlFor="profile">
                  <img
                    src={file || avatar}
                    className={styles.profile_img}
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

              <div className="items-center flex flex-row">
                <div
                  className="textbox flex flex-col float-left gap-7 mb-3"
                  style={{ width: '78%' }}
                >
                  <input
                    {...formik.getFieldProps('email')}
                    className={styles.textbox}
                    type="text"
                    placeholder="Email*"
                    autoComplete="off"
                  />
                  <input
                    {...formik.getFieldProps('username')}
                    className={styles.textbox}
                    type="text"
                    placeholder="Username*"
                    autoComplete="off"
                  />
                  <input
                    {...formik.getFieldProps('password')}
                    className={styles.textbox}
                    type="password"
                    placeholder="Password*"
                    autoComplete="new-password"
                  />
                </div>
                <div
                  className="float-right"
                  style={{ width: '60%', height: '200px' }}
                >
                  <div
                    {...formik.getFieldProps('role')}
                    className="flex flex-col space-y-4 mr-10"
                    style={{ width: '100%', height: '200px' }}
                  >
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        className="form-radio text-indigo-600 h-5 w-5"
                        name="role"
                        value="dps"
                        onChange={handleChange}
                        checked={role === 'dps'}
                      />
                      <span className="ml-2">
                        I am a digital product seller
                      </span>
                    </label>
                    <br />
                    <label className="inline-flex items-center">
                      <input
                        {...formik.getFieldProps('role')}
                        type="radio"
                        className="form-radio text-indigo-600 h-5 w-5"
                        name="role"
                        value="dsp"
                        onChange={handleChange}
                        checked={role === 'dsp'}
                      />
                      <span className="ml-2">
                        I am a digital service seller
                      </span>
                    </label>
                    <br />
                    <label className="inline-flex items-center">
                      <input
                        {...formik.getFieldProps('role')}
                        type="radio"
                        className="form-radio text-indigo-600 h-5 w-5"
                        name="role"
                        value="client"
                        onChange={handleChange}
                        checked={role === 'client'}
                      />
                      <span className="ml-2">
                        I am a client searching for digital products
                      </span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="text-center py-4">
                <button
                  className={styles.btn}
                  type="submit"
                  style={{ width: '40%' }}
                >
                  Register
                </button>
                <br />
                <span className="text-black-500">
                  Are you already registered?{' '}
                  <Link className="text-red-500" to="/username">
                    Login Now
                  </Link>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
