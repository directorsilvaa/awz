import React from 'react';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import Footer from '../components/Footer';

const ContactInfo = ({ icon: Icon, title, content }: { icon: any, title: string, content: string | React.ReactNode }) => (
  <div className="flex items-start space-x-4 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
    <div className="text-primary bg-green-50 p-3 rounded-lg">
      <Icon size={24} />
    </div>
    <div>
      <h3 className="font-semibold text-gray-800 mb-1">{title}</h3>
      <p className="text-gray-600">{content}</p>
    </div>
  </div>
);

const Contact: React.FC = () => {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-secondary/10 to-white">
        {/* Hero Section */}
        <section className="pt-32 pb-20 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-[120%] bg-gradient-to-b from-primary/5 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
            <div className="absolute top-1/4 right-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
          </div>
          
          <div className="container mx-auto px-4 relative">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
                <span className="block text-gray-800">Entre em</span>
                <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Contato</span>
              </h1>
              <p className="text-xl text-gray-700 leading-relaxed">
                Estamos aqui para ajudar. Entre em contato conosco e descubra como podemos 
                transformar sua gestão jurídica.
              </p>
            </div>

            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="bg-white p-8 rounded-3xl shadow-[0_20px_50px_rgba(46,125,50,0.07)]">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Nome
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        placeholder="Seu nome"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        E-mail
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        placeholder="seu@email.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Assunto
                    </label>
                    <input
                      type="text"
                      id="subject"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                      placeholder="Como podemos ajudar?"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Mensagem
                    </label>
                    <textarea
                      id="message"
                      rows={6}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                      placeholder="Sua mensagem..."
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-primary text-white py-4 px-6 rounded-xl font-medium hover:bg-primary-dark transition-colors duration-300 flex items-center justify-center space-x-2"
                  >
                    <span>Enviar mensagem</span>
                    <Send size={20} />
                  </button>
                </form>
              </div>

              {/* Contact Information */}
              <div className="space-y-6">
                <ContactInfo
                  icon={Mail}
                  title="E-mail"
                  content="contato@awdz.com.br"
                />
                <ContactInfo
                  icon={Phone}
                  title="Telefone"
                  content="(61) 99269-8930"
                />
                <ContactInfo
                  icon={MapPin}
                  title="Endereço"
                  content={
                    <>
                      Quadra SHCS CR 516 Bloco B, 66<br />
                      Pavmto- 1 - Parte C007<br />
                      Asa Sul<br />
                      70381-525 - Brasília/DF
                    </>
                  }
                />
                <ContactInfo
                  icon={Clock}
                  title="Horário de Funcionamento"
                  content="Segunda à Sexta: 09h às 18h"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Contact;