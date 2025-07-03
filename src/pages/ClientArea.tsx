import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Clock, Send, FileText, AlertCircle, CheckCircle, Eye, EyeOff, Lock, Award, Users, Calendar } from 'lucide-react';
import Footer from '../components/Footer';
import { useNavigate, Link } from 'react-router-dom';

interface Process {
  id: string;
  number: string;
  title: string;
  status: 'Em andamento' | 'Concluído' | 'Pendente';
  lastUpdate: string;
  court: string;
}

const AssemblyTimer: React.FC<{ userId: string }> = ({ userId }) => {
  const [timeLeft, setTimeLeft] = useState<string>('');
  const [assemblyDate, setAssemblyDate] = useState<string>('');

  useEffect(() => {
    const assemblies = JSON.parse(localStorage.getItem('userAssemblies') || '{}');
    const assemblyDateTime = assemblies[userId];
    
    if (!assemblyDateTime) return;

    // Set the formatted date
    const date = new Date(parseInt(assemblyDateTime));
    setAssemblyDate(date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }));

    const updateTimer = () => {
      const now = new Date().getTime();
      const targetTime = parseInt(assemblyDateTime);
      const distance = targetTime - now;

      if (distance < 0) {
        setTimeLeft('Assembleia em andamento');
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [userId]);

  const assemblies = JSON.parse(localStorage.getItem('userAssemblies') || '{}');
  if (!assemblies[userId]) return null;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center">
          <Clock className="text-primary mr-3" size={24} />
          <h3 className="text-lg font-semibold text-gray-800">Próxima Assembleia</h3>
        </div>
        <div className="flex flex-col space-y-2">
          <p className="text-gray-600">Data e hora da assembleia: {assemblyDate}</p>
          <div className="bg-primary/5 rounded-lg p-4">
            <p className="text-sm text-gray-600">Tempo restante:</p>
            <p className="text-2xl font-bold text-primary">{timeLeft}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ClientDashboard: React.FC = () => {
  const navigate = useNavigate();
  
  const processes: Process[] = [
    {
      id: '1',
      number: '0001234-12.2024.8.26.0100',
      title: 'Processo Civil - Indenização',
      status: 'Em andamento',
      lastUpdate: '10/03/2024',
      court: 'TJSP'
    },
    {
      id: '2',
      number: '0004567-34.2024.8.26.0100',
      title: 'Processo Trabalhista',
      status: 'Concluído',
      lastUpdate: '08/03/2024',
      court: 'TRT-2'
    },
    {
      id: '3',
      number: '0007890-56.2024.8.26.0100',
      title: 'Recurso Administrativo',
      status: 'Pendente',
      lastUpdate: '05/03/2024',
      court: 'TJSP'
    }
  ];

  const handleLogout = () => {
    localStorage.removeItem('clientAuthenticated');
    localStorage.removeItem('clientName');
    localStorage.removeItem('clientEmail');
    localStorage.removeItem('clientId');
    navigate('/cliente', { replace: true });
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

  const clientName = localStorage.getItem('clientName') || 'Cliente';
  const clientId = localStorage.getItem('clientId') || '';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Stats */}
      <div className="bg-primary pt-12 pb-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yIDItNCAyLTRzLTItMi00LTJzMCAyLTIgNHMtMi0yLTQtMiAyIDIgMiA0LTIgMi00IDJzMC0yIDAtNCAyIDIgNCAyIDAtMiAyLTQgMiAyIDQgMi0yIDItMiA0IDIgMiA0IDIgMC0yIDAtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-10"></div>
        
        <div className="container mx-auto px-4">
          {/* User Info */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex space-x-4">
              <Link
                to="/cliente/habilitacoes"
                className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
              >
                <Award size={20} className="mr-2" />
                Habilitações
              </Link>
            </div>
            <button
              onClick={handleLogout}
              className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Sair
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: 'Processos Ativos', value: '3', icon: FileText, color: 'bg-white/20' },
              { label: 'Assembleias', value: '2', icon: Users, color: 'bg-white/20' },
              { label: 'Habilitações', value: '1', icon: Award, color: 'bg-white/20' }
            ].map((stat, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
                <div className="flex items-center">
                  <div className={`${stat.color} p-3 rounded-lg mr-4`}>
                    <stat.icon className="text-white" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-white/80">{stat.label}</p>
                    <p className="text-2xl font-semibold text-white">{stat.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-20 pb-12">
        {/* Assembly Timer */}
        <AssemblyTimer userId={clientId} />

        {/* Process List */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800">Seus Processos</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Número do Processo</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Título</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Tribunal</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Última Atualização</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Status</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {processes.map((process) => (
                  <tr key={process.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-primary">{process.number}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{process.title}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {process.court}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{process.lastUpdate}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(process.status)}`}>
                        {process.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end">
                        <button className="text-primary hover:text-primary-dark">
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

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Award className="mr-2 text-primary" size={20} />
              Habilitações de Crédito
            </h3>
            <p className="text-gray-600 mb-4">
              Gerencie suas solicitações de habilitação de crédito nos processos.
            </p>
            <Link
              to="/cliente/habilitacoes"
              className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
            >
              Acessar Habilitações
            </Link>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Calendar className="mr-2 text-primary" size={20} />
              Próximas Assembleias
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-800">Assembleia Geral</p>
                  <p className="text-xs text-gray-500">15/03/2024 14:00</p>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  Agendada
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const ClientArea: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => 
    localStorage.getItem('clientAuthenticated') === 'true'
  );
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple validation
    if (email && password) {
      const userId = Math.random().toString(36).substring(7); // Generate a random ID for demo
      localStorage.setItem('clientAuthenticated', 'true');
      localStorage.setItem('clientEmail', email);
      localStorage.setItem('clientName', email.split('@')[0]); // Use email username
      localStorage.setItem('clientId', userId);
      setIsAuthenticated(true);
    } else {
      setError('Por favor, preencha todos os campos');
    }
  };

  if (isAuthenticated) {
    return <ClientDashboard />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-[120%] bg-gradient-to-b from-primary/5 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">
                <span className="block text-gray-800">Área do</span>
                <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Cliente</span>
              </h1>
              <p className="text-gray-600">
                Acesse sua conta para gerenciar seus processos
              </p>
            </div>

            <div className="bg-white rounded-3xl shadow-lg p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    E-mail
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors pl-12"
                      placeholder="seu@email.com"
                      required
                    />
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    Senha
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors pl-12 pr-12"
                      placeholder="••••••••"
                      required
                    />
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {error && (
                    <p className="mt-2 text-sm text-red-600">{error}</p>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                      Lembrar-me
                    </label>
                  </div>

                  <div className="text-sm">
                    <a href="#" className="font-medium text-primary hover:text-primary-dark">
                      Esqueceu a senha?
                    </a>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary text-white py-3 px-6 rounded-xl font-medium hover:bg-primary-dark transition-colors duration-300"
                >
                  Entrar
                </button>

                <div className="text-center mt-6">
                  <p className="text-sm text-gray-600">
                    Ainda não tem uma conta?{' '}
                    <a href="#" className="font-medium text-primary hover:text-primary-dark">
                      Cadastre-se
                    </a>
                  </p>
                </div>
              </form>
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600">
                Precisa de ajuda? Entre em contato com nosso suporte
              </p>
              <a
                href="tel:+556192698930"
                className="text-primary hover:text-primary-dark transition-colors font-medium text-sm"
              >
                (61) 99269-8930
              </a>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ClientArea;