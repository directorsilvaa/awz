import React, { useState } from 'react';
import { Clock } from 'lucide-react';

const AdminAssembly: React.FC = () => {
  const [assemblyTime, setAssemblyTime] = useState('');
  const [assemblyDate, setAssemblyDate] = useState('');
  const [userId, setUserId] = useState('');

  const handleSetAssembly = () => {
    if (assemblyDate && assemblyTime && userId) {
      const dateTime = new Date(`${assemblyDate}T${assemblyTime}`).getTime();
      const assemblies = JSON.parse(localStorage.getItem('userAssemblies') || '{}');
      assemblies[userId] = dateTime;
      localStorage.setItem('userAssemblies', JSON.stringify(assemblies));
      
      setAssemblyDate('');
      setAssemblyTime('');
      setUserId('');
    }
  };

  // Get all assemblies for display
  const assemblies = JSON.parse(localStorage.getItem('userAssemblies') || '{}');
  const assemblyList = Object.entries(assemblies).map(([userId, timestamp]) => ({
    userId,
    datetime: new Date(timestamp as number).toLocaleString('pt-BR')
  }));

  return (
    <div className="py-12 px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Configuração de Assembleias</h1>
        <p className="text-gray-600">Gerencie as assembleias individuais dos usuários</p>
      </div>

      {/* Assembly Configuration Form */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Nova Assembleia</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ID do Usuário
            </label>
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="Digite o ID do usuário"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Data da Assembleia
            </label>
            <input
              type="date"
              value={assemblyDate}
              onChange={(e) => setAssemblyDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Horário
            </label>
            <input
              type="time"
              value={assemblyTime}
              onChange={(e) => setAssemblyTime(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
        </div>
        <div className="mt-4">
          <button
            onClick={handleSetAssembly}
            disabled={!userId || !assemblyDate || !assemblyTime}
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Definir Assembleia
          </button>
        </div>
      </div>

      {/* Assemblies List */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Assembleias Agendadas</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID do Usuário
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data e Hora
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {assemblyList.map((assembly) => (
                <tr key={assembly.userId}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {assembly.userId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {assembly.datetime}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminAssembly;