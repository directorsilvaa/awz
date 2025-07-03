import React, { useState } from 'react';
import { Instagram, Linkedin, Youtube, ArrowRight, Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleClientAreaClick = () => {
    const isAuthenticated = localStorage.getItem('clientAuthenticated') === 'true';
    if (!isAuthenticated) {
      navigate('/cliente');
    } else {
      navigate('/cliente/dashboard');
    }
  };

  return (
    <header className="w-full py-8 border-b border-green-100 relative">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center py-2">
            <img src="/logo.png" alt="AWDZ Logo" className="h-24 w-auto" />
          </Link>

          {/* Main Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Início
            </Link>
            <Link 
              to="/sobre" 
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Sobre
            </Link>
            <Link 
              to="/consulta-processos" 
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Consulta Processos
            </Link>
            <Link 
              to="/contato" 
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Contato
            </Link>
          </nav>

          {/* Right Side - Social + Client Area */}
          <div className="flex items-center space-x-6">
            {/* Social Media Icons */}
            <div className="hidden md:flex items-center space-x-4">
              <a href="#" aria-label="Instagram">
                <Instagram size={20} className="text-gray-400 hover:text-primary transition-colors" />
              </a>
              <a href="#" aria-label="LinkedIn">
                <Linkedin size={20} className="text-gray-400 hover:text-primary transition-colors" />
              </a>
              <a href="#" aria-label="YouTube">
                <Youtube size={20} className="text-gray-400 hover:text-primary transition-colors" />
              </a>
            </div>

            {/* Client Area Button */}
            <button 
              onClick={handleClientAreaClick}
              className="hidden md:inline-flex items-center bg-primary text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-primary-dark transition-colors"
            >
              Área do cliente
              <ArrowRight size={16} className="ml-1" />
            </button>

            {/* Mobile Menu Button */}
            <button 
              onClick={toggleMobileMenu}
              className="md:hidden p-2 text-gray-600 hover:text-primary transition-colors"
              aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed top-0 right-0 h-full w-[80%] max-w-sm bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
        isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <Link to="/" className="flex items-center">
              <img src="/logo.png" alt="AWDZ Logo" className="h-24 w-auto" />
            </Link>
            <button 
              onClick={toggleMobileMenu}
              className="p-2 text-gray-600 hover:text-primary transition-colors"
              aria-label="Fechar menu"
            >
              <X size={24} />
            </button>
          </div>

          <nav className="space-y-6">
            <Link 
              to="/" 
              onClick={toggleMobileMenu}
              className="block text-lg font-medium text-gray-800 hover:text-primary transition-colors"
            >
              Início
            </Link>
            <Link 
              to="/sobre" 
              onClick={toggleMobileMenu}
              className="block text-lg font-medium text-gray-800 hover:text-primary transition-colors"
            >
              Sobre
            </Link>
            <Link 
              to="/consulta-processos" 
              onClick={toggleMobileMenu}
              className="block text-lg font-medium text-gray-800 hover:text-primary transition-colors"
            >
              Consulta Processos
            </Link>
            <Link 
              to="/contato" 
              onClick={toggleMobileMenu}
              className="block text-lg font-medium text-gray-800 hover:text-primary transition-colors"
            >
              Contato
            </Link>

            <button 
              onClick={() => {
                toggleMobileMenu();
                handleClientAreaClick();
              }}
              className="inline-flex items-center bg-primary text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-primary-dark transition-colors"
            >
              Área do cliente
              <ArrowRight size={16} className="ml-1" />
            </button>

            <div className="flex items-center space-x-4 pt-4">
              <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-primary transition-colors">
                <Instagram size={24} />
              </a>
              <a href="#" aria-label="LinkedIn" className="text-gray-400 hover:text-primary transition-colors">
                <Linkedin size={24} />
              </a>
              <a href="#" aria-label="YouTube" className="text-gray-400 hover:text-primary transition-colors">
                <Youtube size={24} />
              </a>
            </div>
          </nav>
        </div>
      </div>

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleMobileMenu}
        ></div>
      )}
    </header>
  );
};

export default Navbar;