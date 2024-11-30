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
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
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
      navigate('http://localhost:5290/planos/listar');
    } catch (error) {
      alert('Erro ao atualizar plano!');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input type="text" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome" required />
      <Input type="text" value={descricao} onChange={(e) => setDescricao(e.target.value)} placeholder="Descrição" required />
      <Input type="number" value={preco} onChange={(e) => setPreco(Number(e.target.value))} placeholder="Preço" required />
      <Button type="submit">Atualizar Plano</Button>
    </Form>
  );
};

export default AlterarPlano;