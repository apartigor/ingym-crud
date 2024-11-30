import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  padding: 20px;
  background-color: #f8f9fa;
`;

const Title = styled.h1`
  color: #343a40;
  margin-bottom: 20px;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #a30000;
  }
`;

const ListarPlanos: React.FC = () => {
  const [planos, setPlanos] = useState<any[]>([]);
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

  const handleAlterarPlano = (planoId: number) => {
    navigate(`http://localhost:5290/planos/alterar/${planoId}`);
  };

  return (
    <Container>
      <Title>Planos</Title>
      <List>
        {planos.map((plano) => (
          <ListItem key={plano.planoId}>
            <span>
            {plano.planoId} - {plano.nome} - {plano.descricao} - R$ {plano.preco.toFixed(2)}
            </span>
            <Button onClick={() => handleAlterarPlano(plano.planoId)}>Alterar</Button>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default ListarPlanos;