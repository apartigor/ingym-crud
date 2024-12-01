import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  padding: 20px;
  background-color: #1c1f22;
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

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px; /* Espaçamento entre os botões */
  justify-content: flex-end; /* Alinha os botões à direita */
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

const ListarAlunos: React.FC = () => {
  const [alunos, setAlunos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAlunos = async () => {
      try {
        const response = await axios.get('http://localhost:5290/api/aluno/listar');
        setAlunos(response.data);
      } catch (error) {
        alert('Erro ao listar alunos!');
      }
    };

    fetchAlunos();
  }, []);

  const handleAlterarAluno = (alunoId: number) => {
    if (alunoId) {
      navigate(`/aluno/alterar/${alunoId}`);
    } else {
      console.error("ID do aluno não encontrado.");
    }
  };

  const handleDeletarAluno = async (alunoId: number) => {
    try {
      const confirmDelete = window.confirm('Tem certeza que deseja excluir este aluno?');
      if (confirmDelete) {
        const response = await axios.delete(`http://localhost:5290/api/aluno/deletar/${alunoId}`);
        alert(response.data);
        setAlunos(alunos.filter((aluno: any) => aluno.alunoId !== alunoId));
      }
    } catch (error) {
      alert('Erro ao deletar aluno!');
    }
  };

  return (
    <Container>
      <Title>Alunos</Title>
      <List>
        {alunos.map((aluno: any) => (
          <ListItem key={aluno.alunoId}>
            <span>
              {aluno.alunoId} - {aluno.nome} - {aluno.email} - {aluno.plano.nome}
            </span>
            <ButtonGroup>
              <ButtonAlterar onClick={() => handleAlterarAluno(aluno.alunoId)}>Alterar</ButtonAlterar>
              <ButtonDelete onClick={() => handleDeletarAluno(aluno.alunoId)}>Deletar</ButtonDelete>
            </ButtonGroup>
          </ListItem>

        ))}
      </List>
    </Container>
  );
};

export default ListarAlunos;