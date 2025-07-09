import React, { useState } from 'react';
import { Send, User, Mail, Phone, Building2, AlertCircle, CheckCircle } from 'lucide-react';
import Footer from '../components/Footer';

const AssemblyRegistration: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    oab: '',
    email: '',
    phone: '',
    processNumber: '',
    petitioners: '',
    message: ''
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
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
      setFormData({
        name: '',
        oab: '',
        email: '',
        phone: '',
        processNumber: '',
        petitioners: '',
        message: ''
      });
      setSelectedFile(null);
    }, 3000);
  };

  return (
    <div className="pt-20">
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
        {/* Navigation Breadcrumb */}
        <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
          {/* <div className="container mx-auto px-4 py-3">
            <nav className="flex items-center space-x-2 text-sm text-gray-600">
              <span>quem somos</span>
              <span>/</span>
              <span>contato</span>
              <span>/</span>
              <span>consulta a processos</span>
              <span>/</span>
              <span>habilitações e divergências de crédito</span>
              <span>/</span>
              <span className="text-primary font-medium">cadastramento para assembleia</span>
            </nav>
          </div> */}
        </div>

        <section className="pt-20 pb-20 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-[120%] bg-gradient-to-b from-primary/5 to-transparent rounded-full blur-3xl"></div>
          </div>
          
          <div className="container mx-auto px-4 relative">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-2 leading-tight text-black">
                Cadastramento para Assembleia
              </h1>
            </div>

            <div className="max-w-3xl mx-auto bg-white/95 backdrop-blur-sm rounded-3xl shadow-lg p-8 md:p-12">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={40} className="text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Cadastro Realizado!</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Seu cadastro para assembleia foi enviado com sucesso. Nossa equipe entrará em contato em breve com mais informações.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Nome</label>
                      <div className="relative">
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                          required
                        />
                        <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">OAB</label>
                      <input
                        type="text"
                        name="oab"
                        value={formData.oab}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">E-mail</label>
                      <div className="relative">
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                          required
                        />
                        <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Telefone</label>
                      <div className="relative">
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                          required
                        />
                        <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Selecione o processo relacionado</label>
                    <input
                      type="text"
                      name="processNumber"
                      value={formData.processNumber}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      placeholder="Número do processo"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Peticionante(s)/Credor(es)</label>
                    <textarea
                      name="petitioners"
                      value={formData.petitioners}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                      placeholder="Informe os dados dos peticionantes ou credores"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Mensagem</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                      placeholder="Informações adicionais sobre o cadastro para assembleia"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Adicionar documento</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <input
                        type="file"
                        onChange={handleFileChange}
                        className="hidden"
                        id="file-upload"
                        accept=".pdf,.doc,.docx"
                      />
                      <label htmlFor="file-upload" className="cursor-pointer">
                        <Building2 size={48} className="mx-auto text-gray-400 mb-4" />
                        <p className="text-gray-600">
                          {selectedFile ? selectedFile.name : 'Nenhum arquivo escolhido'}
                        </p>
                        <p className="text-sm text-gray-500 mt-2">
                          Clique para selecionar um arquivo (opcional)
                        </p>
                      </label>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start">
                      <AlertCircle size={20} className="text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                      <p className="text-sm text-blue-800">
                        Os arquivos não podem ter mais que 3MB cada. Caso necessário, divida em vários arquivos ou utilize o formulário mais de uma vez.
                      </p>
                    </div>
                  </div>

                  {/* Cloudflare verification placeholder */}
                  <div className="flex justify-center">
                    <div className="bg-gray-100 border rounded-lg p-4 flex items-center space-x-3">
                      <div className="w-6 h-6 border-2 border-gray-400 rounded"></div>
                      <span className="text-gray-700">Verificando...</span>
                      <div className="text-xs text-gray-500">
                        <div>CLOUDFLARE</div>
                        <div>Turnstile • Privacy</div>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gray-600 text-white py-4 px-6 rounded-lg font-medium hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Enviando...</span>
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        <span>Enviar</span>
                      </>
                    )}
                  </button>
                </form>
              )}

              {/* Footer info */}
              <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                <p className="text-sm text-gray-500">
                  © 2023 TDV Administração Judicial. Todos os direitos reservados. | Política de Privacidade
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default AssemblyRegistration;