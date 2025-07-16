import React from 'react';
import Footer from '../components/Footer';
import { Lock } from 'lucide-react';

const Privacy: React.FC = () => {
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
                  <Lock size={20} className="text-primary mr-2" />
                  <span className="text-primary font-medium">Privacidade</span>
                </div>
                <h1 className="text-5xl font-bold mb-8 leading-tight">
                  <span className="block text-gray-800">Política de</span>
                  <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Privacidade</span>
                </h1>
              </div>

              <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12 space-y-8">
                <section>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Introdução</h2>
                  <p className="text-gray-600 leading-relaxed">
                    A AWDZ está comprometida com a proteção da sua privacidade. Esta política descreve como coletamos, usamos e protegemos suas informações pessoais.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Coleta de Dados</h2>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Coletamos as seguintes informações:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li>Dados de identificação (nome, CPF, RG)</li>
                    <li>Informações de contato (e-mail, telefone, endereço)</li>
                    <li>Dados processuais</li>
                    <li>Informações de acesso ao sistema</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Uso das Informações</h2>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Utilizamos seus dados para:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li>Prestação dos serviços contratados</li>
                    <li>Comunicação sobre processos e atualizações</li>
                    <li>Cumprimento de obrigações legais</li>
                    <li>Melhorias em nossos serviços</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Proteção de Dados</h2>
                  <p className="text-gray-600 leading-relaxed">
                    Implementamos medidas de segurança técnicas e organizacionais para proteger suas informações contra acesso não autorizado, alteração, divulgação ou destruição.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Seus Direitos</h2>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Você tem direito a:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li>Acessar seus dados pessoais</li>
                    <li>Solicitar correção de informações incorretas</li>
                    <li>Solicitar a exclusão de seus dados</li>
                    <li>Revogar consentimento para uso dos dados</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Contato</h2>
                  <p className="text-gray-600 leading-relaxed">
                    Para questões relacionadas à privacidade de seus dados, entre em contato através do telefone (61) 99269-8930 ou visite nosso escritório na Quadra SHCS CR 516 Bloco B, 66, Pavmto- 1 - Parte C007, Asa Sul, Brasília/DF.
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

export default Privacy;