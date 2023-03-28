import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import avatar from '../../assets/profile.png';
import bgImg from '../../assets/hellaDigitalBG1.png';
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { passwordValidate } from '../../helper/validate';
import useFetch from '../../hooks/fetch.hook';
import { useAuthStore } from '../../store/store';
import { verifyPassword } from '../../helper/helper';
import styles from '../../styles/Username.module.css';

export default function Password() {
  const navigate = useNavigate();
  const { username } = useAuthStore((state) => state.auth);
  const setRole = useAuthStore((state) => state.setRole);
  const [navigateBasedOnRole, setNavigateBasedOnRole] = useState(false);
  const [{ isLoading, apiData, serverError, isLoggedIn }] = useFetch(
    `/user/${username}`
  );

  useEffect(() => {
    if (isLoggedIn) {
      setNavigateBasedOnRole(true);
    }
  }, [isLoggedIn, apiData]);

  function navigateRole() {
    if (navigateBasedOnRole === true) {
      setRole('dps');
      if (apiData.role === 'dps') {
        setRole('dps');
        navigate('/dashboard');
      } else if (apiData.role === 'dsp') {
        setRole('dsp');
        navigate('/dashboard');
      } else if (apiData.role === 'client') {
        setRole('client');
        navigate('/');
      }
      window.location.reload();
    }
  }
  const formik = useFormik({
    initialValues: {
      password: '',
    },
    validate: passwordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      let loginPromise = verifyPassword({
        username,
        password: values.password,
      });
      toast.promise(loginPromise, {
        loading: 'Checking...',
        success: <b>Login Successfully...!</b>,
        error: <b>Password Not Match!</b>,
      });

      loginPromise.then((res) => {
        let { token } = res.data;
        localStorage.setItem('token', token);
        console.log(res.data.role);
        if (navigateBasedOnRole === true) {
          if (res.data.role === 'dps') {
            navigate('/dashboard');
          } else if (res.data.role === 'dsp') {
            navigate('/dashboard');
          } else if (res.data.role === 'client') {
            navigate('/');
          }
          window.location.reload();
        }
      });
    },
  });

  if (isLoading)
    return (
      <h1 className="text-2xl font-bold" style={{ zIndex: '1' }}>
        isLoading
      </h1>
    );
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
              <span className="py-4 text-xl w-2/3 text-center text-white">
                Hello {apiData?.firstName || apiData?.username}
              </span>
            </div>

            <form className="py-1" onSubmit={formik.handleSubmit}>
              <div className="profile flex justify-center py-4">
                <img
                  src={apiData?.profile || avatar}
                  className={styles.profile_img}
                  alt="avatar"
                />
              </div>

              <div className="textbox flex flex-col items-center gap-6">
                <input
                  {...formik.getFieldProps('password')}
                  className={styles.textbox}
                  type="password"
                  placeholder="Password"
                  autoComplete="new-password"
                />
                <button className={styles.btn} type="submit">
                  Sign In
                </button>
              </div>

              <div className="text-center py-4">
                <span className="text-gray-500">
                  Forgot Password?{' '}
                  <Link className="text-red-500" to="/recovery">
                    Recover Now
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
