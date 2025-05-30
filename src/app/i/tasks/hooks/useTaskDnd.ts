import { FILTERS } from '../columns.data';
import { useUpdateTask } from './useUpdateTask';
import { DropResult } from '@hello-pangea/dnd';

export function useTaskDnd() {
  const { updateTask } = useUpdateTask();

  const onDragEnd = (res: DropResult) => {
    if (!res.destination) return;

    const destinationColumnId = res.destination.droppableId;

    // Проверка для колонки 'completed'
    if (destinationColumnId === 'completed') {
      updateTask({
        id: res.draggableId,
        data: {
          isCompleted: true,
        },
      });
      return;
    }

    // Проверка существования ключа в FILTERS
    if (!FILTERS[destinationColumnId]) {
      console.error('Invalid destination:', destinationColumnId);
      return;
    }

    // Получение даты из FILTERS и преобразование в строку
    const newCreatedAt = FILTERS[destinationColumnId].toISOString();

    updateTask({
      id: res.draggableId,
      data: {
        createdAt: newCreatedAt,
        isCompleted: false,
      },
    });
  };

  return { onDragEnd };
}
