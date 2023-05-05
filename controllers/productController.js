import DPModel from '../model/DigitalProducts.model.js';
import cloudinary from '../middleware/cloudinary.js';
import vision from '@google-cloud/vision';

export async function addDigitalProduct(req, res) {
  const client = new vision.ImageAnnotatorClient({
    keyFilename: './hella-digital-ab7ec4dbba2e.json', // Replace with the path to your API key file
  });

  const dpImg = req.files['dpImg'][0].filename;
  const dpFile = req.files['dpFile'][0].filename;

  const [result] = await client.webDetection(
    './public/uploads/' + dpFile // Replace with the path to your image file
  );
  console.log(result);
  const webDetection = result.webDetection;
  console.log(webDetection);

  if (webDetection.pagesWithMatchingImages.length === 0) {
    // No matching image source found, proceed with saving the product
    const { dpName, dpDescription, dpCategory, dpPrice, dpQuantity, dpOwner } =
      req.body;

    const product = new DPModel({
      dpName,
      dpDescription,
      dpCategory,
      dpPrice,
      dpQuantity,
      dpImg,
      dpFile,
      dpOwner,
    });

    // return save result as a response
    product
      .save()
      .then((result) =>
        res.status(201).send({ msg: 'Product added successfully' })
      )
      .catch((error) => res.status(500).send({ error }));
  } else {
    // Matching image source found, return an error response
    res.status(400).send({ error: 'File source already exists' });
  }
}

export async function getProductsByOwner(req, res) {
  const { username } = req.params;

  try {
    if (!username) return res.status(501).send({ error: 'Invalid Username' });
    const products = await DPModel.find({ dpOwner: username });
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send({ error });
  }
}

export async function getAllProducts(req, res) {
  try {
    const products = await DPModel.find();
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send({ error });
  }
}

export async function getProductsByCategory(req, res) {
  const { category } = req.params;

  try {
    if (!category) return res.status(501).send({ error: 'Invalid Category' });
    const products = await DPModel.find({ dpCategory: category });
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send({ error });
  }
}
