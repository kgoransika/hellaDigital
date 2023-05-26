import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import {
  getOrderBasedOnCustomer,
  getOrderBasedOnSeller,
  getUsername,
} from '../../helper/helper';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import useFetch from '../../hooks/fetch.hook';

export default function OrdersComp() {
  const [modalShow, setModalShow] = React.useState(false);
  const [orders, setOrder] = useState([]);
  const [clientOrders, setClientOrder] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [deliverModal, setDeliverModal] = useState(null);
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState('');

  const [{ isLoading, apiData }] = useFetch();
  const [price, setPrice] = useState('');
  const [seller, setSeller] = useState('');

  function handleRowClick(order) {
    setSelectedOrder(order);
    setModalShow(true);
  }

  function handleDeliverClick(order) {
    setDeliverModal(order);
    setModalShow(true);
  }

  /** Handler to preview Image */
  const onUploadFile = async (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  useEffect(() => {
    getUsername()
      .then((decodedToken) => {
        setUsername(decodedToken.username);
        setRole(decodedToken.role);
        getOrderBasedOnSeller({ username: decodedToken.username })
          .then((data) => {
            setOrder(data);
          })
          .catch((error) => {
            console.log(error);
          });
        getOrderBasedOnCustomer({ username: decodedToken.username })
          .then((data) => {
            setClientOrder(data);
            console.log(data);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });

    // Fetch orders by sellerName
    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/getOrders/dsphella');
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const data = await response.json();
        setOrder(data.orders);
      } catch (error) {
        console.error(error);
      }
    };

    // Call the fetchOrders function
    fetchOrders();
  }, []);

  function downloadFile(dpFile) {
    const xhr = new XMLHttpRequest();
    xhr.open(
      'GET',
      `http://localhost:8080/api/products/digitalProducts/file/${dpFile}`,
      true
    );
    xhr.responseType = 'blob';

    xhr.onload = function () {
      if (xhr.status === 200) {
        const blob = xhr.response;
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = dpFile;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    };
    xhr.send();

    try {
      // Make the API request to update HKBalance
      const response = axios.post('/api/buyDp', {
        clientName: 'clienthella', // Replace with the client's ID or username
        dpOwnerName: 'dsphella', // Replace with the dpOwner's ID or username
        dpPrice: 15, // Pass the price of the digital product
      });

      // Handle the response
      console.log(response.data); // Log the response data
      // Perform any necessary actions after the transaction is successful
    } catch (error) {
      console.error('Buy Now error:', error.response.data); // Log the error response
      // Handle the error as per your requirements
    }
  }

  const div1Style = {
    padding: '20px',
    width: '100%',
    height: 'auto',
    margin: '20px',
    border: '1px solid #dee2e6',
    boxShadow: '0 0 1px 1px #dee2e6',
    borderRadius: '10px',
  };

  const div2Style = {
    padding: '20px',
    width: '40%',
    height: 'auto',
    margin: '20px',
    float: 'right',
    border: '1px solid #dee2e6',
    boxShadow: '0 0 1px 1px #dee2e6',
    borderRadius: '10px',
  };

  return (
    <>
      <div className="mt-20 ml-20 mr-20">
        {role === 'dps' ? (
          <div className="dpsOrder" style={{ display: 'flex' }}>
            <div style={div2Style}>
              <h3>Stats</h3>
            </div>
            <div style={div1Style}>
              <h3>Orders</h3>
              <span className="text-red-600">
                *click the id of the respective order to view the order summary
              </span>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Customer Name</th>
                    <th>Date/Time</th>
                    <th>Total Price</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders &&
                    orders.data &&
                    orders.data.map((order) => (
                      <tr key={order.id}>
                        <td onClick={() => handleRowClick(order)}>
                          {order._id}
                        </td>
                        <td>{order.orderedBy}</td>
                        <td>{order.createdAt}</td>
                        <td>{order.orderTotal} HK</td>
                        <td>{order.orderStatus}</td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </div>
            {selectedOrder && (
              <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                order={selectedOrder}
              />
            )}
          </div>
        ) : role === 'dsp' ? (
          <div className="dspOrder">
            <div style={div1Style}>
              <h3>Orders</h3>
              <span className="text-red-600">
                *click the id of the respective order to view the order summary
              </span>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Customer Name</th>
                    <th>Date/Time</th>
                    <th>Total Price</th>
                    <th>Status</th>
                    <th>Deliver service</th>
                  </tr>
                </thead>
                <tbody>
                  {orders &&
                    orders.data &&
                    orders.data.map((order) => (
                      <tr key={order.id}>
                        <td onClick={() => handleRowClick(order)}>
                          {order._id}
                        </td>
                        <td>{order.orderedBy}</td>
                        <td>{order.createdAt}</td>
                        <td>{order.orderTotal} HK</td>
                        <td>{order.orderStatus}</td>
                        <td className="text-center">
                          <button
                            className="bg-blue-700 hover:bg-blue-600 text-white py-1 px-3 rounded-lg"
                            onClick={() => handleDeliverClick(order)}
                          >
                            Deliver
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </div>
            {selectedOrder && (
              <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                order={selectedOrder}
              />
            )}
            {deliverModal && (
              <DeliverModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                order={deliverModal}
              />
            )}
          </div>
        ) : (
          <div className="clientOrder">
            <div style={div1Style}>
              <h3>Orders</h3>
              <span className="text-red-600">
                *click the id of the respective order to view the order summary
              </span>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Service Provider</th>
                    <th>Date/Time</th>
                    <th>Total Price</th>
                    <th>Status</th>
                    <th>Download service</th>
                  </tr>
                </thead>
                <tbody>
                  {clientOrders &&
                    clientOrders.data &&
                    clientOrders.data.map((order) => (
                      <tr key={order.id}>
                        <td onClick={() => handleRowClick(order)}>
                          {order._id}
                        </td>
                        <td>{order.sellerName}</td>
                        <td>{order.createdAt}</td>
                        <td>{order.orderTotal} HK</td>
                        <td>{order.orderStatus}</td>
                        <td className="text-center">
                          <button
                            className="bg-blue-700 hover:bg-blue-600 text-white py-1 px-3 rounded-lg"
                            onClick={() =>
                              downloadFile(
                                '923241b0-6ba3-419d-bd3c-30b0f08aea18.mp4'
                              )
                            }
                          >
                            Download
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </div>
            {selectedOrder && (
              <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                order={selectedOrder}
              />
            )}
            {deliverModal && (
              <DeliverModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                order={deliverModal}
              />
            )}
          </div>
        )}
      </div>
    </>
  );

  function MyVerticallyCenteredModal({ show, onHide, order }) {
    return (
      <Modal size="lg" centered show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Order Summary - {order.orderName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <p>
              Ordered By: <span className="font-bold">{order.orderedBy}</span>
            </p>
            <p>
              Description:{' '}
              <span className="font-bold">{order.orderDetails}</span>
            </p>
            <p>
              Total Price:{' '}
              <span className="font-bold">{order.orderTotal} HK</span>
            </p>
            <p>
              Date/Time: <span className="font-bold">{order.createdAt}</span>
            </p>
            <p>
              Status: <span className="font-bold">{order.orderStatus}</span>
            </p>
          </div>
        </Modal.Body>
      </Modal>
    );
  }

  function DeliverModal({ show, onHide, order }) {
    return (
      <Modal size="lg" centered show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Deliver Service - {order.orderName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <form>
              <div>
                <label htmlFor="dpFile">
                  <p className="text-blue-500 underline cursor-pointer">
                    Browse
                  </p>
                </label>
                <br />

                {file ? (
                  <>
                    <span>
                      Your selected file:
                      <span className="font-bold"> {fileName}</span>
                    </span>
                  </>
                ) : (
                  <>
                    <p className="text-gray-500 text-sm text-center">
                      The file you selected will be shown here!
                    </p>
                  </>
                )}
                <p className="text-red-500 text-sm text-center mt-5">
                  NOTE: This is the file which the customer will recieve after
                  service!
                </p>
                <input
                  onChange={onUploadFile}
                  type="file"
                  id="dpFile"
                  name="dpFile"
                  className="dpFile"
                />
              </div>
              <button className=" bg-blue-700 hover:bg-blue-600 text-white py-1 px-3 rounded-lg mt-5">
                UPLOAD!
              </button>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}
