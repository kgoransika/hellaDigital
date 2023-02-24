import React from 'react';
import { Link } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import avatar from '../../assets/profile.png';
import bgImg from '../../assets/hellaDigitalBG1.png';
import styles from '../../styles/Username.module.css';
import { useFormik } from 'formik';
import { loginValidate } from '../../helper/validate';

export default function Login() {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validate: loginValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      console.log(values);
    },
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
            <div className="title flex flex-col items-center text-center">
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
                className="py-4 text-center text-white"
                style={{ letterSpacing: '2px' }}
              >
                Sign in to access your account
              </span>
            </div>

            <form className="py-1" onSubmit={formik.handleSubmit}>
              <div className="profile flex justify-center py-4">
                <img src={avatar} className={styles.profile_img} alt="avatar" />
              </div>

              <div className="textbox flex flex-col items-center gap-6">
                <input
                  {...formik.getFieldProps('username')}
                  className={styles.textbox}
                  type="text"
                  placeholder="Username"
                />
                <input
                  {...formik.getFieldProps('password')}
                  className={styles.textbox}
                  type="password"
                  placeholder="Password"
                />
                <button className={styles.btn} type="submit">
                  Sign In
                </button>
              </div>

              <div className="text-center py-4">
                <span className="text-white-500">
                  Not a Member{' '}
                  <Link className="text-red-500" to="/register">
                    Register Now
                  </Link>
                </span>
                <br />
                <span className="text-white-500">
                  Forgot Password?{' '}
                  <Link className="text-red-500" to="/recovery">
                    Recover Now
                  </Link>
                </span>
              </div>
              <div className="text-center"></div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
