import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import useFetch from '../../hooks/fetch.hook';
import NavbarComponent from '../NavbarComp/NavbarComp';
import FooterComp from '../FooterComp/FooterComp';
import ClimbingBoxLoader from 'react-spinners/ClimbingBoxLoader';
import clientHomeBg1 from '../../assets/clientHomeBg1.jpg';
import clientHomeBg2 from '../../assets/clientHomeBg2.jpg';
import clientHomeBg3 from '../../assets/clientHomeBg3.jpg';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

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

export default function ClientHome() {
  const [{ apiData, isLoading }] = useFetch();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigateToProducts = () => {
    navigate('/products');
  };

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    }
  }, [token]);

  const digitalProducts = [
    {
      id: 1,
      title: 'Photos',
      category: 'photos',
      imgSrc:
        'https://images.pexels.com/photos/937627/pexels-photo-937627.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      id: 2,
      title: 'Videos',
      category: 'videos',
      imgSrc:
        'https://images.pexels.com/photos/2510428/pexels-photo-2510428.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      id: 3,
      title: 'Music',
      category: 'music',
      imgSrc:
        'https://images.pexels.com/photos/5077420/pexels-photo-5077420.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      id: 4,
      title: 'Websites',
      category: 'websites',
      imgSrc:
        'https://images.pexels.com/photos/5082581/pexels-photo-5082581.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      id: 5,
      title: 'E-Books',
      category: 'ebooks',
      imgSrc:
        'https://images.pexels.com/photos/2846814/pexels-photo-2846814.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      id: 6,
      title: 'Printable',
      category: 'printable',
      imgSrc:
        'https://images.pexels.com/photos/354939/pexels-photo-354939.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      id: 7,
      title: 'Graphic Assets',
      category: 'graphicassets',
      imgSrc:
        'https://images.pexels.com/photos/11798029/pexels-photo-11798029.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
  ];

  const digitalServices = [
    {
      id: 1,
      title1: 'Photo Editing',
      title2: 'Photo Retouching',
      title3: 'Vector tracing',
      category: 'photo',
      imgSrc:
        'https://images.pexels.com/photos/6155010/pexels-photo-6155010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      id: 2,
      title1: 'Video Editing',
      title2: 'Video Ads and Commercials',
      title3: 'Video Marketing',
      category: 'video',
      imgSrc:
        'https://images.pexels.com/photos/8100060/pexels-photo-8100060.jpeg',
    },
    {
      id: 3,
      title1: 'Music Producer',
      title2: 'Music Promotion',
      category: 'music',
      imgSrc:
        'https://images.pexels.com/photos/8133278/pexels-photo-8133278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      id: 4,
      title1: 'Web Development',
      title2: 'Mobile App Development',
      title3: 'WordPress Development',
      category: 'website',
      imgSrc:
        'https://images.pexels.com/photos/943096/pexels-photo-943096.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      id: 5,
      title1: 'Book Writing',
      title2: 'Book layouts & cover designs',
      category: 'ebooks',
      imgSrc:
        'https://images.pexels.com/photos/3278769/pexels-photo-3278769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      id: 6,
      title1: 'Custom printable designing',
      title2: 'Poster design',
      title3: 'Illustration',
      category: 'printable',
      imgSrc:
        'https://images.pexels.com/photos/9807996/pexels-photo-9807996.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      id: 7,
      title1: 'Logo Design',
      title2: 'Logo Animations, Intros and Outros',
      title3: '3D product designing',
      category: 'graphicassets',
      imgSrc:
        'https://images.pexels.com/photos/11798029/pexels-photo-11798029.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
  ];

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 4,
        },
      },
    ],
  };

  const images = [clientHomeBg1, clientHomeBg2, clientHomeBg3];
  const [bgImage, setBgImage] = useState(images[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      const index = images.indexOf(bgImage);
      const nextIndex = index === images.length - 1 ? 0 : index + 1;
      setBgImage(images[nextIndex]);
    }, 5000);
    return () => clearInterval(interval);
  }, [bgImage, images]);

  return (
    <>
      <style>
        {`

          .carousel {
            width: 80%;
            margin: auto;
            max-height: 400px;

          }
          
          .card {
            width: 100%;
            height: 300px;
            max-height: 300px;
            background-color: #f9f9f9;
            border-radius: 5px;
            text-align: center;
          }

          .card-link {
            display: block;
            height: 100%;
          }

          .slick-slide {
            margin: 20px;
            max-height: 130px; 
          }

          .slick-slide:hover {
            color: red;
          }

          .slick-prev:before,
          .slick-next:before {
            color: black;
          }

          .slick-prev {
            left: -50px;
          }

          .slick-next {
            right: -50px;
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
        <div>
          <div
            style={{
              backgroundColor: 'black',
              borderRadius: '2px',
              marginBottom: '50px',
            }}
          >
            <div
              className="mainBg"
              style={{
                backgroundImage: `url(${bgImage})`,
                height: '98vh',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transition: 'background-image 1s ease-in-out',
                display: 'flex',
                flexDirection: 'column-reverse',
              }}
            >
              <div
                className="text-center"
                style={{
                  marginTop: 'auto',
                  marginBottom: '30vh',
                }}
              >
                {isLoggedIn ? (
                  <div>
                    <h1 className="text-white">Welcome {apiData?.username}!</h1>
                    <a href="#carousel">
                      <button
                        className="text-center inline-flex items-center gap-x-1 leading-6 text-white rounded"
                        style={{
                          color: 'white',
                          backgroundColor: 'hsl(216, 100%, 50%)',
                          width: '20vh',
                          height: '5vh',
                        }}
                      >
                        <span className="ml-10">Explore</span>
                        <ChevronDownIcon
                          className="h-5 w-5 "
                          aria-hidden="true"
                        />
                      </button>
                    </a>
                  </div>
                ) : (
                  <div>
                    <h1 className="text-white">Welcome to Hella Digital!</h1>
                    <h2 className="text-white">Join with us</h2>
                    <br />
                    <a href="#carousel">
                      <button
                        className="rounded"
                        style={{
                          color: 'white',
                          backgroundColor: 'hsl(216, 100%, 50%)',
                          width: '20vh',
                          height: '5vh',
                        }}
                      >
                        Explore!
                      </button>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
          <br />
          <div className="carousel" id="carousel">
            <h2>Digital Products</h2>
            <Slider {...settings}>
              {digitalProducts.map((digitalProduct) => (
                <div
                  key={digitalProduct.id}
                  className=""
                  onClick={navigateToProducts}
                >
                  <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 hover:opacity-75 lg:aspect-none lg:h-80 relative">
                    <h5 className="absolute top-0 left-0 z-10 p-4 text-white">
                      {digitalProduct.title}
                    </h5>
                    <img
                      src={digitalProduct.imgSrc}
                      alt={digitalProduct.imageAlt}
                      className="h-full w-full object-cover object-center lg:h-full lg:w-full brightness-50"
                    />
                  </div>
                </div>
              ))}
            </Slider>
          </div>
          <br />
          <br />
          <div className="carousel">
            <h2>Digital Services</h2>
            <Slider {...settings}>
              {digitalServices.map((digitalService) => (
                <div key={digitalService.id}>
                  <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 hover:opacity-75 lg:aspect-none lg:h-80 relative">
                    <h5 className="absolute top-0 left-0 z-10 p-4 text-white">
                      {digitalService.title1}
                      <br />
                      <br />
                      {digitalService.title2}
                      <br />
                      <br />
                      {digitalService.title3}
                    </h5>
                    <img
                      src={digitalService.imgSrc}
                      alt={digitalService.imageAlt}
                      className="h-full w-full object-cover object-center lg:h-full lg:w-full brightness-50"
                    />
                  </div>
                </div>
              ))}
            </Slider>
          </div>
          <div className="bg-white">
            <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                Featured Products
              </h2>

              <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {products.map((product) => (
                  <div key={product.id} className="group relative">
                    <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                      <img
                        src={product.imageSrc}
                        alt={product.imageAlt}
                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                      />
                    </div>
                    <div className="mt-4 flex justify-between">
                      <div>
                        <h3 className="text-sm text-gray-700">
                          <a href={product.href}>
                            <span
                              aria-hidden="true"
                              className="absolute inset-0"
                            />
                            {product.name}
                          </a>
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          {product.color}
                        </p>
                      </div>
                      <p className="text-sm font-medium text-gray-900">
                        {product.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <section className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:px-8">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20" />
            <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
            <div className="mx-auto max-w-2xl lg:max-w-4xl">
              <p className="text-center text-3xl">Testimonials</p>
              <figure className="mt-10">
                <blockquote className="text-center text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9">
                  <p>
                    “Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Nemo expedita voluptas culpa sapiente alias molestiae.
                    Numquam corrupti in laborum sed rerum et corporis.”
                  </p>
                </blockquote>
                <figcaption className="mt-10">
                  <img
                    className="mx-auto h-20 w-20 bg-auto rounded-full"
                    src="https://images.pexels.com/photos/2635534/pexels-photo-2635534.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt=""
                  />
                  <div className="mt-4 flex items-center justify-center space-x-3 text-base">
                    <div className="font-semibold text-gray-900">John Doe</div>
                    <svg
                      viewBox="0 0 2 2"
                      width={3}
                      height={3}
                      aria-hidden="true"
                      className="fill-gray-900"
                    >
                      <circle cx={1} cy={1} r={1} />
                    </svg>
                    <div className="text-gray-600">CEO of John Doe</div>
                  </div>
                </figcaption>
              </figure>
            </div>
          </section>
          <FooterComp />
        </div>
      )}
    </>
  );
}
