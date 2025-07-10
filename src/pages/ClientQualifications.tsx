import React, { useState } from 'react';
import {
  Upload, FileText, Plus, Trash2, Eye, Download,
  CheckCircle, XCircle, Clock, AlertTriangle, Send,
  ArrowLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface Document {
  id: string;
  name: string;
  type: string;
  uploadDate: string;
  status: 'pending' | 'approved' | 'rejected';
  comments?: string;
  file?: File;
}

interface QualificationRequest {
  id: string;
  processNumber: string;
  creditAmount: number;
  submissionDate: string;
  status: 'draft' | 'submitted' | 'under_review' | 'approved' | 'rejected';
  documents: Document[];
  notes?: string;
  reviewComments?: string;
}

const ClientQualifications: React.FC = () => {
  const [showNewModal, setShowNewModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<QualificationRequest | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // Form states
  const [processNumber, setProcessNumber] = useState('');
  const [creditAmount, setCreditAmount] = useState('');
  const [notes, setNotes] = useState('');
  const [documents, setDocuments] = useState<Document[]>([]);

  // Mock data
  const qualificationRequests: QualificationRequest[] = [
    {
      id: '1',
      processNumber: '1001234-12.2024.8.26.0100',
      creditAmount: 150000,
      submissionDate: '10/03/2024',
      status: 'under_review',
      documents: [
        {
          id: 'DOC001',
          name: 'titulo-executivo.pdf',
          type: 'Título Executivo',
          uploadDate: '10/03/2024',
          status: 'pending'
        },
        {
          id: 'DOC002',
          name: 'comprovante-credito.pdf',
          type: 'Comprovante de Crédito',
          uploadDate: '10/03/2024',
          status: 'pending'
        }
      ],
      notes: 'Solicitação de habilitação de crédito referente a fornecimento de materiais'
    },
    {
      id: '2',
      processNumber: '2001234-12.2024.8.19.0001',
      creditAmount: 85000,
      submissionDate: '05/03/2024',
      status: 'approved',
      documents: [
        {
          id: 'DOC003',
          name: 'contrato-servicos.pdf',
          type: 'Contrato de Serviços',
          uploadDate: '05/03/2024',
          status: 'approved'
        }
      ],
      notes: 'Prestação de serviços de consultoria',
      reviewComments: 'Documentação aprovada. Crédito habilitado com sucesso.'
    }
  ];

  const documentTypes = [
    'Título Executivo',
    'Comprovante de Crédito',
    'Contrato de Fornecimento',
    'Contrato de Serviços',
    'Notas Fiscais',
    'Planilha de Cálculo',
    'Outros'
  ];

  const handleAddDocument = () => {
    const newDoc: Document = {
      id: `DOC${Date.now()}`,
      name: '',
      type: documentTypes[0],
      uploadDate: new Date().toLocaleDateString('pt-BR'),
      status: 'pending'
    };
    setDocuments([...documents, newDoc]);
  };

  const handleRemoveDocument = (docId: string) => {
    setDocuments(documents.filter(doc => doc.id !== docId));
  };

  const handleFileUpload = (docId: string, file: File) => {
    setDocuments(documents.map(doc =>
      doc.id === docId
        ? { ...doc, name: file.name, file }
        : doc
    ));
  };

  const handleDocumentTypeChange = (docId: string, type: string) => {
    setDocuments(documents.map(doc =>
      doc.id === docId
        ? { ...doc, type }
        : doc
    ));
  };

  const handleSubmitRequest = () => {
    if (processNumber && creditAmount && documents.length > 0) {
      const newRequest: QualificationRequest = {
        id: `REQ${Date.now()}`,
        processNumber,
        creditAmount: parseFloat(creditAmount),
        submissionDate: new Date().toLocaleDateString('pt-BR'),
        status: 'submitted',
        documents,
        notes
      };

      console.log('Submitting qualification request:', newRequest);

      // Reset form
      setProcessNumber('');
      setCreditAmount('');
      setNotes('');
      setDocuments([]);
      setShowNewModal(false);
    }
  };

  const handleViewDetails = (request: QualificationRequest) => {
    setSelectedRequest(request);
    setShowDetailsModal(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'submitted':
        return 'bg-blue-100 text-blue-800';
      case 'under_review':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-secondary/20 text-primary';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'draft':
        return 'Rascunho';
      case 'submitted':
        return 'Enviado';
      case 'under_review':
        return 'Em Análise';
      case 'approved':
        return 'Aprovado';
      case 'rejected':
        return 'Rejeitado';
      default:
        return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle size={20} className="text-green-600" />;
      case 'rejected':
        return <XCircle size={20} className="text-red-600" />;
      case 'under_review':
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
              <Link to="/cliente" className="flex items-center text-[16px] font-bold text-gray-400 hover:text-gray-300 transition-colors">
                <ArrowLeft size={20} className="mr-2" /> {/* Ícone de voltar */}
                Voltar
              </Link>
              <div className='mt-4 ml-6'> {/* Adicionado margem à esquerda */}
                <h1 className="text-3xl font-bold text-white">Habilitações de Crédito</h1>
                <p className="text-white/80">Gerencie suas solicitações de habilitação</p>
              </div>
            </div>
            <button
              onClick={() => setShowNewModal(true)}
              className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
            >
              <Plus size={20} className="mr-2" />
              Nova Habilitação
            </button>
          </div>


          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: 'Total de Solicitações', value: qualificationRequests.length, icon: FileText, color: 'bg-white/20' },
              { label: 'Em Análise', value: qualificationRequests.filter(r => r.status === 'under_review').length, icon: Clock, color: 'bg-white/20' },
              { label: 'Aprovadas', value: qualificationRequests.filter(r => r.status === 'approved').length, icon: CheckCircle, color: 'bg-white/20' }
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
        {/* Requests List */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800">Suas Solicitações</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Processo</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Valor do Crédito</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Data</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Documentos</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {qualificationRequests.map((request) => (
                  <tr key={request.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{request.processNumber}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      R$ {request.creditAmount.toLocaleString('pt-BR')}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{request.submissionDate}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(request.status)}
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                          {getStatusLabel(request.status)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {request.documents.length} documento(s)
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end">
                        <button
                          onClick={() => handleViewDetails(request)}
                          className="text-blue-600 hover:text-blue-800"
                          title="Ver detalhes"
                        >
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
      </div>

      {/* New Request Modal */}
      {showNewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[800px] max-h-[80vh] overflow-y-auto">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Nova Habilitação de Crédito</h3>

            <div className="space-y-6">
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

              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Documentos
                  </label>
                  <button
                    onClick={handleAddDocument}
                    className="text-primary hover:text-primary-dark flex items-center text-sm"
                  >
                    <Plus size={16} className="mr-1" />
                    Adicionar Documento
                  </button>
                </div>

                <div className="space-y-3">
                  {documents.map((doc) => (
                    <div key={doc.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Tipo de Documento
                          </label>
                          <select
                            value={doc.type}
                            onChange={(e) => handleDocumentTypeChange(doc.id, e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                          >
                            {documentTypes.map(type => (
                              <option key={type} value={type}>{type}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Arquivo
                          </label>
                          <input
                            type="file"
                            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleFileUpload(doc.id, file);
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                          />
                        </div>
                        <div>
                          <button
                            onClick={() => handleRemoveDocument(doc.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </div>
                      {doc.name && (
                        <p className="text-sm text-gray-600 mt-2">Arquivo: {doc.name}</p>
                      )}
                    </div>
                  ))}
                </div>
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
                  <label className="block text-sm font-medium text-gray-700">Processo</label>
                  <p className="text-gray-900">{selectedRequest.processNumber}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Valor do Crédito</label>
                  <p className="text-gray-900">R$ {selectedRequest.creditAmount.toLocaleString('pt-BR')}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Data de Submissão</label>
                  <p className="text-gray-900">{selectedRequest.submissionDate}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(selectedRequest.status)}
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedRequest.status)}`}>
                      {getStatusLabel(selectedRequest.status)}
                    </span>
                  </div>
                </div>
              </div>

              {selectedRequest.notes && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Observações</label>
                  <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{selectedRequest.notes}</p>
                </div>
              )}

              {selectedRequest.reviewComments && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Comentários da Análise</label>
                  <p className="text-gray-900 bg-blue-50 p-3 rounded-lg border-l-4 border-blue-400">
                    {selectedRequest.reviewComments}
                  </p>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Documentos</label>
                <div className="space-y-3">
                  {selectedRequest.documents.map((doc) => (
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
                  ))}
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