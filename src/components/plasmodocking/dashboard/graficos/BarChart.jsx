import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  LineElement,
  Tooltip,
  Legend,
  PointElement,
  LineController,
} from 'chart.js';

ChartJS.register(
  LineController,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  LineElement,
  Tooltip,
  Legend,
  PointElement
);
import { ResponsiveContainer } from "recharts"
import { useTranslations } from 'next-intl';

const MIN_Y_VALUE = -15;
const MAX_Y_VALUE = 15;

const chartOptions = {
  plugins: {
    legend: { position: 'top' },
    title: { display: true, text: 'Macromolecula' },
  },
  maintainAspectRatio: false,
  responsive: true,
  scales: {
    x: {
      ticks: {
        font: {
          weight: 'bold'
        }
      },
      stacked: true
    },
    y: {
      beginAtZero: true,
      min: MIN_Y_VALUE,
      max: MAX_Y_VALUE,
      ticks: { font: { weight: 'bold' } },
      grid: {
        drawBorder: false,
        color: function (context) {
          if (context.tick.value === 0) {
            return 'rgba(0, 0, 0, 0.5)'; // Cor para a linha do valor 0
          } else {
            return 'rgba(0, 0, 0, 0.1)'; // Cor para as outras linhas
          }
        },
        lineWidth: function (context) {
          return context.tick.value === 0 ? 2 : 1; // Largura da linha para o valor 0
        },
      },
    },
  },
};

const BarChart = ({ liganteNames, liganteEnergias, energiaRedocking }) => {
  const t = useTranslations('Dashboard');

  const chartData = useMemo(() => {
    let adjustedLiganteNames = [...liganteNames];
    let adjustedLiganteEnergias = [...liganteEnergias];

    // Adiciona 0 no início e no final se o número de energias for menor que 3
    if (adjustedLiganteEnergias.length < 3) {
      adjustedLiganteEnergias = [0, ...adjustedLiganteEnergias, 0];
      adjustedLiganteNames = ["", ...adjustedLiganteNames, ""];
    }

    const datasets = [];
    const positiveEnergias = adjustedLiganteEnergias.map(energia => energia > 0 ? energia : null);
    const negativeEnergias = adjustedLiganteEnergias.map(energia => energia < 0 ? energia : null);

    if (positiveEnergias.some(energia => energia !== null)) {
      datasets.push({
        type: 'bar',
        label: t('positive_energy'),
        data: positiveEnergias,
        backgroundColor: 'rgba(0, 0, 255, 0.5)',
        borderColor: "rgba(0, 0, 255, 1)",
        borderWidth: 2,
      });
    }

    if (negativeEnergias.some(energia => energia !== null)) {
      datasets.push({
        type: 'bar',
        label: t('negative_energy'),
        data: negativeEnergias,
        backgroundColor: 'rgba(255, 0, 0, 0.5)',
        borderColor: "rgba(255, 0, 0, 1)",
        borderWidth: 2,
      });
    }

    if (energiaRedocking !== undefined) {
      datasets.push({
        type: 'line',
        label: `${t('lower_redocking_energy')}: ${energiaRedocking}`,
        data: Array(adjustedLiganteNames.length).fill(energiaRedocking),
        backgroundColor: 'rgba(0, 0, 0, 0)',
        fill: false,
        borderColor: 'rgb(0,0,0)',
        borderWidth: 3,
        borderDash: [3, 5],
        pointStyle: false,
      });
    }

    return {
      labels: adjustedLiganteNames,
      datasets,
    };
  }, [liganteNames, liganteEnergias, energiaRedocking,t]);

  return (
    <ResponsiveContainer width="75%" height={500} backgroundColor='white'>
      <div className='h-full bg-white border rounded-lg '>

        <Bar data={chartData} options={chartOptions} />
      </div>
    </ResponsiveContainer>
  );
};

BarChart.propTypes = {
  liganteNames: PropTypes.array.isRequired,
  liganteEnergias: PropTypes.array.isRequired,
  chartKey: PropTypes.any,
  energiaRedocking: PropTypes.number,
};

export default BarChart;
