import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Card, CardBody } from '@windmill/react-ui';
import convertToBase64 from '../../helper/convert';
import { useFormik } from 'formik';
import { addDigitalService } from '../../helper/helper';
import toast, { Toaster } from 'react-hot-toast';
import { getUsername } from '../../helper/helper';
import { useNavigate } from 'react-router-dom';
import ServicesGuy from '../../assets/servicesGuy.png';

const steps = ['Service Overview', 'Pricing', 'Add Photos & Portfolio'];

const categories = [
  {
    name: 'Photos',
    subcategories: ['Photo Editing', 'Photo Retouching', 'Vector Tracing'],
  },
  {
    name: 'Videos',
    subcategories: [
      'Video Editing',
      'Video Ads and Commercials',
      'Video Marketing',
    ],
  },
  {
    name: 'Music',
    subcategories: ['Music Producer', 'Sound Effects', 'Voice Over'],
  },
  {
    name: 'Websites and Apps',
    subcategories: [
      'Web development',
      'Mobile Application development',
      'Wordpress Development',
    ],
  },
  {
    name: 'E-Books',
    subcategories: ['Book Writing', 'Book Layouts and Cover Design'],
  },
  {
    name: 'Printable',
    subcategories: ['Custom Printable Design', 'Poster Design', 'Illustration'],
  },
  {
    name: 'Graphic Assets',
    subcategories: [
      'Logo Design',
      'Logo Animations',
      'Intros and Outros',
      '3D product designing',
    ],
  },
];

