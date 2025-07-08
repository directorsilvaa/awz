import React, { useState } from 'react';
import { Search, FileText, Building2, Scale, Calendar, User, Eye } from 'lucide-react';

interface Process {
  id: string;
  companyName: string;
  bankruptcyDecree: string;
  court: string;
  request: string;
  responsible: string;
  rjDeferment: string;
  judicialAdminInfo: string;
  currentPhase: string;
  type: 'Recuperação Judicial' | 'Falência';
  processNumber: string;
  createdAt: string;
  creditorBalance?: number;
}

const AdminProcessConsultation: React.FC = () => {
  const [selectedType, setSelectedType] = useState<'all' | 'Recuperação Judicial' | 'Falência'>('all');
  const [selectedProcess, setSelectedProcess] = useState<Process | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  // Mock data - in real app, this would come from API
  const processes: Process[] = [
    {
      id: '1',
      companyName: 'Empresa ABC Ltda',
      bankruptcyDecree: '15/01/2024',
      court: 'Vara Empresarial - TJSP',
      request: 'Recuperação Judicial',
      responsible: 'João Silva',
      rjDeferment: '20/01/2024',
      judicialAdminInfo: 'AWDZ - Administração Judicial',
      currentPhase: 'Análise de Credores',
      type: 'Recuperação Judicial',
      processNumber: '1001234-12.2024.8.26.0100',
      createdAt: '10/01/2024',
      creditorBalance: 2500000
    },
    {
      id: '2',
      companyName: 'Indústria XYZ S.A.',
      bankruptcyDecree: '10/02/2024',
      court: 'Vara Empresarial - TJRJ',
      request: 'Falência',
      responsible: 'Maria Santos',
      rjDeferment: '',
      judicialAdminInfo: 'AWDZ - Administração Judicial',
      currentPhase: 'Liquidação de Ativos',
      type: 'Falência',
      processNumber: '2001234-12.2024.8.19.0001',
      createdAt: '05/02/2024',
      creditorBalance: 1800000
    },
    {
      id: '3',
      companyName: 'Comércio DEF ME',
      bankruptcyDecree: '25/02/2024',
      court: 'Vara Empresarial - TJMG',
      request: 'Recuperação Judicial',
      responsible: 'Pedro Oliveira',
      rjDeferment: '01/03/2024',
      judicialAdminInfo: 'AWDZ - Administração Judicial',
      currentPhase: 'Plano de Recuperação',
      type: 'Recuperação Judicial',
      processNumber: '3001234-12.2024.8.13.0024',
      createdAt: '20/02/2024',
      creditorBalance: 850000
    }
  ];

  const filteredProcesses = processes.filter(process => 
    selectedType === 'all' || process.type === selectedType
  );

  const handleViewDetails = (process: Process) => {
    setSelectedProcess(process);
    setShowDetails(true);
  };

  return (
    <div className="py-12 px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Consulta de Processos</h1>
        <p className="text-gray-600">Consulte processos por tipo e visualize detalhes das empresas</p>
      </div>

      {/* Filter */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex items-center space-x-4">
          <Search size={20} className="text-gray-400" />
          <span className="text-sm text-gray-600">Filtrar por tipo:</span>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
          >
            <option value="all">Todos os tipos</option>
            <option value="Recuperação Judicial">Recuperação Judicial</option>
            <option value="Falência">Falência</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center">
            <div className="bg-blue-500 p-3 rounded-lg text-white mr-4">
              <FileText size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total de Processos</p>
              <p className="text-2xl font-semibold text-gray-800">{processes.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center">
            <div className="bg-green-500 p-3 rounded-lg text-white mr-4">
              <Scale size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Recuperações Judiciais</p>
              <p className="text-2xl font-semibold text-gray-800">
                {processes.filter(p => p.type === 'Recuperação Judicial').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center">
            <div className="bg-red-500 p-3 rounded-lg text-white mr-4">
              <Building2 size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Falências</p>
              <p className="text-2xl font-semibold text-gray-800">
                {processes.filter(p => p.type === 'Falência').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Process List */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Empresa</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Tipo</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Número do Processo</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Tribunal</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Fase Atual</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Saldo Credores</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredProcesses.map((process) => (
                <tr key={process.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{process.companyName}</div>
                      <div className="text-sm text-gray-500">Responsável: {process.responsible}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      process.type === 'Recuperação Judicial' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {process.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{process.processNumber}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{process.court}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{process.currentPhase}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {process.creditorBalance ? 
                      `R$ ${process.creditorBalance.toLocaleString('pt-BR')}` : 
                      'N/A'
                    }
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end">
                      <button
                        onClick={() => handleViewDetails(process)}
                        className="text-primary hover:text-primary-dark"
                        title="Ver detalhes"
                      >
                        <Eye size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details Modal */}
      {showDetails && selectedProcess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[800px] max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-800">
                Detalhes do Processo - {selectedProcess.companyName}
              </h3>
              <button
                onClick={() => setShowDetails(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nome da Empresa</label>
                  <p className="text-gray-900">{selectedProcess.companyName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Decretação Falência</label>
                  <p className="text-gray-900">{selectedProcess.bankruptcyDecree}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Vara</label>
                  <p className="text-gray-900">{selectedProcess.court}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Pedido</label>
                  <p className="text-gray-900">{selectedProcess.request}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Responsável</label>
                  <p className="text-gray-900">{selectedProcess.responsible}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Deferimento RJ</label>
                  <p className="text-gray-900">{selectedProcess.rjDeferment || 'N/A'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Informações do Administrador Judicial</label>
                  <p className="text-gray-900">{selectedProcess.judicialAdminInfo}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Fase Atual</label>
                  <p className="text-gray-900">{selectedProcess.currentPhase}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Número do Processo</label>
                  <p className="text-gray-900">{selectedProcess.processNumber}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Saldo de Credores</label>
                  <p className="text-gray-900">
                    {selectedProcess.creditorBalance ? 
                      `R$ ${selectedProcess.creditorBalance.toLocaleString('pt-BR')}` : 
                      'N/A'
                    }
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowDetails(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProcessConsultation;