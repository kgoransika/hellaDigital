import React from 'react';
import useFetch from '../../hooks/fetch.hook';
import ClimbingBoxLoader from 'react-spinners/ClimbingBoxLoader';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import { CurrencyDollarIcon } from '@heroicons/react/20/solid';
import { TruckIcon } from '@heroicons/react/20/solid';
import { UserGroupIcon } from '@heroicons/react/20/solid';
import { UsersIcon } from '@heroicons/react/20/solid';

export default function DashboardComp() {
  const [{ apiData, isLoading }] = useFetch();

  const cardStyle = {
    margin: '20px',
    border: '1px solid #dee2e6',
    boxShadow: '0 0 1px 1px #dee2e6',
    borderRadius: '10px',
  };

  const div1Style = {
    padding: '20px',
    width: '60%',
    height: '60vh',
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

  const div3Style = {
    padding: '20px',
    height: '60vh',
    margin: '20px',
    border: '1px solid #dee2e6',
    boxShadow: '0 0 1px 1px #dee2e6',
    borderRadius: '10px',
  };

  return (
    <>
      <div className="mt-20 ml-20 mr-20">
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
            <h1>Hello {apiData?.username}</h1>
            <CardGroup>
              <Card style={cardStyle}>
                <Card.Body>
                  <CurrencyDollarIcon
                    className="h-8 w-8 float-right"
                    color="#0066EF"
                    aria-hidden="true"
                  />
                  <Card.Title>Total Sales</Card.Title>
                  <Card.Text className="text-blue-500 font-bold">
                    {apiData?.HKBalance} HK
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card style={cardStyle}>
                <Card.Body>
                  <TruckIcon
                    className="h-7 w-7 float-right"
                    color="#0066EF"
                    aria-hidden="true"
                  />
                  <Card.Title>New orders</Card.Title>
                  <Card.Text>----</Card.Text>
                </Card.Body>
              </Card>
              <Card style={cardStyle}>
                <Card.Body>
                  <UsersIcon
                    className="h-7 w-7 float-right"
                    color="#0066EF"
                    aria-hidden="true"
                  />
                  <Card.Title>Cutomers</Card.Title>
                  <Card.Text>----</Card.Text>
                </Card.Body>
              </Card>
              <Card style={cardStyle}>
                <Card.Body>
                  <UserGroupIcon
                    className="h-8 w-8 float-right"
                    color="#0066EF"
                    aria-hidden="true"
                  />
                  <Card.Title>Visitors</Card.Title>
                  <Card.Text>----</Card.Text>
                </Card.Body>
              </Card>
            </CardGroup>
          </div>
        )}

        <div style={{ display: 'flex' }}>
          <div style={div1Style}>
            <h3>Recent Orders</h3>
          </div>
        </div>
      </div>
    </>
  );
}
