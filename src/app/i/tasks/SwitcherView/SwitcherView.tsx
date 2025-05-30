'use client';

import cn from 'clsx';
import { Kanban, ListTodo } from 'lucide-react';
import styles from './SwitcherView.module.scss';
import type { TypeView } from '../TasksView/TasksView';

interface ISwitcherView {
  type: TypeView;
  setType: (value: TypeView) => void;
}

export function SwitcherView({ setType, type }: ISwitcherView) {
  return (
    <div className={styles.container}>
      <button
        className={cn(styles.button, {
          [styles.inactive]: type === 'kanban',
        })}
        onClick={() => setType('list')}
      >
        <ListTodo className={styles.icon} />
        List
      </button>
      <button
        className={cn(styles.button, {
          [styles.inactive]: type === 'list',
        })}
        onClick={() => setType('kanban')}
      >
        <Kanban className={styles.icon} />
        Board
      </button>
    </div>
  );
}
