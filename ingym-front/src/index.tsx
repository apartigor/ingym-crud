// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Home from './components/Home';
import CadastroPlano from './components/CadastroPlano';
import EditarPlano from './components/EditarPlano';
import ListarPlanos from './components/ListarPlanos';
import ListarAlunos from './components/ListarAlunos';
import CadastroAluno from './components/CadastroAluno';
import EditarAluno from './components/EditarAluno';
import GlobalStyle from './components/globalStyles';

ReactDOM.render(
  <>
    <GlobalStyle />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="planos/cadastrar" element={<CadastroPlano />} />
          <Route path="planos/editar/:id" element={<EditarPlano />} />
          <Route path="planos/listar" element={<ListarPlanos />} />
          <Route path="alunos/cadastrar" element={<CadastroAluno />} />
          <Route path="alunos/editar/:id" element={<EditarAluno />} />
          <Route path="alunos/listar" element={<ListarAlunos />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </>,
  document.getElementById('root')
);