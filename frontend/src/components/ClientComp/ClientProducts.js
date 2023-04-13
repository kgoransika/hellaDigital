import React, { useState, useEffect } from 'react';
import NavbarComponent from '../NavbarComp/NavbarComp';
import { getAllProducts } from '../../helper/helper';

const products = [
  {
    id: 1,
    name: 'testProduct',
    href: '#',
    price: '$$$',
    imageSrc:
      'https://images.pexels.com/photos/2693212/pexels-photo-2693212.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    imageAlt: 'testProduct',
  },
  {
    id: 2,
    name: 'testProduct',
    href: '#',
    price: '$$$',
    imageSrc: '',
    imageAlt: 'testProduct',
  },
  {
    id: 3,
    name: 'testProduct',
    href: '#',
    price: '$$$',
    imageSrc: '',
    imageAlt: 'testProduct',
  },
  {
    id: 4,
    name: 'testProduct',
    href: '#',
    price: '$$$',
    imageSrc: '',
    imageAlt: 'testProduct',
  },
];

export default function ClientProducts() {
  const [product, setProducts] = useState('');

  useEffect(() => {
    getAllProducts()
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <NavbarComponent />
      <div className="">
        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="tracking-tight text-center">
            Digital Products available at our store!
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {product &&
              product.data &&
              product.data.map((item) => (
                <div key={product.id} className="group relative">
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
                        {item.dpQuantity}
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
      </div>
    </>
  );
}
