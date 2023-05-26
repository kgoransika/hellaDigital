import { Router } from 'express';
const router = Router();
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import paypal from '@paypal/checkout-server-sdk';
import { PayPalClient } from '../middleware/paypalClient.js';
import ENV from '../config.js';
import axios from 'axios';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** import all controllers */
import * as controller from '../controllers/appController.js';
import * as ProductController from '../controllers/productController.js';
import * as ServicesController from '../controllers/servicesController.js';
import * as AdminController from '../controllers/adminController.js';
import { registerMail } from '../controllers/mailer.js';
import Auth, { localVariables } from '../middleware/auth.js';
import uploadMiddleware from '../middleware/multer.js';
/* import UploadModel from '../model/UploadModel.js'; */
import DigitalProductsModel from '../model/DigitalProducts.model.js';
import DigitalServicesModel from '../model/DigitalServices.model.js';
import TokenModel from '../model/Token.model.js';
import UserModel from '../model/User.model.js';
import OrderModel from '../model/Order.model.js';

/******************************************************************/
/**************************-- PAYPAL --***************************/
const payPalClient = new PayPalClient();

// Define the route for creating a PayPal order
router.post('/paypal/checkout', async (req, res) => {
  try {
    // Extract package details from the request body
    const { packageId, price } = req.body;

    // Create a new PayPal order
    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer('return=representation');
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: 60,
          },
          custom_id: packageId, // Pass the packageId as custom_id
        },
      ],
    });

    // Send the request to PayPal to create the order
    const order = await payPalClient.client().execute(request);

    // Extract the PayPal order ID from the response
    const orderId = order.result.id;

    // Save the order ID to your database or session for reference

    // Return the PayPal payment URL to the frontend
    const approvalUrl = order.result.links.find(
      (link) => link.rel === 'approve'
    ).href;
    res.json({ orderId, approvalUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

router.post('/paypal/transaction-complete', async (req, res) => {
  try {
    // Update the user's HKBalance
    const userId = '646fa977267668bf758a39d7'; // Assuming the authenticated user is available in req.user
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // add 10 to HK balance
    user.HKBalance += 450;
    await user.save();

    res.json({ success: true });
  } catch (error) {
    if (
      error.statusCode === 404 &&
      error.message === 'The specified resource does not exist.'
    ) {
      return res.status(404).json({ error: 'Order not found' });
    }
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

router.post('/paypal/withdraw', async (req, res) => {
  // Extract the withdrawal amount from the request body
  const { withdrawalAmount, sellerUserName } = req.body;

  // Perform the PayPal withdrawal logic here
  async function initiateWithdrawal() {
    try {
      // Calculate the amount to be withdrawn
      const conversionRate = 0.12; // Example conversion rate
      const withdrawalAmountHKD = Number(withdrawalAmount);
      const withdrawalAmountUSD = withdrawalAmountHKD * conversionRate;

      // Update the HKBalance by deducting the withdrawal amount
      const user = await UserModel.findOne({ username: sellerUserName });
      console.log(sellerUserName);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const currentHKBalance = user.HKBalance;
      const updatedHKBalance = currentHKBalance - withdrawalAmountHKD;

      user.HKBalance = updatedHKBalance;
      await user.save();

      // Prepare the PayPal API request payload
      const payload = {
        sender_batch_header: {
          sender_batch_id: 'batch_1234992080000', // Example batch ID
          email_subject: 'Withdrawal from HKBalance', // Example email subject
        },
        items: [
          {
            recipient_type: 'EMAIL',
            amount: {
              value: withdrawalAmountUSD.toFixed(2), // Limit to 2 decimal places
              currency: 'USD',
            },
            note: 'Withdrawal from HKBalance', // Example note
            receiver: 'dsphella@gmail.com', // PayPal sandbox account email
          },
        ],
      };

      // Make the API request
      const accessToken = await getAccessToken();
      const response = await axios.post(
        'https://api.sandbox.paypal.com/v1/payments/payouts',
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      // Handle the response
      console.log(response.data); // Log the response data
      // Process the response as per your requirements
    } catch (error) {
      console.error(
        'Withdrawal error:',
        error.response ? error.response.data : error.message
      ); // Log the error response
      // Handle the error as per your requirements
    }
  }

  // Function to obtain the access token
  async function getAccessToken() {
    try {
      const clientId = ENV.PAYPAL_CLIENT_ID; // Replace with your PayPal Client ID
      const clientSecret = ENV.PAYPAL_CLIENT_SECRET; // Replace with your PayPal Client Secret

      const authString = `${clientId}:${clientSecret}`;
      const encodedAuthString = Buffer.from(authString).toString('base64');

      const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${encodedAuthString}`,
      };

      const data = 'grant_type=client_credentials';

      const response = await axios.post(
        'https://api.sandbox.paypal.com/v1/oauth2/token',
        data,
        { headers }
      );

      return response.data.access_token;
    } catch (error) {
      console.error('Access token error:', error.response.data); // Log the error response
      // Handle the error as per your requirements
    }
  }

  // Call the function to initiate the withdrawal
  initiateWithdrawal();

  // Send a response back to the client
  res.status(200).json({ message: 'Withdrawal successful' });
});

// Define the POST route for updating HKBalance
router.post('/buyDp', async (req, res) => {
  try {
    const { clientName, dpOwnerName, dpPrice } = req.body;

    // Fetch the client and dpOwner documents from the database

    const client = await UserModel.findOne({ username: clientName });
    const dpOwner = await UserModel.findOne({ username: dpOwnerName });
    console.log('Price: ' + dpPrice);
    console.log('Seller: ' + dpOwner.username);
    console.log('Client: ' + client.username);

    if (!client || !dpOwner) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Ensure the client has sufficient HKBalance to make the purchase
    if (client.HKBalance < dpPrice) {
      return res.status(400).json({ error: 'Insufficient HKBalance' });
    }

    const price = parseFloat(dpPrice);

    // Update HKBalances
    client.HKBalance -= price;
    dpOwner.HKBalance += price;

    // Save the updated documents
    await client.save();
    await dpOwner.save();

    return res.status(200).json({ message: 'Transaction successful' });
  } catch (error) {
    console.error('HKBalance update error:', error);
    return res.status(500).json({ error: 'An error occurred' });
  }
});

/*****************************************************************/
/**********************-- AUTHENTICATION --**********************/
/*POST Methods*/
router.route('/register').post(controller.register); // register user
router.route('/registerMail').post(registerMail); // send the email
router.get('/users/:username/confirmation/:token', async (req, res) => {
  try {
    const token = await TokenModel.findOne({ token: req.params.token });
    console.log(token);
    await UserModel.updateOne(
      { username: token.username },
      { $set: { emailVerified: true } }
    );
    await TokenModel.findByIdAndRemove(token._id);
    res.send('Email verified successfully');
  } catch (error) {
    res.send(error.message);
  }
});
router
  .route('/authenticate')
  .post(controller.verifyUser, (req, res) => res.end()); // authenticate user
router.route('/login').post(controller.verifyUser, controller.login); // login in app

/*GET Methods*/
router.route('/user/:username').get(controller.getUser); // user with username
router.route('/userDetails/:username').get(controller.getUserDetails); // user with username
router
  .route('/generateOTP')
  .get(controller.verifyUser, localVariables, controller.generateOTP); // generate random OTP
router.route('/verifyOTP').get(controller.verifyUser, controller.verifyOTP); // verify generated OTP
router.route('/createResetSession').get(controller.createResetSession); // reset all the variables

/** PUT Methods */
router.route('/updateuser').put(Auth, controller.updateUser); // is use to update the user profile
router
  .route('/resetPassword')
  .put(controller.verifyUser, controller.resetPassword); // use to reset password

/*****************************************************************/
/**********************-- ADD DIGITAL PRODUCTS --**********************/
/*POST Methods*/
/* router.post(
  '/addDigitalProduct',
  uploadMiddleware.single('dpImg'),
  ProductController.addDigitalProduct
); */

/*****************************************************************/
/**********************-- File Upload MULTER --**********************/

router.post(
  '/addDigitalProduct',
  uploadMiddleware,
  ProductController.addDigitalProduct
);

/* router.post(
  '/addDigitalProduct',
  uploadMiddleware.single([
    { name: 'dpImg', maxCount: 1 },
    { name: 'dpFile', maxCount: 1 },
  ]),
  (req, res) => {
    try {
      const dpImg = req.files['dpImg'][0].filename;
      const dpFile = req.files['dpFile'][0].filename;
      console.log(dpImg, dpFile);

      const {
        dpName,
        dpDescription,
        dpCategory,
        dpPrice,
        dpQuantity,
        dpOwner,
      } = req.body;

      DigitalProductsModel.create({
        dpName,
        dpDescription,
        dpCategory,
        dpPrice,
        dpQuantity,
        dpImg,
        dpFile,
        dpOwner,
      }).then((data) => {
        console.log('Uploaded Successfully...!');
        console.log(data);
        res.send(data);
      });
    } catch (err) {
      console.log('Could Not upload...!');
      console.log(err);
    }
  }
); */

/** GET Methods - Digital Products */
/* Get productImages */
router.route('/products/digitalProducts/image/:productId').get((req, res) => {
  const productId = req.params.productId;
  const imagePath = path.join(__dirname, `../public/uploads/${productId}`);
  const fileStream = fs.createReadStream(imagePath);
  fileStream.pipe(res);
});

router.route('/products/digitalProducts/file/:fileId').get((req, res) => {
  const fileId = req.params.fileId;
  const filePath = path.join(__dirname, `../public/uploads/${fileId}`);
  const fileStream = fs.createReadStream(filePath);
  fileStream.pipe(res);
});

router
  .route('/products/owner/:username')
  .get(ProductController.getProductsByOwner);
router.route('/products/digitalProducts').get(ProductController.getAllProducts);
router
  .route('/products/category/:category')
  .get(ProductController.getProductsByCategory);

/*****************************************************************/
/**********************-- ADD DIGITAL SERVICES --**********************/
/*POST Methods*/

router.post(
  '/addDigitalService',
  uploadMiddleware,
  ServicesController.addDigitalService
);

/** GET Methods - Digital Services */

/* Get serviceImages */
router.route('/services/digitalServices/:servicesId').get((req, res) => {
  const servicesId = req.params.servicesId;
  const imagePath = path.join(__dirname, `../public/uploads/${servicesId}`);
  const fileStream = fs.createReadStream(imagePath);
  fileStream.pipe(res);
});

router
  .route('/services/owner/:username')
  .get(ServicesController.getServicesByOwner);
router
  .route('/services/digitalServices')
  .get(ServicesController.getAllServices);
router
  .route('/services/category/:category')
  .get(ServicesController.getServicesByCategory);

router.route('/services/:_id').delete(ServicesController.deleteService);

/* router.post('/save', uploadMiddleware.single('dpImg'), (req, res) => {
  const dpImg = req.file.filename;

  console.log(dpImg);

  UploadModel.create({ dpImg })
    .then((data) => {
      console.log('Uploaded Successfully...');
      console.log(data);
      res.send(data);
    })
    .catch((err) => console.log(err));
}); */

/*****************************************************************/
/**********************-- ADMIN ROUTES --**********************/
router.route('/admin/getAllUsers').get(AdminController.getAllUsers); // admin page
router.route('/admin/getAllProducts').get(AdminController.getAllProductsAdmin); // admin page
router.route('/admin/getAllServices').get(AdminController.getAllServicesAdmin); // admin page
router
  .route('/admin/deleteService/:_id')
  .get(AdminController.deleteServiceAdmin); // admin page

router.put('/admin/users/:id/verify', async (req, res) => {
  const userId = req.params.id;

  try {
    // Find the user document by ID
    const user = await UserModel.findByIdAndUpdate(
      userId,
      { idVerified: true, verified: true },
      { new: true } // Return the updated user document
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Send a success response
    res.json({ message: 'User ID verified successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create an order
router.post('/orders', async (req, res) => {
  try {
    const order = new OrderModel(req.body);
    await order.save();
    res.status(201).json({ message: 'Order created successfully' });
  } catch (error) {
    console.error('Failed to create order', error);
    res.status(500).json({ message: 'Failed to create order' });
  }
});

router.route('/orders/seller/:username').get(controller.getOrdersBySeller);

router.route('/orders/customer/:username').get(controller.getOrdersByCustomer);

export default router;
