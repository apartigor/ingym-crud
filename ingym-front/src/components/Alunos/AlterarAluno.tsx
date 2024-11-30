import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// Styled Components

const Container = styled.div`
  padding: 20px;
  background-color: #f8f9fa;
  height: 100%;
`;

const Title = styled.h1`
  color: #343a40;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Input = styled.input`
  padding: 10px;
  width: 300px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Select = styled.select`
  padding: 10px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9em;
`;

const AlterarAluno: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [planoId, setPlanoId] = useState<number | ''>('');
  const [planos, setPlanos] = useState<any[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchAluno = async () => {
      try {
        const response = await axios.get(`http://localhost:5290/api/aluno/alterar/${id}`);
        const aluno = response.data;
        setNome(aluno.nome);
        setEmail(aluno.email);
        setPlanoId(aluno.planoId);
      } catch (err) {
        setError('Erro ao buscar dados do aluno!');
      }
    };

    const fetchPlanos = async () => {
      try {
        const response = await axios.get('http://localhost:5290/api/plano/listar');
        setPlanos(response.data);
      } catch (error) {
        alert('Erro ao listar planos!');
      }
    };

    fetchAluno();
    fetchPlanos();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (planoId === '') {
      setError('Por favor, selecione um plano.');
      return;
    }

    try {
      await axios.put(`http://localhost:5290/api/aluno/alterar/${id}`, { nome, email, planoId });
      alert('Aluno alterado com sucesso!');
      navigate('http://localhost:5290/alunos/listar');
    } catch (err) {
      setError('Erro ao alterar aluno!');
    }
  };

  return (
    <Container>
      <Title>Alterar Aluno</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome"
          required
        />
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <Select
          value={planoId}
          onChange={(e) => setPlanoId(Number(e.target.value))}
          required
        >
          <option value="">Selecione um plano</option>
          {planos.map((plano) => (
            <option key={plano.id} value={plano.id}>
              {plano.nome}
            </option>
          ))}
        </Select>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Button type="submit">Salvar Alterações</Button>
      </Form>
    </Container>
  );
};

export default AlterarAluno;