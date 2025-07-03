import React from 'react';
import { Scale, Users, Brain, Laptop, Building2, Gavel, Award, Sparkles } from 'lucide-react';
import Footer from '../components/Footer';

const About: React.FC = () => {
  return (
    <>
      <div className="bg-gradient-to-b from-secondary/10 to-white">
        {/* Hero Section */}
        <section className="pt-32 pb-20 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-[120%] bg-gradient-to-b from-primary/5 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
            <div className="absolute top-1/4 right-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
          </div>
          <div className="container mx-auto px-4 relative">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center justify-center mb-8 py-2 px-6 bg-white/80 backdrop-blur-sm rounded-full shadow-lg">
                <Sparkles size={20} className="text-secondary mr-2" />
                <span className="text-primary font-medium">Nossa História</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
                <span className="block text-gray-800">Quem</span>
                <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Somos</span>
              </h1>
              <p className="text-xl leading-relaxed text-gray-700 mb-12">
                A AWDZ, sediada em Brasília, foi criada com o propósito de ser a melhor 
                administradora judicial em recuperação judicial e falências para os juízos 
                especializados e cíveis em todo os tribunais.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content Cards */}
        <section className="py-20 relative">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              <div className="group bg-white rounded-3xl p-12 shadow-[0_20px_50px_rgba(46,125,50,0.07)] hover:shadow-[0_20px_50px_rgba(46,125,50,0.13)] transition-all duration-500 transform hover:-translate-y-1">
                <div className="text-secondary mb-8 bg-green-50 w-20 h-20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  <Gavel size={40} />
                </div>
                <h3 className="text-2xl font-bold mb-6 text-gray-800">Excelência Jurídica</h3>
                <p className="text-gray-700 leading-relaxed text-lg">
                  Ela se apresenta como auxiliar do Poder Judiciário com a qualificação 
                  necessária para atuar em recuperação judicial e falências de sociedades 
                  empresárias de qualquer área, inclusive agrícola, independentemente da 
                  complexidade do processo.
                </p>
              </div>

              <div className="group bg-white rounded-3xl p-12 shadow-[0_20px_50px_rgba(46,125,50,0.07)] hover:shadow-[0_20px_50px_rgba(46,125,50,0.13)] transition-all duration-500 transform hover:-translate-y-1">
                <div className="text-primary mb-8 bg-green-50 w-20 h-20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  <Building2 size={40} />
                </div>
                <h3 className="text-2xl font-bold mb-6 text-gray-800">Equipe Multidisciplinar</h3>
                <p className="text-gray-700 leading-relaxed text-lg">
                  Para isso ela já nasceu grande. Nossa equipe multidisciplinar conta com 
                  profissionais das áreas do Direito, Administração, Contabilidade e 
                  Economia, com rica experiência e comprometidos a prestar um serviço 
                  de excelência.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Technology Section */}
        <section className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-dark"></div>
          <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yIDItNCAyLTRzLTItMi00LTJzMCAyLTIgNHMtMi0yLTQtMiAyIDIgMiA0LTIgMi00IDJzMC0yIDAtNCAyIDIgNCAyIDAtMiAyLTQgMiAyIDQgMi0yIDItMiA0IDIgMiA0IDIgMC0yIDAtNHoiLz48L2c+PC9nPjwvc3ZnPg==')]"></div>
          <div className="container mx-auto px-4 relative">
            <div className="max-w-5xl mx-auto">
              <div className="flex flex-col md:flex-row items-center gap-16">
                <div className="md:w-1/3">
                  <div className="bg-white/10 p-12 rounded-3xl backdrop-blur-lg transform hover:scale-105 transition-transform duration-500">
                    <Laptop size={120} className="text-white" />
                  </div>
                </div>
                <div className="md:w-2/3">
                  <h2 className="text-4xl font-bold mb-8 text-white">
                    Tecnologia de Ponta
                  </h2>
                  <p className="text-xl leading-relaxed text-white/90">
                    A AWDZ ainda conta com profissionais da área de Tecnologia da 
                    Informação, que agregam o desenvolvimento de sistemas informatizados 
                    de última geração, com o objetivo de garantir uma administração 
                    judicial mais moderna e célere, ofertando a todos os participantes 
                    do processo concursal, a segurança necessária para superação da 
                    crise econômica, a fim de que todos possam seguir adiante.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {[
                { icon: Scale, value: '100%', label: 'Comprometimento' },
                { icon: Users, value: '50+', label: 'Profissionais' },
                { icon: Brain, value: '15+', label: 'Anos de Experiência' },
                { icon: Award, value: '24/7', label: 'Suporte' }
              ].map((stat, index) => (
                <div key={index} className="group text-center p-8 rounded-2xl bg-white shadow-[0_10px_30px_rgba(46,125,50,0.05)] hover:shadow-[0_10px_30px_rgba(46,125,50,0.1)] transition-all duration-500 transform hover:-translate-y-1">
                  <div className="text-secondary mb-6 flex justify-center group-hover:scale-110 transition-transform duration-500">
                    <stat.icon size={40} />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default About;