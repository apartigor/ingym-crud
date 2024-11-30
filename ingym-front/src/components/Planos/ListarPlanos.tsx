import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  text-align: center;
  padding: 20px;
`;

const Title = styled.h1`
  color: #333;
  margin-bottom: 20px;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Button = styled.button`
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const ListarPlanos: React.FC = () => {
  const [planos, setPlanos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlanos = async () => {
      try {
        const response = await axios.get('http://localhost:5290/api/plano/listar');
        setPlanos(response.data);
      } catch (error) {
        alert('Erro ao listar planos!');
      }
    };

    fetchPlanos();
  }, []);

  const handleAlterarPlano = (id: number) => {
    navigate(`http://localhost:5290/api/plano/alterar/${id}`);
  };

  return (
    <Container>
      <Title>Planos</Title>
      <List>
        {planos.map((plano: any) => (
          <ListItem key={plano.id}>
            <span>
              {plano.nome} - {plano.descricao} - R$ {plano.preco.toFixed(2)}
            </span>
            <Button onClick={() => handleAlterarPlano(plano.id)}>Alterar</Button>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default ListarPlanos;
