import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const steps = ['Service Overview', 'Pricing', 'Add Photos'];

export default function AddDigitalServices() {
  const div1Style = {
    padding: '20px',
    width: '100%',
    height: '100vh',
    margin: '20px',
    border: '1px solid #dee2e6',
    boxShadow: '0 0 1px 1px #dee2e6',
    borderRadius: '10px',
  };

  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const [serviceOverview, setServiceOverview] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [image, setImage] = React.useState(null);

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
                      <select id="category" name="category">
                        <option value="web-development">Web Development</option>
                        <option value="graphic-design">Graphic Design</option>
                        <option value="content-writing">Content Writing</option>
                      </select>
                    </Box>
                  </form>
                </div>
              )}
              {activeStep === 1 && (
                <div>
                  <Typography sx={{ mt: 2, mb: 1 }}>
                    Please set your pricing for the service
                  </Typography>
                  <form>
                    <Box sx={{ width: '50%' }}>
                      <label htmlFor="price">Price:</label>
                      <input type="number" id="price" name="price" />
                      <br />
                      <br />
                      <label htmlFor="deliveryTime">
                        Delivery Time (in days):
                      </label>
                      <input
                        type="number"
                        id="deliveryTime"
                        name="deliveryTime"
                      />
                      <br />
                      <br />
                      <label htmlFor="revisions">Number of revisions:</label>
                      <input type="number" id="revisions" name="revisions" />
                    </Box>
                  </form>
                </div>
              )}
              {activeStep === 2 && (
                <div>
                  <Typography sx={{ mt: 2, mb: 1 }}>
                    Please add photos for the service
                  </Typography>
                  <form>
                    <Box sx={{ width: '50%' }}>
                      <input type="file" id="file" name="file" multiple />
                    </Box>
                  </form>
                </div>
              )}
              <div sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                {activeStep !== 0 && (
                  <Button color="inherit" onClick={handleBack} sx={{ mr: 1 }}>
                    Back
                  </Button>
                )}
                <Box sx={{ flex: '1 1 auto' }} />
                {activeStep === totalSteps() - 1 ? (
                  <Button>Submit</Button>
                ) : (
                  <Button onClick={handleNext} sx={{ mr: 1 }}>
                    Next
                  </Button>
                )}
              </div>
            </div>
          </Box>
        </div>
      </div>
    </>
  );
}
