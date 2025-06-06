import { Edit, GripVertical, Loader, Trash } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

import styles from './TimeBlock.module.scss';

import { ITimeBlockResponse, TypeTimeBlockFormState } from '@/types/time-block.types';
import { useTimeBlockSortable } from '../hooks/useTimeBlockSortable';
import { useDeleteTimeBlock } from '../hooks/useDeleteTimeBlock';

export function TimeBlock({ item }: { item: ITimeBlockResponse }) {
  const { attributes, listeners, setNodeRef, style } = useTimeBlockSortable(item.id);
  const { reset } = useFormContext<TypeTimeBlockFormState>();
  const { deleteTimeBlock, isDeletePending } = useDeleteTimeBlock(item.id);

  return (
    <div ref={setNodeRef} style={style}>
      <div
        className={styles.block}
        style={{
          backgroundColor: item.color || 'lightgray',
          height: `${item.duration}px`,
        }}
      >
        <div className={styles.flexContainer}>
          <button {...attributes} {...listeners} aria-describedby="time-block">
            <GripVertical className={styles.gripContainer} />
          </button>
          <div className={styles.content}>
            {item.name}
            <span className={styles.duration}>({item.duration} min.)</span>
          </div>
        </div>

        <div className={styles.actions}>
          <button
            onClick={() => {
              reset({
                id: item.id,
                color: item.color,
                duration: item.duration,
                name: item.name,
                order: item.order,
              });
            }}
            className={styles.editButton}
          >
            <Edit size={16} />
          </button>
          <button onClick={() => deleteTimeBlock()} className={styles.deleteButton}>
            {isDeletePending ? <Loader size={16} /> : <Trash size={16} />}
          </button>
        </div>
      </div>
    </div>
  );
}
