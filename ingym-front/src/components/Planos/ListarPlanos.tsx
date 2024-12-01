import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  padding: 20px;
  background-color: #1c1f22;
`;

const Title = styled.h1`
  color: #ccc;
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

const ButtonDelete = styled.button`
  padding: 5px 10px;
  background-color: #8B0000;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #F00F00;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px; /* Espaçamento entre os botões */
  justify-content: flex-end; /* Alinha os botões à direita */
`;

const ButtonAlterar = styled.button`
  padding: 5px 10px;
  background-color: #5CDB7F;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #77DB6E;
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
    if (planoId) {
      navigate(`/plano/alterar/${planoId}`);
    } else {
      console.error("ID do plano não encontrado.");
    }
  };

  const handleDeletarPlano = async (planoId: number) => {
    try {
      const confirmDelete = window.confirm('Tem certeza que deseja excluir este plano?');
      if (confirmDelete) {
        const response = await axios.delete(`http://localhost:5290/api/plano/deletar/${planoId}`);
        alert(response.data);
        setPlanos(planos.filter((aluno: any) => aluno.planoId !== planoId));
      }
    } catch (error) {
      alert('Erro ao deletar aluno!');
    }
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
            <ButtonGroup>
              <ButtonAlterar onClick={() => handleAlterarPlano(plano.planoId)}>Alterar</ButtonAlterar>
              <ButtonDelete onClick={() => handleDeletarPlano(plano.planoId)}>Deletar</ButtonDelete>
            </ButtonGroup>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default ListarPlanos;