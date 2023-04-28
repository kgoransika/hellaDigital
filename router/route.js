import { Router } from 'express';
const router = Router();
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** import all controllers */
import * as controller from '../controllers/appController.js';
import * as ProductController from '../controllers/productController.js';
import * as ServicesController from '../controllers/servicesController.js';
import { registerMail } from '../controllers/mailer.js';
import Auth, { localVariables } from '../middleware/auth.js';
import uploadMiddleware from '../middleware/multer.js';
/* import UploadModel from '../model/UploadModel.js'; */
import DigitalProductsModel from '../model/DigitalProducts.model.js';

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
/* router.post(
  '/addDigitalProduct',
  uploadMiddleware.single('dpImg'),
  ProductController.addDigitalProduct
); */

/*****************************************************************/
/**********************-- File Upload MULTER --**********************/

router.post(
  '/addDigitalProduct',
  uploadMiddleware.single('dpImg'),
  (req, res) => {
    try {
      const dpImg = req.file.filename;
      console.log(dpImg);

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
);

/** GET Methods - Digital Products */
/* Get productImages */
router.route('/products/digitalProducts/:productId').get((req, res) => {
  const productId = req.params.productId;
  const imagePath = path.join(__dirname, `../public/uploads/${productId}`);
  const fileStream = fs.createReadStream(imagePath);
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
router.route('/addDigitalService').post(ServicesController.addDigitalService); // Add product to platform

/** GET Methods - Digital Services */
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
export default router;
