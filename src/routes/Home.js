import React from 'react';
import styled from 'styled-components';

const Header = styled.header`
  display: flex;
`;

const Title = styled.h1`

`;

const Theme = styled.input`
  
`;

function Home() {
  return (
    <Header>
      <Title>My Home Manager</Title>
      <Theme type="checkbox"></Theme>
    </Header>
  )
}

export default Home