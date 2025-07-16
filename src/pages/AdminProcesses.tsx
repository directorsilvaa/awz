import React, { useEffect, useState } from "react";
import {
  Plus,
  Trash2,
  Search,
  Filter,
  User,
  FileText,
  Clock,
  Edit,
  Download,
  X,
  Upload,
} from "lucide-react";
import axios from "axios";
import SearchableSelect from "../components/SearchableSelect";
import SearchableSelectEmpresas from "../components/SearchbleSelectEmpresas";

interface ReportPDF {
  id: string;
  name: string;
  base64: string;
  dataRelatorio: string;
}

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
  // Novos campos
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
  relatorios?: ReportPDF[];
}

const AdminProcesses: React.FC = () => {
  const [processNumber, setProcessNumber] = useState("");
  const [processTitle, setProcessTitle] = useState("");
  const [processCourt, setProcessCourt] = useState("");
  const [processStatus, setProcessStatus] = useState("Em andamento");
  const [processDescription, setProcessDescription] = useState("");
  const [processType, setProcessType] = useState("");
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedEmpresaId, setSelectedEmpresaId] = useState("");

  const [isPublic, setIsPublic] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [processToDelete, setProcessToDelete] = useState<Process | null>(null);
  const [editingProcess, setEditingProcess] = useState<Process | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedUser, setSelectedUser] = useState("all");

  // Novos campos do formulário
  const [processoPDF, setProcessoPDF] = useState("");
  const [administradorJudicial, setAdministradorJudicial] = useState("");
  const [nomeEmpresa, setNomeEmpresa] = useState("");
  const [decretacaoFalencia, setDecretacaoFalencia] = useState("");
  const [vara, setVara] = useState("");
  const [pedido, setPedido] = useState("");
  const [responsavel, setResponsavel] = useState("");
  const [deferimentoRJ, setDeferimentoRJ] = useState("");
  const [
    informacoesAdministradorJudicial,
    setInformacoesAdministradorJudicial,
  ] = useState("");
  const [faseAtual, setFaseAtual] = useState("");
  const [relatorios, setRelatorios] = useState<ReportPDF[]>([]);
  const [reportName, setReportName] = useState("");
  const [reportDate, setReportDate] = useState("");

  // Mock users data
  // const users = [
  //   { id: "1", name: "João Silva" },
  //   { id: "2", name: "Maria Santos" },
  //   { id: "3", name: "Pedro Oliveira" },
  // ];

  const [error, setError] = useState("");
  const [processes, setProcess] = useState([]);
  const [users, setUsers] = useState([]);
  const [empresas, setEmpresas] = useState([]);
  // Load assemblies from localStorage or API on component mount
  useEffect(() => {
    const loadAssemblies = async () => {
      const savedAssemblies = localStorage?.getItem("processes");

      // If no localStorage data, fetch from API
      try {
        const token = localStorage.getItem("myTokenAuth");

        if (!token) {
          console.error("No authentication token found");
          setProcess([]);
          return;
        }

        const response = await axios.get(
          "http://localhost:8000/api/auth/processos",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const responseUsers = await axios.get(
          "http://localhost:8000/api/auth/users",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const responseEmpresas = await axios.get(
          "http://localhost:8000/api/auth/empresas",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (response?.data?.data) {
          setProcess(response?.data?.data);
          // Save to localStorage for future use
          localStorage.setItem(
            "processes",
            JSON.stringify(response?.data?.data)
          );
        } else {
          setProcess([]);
        }

        if (responseUsers?.data?.data) {
          setUsers(responseUsers?.data?.data);
        } else {
          setUsers([]);
        }
        if (responseEmpresas?.data) {
          setEmpresas(responseEmpresas?.data)
        } else {
          setEmpresas([]);
        }
      } catch (error) {
        console.error("Error fetching assemblies:", error);
        if (error.response?.status === 401) {
          console.error("Authentication failed - token may be invalid");
          // Optionally redirect to login or show auth error
        }
        setProcess([]);
      }
    };

    loadAssemblies();
  }, []);

  const loadUsers = async () => {
    try {
      const token = localStorage.getItem("myTokenAuth");
      if (!token) {
        console.error("No authentication token found");
        return;
      }

      const response = await axios.get(
        "http://localhost:8000/api/auth/processos",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setProcess(response?.data?.data);
      // Save to localStorage for future use
      localStorage.setItem("processes", JSON.stringify(response?.data?.data));
    } catch (error) {
      console.error("Error fetching processes:", error);
    }
  };

  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    isReport: boolean = false
  ) => {
    const file = event.target.files?.[0];
    if (file && file.type === "application/pdf") {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target?.result as string;
        if (isReport) {
          if (reportName && reportDate) {
            const newReport = {
              name: reportName,
              base64: base64,
              dataRelatorio: reportDate,
            };
            setRelatorios([...relatorios, newReport]);
            setReportName("");
            setReportDate("");
          } else {
            alert("Por favor, preencha o nome e a data do relatório");
          }
        } else {
          setProcessoPDF(base64);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removeReport = (reportId: string) => {
    setRelatorios(relatorios.filter((r) => r.id !== reportId));
  };

  const downloadPDF = (base64: string, fileName: string) => {
    const link = document.createElement("a");
    link.href = base64;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleAddProcess = async () => {
    if (processNumber && processTitle && processCourt && selectedUserId) {
      const token = localStorage.getItem("myTokenAuth");

      if (!token) {
        console.error("No authentication token found");
        return;
      }

      const selectedUser = users.find((u) => u._id === selectedUserId);
      const newProcess = {
        // id: Math.random().toString(36).substring(7),
        userId: selectedUserId,
        userName: selectedUserId || "",
        number: processNumber,
        title: processTitle,
        court: processCourt,
        status: processStatus,
        description: processDescription,
        type: processType,
        isPublic,
        createdAt: new Date().toLocaleDateString(),
        lastUpdate: new Date().toLocaleDateString(),
        processoPDF,
        administradorJudicial,
        nomeEmpresa: selectedEmpresaId,
        decretacaoFalencia,
        vara,
        pedido,
        responsavel,
        deferimentoRJ,
        informacoesAdministradorJudicial,
        faseAtual,
        relatorios,
      };

      const response = await axios.post(
        "http://localhost:8000/api/auth/processos",
        newProcess,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response);
      if (response?.data) {
        await loadUsers();
        resetForm();
        setShowAddModal(false);
      }

      // const processes = JSON.parse(localStorage.getItem('processes') || '[]');
      // processes.push(newProcess);
      // localStorage.setItem('processes', JSON.stringify(processes));
    }
  };

  const handleEditProcess = async () => {
    if (
      editingProcess &&
      processNumber &&
      processTitle &&
      processCourt &&
      selectedUserId
    ) {
      const updatedProcess: Process = {
        ...editingProcess,
        userId: selectedUserId,
        userName: selectedUserId,
        number: processNumber,
        title: processTitle,
        court: processCourt,
        status: processStatus,
        description: processDescription,
        type: processType,
        isPublic,
        lastUpdate: new Date().toLocaleDateString(),
        processoPDF,
        administradorJudicial,
        nomeEmpresa,
        decretacaoFalencia,
        vara,
        pedido,
        responsavel,
        deferimentoRJ,
        informacoesAdministradorJudicial,
        faseAtual,
        relatorios,
      };

      const token = localStorage.getItem("myTokenAuth");

      if (!token) {
        console.error("No authentication token found");
        return;
      }

      const response = await axios.put(
        `http://localhost:8000/api/auth/processos/${updatedProcess?._id}`,
        updatedProcess,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response?.data) {
        await loadUsers();
        resetForm();
        setShowEditModal(false);
        setEditingProcess(null);
      }
      // const processes = JSON.parse(localStorage.getItem('processes') || '[]');
      // const updatedProcesses = processes.map((p: Process) =>
      //   p.id === editingProcess.id ? updatedProcess : p
      // );
      // localStorage.setItem('processes', JSON.stringify(updatedProcesses));
    }
  };

  const openEditModal = (process: Process) => {
    setEditingProcess(process);
    setSelectedUserId(process.userId?._id);
    setSelectedEmpresaId(process.nomeEmpresa);
    setProcessNumber(process.number);
    setProcessTitle(process.title);
    setProcessCourt(process.court);
    setProcessStatus(process.status);
    setProcessDescription(process.description);
    setProcessType(process.type);
    setIsPublic(process.isPublic);
    setProcessoPDF(process.processoPDF || "");
    setAdministradorJudicial(process.administradorJudicial || "");
    setNomeEmpresa(process.nomeEmpresa || "");
    setDecretacaoFalencia(process.decretacaoFalencia || "");
    setVara(process.vara || "");
    setPedido(process.pedido || "");
    setResponsavel(process.responsavel || "");
    setDeferimentoRJ(process.deferimentoRJ || "");
    setInformacoesAdministradorJudicial(
      process.informacoesAdministradorJudicial || ""
    );
    setFaseAtual(process.faseAtual || "");
    setRelatorios(process.relatorios || []);
    setShowEditModal(true);
  };

  const resetForm = () => {
    setProcessNumber("");
    setProcessTitle("");
    setProcessCourt("");
    setProcessStatus("Em andamento");
    setProcessDescription("");
    setProcessType("");
    setSelectedUserId("");
    setSelectedEmpresaId("");
    setIsPublic(false);
    setProcessoPDF("");
    setAdministradorJudicial("");
    setNomeEmpresa("");
    setDecretacaoFalencia("");
    setVara("");
    setPedido("");
    setResponsavel("");
    setDeferimentoRJ("");
    setInformacoesAdministradorJudicial("");
    setFaseAtual("");
    setRelatorios([]);
    setReportName("");
    setReportDate("");
  };

  const openDeleteModal = (process: Process) => {
    setProcessToDelete(process);
    setShowDeleteModal(true);
  };

  const handleDeleteProcess = async () => {
    if (processToDelete) {
      const token = localStorage.getItem("myTokenAuth");

      if (!token) {
        console.error("No authentication token found");
        return;
      }
      console.log(processToDelete);
      const response = await axios.delete(
        `http://localhost:8000/api/auth/processos/${processToDelete?._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response?.data) {
        await loadUsers();
        setShowDeleteModal(false);
        setProcessToDelete(null);
      }
      // const processes = JSON.parse(localStorage.getItem('processes') || '[]');
      // const updatedProcesses = processes.filter((p: Process) => p.id !== processToDelete.id);
      // localStorage.setItem('processes', JSON.stringify(updatedProcesses));
    }
  };

  const filteredProcesses = processes?.filter((process) => {
    const matchesSearch =
      process?.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      process?.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      process?.court.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedStatus === "all" || process.status === selectedStatus;
    const matchesUser =
      selectedUser === "all" || process.userId === selectedUser;
    return matchesSearch && matchesStatus && matchesUser;
  });

  return (
    <div className="py-12 px-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Gerenciamento de Processos
          </h1>
          <p className="text-gray-600">
            Cadastre e gerencie os processos por usuário
          </p>
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
          {
            label: "Total de Processos",
            value: processes.length,
            icon: FileText,
            color: "bg-blue-500",
          },
          {
            label: "Em Andamento",
            value: processes.filter((p) => p.status === "em_andamento").length,
            icon: Clock,
            color: "bg-yellow-500",
          },
          {
            label: "Concluídos",
            value: processes.filter((p) => p.status === "Concluído").length,
            icon: FileText,
            color: "bg-green-500",
          },
          {
            label: "Processos Públicos",
            value: processes.filter((p) => p.isPublic).length,
            icon: User,
            color: "bg-purple-500",
          },
        ].map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className={`${stat.color} p-3 rounded-lg text-white mr-4`}>
                <stat.icon size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-2xl font-semibold text-gray-800">
                  {stat.value}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Buscar processos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
          <div className="relative">
            <Filter
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
            >
              <option value="all">Todos os status</option>
              <option value="Em andamento">Em andamento</option>
              <option value="aberto">Aberto</option>
              <option value="em_andamento">Em Andamento</option>
              <option value="suspenso">Suspenso</option>
              <option value="finalizado">Finalizado</option>
              <option value="arquivado">Arquivado</option>
            </select>
          </div>
          <div className="relative">
            <User
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
            >
              <option value="all">Todos os usuários</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Número
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Credor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Título
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tribunal
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tipo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Público
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProcesses.map((process) => (
                <tr key={process.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {process.number}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {process?.userId?.nome}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {process.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {process.court}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        process.status === "em_andamento"
                          ? "bg-blue-100 text-blue-800"
                          : process.status === "Concluído"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {process.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {process.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        process.isPublic
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {process.isPublic ? "Sim" : "Não"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      {process.processoPDF && (
                        <button
                          onClick={() =>
                            downloadPDF(
                              process.processoPDF!,
                              `processo-${process.number}.pdf`
                            )
                          }
                          className="text-blue-600 hover:text-blue-900"
                          title="Baixar PDF"
                        >
                          <Download size={20} />
                        </button>
                      )}
                      <button
                        onClick={() => openEditModal(process)}
                        className="text-indigo-600 hover:text-indigo-900"
                        title="Editar"
                      >
                        <Edit size={20} />
                      </button>
                      <button
                        onClick={() => openDeleteModal(process)}
                        className="text-red-600 hover:text-red-900"
                        title="Excluir"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
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
          <div className="bg-white rounded-lg p-6 w-[800px] max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Novo Processo
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <SearchableSelect
                  users={users}
                  selectedUserId={selectedUserId}
                  setSelectedUserId={setSelectedUserId}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome do Credor
                </label>
                <select
                  value={selectedUserId}
                  disabled
                  onChange={(e) => setSelectedUserId(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  <option value="">Selecione um usuário</option>
                  {users.map((user) => (
                    <option key={user._id} value={user._id}>
                      {user.nome}
                    </option>
                  ))}
                </select>
                {/* <input
                  type="text"
                  value={selectedUserId}
                  onChange={(e) => setSelectedUserId(e.target.value)}
                  placeholder="ID do Usuário"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                /> */}
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
                  <option value="aberto">Aberto</option>
                  <option value="em_andamento">Em Andamento</option>
                  <option value="suspenso">Suspenso</option>
                  <option value="finalizado">Finalizado</option>
                  <option value="arquivado">Arquivado</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo
                </label>
                <select
                  value={processType}
                  onChange={(e) => setProcessType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  <option value="">Selecione o tipo</option>
                  <option value="Recuperação Judicial">
                    Recuperação Judicial
                  </option>
                  <option value="Falência">Falência</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Administrador Judicial
                </label>
                <input
                  type="text"
                  value={administradorJudicial}
                  onChange={(e) => setAdministradorJudicial(e.target.value)}
                  placeholder="Nome do administrador judicial"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
              <div>
                <SearchableSelectEmpresas
                  users={empresas}
                  selectedUserId={selectedEmpresaId}
                  setSelectedUserId={setSelectedEmpresaId}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome da Empresa
                </label>
                <select
                  value={selectedEmpresaId}
                  disabled
                  onChange={(e) => setSelectedEmpresaId(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  <option value="">Pesquise uma empresa</option>
                  {empresas.map((user) => (
                    <option key={user._id} value={user._id}>
                      {user.nome}
                    </option>
                  ))}
                </select>
                {/* <input
                  type="text"
                  value={selectedUserId}
                  onChange={(e) => setSelectedUserId(e.target.value)}
                  placeholder="ID do Usuário"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                /> */}
              </div>
              {/* <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome da Empresa
                </label>
                <input
                  type="text"
                  value={nomeEmpresa}
                  onChange={(e) => setNomeEmpresa(e.target.value)}
                  placeholder="Nome da empresa"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div> */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Decretação Falência
                </label>
                <input
                  type="text"
                  value={decretacaoFalencia}
                  onChange={(e) => setDecretacaoFalencia(e.target.value)}
                  placeholder="Data ou informações da decretação"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vara
                </label>
                <input
                  type="text"
                  value={vara}
                  onChange={(e) => setVara(e.target.value)}
                  placeholder="Vara responsável"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pedido
                </label>
                <input
                  type="text"
                  value={pedido}
                  onChange={(e) => setPedido(e.target.value)}
                  placeholder="Pedido principal"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Responsável
                </label>
                <input
                  type="text"
                  value={responsavel}
                  onChange={(e) => setResponsavel(e.target.value)}
                  placeholder="Responsável pelo processo"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Deferimento RJ
                </label>
                <input
                  type="text"
                  value={deferimentoRJ}
                  onChange={(e) => setDeferimentoRJ(e.target.value)}
                  placeholder="Informações do deferimento"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fase Atual
                </label>
                <input
                  type="text"
                  value={faseAtual}
                  onChange={(e) => setFaseAtual(e.target.value)}
                  placeholder="Fase atual do processo"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Informações do Administrador Judicial
              </label>
              <textarea
                value={informacoesAdministradorJudicial}
                onChange={(e) =>
                  setInformacoesAdministradorJudicial(e.target.value)
                }
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="Informações detalhadas do administrador judicial..."
              />
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

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Processo PDF
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => handleFileUpload(e, false)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
                {processoPDF && (
                  <button
                    type="button"
                    onClick={() =>
                      downloadPDF(processoPDF, `processo-${processNumber}.pdf`)
                    }
                    className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    <Download size={16} />
                  </button>
                )}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Relatórios
              </label>
              <div className="border border-gray-300 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <input
                    type="text"
                    value={reportName}
                    onChange={(e) => setReportName(e.target.value)}
                    placeholder="Nome do relatório"
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                  <input
                    type="date"
                    value={reportDate}
                    onChange={(e) => setReportDate(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => handleFileUpload(e, true)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>

                {relatorios.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-gray-700">
                      Relatórios Adicionados:
                    </h4>
                    {relatorios.map((relatorio) => (
                      <div
                        key={relatorio.id}
                        className="flex items-center justify-between bg-gray-50 p-2 rounded"
                      >
                        <div>
                          <span className="text-sm font-medium">
                            {relatorio.name}
                          </span>
                          <span className="text-sm text-gray-500 ml-2">
                            ({relatorio.dataRelatorio})
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            type="button"
                            onClick={() =>
                              downloadPDF(
                                relatorio.base64,
                                `${relatorio.name}.pdf`
                              )
                            }
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <Download size={16} />
                          </button>
                          <button
                            type="button"
                            onClick={() => removeReport(relatorio.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
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
                disabled={
                  !processNumber ||
                  !processTitle ||
                  !processCourt ||
                  !selectedUserId
                }
                className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary-dark rounded-lg disabled:opacity-50"
              >
                Adicionar Processo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Process Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[800px] max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Editar Processo
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <SearchableSelect
                  users={users}
                  selectedUserId={selectedUserId}
                  setSelectedUserId={setSelectedUserId}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome do Credor
                </label>
                <select
                  value={selectedUserId}
                  disabled
                  onChange={(e) => setSelectedUserId(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  <option value="">Selecione um usuário</option>
                  {users.map((user) => (
                    <option key={user._id} value={user._id}>
                      {user.nome}
                    </option>
                  ))}
                </select>
                {/* <input
                  type="text"
                  value={selectedUserId}
                  onChange={(e) => setSelectedUserId(e.target.value)}
                  placeholder="ID do Usuário"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                /> */}
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
                  <option value="aberto">Aberto</option>
                  <option value="em_andamento">Em Andamento</option>
                  <option value="suspenso">Suspenso</option>
                  <option value="finalizado">Finalizado</option>
                  <option value="arquivado">Arquivado</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo
                </label>
                <select
                  value={processType}
                  onChange={(e) => setProcessType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  <option value="">Selecione o tipo</option>
                  <option value="Recuperação Judicial">
                    Recuperação Judicial
                  </option>
                  <option value="Falência">Falência</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Administrador Judicial
                </label>
                <input
                  type="text"
                  value={administradorJudicial}
                  onChange={(e) => setAdministradorJudicial(e.target.value)}
                  placeholder="Nome do administrador judicial"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
              <div>
                <SearchableSelectEmpresas
                  users={empresas}
                  selectedUserId={selectedEmpresaId}
                  setSelectedUserId={setSelectedEmpresaId}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome da Empresa
                </label>
                <select
                  value={selectedEmpresaId}
                  disabled
                  onChange={(e) => setSelectedEmpresaId(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  <option value="">Pesquise uma empresa</option>
                  {empresas.map((user) => (
                    <option key={user._id} value={user._id}>
                      {user.nome}
                    </option>
                  ))}
                </select>
                {/* <input
                  type="text"
                  value={selectedUserId}
                  onChange={(e) => setSelectedUserId(e.target.value)}
                  placeholder="ID do Usuário"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                /> */}
              </div>
              {/* <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome da Empresa
                </label>
                <input
                  type="text"
                  value={nomeEmpresa}
                  onChange={(e) => setNomeEmpresa(e.target.value)}
                  placeholder="Nome da empresa"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div> */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Decretação Falência
                </label>
                <input
                  type="text"
                  value={decretacaoFalencia}
                  onChange={(e) => setDecretacaoFalencia(e.target.value)}
                  placeholder="Data ou informações da decretação"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vara
                </label>
                <input
                  type="text"
                  value={vara}
                  onChange={(e) => setVara(e.target.value)}
                  placeholder="Vara responsável"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pedido
                </label>
                <input
                  type="text"
                  value={pedido}
                  onChange={(e) => setPedido(e.target.value)}
                  placeholder="Pedido principal"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Responsável
                </label>
                <input
                  type="text"
                  value={responsavel}
                  onChange={(e) => setResponsavel(e.target.value)}
                  placeholder="Responsável pelo processo"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Deferimento RJ
                </label>
                <input
                  type="text"
                  value={deferimentoRJ}
                  onChange={(e) => setDeferimentoRJ(e.target.value)}
                  placeholder="Informações do deferimento"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fase Atual
                </label>
                <input
                  type="text"
                  value={faseAtual}
                  onChange={(e) => setFaseAtual(e.target.value)}
                  placeholder="Fase atual do processo"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Informações do Administrador Judicial
              </label>
              <textarea
                value={informacoesAdministradorJudicial}
                onChange={(e) =>
                  setInformacoesAdministradorJudicial(e.target.value)
                }
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="Informações detalhadas do administrador judicial..."
              />
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

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Processo PDF
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => handleFileUpload(e, false)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
                {processoPDF && (
                  <button
                    type="button"
                    onClick={() =>
                      downloadPDF(processoPDF, `processo-${processNumber}.pdf`)
                    }
                    className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    <Download size={16} />
                  </button>
                )}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Relatórios
              </label>
              <div className="border border-gray-300 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <input
                    type="text"
                    value={reportName}
                    onChange={(e) => setReportName(e.target.value)}
                    placeholder="Nome do relatório"
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                  <input
                    type="date"
                    value={reportDate}
                    onChange={(e) => setReportDate(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => handleFileUpload(e, true)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>

                {relatorios.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-gray-700">
                      Relatórios Adicionados:
                    </h4>
                    {relatorios.map((relatorio) => (
                      <div
                        key={relatorio.id}
                        className="flex items-center justify-between bg-gray-50 p-2 rounded"
                      >
                        <div>
                          <span className="text-sm font-medium">
                            {relatorio.name}
                          </span>
                          <span className="text-sm text-gray-500 ml-2">
                            ({relatorio.dataRelatorio})
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            type="button"
                            onClick={() =>
                              downloadPDF(
                                relatorio.base64,
                                `${relatorio.name}.pdf`
                              )
                            }
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <Download size={16} />
                          </button>
                          <button
                            type="button"
                            onClick={() => removeReport(relatorio.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
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
                  setShowEditModal(false);
                  setEditingProcess(null);
                  resetForm();
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                Cancelar
              </button>
              <button
                onClick={handleEditProcess}
                disabled={
                  !processNumber ||
                  !processTitle ||
                  !processCourt ||
                  !selectedUserId
                }
                className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary-dark rounded-lg disabled:opacity-50"
              >
                Salvar Alterações
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && processToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[500px]">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Confirmar Exclusão
            </h3>
            <p className="text-gray-600 mb-4">
              Deseja realmente excluir o processo?
            </p>
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <p>
                <strong>Número:</strong> {processToDelete.number}
              </p>
              <p>
                <strong>Título:</strong> {processToDelete.title}
              </p>
              <p>
                <strong>Usuário:</strong> {processToDelete.userName}
              </p>
              <p>
                <strong>Tribunal:</strong> {processToDelete.court}
              </p>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setProcessToDelete(null);
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                Cancelar
              </button>
              <button
                onClick={handleDeleteProcess}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg"
              >
                Excluir Processo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProcesses;
