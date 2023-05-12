import UserModel from '../model/User.model.js';
import DSModel from '../model/DigitalServices.model.js';
import DPModel from '../model/DigitalProducts.model.js';

export async function getAllUsers(req, res) {
  try {
    const users = await UserModel.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({ error });
  }
}

export async function getAllProductsAdmin(req, res) {
  try {
    const products = await DPModel.find();
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send({ error });
  }
}

export async function getAllServicesAdmin(req, res) {
  try {
    const services = await DSModel.find();
    res.status(200).send(services);
  } catch (error) {
    res.status(500).send({ error });
  }
}

export async function deleteServiceAdmin(req, res) {
  const { _id } = req.params;

  try {
    const service = await DSModel.findById(_id);

    if (!service) {
      console.log('Service not found');
      return res.status(404).send({ error: 'Service not found' });
    }

    await service.delete();
    res.status(200).send({ msg: 'Service deleted successfully' });
  } catch (error) {
    res.status(500).send({ error });
    console.log(error);
  }
}
