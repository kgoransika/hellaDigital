import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useAuthStore } from '../../store/store';
import styles from '../../styles/Username.module.css';
import bgImg from '../../assets/hellaDigitalBG1.png';
import { generateOTP, verifyOTP } from '../../helper/helper';
import { useNavigate } from 'react-router-dom';

export default function Recovery() {
  const { username } = useAuthStore((state) => state.auth);
  const [OTP, setOTP] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    generateOTP(username).then((OTP) => {
      console.log(OTP);
      if (OTP) return toast.success('OTP has been send to your email!');
      return toast.error('Problem while generating OTP!');
    });
  }, [username]);

  async function onSubmit(e) {
    e.preventDefault();
    try {
      let { status } = await verifyOTP({ username, code: OTP });
      if (status === 201) {
        toast.success('Verify Successfully!');
        return navigate('/reset');
      }
    } catch (error) {
      return toast.error('Wront OTP! Check email again!');
    }
  }

  // handler of resend OTP
  function resendOTP() {
    let sentPromise = generateOTP(username);

    toast.promise(sentPromise, {
      loading: 'Sending...',
      success: <b>OTP has been send to your email!</b>,
      error: <b>Could not Send it!</b>,
    });

    sentPromise.then((OTP) => {
      console.log(OTP);
    });
  }

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
                className="py-4 w-3/4 text-center text-white"
                style={{ letterSpacing: '2px' }}
              >
                Enter OTP to recover password.
              </span>
            </div>

            <form className="pt-20" onSubmit={onSubmit}>
              <div className="textbox flex flex-col items-center gap-6">
                <div className="input text-center items-center flex flex-col">
                  <span className="py-4 text-sm text-left text-black-500">
                    Enter 6 digit OTP sent to your email address.
                  </span>
                  <input
                    onChange={(e) => setOTP(e.target.value)}
                    className={styles.textbox}
                    type="text"
                    placeholder="OTP"
                  />
                </div>

                <button className={styles.btn} type="submit">
                  Recover
                </button>
              </div>
            </form>

            <div className="text-center py-10">
              <span className="text-black-500">
                Can't get OTP?{' '}
                <button onClick={resendOTP} className="text-red-500">
                  Resend
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
