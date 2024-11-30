// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import CadastroPlano from './components/Planos/CadastroPlano';
import AlterarPlano from './components/Planos/AlterarPlano';
import ListarPlanos from './components/Planos/ListarPlanos';
import ListarAlunos from './components/Alunos/ListarAlunos';
import CadastroAluno from './components/Alunos/CadastroAluno';
import AlterarAluno from './components/Alunos/AlterarAluno';
import GlobalStyle from './styles/globalStyles';

ReactDOM.render(
  <>
    <GlobalStyle />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="planos/cadastrar" element={<CadastroPlano />} />
          <Route path="planos/alterar/:id" element={<AlterarPlano />} />
          <Route path="planos/listar" element={<ListarPlanos />} />
          <Route path="alunos/cadastrar" element={<CadastroAluno />} />
          <Route path="alunos/alterar/:id" element={<AlterarAluno />} />
          <Route path="alunos/listar" element={<ListarAlunos />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </>,
  document.getElementById('root')
);