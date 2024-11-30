import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import styled from 'styled-components';
import HomeIcon from '@mui/icons-material/Home';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ListIcon from '@mui/icons-material/List';
import PersonIcon from '@mui/icons-material/Person';

// Styled Components

const Container = styled.div`
  display: flex;
  height: 100vh;
`;

// StyledLink deve ser definido antes de Sidebar para permitir a interpolação
const StyledLink = styled(Link)`
  text-decoration: none;
  color: #fff;
  display: flex;
  align-items: center;
  padding: 10px;
  width: 100%;
  border-radius: 4px;
  transition: background-color 0.3s;

  &:hover {
   background-color: #495057;
  }

  svg {
    margin-right: 10px;
    min-width: 24px;
    min-height: 24px;
  }

  span {
    display: none;
    margin-left: 10px;
    white-space: nowrap;
    transition: opacity 0.3s ease;
    opacity: 0;
  }
`;

const SectionTitle = styled.h2`
  color: #adb5bd;
  font-size: 1.2em;
  margin: 20px 0 10px;
  width: 100%;
  text-align: left;
  padding-left: 10px;
  display: none;
  transition: opacity 0.3s ease;
  opacity: 0;
`;

const Sidebar = styled.div`
  width: 50px;
  background-color: #343a40;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  transition: width 0.3s;

  &:hover {
    width: 250px;
  }

  &:hover ${StyledLink} span {
    display: inline;
    opacity: 1;
  }

  &:hover ${SectionTitle} {
    display: block;
    opacity: 1;
  }
`;

const Logo = styled.h1`
  color: #fff;
  margin-bottom: 20px;
  font-size: 1.5em;
  white-space: nowrap;
  opacity: 0;
  transition: opacity 0.3s ease;

  ${Sidebar}:hover & {
    opacity: 1;
  }
`;

const Nav = styled.nav`
  width: 100%;
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  width: 100%;
`;

const NavItem = styled.li`
  width: 100%;
  margin: 10px 0;
`;

const Main = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: flex-end; /* Posiciona a logo no lado direito */
`;

const HeaderLogo = styled.h1`
  margin: 0;
  font-size: 1.5em;
  white-space: nowrap;
`;

const Content = styled.main`
  flex: 1;
  padding: 20px;
  background-color: #f8f9fa;
`;

// Componente App

const App: React.FC = () => {
  return (
    <Container>
      <Sidebar>
        <Logo>IN GYM</Logo>
        <Nav>
          <NavList>
            <NavItem>
              <StyledLink to="/">
                <HomeIcon />
                <span>Home</span>
              </StyledLink>
            </NavItem>
            <SectionTitle>Plano</SectionTitle>
            <NavItem>
              <StyledLink to="/planos/cadastrar">
                <PersonAddIcon />
                <span>Cadastrar Plano</span>
              </StyledLink>
            </NavItem>
            <NavItem>
              <StyledLink to="/planos/listar">
                <ListIcon />
                <span>Listar Planos</span>
              </StyledLink>
            </NavItem>
            <SectionTitle>Aluno</SectionTitle>
            <NavItem>
              <StyledLink to="/alunos/cadastrar">
                <PersonAddIcon />
                <span>Cadastrar Aluno</span>
              </StyledLink>
            </NavItem>
            <NavItem>
              <StyledLink to="/alunos/listar">
                <PersonIcon />
                <span>Listar Alunos</span>
              </StyledLink>
            </NavItem>
          </NavList>
        </Nav>
      </Sidebar>
      <Main>
        <Header>
          <HeaderLogo>IN GYM</HeaderLogo>
        </Header>
        <Content>
          <Outlet />
        </Content>
      </Main>
    </Container>
  );
};

export default App;