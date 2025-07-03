import React from 'react';
import { Quote } from 'lucide-react';

interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
  company: string;
  imageUrl: string;
}

const Testimonial: React.FC<TestimonialProps> = ({ quote, author, role, company, imageUrl }) => {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 border border-green-100/50">
      <div className="mb-6 text-primary">
        <Quote size={32} />
      </div>
      <p className="text-gray-700 text-lg leading-relaxed mb-8">{quote}</p>
      <div className="flex items-center">
        <img 
          src={imageUrl} 
          alt={author} 
          className="w-12 h-12 rounded-full object-cover mr-4"
        />
        <div>
          <p className="font-semibold text-gray-800">{author}</p>
          <p className="text-sm text-gray-500">{role}, {company}</p>
        </div>
      </div>
    </div>
  );
};

const Testimonials: React.FC = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-secondary/10 to-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            O que nossos clientes dizem
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Mais de 1000 escritórios e departamentos jurídicos já transformaram 
            sua gestão com a nossa plataforma.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <Testimonial 
            quote="A implementação da AWDZ aumentou nossa produtividade em 40% e reduziu consideravelmente o tempo gasto com tarefas administrativas."
            author="Ana Silva"
            role="Diretora Jurídica"
            company="Empresa ABC"
            imageUrl="https://images.pexels.com/photos/3796217/pexels-photo-3796217.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          />
          <Testimonial 
            quote="Conseguimos ter controle total dos nossos processos e documentos, o que melhorou significativamente nossa eficiência operacional."
            author="Ricardo Oliveira"
            role="Sócio"
            company="Oliveira Advogados"
            imageUrl="https://images.pexels.com/photos/5397723/pexels-photo-5397723.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          />
          <Testimonial 
            quote="A plataforma é intuitiva e oferece recursos avançados que simplificaram nossa gestão jurídica. O suporte ao cliente é excepcional."
            author="Camila Santos"
            role="Gerente Jurídica"
            company="Grupo XYZ"
            imageUrl="https://images.pexels.com/photos/3799115/pexels-photo-3799115.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;