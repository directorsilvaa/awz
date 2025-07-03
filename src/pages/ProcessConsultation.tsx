import React, { useState } from 'react';
import { Search, FileText, AlertCircle, Clock, Scale, CheckCircle, Eye, Building2 } from 'lucide-react';
import Footer from '../components/Footer';

interface Process {
  id: string;
  number: string;
  title: string;
  status: string;
  court: string;
  description: string;
  type: string;
  lastUpdate: string;
  isPublic: boolean;
}

const ProcessConsultation: React.FC = () => {
  const [processNumber, setProcessNumber] = useState('');
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [searchResults, setSearchResults] = useState<Process[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSearchPerformed(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Get all processes from localStorage
    const allProcesses: Process[] = JSON.parse(localStorage.getItem('processes') || '[]');
    
    // Filter public processes that match the search
    const results = allProcesses.filter(process => 
      process.isPublic && process.number.includes(processNumber)
    );

    setSearchResults(results);
    setIsLoading(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Em andamento':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Concluído':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Pendente':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Em andamento':
        return <Clock size={16} />;
      case 'Concluído':
        return <CheckCircle size={16} />;
      case 'Pendente':
        return <AlertCircle size={16} />;
      default:
        return <FileText size={16} />;
    }
  };

  return (
    <div className="pt-20">
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
        <section className="pt-20 pb-20 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-[120%] bg-gradient-to-b from-primary/5 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
            <div className="absolute top-1/4 right-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
          </div>

          <div className="container mx-auto px-4 relative">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <div className="inline-flex items-center justify-center mb-8 py-3 px-6 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-primary/10">
                <Search size={20} className="text-primary mr-2" />
                <span className="text-primary font-medium">Consulta Pública</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
                <span className="block text-gray-800">Consulta de</span>
                <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Processos</span>
              </h1>
              
              <p className="text-xl text-gray-700 leading-relaxed mb-8">
                Acompanhe seus processos de forma rápida e segura através de nossa plataforma.
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {[
                  { value: '24/7', label: 'Disponibilidade', icon: Clock },
                  { value: '100%', label: 'Segurança', icon: Scale },
                  { value: 'Tempo Real', label: 'Atualizações', icon: CheckCircle }
                ].map((stat, index) => (
                  <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-primary/10">
                    <div className="text-primary mb-3 flex justify-center">
                      <stat.icon size={24} />
                    </div>
                    <div className="text-lg font-bold text-gray-900 mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="max-w-3xl mx-auto">
              <div className="bg-white/95 backdrop-blur-sm p-8 rounded-3xl shadow-[0_20px_50px_rgba(46,125,50,0.07)] border border-primary/10">
                <form onSubmit={handleSubmit} className="space-y-6">
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
                    type="submit"
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
                </form>

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
                          <div key={process.id} className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-8 space-y-6 border border-gray-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">{process.title}</h3>
                                <p className="text-primary font-medium text-lg">{process.number}</p>
                              </div>
                              <div className={`flex items-center space-x-2 px-4 py-2 rounded-full border ${getStatusColor(process.status)}`}>
                                {getStatusIcon(process.status)}
                                <span className="font-medium">{process.status}</span>
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
                                  <Clock size={16} className="text-gray-400" />
                                  <p className="text-gray-800 font-medium">{process.lastUpdate}</p>
                                </div>
                              </div>
                            </div>
                            
                            {process.description && (
                              <div className="pt-4 border-t border-gray-200">
                                <p className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">Descrição</p>
                                <p className="text-gray-700 leading-relaxed">{process.description}</p>
                              </div>
                            )}

                            <div className="flex items-center justify-end pt-4">
                              <button className="flex items-center space-x-2 text-primary hover:text-primary-dark font-medium transition-colors duration-300">
                                <Eye size={16} />
                                <span>Ver mais detalhes</span>
                              </button>
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
                    title: 'Atualizações em Tempo Real',
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
      <Footer />
    </div>
  );
};

export default ProcessConsultation;