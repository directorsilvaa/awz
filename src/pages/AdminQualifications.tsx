import React, { useEffect, useState } from "react";
import {
  Search,
  Filter,
  Eye,
  Download,
  CheckCircle,
  XCircle,
  Upload,
  FileText,
  User,
  Calendar,
  AlertTriangle,
  Building2,
  Mail,
  Phone,
  Clock,
  Scale,
  MessageSquare,
  Users,
  Trash2,
} from "lucide-react";
import axios from "axios";

interface Qualification {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  userCompany: string;
  submissionDate: string;
  status: "pendente" | "aprovado" | "rejeitado" | "em_analise";
  documents: {
    id: string;
    name: string;
    type: string;
    uploadDate: string;
    status: "pendente" | "aprovado" | "rejeitado";
    fileUrl?: string;
    comments?: string;
  }[];
  creditAmount?: number;
  processNumber?: string;
  notes?: string;
  reviewedBy?: string;
  reviewDate?: string;
  // Novos campos
  oab?: string;
  peticionantes?: string;
  mensagem?: string;
  tipoDocumento:
    | "Habilitacao de Credito"
    | "Impugnação"
    | "Divergencia de credito"
    | "Outros";
}

const AdminQualifications: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedQualification, setSelectedQualification] =
    useState<Qualification | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewAction, setReviewAction] = useState<"aprovado" | "rejeitado">(
    "aprovado"
  );
  const [reviewComments, setReviewComments] = useState("");
  const [habilitacoes, setHabilitacoes] = useState([]);
  // Load assemblies from localStorage or API on component mount
  useEffect(() => {
    const loadAssemblies = async () => {
      const savedAssemblies = localStorage?.getItem("habilitacoes");

      // If no localStorage data, fetch from API
      try {
        const token = localStorage.getItem("myTokenAuth");

        if (!token) {
          console.error("No authentication token found");
          setHabilitacoes([]);
          return;
        }

        const response = await axios.get(
          "http://localhost:8000/api/auth/habilitacoes",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data) {
          setHabilitacoes(response?.data?.data);
          // Save to localStorage for future use
          localStorage.setItem(
            "habilitacoes",
            JSON.stringify(response?.data?.data)
          );
        } else {
          setHabilitacoes([]);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        if (error.response?.status === 401) {
          console.error("Authentication failed - token may be invalid");
          // Optionally redirect to login or show auth error
        }
        setHabilitacoes([]);
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
        "http://localhost:8000/api/auth/habilitacoes",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setHabilitacoes(response?.data?.data);
      // Save to localStorage for future use
      localStorage.setItem(
        "habilitacoes",
        JSON.stringify(response?.data?.data)
      );
    } catch (error) {
      console.error("Error fetching processes:", error);
    }
  };
  const handleViewDetails = (qualification: Qualification) => {
    setSelectedQualification(qualification);
    setShowDetails(true);
  };

  const handleReview = (
    qualification: Qualification,
    action: "aprovado" | "rejeitado"
  ) => {
    setSelectedQualification(qualification);
    setReviewAction(action);
    setReviewComments("");
    setShowReviewModal(true);
  };

  const confirmReview = async () => {
    if (selectedQualification) {
      const token = localStorage.getItem("myTokenAuth");
      const userId = localStorage.getItem("clientId");

      if (!userId) return;
      try {
        const response = await axios.put(
          `http://localhost:8000/api/auth/habilitacoes-status/${selectedQualification?._id}`,
          {
            status: reviewAction,
            id_user_aproveed: userId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (response?.data) {
          await loadUsers();
          setShowReviewModal(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleDelete = async (id: string) => {
    const token = localStorage.getItem("myTokenAuth");
    const userId = localStorage.getItem("clientId");

    if (!userId) return;
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/auth/habilitacoes/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response?.data) {
        await loadUsers();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pendente":
        return "bg-yellow-100 text-yellow-800";
      case "aprovado":
        return "bg-green-100 text-green-800";
      case "rejeitado":
        return "bg-red-100 text-red-800";
      case "em_analise":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pendente":
        return "Pendente";
      case "aprovado":
        return "Aprovado";
      case "rejeitado":
        return "Rejeitado";
      case "em_analise":
        return "Em Análise";
      default:
        return status;
    }
  };
  const downloadPdf = (base64String) => {
    const link = document.createElement("a");
    link.href = base64String; // Define o href como a string Base64
    link.download = "habilitacao.pdf"; // Nome do arquivo que será baixado
    document.body.appendChild(link); // Adiciona o link ao DOM
    link.click(); // Simula o clique no link
    document.body.removeChild(link); // Remove o link do DOM
  };

  const getTipoDocumentoColor = (tipo: string) => {
    switch (tipo) {
      case "habilitacao":
        return "bg-blue-100 text-blue-800";
      case "impugnacao":
        return "bg-red-100 text-red-800";
      case "divergencia":
        return "bg-orange-100 text-orange-800";
      case "Outros":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  const getStatusLabelTypeDocument = (status: string) => {
    switch (status) {
      case "impugnacao":
        return "Impugnação";
      case "habilitacao":
        return "Habilitação de Crédito";
      case "divergencia":
        return "Divergência de Crédito";
      case "aprovado":
        return "Aprovado";
      case "rejeitado":
        return "Rejeitado";
      default:
        return status;
    }
  };
  const filteredQualifications = habilitacoes?.filter((qualification) => {
    const matchesSearch =
      qualification?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      qualification?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      qualification?.processNumber
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      qualification?.oab?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedStatus === "all" || qualification.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="py-12 px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Habilitações de Crédito
        </h1>
        <p className="text-gray-600">
          Gerencie as solicitações de habilitação de crédito
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          {
            label: "Total",
            value: filteredQualifications.length,
            icon: FileText,
            color: "bg-blue-500",
          },
          {
            label: "Pendentes",
            value: filteredQualifications.filter((q) => q.status === "pendente")
              .length,
            icon: Clock,
            color: "bg-yellow-500",
          },
          {
            label: "Aprovadas",
            value: filteredQualifications.filter((q) => q.status === "aprovado")
              .length,
            icon: CheckCircle,
            color: "bg-green-500",
          },
          {
            label: "Rejeitadas",
            value: filteredQualifications.filter(
              (q) => q.status === "rejeitado"
            ).length,
            icon: XCircle,
            color: "bg-red-500",
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Buscar por nome, email, empresa, processo ou OAB..."
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
              <option value="pendente">Pendentes</option>
              <option value="em_analise">Em Análise</option>
              <option value="aprovado">Aprovadas</option>
              <option value="rejeitado">Rejeitadas</option>
            </select>
          </div>
        </div>
      </div>

      {/* Qualifications List */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Solicitante
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Credor
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Tipo
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Processo
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Valor do Crédito
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Data
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Status
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredQualifications.map((qualification) => (
                <tr key={qualification._id} className="hover:bg-gray-50">
                  <td className="px-6 py-0">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {qualification.userId?._id}
                      </div>
                      <div className="text-sm text-gray-500">
                        {qualification?.userId?.nome}
                      </div>
                      {qualification.oab && (
                        <div className="text-sm text-gray-500">
                          OAB: {qualification.oab}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {qualification.userId?.nome}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTipoDocumentoColor(
                        qualification.documentType
                      )}`}
                    >
                      {/* {qualification.documentType} */}
                      {getStatusLabelTypeDocument(qualification?.documentType)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 font-mono">
                    {qualification.processNumber}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {qualification.valueCredit
                      ? `R$ ${qualification.valueCredit.toLocaleString(
                          "pt-BR"
                        )}`
                      : "N/A"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {qualification.createdAt}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                        qualification.status
                      )}`}
                    >
                      {getStatusLabel(qualification.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => handleDelete(qualification?._id)}
                        className="text-red-600 hover:text-red-800"
                        title="Ver detalhes"
                      >
                        <Trash2 size={20} />
                      </button>
                      <button
                        onClick={() => handleViewDetails(qualification)}
                        className="text-blue-600 hover:text-blue-800"
                        title="Ver detalhes"
                      >
                        <Eye size={20} />
                      </button>
                      {qualification.status === "pendente" && (
                        <>
                          <button
                            onClick={() =>
                              handleReview(qualification, "aprovado")
                            }
                            className="text-green-600 hover:text-green-800"
                            title="Aprovar"
                          >
                            <CheckCircle size={20} />
                          </button>
                          <button
                            onClick={() =>
                              handleReview(qualification, "rejeitado")
                            }
                            className="text-red-600 hover:text-red-800"
                            title="Rejeitar"
                          >
                            <XCircle size={20} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details Modal */}
      {showDetails && selectedQualification && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[1000px] max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-800">
                Detalhes da Habilitação - {selectedQualification?.name}
              </h3>
              <button
                onClick={() => setShowDetails(false)}
                className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100"
              >
                ✕
              </button>
            </div>

            {/* Tipo de Documento */}
            <div className="mb-6">
              <div className="flex items-center space-x-3">
                <Scale size={24} className="text-gray-400" />
                <h4 className="text-lg font-semibold text-gray-800">
                  Tipo de Documento
                </h4>
              </div>
              <div className="mt-2">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getTipoDocumentoColor(
                    selectedQualification.documentType
                  )}`}
                >
                  {selectedQualification?.documentType}
                </span>
              </div>
            </div>

            {/* Informações do Solicitante */}
            <div className="mb-6">
              <div className="flex items-center space-x-3 mb-4">
                <User size={24} className="text-gray-400" />
                <h4 className="text-lg font-semibold text-gray-800">
                  Informações do Solicitante
                </h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nome
                    </label>
                    <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">
                      {selectedQualification.name}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">
                      {selectedQualification.email}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Telefone
                    </label>
                    <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">
                      {selectedQualification.phone}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Empresa
                    </label>
                    <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">
                      {selectedQualification?.name_empresa}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      OAB
                    </label>
                    <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">
                      {selectedQualification.oab || "Não informado"}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Número do Processo
                    </label>
                    <p className="text-gray-900 bg-gray-50 p-3 rounded-lg font-mono">
                      {selectedQualification.processNumber}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Valor do Crédito
                    </label>
                    <p className="text-gray-900 bg-gray-50 p-3 rounded-lg font-semibold">
                      {selectedQualification.valueCredit
                        ? `R$ ${selectedQualification.valueCredit.toLocaleString(
                            "pt-BR"
                          )}`
                        : "N/A"}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Data de Submissão
                    </label>
                    <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">
                      {selectedQualification.createdAt}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Peticionantes/Credores */}
            <div className="mb-6">
              <div className="flex items-center space-x-3 mb-4">
                <Users size={24} className="text-gray-400" />
                <h4 className="text-lg font-semibold text-gray-800">
                  Peticionante(s)/Credor(es)
                </h4>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-900">
                  {selectedQualification.peticionantes || "Não informado"}
                </p>
              </div>
            </div>

            {/* Mensagem */}
            <div className="mb-6">
              <div className="flex items-center space-x-3 mb-4">
                <MessageSquare size={24} className="text-gray-400" />
                <h4 className="text-lg font-semibold text-gray-800">
                  Mensagem
                </h4>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-900 whitespace-pre-wrap">
                  {selectedQualification?.message ||
                    "Nenhuma mensagem fornecida"}
                </p>
              </div>
            </div>

            {/* Status e Observações */}
            <div className="mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                      selectedQualification.status
                    )}`}
                  >
                    {getStatusLabel(selectedQualification.status)}
                  </span>
                </div>
                {selectedQualification?.id_user_aproveed && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Revisado por
                    </label>
                    <p className="text-gray-900">
                      {selectedQualification.id_user_aproveed?.nome} em{" "}
                      {selectedQualification.updatedAt}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {selectedQualification?.message && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Observações
                </label>
                <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">
                  {selectedQualification.message}
                </p>
              </div>
            )}

            {/* Documentos */}
            <div className="mb-6">
              <div className="flex items-center space-x-3 mb-4">
                <FileText size={24} className="text-gray-400" />
                <h4 className="text-lg font-semibold text-gray-800">
                  Documento
                </h4>
              </div>
              <div className="space-y-3">
                {Array.isArray(selectedQualification?.documents)
                  ? selectedQualification.documents.map((doc) => (
                      <div
                        key={doc.id}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border"
                      >
                        <div className="flex items-center space-x-3">
                          <FileText size={20} className="text-gray-400" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {doc.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {doc.type} - Enviado em {doc.uploadDate}
                            </p>
                            {doc.comments && (
                              <p className="text-xs text-gray-600 mt-1">
                                Comentários: {doc.comments}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span
                            className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${getStatusColor(
                              doc.status
                            )}`}
                          >
                            {getStatusLabel(doc.status)}
                          </span>
                          <button
                            className="text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-50"
                            title="Baixar documento"
                          >
                            <Download size={16} />
                          </button>
                        </div>
                      </div>
                    ))
                  : selectedQualification?.pdfhabilitacao && (
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
                        <div className="flex items-center space-x-3">
                          <FileText size={20} className="text-gray-400" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              Habilitação PDF
                            </p>
                            <p className="text-xs text-gray-500">
                              Tipo: PDF - Enviado em{" "}
                              {new Date().toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <button
                            className="text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-50"
                            title="Baixar documento"
                            onClick={() =>
                              downloadPdf(selectedQualification.pdfhabilitacao)
                            } // Função para baixar o PDF
                          >
                            <Download size={16} />
                          </button>
                        </div>
                      </div>
                    )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
              <button
                onClick={() => setShowDetails(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Fechar
              </button>
              {selectedQualification.status === "pendente" && (
                <>
                  <button
                    onClick={() =>
                      handleReview(selectedQualification, "rejeitado")
                    }
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
                  >
                    <XCircle size={16} />
                    <span>Rejeitar</span>
                  </button>
                  <button
                    onClick={() =>
                      handleReview(selectedQualification, "aprovado")
                    }
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                  >
                    <CheckCircle size={16} />
                    <span>Aprovar</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Review Modal */}
      {showReviewModal && selectedQualification && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              {reviewAction === "aprovado" ? "Aprovar" : "Rejeitar"} Habilitação
            </h3>
            <p className="text-gray-600 mb-4">
              {selectedQualification?.name} -{" "}
              {selectedQualification?.name_empresa}
            </p>
            {/* <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Comentários
              </label>
              <textarea
                value={reviewComments}
                onChange={(e) => setReviewComments(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                rows={3}
                placeholder="Adicione comentários sobre a decisão..."
              />
            </div> */}
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowReviewModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                Cancelar
              </button>
              <button
                onClick={confirmReview}
                className={`px-4 py-2 text-sm font-medium text-white rounded-lg disabled:opacity-50 ${
                  reviewAction === "approve"
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-red-600 hover:bg-red-700"
                }`}
              >
                Confirmar{" "}
                {reviewAction === "aprovado" ? "Aprovação" : "Rejeição"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminQualifications;
