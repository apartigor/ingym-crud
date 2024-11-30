import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

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
`;

const ListarPlanos: React.FC = () => {
  const [planos, setPlanos] = useState([]);

  useEffect(() => {
    const fetchPlanos = async () => {
      try {
        const response = await axios.get('/api/plano/listar');
        setPlanos(response.data);
      } catch (error) {
        alert('Erro ao listar planos!');
      }
    };

    fetchPlanos();
  }, []);

  return (
    <Container>
      <Title>Planos</Title>
      <List>
        {planos.map((plano: any) => (
          <ListItem key={plano.id}>{plano.nome} - {plano.descricao} - {plano.preco}</ListItem>
        ))}
      </List>
    </Container>
  );
};

export default ListarPlanos;