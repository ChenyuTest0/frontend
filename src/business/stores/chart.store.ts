import { acceptHMRUpdate, defineStore } from 'pinia';
import { container } from 'tsyringe';
import {
  BarChart,
  Chart,
  ChartRepository
} from '../repositories/chart.repository';

interface ChartInfo {
  pieData: Chart[];
  lineData: Chart[];
  barData: BarChart[];
}
export interface ChartData {
  label: string;
  data: number[];
}

export const useChartStore = defineStore({
  id: 'business.chart',
  state: (): ChartInfo => {
    return {
      pieData: [],
      lineData: [],
      barData: []
    };
  },
  getters: {
    getPieDataLabels: state => {
      return state.pieData.map(item => item.label);
    },
    getPieData: state => {
      return state.pieData.map(item => item.data);
    },
    getLineDataLabels: state => {
      return state.lineData.map(item => item.label);
    },
    getLineData: state => {
      return state.lineData.map(item => item.data);
    },
    getBarDataLabels: state => {
      if (state.barData.length > 0) {
        return state.barData[0].data.map(item => item.label);
      }
      return [];
    },
    getBarData: state => {
      const dataList: ChartData[] = [];
      state.barData.map(item => {
        dataList.push({
          label: item.label,
          data: item.data.map(val => val.data)
        });
      });
      return dataList;
    }
  },
  actions: {
    async loadPieData() {
      const userRepository = container.resolve(ChartRepository);
      const response = await userRepository.getPieData();
      this.pieData = response.data;
    },
    async loadLineData() {
      const userRepository = container.resolve(ChartRepository);
      const response = await userRepository.getLineData();
      this.lineData = response.data;
    },
    async loadBarData() {
      const userRepository = container.resolve(ChartRepository);
      const response = await userRepository.getBarData();
      this.barData = response.data;
    }
  }
});

// HMRされたときにStoreの状態を維持する
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useChartStore, import.meta.hot));
}
