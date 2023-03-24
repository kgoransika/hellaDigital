import React from 'react';
import useFetch from '../../hooks/fetch.hook';

export default function DashboardComp() {
  const [{ apiData }] = useFetch();
  return (
    <div>
      <h1>Hello {apiData?.username}</h1>
    </div>
  );
}
