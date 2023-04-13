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
