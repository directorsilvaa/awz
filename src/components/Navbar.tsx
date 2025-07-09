import React, { useState, useEffect } from 'react';
import { Instagram, Linkedin, Youtube, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
      ? 'bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-100'
      : 'bg-white/80 backdrop-blur-sm border-b border-green-100'
      }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <div className="">
              <img
                src="/logo.png"
                alt="AWDZ - Administração Judicial"
                className="h-full w-36 object-contain transition-transform duration-300 group-hover:scale-110"
              />
              {/* <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div> */}
            </div>
            <div className="ml-0 hidden sm:block">
              {/* <div className="text-xl font-bold text-primary group-hover:text-primary-dark transition-colors duration-300">
                AWDZ
              </div> */}
              <div className="text-sm text-gray-500">
                Administração Judicial
              </div>
            </div>
          </Link>

          {/* Main Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {[
              { to: '/', label: 'Início' },
              { to: '/sobre', label: 'Sobre' },
              { to: '/consulta-processos', label: 'Consulta Processos' },
              { to: '/habilitacoes-credito', label: 'Habilitações' },
              { to: '/cadastramento-assembleia', label: 'Assembleia' },
              { to: '/contato', label: 'Contato' }
            ].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="relative text-sm font-medium text-gray-700 hover:text-primary transition-all duration-300 group py-2"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* Right Side - Social Media */}
          <div className="flex items-center space-x-4">
            {/* Social Media Icons */}
            <div className="hidden md:flex items-center space-x-3">
              {[
                { href: '#', icon: Instagram, label: 'Instagram' },
                { href: '#', icon: Linkedin, label: 'LinkedIn' },
                { href: '#', icon: Youtube, label: 'YouTube' }
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="p-2 text-gray-400 hover:text-primary transition-all duration-300 hover:bg-primary/5 rounded-lg group"
                >
                  <social.icon size={18} className="group-hover:scale-110 transition-transform duration-300" />
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 text-gray-600 hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-300"
              aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              <div className="relative w-6 h-6">
                <Menu
                  size={24}
                  className={`absolute inset-0 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0 rotate-180' : 'opacity-100 rotate-0'
                    }`}
                />
                <X
                  size={24}
                  className={`absolute inset-0 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-180'
                    }`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden fixed top-24 right-0 h-[calc(100vh-6rem)] w-full max-w-sm bg-white/95 backdrop-blur-lg shadow-2xl transform transition-all duration-300 ease-out ${isMobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        }`}>
        <div className="p-6 h-full flex flex-col">
          {/* Mobile Logo */}
          <div className="flex items-center justify-center mb-8 pb-6 border-b border-gray-100">
            <Link to="/" className="flex items-center group" onClick={toggleMobileMenu}>
              <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary/5 to-secondary/5 p-4">
                <img
                  src="/logo.png"
                  alt="AWDZ Logo"
                  className="h-20 w-auto object-contain"
                />
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-primary">AWDZ</div>
                <div className="text-sm text-gray-500">Administração Judicial</div>
              </div>
            </Link>
          </div>

          {/* Mobile Navigation */}
          <nav className="flex-1 space-y-2">
            {[
              { to: '/', label: 'Início' },
              { to: '/sobre', label: 'Sobre' },
              { to: '/consulta-processos', label: 'Consulta Processos' },
              { to: '/habilitacoes-credito', label: 'Habilitações' },
              { to: '/cadastramento-assembleia', label: 'Assembleia' },
              { to: '/contato', label: 'Contato' }
            ].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={toggleMobileMenu}
                className="block px-4 py-3 text-lg font-medium text-gray-800 hover:text-primary hover:bg-primary/5 rounded-xl transition-all duration-300"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Social Links */}
          <div className="pt-6 border-t border-gray-100">
            <p className="text-sm text-gray-500 mb-4 text-center">Siga-nos nas redes sociais</p>
            <div className="flex items-center justify-center space-x-4">
              {[
                { href: '#', icon: Instagram, label: 'Instagram' },
                { href: '#', icon: Linkedin, label: 'LinkedIn' },
                { href: '#', icon: Youtube, label: 'YouTube' }
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="p-3 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-xl transition-all duration-300"
                >
                  <social.icon size={24} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-[-1] transition-opacity duration-300"
          onClick={toggleMobileMenu}
        ></div>
      )}
    </header>
  );
};

export default Navbar;