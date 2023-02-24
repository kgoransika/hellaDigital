import React from 'react';
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { resetPasswordValidation } from '../../helper/validate';
import bgImg from '../../assets/hellaDigitalBG1.png';

import styles from '../../styles/Username.module.css';

export default function Reset() {
  const formik = useFormik({
    initialValues: {
      password: '',
      confirm_pwd: '',
    },
    validate: resetPasswordValidation,
    validateOnBlur: false,
    validateOnChange: false,
  });

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
                />
                <input
                  {...formik.getFieldProps('confirm_pwd')}
                  className={styles.textbox}
                  type="password"
                  placeholder="Confirm Password"
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
