import { axiosWithAuth } from '@/api/interceptors';
import { ITimeBlock, TypetTimeBlockFormState } from '@/types/time-block.types';

class TimeBlockService {
  private BASE_URL = '/user/time/blocks';

  async getTimeBlocks() {
    const res = await axiosWithAuth.get<ITimeBlock[]>(this.BASE_URL);
    return res;
  }

  async createTimeBlock(data: TypetTimeBlockFormState) {
    const res = await axiosWithAuth.post(this.BASE_URL, data);
    return res;
  }

  async updateOrderTimeBLock(ids: string[]) {
    const res = await axiosWithAuth.put(`${this.BASE_URL}/update-order`, { ids });
    return res;
  }

  async updateTomeBlock(id: string, data: TypetTimeBlockFormState) {
    const res = await axiosWithAuth.put(`${this.BASE_URL}/${id}`, data);
    return res;
  }

  async deleteTimeBlock(id: string) {
    const res = axiosWithAuth.delete(`${this.BASE_URL}/${id}`);
    return res;
  }
}

export const timeBlockService = new TimeBlockService();
