import { IBase } from './root.types';

export interface IPomodoroRoundResponse extends IBase {
  isCompleted?: boolean;
  totalSeconds: number;
}

export interface IPomodoroSessionPesponse extends IBase {
  isCompleted: boolean;
  rounds?: IPomodoroRoundResponse[];
}

export type TypePomodoroSessionFromState = Partial<
  Omit<IPomodoroSessionPesponse, 'id' | 'createdAt' | 'updatedAt'>
>;
