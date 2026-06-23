import React from 'react';
import { Layout } from '../../shared/layout/Layout';
import { Accordion } from './accordion/Accordion';
import { AccordionBefore } from './accordion/AccordionBefore';
import { OperationFilter } from './filter/OperationFilter';
import { OperationFilterBefore } from './filter/OperationFilterBefore';
import { UserBalance } from './hoc/UserBalance';
import { UserBalanceBefore } from './hoc/UserBalanceBefore';
import { OperationStatsContainer } from './operation-stats/OperationStatsContainer';
import { OperationStatsBefore } from './operation-stats/OperationStatsBefore';
import { OperationListMemo } from './memoization/OperationListMemo';
import { OperationListMemoBefore } from './memoization/OperationListMemoBefore';
import { Timer } from './timer/Timer';
import { TimerBefore } from './timer/TimerBefore';
import './patterns.css';

function PatternSection({
  pattern,
  title,
  note,
  before,
  after,
}: {
  pattern: string;
  title: string;
  note: string;
  before: React.ReactNode;
  after: React.ReactNode;
}) {
  return (
    <section className="patterns-demo__section">
      <p className="patterns-demo__pattern">{pattern}</p>
      <h2 className="patterns-demo__title">{title}</h2>
      <p className="patterns-demo__note">{note}</p>
      <div className="patterns-compare">
        <div>
          <p className="patterns-compare__column-title">До рефакторинга</p>
          {before}
        </div>
        <div>
          <p className="patterns-compare__column-title">После рефакторинга</p>
          {after}
        </div>
      </div>
    </section>
  );
}

export function PatternsDemo() {
  return (
    <Layout
      logoTitle="FinanceApp"
      headerContent={<span style={{ color: '#6b7280', fontSize: 14 }}>Паттерны React</span>}
    >
      <div className="patterns-demo">
        <PatternSection
          pattern="Compound Components"
          title="Аккордеон"
          note="Гибкая композиция через Accordion.Item / Header / Body и общий контекст."
          before={<AccordionBefore />}
          after={
            <Accordion defaultOpenIndex={0}>
              <Accordion.Item index={0}>
                <Accordion.Header>Что такое FinanceApp?</Accordion.Header>
                <Accordion.Body>Приложение для учёта личных финансов и операций.</Accordion.Body>
              </Accordion.Item>
              <Accordion.Item index={1}>
                <Accordion.Header>Как добавить операцию?</Accordion.Header>
                <Accordion.Body>Операции можно добавлять вручную или импортировать из выписки.</Accordion.Body>
              </Accordion.Item>
            </Accordion>
          }
        />
        <PatternSection
          pattern="Custom Hook"
          title="Таймер"
          note="Логика вынесена в useTimer, UI-компонент отвечает только за отображение."
          before={<TimerBefore />}
          after={<Timer />}
        />
        <PatternSection
          pattern="Container / Presentational"
          title="Статистика операций"
          note="OperationStatsContainer управляет данными, OperationStatsView - чистый UI."
          before={<OperationStatsBefore />}
          after={<OperationStatsContainer />}
        />
        <PatternSection
          pattern="HOC"
          title="Баланс пользователя"
          note="withLoading инкапсулирует отображение состояния загрузки."
          before={<UserBalanceBefore />}
          after={<UserBalance />}
        />
        <PatternSection
          pattern="Provider / Context"
          title="Фильтр операций"
          note="OperationFilterProvider убирает prop drilling между контролами и списком."
          before={<OperationFilterBefore />}
          after={
            <OperationFilter>
              <OperationFilter.Controls />
              <OperationFilter.List />
            </OperationFilter>
          }
        />
        <PatternSection
          pattern="Memoization"
          title="Список операций"
          note="useMemo кэширует отсортированный список, useCallback стабилизирует обработчик, memo предотвращает лишние перерисовки."
          before={<OperationListMemoBefore />}
          after={<OperationListMemo />}
        />
      </div>
    </Layout>
  );
}
