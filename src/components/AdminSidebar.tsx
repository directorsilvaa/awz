import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  PieChart, 
  Settings,
  Clock,
  LogOut,
  Search,
  Award
} from 'lucide-react';

const AdminSidebar: React.FC = () => {
  const location = useLocation();
  
  const menuItems = [
    { path: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/admin/assembly', icon: Clock, label: 'Assembleias' },
    { path: '/admin/processes', icon: FileText, label: 'Processos' },
    { path: '/admin/relatorios', icon: PieChart, label: 'Relatórios' },
    { path: '/admin/consulta', icon: Search, label: 'Consulta Processos' },
    { path: '/admin/habilitacoes', icon: Award, label: 'Habilitações' },
    { path: '/admin/operacoes', icon: Settings, label: 'Operações' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated');
    window.location.href = '/admin/login';
  };

  return (
    <div className="w-64 bg-white h-screen fixed left-0 top-0 border-r border-gray-200">
      <div className="p-6">
        <Link to="/admin" className="text-2xl font-bold text-primary">
          AWDZ Admin
        </Link>
      </div>

      <nav className="mt-6">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 ${
                isActive ? 'bg-primary/5 border-r-4 border-primary' : ''
              }`}
            >
              <item.icon size={20} className={isActive ? 'text-primary' : 'text-gray-400'} />
              <span className={`ml-3 ${isActive ? 'text-primary font-medium' : ''}`}>
                {item.label}
              </span>
            </Link>
          );
        })}

        <button
          onClick={handleLogout}
          className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 w-full mt-auto"
        >
          <LogOut size={20} className="text-gray-400" />
          <span className="ml-3">Sair</span>
        </button>
      </nav>
    </div>
  );
};

export default AdminSidebar;