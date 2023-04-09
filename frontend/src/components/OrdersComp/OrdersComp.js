import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { getUsername } from '../../helper/helper';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function OrdersComp() {
  const [modalShow, setModalShow] = React.useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  function handleRowClick(order) {
    setSelectedOrder(order);
    setModalShow(true);
  }

  useEffect(() => {
    getUsername()
      .then((decodedToken) => {
        setUsername(decodedToken.username);
        setRole(decodedToken.role);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const div1Style = {
    padding: '20px',
    width: '100%',
    height: '70vh',
    margin: '20px',
    border: '1px solid #dee2e6',
    boxShadow: '0 0 1px 1px #dee2e6',
    borderRadius: '10px',
  };

  const div2Style = {
    padding: '20px',
    width: '40%',
    height: '70vh',
    margin: '20px',
    float: 'right',
    border: '1px solid #dee2e6',
    boxShadow: '0 0 1px 1px #dee2e6',
    borderRadius: '10px',
  };

  const orders = [
    {
      id: 1,
      customerName: 'John Doe',
      dateTime: '2023-04-08 10:30:00',
      totalPrice: 150,
      status: 'Completed',
    },
    {
      id: 2,
      customerName: 'Jane Smith',
      dateTime: '2023-04-07 15:45:00',
      totalPrice: 75,
      status: 'Pending',
    },
    {
      id: 3,
      customerName: 'James',
      dateTime: '2023-04-07 15:45:00',
      totalPrice: 23,
      status: 'Pending',
    },
    // Add more orders here
  ];

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
              <span>
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
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>{order.customerName}</td>
                      <td>{order.dateTime}</td>
                      <td>${order.totalPrice}</td>
                      <td>{order.status}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        ) : role === 'dsp' ? (
          <div className="dspOrder" style={{ display: 'flex' }}>
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
                    <th>Deliver service</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td onClick={() => handleRowClick(order)}>{order.id}</td>
                      <td>{order.customerName}</td>
                      <td>{order.dateTime}</td>
                      <td>${order.totalPrice}</td>
                      <td>{order.status}</td>
                      <td className="text-center">
                        <button className="bg-blue-700 hover:bg-blue-600 text-white py-1 px-3 rounded-lg">
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
          </div>
        ) : (
          <div>You have no access!</div>
        )}
      </div>
    </>
  );

  function MyVerticallyCenteredModal({ show, onHide, order }) {
    return (
      <Modal size="lg" centered show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Order Summary</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <p>ID: {order.id}</p>
            <p>Customer Name: {order.customerName}</p>
            <p>Date/Time: {order.dateTime}</p>
            <p>Total Price: ${order.totalPrice}</p>
            <p>Status: {order.status}</p>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}
