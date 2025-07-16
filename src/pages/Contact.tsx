import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, User, MessageSquare } from 'lucide-react';
import Footer from '../components/Footer';

const ContactInfo = ({ icon: Icon, title, content, color }: {
  icon: any,
  title: string,
  content: string | React.ReactNode,
  color: string
}) => (
  <div className="group flex items-start space-x-4 p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
    <div className={`text-white ${color} p-4 rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
      <Icon size={24} />
    </div>
    <div className="flex-1">
      <h3 className="font-semibold text-gray-800 mb-2 text-lg group-hover:text-primary transition-colors duration-300">{title}</h3>
      <div className="text-gray-600 leading-relaxed">{content}</div>
    </div>
  </div>
);

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  return (
    <div className="pt-20">
      <div className="min-h-screen bg-gradient-to-b from-secondary/10 to-white">
        {/* Hero Section */}
        <section className="pt-20 pb-20 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-[120%] bg-gradient-to-b from-primary/5 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
            <div className="absolute top-1/4 right-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
          </div>

          <div className="container mx-auto px-4 relative">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <div className="inline-flex items-center justify-center mb-8 py-3 px-6 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-primary/10">
                <MessageSquare size={20} className="text-primary mr-2" />
                <span className="text-primary font-medium">Fale Conosco</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
                <span className="block text-gray-800">Entre em</span>
                <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Contato</span>
              </h1>

              <p className="text-xl text-gray-700 leading-relaxed mb-8">
                Estamos aqui para ajudar. Entre em contato conosco e descubra como podemos
                transformar sua gestão jurídica.
              </p>

              {/* Quick Contact Stats */}
              {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {[
                  { value: '< 24h', label: 'Tempo de Resposta', icon: Clock },
                  { value: '15+', label: 'Anos de Experiência', icon: CheckCircle },
                  { value: '24/7', label: 'Suporte Disponível', icon: Phone }
                ].map((stat, index) => (
                  <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-primary/10">
                    <div className="text-primary mb-3 flex justify-center">
                      <stat.icon size={24} />
                    </div>
                    <div className="text-lg font-bold text-gray-900 mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div> */}
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="bg-white/95 backdrop-blur-sm p-8 md:p-10 rounded-3xl shadow-[0_20px_50px_rgba(46,125,50,0.07)] border border-primary/10">
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle size={40} className="text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Mensagem Enviada!</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Obrigado pelo seu contato. Nossa equipe entrará em contato em breve.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="mb-8">
                      <h2 className="text-2xl font-bold text-gray-800 mb-2">Envie sua Mensagem</h2>
                      <p className="text-gray-600">Preencha o formulário abaixo e entraremos em contato</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                            Nome Completo
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              id="name"
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 pl-12 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300"
                              placeholder="Seu nome completo"
                              required
                            />
                            <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            E-mail
                          </label>
                          <div className="relative">
                            <input
                              type="email"
                              id="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 pl-12 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300"
                              placeholder="seu@email.com"
                              required
                            />
                            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                          Assunto
                        </label>
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300"
                          placeholder="Como podemos ajudar?"
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                          Mensagem
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          rows={6}
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 resize-none"
                          placeholder="Descreva sua necessidade ou dúvida..."
                          required
                        ></textarea>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-primary to-primary-dark text-white py-4 px-6 rounded-xl font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02]"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            <span>Enviando...</span>
                          </>
                        ) : (
                          <>
                            <Send size={20} />
                            <span>Enviar Mensagem</span>
                          </>
                        )}
                      </button>
                    </form>
                  </>
                )}
              </div>

              {/* Contact Information */}
              <div className="space-y-6">
                <ContactInfo
                  icon={Mail}
                  title="E-mail"
                  content={
                    <a href="mailto:contato@awdz.com.br" className="hover:text-primary transition-colors duration-300">
                      contato@awdz.com.br
                    </a>
                  }
                  color="bg-gradient-to-br from-blue-500 to-blue-600"
                />

                <ContactInfo
                  icon={Phone}
                  title="Telefone"
                  content={
                    <a href="tel:+556192698930" className="hover:text-primary transition-colors duration-300">
                      (61) 99269-8930
                    </a>
                  }
                  color="bg-gradient-to-br from-green-500 to-green-600"
                />

                <ContactInfo
                  icon={MapPin}
                  title="Endereço"
                  content={
                    <div className="space-y-1">
                      <p>Quadra SHCS CR 516 Bloco B, 66</p>
                      <p>Pavmto- 1 - Parte C007</p>
                      <p>Asa Sul</p>
                      <p className="font-medium">70381-525 - Brasília/DF</p>
                    </div>
                  }
                  color="bg-gradient-to-br from-purple-500 to-purple-600"
                />

                <ContactInfo
                  icon={Clock}
                  title="Horário de Funcionamento"
                  content={
                    <div className="space-y-1">
                      <p className="font-medium">Segunda à Sexta: 09h às 18h</p>
                      <p className="text-sm">Sábados: 09h às 12h</p>
                      <p className="text-sm text-gray-500">Domingos: Fechado</p>
                    </div>
                  }
                  color="bg-gradient-to-br from-orange-500 to-orange-600"
                />

                {/* Additional Info Card */}
                {/* <div className="bg-gradient-to-br from-primary/5 to-secondary/5 p-8 rounded-2xl border border-primary/10">
                  <h3 className="font-semibold text-gray-800 text-lg mb-4">Precisa de Atendimento Urgente?</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    Para casos urgentes, entre em contato diretamente pelo telefone.
                    Nossa equipe está preparada para atender suas necessidades.
                  </p>
                  <a
                    href="tel:+556192698930"
                    className="inline-flex items-center text-primary hover:text-primary-dark font-medium transition-colors duration-300"
                  >
                    <Phone size={16} className="mr-2" />
                    Ligar Agora
                  </a>
                </div> */}
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;