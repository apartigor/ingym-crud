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

const ListarAlunos: React.FC = () => {
  const [alunos, setAlunos] = useState([]);

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

  return (
    <Container>
      <Title>Alunos</Title>
      <List>
        {alunos.map((aluno: any) => (
          <ListItem key={aluno.id}>{aluno.nome} - {aluno.email} - {aluno.plano.nome}</ListItem>
        ))}
      </List>
    </Container>
  );
};

export default ListarAlunos;