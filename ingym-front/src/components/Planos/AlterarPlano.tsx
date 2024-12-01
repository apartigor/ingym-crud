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
const Container = styled.div`
  padding: 20px;
  background-color: #1c1f22;
`;

const Title = styled.h1`
  color: #fff;
  margin-bottom: 20px;
`;

const AlterarPlano: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState(0);

  useEffect(() => {
    const fetchPlano = async () => {
      try {
        const response = await axios.get(`http://localhost:5290/api/plano/buscar/${id}`);
        const plano = response.data;
        setNome(plano.nome);
        setDescricao(plano.descricao);
        setPreco(plano.preco);
      } catch (error) {
        alert('Erro ao buscar plano!');
      }
    };

    fetchPlano();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5290/api/plano/alterar/${id}`, { nome, descricao, preco });
      alert('Plano atualizado com sucesso!');
      navigate('/planos/listar');
    } catch (error) {
      alert('Erro ao atualizar plano!');
    }
  };

  return (
    <Container>
      <Title>Alterar Plano</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <Input
          type="text"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
        <Input
          type="number"
          value={preco}
          onChange={(e) => setPreco(Number(e.target.value))}
        />
        <Button type="submit">Salvar</Button>
      </Form>
    </Container>
  );
};

export default AlterarPlano;