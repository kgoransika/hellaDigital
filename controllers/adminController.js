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
