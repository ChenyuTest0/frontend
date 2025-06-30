import { injectable } from 'tsyringe';
import { AxiosFactory } from '@core/http/axios-factory';

export interface Chart {
  label: string;
  data: number;
}

export interface BarChart {
  label: string;
  data: Chart[];
}

@injectable()
export class ChartRepository {
  private repository = AxiosFactory.get();

  public getPieData(): Promise<{ data: Chart[] }> {
    return this.repository.get('/charts/pie');
  }

  public getLineData(): Promise<{ data: Chart[] }> {
    return this.repository.get('/charts/line');
  }

  public getBarData(): Promise<{ data: BarChart[] }> {
    return this.repository.get('/charts/bar');
  }
}
