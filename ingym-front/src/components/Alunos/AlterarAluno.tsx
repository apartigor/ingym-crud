import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

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
  width: 320px;
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
const Container = styled.div`
  padding: 20px;
  background-color: #f8f9fa;
`;

const Title = styled.h1`
  color: #343a40;
  margin-bottom: 20px;
`;

const AlterarAluno: React.FC = () => {
  const { alunoId } = useParams<{ alunoId: string }>();
  const navigate = useNavigate();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [planoId, setPlanoId] = useState('');
  const [planos, setPlanos] = useState<any[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPlanos = async () => {
      try {
        const response = await axios.get('http://localhost:5290/api/plano/listar');
        setPlanos(response.data);
      } catch (err) {
        setError('Erro ao buscar planos!');
      }
    };

    fetchPlanos();
  }, [alunoId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5290/api/aluno/alterar/${alunoId}`, { nome, email, planoId });
      alert('Aluno alterado com sucesso!');
      navigate('/alunos/listar');
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
          onChange={(e) => setPlanoId(e.target.value)}
          required
        >
          <option value="">Selecione um plano</option>
          {planos.map((plano) => (
            <option key={plano.planoId} value={plano.planoId}>
              {plano.nome}
            </option>
          ))}
        </Select>
        <Button type="submit">Alterar Aluno</Button>
      </Form>
      {error && <p>{error}</p>}
    </Container>
  );
};

export default AlterarAluno;