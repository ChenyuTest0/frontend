<template>
  <div>
    <div v-if="!loading" class="flex flex-wrap">
      <div class="max-h-[300px] basis-1/3">
        <Pie :data="pieData" :options="chartOptions" />
      </div>
      <div class="basis-1/2">
        <Line :data="lineData" :options="chartOptions" />
      </div>
      <div class="basis-1/2">
        <Bar :data="barData" :options="chartOptions" />
      </div>
    </div>
  </div>
  <LoadingMask :loading="loading" />
</template>
<script setup lang="ts">
import { Chart, ChartData, registerables } from 'chart.js';
import { computed, onBeforeMount, ref } from 'vue';
import { Pie, Line, Bar } from 'vue-chartjs';
import { useChartStore } from '../../../stores/chart.store';
import { useShowDialogApiHandler } from '@/core/compositions/api-error-handler.composition';

Chart.register(...registerables);

const props = defineProps<{
  title: string;
}>();

const chartStore = useChartStore();

// PieChart 用のデータ
const pieData = computed<ChartData<'pie'>>(() => ({
  labels: chartStore.getPieDataLabels,
  datasets: []
}));

// LineChart 用のデータ
const lineData = computed<ChartData<'line'>>(() => ({
  labels: chartStore.getLineDataLabels,
  datasets: []
}));

// BarChart 用のデータ
const colors = ref([
  'rgba(219,39,91,0.5)',
  'rgba(130,201,169,0.5)',
  'rgba(255,183,76,0.5)'
]);
const barData = computed<ChartData<'bar'>>(() => ({
  labels: chartStore.getBarDataLabels,
  datasets: []
}));

const setupData = async () => {
  pieData.value.datasets = [
    {
      label: 'My First Dataset',
      data: chartStore.getPieData,
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'
      ],
      hoverOffset: 4
    }
  ];

  lineData.value.datasets = [
    {
      label: 'My First Dataset',
      data: chartStore.getLineData,
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }
  ];

  const barDatasets: {
    label: string;
    data: number[];
    backgroundColor: string;
  }[] = [];
  chartStore.getBarData.map((item, index) => {
    barDatasets.push({
      label: item.label,
      data: item.data,
      backgroundColor: colors.value[index]
    });
  });
  barData.value.datasets = barDatasets;
};

const { handleApi, loading } = useShowDialogApiHandler<void>(() =>
  loadChartData()
);

const loadChartData = async () => {
  await chartStore.loadPieData();
  await chartStore.loadLineData();
  await chartStore.loadBarData();
  await setupData();
};

const chartOptions = {
  responsive: true
};

onBeforeMount(async () => {
  await handleApi();
});
</script>
