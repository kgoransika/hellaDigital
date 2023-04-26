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
    const services = await DSModel.find({ dsOwner: username });
    res.status(200).send(services);
  } catch (error) {
    res.status(500).send({ error });
  }
}

export async function getAllServices(req, res) {
  try {
    const services = await DSModel.find();
    res.status(200).send(services);
  } catch (error) {
    res.status(500).send({ error });
  }
}

export async function getServicesByCategory(req, res) {
  const { category } = req.params;

  try {
    if (!category) return res.status(501).send({ error: 'Invalid Category' });
    const services = await DSModel.find({ dsCategory: category });
    res.status(200).send(services);
  } catch (error) {
    res.status(500).send({ error });
  }
}

export async function deleteService(req, res) {
  const { _id } = req.params;

  try {
    const service = await DSModel.findById(_id);

    if (!service) {
      return res.status(404).send({ error: 'Service not found' });
    }

    await service.delete();
    res.status(200).send({ msg: 'Service deleted successfully' });
  } catch (error) {
    res.status(500).send({ error });
  }
}
