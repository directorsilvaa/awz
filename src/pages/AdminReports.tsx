import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, FileText, Users, Clock, Calendar,
  TrendingUp, BarChart2, PieChart, Activity,
  Download, Filter, ChevronDown, ArrowUpRight,
  ArrowDownRight, Percent
} from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Bar, Pie, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const AdminReports: React.FC = () => {
  const [dateRange, setDateRange] = useState('month');
  const [processType, setProcessType] = useState('all');
  
  const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'];
  
  // Process Growth Data
  const processesData = {
    labels: months,
    datasets: [
      {
        label: 'Processos Ativos',
        data: [65, 78, 86, 92, 95, 102],
        borderColor: 'rgb(46, 125, 50)',
        backgroundColor: 'rgba(46, 125, 50, 0.5)',
        tension: 0.4
      },
      {
        label: 'Processos Concluídos',
        data: [25, 32, 38, 45, 48, 52],
        borderColor: 'rgb(212, 175, 55)',
        backgroundColor: 'rgba(212, 175, 55, 0.5)',
        tension: 0.4
      }
    ],
  };

  // User Activity Data
  const usersData = {
    labels: months,
    datasets: [
      {
        label: 'Novos Usuários',
        data: [30, 45, 55, 60, 75, 85],
        backgroundColor: 'rgba(46, 125, 50, 0.7)',
      },
      {
        label: 'Usuários Ativos',
        data: [50, 65, 75, 80, 90, 95],
        backgroundColor: 'rgba(212, 175, 55, 0.7)',
      }
    ],
  };

  // Process Distribution Data
  const processTypeData = {
    labels: ['Civil', 'Trabalhista', 'Tributário', 'Comercial', 'Outros'],
    datasets: [
      {
        data: [35, 25, 20, 15, 5],
        backgroundColor: [
          'rgba(46, 125, 50, 0.7)',
          'rgba(212, 175, 55, 0.7)',
          'rgba(25, 118, 210, 0.7)',
          'rgba(156, 39, 176, 0.7)',
          'rgba(158, 158, 158, 0.7)',
        ],
      },
    ],
  };

  // Success Rate Data
  const successRateData = {
    labels: ['Bem-sucedidos', 'Em andamento', 'Não concluídos'],
    datasets: [
      {
        data: [75, 15, 10],
        backgroundColor: [
          'rgba(46, 125, 50, 0.7)',
          'rgba(255, 152, 0, 0.7)',
          'rgba(244, 67, 54, 0.7)',
        ],
        borderWidth: 0,
      },
    ],
  };

  // Time Distribution Data
  const timeDistributionData = {
    labels: ['< 30 dias', '30-60 dias', '60-90 dias', '> 90 dias'],
    datasets: [
      {
        label: 'Distribuição de Tempo',
        data: [20, 35, 25, 20],
        backgroundColor: [
          'rgba(46, 125, 50, 0.7)',
          'rgba(212, 175, 55, 0.7)',
          'rgba(255, 152, 0, 0.7)',
          'rgba(244, 67, 54, 0.7)',
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Link to="/admin" className="text-gray-600 hover:text-primary mr-4">
              <ArrowLeft size={24} />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Relatórios do Administrador</h1>
              <p className="text-gray-600">Análise detalhada e métricas do sistema</p>
            </div>
          </div>

          {/* Export Button */}
          <button className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
            <Download size={20} className="mr-2" />
            Exportar Relatório
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Filter size={20} className="text-gray-400 mr-2" />
              <span className="text-sm text-gray-600 mr-2">Filtros:</span>
            </div>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
            >
              <option value="week">Última Semana</option>
              <option value="month">Último Mês</option>
              <option value="quarter">Último Trimestre</option>
              <option value="year">Último Ano</option>
            </select>
            <select
              value={processType}
              onChange={(e) => setProcessType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
            >
              <option value="all">Todos os Tipos</option>
              <option value="civil">Civil</option>
              <option value="trabalhista">Trabalhista</option>
              <option value="tributario">Tributário</option>
              <option value="comercial">Comercial</option>
            </select>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            {
              label: 'Total de Processos',
              value: '1,234',
              change: '+12.5%',
              trend: 'up',
              icon: FileText,
              color: 'bg-blue-500'
            },
            {
              label: 'Usuários Ativos',
              value: '856',
              change: '+8.2%',
              trend: 'up',
              icon: Users,
              color: 'bg-green-500'
            },
            {
              label: 'Tempo Médio',
              value: '45 dias',
              change: '-5.3%',
              trend: 'down',
              icon: Clock,
              color: 'bg-yellow-500'
            },
            {
              label: 'Taxa de Sucesso',
              value: '92%',
              change: '+3.7%',
              trend: 'up',
              icon: TrendingUp,
              color: 'bg-purple-500'
            }
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} p-3 rounded-lg text-white`}>
                  <stat.icon size={24} />
                </div>
                <span className={`flex items-center text-sm ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                  {stat.trend === 'up' ? (
                    <ArrowUpRight size={16} className="ml-1" />
                  ) : (
                    <ArrowDownRight size={16} className="ml-1" />
                  )}
                </span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-800">{stat.value}</h3>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Process Growth */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-800">Crescimento de Processos</h3>
              <div className="flex items-center text-sm text-gray-500">
                <Calendar size={16} className="mr-2" />
                Últimos 6 meses
              </div>
            </div>
            <Line 
              data={processesData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'bottom' as const,
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
          </div>

          {/* User Activity */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-800">Atividade de Usuários</h3>
              <div className="flex items-center text-sm text-gray-500">
                <Users size={16} className="mr-2" />
                Crescimento mensal
              </div>
            </div>
            <Bar 
              data={usersData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'bottom' as const,
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
          </div>

          {/* Process Distribution */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-800">Distribuição por Tipo</h3>
              <div className="flex items-center text-sm text-gray-500">
                <PieChart size={16} className="mr-2" />
                Tipos de processo
              </div>
            </div>
            <div className="w-full max-w-md mx-auto">
              <Pie 
                data={processTypeData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'bottom' as const,
                    },
                  },
                }}
              />
            </div>
          </div>

          {/* Success Rate */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-800">Taxa de Sucesso</h3>
              <div className="flex items-center text-sm text-gray-500">
                <Percent size={16} className="mr-2" />
                Resultados
              </div>
            </div>
            <div className="w-full max-w-md mx-auto">
              <Doughnut 
                data={successRateData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'bottom' as const,
                    },
                  },
                  cutout: '70%',
                }}
              />
            </div>
          </div>
        </div>

        {/* Detailed Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* Time Distribution */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-800">Distribuição de Tempo</h3>
              <div className="flex items-center text-sm text-gray-500">
                <Clock size={16} className="mr-2" />
                Duração dos processos
              </div>
            </div>
            <Bar 
              data={timeDistributionData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
          </div>

          {/* Performance Metrics */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Métricas de Performance</h3>
            <div className="space-y-4">
              {[
                { label: 'Tempo Médio de Resolução', value: '45 dias', change: '-5.3%' },
                { label: 'Taxa de Aprovação', value: '92%', change: '+3.7%' },
                { label: 'Satisfação do Cliente', value: '4.8/5.0', change: '+0.2' },
                { label: 'Eficiência Processual', value: '87%', change: '+2.1%' }
              ].map((metric, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-800">{metric.label}</p>
                    <p className="text-2xl font-semibold text-gray-900">{metric.value}</p>
                  </div>
                  <span className={`flex items-center text-sm ${
                    metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {metric.change}
                    {metric.change.startsWith('+') ? (
                      <ArrowUpRight size={16} className="ml-1" />
                    ) : (
                      <ArrowDownRight size={16} className="ml-1" />
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminReports;