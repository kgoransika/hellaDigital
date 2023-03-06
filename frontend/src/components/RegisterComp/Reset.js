import React, { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { resetPasswordValidation } from '../../helper/validate';
import bgImg from '../../assets/hellaDigitalBG1.png';
import { resetPassword } from '../../helper/helper';
import { useAuthStore } from '../../store/store';
import { useNavigate, Navigate } from 'react-router-dom';
import useFetch from '../../hooks/fetch.hook';

import styles from '../../styles/Username.module.css';

export default function Reset() {
  const { username } = useAuthStore((state) => state.auth);
  const navigate = useNavigate();
  const [{ isLoading, apiData, status, serverError }] =
    useFetch('createResetSession');

  const formik = useFormik({
    initialValues: {
      password: '',
      confirm_pwd: '',
    },
    validate: resetPasswordValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      let resetPromise = resetPassword({ username, password: values.password });

      toast.promise(resetPromise, {
        loading: 'Updating...',
        success: <b>Reset Successfully...!</b>,
        error: <b>Could not Reset!</b>,
      });

      resetPromise.then(function () {
        navigate('/password');
      });
    },
  });

  if (isLoading) return <h1 className="text-2xl font-bold">isLoading</h1>;
  if (serverError)
    return <h1 className="text-xl text-red-500">{serverError.message}</h1>;
  if (status && status !== 201)
    return <Navigate to={'/password'} replace={true}></Navigate>;

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
                Enter your new password.
              </span>
            </div>

            <form className="py-20" onSubmit={formik.handleSubmit}>
              <div className="textbox flex flex-col items-center gap-6">
                <input
                  {...formik.getFieldProps('password')}
                  className={styles.textbox}
                  type="password"
                  placeholder="New Password"
                  autoComplete="new-password"
                />
                <input
                  {...formik.getFieldProps('confirm_pwd')}
                  className={styles.textbox}
                  type="password"
                  placeholder="Confirm Password"
                  autoComplete="new-password"
                />
                <button className={styles.btn} type="submit">
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
