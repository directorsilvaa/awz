import React, { useState } from 'react';
import { Plus, Trash2, Search, Filter, User, FileText, Clock } from 'lucide-react';

interface Process {
  id: string;
  userId: string;
  userName: string;
  number: string;
  title: string;
  status: string;
  court: string;
  description: string;
  createdAt: string;
  lastUpdate: string;
  type: string;
  isPublic: boolean;
}

const AdminProcesses: React.FC = () => {
  const [processNumber, setProcessNumber] = useState('');
  const [processTitle, setProcessTitle] = useState('');
  const [processCourt, setProcessCourt] = useState('');
  const [processStatus, setProcessStatus] = useState('Em andamento');
  const [processDescription, setProcessDescription] = useState('');
  const [processType, setProcessType] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedUser, setSelectedUser] = useState('all');

  // Mock users data
  const users = [
    { id: '1', name: 'João Silva' },
    { id: '2', name: 'Maria Santos' },
    { id: '3', name: 'Pedro Oliveira' }
  ];

  const handleAddProcess = () => {
    if (processNumber && processTitle && processCourt && selectedUserId) {
      const selectedUser = users.find(u => u.id === selectedUserId);
      const newProcess = {
        id: Math.random().toString(36).substring(7),
        userId: selectedUserId,
        userName: selectedUser?.name || '',
        number: processNumber,
        title: processTitle,
        court: processCourt,
        status: processStatus,
        description: processDescription,
        type: processType,
        isPublic,
        createdAt: new Date().toLocaleDateString(),
        lastUpdate: new Date().toLocaleDateString()
      };

      const processes = JSON.parse(localStorage.getItem('processes') || '[]');
      processes.push(newProcess);
      localStorage.setItem('processes', JSON.stringify(processes));

      resetForm();
      setShowAddModal(false);
    }
  };

  const resetForm = () => {
    setProcessNumber('');
    setProcessTitle('');
    setProcessCourt('');
    setProcessStatus('Em andamento');
    setProcessDescription('');
    setProcessType('');
    setSelectedUserId('');
    setIsPublic(false);
  };

  const handleDeleteProcess = (id: string) => {
    const processes = JSON.parse(localStorage.getItem('processes') || '[]');
    const updatedProcesses = processes.filter((p: Process) => p.id !== id);
    localStorage.setItem('processes', JSON.stringify(updatedProcesses));
  };

  const processes: Process[] = JSON.parse(localStorage.getItem('processes') || '[]');

  const filteredProcesses = processes.filter(process => {
    const matchesSearch = 
      process.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      process.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      process.court.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || process.status === selectedStatus;
    const matchesUser = selectedUser === 'all' || process.userId === selectedUser;
    return matchesSearch && matchesStatus && matchesUser;
  });

  return (
    <div className="py-12 px-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Gerenciamento de Processos</h1>
          <p className="text-gray-600">Cadastre e gerencie os processos por usuário</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors flex items-center"
        >
          <Plus size={20} className="mr-2" />
          Novo Processo
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Total de Processos', value: processes.length, icon: FileText, color: 'bg-blue-500' },
          { label: 'Em Andamento', value: processes.filter(p => p.status === 'Em andamento').length, icon: Clock, color: 'bg-yellow-500' },
          { label: 'Concluídos', value: processes.filter(p => p.status === 'Concluído').length, icon: FileText, color: 'bg-green-500' },
          { label: 'Processos Públicos', value: processes.filter(p => p.isPublic).length, icon: User, color: 'bg-purple-500' }
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

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Buscar processos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
            >
              <option value="all">Todos os status</option>
              <option value="Em andamento">Em andamento</option>
              <option value="Concluído">Concluído</option>
              <option value="Pendente">Pendente</option>
            </select>
          </div>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
            >
              <option value="all">Todos os usuários</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Process List */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Número</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usuário</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Título</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tribunal</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Público</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProcesses.map((process) => (
                <tr key={process.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{process.number}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{process.userName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{process.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{process.court}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      process.status === 'Em andamento' ? 'bg-blue-100 text-blue-800' :
                      process.status === 'Concluído' ? 'bg-green-100 text-green-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {process.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{process.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      process.isPublic ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {process.isPublic ? 'Sim' : 'Não'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleDeleteProcess(process.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Process Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[600px]">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Novo Processo
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Usuário
                </label>
                <select
                  value={selectedUserId}
                  onChange={(e) => setSelectedUserId(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  <option value="">Selecione um usuário</option>
                  {users.map(user => (
                    <option key={user.id} value={user.id}>{user.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Número do Processo
                </label>
                <input
                  type="text"
                  value={processNumber}
                  onChange={(e) => setProcessNumber(e.target.value)}
                  placeholder="0000000-00.0000.0.00.0000"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Título
                </label>
                <input
                  type="text"
                  value={processTitle}
                  onChange={(e) => setProcessTitle(e.target.value)}
                  placeholder="Título do processo"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tribunal
                </label>
                <input
                  type="text"
                  value={processCourt}
                  onChange={(e) => setProcessCourt(e.target.value)}
                  placeholder="Ex: TJSP"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={processStatus}
                  onChange={(e) => setProcessStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  <option value="Em andamento">Em andamento</option>
                  <option value="Concluído">Concluído</option>
                  <option value="Pendente">Pendente</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo
                </label>
                <input
                  type="text"
                  value={processType}
                  onChange={(e) => setProcessType(e.target.value)}
                  placeholder="Ex: Civil, Trabalhista"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descrição
              </label>
              <textarea
                value={processDescription}
                onChange={(e) => setProcessDescription(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="Descrição do processo..."
              />
            </div>
            <div className="mb-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={isPublic}
                  onChange={(e) => setIsPublic(e.target.checked)}
                  className="rounded border-gray-300 text-primary focus:ring-primary"
                />
                <span className="ml-2 text-sm text-gray-600">
                  Processo público (visível na consulta pública)
                </span>
              </label>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowAddModal(false);
                  resetForm();
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                Cancelar
              </button>
              <button
                onClick={handleAddProcess}
                disabled={!processNumber || !processTitle || !processCourt || !selectedUserId}
                className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary-dark rounded-lg disabled:opacity-50"
              >
                Adicionar Processo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProcesses;