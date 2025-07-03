import React from 'react';
import { FileText, PieChart, Files, Users } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const processes = JSON.parse(localStorage.getItem('processes') || '[]');

  return (
    <div className="py-12 px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Painel Administrativo</h1>
        <p className="text-gray-600">Bem-vindo ao painel de controle</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Total de Processos', value: processes.length.toString(), icon: FileText, color: 'bg-blue-500' },
          { label: 'Usuários Ativos', value: '856', icon: Users, color: 'bg-green-500' },
          { label: 'PDFs Gerados', value: '2,567', icon: Files, color: 'bg-purple-500' },
          { label: 'Relatórios', value: '189', icon: PieChart, color: 'bg-yellow-500' }
        ].map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className={`${stat.color} p-3 rounded-lg text-white mr-4`}>
                <stat.icon size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-2xl font-semibold text-gray-800">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Atividades Recentes</h2>
          <div className="space-y-4">
            {[
              { text: 'Nova assembleia agendada', time: '2 horas atrás' },
              { text: 'Processo atualizado', time: '5 horas atrás' },
              { text: 'Usuário aprovado', time: '1 dia atrás' }
            ].map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-2 h-2 mt-2 rounded-full bg-primary"></div>
                </div>
                <div>
                  <p className="text-sm text-gray-800">{activity.text}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Próximas Assembleias</h2>
          <div className="space-y-4">
            {[
              { userId: 'USR001', date: '15/03/2024 14:00' },
              { userId: 'USR002', date: '20/03/2024 10:00' },
              { userId: 'USR003', date: '25/03/2024 15:30' }
            ].map((assembly, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-800">Usuário: {assembly.userId}</p>
                  <p className="text-xs text-gray-500">{assembly.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;