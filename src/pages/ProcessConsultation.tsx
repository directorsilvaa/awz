import React, { useState } from 'react';
import { Search, FileText, AlertCircle, Clock, Scale } from 'lucide-react';
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchPerformed(true);

    // Get all processes from localStorage
    const allProcesses: Process[] = JSON.parse(localStorage.getItem('processes') || '[]');
    
    // Filter public processes that match the search
    const results = allProcesses.filter(process => 
      process.isPublic && process.number.includes(processNumber)
    );

    setSearchResults(results);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Em andamento':
        return 'bg-blue-100 text-blue-800';
      case 'Concluído':
        return 'bg-secondary/20 text-primary';
      case 'Pendente':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
        <section className="pt-32 pb-20 relative overflow-hidden">
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
              <p className="text-xl text-gray-700 leading-relaxed">
                Acompanhe seus processos de forma rápida e segura.
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              <div className="bg-white p-8 rounded-3xl shadow-[0_20px_50px_rgba(46,125,50,0.07)]">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="process" className="block text-sm font-medium text-gray-700 mb-2">
                      Número do Processo
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="process"
                        value={processNumber}
                        onChange={(e) => setProcessNumber(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors pl-12"
                        placeholder="0000000-00.0000.0.00.0000"
                      />
                      <FileText className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-primary text-white py-4 px-6 rounded-xl font-medium hover:bg-primary-dark transition-colors duration-300 flex items-center justify-center space-x-2"
                  >
                    <Search size={20} />
                    <span>Consultar Processo</span>
                  </button>
                </form>

                {searchPerformed && (
                  <div className="mt-8">
                    {searchResults.length > 0 ? (
                      <div className="space-y-6">
                        <h2 className="text-xl font-semibold text-gray-800">Resultados da Pesquisa</h2>
                        {searchResults.map((process) => (
                          <div key={process.id} className="bg-gray-50 rounded-xl p-6 space-y-4">
                            <div className="flex items-center justify-between">
                              <h3 className="text-lg font-medium text-gray-800">{process.title}</h3>
                              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(process.status)}`}>
                                {process.status}
                              </span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm text-gray-500">Número do Processo</p>
                                <p className="text-gray-800">{process.number}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">Tribunal</p>
                                <p className="text-gray-800">{process.court}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">Tipo</p>
                                <p className="text-gray-800">{process.type}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">Última Atualização</p>
                                <p className="text-gray-800">{process.lastUpdate}</p>
                              </div>
                            </div>
                            {process.description && (
                              <div>
                                <p className="text-sm text-gray-500">Descrição</p>
                                <p className="text-gray-800">{process.description}</p>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="mt-8 p-6 bg-orange-50 rounded-xl border border-orange-100">
                        <div className="flex items-start space-x-3">
                          <div className="text-orange-500">
                            <AlertCircle size={24} />
                          </div>
                          <div>
                            <h3 className="font-semibold text-orange-800">Nenhum processo encontrado</h3>
                            <p className="text-orange-700 mt-1">
                              Verifique o número do processo e tente novamente ou entre em contato conosco para mais informações.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="text-primary">
                      <Scale size={24} />
                    </div>
                    <h3 className="font-semibold text-gray-800">Consulta Pública</h3>
                  </div>
                  <p className="text-gray-600">
                    Acesse informações básicas sobre processos públicos de forma rápida e segura.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="text-primary">
                      <Clock size={24} />
                    </div>
                    <h3 className="font-semibold text-gray-800">Atualizações</h3>
                  </div>
                  <p className="text-gray-600">
                    Informações atualizadas regularmente para manter você sempre informado.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="text-primary">
                      <FileText size={24} />
                    </div>
                    <h3 className="font-semibold text-gray-800">Detalhes</h3>
                  </div>
                  <p className="text-gray-600">
                    Visualize detalhes importantes do processo, como status, tipo e tribunal.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default ProcessConsultation;