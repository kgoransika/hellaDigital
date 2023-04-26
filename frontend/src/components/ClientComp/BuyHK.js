import React from 'react';
import NavbarComp from '../NavbarComp/NavbarComp';
import FooterComp from '../FooterComp/FooterComp';
import hkExchange from '../../assets/hkExchange.jpg';

export default function BuyHK() {
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
    border: '1px solid #dee2e6',
    boxShadow: '0 0 1px 1px #dee2e6',
    borderRadius: '10px',
  };

  return (
    <>
      <NavbarComp />
      <div className="mt-20 ml-20 mr-20">
        <div style={{ display: 'flex' }}>
          <div style={div1Style}>
            <h3 className="text-center">BUY HELLA KAASI</h3>
            <h4 className="text-center text-gray-500">
              You need Hella Kaasi to do transactions with us!
            </h4>
            <div className="flex">
              <div style={div2Style}>
                <h3>Hella Kaasi Package 1</h3>
                <div className="flex">
                  <h4 className="text-gray-500">2000 HK</h4>
                  <button className="bg-blue-700 hover:bg-blue-500 text-white py-2 px-4 rounded ms-auto">
                    Buy for 10 USD
                  </button>
                </div>
              </div>
              <div style={div2Style}>
                <h3>Hella Kaasi Package 2</h3>
                <div className="flex">
                  <h4 className="text-gray-500">4000 HK</h4>
                  <button className="bg-blue-700 hover:bg-blue-500 text-white py-2 px-4 rounded ms-auto">
                    Buy for 20 USD
                  </button>
                </div>
              </div>
              <div style={div2Style}>
                <h3>Hella Kaasi Package 3</h3>
                <div className="flex">
                  <h4 className="text-gray-500">6000 HK</h4>
                  <button className="bg-blue-700 hover:bg-blue-500 text-white py-2 px-4 rounded ms-auto">
                    Buy for 30 USD
                  </button>
                </div>
              </div>
            </div>
            <img src={hkExchange} alt="hkExchange" className="w-1/2 mx-auto" />
          </div>
        </div>
      </div>
      <FooterComp />
    </>
  );
}
