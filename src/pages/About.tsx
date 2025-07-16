import React from 'react';
import { Scale, Users, Brain, Laptop, Building2, Gavel, Award, Sparkles, ArrowRight, CheckCircle } from 'lucide-react';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

const About: React.FC = () => {
  const navigate = useNavigate()

  const navigateOnContact = () => {
    navigate("/contato")
  }
  return (
    <div className="pt-20">
      <div className="bg-gradient-to-b from-secondary/10 to-white">
        {/* Hero Section */}
        <section className="pt-20 pb-20 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-[120%] bg-gradient-to-b from-primary/5 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
            <div className="absolute top-1/4 right-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
          </div>

          <div className="container mx-auto px-4 relative">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center justify-center mb-8 py-3 px-6 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-primary/10">
                <Sparkles size={20} className="text-secondary mr-2" />
                <span className="text-primary font-medium">Nossa História</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
                <span className="block text-gray-800">Quem</span>
                <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Somos</span>
              </h1>

              <p className="text-xl leading-relaxed text-gray-700 mb-12 max-w-3xl mx-auto">
                A AWDZ, sediada em Brasília, foi criada com o propósito de ser a melhor
                administradora judicial em processos de recuperação judicial e falência,
                atuando junto aos juízos especializados e cíveis em todo o país.
              </p>

              <div className="space-y-6 text-lg leading-relaxed text-gray-700 max-w-4xl mx-auto">
                <p>
                  Apresenta-se como auxiliar do Poder Judiciário, com a qualificação
                  necessária para atuar em recuperações judiciais e falências de sociedades
                  empresárias de qualquer setor, inclusive o agrícola, independentemente
                  da complexidade do processo.
                </p>

                <p>
                  Para isso, já nasceu grande. Sua equipe multidisciplinar é composta por
                  profissionais das áreas do Direito, Administração, Contabilidade e
                  Economia — todos com ampla experiência e comprometidos em prestar um
                  serviço de excelência.
                </p>

                <p>
                  A AWDZ também conta com profissionais da área de Tecnologia da Informação,
                  que desenvolvem sistemas informatizados de última geração, com o objetivo
                  de garantir uma administração judicial mais moderna e célere. Dessa forma,
                  oferece a todos os participantes do processo concursal a segurança
                  necessária para a superação da crise econômica, possibilitando que todos
                  possam seguir adiante.
                </p>
              </div>

              {/* Call to Action */}
              {/* <div className="mt-12 text-center">
                <div onClick={navigateOnContact} className="cursor-pointer inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                  <span>Conheça Nossos Serviços</span>
                  <ArrowRight size={20} className="ml-2" />
                </div>
              </div> */}
            </div>
          </div>
        </section>

        {/* Mission & Vision Section */}
        {/* <section className="py-20 bg-white relative">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="group bg-gradient-to-br from-primary/5 to-secondary/5 rounded-3xl p-12 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-primary/10">
                  <div className="text-primary mb-8 bg-white w-20 h-20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-lg">
                    <Scale size={40} />
                  </div>
                  <h3 className="text-2xl font-bold mb-6 text-gray-800 group-hover:text-primary transition-colors duration-300">Nossa Missão</h3>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    Ser a melhor administradora judicial do país, oferecendo soluções
                    inovadoras e eficientes para processos de recuperação judicial e
                    falência, sempre com excelência e transparência.
                  </p>
                </div>

                <div className="group bg-gradient-to-br from-secondary/5 to-primary/5 rounded-3xl p-12 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-secondary/10">
                  <div className="text-secondary mb-8 bg-white w-20 h-20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-lg">
                    <Award size={40} />
                  </div>
                  <h3 className="text-2xl font-bold mb-6 text-gray-800 group-hover:text-primary transition-colors duration-300">Nossa Visão</h3>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    Ser reconhecida como referência nacional em administração judicial,
                    contribuindo para a modernização do sistema judiciário brasileiro
                    através da tecnologia e expertise.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section> */}

        {/* Stats Section */}
        <section className="py-20 bg-gradient-to-b from-white to-secondary/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Nossa Expertise
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Números que demonstram nossa capacidade e comprometimento com a excelência
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              {[
                { value: 'Nacional', label: 'Atuação em Todo País', icon: Building2 },
                { value: 'Multidisciplinar', label: 'Equipe Especializada', icon: Users },
                { value: 'Última Geração', label: 'Tecnologia Avançada', icon: Laptop },
                { value: '100%', label: 'Comprometimento', icon: CheckCircle }
              ].map((stat, index) => (
                <div key={index} className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-primary/10">
                  <div className="text-primary mb-3 flex justify-center group-hover:scale-110 transition-transform duration-300">
                    <stat.icon size={32} />
                  </div>
                  <div className="text-lg font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Main Content Cards */}
        <section className="py-20 relative">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              <div className="group bg-white rounded-3xl p-12 shadow-[0_20px_50px_rgba(46,125,50,0.07)] hover:shadow-[0_30px_60px_rgba(46,125,50,0.15)] transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
                <div className="text-secondary mb-8 bg-gradient-to-br from-green-50 to-secondary/10 w-20 h-20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-lg">
                  <Gavel size={40} />
                </div>
                <h3 className="text-2xl font-bold mb-6 text-gray-800 group-hover:text-primary transition-colors duration-300">Auxiliar do Poder Judiciário</h3>
                <p className="text-gray-700 leading-relaxed text-lg mb-6">
                  Atuamos como auxiliar do Poder Judiciário com qualificação técnica
                  para processos de recuperação judicial e falências em todos os setores
                  econômicos, incluindo o agrícola, independentemente da complexidade.
                </p>
                <div className="flex items-center text-primary font-medium group-hover:translate-x-2 transition-transform duration-300">
                  <span>Conheça nossa atuação</span>
                  <ArrowRight size={16} className="ml-2" />
                </div>
              </div>

              <div className="group bg-white rounded-3xl p-12 shadow-[0_20px_50px_rgba(46,125,50,0.07)] hover:shadow-[0_30px_60px_rgba(46,125,50,0.15)] transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
                <div className="text-primary mb-8 bg-gradient-to-br from-green-50 to-primary/10 w-20 h-20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-lg">
                  <Building2 size={40} />
                </div>
                <h3 className="text-2xl font-bold mb-6 text-gray-800 group-hover:text-primary transition-colors duration-300">Equipe de Excelência</h3>
                <p className="text-gray-700 leading-relaxed text-lg mb-6">
                  Equipe multidisciplinar composta por profissionais experientes das
                  áreas do Direito, Administração, Contabilidade, Economia e Tecnologia
                  da Informação, todos comprometidos com a excelência.
                </p>
                <div className="flex items-center text-primary font-medium group-hover:translate-x-2 transition-transform duration-300">
                  <span>Conheça a equipe</span>
                  <ArrowRight size={16} className="ml-2" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technology Section */}
        <section className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary-dark to-primary"></div>
          <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yIDItNCAyLTRzLTItMi00LTJzMCAyLTIgNHMtMi0yLTQtMiAyIDIgMiA0LTIgMi00IDJzMC0yIDAtNCAyIDIgNCAyIDAtMiAyLTQgMiAyIDQgMi0yIDItMiA0IDIgMiA0IDIgMC0yIDAtNHoiLz48L2c+PC9nPjwvc3ZnPg==')]"></div>

          <div className="container mx-auto px-4 relative">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="order-2 lg:order-1">
                  <div className="bg-white/10 p-12 rounded-3xl backdrop-blur-lg transform hover:scale-105 transition-all duration-500 border border-white/20 shadow-2xl">
                    <div className="relative">
                      <Laptop size={120} className="text-white mx-auto" />
                      <div className="absolute -top-4 -right-4 w-8 h-8 bg-secondary rounded-full opacity-60 animate-pulse"></div>
                      <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-white rounded-full opacity-40 animate-pulse delay-1000"></div>
                    </div>
                  </div>
                </div>

                <div className="order-1 lg:order-2">
                  <div className="inline-flex items-center justify-center mb-6 py-2 px-4 bg-white/10 backdrop-blur-sm rounded-full">
                    <Laptop size={16} className="text-white mr-2" />
                    <span className="text-white/90 font-medium text-sm">Inovação Tecnológica</span>
                  </div>

                  <h2 className="text-4xl font-bold mb-8 text-white">
                    Inovação Tecnológica
                  </h2>

                  <p className="text-xl leading-relaxed text-white/90 mb-8">
                    Desenvolvemos sistemas informatizados de última geração para garantir
                    uma administração judicial moderna e célere, oferecendo segurança e
                    eficiência a todos os participantes do processo concursal.
                  </p>

                  <div className="space-y-4">
                    {[
                      'Sistemas informatizados de última geração',
                      'Administração judicial moderna e célere',
                      'Segurança para superação da crise econômica',
                      'Soluções tecnológicas para todos os participantes'
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-secondary rounded-full"></div>
                        <span className="text-white/90">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-24 bg-gradient-to-b from-white to-secondary/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Nossos Valores
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Princípios que norteiam nossa atuação e garantem a excelência em nossos serviços
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
              {[
                { icon: Scale, title: 'Transparência', description: 'Atuação clara e transparente em todos os processos' },
                { icon: Users, title: 'Comprometimento', description: 'Dedicação total aos nossos clientes e processos' },
                { icon: Brain, title: 'Inovação', description: 'Sempre buscando as melhores soluções tecnológicas' },
                { icon: Award, title: 'Excelência', description: 'Padrão de qualidade superior em todos os serviços' }
              ].map((value, index) => (
                <div key={index} className="group text-center p-8 rounded-2xl bg-white shadow-[0_10px_30px_rgba(46,125,50,0.05)] hover:shadow-[0_20px_40px_rgba(46,125,50,0.1)] transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
                  <div className="text-secondary mb-6 flex justify-center group-hover:scale-110 transition-transform duration-500">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl flex items-center justify-center">
                      <value.icon size={32} />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors duration-300">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default About;