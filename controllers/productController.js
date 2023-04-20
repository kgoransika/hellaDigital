import DPModel from '../model/DigitalProducts.model.js';
import cloudinary from '../middleware/cloudinary.js';

export async function addDigitalProduct(req, res) {
  try {
    const {
      dpName,
      dpDescription,
      dpCategory,
      dpPrice,
      dpQuantity,
      dpImg,
      dpFile,
      dpOwner,
    } = req.body;

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
  } catch (error) {
    return res.status(500).send(error);
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
