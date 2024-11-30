import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f8f9fa;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
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

const Title = styled.h1`
  color: #333;
  margin-bottom: 20px;
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

const CadastroAluno: React.FC = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [planoId, setPlanoId] = useState(0);
  const [planos, setPlanos] = useState([]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5290/api/aluno/cadastrar', { nome, email, planoId });
      alert('Aluno cadastrado com sucesso!');
    } catch (error) {
      alert('Erro ao cadastrar aluno!');
    }
  };

  return (
    <Container>
        <Title>Cadastrar Aluno</Title>
      <Form onSubmit={handleSubmit}>
        <Input type="text" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome" required />
        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <Select value={planoId} onChange={(e) => setPlanoId(Number(e.target.value))} required>
          <option value="">Selecione um plano</option>
          {planos.map((plano: any) => (
            <option key={plano.id} value={plano.id}>{plano.nome}</option>
          ))}
        </Select>
        <Button type="submit">Cadastrar Aluno</Button>
      </Form>
    </Container>
  );
};

export default CadastroAluno;