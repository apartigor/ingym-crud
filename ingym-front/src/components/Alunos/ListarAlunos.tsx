import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
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
  return (
    <Container>
      <Title>Alunos</Title>
      <List>
        {alunos.map((aluno: any) => (
          <ListItem key={aluno.alunoId}>
            <span>
              {aluno.alunoId} - {aluno.nome} - {aluno.email} - {aluno.plano.nome}
            </span>
            <Button onClick={() => handleAlterarAluno(aluno.alunoId)}>Alterar</Button>
          </ListItem>

        ))}
      </List>
    </Container>
  );
};

export default ListarAlunos;