/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { 
  BookOpen, 
  GraduationCap, 
  Laptop, 
  Home, 
  MapPin, 
  Brain, 
  Cpu, 
  ChevronRight, 
  CheckCircle2,
  Mail,
  MessageSquare,
  Calculator,
  Atom,
  TrendingUp,
  Briefcase
} from "lucide-react";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function App() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#1A1A1A] font-sans selection:bg-blue-100">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
              A
            </div>
            <span className="font-semibold text-lg tracking-tight">Aprobá Mendoza</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <a href="#servicios" className="hover:text-blue-600 transition-colors">Servicios</a>
            <a href="#modalidad" className="hover:text-blue-600 transition-colors">Modalidad</a>
            <a href="#talleres" className="hover:text-blue-600 transition-colors">Talleres</a>
            <a href="#contacto" className="bg-blue-600 text-white px-5 py-2.5 rounded-full hover:bg-blue-700 transition-all shadow-sm">
              Contactar
            </a>
          </div>
        </div>
      </nav>

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-24 md:py-32 overflow-hidden bg-dot-pattern">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#FAFAFA] pointer-events-none"></div>
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <motion.div 
              initial="initial"
              animate="animate"
              variants={staggerContainer}
              className="max-w-3xl"
            >
              <motion.span 
                variants={fadeIn}
                className="inline-block px-4 py-1.5 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider mb-6 border border-blue-100 shadow-sm"
              >
                Aprobá Mendoza
              </motion.span>
              <motion.h1 
                variants={fadeIn}
                className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-8"
              >
                Clases particulares a <span className="text-blue-600">tu medida.</span>
              </motion.h1>
              <motion.p 
                variants={fadeIn}
                className="text-xl text-gray-600 leading-relaxed mb-10 max-w-2xl"
              >
                Preparación de alumnos para ingresos universitarios y clases particulares
              </motion.p>
              <motion.div 
                variants={fadeIn}
                className="flex flex-col sm:flex-row gap-4"
              >
                <a href="#contacto" className="flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 group">
                  Empezar ahora
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a href="#servicios" className="flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 px-8 py-4 rounded-2xl font-semibold hover:bg-gray-50 transition-all">
                  Ver servicios
                </a>
              </motion.div>
            </motion.div>
          </div>
          
          {/* Abstract background elements */}
          <div className="absolute top-0 right-0 -z-10 w-1/2 h-full opacity-10 pointer-events-none">
            <div className="absolute top-20 right-20 w-64 h-64 bg-blue-400 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-40 w-96 h-96 bg-indigo-400 rounded-full blur-3xl" />
          </div>
        </section>

        {/* Services Grid */}
        <section id="servicios" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Materias</h2>
              <p className="text-gray-500 max-w-2xl mx-auto">Preparación enfocada a resultados y entendimiento</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: <Calculator className="w-8 h-8" />, title: "Matemática", desc: "Clases de apoyo y preparación para todos los niveles." },
                { icon: <Atom className="w-8 h-8" />, title: "Física", desc: "Clases de apoyo y preparación para todos los niveles." },
                { icon: <Brain className="w-8 h-8" />, title: "Técnicas de estudio y organización", desc: "Optimiza tu tiempo y mejora tu aprendizaje." },
                { icon: <Cpu className="w-8 h-8" />, title: "Programación e IA", desc: "Fundamentos de código y herramientas de inteligencia artificial." }
              ].map((service, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ y: -5 }}
                  className="p-8 rounded-3xl bg-[#FAFAFA] border border-gray-100 hover:border-blue-100 hover:shadow-xl hover:shadow-blue-50 transition-all"
                >
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-sm mb-6">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{service.desc}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-16 p-8 rounded-3xl bg-blue-600 text-white flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                  <GraduationCap className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-xl font-bold">Ingresos Universitarios</h4>
                  <p className="text-blue-100">Preparación intensiva para Ingeniería y Ciencias Económicas.</p>
                </div>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                {["Simulacros de examen", "Material exclusivo", "Seguimiento personalizado", "Resolución de guías"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm font-medium">
                    <CheckCircle2 className="w-4 h-4 text-blue-200" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Modalities */}
        <section id="modalidad" className="py-24 bg-[#FAFAFA]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="lg:w-1/2">
                <h2 className="text-4xl font-bold mb-6 leading-tight">Flexibilidad total para tu aprendizaje</h2>
                <p className="text-gray-600 text-lg mb-10">
                  Entiendo que cada alumno tiene necesidades distintas. Por eso, ofrezco tres modalidades adaptadas a tu ritmo de vida.
                </p>
                
                <div className="space-y-6">
                  {[
                    { icon: <Laptop className="w-6 h-6" />, title: "Virtuales en vivo", desc: "Clases interactivas mediante pizarra digital y videollamada HD." },
                    { icon: <Home className="w-6 h-6" />, title: "A domicilio", desc: "Voy a donde estés para mayor comodidad (consultar zona)." },
                    { icon: <MapPin className="w-6 h-6" />, title: "En mi estudio", desc: "Ambiente tranquilo y equipado para máxima concentración." }
                  ].map((mod, i) => (
                    <div key={i} className="flex gap-5 p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
                      <div className="flex-shrink-0 w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                        {mod.icon}
                      </div>
                      <div>
                        <h4 className="font-bold mb-1">{mod.title}</h4>
                        <p className="text-gray-500 text-sm">{mod.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="lg:w-1/2 relative">
                <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
                  <img 
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1000" 
                    alt="Estudiante estudiando" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-3xl shadow-xl border border-gray-100 hidden md:block">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                        <Laptop className="w-6 h-6" />
                      </div>
                      <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-800">Clase en vivo</p>
                      <p className="text-xs text-gray-500 flex items-center gap-1.5 mt-0.5">
                        <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span>
                        Grabando sesión
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Workshops / IA Section */}
        <section id="talleres" className="py-24 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="bg-gray-900 rounded-[3rem] p-8 md:p-16 relative overflow-hidden">
              <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <span className="text-blue-400 font-bold text-sm uppercase tracking-widest mb-4 block">Talleres Complementarios</span>
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
                    No solo qué estudiar, sino <span className="text-blue-400">cómo hacerlo mejor.</span>
                  </h2>
                  
                  <div className="grid gap-8">
                    <div className="flex gap-6">
                      <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-blue-400 flex-shrink-0">
                        <Brain className="w-7 h-7" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-white mb-2">Técnicas de Estudio</h4>
                        <p className="text-gray-400 leading-relaxed">
                          Métodos de organización, memorización activa y gestión del tiempo para optimizar tus horas de estudio.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-6">
                      <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-blue-400 flex-shrink-0">
                        <Cpu className="w-7 h-7" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-white mb-2">IA para Estudiantes</h4>
                        <p className="text-gray-400 leading-relaxed">
                          Aprende a usar herramientas de Inteligencia Artificial para explicar conceptos complejos, resumir y practicar.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-1 rounded-3xl shadow-2xl">
                    <div className="bg-gray-900 rounded-[1.4rem] p-8">
                      <div className="space-y-4">
                        <div className="h-2 w-20 bg-blue-500/20 rounded-full" />
                        <div className="h-4 w-full bg-white/5 rounded-lg animate-pulse" />
                        <div className="h-4 w-3/4 bg-white/5 rounded-lg animate-pulse" />
                        <div className="pt-4 flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-500" />
                          <div className="h-3 w-32 bg-white/20 rounded-full" />
                        </div>
                        <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                          <p className="text-blue-300 text-sm italic">
                            "La IA no reemplaza al estudio, potencia tu capacidad de entender."
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Decorative glow */}
                  <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-600/20 rounded-full blur-[100px]" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sobre Mí Section */}
        <section id="sobre-mi" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-[2.5rem] p-8 md:p-12 border border-gray-100 shadow-sm flex flex-col md:flex-row items-center gap-10 hover:shadow-md transition-shadow">
                <div className="w-48 h-48 md:w-56 md:h-56 flex-shrink-0 relative group">
                  <div className="absolute inset-0 bg-blue-600 rounded-full blur-2xl opacity-20 group-hover:opacity-30 transition-opacity translate-y-4"></div>
                  <img 
                    src="https://i.imgur.com/GAskzf3.jpg" 
                    alt="Antú Boccalandro" 
                    className="w-full h-full object-cover rounded-full border-4 border-white shadow-lg relative z-10"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="text-center md:text-left">
                  <span className="text-blue-600 font-bold text-sm uppercase tracking-widest mb-2 block">Sobre Mí</span>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Antú Boccalandro</h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-center md:justify-start gap-4 text-gray-700 bg-white px-4 py-3 rounded-2xl border border-gray-100 shadow-sm">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0">
                        <GraduationCap className="w-5 h-5" />
                      </div>
                      <span className="font-medium text-left">Estudiante de Ciencias de la Computación</span>
                    </div>
                    <div className="flex items-center justify-center md:justify-start gap-4 text-gray-700 bg-white px-4 py-3 rounded-2xl border border-gray-100 shadow-sm">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <span className="font-medium text-left">Chacras de Coria</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contacto" className="py-24 bg-[#FAFAFA]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-4xl mx-auto bg-white rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
              <div className="bg-blue-600 p-12 md:p-20 text-white text-center relative overflow-hidden">
                {/* Decorative background */}
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                  <div className="absolute -top-20 -left-20 w-64 h-64 bg-white rounded-full blur-3xl" />
                  <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-400 rounded-full blur-3xl" />
                </div>
                
                <div className="relative z-10">
                  <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center mx-auto mb-8 backdrop-blur-sm border border-white/20">
                    <MessageSquare className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold mb-6">¿Empezamos?</h2>
                  <p className="text-blue-100 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
                    Escríbeme por WhatsApp contándome qué necesitas preparar y armamos un plan a tu medida.
                  </p>
                  
                  <a 
                    href="https://wa.me/5492617204802?text=Hola%20Antú,%20me%20gustaría%20consultar%20por%20clases%20particulares." 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-3 bg-white text-blue-600 px-8 py-5 rounded-2xl font-bold text-lg hover:bg-blue-50 hover:scale-105 transition-all shadow-lg shadow-blue-900/20"
                  >
                    <MessageSquare className="w-6 h-6" />
                    Contactar por WhatsApp
                  </a>
                  
                  <div className="mt-12 flex items-center justify-center gap-2 text-blue-200 text-sm font-medium">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    Respondo rápido
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-12 border-t border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
              A
            </div>
            <span className="font-bold text-gray-900">Aprobá Mendoza</span>
          </div>
          <p className="text-sm text-gray-400">© 2026 Todos los derechos reservados.</p>
          <div className="flex gap-6 text-gray-400">
            <a href="#" className="hover:text-blue-600 transition-colors"><MessageSquare className="w-5 h-5" /></a>
            <a href="#" className="hover:text-blue-600 transition-colors"><Mail className="w-5 h-5" /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}
