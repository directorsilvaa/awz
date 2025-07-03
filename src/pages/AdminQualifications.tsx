import React, { useState } from 'react';
import { 
  Search, Filter, Eye, Download, CheckCircle, XCircle, 
  Upload, FileText, User, Calendar, AlertTriangle,
  Building2, Mail, Phone, Clock
} from 'lucide-react';

interface Qualification {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  userCompany: string;
  submissionDate: string;
  status: 'pending' | 'approved' | 'rejected' | 'under_review';
  documents: {
    id: string;
    name: string;
    type: string;
    uploadDate: string;
    status: 'pending' | 'approved' | 'rejected';
    fileUrl?: string;
    comments?: string;
  }[];
  creditAmount?: number;
  processNumber?: string;
  notes?: string;
  reviewedBy?: string;
  reviewDate?: string;
}

const AdminQualifications: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedQualification, setSelectedQualification] = useState<Qualification | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewAction, setReviewAction] = useState<'approve' | 'reject'>('approve');
  const [reviewComments, setReviewComments] = useState('');

  // Mock data
  const qualifications: Qualification[] = [
    {
      id: '1',
      userId: 'USR001',
      userName: 'João Silva',
      userEmail: 'joao.silva@email.com',
      userPhone: '(11) 98765-4321',
      userCompany: 'Empresa ABC Ltda',
      submissionDate: '10/03/2024',
      status: 'pending',
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
      creditAmount: 150000,
      processNumber: '1001234-12.2024.8.26.0100',
      notes: 'Solicitação de habilitação de crédito para processo de recuperação judicial'
    },
    {
      id: '2',
      userId: 'USR002',
      userName: 'Maria Santos',
      userEmail: 'maria.santos@email.com',
      userPhone: '(11) 98765-4322',
      userCompany: 'Fornecedora XYZ',
      submissionDate: '08/03/2024',
      status: 'approved',
      documents: [
        {
          id: 'DOC003',
          name: 'contrato-fornecimento.pdf',
          type: 'Contrato de Fornecimento',
          uploadDate: '08/03/2024',
          status: 'approved'
        },
        {
          id: 'DOC004',
          name: 'notas-fiscais.pdf',
          type: 'Notas Fiscais',
          uploadDate: '08/03/2024',
          status: 'approved'
        }
      ],
      creditAmount: 85000,
      processNumber: '1001234-12.2024.8.26.0100',
      reviewedBy: 'Admin João',
      reviewDate: '09/03/2024'
    }
  ];

  const handleViewDetails = (qualification: Qualification) => {
    setSelectedQualification(qualification);
    setShowDetails(true);
  };

  const handleReview = (qualification: Qualification, action: 'approve' | 'reject') => {
    setSelectedQualification(qualification);
    setReviewAction(action);
    setReviewComments('');
    setShowReviewModal(true);
  };

  const confirmReview = () => {
    if (selectedQualification && reviewComments) {
      console.log(`${reviewAction} qualification ${selectedQualification.id} with comments: ${reviewComments}`);
      setShowReviewModal(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-secondary/20 text-primary';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'under_review':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Pendente';
      case 'approved':
        return 'Aprovado';
      case 'rejected':
        return 'Rejeitado';
      case 'under_review':
        return 'Em Análise';
      default:
        return status;
    }
  };

  const filteredQualifications = qualifications.filter(qualification => {
    const matchesSearch = 
      qualification.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      qualification.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      qualification.userCompany.toLowerCase().includes(searchTerm.toLowerCase()) ||
      qualification.processNumber?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || qualification.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="py-12 px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Habilitações de Crédito</h1>
        <p className="text-gray-600">Gerencie as solicitações de habilitação de crédito</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Total', value: qualifications.length, icon: FileText, color: 'bg-blue-500' },
          { label: 'Pendentes', value: qualifications.filter(q => q.status === 'pending').length, icon: Clock, color: 'bg-yellow-500' },
          { label: 'Aprovadas', value: qualifications.filter(q => q.status === 'approved').length, icon: CheckCircle, color: 'bg-green-500' },
          { label: 'Rejeitadas', value: qualifications.filter(q => q.status === 'rejected').length, icon: XCircle, color: 'bg-red-500' }
        ].map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className={`${stat.color} p-3 rounded-lg text-white mr-4`}>
                <stat.icon size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-2xl font-semibold text-gray-800">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Buscar por nome, email, empresa ou processo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
            >
              <option value="all">Todos os status</option>
              <option value="pending">Pendentes</option>
              <option value="under_review">Em Análise</option>
              <option value="approved">Aprovadas</option>
              <option value="rejected">Rejeitadas</option>
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
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Solicitante</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Empresa</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Processo</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Valor do Crédito</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Data</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Status</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredQualifications.map((qualification) => (
                <tr key={qualification.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{qualification.userName}</div>
                      <div className="text-sm text-gray-500">{qualification.userEmail}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{qualification.userCompany}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{qualification.processNumber}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {qualification.creditAmount ? 
                      `R$ ${qualification.creditAmount.toLocaleString('pt-BR')}` : 
                      'N/A'
                    }
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{qualification.submissionDate}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(qualification.status)}`}>
                      {getStatusLabel(qualification.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => handleViewDetails(qualification)}
                        className="text-blue-600 hover:text-blue-800"
                        title="Ver detalhes"
                      >
                        <Eye size={20} />
                      </button>
                      {qualification.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleReview(qualification, 'approve')}
                            className="text-green-600 hover:text-green-800"
                            title="Aprovar"
                          >
                            <CheckCircle size={20} />
                          </button>
                          <button
                            onClick={() => handleReview(qualification, 'reject')}
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
          <div className="bg-white rounded-lg p-6 w-[800px] max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-800">
                Detalhes da Habilitação - {selectedQualification.userName}
              </h3>
              <button
                onClick={() => setShowDetails(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nome</label>
                  <p className="text-gray-900">{selectedQualification.userName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <p className="text-gray-900">{selectedQualification.userEmail}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Telefone</label>
                  <p className="text-gray-900">{selectedQualification.userPhone}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Empresa</label>
                  <p className="text-gray-900">{selectedQualification.userCompany}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Número do Processo</label>
                  <p className="text-gray-900">{selectedQualification.processNumber}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Valor do Crédito</label>
                  <p className="text-gray-900">
                    {selectedQualification.creditAmount ? 
                      `R$ ${selectedQualification.creditAmount.toLocaleString('pt-BR')}` : 
                      'N/A'
                    }
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Data de Submissão</label>
                  <p className="text-gray-900">{selectedQualification.submissionDate}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedQualification.status)}`}>
                    {getStatusLabel(selectedQualification.status)}
                  </span>
                </div>
              </div>
            </div>

            {selectedQualification.notes && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Observações</label>
                <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{selectedQualification.notes}</p>
              </div>
            )}

            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Documentos</h4>
              <div className="space-y-3">
                {selectedQualification.documents.map((doc) => (
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

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDetails(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              >
                Fechar
              </button>
              {selectedQualification.status === 'pending' && (
                <>
                  <button
                    onClick={() => handleReview(selectedQualification, 'reject')}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    Rejeitar
                  </button>
                  <button
                    onClick={() => handleReview(selectedQualification, 'approve')}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Aprovar
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
              {reviewAction === 'approve' ? 'Aprovar' : 'Rejeitar'} Habilitação
            </h3>
            <p className="text-gray-600 mb-4">
              {selectedQualification.userName} - {selectedQualification.userCompany}
            </p>
            <div className="mb-4">
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
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowReviewModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                Cancelar
              </button>
              <button
                onClick={confirmReview}
                disabled={!reviewComments}
                className={`px-4 py-2 text-sm font-medium text-white rounded-lg disabled:opacity-50 ${
                  reviewAction === 'approve' 
                    ? 'bg-green-600 hover:bg-green-700' 
                    : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                Confirmar {reviewAction === 'approve' ? 'Aprovação' : 'Rejeição'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminQualifications;