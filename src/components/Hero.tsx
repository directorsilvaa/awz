import React from 'react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-b from-secondary/10 via-white to-secondary/10">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-[120%] bg-gradient-to-b from-primary/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 right-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-16 relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Heading */}
          <h1 className="font-['Playfair_Display_SC'] text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
            <span className="block text-gray-800">Administração</span>
            <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Judicial com Excelência
            </span>
          </h1>

          {/* Subheading */}
          <p className="font-['Poppins'] text-xl text-gray-600 mb-12 leading-relaxed">
            Atuamos com responsabilidade e transparência na gestão de processos de recuperação judicial, 
            garantindo a melhor condução para a reestruturação da sua empresa.
          </p>

          {/* CTA Button */}
          <Link 
            to="/contato" 
            className="inline-flex items-center px-8 py-4 bg-primary hover:bg-primary/90 text-white font-['Poppins'] font-medium rounded-lg transition-colors duration-300"
          >
            Fale Conosco
          </Link>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
};

export default Hero;