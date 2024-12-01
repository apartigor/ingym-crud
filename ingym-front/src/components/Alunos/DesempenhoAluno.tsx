import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #f8f9fa;
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
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Select = styled.select`
  padding: 10px;
  width: 320px;
  border: 1px solid #ccc;
  border-radius: 4px;
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

const Result = styled.div`
  margin-top: 20px;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: left;
`;

const ConsultaDesempenho: React.FC = () => {
    const [alunos, setAlunos] = useState<{ alunoId: number; nome: string }[]>([]);
    const [alunoId, setAlunoId] = useState('');
    const [meses, setMeses] = useState('');
    const [resultado, setResultado] = useState<any>(null);
    const [erro, setErro] = useState('');


    useEffect(() => {
        const fetchAlunos = async () => {
            try {
                const response = await axios.get('http://localhost:5290/api/aluno/listar');
                setAlunos(response.data);
            } catch (error) {
                alert('Erro ao carregar a lista de alunos!');
            }
        };

        fetchAlunos();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!alunoId || !meses) {
            setErro('Preencha todos os campos!');
            return;
        }
        if (Number(meses) < 0) {
            setErro('A quantidade de meses deve ser maior que 0!');
            return;
        }
        setErro('');

        try {
            const response = await axios.post(
                `http://localhost:5290/api/aluno/desempenho/${alunoId}/${meses}`
            );
            console.log(response.data)
            setResultado(response.data);
        } catch (error: any) {
            setErro(error.response?.data || 'Erro ao consultar desempenho!');
            setResultado(null);
        }
    };



    return (
        <Container>
            <Title>Calcular Desconto do Aluno</Title>
            <Form onSubmit={handleSubmit}>
                <Select value={alunoId} onChange={(e) => setAlunoId(e.target.value)} required>
                    <option value="">Selecione um aluno</option>
                    {alunos.map((aluno) => (
                        <option key={aluno.alunoId} value={aluno.alunoId}>
                            {aluno.nome}
                        </option>
                    ))}
                </Select>
                <Input
                    type="number"
                    value={meses}
                    onChange={(e) => setMeses(e.target.value)}
                    placeholder="Meses"
                    required
                />
                <Button type="submit">Consultar</Button>
            </Form>

            {erro && <p style={{ color: 'red' }}>{erro}</p>}

            {resultado && (
                <Result>
                    <p><strong>Aluno:</strong> {resultado.aluno}</p>
                    <p><strong>Plano:</strong> {resultado.plano}</p>
                    <p><strong>Meses:</strong> {resultado.meses}</p>
                    <p><strong>Valor Original:</strong> R$ {resultado.valorOriginal.toFixed(2)}</p>
                    <p><strong>Valor com Desconto:</strong> R$ {resultado.valorComDesconto.toFixed(2)}</p>
                    <p><strong>Desconto Aplicado:</strong> {resultado.descontoAplicado}</p>
                </Result>
            )}
        </Container>
    );
};

export default ConsultaDesempenho;
