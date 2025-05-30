import { type Dispatch, type SetStateAction } from 'react';
import { ITaskResponse } from '@/types/task.types';
import styles from './ListAddRowInput.module.scss';

interface IListAddRowInput {
  filterDate?: string;
  setItems: Dispatch<SetStateAction<ITaskResponse[] | undefined>>;
}

export function ListAddRowInput({ setItems, filterDate }: IListAddRowInput) {
  const addRow = () => {
    setItems((prev) => {
      if (!prev) return;

      return [
        ...prev,
        {
          id: '',
          name: '',
          isCompleted: false,
          createdAt: filterDate,
          priority: 'low',
        } as ITaskResponse,
      ];
    });
  };

  return (
    <div className={styles.addRow}>
      <button onClick={addRow}>Add task...</button>
    </div>
  );
}