export default function AddDigitalServices() {
  const navigate = useNavigate();

  const div1Style = {
    padding: '20px',
    width: '100%',
    height: 'auto',
    margin: '20px',
    border: '1px solid #dee2e6',
    boxShadow: '0 0 1px 1px #dee2e6',
    borderRadius: '10px',
  };

  const div2Style = {
    padding: '20px',
    height: 'auto',
    margin: '20px',
    border: '1px #0066FF',
    boxShadow: '0 0 10px 0.5px #0066FF',
    borderRadius: '10px',
  };

  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});

  //Service Overview use States
  const [serviceName, setServiceName] = React.useState('');
  const [serviceDescription, setServiceDescription] = React.useState('');
  const [category, setCategory] = React.useState('Photos');
  const [subcategory, setSubcategory] = React.useState('Photo Editing');
  const subcategories =
    categories.find((c) => c.name === category)?.subcategories || [];

  //Pricing use States
  const [dsPkg1Name, setPkg1Name] = React.useState('');
  const [dsPkg1Price, setPkg1Price] = React.useState('');
  const [dsPkg1Dt, setPkg1Dt] = React.useState('');
  const [dsPkg1Revisions, setPkg1Revisions] = React.useState('');
  const [dsPkg2Name, setPkg2Name] = React.useState('');
  const [dsPkg2Price, setPkg2Price] = React.useState('');
  const [dsPkg2Dt, setPkg2Dt] = React.useState('');
  const [dsPkg2Revisions, setPkg2Revisions] = React.useState('');
  const [dsPkg3Name, setPkg3Name] = React.useState('');
  const [dsPkg3Price, setPkg3Price] = React.useState('');
  const [dsPkg3Dt, setPkg3Dt] = React.useState('');
  const [dsPkg3Revisions, setPkg3Revisions] = React.useState('');

  //Add Photos & Portfolio use States
  const [img, setImg] = React.useState();
  const [portfolioLink, setPortfolioLink] = React.useState('');

  const [username, setUsername] = React.useState('');
  const [role, setRole] = React.useState('');

  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setImg(base64);
  };

  React.useEffect(() => {
    setCategory('Photos');

    getUsername()
      .then((decodedToken) => {
        setUsername(decodedToken.username);
        setRole(decodedToken.role);
        formik.setValues((values) => ({
          ...values,
          dsOwner: decodedToken.username,
        }));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const formik = useFormik({
    initialValues: {
      dsName: '',
      dsDescription: '',
      dsCategory: '',
      dsSubCategory: '',
      dsPkgs: {
        dsPkg1: {
          dsPkg1Name: '',
          dsPkg1Price: '',
          dsPkg1DeliveryTime: '',
          dsPkg1Revisions: '',
        },
        dsPkg2: {
          dsPkg2Name: '',
          dsPkg2Price: '',
          dsPkg2DeliveryTime: '',
          dsPkg2Revisions: '',
        },
        dsPkg3: {
          dsPkg3Name: '',
          dsPkg3Price: '',
          dsPkg3DeliveryTime: '',
          dsPkg3Revisions: '',
        },
      },
      dsImg: '',
      dsPortfolioLink: '',
      dsOwner: '',
    },

    onSubmit: async (values) => {
      values = await Object.assign(
        values,
        { dsName: serviceName },
        { dsDescription: serviceDescription },
        { dsCategory: category },
        { dsSubCategory: subcategory },
        {
          dsPkgs: {
            dsPkg1: {
              dsPkg1Name: dsPkg1Name,
              dsPkg1Price: dsPkg1Price,
              dsPkg1DeliveryTime: dsPkg1Dt,
              dsPkg1Revisions: dsPkg1Revisions,
            },
            dsPkg2: {
              dsPkg2Name: dsPkg2Name,
              dsPkg2Price: dsPkg2Price,
              dsPkg2DeliveryTime: dsPkg2Dt,
              dsPkg2Revisions: dsPkg2Revisions,
            },
            dsPkg3: {
              dsPkg3Name: dsPkg3Name,
              dsPkg3Price: dsPkg3Price,
              dsPkg3DeliveryTime: dsPkg3Dt,
              dsPkg3Revisions: dsPkg3Revisions,
            },
          },
        },
        { dsImg: img },
        { dsPortfolioLink: portfolioLink }
      );
      let addDigitalServicePromise = addDigitalService(values);
      console.log(values);
      toast.promise(addDigitalServicePromise, {
        loading: 'Hold on your product is getting added...',
        success: <b>Product added successfully</b>,
        error: <b>Product couldn't be added</b>,
      });

      addDigitalServicePromise.then(function () {
        navigate('/services');
      });
    },
  });

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  return (
    <>
      <style>
        {`
        input, select, textarea {
          width: 100%;
          padding: 12px;
          border: 1px solid #ccc;
          border-radius: 4px;
          box-sizing: border-box;
          margin-top: 6px;
          margin-bottom: 16px;
          resize: vertical;
        } 
    `}
      </style>
      <div className="mt-20 ml-20 mr-20">
        <Toaster position="top-center" reverseOrder={false}></Toaster>
        <div style={div1Style}>
          <h2>Let's add your service!</h2>
          <br />
          <div className="mb-20">
            <Box sx={{ width: '100%' }}>
              <Stepper nonLinear activeStep={activeStep}>
                {steps.map((label, index) => (
                  <Step key={label}>
                    <StepButton
                      color="inherit"
                      onClick={handleStep(index)}
                      completed={completed[index]}
                    >
                      {label}
                    </StepButton>
                  </Step>
                ))}
              </Stepper>
              <div>
                {activeStep === 0 && (
                  <div>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                      Please provide an overview of your service
                    </Typography>
                    <form className="flex">
                      <Box sx={{ width: '200vh' }}>
                        <label htmlFor="dsName">Service Name:</label>
                        <input
                          {...formik.getFieldProps('dsName')}
                          type="text"
                          id="dsName"
                          name="dsName"
                          value={serviceName}
                          onChange={(e) => setServiceName(e.target.value)}
                          placeholder="Eg: I can design a logo for you"
                        />
                        <br />
                        <br />
                        <label htmlFor="dsDescription">Description:</label>
                        <textarea
                          {...formik.getFieldProps('dsDescription')}
                          id="dsDescription"
                          name="dsDescription"
                          value={serviceDescription}
                          onChange={(e) =>
                            setServiceDescription(e.target.value)
                          }
                          rows="5"
                          cols="50"
                        ></textarea>
                        <br />
                        <br />
                        <label htmlFor="dsCategory">Category:</label>
                        <div className="flex">
                          <select
                            {...formik.getFieldProps('dsCategory')}
                            className="border rounded w-1/7 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ml-2"
                            id="dsCategory"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                          >
                            <option value="">Select a category</option>
                            {categories.map((c) => (
                              <option key={c.name} value={c.name}>
                                {c.name}
                              </option>
                            ))}
                          </select>
                          {subcategories.length > 0 && (
                            <select
                              {...formik.getFieldProps('dsSubcategory')}
                              className="border rounded w-1/7 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ml-2"
                              id="dsSubcategory"
                              value={subcategory}
                              onChange={(e) => setSubcategory(e.target.value)}
                            >
                              <option value="">Select a subcategory</option>
                              {subcategories.map((s) => (
                                <option key={s} value={s}>
                                  {s}
                                </option>
                              ))}
                            </select>
                          )}
                        </div>
                      </Box>
                      <div>
                        <img
                          src={ServicesGuy}
                          alt="servicesGuy"
                          className="w-3/4 ml-40"
                        />
                      </div>
                    </form>
                  </div>
                )}
                {activeStep === 1 && (
                  <div className="flex justify-center w-full mt-5 mb-10">
                    <div className="flex gap-16 w-full ml-6 mr-6">
                      <Card className="shadow-md w-1/3">
                        <h2 className="text-center mt-3">Package 1</h2>
                        <CardBody>
                          <form>
                            <div className="my-4">
                              <label
                                htmlFor="packageName"
                                className="block mb-2"
                              >
                                Package Name
                              </label>
                              <input
                                {...formik.getFieldProps('dsPkg1Name')}
                                type="text"
                                id="dsPkg1Name"
                                placeholder="Eg: Basic"
                                name="dsPkg1Name"
                                value={dsPkg1Name}
                                onChange={(e) => setPkg1Name(e.target.value)}
                                className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
                              />
                            </div>
                            <div className="my-4">
                              <label htmlFor="price" className="block mb-2">
                                Price:
                              </label>
                              <input
                                {...formik.getFieldProps('dsPkg1Price')}
                                type="number"
                                id="dsPkg1Price"
                                name="dsPkg1Price"
                                value={dsPkg1Price}
                                onChange={(e) => setPkg1Price(e.target.value)}
                                className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
                              />
                            </div>
                            <div className="my-4">
                              <label
                                htmlFor="deliveryTime"
                                className="block mb-2"
                              >
                                Delivery Time (in days):
                              </label>
                              <input
                                {...formik.getFieldProps('dsPkg1Dt')}
                                type="number"
                                id="dsPkg1Dt"
                                name="dsPkg1Dt"
                                value={dsPkg1Dt}
                                onChange={(e) => setPkg1Dt(e.target.value)}
                                className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
                              />
                            </div>
                            <div className="my-4">
                              <label htmlFor="revisions" className="block mb-2">
                                Number of revisions:
                              </label>
                              <input
                                {...formik.getFieldProps('dsPkg1Revisions')}
                                type="number"
                                id="dsPkg1Revisions"
                                name="dsPkg1Revisions"
                                value={dsPkg1Revisions}
                                onChange={(e) =>
                                  setPkg1Revisions(e.target.value)
                                }
                                className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
                              />
                            </div>
                          </form>
                        </CardBody>
                      </Card>
                      <Card className="shadow-md w-1/3">
                        <h2 className="text-center mt-3">Package 2</h2>
                        <CardBody>
                          <form>
                            <div className="my-4">
                              <label
                                htmlFor="dsPkg2Name"
                                className="block mb-2"
                              >
                                Package Name
                              </label>
                              <input
                                {...formik.getFieldProps('dsPkg2Name')}
                                type="text"
                                id="dsPkg2Name"
                                name="dsPkg2Name"
                                value={dsPkg2Name}
                                onChange={(e) => setPkg2Name(e.target.value)}
                                placeholder="Eg: Standard"
                                className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
                              />
                            </div>
                            <div className="my-4">
                              <label
                                htmlFor="dsPkg2Price"
                                className="block mb-2"
                              >
                                Price:
                              </label>
                              <input
                                {...formik.getFieldProps('dsPkg2Price')}
                                type="number"
                                id="dsPkg2Price"
                                name="dsPkg2Price"
                                value={dsPkg2Price}
                                onChange={(e) => setPkg2Price(e.target.value)}
                                className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
                              />
                            </div>
                            <div className="my-4">
                              <label htmlFor="dsPkg2Dt" className="block mb-2">
                                Delivery Time (in days):
                              </label>
                              <input
                                {...formik.getFieldProps('dsPkg2Dt')}
                                type="number"
                                id="dsPkg2Dt"
                                name="dsPkg2Dt"
                                value={dsPkg2Dt}
                                onChange={(e) => setPkg2Dt(e.target.value)}
                                className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
                              />
                            </div>
                            <div className="my-4">
                              <label
                                htmlFor="dsPkg2Revisions"
                                className="block mb-2"
                              >
                                Number of revisions:
                              </label>
                              <input
                                {...formik.getFieldProps('dsPkg2Revisions')}
                                type="number"
                                id="dsPkg2Revisions"
                                name="dsPkg2Revisions"
                                value={dsPkg2Revisions}
                                onChange={(e) =>
                                  setPkg2Revisions(e.target.value)
                                }
                                className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
                              />
                            </div>
                          </form>
                        </CardBody>
                      </Card>
                      <Card className="shadow-md w-1/3">
                        <h2 className="text-center mt-3">Package 3</h2>
                        <CardBody>
                          <form>
                            <div className="my-4">
                              <label
                                htmlFor="dsPkg3Name"
                                className="block mb-2"
                              >
                                Package Name
                              </label>
                              <input
                                {...formik.getFieldProps('dsPkg3Name')}
                                type="text"
                                id="dsPkg3Name"
                                name="dsPkg3Name"
                                value={dsPkg3Name}
                                onChange={(e) => setPkg3Name(e.target.value)}
                                placeholder="Eg: Premium"
                                className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
                              />
                            </div>
                            <div className="my-4">
                              <label
                                htmlFor="dsPkg3Price"
                                className="block mb-2"
                              >
                                Price:
                              </label>
                              <input
                                {...formik.getFieldProps('dsPkg3Price')}
                                type="number"
                                id="dsPkg3Price"
                                name="dsPkg3Price"
                                value={dsPkg3Price}
                                onChange={(e) => setPkg3Price(e.target.value)}
                                className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
                              />
                            </div>
                            <div className="my-4">
                              <label htmlFor="dsPkg3Dt" className="block mb-2">
                                Delivery Time (in days):
                              </label>
                              <input
                                {...formik.getFieldProps('dsPkg3Dt')}
                                type="number"
                                id="dsPkg3Dt"
                                name="dsPkg3Dt"
                                value={dsPkg3Dt}
                                onChange={(e) => setPkg3Dt(e.target.value)}
                                className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
                              />
                            </div>
                            <div className="my-4">
                              <label
                                htmlFor="dsPkg3Revisions"
                                className="block mb-2"
                              >
                                Number of revisions:
                              </label>
                              <input
                                {...formik.getFieldProps('dsPkg3Revisions')}
                                type="number"
                                id="dsPkg3Revisions"
                                name="dsPkg3Revisions"
                                value={dsPkg3Revisions}
                                onChange={(e) =>
                                  setPkg3Revisions(e.target.value)
                                }
                                className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
                              />
                            </div>
                          </form>
                        </CardBody>
                      </Card>
                    </div>
                  </div>
                )}
                {activeStep === 2 && (
                  <div>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                      Please add a thumnail for the service
                    </Typography>
                    <form>
                      <Box sx={{ width: '100%' }}>
                        <div className="w-1/2">
                          <div style={div2Style}>
                            <label htmlFor="dsImg">
                              <img src={img} alt="Preview Img" />
                              <p className="text-blue-500 underline cursor-pointer">
                                Browse
                              </p>
                            </label>
                            <input
                              onChange={onUpload}
                              type="file"
                              id="dsImg"
                              name="dsImg"
                              className="dsImg"
                              accept="image/*"
                            />
                            {!img && (
                              <>
                                <p className="text-center text-gray-500">
                                  A preview of your uploaded image will be shown
                                  here!
                                </p>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="w-1/2">
                          <label htmlFor="dsPortfolioLink">
                            Add Portfolio link to show your previous work to the
                            customers
                          </label>
                          <input
                            {...formik.getFieldProps('dsPortfolioLink')}
                            className="w-2/3"
                            type="text"
                            id="dsPortfolioLink"
                            name="dsPortfolioLink"
                            value={portfolioLink}
                            onChange={(e) => setPortfolioLink(e.target.value)}
                            placeholder="Note: You can add Google Drive link or Onedrive link as well"
                          />
                        </div>
                      </Box>
                    </form>
                  </div>
                )}
                <div sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                  <Box sx={{ flex: '1 1 auto' }} />
                  {activeStep === totalSteps() - 1 ? (
                    <Button
                      sx={{ float: 'right' }}
                      onClick={formik.handleSubmit}
                    >
                      Submit
                    </Button>
                  ) : (
                    <Button onClick={handleNext} sx={{ mr: 1, float: 'right' }}>
                      Next
                    </Button>
                  )}
                  {activeStep !== 0 && (
                    <Button
                      color="inherit"
                      onClick={handleBack}
                      sx={{ mr: 1, float: 'right' }}
                    >
                      Back
                    </Button>
                  )}
                </div>
              </div>
            </Box>
          </div>
        </div>
      </div>
    </>
  );
}
