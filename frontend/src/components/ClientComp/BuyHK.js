import React, { useEffect } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import NavbarComp from '../NavbarComp/NavbarComp';
import FooterComp from '../FooterComp/FooterComp';
import hkExchange from '../../assets/hkExchange.jpg';
import axios from 'axios';

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

  useEffect(() => {
    const handleTransactionComplete = async () => {
      const paymentId = new URLSearchParams(window.location.search).get(
        'paymentId'
      );
      const token = new URLSearchParams(window.location.search).get('token');
      const payerId = new URLSearchParams(window.location.search).get(
        'PayerID'
      );

      if (paymentId && token && payerId) {
        try {
          await axios.post('/api/paypal/transaction-complete', {
            paymentId,
            token,
            payerId,
          });

          alert('Transaction completed successfully!');
        } catch (error) {
          console.error(error);
          // Handle any error that occurred during the transaction completion
        }
      }
    };

    handleTransactionComplete();
  }, []);

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
                <div>
                  <h4 className="text-gray-500">2000 HK</h4>

                  <PayPalScriptProvider
                    options={{
                      'client-id':
                        'ATmBGOpXo9zAxvwnpOPqtGe2OQ7ANQCebkoBPEszcPTTo287PmKQC7x3La-FnhFxkUfpu0yLKJjCXq_i',
                    }}
                  >
                    <PayPalButtons
                      createOrder={(data, actions) => {
                        return actions.order.create({
                          intent: 'CAPTURE',
                          purchase_units: [
                            {
                              amount: {
                                currency_code: 'USD',
                                value: '10',
                              },
                              custom_id: 'package1',
                            },
                          ],
                        });
                      }}
                      onApprove={(data, actions) => {
                        return actions.order.capture().then(function (details) {
                          // Send the transaction details to your backend for processing
                          const { id: orderId, purchase_units } = details;
                          const packageId = purchase_units[0].custom_id;
                          const paymentId = data.paymentID;
                          const payerId = data.payerID;

                          // Trigger the transaction completion in the backend
                          axios.post('/api/paypal/transaction-complete', {
                            paymentId,
                            token: '',
                            payerId,
                          });
                        });
                      }}
                    />
                  </PayPalScriptProvider>
                </div>
              </div>
              <img
                src={hkExchange}
                alt="hkExchange"
                className="w-1/2 mx-auto"
              />
            </div>
          </div>
        </div>
      </div>
      <FooterComp />
    </>
  );
}
