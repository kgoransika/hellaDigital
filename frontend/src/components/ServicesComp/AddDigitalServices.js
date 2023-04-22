import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Card, CardBody } from '@windmill/react-ui';
import convertToBase64 from '../../helper/convert';

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
  const [category, setCategory] = React.useState('');
  const [subcategory, setSubcategory] = React.useState('');
  const subcategories =
    categories.find((c) => c.name === category)?.subcategories || [];

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

  const [img, setImg] = React.useState();
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const [serviceOverview, setServiceOverview] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [image, setImage] = React.useState(null);

  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setImg(base64);
  };

  React.useEffect(() => {
    setCategory('photos');
  }, []);

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

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  const handleServiceOverviewChange = (event) => {
    setServiceOverview(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
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
                    <form>
                      <Box sx={{ width: '50%' }}>
                        <label htmlFor="serviceName">Service Name:</label>
                        <input
                          type="text"
                          id="serviceName"
                          name="serviceName"
                          placeholder="Eg: I can design a logo for you"
                        />
                        <br />
                        <br />
                        <label htmlFor="description">Description:</label>
                        <textarea
                          id="description"
                          name="description"
                          rows="5"
                          cols="50"
                        ></textarea>
                        <br />
                        <br />
                        <label htmlFor="category">Category:</label>
                        <div className="flex">
                          <select
                            className="border rounded w-1/7 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ml-2"
                            id="category"
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
                              className="border rounded w-1/7 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ml-2"
                              id="subcategory"
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
                                type="text"
                                id="packageName"
                                placeholder="Eg: Basic"
                                name="packageName"
                                className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
                              />
                            </div>
                            <div className="my-4">
                              <label htmlFor="price" className="block mb-2">
                                Price:
                              </label>
                              <input
                                type="number"
                                id="price"
                                name="price"
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
                                type="number"
                                id="deliveryTime"
                                name="deliveryTime"
                                className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
                              />
                            </div>
                            <div className="my-4">
                              <label htmlFor="revisions" className="block mb-2">
                                Number of revisions:
                              </label>
                              <input
                                type="number"
                                id="revisions"
                                name="revisions"
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
                                htmlFor="packageName"
                                className="block mb-2"
                              >
                                Package Name
                              </label>
                              <input
                                type="text"
                                id="packageName"
                                name="packageName"
                                placeholder="Eg: Standard"
                                className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
                              />
                            </div>
                            <div className="my-4">
                              <label htmlFor="price" className="block mb-2">
                                Price:
                              </label>
                              <input
                                type="number"
                                id="price"
                                name="price"
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
                                type="number"
                                id="deliveryTime"
                                name="deliveryTime"
                                className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
                              />
                            </div>
                            <div className="my-4">
                              <label htmlFor="revisions" className="block mb-2">
                                Number of revisions:
                              </label>
                              <input
                                type="number"
                                id="revisions"
                                name="revisions"
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
                                htmlFor="packageName"
                                className="block mb-2"
                              >
                                Package Name
                              </label>
                              <input
                                type="text"
                                id="packageName"
                                name="packageName"
                                placeholder="Eg: Premium"
                                className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
                              />
                            </div>
                            <div className="my-4">
                              <label htmlFor="price" className="block mb-2">
                                Price:
                              </label>
                              <input
                                type="number"
                                id="price"
                                name="price"
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
                                type="number"
                                id="deliveryTime"
                                name="deliveryTime"
                                className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
                              />
                            </div>
                            <div className="my-4">
                              <label htmlFor="revisions" className="block mb-2">
                                Number of revisions:
                              </label>
                              <input
                                type="number"
                                id="revisions"
                                name="revisions"
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
                            <label htmlFor="dpImg">
                              <img src={img} alt="Preview Img" />
                              <p className="text-blue-500 underline cursor-pointer">
                                Browse
                              </p>
                            </label>
                            <input
                              onChange={onUpload}
                              type="file"
                              id="dpImg"
                              name="dpImg"
                              className="dpImg"
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
                          <label htmlFor="portfolio">
                            Add Portfolio link to show your previous work to the
                            customers
                          </label>
                          <input
                            className="w-2/3"
                            type="text"
                            id="portfolioLink"
                            name="portfolioLink"
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
                    <Button sx={{ float: 'right' }}>Submit</Button>
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
