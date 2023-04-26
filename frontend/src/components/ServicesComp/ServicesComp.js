import React, { useState, useEffect } from 'react';
import { PlusIcon } from '@heroicons/react/20/solid';
import { EyeIcon } from '@heroicons/react/20/solid';
import { useNavigate } from 'react-router-dom';
import { getUsername } from '../../helper/helper';
import { getServicesBasedOnOwner } from '../../helper/helper';
import { deleteService } from '../../helper/helper';
import Modal from 'react-bootstrap/Modal';
import { Card, CardBody } from '@windmill/react-ui';
import NoServicesAdded from '../../assets/Curious-bro.png';

export default function ServicesComp() {
  const navigate = useNavigate();
  const [service, setService] = useState([]);
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');
  const [selectedService, setSelectedService] = useState(null);
  const [modalShow, setModalShow] = React.useState(false);

  function handleProductClick(item) {
    setSelectedService(item);
    setModalShow(true);
  }

  const handleClick = () => {
    navigate('/services/addDigitalService');
  };

  useEffect(() => {
    getUsername().then((decodedToken) => {
      setUsername(decodedToken.username);
      setRole(decodedToken.role);
      getServicesBasedOnOwner({ username: decodedToken.username })
        .then((data) => {
          setService(data);
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }, []);

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
    margin: '10px',
    float: 'right',
    border: '1px solid #dee2e6',
    boxShadow: '0 0 1px 1px #dee2e6',
    borderRadius: '10px',
  };

  return (
    <>
      <div className="mt-20 ml-20 mr-20">
        <div style={{ display: 'flex' }}>
          <div style={div1Style}>
            <div style={{ display: 'flex' }}>
              <h3>Your Services</h3>
              <button
                style={{ backgroundColor: '#0066ff' }}
                className="ms-auto text-white py-2 px-4 rounded-lg inline-flex"
                onClick={handleClick}
              >
                <span className="">Add new service</span>
                <PlusIcon className="ml-1 h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            {service && service.data && service.data.length === 0 ? (
              <>
                <div className="text-center mt-20">
                  <img
                    className="h-60 w-60 justify-center m-auto"
                    src={NoServicesAdded}
                    alt="No Services Added"
                  />
                  <p className="text-gray-500 text-xl text-center m-10">
                    You have not added any services yet!
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                  {service &&
                    service.data &&
                    service.data.map((item) => (
                      <div
                        key={item._id}
                        className="group relative"
                        /* onClick={() => handleProductClick(item)} */
                      >
                        <div
                          style={div2Style}
                          className="min-h-80 lg:h-80 w-100 m-1"
                        >
                          <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md group-hover:opacity-75 bg-gray-200 lg:aspect-none lg:h-80">
                            <img
                              src={item.dsImg}
                              alt={item.dpName}
                              className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                            />
                          </div>
                          <hr />
                          <h4 className="text-center text-gray-700 mb-2">
                            <span
                              aria-hidden="true"
                              className="absolute inset-0"
                            />
                            {item.dsName}
                          </h4>
                          <div className="flex gap-2 text-center m-1 items-center justify-center">
                            <button
                              className="bg-blue-600  text-white py-2 px-4 rounded z-10 flex items-center justify-center"
                              onClick={() => handleProductClick(item)}
                            >
                              View
                              <EyeIcon className="h-4 w-4 ml-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </>
            )}
          </div>
        </div>
        {selectedService && (
          <MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            item={selectedService}
          />
        )}
      </div>
    </>
  );
  function MyVerticallyCenteredModal({ show, onHide, item }) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleDeleteClick = () => {
      setShowDeleteModal(true);
    };

    return (
      <Modal size="xl" centered show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Service Overview - {item.dsName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="m-2">
            <div className="flex">
              <div className="w-1/2 mr-50">
                <span className="font-bold">Service Name: </span>
                <span>{item.dsName}</span>
                <br />
                <span className="font-bold">Service Description: </span>
                <span>{item.dsDescription}</span>
                <br />
                <span className="font-bold">Category: </span>
                <span>
                  {item.dsCategory}
                  {' >'} {item.dsSubCategory}
                </span>
                <br />
                <br />
                <span className="font-bold">Your Thumbnail </span>
                <img
                  src={item.dsImg}
                  alt="{product.imageAlt}"
                  className="h-80 w-80 object-cover object-center rounded-md"
                />
              </div>
              <div className="flex row w-full">
                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 xl:gap-x-8 h-1/2 w-4/5">
                  <Card className="shadow-md w-100">
                    <CardBody>
                      <h3 className="text-center text-gray-700 mb-2">
                        Package 1
                      </h3>
                      <span className="font-bold">Package Name: </span>
                      <span>{item.dsPkgs.dsPkg1.dsPkg1Name}</span>
                      <br />
                      <span className="font-bold">Package Price: </span>
                      <span>{item.dsPkgs.dsPkg1.dsPkg1Price} HK</span>
                      <br />
                      <span className="font-bold">Package Revisions: </span>
                      <span>{item.dsPkgs.dsPkg1.dsPkg1Revisions}</span>
                      <br />
                    </CardBody>
                  </Card>
                  <Card className="shadow-md w-100">
                    <CardBody>
                      <h3 className="text-center text-gray-700 mb-2">
                        Package 2
                      </h3>
                      <span className="font-bold">Package Name: </span>
                      <span>{item.dsPkgs.dsPkg2.dsPkg2Name}</span>
                      <br />
                      <span className="font-bold">Package Price: </span>
                      <span>{item.dsPkgs.dsPkg2.dsPkg2Price} HK</span>
                      <br />
                      <span className="font-bold">Package Revisions: </span>
                      <span>{item.dsPkgs.dsPkg2.dsPkg2Revisions}</span>
                      <br />
                    </CardBody>
                  </Card>
                  <Card className="shadow-md w-100">
                    <CardBody>
                      <h3 className="text-center text-gray-700 mb-2">
                        Package 1
                      </h3>
                      <span className="font-bold">Package Name: </span>
                      <span>{item.dsPkgs.dsPkg3.dsPkg3Name}</span>
                      <br />
                      <span className="font-bold">Package Price: </span>
                      <span>{item.dsPkgs.dsPkg3.dsPkg3Price} HK</span>
                      <br />
                      <span className="font-bold">Package Revisions: </span>
                      <span>{item.dsPkgs.dsPkg3.dsPkg3Revisions}</span>
                      <br />
                    </CardBody>
                  </Card>
                </div>
                <div>
                  <span className="font-bold">Portfolio Link: </span>
                  <a href="#">{item.dsPortfolioLink}</a>
                  <div className="flex mt-3 gap-4">
                    <button
                      className="bg-yellow-500 text-white py-2 px-4 rounded z-10 flex items-center justify-center"
                      onClick={handleClick}
                    >
                      Edit
                    </button>

                    <button
                      className="bg-red-600 text-white py-2 px-4 rounded z-10 flex items-center justify-center"
                      onClick={handleDeleteClick}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Delete confirmation modal */}
          <Modal
            show={showDeleteModal}
            onHide={() => setShowDeleteModal(false)}
          >
            <Modal.Header closeButton>
              <Modal.Title>Delete Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>
                Are you sure you want to delete your service named "
                <span className="font-bold">{item.dsName}</span>" ?
              </p>
              <p className="text-red-500 uppercase text-xs	 ">
                Note: This action will be permanent and cannot be reverted
              </p>
            </Modal.Body>
            <Modal.Footer>
              <button
                className="btn btn-danger"
                onClick={() => {
                  deleteService(item._id);
                  setShowDeleteModal(false);
                  window.location.reload();
                }}
              >
                Delete
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
            </Modal.Footer>
          </Modal>
        </Modal.Body>
      </Modal>
    );
  }
}
