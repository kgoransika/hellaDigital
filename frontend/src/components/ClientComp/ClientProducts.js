import React, { useState, useEffect } from 'react';
import NavbarComponent from '../NavbarComp/NavbarComp';
import { getAllProducts } from '../../helper/helper';
import { getProductsCategory } from '../../helper/helper';
import Modal from 'react-bootstrap/Modal';
import FooterComp from '../FooterComp/FooterComp';
import useFetch from '../../hooks/fetch.hook';
import ClimbingBoxLoader from 'react-spinners/ClimbingBoxLoader';

export default function ClientProducts() {
  const [{ isLoading }] = useFetch();
  const [product, setProducts] = useState('');
  const [category, setCategory] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalShow, setModalShow] = React.useState(false);

  useEffect(() => {
    if (category) {
      getProductsCategory({ category })
        .then((data) => {
          setProducts(data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      getAllProducts()
        .then((data) => {
          setProducts(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [category]);

  function handleProductClick(item) {
    setSelectedProduct(item);
    setModalShow(true);
    console.log(item);
  }

  return (
    <>
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
                {product &&
                  product.data &&
                  product.data.map((item) => (
                    <div
                      key={product._id}
                      className="group relative"
                      onClick={() => handleProductClick(item)}
                    >
                      <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                        <img
                          src={item.dpImg}
                          alt="{product.imageAlt}"
                          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                        />
                      </div>
                      <div className="mt-4 flex justify-between">
                        <div>
                          <h3 className="text-sm text-gray-700">
                            <a>
                              <span
                                aria-hidden="true"
                                className="absolute inset-0"
                              />
                              {item.dpName}
                            </a>
                          </h3>
                          <p className="mt-1 text-sm text-gray-500">
                            Items left in stock: {item.dpQuantity}
                          </p>
                        </div>
                        <p className="text-sm font-medium text-gray-900">
                          $ {item.dpPrice}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            {selectedProduct && (
              <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                item={selectedProduct}
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
      <Modal size="lg" centered show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Product Overview</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className="flex">
              <div className="mt-5 ml-5 w-1/2 mr-50">
                <h2>{item.dpName}</h2>
                <p>Items left in stock: {item.dpQuantity}</p>
                <p>{item.dpCategory}</p>
                <p>$ {item.dpPrice}</p>
                <button
                  type="submit"
                  className="bg-blue-700 hover:bg-blue-600 text-white py-1 px-3 rounded-lg"
                >
                  Add to Cart!
                </button>
              </div>
              <div className="float-right">
                <img
                  src={item.dpImg}
                  alt="{product.imageAlt}"
                  className="h-80 w-80 object-cover object-center rounded-md"
                />
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}
