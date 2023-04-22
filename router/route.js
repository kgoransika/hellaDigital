import { Router } from 'express';
const router = Router();

/** import all controllers */
import * as controller from '../controllers/appController.js';
import * as ProductController from '../controllers/productController.js';
import * as ServicesController from '../controllers/servicesController.js';
import { registerMail } from '../controllers/mailer.js';
import Auth, { localVariables } from '../middleware/auth.js';

/*****************************************************************/
/**********************-- AUTHENTICATION --**********************/
/*POST Methods*/
router.route('/register').post(controller.register); // register user
router.route('/registerMail').post(registerMail); // send the email
router
  .route('/authenticate')
  .post(controller.verifyUser, (req, res) => res.end()); // authenticate user
router.route('/login').post(controller.verifyUser, controller.login); // login in app

/*GET Methods*/
router.route('/user/:username').get(controller.getUser); // user with username
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
router.route('/addDigitalProduct').post(ProductController.addDigitalProduct); // Add product to platform

/** GET Methods - Digital Products */
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
router.route('/addDigitalService').post(ServicesController.addDigitalService); // Add product to platform

export default router;
