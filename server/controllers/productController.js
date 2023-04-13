import DPModel from '../model/DigitalProducts.model.js';

export async function addDigitalProduct(req, res) {
  try {
    const {
      dpName,
      dpDescription,
      dpCategory,
      dpPrice,
      dpQuantity,
      dpImg,
      dpOwner,
    } = req.body;

    const product = new DPModel({
      dpName,
      dpDescription,
      dpCategory,
      dpPrice,
      dpQuantity,
      dpImg,
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
