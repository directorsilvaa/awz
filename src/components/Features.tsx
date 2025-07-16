import React from 'react';
import { BarChart3, Clock, Shield, Users } from 'lucide-react';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Feature: React.FC<FeatureProps> = ({ icon, title, description }) => {
  return (
    <div className="group p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 border border-secondary/20">
      <div className="mb-6 text-primary group-hover:scale-110 transition-transform duration-500">{icon}</div>
      <h3 className="text-xl font-semibold mb-4 text-gray-800">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
};

const Features: React.FC = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-green-50 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-secondary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Por que escolher a AWDZ?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Nossa plataforma foi desenvolvida para trazer eficiência e controle para a gestão jurídica 
            do seu escritório ou departamento legal.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          <Feature 
            icon={<BarChart3 size={40} />} 
            title="Análise Avançada" 
            description="Obtenha insights valiosos com dashboards personalizados e relatórios detalhados em tempo real."
          />
          <Feature 
            icon={<Clock size={40} />} 
            title="Automação Inteligente" 
            description="Economize tempo automatizando tarefas repetitivas e focando no que realmente importa para seu negócio."
          />
          <Feature 
            icon={<Shield size={40} />} 
            title="Segurança Máxima" 
            description="Seus dados estão protegidos com a mais alta tecnologia de segurança e criptografia disponível."
          />
          <Feature 
            icon={<Users size={40} />} 
            title="Colaboração Eficiente" 
            description="Trabalhe em equipe com ferramentas que facilitam a comunicação e o compartilhamento de informações."
          />
        </div>
      </div>
    </section>
  );
};

export default Features;