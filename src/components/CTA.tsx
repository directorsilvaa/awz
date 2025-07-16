import React from 'react';
import { ArrowRight } from 'lucide-react';

const CTA: React.FC = () => {
  return (
    <section className="py-24 bg-gradient-to-r from-primary to-primary-dark relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yIDItNCAyLTRzLTItMi00LTJzMCAyLTIgNHMtMi0yLTQtMiAyIDIgMiA0LTIgMi00IDJzMC0yIDAtNCAyIDIgNCAyIDAtMiAyLTQgMiAyIDQgMi0yIDItMiA0IDIgMiA0IDIgMC0yIDAtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-10"></div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-white">
            Pronto para revolucionar sua gestão jurídica?
          </h2>
          <p className="text-xl text-white/90 mb-12 leading-relaxed">
            Junte-se a centenas de escritórios e departamentos jurídicos que já 
            transformaram sua produtividade com a AWDZ.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button className="group inline-flex items-center px-8 py-4 bg-white text-primary font-medium rounded-xl shadow-lg hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105">
              Agendar demonstração
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="group inline-flex items-center px-8 py-4 bg-secondary text-white font-medium rounded-xl shadow-lg hover:bg-secondary-dark transition-all duration-300 transform hover:scale-105">
              Criar conta gratuita
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;