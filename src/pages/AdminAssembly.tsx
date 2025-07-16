import React, { useState, useEffect } from "react";
import {
  Clock,
  X,
  Upload,
  FileText,
  Trash2,
  Download,
  Edit,
  AlertCircle,
} from "lucide-react";
import { PDFDocument } from "pdf-lib";
const AdminAssembly: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [assemblyToDelete, setAssemblyToDelete] = useState<string | null>(null);
  const [assemblyToEdit, setAssemblyToEdit] = useState<any | null>(null);
  const [assemblyTime, setAssemblyTime] = useState("");
  const [assemblyDate, setAssemblyDate] = useState("");
  const [userId, setUserId] = useState("");
  const [pdfAta, setPdfAta] = useState<File | null>(null);
  const [pdfConvocacao, setPdfConvocao] = useState<File | null>(null);
  const [assemblies, setAssemblies] = useState([]);
  const [error, setError] = useState("");

  // Estados específicos para edição
  const [editAssemblyTime, setEditAssemblyTime] = useState("");
  const [editAssemblyDate, setEditAssemblyDate] = useState("");
  const [editUserId, setEditUserId] = useState("");
  const [editPdfAta, setEditPdfAta] = useState<File | null>(null);
  const [editPdfConvocao, setEditPdfConvocao] = useState<File | null>(null);

  // Load assemblies from localStorage or API on component mount
  useEffect(() => {
    const loadAssemblies = async () => {
      const savedAssemblies = localStorage?.getItem("userAssemblies");

      try {
        const token = localStorage.getItem("myTokenAuth");

        if (!token) {
          console.error("No authentication token found");
          setAssemblies([]);
          return;
        }

        const response = await fetch(
          "http://localhost:8000/api/auth/assemblies",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          if (data?.data) {
            setAssemblies(data.data);
            localStorage.setItem("userAssemblies", JSON.stringify(data.data));
          } else {
            setAssemblies([]);
          }
        } else {
          setAssemblies([]);
        }
      } catch (error) {
        console.error("Error fetching assemblies:", error);
        setAssemblies([]);
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

      const response = await fetch(
        "http://localhost:8000/api/auth/assemblies",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setAssemblies(data?.data || []);
        localStorage.setItem(
          "userAssemblies",
          JSON.stringify(data?.data || [])
        );
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleSetAssembly = async () => {
    if (assemblyDate && assemblyTime && userId) {
      try {
        const dateTime = new Date(`${assemblyDate}T${assemblyTime}`).getTime();
        const createdAt = Date.now();
        const token = localStorage.getItem("myTokenAuth");
        if (!token) {
          console.error("No authentication token found");
          return;
        }

        const newAssembly = {
          id_user: userId,
          datetime: dateTime,
          createdAt,
          pdfAta: {
            nome: pdfAta?.name,
            base64: pdfAta?.data,
            data_upload: createdAt,
          },
          pdfConvocacao: {
            nome: pdfConvocacao?.name,
            base64: pdfConvocacao?.data,
            data_upload: createdAt,
          },
        };

        const response = await fetch(
          "http://localhost:8000/api/auth/assemblies",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newAssembly),
          }
        );

        if (response.ok) {
          await loadUsers();
          setAssemblyDate("");
          setAssemblyTime("");
          setUserId("");
          setPdfAta(null);
          setPdfConvocao(null);
          setIsModalOpen(false);
        }
      } catch (error) {
        setError("Erro ao criar assembleia");
      }
    }
  };

  const handleEditAssembly = (assembly: any) => {
    setAssemblyToEdit(assembly);

    // Converter datetime para formato de input
    const date = new Date(assembly.datetimeRaw);
    const dateStr = date.toISOString().split("T")[0];
    const timeStr = date.toTimeString().split(" ")[0].substring(0, 5);

    setEditAssemblyDate(dateStr);
    setEditAssemblyTime(timeStr);
    setEditUserId(assembly.id_user?._id || "");
    setEditPdfAta(null);
    setEditPdfConvocao(null);
    setIsEditModalOpen(true);
  };

  const handleUpdateAssembly = async () => {
    if (editAssemblyDate && editAssemblyTime && editUserId && assemblyToEdit) {
      try {
        const dateTime = new Date(
          `${editAssemblyDate}T${editAssemblyTime}`
        ).getTime();
        const token = localStorage.getItem("myTokenAuth");
        if (!token) {
          console.error("No authentication token found");
          return;
        }

        const updatedAssembly = {
          id_user: editUserId,
          datetime: dateTime,
          ...(editPdfAta && {
            pdfAta: {
              nome: editPdfAta.name,
              base64: editPdfAta.data,
              data_upload: Date.now(),
            },
          }),
          ...(editPdfConvocao && {
            pdfAta: {
              nome: editPdfConvocao.name,
              base64: editPdfConvocao.data,
              data_upload: Date.now(),
            },
          }),
        };

        const response = await fetch(
          `http://localhost:8000/api/auth/assemblies/${assemblyToEdit._id}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedAssembly),
          }
        );

        if (response.ok) {
          await loadUsers();
          setEditAssemblyDate("");
          setEditAssemblyTime("");
          setEditUserId("");
          setEditPdfAta(null);
          setAssemblyToEdit(null);
          setIsEditModalOpen(false);
        }
      } catch (error) {
        setError("Erro ao atualizar assembleia");
      }
    }
  };

  const handleDeleteAssembly = (assembly: any) => {
    setAssemblyToDelete(assembly);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (assemblyToDelete) {
      try {
        const token = localStorage.getItem("myTokenAuth");
        if (!token) {
          console.error("No authentication token found");
          return;
        }

        const response = await fetch(
          `http://localhost:8000/api/auth/assemblies/${assemblyToDelete?._id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          await loadUsers();
          setIsDeleteModalOpen(false);
          setAssemblyToDelete(null);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };
  const compressPdf = async (file: File) => {
    const existingPdfBytes = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    // Aqui você pode adicionar lógica para otimizar/comprimir o PDF.
    // Um exemplo simples é salvar novamente o PDF, o que pode reduzir o tamanho.
    const compressedPdfBytes = await pdfDoc.save();

    return new Blob([compressedPdfBytes], { type: "application/pdf" });
  };
  const handleDownloadPdf = (assembly: any) => {
    console.log(assembly);

    if (assembly.pdfAta?.base64) {
      const base64Data = assembly.pdfAta?.base64.split(",")[1];
      const byteCharacters = atob(base64Data);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = assembly.pdfAta?.nome;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
    if (assembly.pdfConvocacao?.base64) {
      const base64Data = assembly.pdfConvocacao.base64.split(",")[1];
      const padding = "=".repeat((4 - (base64Data.length % 4)) % 4);
      const validBase64Data = base64Data + padding;

      try {
        const byteCharacters = atob(validBase64Data);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = assembly.pdfAta?.nome || "download.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      } catch (error) {
        console.error("Error decoding Base64: ", error);
      }
    }
  };

  const handleFileUploadConvo = async (
    e: React.ChangeEvent<HTMLInputElement>,
    isEdit: boolean = false
  ) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      const compressedFile = await compressPdf(file);
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64data = reader.result;
        const fileData = {
          name: file.name,
          size: compressedFile.size,
          type: compressedFile.type,
          data: base64data,
        };

        if (isEdit) {
          setEditPdfConvocao(fileData);
        } else {
          setPdfConvocao(fileData);
        }
      };

      reader.readAsDataURL(compressedFile);
    } else {
      alert("Por favor, selecione apenas arquivos PDF");
    }
  };

  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    isEdit: boolean = false
  ) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      const compressedFile = await compressPdf(file);
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64data = reader.result;
        const fileData = {
          name: file.name,
          size: compressedFile.size,
          type: compressedFile.type,
          data: base64data,
        };

        if (isEdit) {
          setEditPdfAta(fileData);
        } else {
          setPdfAta(fileData);
        }
      };

      reader.readAsDataURL(compressedFile);
    } else {
      alert("Por favor, selecione apenas arquivos PDF");
    }
  };

  const calculateTimeRemaining = (datetime: string) => {
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

  const getStatusColor = (datetime: number) => {
    return Date.now() >= datetime
      ? "bg-red-100 text-red-800"
      : "bg-yellow-100 text-yellow-800";
  };

  const assemblyList = (assemblies ? Object.entries(assemblies) : []).map(
    ([userId, assembly]: [string, any]) => ({
      userId,
      _id: assembly._id,
      id_user: assembly.id_user,
      datetime: new Date(assembly.datetime).toLocaleString("pt-BR"),
      datetimeRaw: assembly.datetime,
      createdAt: assembly.createdAt,
      pdfAta: assembly.pdfAta,
      pdfConvocacao: assembly.pdfConvocacao,
      timeRemaining: calculateTimeRemaining(assembly.datetime),
      status: getStatus(assembly.datetime),
    })
  );

  return (
    <div className="py-12 px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Configuração de Assembleias
        </h1>
        <p className="text-gray-600">
          Gerencie as assembleias individuais dos usuários
        </p>
      </div>

      {/* Button to open modal */}
      <div className="mb-8">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary transition-colors flex items-center gap-2"
        >
          <Clock size={20} />
          Nova Assembleia
        </button>
      </div>

      {/* Create Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                Nova Assembleia
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ID do Usuário
                </label>
                <input
                  type="text"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  placeholder="Digite o ID do usuário"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Data da Assembleia
                </label>
                <input
                  type="date"
                  value={assemblyDate}
                  onChange={(e) => setAssemblyDate(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Horário
                </label>
                <input
                  type="time"
                  value={assemblyTime}
                  onChange={(e) => setAssemblyTime(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  PDF Convocação
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => handleFileUploadConvo(e, false)}
                    className="hidden"
                    id="pdf-upload"
                    disabled={false} // Bloqueia o upload se a assembleia estiver encerrada
                  />
                  <label
                    htmlFor="pdf-upload"
                    className={`w-full flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 ${
                      false ? "cursor-not-allowed opacity-50" : ""
                    }`}
                  >
                    <Upload size={16} />
                    {pdfConvocacao
                      ? pdfConvocacao.name
                      : "Selecionar PDF Convocação"}
                  </label>
                </div>
                {pdfConvocacao && (
                  <div className="mt-2 text-sm text-gray-600 flex items-center gap-1">
                    <FileText size={14} />
                    {pdfConvocacao.name} (
                    {(pdfConvocacao.size / 1024).toFixed(1)} KB)
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  PDF ATA
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => handleFileUpload(e, false)}
                    className="hidden"
                    id="pdf-upload"
                    disabled={true} // Bloqueia o upload se a assembleia estiver encerrada
                  />
                  <label
                    htmlFor="pdf-upload"
                    className={`w-full flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 ${
                      true ? "cursor-not-allowed opacity-50" : ""
                    }`}
                  >
                    <Upload size={16} />
                    {pdfAta ? pdfAta.name : "Selecionar PDF ATA"}
                  </label>
                </div>
                {pdfAta && (
                  <div className="mt-2 text-sm text-gray-600 flex items-center gap-1">
                    <FileText size={14} />
                    {pdfAta.name} ({(pdfAta.size / 1024).toFixed(1)} KB)
                  </div>
                )}
                {/* {isAssemblyClosed && ( // Exibe o aviso se a assembleia estiver encerrada */}
                <span className="flex items-center mt-2 text-sm text-yellow-800 bg-yellow-100 border border-yellow-300 rounded-lg p-2">
                  <AlertCircle size={16} className="mr-2" />
                  Só é possível adicionar uma ATA após a assembleia encerrada.
                </span>
                {/* )} */}
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleSetAssembly}
                disabled={!userId || !assemblyDate || !assemblyTime}
                className="flex-1 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Definir Assembleia
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && assemblyToEdit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                Editar Assembleia
              </h2>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ID do Usuário
                </label>
                <input
                  type="text"
                  value={editUserId}
                  onChange={(e) => setEditUserId(e.target.value)}
                  placeholder="Digite o ID do usuário"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Data da Assembleia
                </label>
                <input
                  type="date"
                  value={editAssemblyDate}
                  onChange={(e) => setEditAssemblyDate(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Horário
                </label>
                <input
                  type="time"
                  value={editAssemblyTime}
                  onChange={(e) => setEditAssemblyTime(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  PDF ATA
                </label>
                {assemblyToEdit.pdfAta && (
                  <div className="mb-2 text-sm text-gray-600 flex items-center gap-1">
                    <FileText size={14} />
                    Arquivo atual: {assemblyToEdit.pdfAta.nome}
                  </div>
                )}
                <div className="relative">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => handleFileUpload(e, true)}
                    className="hidden"
                    id="edit-pdf-upload"
                  />
                  <label
                    htmlFor="edit-pdf-upload"
                    className="w-full flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  >
                    <Upload size={16} />
                    {editPdfAta
                      ? editPdfAta.name
                      : "Substituir PDF ATA (opcional)"}
                  </label>
                </div>
                {editPdfAta && (
                  <div className="mt-2 text-sm text-gray-600 flex items-center gap-1">
                    <FileText size={14} />
                    Novo arquivo: {editPdfAta.name} (
                    {(editPdfAta.size / 1024).toFixed(1)} KB)
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleUpdateAssembly}
                disabled={!editUserId || !editAssemblyDate || !editAssemblyTime}
                className="flex-1 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Atualizar Assembleia
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && assemblyToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                Confirmar Exclusão
              </h2>
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            <div className="mb-6">
              <p className="text-gray-600 mb-4">
                Deseja realmente excluir esta assembleia?
              </p>

              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <div>
                  <span className="font-medium text-gray-700">Usuário:</span>
                  <span className="ml-2 text-gray-600">
                    {assemblyToDelete?.id_user?.nome}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">
                    Data e Hora:
                  </span>
                  <span className="ml-2 text-gray-600">
                    {assemblyToDelete
                      ? new Date(assemblyToDelete?.datetime).toLocaleString(
                          "pt-BR"
                        )
                      : "N/A"}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Status:</span>
                  <span className="ml-2 text-gray-600">
                    {assemblyToDelete
                      ? getStatus(assemblyToDelete.datetimeRaw)
                      : "N/A"}
                  </span>
                </div>
                {assemblyToDelete?.pdfAta && (
                  <div>
                    <span className="font-medium text-gray-700">PDF ATA:</span>
                    <span className="ml-2 text-gray-600">
                      {assemblyToDelete?.pdfAta?.nome}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Assemblies List */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Assembleias Agendadas
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID do Usuário
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data e Hora
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tempo Restante
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  PDF Convocação
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  PDF ATA
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {assemblyList?.map((assembly) => (
                <tr key={assembly._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {assembly.id_user?.nome}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {assembly.datetime}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      {assembly.timeRemaining}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                        assembly.datetimeRaw
                      )}`}
                    >
                      {assembly.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {assembly.pdfConvocacao ? (
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 text-blue-600">
                          <FileText size={14} />
                          <span className="truncate max-w-32">
                            {assembly.pdfConvocacao.nome}
                          </span>
                        </div>
                        <button
                          onClick={() => handleDownloadPdf(assembly)}
                          className="text-blue-600 hover:text-blue-800 transition-colors p-1"
                          title="Baixar PDF ATA"
                        >
                          <Download size={14} />
                        </button>
                      </div>
                    ) : (
                      <span className="text-gray-400">Nenhum arquivo</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {assembly.pdfAta?.base64 ? (
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 text-blue-600">
                          <FileText size={14} />
                          <span className="truncate max-w-32">
                            {assembly.pdfAta.nome}
                          </span>
                        </div>
                        <button
                          onClick={() => handleDownloadPdf(assembly)}
                          className="text-blue-600 hover:text-blue-800 transition-colors p-1"
                          title="Baixar PDF ATA"
                        >
                          <Download size={14} />
                        </button>
                      </div>
                    ) : (
                      <span className="text-gray-400">Nenhum arquivo</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center gap-2">
                      {assembly.status === "Encerrado" && (
                        <button
                          onClick={() => handleEditAssembly(assembly)}
                          className="text-blue-600 hover:text-blue-800 transition-colors p-1"
                          title="Editar assembleia"
                        >
                          <Edit size={16} />
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteAssembly(assembly)}
                        className="text-red-600 hover:text-red-800 transition-colors p-1"
                        title="Excluir assembleia"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {assemblyList.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    Nenhuma assembleia agendada
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminAssembly;
