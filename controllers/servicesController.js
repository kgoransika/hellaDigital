import DSModel from '../model/DigitalServices.model.js';

export async function addDigitalService(req, res) {
  try {
    const {
      dsName,
      dsDescription,
      dsCategory,
      dsSubCategory,
      dsPkgs: {
        dsPkg1: { dsPkg1Name, dsPkg1Price, dsPkg1Dt, dsPkg1Revisions },
        dsPkg2: { dsPkg2Name, dsPkg2Price, dsPkg2Dt, dsPkg2Revisions },
        dsPkg3: { dsPkg3Name, dsPkg3Price, dsPkg3Dt, dsPkg3Revisions },
      },
      dsImg,
      dsPortfolioLink,
      dsOwner,
    } = req.body;

    const service = new DSModel({
      dsName,
      dsDescription,
      dsCategory,
      dsSubCategory,
      dsPkgs: {
        dsPkg1: {
          dsPkg1Name,
          dsPkg1Price,
          dsPkg1Dt,
          dsPkg1Revisions,
        },
        dsPkg2: {
          dsPkg2Name,
          dsPkg2Price,
          dsPkg2Dt,
          dsPkg2Revisions,
        },
        dsPkg3: {
          dsPkg3Name,
          dsPkg3Price,
          dsPkg3Dt,
          dsPkg3Revisions,
        },
      },
      dsImg,
      dsPortfolioLink,
      dsOwner,
    });

    // return save result as a response
    service
      .save()
      .then((result) =>
        res.status(201).send({ msg: 'Service added successfully' })
      )
      .catch((error) => res.status(500).send({ error }));
  } catch (error) {
    return res.status(500).send(error);
  }
}

export async function getServicesByOwner(req, res) {
  const { username } = req.params;

  try {
    if (!username) return res.status(501).send({ error: 'Invalid Username' });
    const services = await DSModel.find({ dpOwner: username });
    res.status(200).send(services);
  } catch (error) {
    res.status(500).send({ error });
  }
}
