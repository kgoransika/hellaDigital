import React from 'react';
import NavbarComp from '../NavbarComp/NavbarComp';
import convertToBase64 from '../../helper/convert';
import FooterComp from '../FooterComp/FooterComp';
import useFetch from '../../hooks/fetch.hook';
import { useFormik } from 'formik';
import { updateUser } from '../../helper/helper';
import toast, { Toaster } from 'react-hot-toast';

export default function AccountVerify() {
  const [idImg, setImg] = React.useState();
  const [selectedFile, setSelectedFile] = React.useState();
  const [{ isLoading, apiData, serverError }] = useFetch();

  const formik = useFormik({
    enableReinitialize: true,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = await Object.assign(values, {
        idImg: idImg || apiData?.idImg || '',
      });
      let updatePromise = updateUser(values);

      toast.promise(updatePromise, {
        loading: 'Updating...',
        success: <b>Update Successful!</b>,
        error: <b>Could Not Update Profile</b>,
      });
    },
  });

  /** Handler to preview Image */
  const onUpload = async (e) => {
    setImg(e.target.files[0]);
    const base64 = await convertToBase64(e.target.files[0]);
    setSelectedFile(base64);
  };

  const div2Style = {
    padding: '20px',
    width: 'auto',
    height: 'auto',
    margin: '20px',
    border: '1px solid #dee2e6',
    boxShadow: '0 0 1px 1px #dee2e6',
    borderRadius: '10px',
  };

  return (
    <>
      <NavbarComp />
      <div className="mt-28 ml-20 mr-20">
        <Toaster position="top-center" reverseOrder={false}></Toaster>

        <div className="verifyEmail">
          <h2>Verify your email address</h2>
          <p>
            An email will be sent to your email address with a link to verify
            your account.
          </p>
          <button className="bg-blue-600 text-white py-1 px-3 rounded-lg text-sm ms-auto">
            Verify email now!
          </button>
        </div>
        <hr />
        <div style={div2Style}>
          <form onSubmit={formik.handleSubmit}>
            <div className="w-1/2 max-w-md">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="idImg"
              >
                Upload an image of your ID
              </label>
              <div style={div2Style}>
                <label htmlFor="idImg">
                  <p className="text-blue-500 underline cursor-pointer">
                    Browse
                  </p>
                  {idImg ? (
                    <>
                      <img src={idImg} alt={'Img Preview'} />
                    </>
                  ) : (
                    <>
                      <p className="text-gray-500 text-sm text-center">
                        A preview of your selected image will be shown here!
                      </p>
                      <p className="text-red-500 text-sm  text-center">
                        Note that your ID will fail to verify if you are not the
                        person appeared in the ID
                      </p>
                    </>
                  )}
                </label>
                <img src={selectedFile} alt="" className="idImg" />
                <input
                  onChange={onUpload}
                  type="file"
                  id="idImg"
                  name="idImg"
                  className="idImg"
                  accept="image/*"
                />
              </div>
            </div>
            <button className="bg-blue-600 text-white py-2 px-4 rounded-lg text-sm mx-auto">
              UPLOAD!
            </button>
          </form>
        </div>
      </div>
      <FooterComp />
    </>
  );
}
