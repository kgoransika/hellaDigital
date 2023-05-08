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
import * as AdminController from '../controllers/adminController.js';
import { registerMail } from '../controllers/mailer.js';
import Auth, { localVariables } from '../middleware/auth.js';
import uploadMiddleware from '../middleware/multer.js';
/* import UploadModel from '../model/UploadModel.js'; */
import DigitalProductsModel from '../model/DigitalProducts.model.js';
import DigitalServicesModel from '../model/DigitalServices.model.js';

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

router.route('/addDigitalService').post(ServicesController.addDigitalService);

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

export default router;
