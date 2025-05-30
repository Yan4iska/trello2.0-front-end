import { Controller, SubmitHandler, useFormContext } from 'react-hook-form';
import { Button } from '@/components/ui/buttons/Button';
import { Field } from '@/components/ui/fields/Field';

import type { TypeTimeBlockFormState } from '@/types/time-block.types';
import { COLORS } from './colors.data';
import { useCreateTimeBlock } from '../hooks/useCreateTimeBlock';
import { useUpdateTimeBlock } from '../hooks/useUpdateTimBlock';
import styles from './TimeBlockingForm.module.scss';
import { SingleSelect } from '@/components/ui/task-edit/SingleSelect/SingleSelect';

export function TimeBlockingForm() {
  const { register, control, watch, reset, handleSubmit } =
    useFormContext<TypeTimeBlockFormState>();

  const existsId = watch('id');

  const { updateTimeBlock } = useUpdateTimeBlock(existsId);
  const { createTimeBlock, isPending } = useCreateTimeBlock();

  const onSubmit: SubmitHandler<TypeTimeBlockFormState> = (data) => {
    const { color, id, ...rest } = data;
    const dto = { ...rest, color: color || undefined };

    if (id) {
      updateTimeBlock({
        id,
        data: dto,
      });
    } else {
      createTimeBlock(dto);
    }

    reset({
      color: COLORS[COLORS.length - 1],
      duration: 0,
      name: '',
      id: undefined,
      order: 1,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <Field
        {...register('name', {
          required: true,
        })}
        id="name"
        label="Enter name:"
        placeholder="Enter name:"
        className={styles.field}
      />

      <Field
        {...register('duration', {
          required: true,
          valueAsNumber: true,
        })}
        id="duration"
        label="Enter duration (min.):"
        placeholder="Enter duration (min.):"
        isNumber
        className={styles.field}
      />

      <div className={styles.selectWrapper}>
        <span className={styles.colorLabel}>Color:</span>
        <Controller
          control={control}
          name="color"
          render={({ field: { value, onChange } }) => (
            <SingleSelect
              data={COLORS.map((item) => ({
                value: item,
                label: item,
              }))}
              onChange={onChange}
              value={value || COLORS[COLORS.length - 1]}
              isColorSelect
            />
          )}
        />
      </div>

      <Button type="submit" disabled={isPending} className={styles.submitButton}>
        {existsId ? 'Update' : 'Create'}
      </Button>
    </form>
  );
}
