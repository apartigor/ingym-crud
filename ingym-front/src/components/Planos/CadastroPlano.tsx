import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #1c1f22;
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

const Title = styled.h1`
  color: #fff;
  margin-bottom: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #8B0000;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #F00F00;
  }
`;

const CadastroPlano: React.FC = () => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5290/api/plano/cadastrar', { nome, descricao, preco });
      alert('Plano cadastrado com sucesso!');
    } catch (error) {
      alert('Erro ao cadastrar plano!');
    }
  };

  return (
    <Container>
        <Title>Cadastrar Plano</Title>
    <Form onSubmit={handleSubmit}>
      <Input type="text" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome" required />
      <Input type="text" value={descricao} onChange={(e) => setDescricao(e.target.value)} placeholder="Descrição" required />
      <Input type="number" value={preco} onChange={(e) => setPreco(Number(e.target.value))} placeholder="Preço" required />
      <Button type="submit">Cadastrar Plano</Button>
    </Form>
    </Container>
  );
};

export default CadastroPlano;