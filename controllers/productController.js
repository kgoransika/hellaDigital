import DPModel from '../model/DigitalProducts.model.js';
import cloudinary from '../middleware/cloudinary.js';
import vision from '@google-cloud/vision';
import fs from 'fs';
import { google } from 'googleapis';
import axios from 'axios';
import FormData from 'form-data';

export async function addDigitalProduct(req, res) {
  const dpImg = req.files['dpImg'][0].filename;
  const dpFile = req.files['dpFile'][0].filename;
  const dpType = req.files['dpFile'][0].mimetype.split('/')[0]; // Get the type of the uploaded file (image, video, music)

  let isCopyrighted = false;

  if (dpType === 'image') {
    const client = new vision.ImageAnnotatorClient({
      keyFilename: './hella-digital-ab7ec4dbba2e.json', // Replace with the path to your API key file
    });

    const [result] = await client.webDetection('./public/uploads/' + dpFile); // Replace with the path to your image file
    const webDetection = result.webDetection;
    console.log(webDetection);

    if (webDetection.pagesWithMatchingImages.length > 0) {
      // Matching image source found, return an error response
      fs.unlinkSync('./public/uploads/' + dpFile);
      fs.unlinkSync('./public/uploads/' + dpImg);
      return res.status(400).send({ error: 'File source already exists' });
    }
  } else if (dpType === 'audio') {
    // Use the AudD Music Recognition API to check for music copyrights
    const apiKey = 'e882772c8424fc1a2a1d11d9d151d105';
    const apiUrl = 'https://api.audd.io/';
    const audioFile = fs.readFileSync('./public/uploads/' + dpFile);

    const formData = new FormData();
    formData.append('file', audioFile, dpFile);
    formData.append('api_token', apiKey);
    formData.append('return', 'apple_music,spotify');

    try {
      const response = await axios.post(apiUrl, formData, {
        headers: formData.getHeaders(),
      });
      console.log(response.data);
      if (response.data.result !== null) {
        // Matching music source found, return an error response
        fs.unlinkSync('./public/uploads/' + dpFile);
        fs.unlinkSync('./public/uploads/' + dpImg);
        return res.status(400).send({ error: 'Music source already exists' });
      }
    } catch (error) {
      console.log(error);
    }
  }

  /* else if (dpType === 'video') {
    // Use the YouTube Data API v3 to check for video copyrights
     const youtube = google.youtube({
      version: 'v3',
      auth: 'AIzaSyCfedJt8vUyjC6HJ9bZoV2kaPyM5IT5aS0',
    });
    try {
      const videoId = dpFile; // Replace with the video ID from the uploaded file
      const response = await youtube.videos.list({
        id: videoId,
        part: 'contentDetails',
      });
      if (!response.data.items || response.data.items.length === 0) {
        // No video found, return an error response
        res.status(400).send({ error: 'Invalid video ID' });
        console.log('Invalid video ID');
        fs.unlinkSync('./public/uploads/' + dpFile);
        fs.unlinkSync('./public/uploads/' + dpImg);
        return;
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Failed to check video copyrights' });
      fs.unlinkSync('./public/uploads/' + dpFile);
      fs.unlinkSync('./public/uploads/' + dpImg);
      return;
    } 
  }
 */
  // No matching image source or copyrighted video/music found, proceed with saving the product
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

  try {
    await product.save();
    return res.status(201).send({ msg: 'Product added successfully' });
  } catch (error) {
    return res.status(500).send({ error });
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
