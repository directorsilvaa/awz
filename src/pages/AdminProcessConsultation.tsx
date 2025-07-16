import React, { useState, useMemo } from 'react';
import { Search, FileText, Building2, Scale, Calendar, User, Eye, Filter, Download, RefreshCw, X, ChevronDown, SortAsc, SortDesc } from 'lucide-react';

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

type SortField = 'companyName' | 'bankruptcyDecree' | 'court' | 'currentPhase' | 'creditorBalance' | 'createdAt';
type SortDirection = 'asc' | 'desc';

const AdminProcessConsultation: React.FC = () => {
  const [selectedType, setSelectedType] = useState<'all' | 'Recuperação Judicial' | 'Falência'>('all');
  const [selectedProcess, setSelectedProcess] = useState<Process | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // Search and filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [processNumberFilter, setProcessNumberFilter] = useState('');
  const [selectedCourt, setSelectedCourt] = useState<string>('all');
  const [selectedPhase, setSelectedPhase] = useState<string>('all');
  const [selectedResponsible, setSelectedResponsible] = useState<string>('all');
  const [dateRangeStart, setDateRangeStart] = useState('');
  const [dateRangeEnd, setDateRangeEnd] = useState('');
  const [minBalance, setMinBalance] = useState('');
  const [maxBalance, setMaxBalance] = useState('');

  // Sort states
  const [sortField, setSortField] = useState<SortField>('createdAt');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

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
    },
    {
      id: '4',
      companyName: 'Tech Solutions LTDA',
      bankruptcyDecree: '05/03/2024',
      court: 'Vara Empresarial - TJSP',
      request: 'Recuperação Judicial',
      responsible: 'Ana Costa',
      rjDeferment: '12/03/2024',
      judicialAdminInfo: 'AWDZ - Administração Judicial',
      currentPhase: 'Negociação com Credores',
      type: 'Recuperação Judicial',
      processNumber: '4001234-12.2024.8.26.0200',
      createdAt: '01/03/2024',
      creditorBalance: 3200000
    },
    {
      id: '5',
      companyName: 'Metalúrgica Brasil SA',
      bankruptcyDecree: '18/02/2024',
      court: 'Vara Empresarial - TJRJ',
      request: 'Falência',
      responsible: 'Carlos Mendes',
      rjDeferment: '',
      judicialAdminInfo: 'AWDZ - Administração Judicial',
      currentPhase: 'Arrecadação de Bens',
      type: 'Falência',
      processNumber: '5001234-12.2024.8.19.0002',
      createdAt: '15/02/2024',
      creditorBalance: 5400000
    }
  ];

  // Extract unique values for filter options
  const uniqueCourts = [...new Set(processes.map(p => p.court))];
  const uniquePhases = [...new Set(processes.map(p => p.currentPhase))];
  const uniqueResponsibles = [...new Set(processes.map(p => p.responsible))];

  // Parse date for comparison
  const parseDate = (dateStr: string): Date => {
    const [day, month, year] = dateStr.split('/');
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  };

  // Filtered and sorted processes
  const filteredProcesses = useMemo(() => {
    let filtered = processes.filter(process => {
      // Type filter
      if (selectedType !== 'all' && process.type !== selectedType) return false;

      // Search term filter
      if (searchTerm && !process.companyName.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !process.processNumber.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !process.responsible.toLowerCase().includes(searchTerm.toLowerCase())) return false;

      // Process number filter
      if (processNumberFilter && !process.processNumber.toLowerCase().includes(processNumberFilter.toLowerCase())) return false;

      // Court filter
      if (selectedCourt !== 'all' && process.court !== selectedCourt) return false;

      // Phase filter
      if (selectedPhase !== 'all' && process.currentPhase !== selectedPhase) return false;

      // Responsible filter
      if (selectedResponsible !== 'all' && process.responsible !== selectedResponsible) return false;

      // Date range filter
      if (dateRangeStart || dateRangeEnd) {
        const processDate = parseDate(process.createdAt);
        if (dateRangeStart && processDate < new Date(dateRangeStart)) return false;
        if (dateRangeEnd && processDate > new Date(dateRangeEnd)) return false;
      }

      // Balance range filter
      if (minBalance || maxBalance) {
        const balance = process.creditorBalance || 0;
        if (minBalance && balance < parseFloat(minBalance)) return false;
        if (maxBalance && balance > parseFloat(maxBalance)) return false;
      }

      return true;
    });

    // Sort
    filtered.sort((a, b) => {
      let aValue: any = a[sortField];
      let bValue: any = b[sortField];

      if (sortField === 'creditorBalance') {
        aValue = a.creditorBalance || 0;
        bValue = b.creditorBalance || 0;
      } else if (sortField === 'bankruptcyDecree' || sortField === 'createdAt') {
        aValue = parseDate(aValue);
        bValue = parseDate(bValue);
      } else if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [processes, selectedType, searchTerm, processNumberFilter, selectedCourt, selectedPhase,
    selectedResponsible, dateRangeStart, dateRangeEnd, minBalance, maxBalance, sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setProcessNumberFilter('');
    setSelectedType('all');
    setSelectedCourt('all');
    setSelectedPhase('all');
    setSelectedResponsible('all');
    setDateRangeStart('');
    setDateRangeEnd('');
    setMinBalance('');
    setMaxBalance('');
  };

  const exportToCSV = () => {
    const headers = ['Empresa', 'Tipo', 'Número do Processo', 'Tribunal', 'Fase Atual', 'Saldo Credores', 'Responsável', 'Data Criação'];
    const csvData = filteredProcesses.map(process => [
      process.companyName,
      process.type,
      process.processNumber,
      process.court,
      process.currentPhase,
      process.creditorBalance ? `R$ ${process.creditorBalance.toLocaleString('pt-BR')}` : 'N/A',
      process.responsible,
      process.createdAt
    ]);

    const csvContent = [headers, ...csvData].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'processos_consulta.csv';
    link.click();
  };

  const handleViewDetails = (process: Process) => {
    setSelectedProcess(process);
    setShowDetails(true);
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? <SortAsc size={16} /> : <SortDesc size={16} />;
  };

  return (
    <div className="py-12 px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Consulta de Processos</h1>
        <p className="text-gray-600">Consulte processos por tipo e visualize detalhes das empresas</p>
      </div>

      {/* Main Search and Basic Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Buscar por empresa, processo ou responsável..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
          <div className="relative">
            <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Número do processo..."
              value={processNumberFilter}
              onChange={(e) => setProcessNumberFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
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

        <div className="flex items-center justify-between">
          <button
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className="flex items-center space-x-2 text-primary hover:text-primary-dark"
          >
            <Filter size={20} />
            <span>Filtros Avançados</span>
            <ChevronDown className={`transform transition-transform ${showAdvancedFilters ? 'rotate-180' : ''}`} size={16} />
          </button>

          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-600">
              {filteredProcesses.length} processo(s) encontrado(s)
            </span>
            <button
              onClick={clearFilters}
              className="flex items-center space-x-1 text-gray-600 hover:text-gray-800"
            >
              <RefreshCw size={16} />
              <span>Limpar</span>
            </button>
            <button
              onClick={exportToCSV}
              className="flex items-center space-x-1 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700"
            >
              <Download size={16} />
              <span>Exportar CSV</span>
            </button>
          </div>
        </div>

        {/* Advanced Filters */}
        {showAdvancedFilters && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tribunal</label>
                <select
                  value={selectedCourt}
                  onChange={(e) => setSelectedCourt(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  <option value="all">Todos os tribunais</option>
                  {uniqueCourts.map(court => (
                    <option key={court} value={court}>{court}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Fase Atual</label>
                <select
                  value={selectedPhase}
                  onChange={(e) => setSelectedPhase(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  <option value="all">Todas as fases</option>
                  {uniquePhases.map(phase => (
                    <option key={phase} value={phase}>{phase}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Responsável</label>
                <select
                  value={selectedResponsible}
                  onChange={(e) => setSelectedResponsible(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  <option value="all">Todos os responsáveis</option>
                  {uniqueResponsibles.map(responsible => (
                    <option key={responsible} value={responsible}>{responsible}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Período de Criação</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="date"
                    value={dateRangeStart}
                    onChange={(e) => setDateRangeStart(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                  <input
                    type="date"
                    value={dateRangeEnd}
                    onChange={(e) => setDateRangeEnd(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Faixa de Saldo de Credores (R$)</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    placeholder="Mínimo"
                    value={minBalance}
                    onChange={(e) => setMinBalance(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                  <input
                    type="number"
                    placeholder="Máximo"
                    value={maxBalance}
                    onChange={(e) => setMaxBalance(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center">
            <div className="bg-blue-500 p-3 rounded-lg text-white mr-4">
              <FileText size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total de Processos</p>
              <p className="text-2xl font-semibold text-gray-800">{filteredProcesses.length}</p>
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
                {filteredProcesses.filter(p => p.type === 'Recuperação Judicial').length}
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
                {filteredProcesses.filter(p => p.type === 'Falência').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center">
            <div className="bg-purple-500 p-3 rounded-lg text-white mr-4">
              <User size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Saldo Total</p>
              <p className="text-2xl font-semibold text-gray-800">
                R$ {filteredProcesses.reduce((sum, p) => sum + (p.creditorBalance || 0), 0).toLocaleString('pt-BR')}
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
                <th
                  className="px-6 py-4 text-left text-sm font-semibold text-gray-600 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('companyName')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Empresa</span>
                    {getSortIcon('companyName')}
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Tipo</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Número do Processo</th>
                <th
                  className="px-6 py-4 text-left text-sm font-semibold text-gray-600 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('court')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Tribunal</span>
                    {getSortIcon('court')}
                  </div>
                </th>
                <th
                  className="px-6 py-4 text-left text-sm font-semibold text-gray-600 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('currentPhase')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Fase Atual</span>
                    {getSortIcon('currentPhase')}
                  </div>
                </th>
                <th
                  className="px-6 py-4 text-left text-sm font-semibold text-gray-600 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('creditorBalance')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Saldo Credores</span>
                    {getSortIcon('creditorBalance')}
                  </div>
                </th>
                <th
                  className="px-6 py-4 text-left text-sm font-semibold text-gray-600 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('createdAt')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Data Criação</span>
                    {getSortIcon('createdAt')}
                  </div>
                </th>
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
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${process.type === 'Recuperação Judicial'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                      }`}>
                      {process.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 font-mono">{process.processNumber}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{process.court}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {process.currentPhase}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 font-semibold">
                    {process.creditorBalance ?
                      `R$ ${process.creditorBalance.toLocaleString('pt-BR')}` :
                      'N/A'
                    }
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{process.createdAt}</td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end">
                      <button
                        onClick={() => handleViewDetails(process)}
                        className="text-primary hover:text-primary-dark p-1 rounded-full hover:bg-primary/10"
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

        {filteredProcesses.length === 0 && (
          <div className="text-center py-12">
            <FileText size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum processo encontrado</h3>
            <p className="text-gray-500">Tente ajustar os filtros para encontrar os processos desejados.</p>
          </div>
        )}
      </div>

      {/* Details Modal */}
      {showDetails && selectedProcess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[900px] max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-800">
                Detalhes do Processo - {selectedProcess.companyName}
              </h3>
              <button
                onClick={() => setShowDetails(false)}
                className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nome da Empresa</label>
                  <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{selectedProcess.companyName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Processo</label>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${selectedProcess.type === 'Recuperação Judicial'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                    }`}>
                    {selectedProcess.type}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Decretação Falência</label>
                  <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{selectedProcess.bankruptcyDecree}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Vara</label>
                  <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{selectedProcess.court}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pedido</label>
                  <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{selectedProcess.request}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Responsável</label>
                  <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{selectedProcess.responsible}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Número do Processo</label>
                  <p className="text-gray-900 bg-gray-50 p-3 rounded-lg font-mono">{selectedProcess.processNumber}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Deferimento RJ</label>
                  <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{selectedProcess.rjDeferment || 'N/A'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Informações do Administrador Judicial</label>
                  <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{selectedProcess.judicialAdminInfo}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fase Atual</label>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    {selectedProcess.currentPhase}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Saldo de Credores</label>
                  <p className="text-gray-900 bg-gray-50 p-3 rounded-lg font-semibold">
                    {selectedProcess.creditorBalance ?
                      `R$ ${selectedProcess.creditorBalance.toLocaleString('pt-BR')}` :
                      'N/A'
                    }
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Data de Criação</label>
                  <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{selectedProcess.createdAt}</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDetails(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Fechar
              </button>
              <button
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors flex items-center space-x-2"
              >
                <Download size={16} />
                <span>Baixar Relatório</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProcessConsultation;