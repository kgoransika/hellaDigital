import React, { useState, useEffect } from 'react';
import NavbarComponent from '../NavbarComp/NavbarComp';
import { getAllServices } from '../../helper/helper';
import { getServicesCategory } from '../../helper/helper';
import Modal from 'react-bootstrap/Modal';
import FooterComp from '../FooterComp/FooterComp';
import useFetch from '../../hooks/fetch.hook';
import ClimbingBoxLoader from 'react-spinners/ClimbingBoxLoader';

export default function ClientServices() {
  const [{ isLoading }] = useFetch();
  const [service, setService] = useState('');
  const [category, setCategory] = useState('');
  const [selectedService, setSelectedService] = useState(null);
  const [modalShow, setModalShow] = React.useState(false);

  const div2Style = {
    padding: '20px',
    width: '40%',
    height: 'auto',
    margin: '10px',
    border: '1px solid #dee2e6',
    boxShadow: '0 0 1px 1px #dee2e6',
    borderRadius: '10px',
  };

  const pkgDivStyle = {
    padding: '20px',
    width: '40%',
    height: 'auto',
    margin: '10px',
    border: '1px #0066FF',
    boxShadow: '0 0 10px 0.3px #0066FF',
    borderRadius: '10px',
  };

  useEffect(() => {
    if (category) {
      getServicesCategory({ category })
        .then((data) => {
          setService(data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      getAllServices()
        .then((data) => {
          setService(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [category]);

  function handleProductClick(item) {
    setSelectedService(item);
    setModalShow(true);
    console.log(item);
  }

  return (
    <>
      <style>
        {`
        .pkgDiv {
            background-color: white;
            padding: 10px;
            border: 1px solid black;
            transition: background-color 0.5s ease;
            box-shadow: 0 0 5px #00ff00;
            cursor: pointer;
          }
          .pkgDiv:hover {
            background-color: #0066ff;
            color: white;
            transition: background-color 0.5s ease;
            animation: pulse 2s infinite;
            box-shadow: 0 0 10px #00ff00, 0 0 20px #00ff00, 0 0 40px #00ff00, 0 0 80px #00ff00;
          }

          @keyframes pulse {
            0% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.1);
            }
            100% {
              transform: scale(1);
            }
          `}
      </style>
      <NavbarComponent />
      {isLoading ? (
        <ClimbingBoxLoader
          size={20}
          color={'#0066EF'}
          loading={isLoading}
          style={{ margin: 50 }}
          duration={1}
        />
      ) : (
        <>
          <div className="">
            <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
              <h2 className="tracking-tight text-center">
                Browse your desired digital products throughout our store!
              </h2>
              <hr />
              <div className="flex">
                <h2>I am searching for </h2>
                <select
                  className="border rounded w-1/7 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ml-2"
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select a category</option>
                  <option value="photos">Photos</option>
                  <option value="videos">Videos</option>
                  <option value="music">Music</option>
                  <option value="webtemplates">Web Templates</option>
                  <option value="ebooks">E-books</option>
                  <option value="printable">Printable</option>
                  <option value="graphicassets">Graphic Assets</option>
                </select>
              </div>
              <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {service &&
                  service.data &&
                  service.data.map((item) => (
                    <div
                      style={div2Style}
                      key={service._id}
                      className="group relative min-h-80 lg:h-80 w-100 m-1"
                      onClick={() => handleProductClick(item)}
                    >
                      <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                        <img
                          src={item.dsImg}
                          alt="{service.imageAlt}"
                          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                        />
                      </div>
                      <div className="flex justify-between">
                        <div>
                          <span className="text-sm">
                            Service provided by: {item.dsOwner}
                          </span>
                          <br />
                          <span className="text-lg">{item.dsName}</span>
                        </div>
                      </div>
                      <hr />
                      <div className="flex justify-between">
                        <div>
                          <span className="text-sm">
                            PACKAGES STARTING AT{' '}
                            <span className="font-bold">
                              {item.dsPkgs.dsPkg1.dsPkg1Price} HK
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
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
          <FooterComp />
        </>
      )}
    </>
  );

  function MyVerticallyCenteredModal({ show, onHide, item }) {
    return (
      <Modal size="xl" centered show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Service Overview</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div>
              <div className="w-full">
                <h2>{item.dsName}</h2>
                <span>{item.dsDescription}</span>
                <p>{item.dpCategory}</p>
                <span className="font-bold">View my previous work: </span>
                <a href="#" className="font-bold">
                  {item.dsPortfolioLink}
                </a>
                <br />
                <span>
                  {item.dsCategory}
                  {' >'} {item.dsSubCategory}
                </span>
              </div>
              <br />

              <h4>Select your preferred package</h4>
              <div className="flex">
                <div style={pkgDivStyle} className="pkgDiv">
                  <h4 className="text-center text-gray-700 mb-2">
                    {item.dsPkgs.dsPkg1.dsPkg1Name} Package
                  </h4>
                  <span className="font-bold">Delivey Time: </span>
                  <span>{item.dsPkgs.dsPkg1.dsPkg1Dt}</span>
                  <br />
                  <span className="font-bold">Price: </span>
                  <span>{item.dsPkgs.dsPkg1.dsPkg1Price} HK</span>
                  <br />
                  <span className="font-bold">Revisions: </span>
                  <span>{item.dsPkgs.dsPkg1.dsPkg1Revisions}</span>
                </div>
                <div style={pkgDivStyle} className="pkgDiv">
                  <h4 className="text-center text-gray-700 mb-2">
                    {item.dsPkgs.dsPkg2.dsPkg2Name} Package
                  </h4>
                  <span className="font-bold">Delivey Time: </span>
                  <span>{item.dsPkgs.dsPkg2.dsPkg2Dt}</span>
                  <br />
                  <span className="font-bold">Price: </span>
                  <span>{item.dsPkgs.dsPkg2.dsPkg2Price} HK</span>
                  <br />
                  <span className="font-bold">Revisions: </span>
                  <span>{item.dsPkgs.dsPkg2.dsPkg2Revisions}</span>
                </div>
                <div style={pkgDivStyle} className="pkgDiv">
                  <h4 className="text-center text-gray-700 mb-2">
                    {item.dsPkgs.dsPkg3.dsPkg3Name} Package
                  </h4>
                  <span className="font-bold">Delivey Time: </span>
                  <span>{item.dsPkgs.dsPkg3.dsPkg3Dt}</span>
                  <br />
                  <span className="font-bold">Price: </span>
                  <span>{item.dsPkgs.dsPkg3.dsPkg3Price} HK</span>
                  <br />
                  <span className="font-bold">Revisions: </span>
                  <span>{item.dsPkgs.dsPkg3.dsPkg3Revisions}</span>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}
