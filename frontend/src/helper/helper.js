import axios from 'axios';
import jwt_decode from 'jwt-decode';

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

/** Make API Requests */

/** To get username from Token */
export async function getUsername() {
  const token = localStorage.getItem('token');
  if (!token) return Promise.reject('Cannot find Token');
  let decode = jwt_decode(token);
  return decode;
}

/** authenticate function */
export async function authenticate(username) {
  try {
    return await axios.post('/api/authenticate', { username });
  } catch (error) {
    return { error: "Username doesn't exist...!" };
  }
}

/** get User details */
export async function getUser({ username }) {
  try {
    const { data } = await axios.get(`/api/user/${username}`);
    return { data };
  } catch (error) {
    return { error: "Password doesn't Match...!" };
  }
}

/** register user function */
export async function registerUser(credentials) {
  try {
    const {
      data: { msg },
      status,
    } = await axios.post(`/api/register`, credentials);

    let { username, email, role } = credentials;

    /** send email */
    if (status === 201) {
      await axios.post('/api/registerMail', {
        username,
        userEmail: email,
        role: role,
        text: msg,
      });
    }

    return Promise.resolve(msg);
  } catch (error) {
    return Promise.reject({ error });
  }
}

/** login function */
export async function verifyPassword({ username, password }) {
  try {
    if (username) {
      const { data } = await axios.post('/api/login', { username, password });
      return Promise.resolve({ data });
    }
  } catch (error) {
    return Promise.reject({ error: "Password doesn't Match...!" });
  }
}

/** update user profile function */
export async function updateUser(response) {
  try {
    const token = await localStorage.getItem('token');
    const data = await axios.put('/api/updateuser', response, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return Promise.resolve({ data });
  } catch (error) {
    return Promise.reject({ error: "Couldn't Update Profile...!" });
  }
}

/** generate OTP */
export async function generateOTP(username) {
  try {
    const {
      data: { code },
      status,
    } = await axios.get('/api/generateOTP', { params: { username } });

    // send mail with the OTP
    if (status === 201) {
      let {
        data: { email },
      } = await getUser({ username });
      let text = `Your Password Recovery OTP is ${code}. Verify and recover your password.`;
      await axios.post('/api/registerMail', {
        username,
        userEmail: email,
        text,
        subject: 'Password Recovery OTP',
      });
    }
    return Promise.resolve(code);
  } catch (error) {
    return Promise.reject({ error });
  }
}

/** verify OTP */
export async function verifyOTP({ username, code }) {
  try {
    const { data, status } = await axios.get('/api/verifyOTP', {
      params: { username, code },
    });
    return { data, status };
  } catch (error) {
    return Promise.reject(error);
  }
}

/** reset password */
export async function resetPassword({ username, password }) {
  try {
    const { data, status } = await axios.put('/api/resetPassword', {
      username,
      password,
    });
    return Promise.resolve({ data, status });
  } catch (error) {
    return Promise.reject({ error });
  }
}

/** addDigitalProduct function */
export async function addDigitalProduct(product) {
  try {
    return await axios.post(`/api/addDigitalProduct`, product);
  } catch (error) {
    return Promise.reject({ error });
  }
}

/** get ProductBasedOnOwner */
export async function getProductBasedOnOwner({ username }) {
  try {
    const { data } = await axios.get(`/api/products/owner/${username}`);
    return { data };
  } catch (error) {
    return { error: 'Could not get Product data...!' };
  }
}

/** get getAllProducts */
export async function getAllProducts() {
  try {
    const { data } = await axios.get(`/api/products/digitalProducts`);
    return { data };
  } catch (error) {
    return { error: 'Could not get Product data...!' };
  }
}

/** get ProductBasedOnCategory */
export async function getProductsCategory({ category }) {
  try {
    const { data } = await axios.get(`/api/products/category/${category}`);
    return { data };
  } catch (error) {
    return { error: 'Could not get Product Category...!' };
  }
}

/** addDigitalService function */
export async function addDigitalService(service) {
  try {
    return await axios.post(`/api/addDigitalService`, service);
  } catch (error) {
    return Promise.reject({ error });
  }
}

/** get ServicesBasedOnOwner */
export async function getServicesBasedOnOwner({ username }) {
  try {
    const { data } = await axios.get(`/api/services/owner/${username}`);
    return { data };
  } catch (error) {
    return { error: 'Could not get Services data...!' };
  }
}

/** get getAllServices */
export async function getAllServices() {
  try {
    const { data } = await axios.get(`/api/services/digitalServices`);
    return { data };
  } catch (error) {
    return { error: 'Could not get Services data...!' };
  }
}

/** get ServicesBasedOnCategory */
export async function getServicesCategory({ category }) {
  try {
    const { data } = await axios.get(`/api/services/category/${category}`);
    return { data };
  } catch (error) {
    return { error: 'Could not get Services Category...!' };
  }
}

/** get ServicesBasedOnCategory */
export async function deleteService(id) {
  try {
    await axios.delete(`/api/services/${id}`);
  } catch (error) {
    return { error: 'Could not delete Service...!' };
  }
}

/** get getAllUsers-admin */
export async function getAllUsers() {
  try {
    const { data } = await axios.get(`/api/admin/getAllUsers`);
    return { data };
  } catch (error) {
    return { error: 'Could not get user data...!' };
  }
}

/** get getAllProducts-admin */
export async function getAllProductsAdmin() {
  try {
    const { data } = await axios.get(`/api/admin/getAllProducts`);
    return { data };
  } catch (error) {
    return { error: 'Could not get Product data...!' };
  }
}

/** get getAllServices-admin */
export async function getAllServicesAdmin() {
  try {
    const { data } = await axios.get(`/api/admin/getAllServices`);
    return { data };
  } catch (error) {
    return { error: 'Could not get Services data...!' };
  }
}
