import React, { useState } from 'react';
import { 
  Search, UserPlus, Edit, Trash2, Eye, Mail, Phone, 
  Building2, Calendar, Shield, Key, Settings, User
} from 'lucide-react';

interface Administrator {
  id: string;
  name: string;
  email: string;
  phone: string;
  document: string;
  company: string;
  position: string;
  permissions: string[];
  createdAt: string;
  lastAccess: string;
  status: 'active' | 'inactive';
}

const AdminUserOperations: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<Administrator | null>(null);
  
  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    document: '',
    company: '',
    position: '',
    permissions: [] as string[],
    password: ''
  });

  // Mock data
  const administrators: Administrator[] = [
    {
      id: '1',
      name: 'João Silva',
      email: 'joao.silva@awdz.com',
      phone: '(11) 98765-4321',
      document: '123.456.789-00',
      company: 'AWDZ',
      position: 'Administrador Judicial',
      permissions: ['read', 'write', 'delete', 'approve'],
      createdAt: '01/01/2024',
      lastAccess: '10/03/2024 15:30',
      status: 'active'
    },
    {
      id: '2',
      name: 'Maria Santos',
      email: 'maria.santos@awdz.com',
      phone: '(11) 98765-4322',
      document: '987.654.321-00',
      company: 'AWDZ',
      position: 'Administrador Auxiliar',
      permissions: ['read', 'write'],
      createdAt: '15/01/2024',
      lastAccess: '09/03/2024 14:20',
      status: 'active'
    }
  ];

  const availablePermissions = [
    { id: 'read', label: 'Visualizar' },
    { id: 'write', label: 'Editar' },
    { id: 'delete', label: 'Excluir' },
    { id: 'approve', label: 'Aprovar' },
    { id: 'manage_users', label: 'Gerenciar Usuários' },
    { id: 'manage_processes', label: 'Gerenciar Processos' },
    { id: 'manage_assemblies', label: 'Gerenciar Assembleias' },
    { id: 'generate_reports', label: 'Gerar Relatórios' }
  ];

  const handleAddAdmin = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      document: '',
      company: '',
      position: '',
      permissions: [],
      password: ''
    });
    setShowAddModal(true);
  };

  const handleEditAdmin = (admin: Administrator) => {
    setSelectedAdmin(admin);
    setFormData({
      name: admin.name,
      email: admin.email,
      phone: admin.phone,
      document: admin.document,
      company: admin.company,
      position: admin.position,
      permissions: admin.permissions,
      password: ''
    });
    setShowEditModal(true);
  };

  const handleDeleteAdmin = (adminId: string) => {
    if (confirm('Tem certeza que deseja excluir este administrador?')) {
      console.log('Deleting admin:', adminId);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form data:', formData);
    setShowAddModal(false);
    setShowEditModal(false);
  };

  const handlePermissionChange = (permissionId: string) => {
    setFormData(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permissionId)
        ? prev.permissions.filter(p => p !== permissionId)
        : [...prev.permissions, permissionId]
    }));
  };

  const filteredAdmins = administrators.filter(admin =>
    admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="py-12 px-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Gerenciamento de Administradores</h1>
          <p className="text-gray-600">Adicione e gerencie administradores do sistema</p>
        </div>
        <button
          onClick={handleAddAdmin}
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors flex items-center"
        >
          <UserPlus size={20} className="mr-2" />
          Novo Administrador
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center">
            <div className="bg-blue-500 p-3 rounded-lg text-white mr-4">
              <User size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total de Administradores</p>
              <p className="text-2xl font-semibold text-gray-800">{administrators.length}</p>
            </div>
          </div>
        </div>
        {/* <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center">
            <div className="bg-green-500 p-3 rounded-lg text-white mr-4">
              <Shield size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Administradores Ativos</p>
              <p className="text-2xl font-semibold text-gray-800">
                {administrators.filter(a => a.status === 'active').length}
              </p>
            </div>
          </div>
        </div> */}
        {/* <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center">
            <div className="bg-purple-500 p-3 rounded-lg text-white mr-4">
              <Settings size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Com Permissões Completas</p>
              <p className="text-2xl font-semibold text-gray-800">
                {administrators.filter(a => a.permissions.includes('approve')).length}
              </p>
            </div>
          </div>
        </div> */}
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Buscar por nome, email ou empresa..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>
      </div>

      {/* Administrators List */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Administrador</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Empresa</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Cargo</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Último Acesso</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Permissões</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredAdmins.map((admin) => (
                <tr key={admin.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{admin.name}</div>
                      <div className="text-sm text-gray-500">{admin.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{admin.company}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{admin.position}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{admin.lastAccess}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      admin.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {admin.status === 'active' ? 'Ativo' : 'Inativo'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {admin.permissions.slice(0, 2).map(permission => (
                        <span key={permission} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                          {availablePermissions.find(p => p.id === permission)?.label}
                        </span>
                      ))}
                      {admin.permissions.length > 2 && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                          +{admin.permissions.length - 2}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => handleEditAdmin(admin)}
                        className="text-blue-600 hover:text-blue-800"
                        title="Editar"
                      >
                        <Edit size={20} />
                      </button>
                      <button
                        onClick={() => handleDeleteAdmin(admin.id)}
                        className="text-red-600 hover:text-red-800"
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

      {/* Add/Edit Modal */}
      {(showAddModal || showEditModal) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[600px] max-h-[80vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              {showAddModal ? 'Novo Administrador' : 'Editar Administrador'}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nome</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Telefone</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">CPF/CNPJ</label>
                  <input
                    type="text"
                    value={formData.document}
                    onChange={(e) => setFormData(prev => ({ ...prev, document: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Empresa</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Cargo</label>
                  <input
                    type="text"
                    value={formData.position}
                    onChange={(e) => setFormData(prev => ({ ...prev, position: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    required
                  />
                </div>
              </div>

              {showAddModal && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Senha</label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    required
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Permissões</label>
                <div className="grid grid-cols-2 gap-2">
                  {availablePermissions.map(permission => (
                    <label key={permission.id} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.permissions.includes(permission.id)}
                        onChange={() => handlePermissionChange(permission.id)}
                        className="rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <span className="ml-2 text-sm text-gray-600">{permission.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setShowEditModal(false);
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary-dark rounded-lg"
                >
                  {showAddModal ? 'Adicionar' : 'Salvar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUserOperations;