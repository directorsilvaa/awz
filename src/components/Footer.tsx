import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-b from-white to-secondary/10 border-t border-secondary/20 pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Navegação</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  Início
                </Link>
              </li>
              <li>
                <Link
                  to="/sobre"
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  Sobre
                </Link>
              </li>
              <li>
                <Link
                  to="/consulta-processos"
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  Consulta Processos
                </Link>
              </li>
              <li>
                <Link
                  to="/contato"
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  Contato
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-span-1">
            <Link
              to="/"
              className="text-2xl font-bold text-right text-primary mb-4 inline-block"
            >
              <img
                src="/logo_preta.png"
                alt="AWDZ - Administração Judicial"
                className="h-12 w-full object-contain transition-transform duration-300 group-hover:scale-110"
              />
            </Link>
            <p className="text-gray-600 mb-4">
              Simplificando a administração judicial com tecnologia de ponta
              desde 2025.
            </p>
          </div>

          <div className="col-span-1"></div>

          <div className="col-span-1"></div>
        </div>

        <div className="border-t border-green-100 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} AWDZ. Todos os direitos reservados.
            </p>
            <p className="text-sm text-gray-500">CNPJ: 60.729.066/0001-49</p>
          </div>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link
              to="/termos"
              className="text-sm text-gray-500 hover:text-primary transition-colors"
            >
              Termos de Uso
            </Link>
            <Link
              to="/privacidade"
              className="text-sm text-gray-500 hover:text-primary transition-colors"
            >
              Política de Privacidade
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
