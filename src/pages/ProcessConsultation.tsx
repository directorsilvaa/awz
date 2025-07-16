import React, { useState } from 'react';
import { Search, FileText, AlertCircle, Clock, Scale, CheckCircle, Eye, Building2, X, Download, User, Calendar, MapPin, CreditCard, Gavel, FileCheck, Users } from 'lucide-react';
import axios from 'axios';
// import axios from 'axios'; // Simulação de API

interface Process {
  _id: string;
  number: string;
  title: string;
  status: string;
  court: string;
  description: string;
  type: string;
  lastUpdate: string;
  isPublic: boolean;
  userId?: {
    _id: string;
    nome: string;
    cargo: string;
    cpf: string;
    email: string;
  };
  processoPDF?: string;
  administradorJudicial?: string;
  nomeEmpresa?: string;
  decretacaoFalencia?: string;
  vara?: string;
  pedido?: string;
  responsavel?: string;
  deferimentoRJ?: string;
  informacoesAdministradorJudicial?: string;
  faseAtual?: string;
  relatorios?: any[];
}

interface ProcessConsultationProps {
  Footer?: React.ComponentType;
}

const ProcessConsultation: React.FC<ProcessConsultationProps> = ({ Footer }) => {
  const [processNumber, setProcessNumber] = useState('');
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [searchResults, setSearchResults] = useState<Process[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProcess, setSelectedProcess] = useState<Process | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSearchPerformed(true);

    try {
      // Simulate API call delay
      // await new Promise(resolve => setTimeout(resolve, 1500));

      // Simulação de resposta da API para demonstração
      // const mockResponse = {
      //   data: {
      //     data: {
      //       _id: "68757e4ecf52ddc57ed53393",
      //       status: "em_andamento",
      //       userId: {
      //         _id: "6875780b0da2ba07b2939e46",
      //         nome: "Marcelo Santana",
      //         cargo: "cliente",
      //         cpf: "70323476562",
      //         email: "marcelo@gg.com"
      //       },
      //       number: processNumber,
      //       title: "Marcelo Processo",
      //       court: "TJSP",
      //       isPublic: true,
      //       lastUpdate: "14/07/2025",
      //       processoPDF: "data:application/pdf;base64,JVBERi0xLjMKJbrfrOAKMyAwIG9iago8PC9UeXBlIC9QYWdl...",
      //       description: "Processo de recuperação judicial em andamento",
      //       administradorJudicial: "ADM JC",
      //       nomeEmpresa: "Empresa OverTech",
      //       decretacaoFalencia: "Sem Falência",
      //       vara: "Vara Responsável",
      //       pedido: "82762",
      //       responsavel: "TJSP",
      //       deferimentoRJ: "Sem Falência",
      //       informacoesAdministradorJudicial: "Administrador responsável pelo processo",
      //       faseAtual: "Em andamento na fase de recuperação judicial",
      //       type: "Recuperação Judicial",
      //       relatorios: []
      //     }
      //   }
      // };

      // Em produção, você usaria:
      const response = await axios.get(`http://localhost:8000/api/auth/processos/numero/${processNumber}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      // const data = await response.json();
      console.log(response)
      if (response?.data) {
        setSearchResults([response.data.data]);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Erro na consulta:', error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    const normalizedStatus = status?.toLowerCase();
    switch (normalizedStatus) {
      case 'em_andamento':
      case 'em andamento':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'concluído':
      case 'concluido':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pendente':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    const normalizedStatus = status?.toLowerCase();
    switch (normalizedStatus) {
      case 'em_andamento':
      case 'em andamento':
        return <Clock size={16} />;
      case 'concluído':
      case 'concluido':
        return <CheckCircle size={16} />;
      case 'pendente':
        return <AlertCircle size={16} />;
      default:
        return <FileText size={16} />;
    }
  };

  const formatStatus = (status: string) => {
    const statusMap: { [key: string]: string } = {
      'em_andamento': 'Em Andamento',
      'em andamento': 'Em Andamento',
      'concluído': 'Concluído',
      'concluido': 'Concluído',
      'pendente': 'Pendente'
    };
    return statusMap[status?.toLowerCase()] || status;
  };

  const openModal = (process: Process) => {
    setSelectedProcess(process);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProcess(null);
  };

  const downloadPDF = (process: Process) => {
    if (process.processoPDF) {
      const link = document.createElement('a');
      link.href = process.processoPDF;
      link.download = `Processo_${process.number}_Relatorio.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const formatCPF = (cpf: string) => {
    if (!cpf) return '';
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  return (
    <div className="pt-20">
      <div className="bg-gradient-to-b from-secondary/10 to-white">
        <section className="pt-20 pb-20 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-[120%] bg-gradient-to-b from-primary/5 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
            <div className="absolute top-1/4 right-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
          </div>

          <div className="container mx-auto px-4 relative">
            <div className="max-w-4xl mx-auto text-center mb-16">

              <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
                <span className="block text-gray-800">Consulta de</span>
                <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Processos</span>
              </h1>

              <p className="text-xl text-gray-700 leading-relaxed mb-8">
                Acompanhe seus processos de forma rápida e segura através de nossa plataforma.
              </p>

              {/* Removing stats section */}
            </div>

            <div className="max-w-3xl mx-auto">
              <div className="bg-white/95 backdrop-blur-sm p-8 rounded-3xl shadow-[0_20px_50px_rgba(46,125,50,0.07)] border border-primary/10">
                <div onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="process" className="block text-sm font-medium text-gray-700 mb-3">
                      Número do Processo
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="process"
                        value={processNumber}
                        onChange={(e) => setProcessNumber(e.target.value)}
                        className="w-full px-6 py-4 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 pl-14 text-lg"
                        placeholder="0000000-00.0000.0.00.0000"
                        required
                      />
                      <FileText className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      Digite o número completo do processo para realizar a consulta
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isLoading || !processNumber.trim()}
                    className="w-full bg-gradient-to-r from-primary to-primary-dark text-white py-4 px-6 rounded-xl font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02]"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Consultando...</span>
                      </>
                    ) : (
                      <>
                        <Search size={20} />
                        <span>Consultar Processo</span>
                      </>
                    )}
                  </button>
                </div>

                {searchPerformed && !isLoading && (
                  <div className="mt-8 pt-8 border-t border-gray-200">
                    {searchResults.length > 0 ? (
                      <div className="space-y-6">
                        <div className="flex items-center justify-between">
                          <h2 className="text-xl font-semibold text-gray-800">Resultados da Pesquisa</h2>
                          <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                            {searchResults.length} processo(s) encontrado(s)
                          </span>
                        </div>

                        {searchResults.map((process) => (
                          <div key={process._id} className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-8 space-y-6 border border-gray-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">{process.title}</h3>
                                <p className="text-primary font-medium text-lg">{process.number}</p>
                                {process.nomeEmpresa && (
                                  <p className="text-gray-600 mt-1">Empresa: {process.nomeEmpresa}</p>
                                )}
                              </div>
                              <div className={`flex items-center space-x-2 px-4 py-2 rounded-full border ${getStatusColor(process.status)}`}>
                                {getStatusIcon(process.status)}
                                <span className="font-medium">{formatStatus(process.status)}</span>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                              <div className="space-y-2">
                                <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Tribunal</p>
                                <div className="flex items-center space-x-2">
                                  <Building2 size={16} className="text-gray-400" />
                                  <p className="text-gray-800 font-medium">{process.court}</p>
                                </div>
                              </div>

                              <div className="space-y-2">
                                <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Tipo</p>
                                <div className="flex items-center space-x-2">
                                  <Scale size={16} className="text-gray-400" />
                                  <p className="text-gray-800 font-medium">{process.type}</p>
                                </div>
                              </div>

                              <div className="space-y-2">
                                <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Última Atualização</p>
                                <div className="flex items-center space-x-2">
                                  <Calendar size={16} className="text-gray-400" />
                                  <p className="text-gray-800 font-medium">{process.lastUpdate}</p>
                                </div>
                              </div>
                            </div>

                            {process?.faseAtual && (
                              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                                <p className="text-sm font-medium text-blue-800 mb-1">Fase Atual</p>
                                <p className="text-blue-700">{process.faseAtual}</p>
                              </div>
                            )}

                            <div className="flex items-center justify-between pt-4 space-x-4">
                              <button
                                onClick={() => openModal(process)}
                                className="flex items-center space-x-2 text-primary hover:text-primary-dark font-medium transition-colors duration-300 px-4 py-2 rounded-lg hover:bg-primary/10"
                              >
                                <Eye size={16} />
                                <span>Ver detalhes</span>
                              </button>

                              {process.processoPDF && (
                                <button
                                  onClick={() => downloadPDF(process)}
                                  className="flex items-center space-x-2 text-green-600 hover:text-green-700 font-medium transition-colors duration-300 px-4 py-2 rounded-lg hover:bg-green-50 border border-green-200"
                                >
                                  <Download size={16} />
                                  <span>Baixar PDF</span>
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-8 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl border-2 border-orange-100">
                        <div className="flex items-start space-x-4">
                          <div className="text-orange-500 mt-1">
                            <AlertCircle size={28} />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-orange-800 text-lg mb-2">Nenhum processo encontrado</h3>
                            <p className="text-orange-700 mb-4 leading-relaxed">
                              Não encontramos nenhum processo público com o número informado.
                              Verifique se o número está correto e tente novamente.
                            </p>
                            <div className="space-y-2 text-sm text-orange-600">
                              <p>• Certifique-se de que o número está completo</p>
                              <p>• Verifique se não há espaços extras</p>
                              <p>• Entre em contato conosco se precisar de ajuda</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Features Section */}
              <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    icon: Scale,
                    title: 'Consulta Pública',
                    description: 'Acesse informações básicas sobre processos públicos de forma rápida e segura.',
                    color: 'from-primary/10 to-secondary/10'
                  },
                  {
                    icon: Clock,
                    title: 'Atualizações Frequentes',
                    description: 'Informações atualizadas regularmente para manter você sempre informado.',
                    color: 'from-blue-50 to-blue-100'
                  },
                  {
                    icon: FileText,
                    title: 'Detalhes Completos',
                    description: 'Visualize detalhes importantes do processo, como status, tipo e tribunal.',
                    color: 'from-green-50 to-green-100'
                  }
                ].map((feature, index) => (
                  <div key={index} className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
                    <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon size={28} className="text-primary" />
                    </div>
                    <h3 className="font-semibold text-gray-800 text-lg mb-3 group-hover:text-primary transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Modal */}
      {isModalOpen && selectedProcess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800">Detalhes do Processo</h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-8">
              {/* Informações Principais */}
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6">
                <h3 className="font-semibold text-blue-800 text-lg mb-4 flex items-center">
                  <FileText className="mr-2" size={20} />
                  Informações Principais
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-blue-600 mb-1">Título</p>
                    <p className="text-blue-800 font-medium">{selectedProcess.title}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-blue-600 mb-1">Número</p>
                    <p className="text-blue-800 font-medium">{selectedProcess.number}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-blue-600 mb-1">Status</p>
                    <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm ${getStatusColor(selectedProcess.status)}`}>
                      {getStatusIcon(selectedProcess.status)}
                      <span>{formatStatus(selectedProcess.status)}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-blue-600 mb-1">Tipo</p>
                    <p className="text-blue-800 font-medium">{selectedProcess.type}</p>
                  </div>
                </div>
              </div>

              {/* Informações do Cliente */}
              {selectedProcess.userId && (
                <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-6">
                  <h3 className="font-semibold text-green-800 text-lg mb-4 flex items-center">
                    <User className="mr-2" size={20} />
                    Informações do Cliente
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-green-600 mb-1">Nome</p>
                      <p className="text-green-800 font-medium">{selectedProcess.userId.nome}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-green-600 mb-1">CPF</p>
                      <p className="text-green-800 font-medium">{formatCPF(selectedProcess.userId.cpf)}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-green-600 mb-1">Email</p>
                      <p className="text-green-800 font-medium">{selectedProcess.userId.email}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-green-600 mb-1">Cargo</p>
                      <p className="text-green-800 font-medium capitalize">{selectedProcess.userId.cargo}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Informações Judiciais */}
              <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-6">
                <h3 className="font-semibold text-purple-800 text-lg mb-4 flex items-center">
                  <Gavel className="mr-2" size={20} />
                  Informações Judiciais
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-purple-600 mb-1">Tribunal</p>
                    <p className="text-purple-800 font-medium">{selectedProcess.court}</p>
                  </div>
                  {selectedProcess.vara && (
                    <div>
                      <p className="text-sm font-medium text-purple-600 mb-1">Vara</p>
                      <p className="text-purple-800 font-medium">{selectedProcess.vara}</p>
                    </div>
                  )}
                  {selectedProcess.responsavel && (
                    <div>
                      <p className="text-sm font-medium text-purple-600 mb-1">Responsável</p>
                      <p className="text-purple-800 font-medium">{selectedProcess.responsavel}</p>
                    </div>
                  )}
                  {selectedProcess.pedido && (
                    <div>
                      <p className="text-sm font-medium text-purple-600 mb-1">Pedido</p>
                      <p className="text-purple-800 font-medium">{selectedProcess.pedido}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Administração Judicial */}
              {(selectedProcess.administradorJudicial || selectedProcess.informacoesAdministradorJudicial) && (
                <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-6">
                  <h3 className="font-semibold text-orange-800 text-lg mb-4 flex items-center">
                    <Users className="mr-2" size={20} />
                    Administração Judicial
                  </h3>
                  <div className="space-y-4">
                    {selectedProcess.administradorJudicial && (
                      <div>
                        <p className="text-sm font-medium text-orange-600 mb-1">Administrador Judicial</p>
                        <p className="text-orange-800 font-medium">{selectedProcess.administradorJudicial}</p>
                      </div>
                    )}
                    {selectedProcess.informacoesAdministradorJudicial && (
                      <div>
                        <p className="text-sm font-medium text-orange-600 mb-1">Informações do Administrador</p>
                        <p className="text-orange-800">{selectedProcess.informacoesAdministradorJudicial}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Informações Empresariais */}
              {(selectedProcess.nomeEmpresa || selectedProcess.decretacaoFalencia || selectedProcess.deferimentoRJ) && (
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6">
                  <h3 className="font-semibold text-gray-800 text-lg mb-4 flex items-center">
                    <Building2 className="mr-2" size={20} />
                    Informações Empresariais
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedProcess.nomeEmpresa && (
                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-1">Nome da Empresa</p>
                        <p className="text-gray-800 font-medium">{selectedProcess.nomeEmpresa}</p>
                      </div>
                    )}
                    {selectedProcess.decretacaoFalencia && (
                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-1">Decretação de Falência</p>
                        <p className="text-gray-800 font-medium">{selectedProcess.decretacaoFalencia}</p>
                      </div>
                    )}
                    {selectedProcess.deferimentoRJ && (
                      <div className="md:col-span-2">
                        <p className="text-sm font-medium text-gray-600 mb-1">Deferimento RJ</p>
                        <p className="text-gray-800 font-medium">{selectedProcess.deferimentoRJ}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Descrição e Fase Atual */}
              <div className="space-y-4">
                {selectedProcess.description && (
                  <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-xl p-6">
                    <h3 className="font-semibold text-indigo-800 text-lg mb-3 flex items-center">
                      <FileCheck className="mr-2" size={20} />
                      Descrição
                    </h3>
                    <p className="text-indigo-700 leading-relaxed">{selectedProcess.description}</p>
                  </div>
                )}

                {selectedProcess.faseAtual && (
                  <div className="bg-gradient-to-r from-teal-50 to-teal-100 rounded-xl p-6">
                    <h3 className="font-semibold text-teal-800 text-lg mb-3">Fase Atual</h3>
                    <p className="text-teal-700 leading-relaxed">{selectedProcess.faseAtual}</p>
                  </div>
                )}
              </div>

              {/* Ações */}
              <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                {selectedProcess.processoPDF && (
                  <button
                    onClick={() => downloadPDF(selectedProcess)}
                    className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-medium transition-colors duration-300"
                  >
                    <Download size={18} />
                    <span>Baixar Relatório PDF</span>
                  </button>
                )}
                <button
                  onClick={closeModal}
                  className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-xl font-medium transition-colors duration-300"
                >
                  <X size={18} />
                  <span>Fechar</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {Footer && <Footer />}
    </div>
  );
};

export default ProcessConsultation;