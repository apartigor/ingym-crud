// src/components/Home.tsx
import React from 'react';
import styled from 'styled-components';

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: #1c1f22; 
`;

const HomeTitle = styled.h1`
  color: #8B0000;
  font-size: 3.5em;
`;

const HomeSubTitle = styled.h2`
  color: #D3D3D3; 
  font-size: 1.5em;
`;



const Home: React.FC = () => {
  return (
    <HomeContainer>
      <HomeTitle>IN GYM</HomeTitle>
      <HomeSubTitle>Sistema de Gestão de Academia</HomeSubTitle>
    </HomeContainer>
  );
};

export default Home;