import React from 'react';
import { Layout } from '../shared/layout/Layout';
import { InfiniteOperationList } from '../shared/operation/InfiniteOperationList';
import { ModalWithInput } from '../shared/modal/ModalWithInput';
import './App.css';

function App() {
  return (
    <Layout logoTitle="FinanceApp" headerContent={<span className="app__header-note">Списки и порталы</span>}>
      <section className="app__section">
        <h1 className="app__title">Операции</h1>
        <p className="app__text">Прокрутите список - новые операции подгружаются автоматически</p>
        <InfiniteOperationList />
      </section>
      <section className="app__section">
        <h2 className="app__subtitle">Модальное окно</h2>
        <ModalWithInput />
      </section>
    </Layout>
  );
}

export default App;
