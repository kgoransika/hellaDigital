import React from 'react';

export default function MessagesComp() {
  const div1Style = {
    padding: '20px',
    width: '100%',
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

  return (
    <>
      <div className="mt-20 ml-20 mr-20">
        <div style={{ display: 'flex' }}>
          <div style={div2Style}>
            <h3>People</h3>
          </div>
          <div style={div1Style}>
            <h3>Messages</h3>
          </div>
        </div>
      </div>
    </>
  );
}
