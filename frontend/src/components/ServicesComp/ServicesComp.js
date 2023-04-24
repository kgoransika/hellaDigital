import React, { useState, useEffect } from 'react';
import { PlusIcon } from '@heroicons/react/20/solid';
import { useNavigate } from 'react-router-dom';
import { getUsername } from '../../helper/helper';
import { getServicesBasedOnOwner } from '../../helper/helper';

export default function ServicesComp() {
  const navigate = useNavigate();
  const [service, setService] = useState([]);
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');

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
    height: '60vh',
    margin: '20px',
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
            <div>
            {service &&
                  service.data &&
                  service.data.map((item) => (
                <div key={item.id} style={{ margin: '20px 0' }}>
                  <img src={item.dsImg} alt={item.dsName} style={{ width: '100px', height: '100px', marginRight: '20px' }} />
                  <span>{item.dsName}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}