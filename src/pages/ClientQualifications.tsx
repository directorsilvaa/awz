import React, { useEffect, useState } from "react";
import {
  Upload,
  FileText,
  Plus,
  Trash2,
  Eye,
  Download,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Send,
  ArrowLeft,
  AlertCircle,
  Trash,
} from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";

interface Document {
  id: string;
  name: string;
  type: string;
  uploadDate: string;
  status: "pending" | "approved" | "rejected";
  comments?: string;
  file?: File;
}

interface QualificationRequest {
  id: string;
  processNumber: string;
  creditAmount: number;
  submissionDate: string;
  status: "draft" | "submitted" | "under_review" | "approved" | "rejected";
  documents: Document[];
  notes?: string;
  reviewComments?: string;
}

const ClientQualifications: React.FC = () => {
  const [showNewModal, setShowNewModal] = useState(false);
  const [selectedRequest, setSelectedRequest] =
    useState<QualificationRequest | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [assemblies, setAssemblies] = useState([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    id_cliente: "",
    name_empresa: "",
    userId: "",
    oab: "",
    email: "",
    phone: "",
    processNumber: "",
    valueCredit: "",
    petitioners: "",
    message: "",
    documentType: "",
  });
  // Form states
  const [processNumber, setProcessNumber] = useState("");
  const [creditAmount, setCreditAmount] = useState("");
  const [notes, setNotes] = useState("");
  const [documents, setDocuments] = useState<Document[]>([]);
  const cargo = localStorage.getItem("role");

  useEffect(() => {
    const loadAssemblies = async () => {
      const savedAssemblies = localStorage?.getItem("habilitacoes");
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
          return;
        }

        const response = await axios.get(
          `http://localhost:8000/api/auth/habilitacoes/usuario/${clientId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response?.data?.data) {
          setAssemblies(response?.data?.data);
          // Save to localStorage for future use
          localStorage.setItem(
            "habilitacoes",
            JSON.stringify(response?.data?.data)
          );
        } else {
          setAssemblies([]);
        }
      } catch (error) {
        console.error("Error fetching assemblies:", error);
        if (error.response?.status === 401) {
          console.error("Authentication failed - token may be invalid");
          // Optionally redirect to login or show auth error
        }
        setAssemblies([]);
      }
    };

    loadAssemblies();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const authTokenSorte = localStorage.getItem("myTokenAuth");
      const userId = localStorage.getItem("clientId");

      // Simulate form submission
      const newFormData = {
        ...formData,
        userId: cargo === "advogado" ? formData?.id_cliente : userId,
        peticionantes: formData.petitioners,
        datetime: new Date(),
        pdfhabilitacao: selectedFile,
      };
      setIsSubmitting(false);
      setIsSubmitted(false);
      const response = await axios.post(
        `http://localhost:8000/api/auth/habilitacoes`,
        newFormData,
        {
          headers: {
            Authorization: `Bearer ${authTokenSorte}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response?.data?.success);
      if (response?.data?.success === true) {
        await loadUsers();
        setIsSubmitted(true);
        setFormData({
          name: "",
          id_cliente: "",
          name_empresa: "",
          userId: "",
          oab: "",
          email: "",
          phone: "",
          processNumber: "",
          valueCredit: "",
          petitioners: "",
          message: "",
          documentType: "",
        });
        setSelectedFile(null);
      }
    } catch (error) {
      console.error(error);
    }

    // Reset form after 3 seconds
    // setTimeout(() => {
    //   setIsSubmitted(false);
    //   setFormData({
    //     name: '',
    //     oab: '',
    //     email: '',
    //     phone: '',
    //     processNumber: '',
    //     petitioners: '',
    //     message: '',
    //     documentType: ''
    //   });
    //   setSelectedFile(null);
    // }, 3000);
  };

  const loadUsers = async () => {
    try {
      const token = localStorage.getItem("myTokenAuth");
      const clientId = localStorage.getItem("clientId");

      if (!token) {
        console.error("No authentication token found");
        return;
      }

      const response = await axios.get(
        `http://localhost:8000/api/auth/habilitacoes/usuario/${clientId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setAssemblies(response?.data?.data);
      // Save to localStorage for future use
      localStorage.setItem(
        "habilitacoes",
        JSON.stringify(response?.data?.data)
      );
    } catch (error) {
      console.error("Error fetching processes:", error);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64String = reader.result?.toString().split(",")[1]; // Extrai a parte Base64
        const pdfBase64 = `data:application/pdf;base64,${base64String}`; // Formata a string Base64 com o prefixo

        setSelectedFile(pdfBase64); // Atualiza o estado com a string Base64
      };

      reader.readAsDataURL(file); // Lê o arquivo como uma URL de dados
    }
  };

  const handleViewDetails = (request: QualificationRequest) => {
    setSelectedRequest(request);
    setShowDetailsModal(true);
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
      case "draft":
        return "bg-gray-100 text-gray-800";
      case "submitted":
        return "bg-blue-100 text-blue-800";
      case "under_review":
        return "bg-yellow-100 text-yellow-800";
      case "approved":
        return "bg-secondary/20 text-primary";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
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
  const getStatusLabel = (status: string) => {
    switch (status) {
      case "draft":
        return "Rascunho";
      case "submitted":
        return "Enviado";
      case "em_analise":
        return "Em Análise";
      case "aprovado":
        return "Aprovado";
      case "rejeitado":
        return "Rejeitado";
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
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "aprovado":
        return <CheckCircle size={20} className="text-green-600" />;
      case "rejeitado":
        return <XCircle size={20} className="text-red-600" />;
      case "em_andamento":
        return <Clock size={20} className="text-yellow-600" />;
      default:
        return <FileText size={20} className="text-blue-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-primary pt-12 pb-32 relative overflow-hidden">
        {/* <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yIDItNCAyLTRzLTItMi00LTJzMCAyLTIgNHMtMi0yLTQtMiAyIDIgMiA0LTIgMi00IDJzMC0yIDAtNCAyIDIgNCAyIDAtMiAyLTQgMiAyIDQgMi0yIDItMiA0IDIgMiA0IDIgMC0yIDAtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-10"></div> */}

        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center">
              <Link
                to="/cliente"
                className="flex items-center text-[16px] font-bold text-gray-400 hover:text-gray-300 transition-colors"
              >
                <ArrowLeft size={20} className="mr-2" /> {/* Ícone de voltar */}
                Voltar
              </Link>
              <div className="mt-4 ml-6">
                {" "}
                {/* Adicionado margem à esquerda */}
                <h1 className="text-3xl font-bold text-white">Solicitações</h1>
                <p className="text-white/80">
                  Gerencie suas solicitações de habilitação, divergência ou
                  impugnação.
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowNewModal(true)}
              className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
            >
              <Plus size={20} className="mr-2" />
              Nova Solicitação
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                label: "Total de Solicitações",
                value: assemblies?.length,
                icon: FileText,
                color: "bg-white/20",
              },
              {
                label: "Em Análise",
                value: assemblies?.filter((r) => r.status === "em_analise")
                  .length,
                icon: Clock,
                color: "bg-white/20",
              },
              {
                label: "Aprovadas",
                value: assemblies?.filter((r) => r.status === "aprovado")
                  .length,
                icon: CheckCircle,
                color: "bg-white/20",
              },
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

      <div className="container mx-auto px-4 mt-12 pb-12">
        {/* Requests List */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800">
              Suas Solicitações
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Processo
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Tipo
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Credor
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
                {assemblies?.map((request) => (
                  <tr key={request.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {request.processNumber}
                    </td>
                    <td
                      className={`px-0.2 py-0.5 text-sm text-center items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTipoDocumentoColor(
                        request.documentType
                      )}`}
                    >
                      {getStatusLabelTypeDocument(request?.documentType)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {request?.userId?.nome}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      R$ {request?.valueCredit.toLocaleString("pt-BR")}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {request.createdAt}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(request.status)}
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                            request.status
                          )}`}
                        >
                          {getStatusLabel(request.status)}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex justify-end space-x-4">
                        <button
                          onClick={() => handleViewDetails(request)}
                          className="text-blue-600 hover:text-blue-800"
                          title="Ver detalhes"
                        >
                          <Eye size={20} />
                        </button>
                        <button
                          onClick={() => handleDelete(request?._id)}
                          className="text-red-600 hover:text-red-800"
                          title="Ver detalhes"
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
      </div>

      {/* New Request Modal */}
      {showNewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[800px] max-h-[80vh] overflow-y-auto">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              Nova Solicitação
            </h3>

            {/* <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Número do Processo
                  </label>
                  <input
                    type="text"
                    value={processNumber}
                    onChange={(e) => setProcessNumber(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    placeholder="0000000-00.0000.0.00.0000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Valor do Crédito (R$)
                  </label>
                  <input
                    type="number"
                    value={creditAmount}
                    onChange={(e) => setCreditAmount(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    placeholder="0,00"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Observações
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  rows={3}
                  placeholder="Descreva o motivo da habilitação..."
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowNewModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                Cancelar
              </button>
              <button
                onClick={handleSubmitRequest}
                disabled={!processNumber || !creditAmount || documents.length === 0}
                className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary-dark rounded-lg disabled:opacity-50 flex items-center"
              >
                <Send size={16} className="mr-2" />
                Enviar Solicitação
              </button>
            </div> */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cargo === "advogado" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ID Cliente
                  </label>
                  <input
                    type="text"
                    name="id_cliente"
                    value={formData.id_cliente}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    required
                  />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  OAB
                </label>
                <input
                  type="text"
                  name="oab"
                  value={formData.oab}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome da Empresa
                </label>
                <input
                  type="text"
                  name="name_empresa"
                  value={formData.name_empresa}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Valor do Crédito
                </label>
                <input
                  type="text"
                  name="valueCredit"
                  value={formData.valueCredit}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  E-mail
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Telefone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Selecione o processo relacionado
              </label>
              <input
                type="text"
                name="processNumber"
                value={formData.processNumber}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="Número do processo"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Peticionante(s)/Credor(es)
              </label>
              <textarea
                name="petitioners"
                value={formData.petitioners}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mensagem
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Selecione o tipo de documento
              </label>
              <select
                name="documentType"
                value={formData.documentType}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                required
              >
                <option value="">Selecione...</option>
                <option value="habilitacao">Habilitação de Crédito</option>
                <option value="impugnacao">Impugnação</option>
                <option value="divergencia">Divergência de Crédito</option>
                <option value="outros">Outros</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Escolher arquivo
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                  accept=".pdf,.doc,.docx"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Upload size={48} className="mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600">
                    {selectedFile
                      ? selectedFile.name
                      : "Nenhum arquivo escolhido"}
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Clique para selecionar um arquivo
                  </p>
                </label>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start">
                <AlertCircle
                  size={20}
                  className="text-blue-600 mt-0.5 mr-3 flex-shrink-0"
                />
                <p className="text-sm text-blue-800">
                  Os arquivos não podem ter mais que 3MB cada. Caso necessário,
                  divida em vários arquivos ou utilize o formulário mais de uma
                  vez.
                </p>
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowNewModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                Cancelar
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary-dark rounded-lg disabled:opacity-50 flex items-center"
              >
                <Send size={16} className="mr-2" />
                Enviar Solicitação
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {showDetailsModal && selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[700px] max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-800">
                Detalhes da Habilitação
              </h3>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Credor
                  </label>
                  <p className="text-gray-900">
                    {selectedRequest?.userId?.nome || "S/N"}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Processo
                  </label>
                  <p className="text-gray-900">
                    {selectedRequest.processNumber}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Valor do Crédito
                  </label>
                  <p className="text-gray-900">
                    R$ {selectedRequest?.valueCredit?.toLocaleString("pt-BR")}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Data de Submissão
                  </label>
                  <p className="text-gray-900">{selectedRequest.createdAt}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Status
                  </label>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(selectedRequest.status)}
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                        selectedRequest.status
                      )}`}
                    >
                      {getStatusLabel(selectedRequest.status)}
                    </span>
                  </div>
                </div>
              </div>

              {selectedRequest.notes && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Observações
                  </label>
                  <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">
                    {selectedRequest.notes}
                  </p>
                </div>
              )}

              {selectedRequest.message && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Comentários da Análise
                  </label>
                  <p className="text-gray-900 bg-blue-50 p-3 rounded-lg border-l-4 border-blue-400">
                    {selectedRequest.message}
                  </p>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Documentos
                </label>
                <div className="space-y-3">
                  {/* {selectedRequest.documents.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FileText size={20} className="text-gray-400" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                          <p className="text-xs text-gray-500">{doc.type} - {doc.uploadDate}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getStatusColor(doc.status)}`}>
                          {getStatusLabel(doc.status)}
                        </span>
                        <button className="text-blue-600 hover:text-blue-800">
                          <Download size={16} />
                        </button>
                      </div>
                    </div>
                  ))} */}
                  {Array.isArray(selectedRequest?.documents)
                    ? selectedRequest.documents.map((doc) => (
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
                    : selectedRequest?.pdfhabilitacao && (
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
                                downloadPdf(selectedRequest.pdfhabilitacao)
                              } // Função para baixar o PDF
                            >
                              <Download size={16} />
                            </button>
                          </div>
                        </div>
                      )}
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => setShowDetailsModal(false)}
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

export default ClientQualifications;
