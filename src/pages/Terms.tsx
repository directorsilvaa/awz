import React from 'react';
import Footer from '../components/Footer';
import { Shield } from 'lucide-react';

const Terms: React.FC = () => {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-secondary/10 to-white">
        <section className="pt-32 pb-20 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-[120%] bg-gradient-to-b from-primary/5 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
          </div>

          <div className="container mx-auto px-4 relative">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <div className="inline-flex items-center justify-center mb-8 py-2 px-6 bg-white/80 backdrop-blur-sm rounded-full shadow-lg">
                  <Shield size={20} className="text-primary mr-2" />
                  <span className="text-primary font-medium">Termos Legais</span>
                </div>
                <h1 className="text-5xl font-bold mb-8 leading-tight">
                  <span className="block text-gray-800">Termos de</span>
                  <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Uso</span>
                </h1>
              </div>

              <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12 space-y-8">
                <section>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Aceitação dos Termos</h2>
                  <p className="text-gray-600 leading-relaxed">
                    Ao acessar e usar os serviços da AWDZ, você concorda com estes termos de uso e todas as condições aqui estabelecidas.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Descrição dos Serviços</h2>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    A AWDZ oferece serviços de administração judicial em processos de recuperação judicial e falências, atuando como auxiliar do Poder Judiciário.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    Nossos serviços incluem, mas não se limitam a:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 mt-2 space-y-2">
                    <li>Gestão de processos judiciais</li>
                    <li>Análise e acompanhamento de recuperações judiciais</li>
                    <li>Administração de falências</li>
                    <li>Consultoria especializada</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Responsabilidades do Usuário</h2>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Ao utilizar nossos serviços, você se compromete a:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li>Fornecer informações verdadeiras e precisas</li>
                    <li>Manter a confidencialidade de suas credenciais de acesso</li>
                    <li>Utilizar os serviços de acordo com a legislação vigente</li>
                    <li>Respeitar os direitos de propriedade intelectual</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Limitação de Responsabilidade</h2>
                  <p className="text-gray-600 leading-relaxed">
                    A AWDZ não se responsabiliza por danos indiretos, incidentais ou consequentes decorrentes do uso ou impossibilidade de uso dos serviços.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Alterações nos Termos</h2>
                  <p className="text-gray-600 leading-relaxed">
                    A AWDZ se reserva o direito de modificar estes termos a qualquer momento, sendo as alterações comunicadas através de nosso site.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Contato</h2>
                  <p className="text-gray-600 leading-relaxed">
                    Para questões relacionadas a estes termos, entre em contato através do telefone (61) 99269-8930 ou visite nosso escritório na Quadra SHCS CR 516 Bloco B, 66, Pavmto- 1 - Parte C007, Asa Sul, Brasília/DF.
                  </p>
                </section>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Terms;