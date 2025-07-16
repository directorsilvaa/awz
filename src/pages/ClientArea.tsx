import React, { useState, useEffect } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  FileText,
  AlertCircle,
  CheckCircle,
  Eye,
  EyeOff,
  Lock,
  Award,
  Users,
  Calendar,
  Download,
  FileSearch,
  Gavel,
  Building2,
  User,
  Filter,
  CreditCard,
  Building,
} from "lucide-react";
import Footer from "../components/Footer";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

interface Process {
  _id: string;
  number: string;
  title: string;
  status: "aberto" | "Concluído" | "Pendente";
  lastUpdate: string;
  court: string;
  userId: string;
  userName: string;
  isPublic: boolean;
  processoPDF: string;
  description: string;
  administradorJudicial: string;
  nomeEmpresa: string;
  decretacaoFalencia: string;
  vara: string;
  pedido: string;
  responsavel: string;
  deferimentoRJ: string;
  informacoesAdministradorJudicial: string;
  faseAtual: string;
  type: string;
}

const AssemblyTimer: React.FC<{ userId: string }> = ({ userId }) => {
  const [timeLeft, setTimeLeft] = useState<string>("");
  const [assemblyDate, setAssemblyDate] = useState<string>("");

  useEffect(() => {
    const assemblies = JSON.parse(
      localStorage.getItem("userAssemblies") || "{}"
    );
    const assemblyDateTime = assemblies[userId];

    if (!assemblyDateTime) return;

    // Set the formatted date
    const date = new Date(parseInt(assemblyDateTime));
    setAssemblyDate(
      date.toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    );

    const updateTimer = () => {
      const now = new Date().getTime();
      const targetTime = parseInt(assemblyDateTime);
      const distance = targetTime - now;

      if (distance < 0) {
        setTimeLeft("Assembleia em andamento");
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [userId]);

  const assemblies = JSON.parse(localStorage.getItem("userAssemblies") || "{}");
  if (!assemblies[userId]) return null;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center">
          <Clock className="text-primary mr-3" size={24} />
          <h3 className="text-lg font-semibold text-gray-800">
            Próxima Assembleia
          </h3>
        </div>
        <div className="flex flex-col space-y-2">
          <p className="text-gray-600">
            Data e hora da assembleia: {assemblyDate}
          </p>
          <div className="bg-primary/5 rounded-lg p-4">
            <p className="text-sm text-gray-600">Tempo restante:</p>
            <p className="text-2xl font-bold text-primary">{timeLeft}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ReportsModal: React.FC<{
  process: Process | null;
  isOpen: boolean;
  onClose: () => void;
}> = ({ process, isOpen, onClose }) => {
  const [selectedMonth, setSelectedMonth] = useState<string>("all");
  const [filteredReports, setFilteredReports] = useState<Report[]>([]);

  const monthOptions = [
    { value: "all", label: "Todos os meses" },
    { value: "01", label: "Janeiro" },
    { value: "02", label: "Fevereiro" },
    { value: "03", label: "Março" },
    { value: "04", label: "Abril" },
    { value: "05", label: "Maio" },
    { value: "06", label: "Junho" },
    { value: "07", label: "Julho" },
    { value: "08", label: "Agosto" },
    { value: "09", label: "Setembro" },
    { value: "10", label: "Outubro" },
    { value: "11", label: "Novembro" },
    { value: "12", label: "Dezembro" },
  ];

  useEffect(() => {
    if (!process?.relatorios) {
      setFilteredReports([]);
      return;
    }

    if (selectedMonth === "all") {
      setFilteredReports(process.relatorios);
    } else {
      const filtered = process.relatorios.filter((report) => {
        const reportDate = new Date(report.createdAt);
        const reportMonth = String(reportDate.getMonth() + 1).padStart(2, "0");
        return reportMonth === selectedMonth;
      });
      setFilteredReports(filtered);
    }
  }, [process, selectedMonth]);

  const handleDownloadReport = (report: Report) => {
    try {
      const link = document.createElement("a");
      link.href = report.base64;
      link.download = report.name || `relatorio-${report._id}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Erro ao baixar relatório:", error);
      alert("Erro ao baixar o relatório");
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (!isOpen || !process) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Relatórios do Processo
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              {process.title} - {process.number}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <div className="flex items-center gap-4">
              <Filter className="text-gray-400" size={20} />
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {monthOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <span className="text-sm text-gray-600">
                {filteredReports.length} relatório(s) encontrado(s)
              </span>
            </div>
          </div>

          <div className="overflow-y-auto max-h-[50vh]">
            {filteredReports.length > 0 ? (
              <div className="space-y-4">
                {filteredReports.map((report) => (
                  <div
                    key={report._id}
                    className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 mb-1">
                          {report.name}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span>Criado em: {formatDate(report.createdAt)}</span>
                          <span>Upload: {formatDate(report.data_upload)}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDownloadReport(report)}
                        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Download className="mr-2" size={16} />
                        Baixar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <FileText className="mx-auto text-gray-400 mb-4" size={48} />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {selectedMonth === "all"
                    ? "Nenhum relatório encontrado"
                    : "Nenhum relatório neste mês"}
                </h3>
                <p className="text-gray-600">
                  {selectedMonth === "all"
                    ? "Este processo ainda não possui relatórios."
                    : 'Tente selecionar um mês diferente ou "Todos os meses".'}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
const ProcessCard: React.FC<{
  process: Process;
  onViewDetails: () => void;
  onDownloadPDF: () => void;
  onViewReports: () => void;
}> = ({ process, onViewDetails, onDownloadPDF, onViewReports }) => {
  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "aberto":
        return "bg-green-100 text-green-800";
      case "em_andamento":
        return "bg-blue-100 text-blue-800";
      case "pendente":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type?.toLowerCase()) {
      case "falência":
        return "bg-red-50 text-red-700 border-red-200";
      case "recuperação judicial":
        return "bg-blue-50 text-blue-700 border-blue-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const hasReports = process.relatorios && process.relatorios.length > 0;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-lg font-semibold text-gray-900 truncate">
                {process.title}
              </h3>
              {process.type && (
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full border ${getTypeColor(
                    process.type
                  )}`}
                >
                  {process.type}
                </span>
              )}
            </div>
            <p className="text-sm text-gray-600 mb-1">
              Processo: {process.number}
            </p>
            <p className="text-sm text-gray-500">
              Última atualização: {process.lastUpdate}
            </p>
            {hasReports && (
              <p className="text-xs text-blue-600 font-medium mt-1">
                {process.relatorios?.length || 0} relatório(s) disponível(is)
              </p>
            )}
          </div>
          <span
            className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(
              process.status
            )}`}
          >
            {process.status}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <User className="mr-2 text-gray-400" size={16} />
            <span className="truncate">{process.court || "Não informado"}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Building2 className="mr-2 text-gray-400" size={16} />
            <span className="truncate">
              Credor: {process.userId?.nome || "Não informado"}
            </span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Gavel className="mr-2 text-gray-400" size={16} />
            <span className="truncate">{process.vara || "Não informado"}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <User className="mr-2 text-gray-400" size={16} />
            <span className="truncate">
              {process.responsavel || "Não informado"}
            </span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="mr-2 text-gray-400" size={16} />
            <span className="truncate">
              {process.faseAtual || "Não informado"}
            </span>
          </div>
        </div>

        {process.description && (
          <div className="mb-4">
            <p className="text-sm text-gray-700 line-clamp-2">
              {process.description}
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onViewDetails}
            className="flex-1 flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <FileSearch className="mr-2" size={16} />
            Ver Detalhes
          </button>

          <button
            onClick={onViewReports}
            disabled={!hasReports}
            className={`flex-1 flex items-center justify-center px-4 py-2 rounded-lg transition-colors duration-200 ${
              hasReports
                ? "bg-purple-600 text-white hover:bg-purple-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            <FileText className="mr-2" size={16} />
            Ver Relatórios
          </button>

          {process.processoPDF && (
            <button
              onClick={onDownloadPDF}
              className="flex-1 flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
            >
              <Download className="mr-2" size={16} />
              Baixar PDF
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const ProcessDetailsModal: React.FC<{
  process: Process | null;
  isOpen: boolean;
  onClose: () => void;
  onDownloadPDF: () => void;
}> = ({ process, isOpen, onClose, onDownloadPDF }) => {
  if (!isOpen || !process) return null;

  const detailItems = [
    { label: "Número do Processo", value: process.number },
    { label: "Título", value: process.title },
    { label: "Status", value: process.status },
    { label: "Tipo", value: process.type },
    { label: "Tribunal", value: process.court },
    { label: "Vara", value: process.vara },
    { label: "Empresa", value: process.nomeEmpresa },
    { label: "Administrador Judicial", value: process.administradorJudicial },
    { label: "Responsável", value: process.responsavel },
    { label: "Fase Atual", value: process.faseAtual },
    { label: "Pedido", value: process.pedido },
    { label: "Decretação Falência", value: process.decretacaoFalencia },
    { label: "Deferimento RJ", value: process.deferimentoRJ },
    { label: "Descrição", value: process.description },
    {
      label: "Informações do Administrador",
      value: process.informacoesAdministradorJudicial,
    },
    { label: "Última Atualização", value: process.lastUpdate },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Detalhes do Processo
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {detailItems.map(
              (item, index) =>
                item.value && (
                  <div key={index} className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">
                      {item.label}
                    </label>
                    <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg">
                      {item.value}
                    </p>
                  </div>
                )
            )}
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
          {process.processoPDF && (
            <button
              onClick={onDownloadPDF}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
            >
              <Download className="mr-2" size={16} />
              Baixar PDF
            </button>
          )}
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
const ClientDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [assemblies, setAssemblies] = useState([]);
  const [process, setProcess] = useState([]);
  const [clientesAdv, setClients] = useState([]);
  const [habilit, setHabilit] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReportsModalOpen, setIsReportsModalOpen] = useState(false);
  const [selectedProcessForReports, setSelectedProcessForReports] =
    useState<Process | null>(null);
  const [selectedProcess, setSelectedProcess] = useState<Process | null>(null);
  const [error, setError] = useState("");
  const cargo = localStorage?.getItem("role");

  // Load assemblies from localStorage or API on component mount
  useEffect(() => {
    const loadAssemblies = async () => {
      const savedAssemblies = localStorage?.getItem("userAssemblies");
      const savedProcess = localStorage?.getItem("process");
      const clientId = localStorage?.getItem("clientId");

      // If localStorage has data, use it
      // setAssemblies(JSON.parse(savedAssemblies));
      // setProcess(JSON.parse(savedProcess));
      // If no localStorage data, fetch from API
      try {
        const token = localStorage.getItem("myTokenAuth");

        if (!token) {
          console.error("No authentication token found");
          setAssemblies([]);
          setProcess([]);
          return;
        }
        let response = {};
        let responseHabilit = {};
        let responseProcess = {};
        let responseClientes = {};
        if (cargo === "advogado") {
          responseHabilit = await axios.get(
            `http://localhost:8000/api/auth/habilitacoes/usuario/${clientId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );

          responseProcess = await axios.get(
            `http://localhost:8000/api/auth/processos/usuario/${clientId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );
          responseClientes = await axios.get(
            `http://localhost:8000/api/auth/users-advg/${clientId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );
          if (responseHabilit?.data?.data) {
            setHabilit(responseHabilit?.data?.data);
          } else {
            setHabilit([]);
          }
          if (responseProcess?.data?.data) {
            setProcess(responseProcess?.data?.data);
          } else {
            setProcess([]);
          }
          if (responseClientes?.data?.data) {
            setClients(responseClientes?.data?.data);
          } else {
            setClients([]);
          }
        } else {
          response = await axios.get(
            `http://localhost:8000/api/auth/assemblies/user/${clientId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );
          responseHabilit = await axios.get(
            `http://localhost:8000/api/auth/habilitacoes/usuario/${clientId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );
          responseProcess = await axios.get(
            `http://localhost:8000/api/auth/processos/usuario/${clientId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );

          if (response?.data?.data) {
            setAssemblies(response?.data?.data);
            setProcess(responseProcess?.data?.data);
            setHabilit(responseHabilit?.data?.data);
            // Save to localStorage for future use
            localStorage.setItem(
              "userAssemblies",
              JSON.stringify(response?.data?.data)
            );
            localStorage.setItem(
              "process",
              JSON.stringify(responseProcess?.data?.data)
            );
          } else {
            setAssemblies([]);
          }
        }
      } catch (error) {
        console.error("Error fetching assemblies:", error);
        if (error.response?.status === 401) {
          console.error("Authentication failed - token may be invalid");
          // Optionally redirect to login or show auth error
        }
        setAssemblies([]);
        setProcess([]);
        setHabilit([]);
      }
    };

    loadAssemblies();
  }, []);

  const handleViewReports = (process: Process) => {
    console.log("Abrindo relatórios para processo:", process.title);
    setSelectedProcessForReports(process);
    setIsReportsModalOpen(true);
  };
  const handleViewDetails = (process: Process) => {
    setSelectedProcess(process);
    setIsModalOpen(true);
  };
  const handleDownloadPDFConvocacao = (
    base64Data: string,
    fileName: string = "processo.pdf"
  ) => {
    try {
      const link = document.createElement("a");
      link.href = base64Data;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Erro ao baixar PDF:", error);
      alert("Erro ao baixar o arquivo PDF");
    }
  };
  const handleDownloadPDF = (
    base64Data: string,
    fileName: string = "processo.pdf"
  ) => {
    try {
      const link = document.createElement("a");
      link.href = base64Data;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Erro ao baixar PDF:", error);
      alert("Erro ao baixar o arquivo PDF");
    }
  };
  const calculateTimeRemaining = (datetime: string) => {
    // Converte a string datetime em um objeto Date
    const targetDate = new Date(datetime).getTime();
    const now = Date.now();
    const diff = targetDate - now;

    if (diff <= 0) return "Encerrado";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (days > 0) return `${days}d ${hours}h ${minutes}m`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  const getStatus = (datetime: number) => {
    return Date.now() >= datetime ? "Encerrado" : "Pendente";
  };

  const handleLogout = () => {
    localStorage.removeItem("clientAuthenticated");
    localStorage.removeItem("clientName");
    localStorage.removeItem("clientEmail");
    localStorage.removeItem("clientId");
    localStorage.clear();
    navigate("/", { replace: true });
  };

  const clientName = localStorage.getItem("clientName") || "Cliente";
  const clientStatus = localStorage.getItem("status");
  const clientId = localStorage.getItem("clientId") || "";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-primary pt-12 pb-32 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div className="flex-column">
              <p className="text-sm text-white/80">
                Bem-vindo(a), {clientName}
              </p>
              {cargo === "cliente" && (
                <p
                  className={`text-sm ${
                    clientStatus === "habilitado"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  Você está{" "}
                  {clientStatus === "habilitado" ? "Habilitado" : "Inabilitado"}
                </p>
              )}
            </div>
            <div className="flex space-x-4 justify-end">
              {" "}
              {/* Agrupando os botões */}
              <button
                onClick={() => {
                  navigate("/");
                }}
                className="cursor-pointer bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Home
              </button>
              <button
                onClick={handleLogout}
                className="cursor-pointer bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Sair
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                label: "Processos",
                value: process?.length || 0,
                icon: FileText,
                color: "bg-white/20",
              },
              ...(cargo !== "advogado"
                ? [
                    {
                      label: "Assembleias",
                      value: assemblies?.length || 0,
                      icon: Users,
                      color: "bg-white/20",
                    },
                  ]
                : []),
              {
                label: "Habilitações",
                value: habilit?.length || 0,
                icon: Award,
                color: "bg-white/20",
              },
              ...(cargo === "advogado"
                ? [
                    {
                      label: "Clientes",
                      value: clientesAdv?.length || 0,
                      icon: Users,
                      color: "bg-white/20",
                    },
                  ]
                : []),
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-lg rounded-xl p-6"
              >
                <div className="flex items-center">
                  <div className={`${stat.color} p-3 rounded-lg mr-4`}>
                    <stat.icon className="text-white" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-white/80">{stat.label}</p>
                    <p className="text-2xl font-semibold text-white">
                      {stat.value}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-20 pb-12">
        <AssemblyTimer userId={clientId} />

        {/* Processos Section */}
        <div className="mb-8 mt-24">
          {process.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {process.map((process) => (
                <ProcessCard
                  key={process._id}
                  process={process}
                  onViewDetails={() => handleViewDetails(process)}
                  onViewReports={() => handleViewReports(process)}
                  onDownloadPDF={() =>
                    handleDownloadPDF(
                      process.processoPDF,
                      `processo-${process.number}.pdf`
                    )
                  }
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm p-8 text-center">
              <FileText className="mx-auto text-gray-400 mb-4" size={48} />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Nenhum processo encontrado
              </h3>
              <p className="text-gray-600">
                Você não possui processos cadastrados no momento.
              </p>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cargo === "advogado" && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Users className="mr-2 text-yellow-600" size={20} />
                Gerenciamento de Clientes
              </h3>
              <p className="text-gray-600 mb-4">Gerencie seus clientes.</p>
              <Link
                to="/cliente/adv"
                className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg transition-colors"
              >
                Gerenciamento de Clientes
              </Link>
            </div>
          )}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Award className="mr-2 text-blue-600" size={20} />
              Habilitações de Crédito
            </h3>
            <p className="text-gray-600 mb-4">
              Gerencie suas solicitações de habilitação de crédito nos
              processos.
            </p>
            <Link
              to="/cliente/habilitacoes"
              className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg transition-colors"
            >
              Acessar Habilitações
            </Link>
          </div>

          {cargo === "cliente" && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Calendar className="mr-2 text-blue-600" size={20} />
                Próximas Assembleias
              </h3>
              <div className="space-y-3">
                {assemblies && assemblies.length > 0 ? (
                  assemblies.slice(0, 3).map((assembly, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          {assembly?.id_user?.nome}
                        </p>
                        <p className="text-xs text-gray-500">
                          {calculateTimeRemaining(assembly?.datetime)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          {getStatus(assembly.datetime)}
                        </span>
                        {assembly?.pdfAta?.base64 && (
                          <button
                            onClick={() =>
                              handleDownloadPDF(
                                assembly.pdfAta.base64,
                                assembly.pdfAta.nome
                              )
                            }
                            className="inline-flex items-center px-2 py-1 text-xs font-medium text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none"
                          >
                            <Download size={12} className="mr-1" />
                            PDF ATA
                          </button>
                        )}
                        {assembly?.pdfConvocacao?.base64 && (
                          <button
                            onClick={() =>
                              handleDownloadPDFConvocacao(
                                assembly.pdfConvocacao.base64,
                                assembly.pdfConvocacao.nome
                              )
                            }
                            className="inline-flex items-center px-2 py-1 text-xs font-medium text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none"
                          >
                            <Download size={12} className="mr-1" />
                            PDF Convocação
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex items-center justify-center p-3 rounded-lg">
                    <Calendar size={20} className="mr-2 text-yellow-600" />
                    <p className="text-gray-500 text-sm">
                      Nenhuma assembleia agendada
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <ProcessDetailsModal
        process={selectedProcess}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onDownloadPDF={() =>
          selectedProcess &&
          handleDownloadPDF(
            selectedProcess.processoPDF,
            `processo-${selectedProcess.number}-detalhes.pdf`
          )
        }
      />
      <ReportsModal
        process={selectedProcessForReports}
        isOpen={isReportsModalOpen}
        onClose={() => setIsReportsModalOpen(false)}
      />
    </div>
  );
};

type UserType = "credor" | "advogado";
const ClientArea: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem("clientAuthenticated") === "true"
  );
  const [showPassword, setShowPassword] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false); // Estado para controle de registro
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [userType, setUserType] = useState<UserType>("credor");

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    }
    return cpf;
  };

  const formatCNPJ = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 14) {
      return numbers.replace(
        /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
        "$1.$2.$3/$4-$5"
      );
    }
    return cnpj;
  };
  const getUserTypeLabel = (type: UserType) => {
    const labels = {
      credor: "Credor",
      advogado: "Advogado",
    };
    return labels[type];
  };
  const resetForm = () => {
    setNome("");
    setCpf("");
    setCnpj("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setError("");
  };

  const handleUserTypeChange = (type: UserType) => {
    setUserType(type);
    resetForm();
  };
  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCPF(e.target.value);
    setCpf(formatted);
  };

  const handleCNPJChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCNPJ(e.target.value);
    setCnpj(formatted);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const dados = isRegistering
      ? {
          nome,
          email,
          senha: password,
          confirmarSenha: confirmPassword,
          userType,
          cpf_cnpj: userType === 'advogado' ? cnpj : cpf,
        }
      : { email, senha: password };

    try {
      const url = isRegistering
        ? "http://localhost:8000/api/auth/register"
        : "http://localhost:8000/api/auth/login";
      const response = await axios.post(url, dados);

      if (response?.data?.data?.token) {
        const userId = response?.data?.data?.user?._id;
        localStorage.setItem("clientAuthenticated", "true");
        localStorage.setItem("role", response?.data?.data?.user?.cargo);
        localStorage.setItem("clientEmail", response?.data?.data?.user?.email);
        localStorage.setItem("clientName", response?.data?.data?.user?.nome);
        localStorage.setItem("clientId", userId);
        localStorage.setItem("status", response?.data?.data?.user?.status);
        localStorage.setItem("myTokenAuth", response?.data?.data?.token);
        setIsAuthenticated(true);
      } else {
        setError("Email ou senha incorretos");
      }
    } catch (error) {
      setError(error?.response?.data?.message || "Erro ao realizar a ação");
    }
  };
  const getUserTypeIcon = (type: UserType) => {
    const icons = {
      credor: CreditCard,
      advogado: Building,
    };
    const Icon = icons[type];
    return <Icon size={20} />;
  };
  if (isAuthenticated) {
    return <ClientDashboard />;
  }

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
            <div className="max-w-md mx-auto">
              <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4">
                  <span className="block text-gray-800">Área do</span>
                  <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    {getUserTypeLabel(userType)}
                  </span>
                </h1>
                <p className="text-gray-600">
                  {isRegistering
                    ? "Crie sua conta"
                    : "Acesse sua conta para gerenciar seus processos"}
                </p>
              </div>

              <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
                {/* Tabs */}
                {isRegistering && (
                  <div className="flex border-b border-gray-200">
                    {(["credor", "advogado"] as UserType[]).map((type) => (
                      <button
                        key={type}
                        onClick={() => handleUserTypeChange(type)}
                        className={`flex-1 flex items-center justify-center space-x-2 py-4 px-6 text-sm font-medium transition-all duration-300 ${
                          userType === type
                            ? "bg-primary text-white border-b-2 border-primary"
                            : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                        }`}
                      >
                        {getUserTypeIcon(type)}
                        <span>{getUserTypeLabel(type)}</span>
                      </button>
                    ))}
                  </div>
                )}

                {/* Formulário */}
                <div className="p-8">
                  <div className="space-y-6">
                    {isRegistering && (
                      <>
                        <div>
                          <label
                            htmlFor="nome"
                            className="block text-sm font-medium text-gray-700 mb-2"
                          >
                            Nome{" "}
                            {userType === "advogado"
                              ? "do Escritório/Advogado"
                              : "Completo"}
                          </label>
                          <input
                            type="text"
                            id="nome"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                            placeholder={
                              userType === "advogado"
                                ? "Nome do Escritório ou Advogado"
                                : "Seu Nome Completo"
                            }
                            required
                          />
                        </div>

                        {userType === "advogado" ? (
                          <div>
                            <label
                              htmlFor="cnpj"
                              className="block text-sm font-medium text-gray-700 mb-2"
                            >
                              CNPJ
                            </label>
                            <input
                              type="text"
                              id="cnpj"
                              value={cnpj}
                              onChange={handleCNPJChange}
                              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                              placeholder="00.000.000/0000-00"
                              maxLength={18}
                              required
                            />
                          </div>
                        ) : (
                          <div>
                            <label
                              htmlFor="cpf"
                              className="block text-sm font-medium text-gray-700 mb-2"
                            >
                              CPF
                            </label>
                            <input
                              type="text"
                              id="cpf"
                              value={cpf}
                              onChange={handleCPFChange}
                              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                              placeholder="000.000.000-00"
                              maxLength={14}
                              required
                            />
                          </div>
                        )}
                      </>
                    )}

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        E-mail {userType === "advogado" ? "Profissional" : ""}
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        placeholder={
                          userType === "advogado"
                            ? "contato@escritorio.com"
                            : "seu@email.com"
                        }
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Senha
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          id="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors pr-12"
                          placeholder="••••••••"
                          required
                          minLength={6}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? (
                            <EyeOff size={20} />
                          ) : (
                            <Eye size={20} />
                          )}
                        </button>
                      </div>
                    </div>

                    {isRegistering && (
                      <div>
                        <label
                          htmlFor="confirmPassword"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Confirmar Senha
                        </label>
                        <input
                          type="password"
                          id="confirmPassword"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                          placeholder="••••••••"
                          required
                          minLength={6}
                        />
                      </div>
                    )}

                    {error && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <p className="text-sm text-red-600">{error}</p>
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="w-full bg-gradient-to-r from-primary to-primary-dark text-white py-3 px-6 rounded-xl font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
                    >
                      {isRegistering ? "Cadastrar" : "Entrar"}
                    </button>

                    <div className="text-center">
                      <p className="text-sm text-gray-600">
                        {isRegistering
                          ? "Já tem uma conta?"
                          : "Ainda não tem uma conta?"}{" "}
                        <button
                          type="button"
                          onClick={() => {
                            setIsRegistering(!isRegistering);
                            setError("");
                          }}
                          className="font-medium text-primary hover:text-primary-dark transition-colors"
                        >
                          {isRegistering ? "Faça login" : "Cadastre-se"}
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </div>
  );
};

export default ClientArea;
