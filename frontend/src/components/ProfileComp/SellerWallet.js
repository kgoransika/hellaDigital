import React, { useState } from 'react';
import axios from 'axios';
import withdrawalImg from '../../assets/Withdrawal.jpg';

const SellerWallet = () => {
  const [withdrawalAmount, setWithdrawalAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [withdrawalAmountUSD, setWithdrawalAmountUSD] = useState('');

  const div1Style = {
    padding: '20px',
    width: '40%',
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

  const handleWithdrawal = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // Calculate the USD amount to be transferred based on the conversion rate
      const conversionRate = 0.12;
      const withdrawalAmountHKD = Number(withdrawalAmount);
      const withdrawalAmountUSD = withdrawalAmountHKD * conversionRate;
      setWithdrawalAmountUSD(withdrawalAmountUSD.toFixed(2));

      // Make a request to the backend to initiate the withdrawal
      const response = await axios.post('/api/paypal/withdraw', {
        withdrawalAmount: withdrawalAmountHKD,
      });

      // Handle the successful withdrawal
      console.log(response.data); // You can customize this based on your application logic

      // Reset the withdrawal form
      setWithdrawalAmount('');
      setError('');
    } catch (error) {
      // Handle errors
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    //Center align the div
    <div className="mt-20 ml-20 mr-20">
      <div className="flex items-center justify-center">
        <img src={withdrawalImg} alt="hkExchange" className="w-1/2 mx-auto" />
        <div style={div1Style}>
          <h1>Seller Wallet</h1>
          <form onSubmit={handleWithdrawal}>
            <div className="flex gap-2">
              <label htmlFor="withdrawalAmount">Withdrawal Amount (HKD):</label>
              <span className="font-bold text-blue-600">
                HK
                <input
                  type="number"
                  id="withdrawalAmount"
                  value={withdrawalAmount}
                  onChange={(e) => setWithdrawalAmount(e.target.value)}
                  required
                />
              </span>
            </div>
            <div>
              <p>
                USD Amount to be Transferred:{' '}
                <span className="font-bold text-blue-600">
                  $ {withdrawalAmountUSD}
                </span>
              </p>
            </div>
            {error && <p>{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white p-2 rounded-md mt-3 w-full text-center"
            >
              {loading ? 'Processing...' : 'Withdraw'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SellerWallet;
