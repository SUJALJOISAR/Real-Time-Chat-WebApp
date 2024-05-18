import React from 'react';
import styled from 'styled-components';
import Robot from '../assets/robot.gif';

const Welcome = ({currentUser}) => {
  return (
    <>
      <Container>
        <img src={Robot} alt="" />
        {currentUser ? (
          <>
            <h1>
              Welcome, <span>{currentUser.username}</span>
            </h1>
            <h3>Please Select a Chat to start Messaging</h3>
          </>
        ) : (
          <h1>Loading...</h1>
        )}
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  img {
    height: 20rem;
  }
  span {
    color: #4e00ff;
  }
`;

export default Welcome;
