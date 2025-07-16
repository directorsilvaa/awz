import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Scale, Users, Award } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-secondary/10 via-white to-secondary/10">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-[120%] bg-gradient-to-b from-primary/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 right-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-16 relative">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center justify-center mb-8 py-2 px-6 bg-white/80 backdrop-blur-sm rounded-full shadow-lg">
                {/* <Scale size={20} className="text-primary mr-2" /> */}
                <span className="text-primary font-medium"> AWDZ - Administração Judicial</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
                <span className="block text-gray-800">O Futuro da</span>
                <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Administração Judicial
                </span>
              </h1>

              {/* Subheading */}
              <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Atuamos com responsabilidade e transparência na gestão de processos de recuperação judicial,
                garantindo a melhor condução para a reestruturação da sua empresa.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  to="/contato"
                  className="group inline-flex items-center justify-center px-8 py-4 bg-primary hover:bg-primary-dark text-white font-medium rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <span>Fale Conosco</span>
                  <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
                <Link
                  to="/sobre"
                  className="group inline-flex items-center justify-center px-8 py-4 bg-white hover:bg-gray-50 text-primary font-medium rounded-xl transition-all duration-300 border-2 border-primary/20 hover:border-primary/40"
                >
                  <span>Saiba Mais</span>
                </Link>
              </div>

            </div>

            {/* Visual Element */}
            <div className="relative">
              <div className="relative bg-white rounded-3xl shadow-2xl p-8">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-3xl"></div>
                <div className="relative space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                      <Scale size={24} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Administração Judicial</h3>
                      <p className="text-sm text-gray-600">Gestão especializada</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center">
                      <Users size={24} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Equipe Multidisciplinar</h3>
                      <p className="text-sm text-gray-600">Profissionais qualificados</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                      <Award size={24} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Excelência</h3>
                      <p className="text-sm text-gray-600">Especialistas Reconhecidos no Segmento</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
    </section >
  );
};

export default Hero;