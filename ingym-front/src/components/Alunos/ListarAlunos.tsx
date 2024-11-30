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

  const handleAlterarAluno = (id: number) => {
    navigate(`http://localhost:5290/aluno/alterar/${id}`);
  };

  return (
    <Container>
      <Title>Alunos</Title>
      <List>
        {alunos.map((aluno: any) => (
          <ListItem key={aluno.id}>
            <span>
            {aluno.nome} - {aluno.email} - {aluno.plano.nome}
            </span>
            <Button onClick={() => handleAlterarAluno(aluno.id)}>Alterar</Button>
          </ListItem>

        ))}
      </List>
    </Container>
  );
};

export default ListarAlunos;