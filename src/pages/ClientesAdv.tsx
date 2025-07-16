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

const ClientesAdv: React.FC = () => {
  const [showNewModal, setShowNewModal] = useState(false);
  const [selectedRequest, setSelectedRequest] =
    useState<QualificationRequest | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [assemblies, setAssemblies] = useState([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
    cpf: "",
  });
  // Form states
  const [processNumber, setProcessNumber] = useState("");
  const [creditAmount, setCreditAmount] = useState("");
  const [notes, setNotes] = useState("");
  const [documents, setDocuments] = useState<Document[]>([]);

  useEffect(() => {
    const loadAssemblies = async () => {
      const savedAssemblies = localStorage?.getItem("usuarios");
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
          `http://localhost:8000/api/auth/users-advg/${clientId}`,
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
            "usuarios",
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
        cpf_cnpj: formData?.cpf,
        userType: "credor",
        userIdAdv: userId,
      };

      setIsSubmitting(false);
      setIsSubmitted(false);
      const response = await axios.post(
        `http://localhost:8000/api/auth/register`,
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
        setFormData({});
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
        `http://localhost:8000/api/auth/users-advg/${clientId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setAssemblies(response?.data?.data);
      // Save to localStorage for future use
      localStorage.setItem("usuarios", JSON.stringify(response?.data?.data));
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
  // const handleRemoveDocument = (docId: string) => {
  //   setDocuments(documents.filter(doc => doc.id !== docId));
  // };

  // const handleFileUpload = (docId: string, file: File) => {
  //   setDocuments(documents.map(doc =>
  //     doc.id === docId
  //       ? { ...doc, name: file.name, file }
  //       : doc
  //   ));
  // };

  // const handleDocumentTypeChange = (docId: string, type: string) => {
  //   setDocuments(documents.map(doc =>
  //     doc.id === docId
  //       ? { ...doc, type }
  //       : doc
  //   ));
  // };

  // const handleSubmitRequest = () => {
  //   if (processNumber && creditAmount && documents.length > 0) {
  //     const newRequest: QualificationRequest = {
  //       id: `REQ${Date.now()}`,
  //       processNumber,
  //       creditAmount: parseFloat(creditAmount),
  //       submissionDate: new Date().toLocaleDateString('pt-BR'),
  //       status: 'submitted',
  //       documents,
  //       notes
  //     };

  //     console.log('Submitting qualification request:', newRequest);

  //     // Reset form
  //     setProcessNumber('');
  //     setCreditAmount('');
  //     setNotes('');
  //     setDocuments([]);
  //     setShowNewModal(false);
  //   }
  // };

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
        `http://localhost:8000/api/auth/users/${id}`,
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
      case "habilitado":
        return <CheckCircle size={20} className="text-green-600" />;
      case "inabilitado":
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
                <h1 className="text-3xl font-bold text-white">
                  Gerenciamento de Clientes
                </h1>
                <p className="text-white/80">Gerencie seus clientes</p>
              </div>
            </div>
            <button
              onClick={() => setShowNewModal(true)}
              className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
            >
              <Plus size={20} className="mr-2" />
              Novo Cliente
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                label: "Total de Clientes",
                value: assemblies?.length,
                icon: FileText,
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
              Seus Clientes
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    ID cliente
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Nome do Cliente
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    CPF
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {assemblies?.map((request) => (
                  <tr key={request._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {request?._id}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {request.nome}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {request?.cpf_cnpj}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {request.email}
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
              Novo Cliente
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome do Cliente
                </label>
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CPF
                </label>
                <input
                  type="text"
                  name="cpf"
                  value={formData.cpf}
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
                  Senha
                </label>
                <input
                  type="password"
                  name="senha"
                  value={formData.senha}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirmar Senha
                </label>
                <input
                  type="password"
                  name="confirmarSenha"
                  value={formData.confirmarSenha}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  required
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
                onClick={handleSubmit}
                className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary-dark rounded-lg disabled:opacity-50 flex items-center"
              >
                <Send size={16} className="mr-2" />
                Criar Cliente
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

export default ClientesAdv;
