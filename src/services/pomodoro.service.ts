import { axiosWithAuth } from '@/api/interceptors';
import { IPomodoroSessionPesponse, TypePomodoroSessionFromState } from '@/types/pomodoro.types';

class PomodoroService {
  private BASE_URL = '/user/timer';

  async getTodaySession() {
    const res = await axiosWithAuth.get<IPomodoroSessionPesponse>(`${this.BASE_URL}/today`);
    return res;
  }

  async createSession() {
    const res = await axiosWithAuth.post<IPomodoroSessionPesponse>(this.BASE_URL);
    return res;
  }

  async deleteSession(id: string) {
    const res = await axiosWithAuth.delete(`${this.BASE_URL}/round/${id}`);
    return res;
  }

  async updateSession(id: string, data: TypePomodoroSessionFromState) {
    const res = await axiosWithAuth.put(`${this.BASE_URL}/round${id}`, data);

    return res;
  }
}

export const pomodoroService = new PomodoroService();
