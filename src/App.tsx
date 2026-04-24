import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { 
  BookOpen, 
  GraduationCap, 
  Laptop, 
  Home as HomeIcon, 
  MapPin, 
  Brain, 
  Cpu, 
  ChevronRight, 
  ChevronDown,
  CheckCircle2,
  Mail,
  MessageSquare,
  Calculator,
  Atom,
  TrendingUp,
  Briefcase,
  Send,
  ArrowLeft,
  FileText,
  ExternalLink,
  Plus,
  Trash2,
  Lock,
  LogOut,
  Settings
} from "lucide-react";
import { 
  collection, 
  addDoc, 
  onSnapshot, 
  query, 
  orderBy, 
  deleteDoc, 
  doc,
  Timestamp
} from "firebase/firestore";
import { db } from "./firebase";

// --- Constants & Styles ---
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

// --- Authentication Hook ---
const useAuth = () => {
  const [isAdmin, setIsAdmin] = useState(() => localStorage.getItem("is_admin") === "true");

  const login = (user: string, pass: string) => {
    if (user === "padawan" && pass === "24/1/2007") {
      localStorage.setItem("is_admin", "true");
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem("is_admin");
    setIsAdmin(false);
  };

  return { isAdmin, login, logout };
};

// --- Components ---

const Navbar = () => {
  const [isRecursosHovered, setIsRecursosHovered] = useState(false);
  const { isAdmin } = useAuth();

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl transition-transform group-hover:scale-110">
            A
          </div>
          <span className="font-semibold text-lg tracking-tight">Aprobá Mendoza</span>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <Link to="/servicios" className="hover:text-blue-600 transition-colors">Servicios</Link>
          <Link to="/modalidad" className="hover:text-blue-600 transition-colors">Modalidad</Link>
          <Link to="/talleres" className="hover:text-blue-600 transition-colors">Talleres</Link>
          
          <div 
            className="relative group py-4"
            onMouseEnter={() => setIsRecursosHovered(true)}
            onMouseLeave={() => setIsRecursosHovered(false)}
          >
            <Link to="/recursos" className="flex items-center gap-1 hover:text-blue-600 transition-colors font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-lg">
              Recursos
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isRecursosHovered ? 'rotate-180' : ''}`} />
            </Link>
            
            <AnimatePresence>
              {isRecursosHovered && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 w-56 bg-white border border-gray-100 rounded-2xl shadow-xl p-2 mt-2"
                >
                  <Link to="/recursos" className="flex items-center gap-3 p-3 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-all group">
                    <FileText className="w-5 h-5 text-gray-400 group-hover:text-blue-600" />
                    <span>Guías PDF</span>
                  </Link>
                  {isAdmin && (
                    <Link to="/admin" className="flex items-center gap-3 p-3 rounded-xl hover:bg-orange-50 text-orange-600 font-bold transition-all group">
                      <Settings className="w-5 h-5" />
                      <span>Panel Admin</span>
                    </Link>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <a href="#contacto" className="bg-[#25D366] text-white px-5 py-2.5 rounded-full hover:bg-[#128C7E] transition-all shadow-sm">
            WhatsApp
          </a>
        </div>
      </div>
    </nav>
  );
};

const Footer = () => {
  const { isAdmin, logout } = useAuth();
  
  return (
    <footer className="py-12 border-t border-gray-100 bg-white">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
            A
          </div>
          <span className="font-bold text-gray-900">Aprobá Mendoza</span>
        </div>
        <p className="text-sm text-gray-400">© 2026 Todos los derechos reservados.</p>
        <div className="flex gap-6 items-center">
          {isAdmin ? (
            <button onClick={() => { logout(); window.location.reload(); }} className="text-xs text-red-400 hover:text-red-500 flex items-center gap-1">
              <LogOut className="w-3 h-3" /> Salir Admin
            </button>
          ) : (
            <Link to="/login" className="text-sm text-gray-300 hover:text-blue-400 transition-colors flex items-center gap-1">
              <Lock className="w-3 h-3" /> Acceso Admin
            </Link>
          )}
        </div>
      </div>
    </footer>
  );
};

const WhatsAppForm = () => {
  const [formData, setFormData] = useState({ name: "", query: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Hola Antú! Mi nombre es ${formData.name}. Tengo la siguiente duda/tema que me gustaría consultar: ${formData.query}`;
    const encMessage = encodeURIComponent(message);
    window.open(`https://wa.me/5492617204802?text=${encMessage}`, "_blank");
  };

  return (
    <div className="bg-white p-8 rounded-[2rem] shadow-xl text-left">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Nombre</label>
          <input 
            type="text" 
            required 
            placeholder="Tu nombre"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#25D366] outline-none transition-all"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Duda o Tema</label>
          <textarea 
            required 
            placeholder="¿En qué te puedo ayudar?"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#25D366] outline-none transition-all h-32 resize-none"
            value={formData.query}
            onChange={(e) => setFormData({ ...formData, query: e.target.value })}
          />
        </div>
        <button 
          type="submit"
          className="w-full bg-[#25D366] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#128C7E] transition-all shadow-lg shadow-green-100"
        >
          <Send className="w-5 h-5" />
          Enviar a WhatsApp
        </button>
      </form>
    </div>
  );
};

// --- Pages ---

const HomePage = () => {
  return (
    <motion.div initial="initial" animate="animate" exit={{ opacity: 0 }}>
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden bg-dot-pattern">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#FAFAFA] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div variants={staggerContainer} className="max-w-3xl">
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
            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4">
              <a 
                href="#contacto" 
                className="flex items-center justify-center gap-2 bg-[#25D366] text-white px-8 py-4 rounded-2xl font-semibold hover:bg-[#128C7E] transition-all shadow-lg shadow-green-100 group"
              >
                WhatsApp
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <Link to="/servicios" className="flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 px-8 py-4 rounded-2xl font-semibold hover:bg-gray-50 transition-all">
                Ver servicios detallados
              </Link>
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
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Materias</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">Preparación enfocada a resultados y entendimiento</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Calculator className="w-8 h-8" />, title: "Matemática", desc: "Clases de apoyo y preparación para todos los niveles." },
              { icon: <Atom className="w-8 h-8" />, title: "Física", desc: "Clases de apoyo y preparación para todos los niveles." },
              { icon: <Brain className="w-8 h-8" />, title: "Técnicas de estudio", desc: "Optimiza tu tiempo y mejora tu aprendizaje." },
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
          <div className="text-center mt-12">
            <Link to="/servicios" className="inline-flex items-center gap-2 text-blue-600 font-bold hover:gap-3 transition-all">
              Ver detalles de cada servicio <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Modalities */}
      <section className="py-24 bg-[#FAFAFA]">
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
                  { icon: <HomeIcon className="w-6 h-6" />, title: "A domicilio", desc: "Voy a donde estés para mayor comodidad (consultar zona)." },
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
              <div className="mt-10">
                <Link to="/modalidad" className="inline-flex items-center gap-2 text-blue-600 font-bold hover:gap-3 transition-all">
                  Conocer más sobre las modalidades <ChevronRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
            
            <div className="lg:w-1/2 relative">
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1000" 
                  alt="Estudiante estudiando" 
                  className="w-full h-full object-cover"
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
      <section className="py-24 bg-white overflow-hidden">
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
                        Métodos de organización, memorización activa y gestión del tiempo.
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
                        Aprende a usar herramientas de Inteligencia Artificial para potenciar tu estudio.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-12">
                  <Link to="/talleres" className="inline-flex items-center gap-2 text-blue-400 font-bold hover:gap-3 transition-all">
                    Explorar talleres en profundidad <ChevronRight className="w-5 h-5" />
                  </Link>
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
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-[2.5rem] p-8 md:p-12 border border-gray-100 shadow-sm flex flex-col md:flex-row items-center gap-10">
              <div className="w-48 h-48 md:w-56 md:h-56 flex-shrink-0 relative group">
                <div className="absolute inset-0 bg-blue-600 rounded-full blur-2xl opacity-20 group-hover:opacity-30 transition-opacity translate-y-4"></div>
                <img 
                  src="https://i.imgur.com/GAskzf3.jpg" 
                  alt="Antú Boccalandro" 
                  className="w-full h-full object-cover rounded-full border-4 border-white shadow-lg relative z-10"
                />
              </div>
              <div className="text-center md:text-left">
                <span className="text-blue-600 font-bold text-sm uppercase tracking-widest mb-2 block">Sobre Mí</span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Antú Boccalandro</h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-gray-700 bg-white px-4 py-3 rounded-2xl border border-gray-100 shadow-sm">
                    <GraduationCap className="w-5 h-5 text-blue-600" />
                    <span className="font-medium">Estudiante de Ciencias de la Computación</span>
                  </div>
                  <div className="flex items-center gap-4 text-gray-700 bg-white px-4 py-3 rounded-2xl border border-gray-100 shadow-sm">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    <span className="font-medium">Chacras de Coria, Mendoza</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

const ServiciosPage = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-24 px-6 max-w-7xl mx-auto min-h-[60vh]">
      <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-blue-600 mb-12 transition-colors">
        <ArrowLeft className="w-5 h-5" /> Volver al Inicio
      </Link>
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Nuestros Servicios</h1>
        <p className="text-gray-500 text-lg">Soluciones personalizadas para cada etapa de tu formación académica.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          { 
            title: "Clases particulares por tema específico", 
            desc: "Nivel secundaria y universidad. Explicación detallada de conceptos puntuales que te cuestan entender.", 
            icon: <BookOpen />,
          },
          { 
            title: "Preparación para exámen urgente", 
            desc: "Sesiones intensivas enfocadas en los temas clave del examen. Estrategias de resolución rápida.", 
            icon: <Calculator />,
          },
          { 
            title: "Ayuda con trabajos prácticos", 
            desc: "Guía y resolución paso a paso para que aprendas mientras completas tus entregas obligatorias.", 
            icon: <FileText />,
          },
          { 
            title: "Ayuda con proyectos finales", 
            desc: "Apoyo técnico en programación, diseño de algoritmos o proyectos de ingeniería.", 
            icon: <Cpu />,
          },
          { 
            title: "Preparación para pre-universitarios", 
            desc: "Seguimiento completo para el ingreso a Ingeniería y Ciencias Económicas. Desde la base hasta el nivel requerido.", 
            icon: <GraduationCap />,
          },
          { 
            title: "Aspirantes de ingreso", 
            desc: "Nivelatorio para quienes están por arrancar la facultad y quieren ir con ventaja en matemática y física.", 
            icon: <TrendingUp />,
          }
        ].map((s, i) => (
          <div key={i} className="p-8 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-blue-50 text-blue-600 group-hover:scale-110 transition-transform`}>
              {s.icon}
            </div>
            <h3 className="text-xl font-bold mb-3">{s.title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const ModalidadPage = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-24 px-6 max-w-7xl mx-auto min-h-[60vh]">
    <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-blue-600 mb-12 transition-colors">
      <ArrowLeft className="w-5 h-5" /> Volver
    </Link>
    <div className="grid lg:grid-cols-2 gap-16 items-center">
      <div>
        <h1 className="text-4xl md:text-5xl font-bold mb-8">¿Cómo aprendemos?</h1>
        <div className="space-y-8">
          {[
            { icon: <Laptop />, title: "Virtuales en vivo", text: "Uso de tableta gráfica para que veas la resolución en tiempo real como si fuera un pizarrón. Las clases se pueden grabar." },
            { icon: <HomeIcon />, title: "A domicilio", text: "Comodidad total en tu casa. Disponible en zona de Chacras de Coria y alrededores (consultar disponibilidad)." },
            { icon: <MapPin />, title: "En mi estudio", text: "Tengo un espacio dedicado con todo el material necesario, libros de consulta y un ambiente de cero distracciones." }
          ].map((m, i) => (
            <div key={i} className="flex gap-6">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                {m.icon}
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">{m.title}</h3>
                <p className="text-gray-600">{m.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-[3rem] overflow-hidden shadow-2xl relative">
        <img src="https://images.unsplash.com/photo-1593642532842-98d0fd5ebc1a?auto=format&fit=crop&q=80&w=1000" alt="Setup de estudio" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-blue-600/10" />
      </div>
    </div>
  </motion.div>
);

const TalleresPage = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-24 px-6 max-w-7xl mx-auto min-h-[60vh]">
    <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-blue-600 mb-12 transition-colors">
      <ArrowLeft className="w-5 h-5" /> Volver
    </Link>
    <div className="bg-gray-900 rounded-[3rem] p-12 text-white text-center mb-16">
      <h1 className="text-4xl md:text-6xl font-bold mb-6">Talleres de <span className="text-blue-400">Alto Rendimiento</span></h1>
      <p className="text-gray-400 max-w-2xl mx-auto text-lg">Más allá de las materias, te enseño el sistema para que dejes de sufrir con el estudio.</p>
    </div>
    <div className="grid md:grid-cols-2 gap-12">
      <div className="p-10 bg-white border border-gray-100 rounded-[2.5rem] shadow-sm">
        <Brain className="w-12 h-12 text-blue-600 mb-6" />
        <h2 className="text-2xl font-bold mb-4">Técnicas de Estudio</h2>
        <ul className="space-y-4 text-gray-600">
          <li className="flex gap-2"><CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" /> Memorización activa vs Pasiva</li>
          <li className="flex gap-2"><CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" /> Método Feynman para entender conceptos</li>
          <li className="flex gap-2"><CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" /> Planificación por bloques de tiempo</li>
        </ul>
      </div>
      <div className="p-10 bg-white border border-gray-100 rounded-[2.5rem] shadow-sm">
        <Cpu className="w-12 h-12 text-blue-600 mb-6" />
        <h2 className="text-2xl font-bold mb-4">IA para Estudiantes</h2>
        <ul className="space-y-4 text-gray-600">
          <li className="flex gap-2"><CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" /> Prompt engineering para aprender</li>
          <li className="flex gap-2"><CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" /> Herramientas de resumen inteligentes</li>
          <li className="flex gap-2"><CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" /> Generación de ejercicios personalizados</li>
        </ul>
      </div>
    </div>
  </motion.div>
);

const RecursosPage = () => {
  const [guides, setGuides] = useState<any[]>([]);

  useEffect(() => {
    const q = query(collection(db, "guides"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setGuides(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  const subjects = ["Matemática", "Física", "Programación e IA", "Técnicas de Estudio"];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-24 px-6 max-w-7xl mx-auto min-h-[60vh]">
      <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-blue-600 mb-12 transition-colors">
        <ArrowLeft className="w-5 h-5" /> Volver
      </Link>
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Recursos Gratuitos</h1>
        <p className="text-gray-500">Material de apoyo seleccionado para alumnos de Aprobá Mendoza.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {subjects.map((subject, idx) => {
          const subjectGuides = guides.filter(g => g.subject === subject);
          return (
            <div key={idx} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                {subject}
              </h2>
              <div className="space-y-3">
                {subjectGuides.length > 0 ? (
                  subjectGuides.map((guide) => (
                    <a 
                      key={guide.id} 
                      href={guide.url} 
                      target="_blank" rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-xl group transition-all hover:bg-blue-50"
                    >
                      <div className="overflow-hidden">
                        <p className="text-sm font-bold text-gray-700 truncate">{guide.title}</p>
                        {guide.topic && <p className="text-[10px] text-gray-400 italic">Tema: {guide.topic}</p>}
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-300 group-hover:text-blue-600 flex-shrink-0" />
                    </a>
                  ))
                ) : (
                  <p className="text-xs text-gray-400 italic">No hay guías disponibles aún.</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(username, password)) {
      window.location.reload(); // Force refresh to update useAuth state across components
      navigate("/admin");
    } else {
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6 bg-[#FAFAFA]">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white p-10 rounded-[3rem] shadow-xl border border-gray-100 text-center"
      >
        <Lock className="w-12 h-12 text-blue-600 mx-auto mb-6" />
        <h2 className="text-2xl font-bold mb-8">Administración</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="text-left">
            <label className="text-xs font-bold uppercase text-gray-400 ml-2 mb-1 block">Usuario</label>
            <input 
              type="text" required
              className="w-full px-5 py-4 rounded-2xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-600 transition-all font-medium"
              value={username} onChange={e => setUsername(e.target.value)}
            />
          </div>
          <div className="text-left">
            <label className="text-xs font-bold uppercase text-gray-400 ml-2 mb-1 block">Contraseña</label>
            <input 
              type="password" required
              className="w-full px-5 py-4 rounded-2xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-600 transition-all font-medium"
              value={password} onChange={e => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-red-500 text-sm font-medium mt-2">{error}</p>}
          <button type="submit" className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl hover:bg-blue-700 transition-all mt-6 shadow-xl shadow-blue-100">
            Ingresar al Panel
          </button>
        </form>
      </motion.div>
    </div>
  );
};

const AdminDashboard = () => {
  const { isAdmin, logout } = useAuth();
  const [guides, setGuides] = useState<any[]>([]);
  const [newGuide, setNewGuide] = useState({ title: "", subject: "Matemática", topic: "", url: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin) {
      navigate("/login");
      return;
    }
    const q = query(collection(db, "guides"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setGuides(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, [isAdmin, navigate]);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, "guides"), {
        ...newGuide,
        createdAt: Timestamp.now()
      });
      setNewGuide({ title: "", subject: "Matemática", topic: "", url: "" });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este recurso?")) {
      await deleteDoc(doc(db, "guides", id));
    }
  };

  if (!isAdmin) return null;

  return (
    <div className="py-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Settings className="w-8 h-8 text-blue-600" />
          Dashboard de Recursos
        </h1>
        <button 
          onClick={() => { logout(); navigate("/"); window.location.reload(); }} 
          className="text-red-500 font-bold flex items-center gap-2 hover:bg-red-50 border border-red-100 px-6 py-3 rounded-2xl transition-all"
        >
          <LogOut className="w-5 h-5" /> Cerrar Sesión
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Creation Form */}
        <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm flex flex-col">
          <h2 className="text-xl font-bold mb-8 flex items-center gap-2 text-gray-800">
            <Plus className="w-6 h-6 text-blue-600" /> Subir Nueva Guía PDF
          </h2>
          <form onSubmit={handleAdd} className="space-y-5">
            <div>
              <label className="text-xs font-bold uppercase text-gray-400 ml-2 mb-1 block">Título del Documento</label>
              <input 
                type="text" placeholder="Ej: Guía Básica de Álgebra" required
                className="w-full px-5 py-4 rounded-2xl border border-gray-100 bg-[#FAFAFA] outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                value={newGuide.title} onChange={e => setNewGuide({...newGuide, title: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="text-xs font-bold uppercase text-gray-400 ml-2 mb-1 block">Materia</label>
                <select 
                  className="w-full px-5 py-4 rounded-2xl border border-gray-100 bg-[#FAFAFA] outline-none focus:ring-2 focus:ring-blue-600 transition-all font-medium"
                  value={newGuide.subject} onChange={e => setNewGuide({...newGuide, subject: e.target.value})}
                >
                  <option>Matemática</option>
                  <option>Física</option>
                  <option>Programación e IA</option>
                  <option>Técnicas de Estudio</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold uppercase text-gray-400 ml-2 mb-1 block">Tema Específico</label>
                <input 
                  type="text" placeholder="Ej: Derivadas"
                  className="w-full px-5 py-4 rounded-2xl border border-gray-100 bg-[#FAFAFA] outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                  value={newGuide.topic} onChange={e => setNewGuide({...newGuide, topic: e.target.value})}
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-bold uppercase text-gray-400 ml-2 mb-1 block">URL de Descarga (PDF)</label>
              <input 
                type="url" placeholder="Enlace de OneDrive, Google Drive, etc." required
                className="w-full px-5 py-4 rounded-2xl border border-gray-100 bg-[#FAFAFA] outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                value={newGuide.url} onChange={e => setNewGuide({...newGuide, url: e.target.value})}
              />
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-blue-600 text-white font-bold py-5 rounded-2xl hover:bg-blue-700 disabled:bg-gray-300 transition-all shadow-xl shadow-blue-100"
            >
              {loading ? "Procesando..." : "Publicar Recurso"}
            </button>
          </form>
        </div>

        {/* Existing Guides Management */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-8 px-2">
            <h2 className="text-xl font-bold text-gray-800">Material Existente</h2>
            <span className="text-xs bg-gray-100 text-gray-500 px-3 py-1.5 rounded-full font-bold">{guides.length} ARCHIVOS</span>
          </div>
          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
            {guides.length === 0 ? (
              <div className="text-center py-20 bg-gray-50 rounded-[3rem] border border-dashed border-gray-200">
                <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-400 italic">No has subido ningún recurso todavía.</p>
              </div>
            ) : (
              guides.map(guide => (
                <div key={guide.id} className="bg-white p-6 rounded-[2rem] border border-gray-50 flex items-center justify-between hover:shadow-lg transition-all group">
                  <div className="overflow-hidden">
                    <h4 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors truncate">{guide.title}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-500 bg-blue-50 px-2 py-0.5 rounded-md">
                        {guide.subject}
                      </span>
                      {guide.topic && (
                        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                          • {guide.topic}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <a 
                      href={guide.url} target="_blank" rel="noopener noreferrer"
                      className="p-3 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                      title="Ver archivo"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                    <button 
                      onClick={() => handleDelete(guide.id)}
                      className="p-3 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                      title="Eliminar"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Layout Wrapper ---
const Layout = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const isAuthPage = pathname === "/login" || pathname === "/admin";

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#1A1A1A] font-sans selection:bg-blue-100">
      <Navbar />
      <main className="pt-20">
        <AnimatePresence mode="wait">
          <div key={pathname}>
            {children}
          </div>
        </AnimatePresence>

        {/* Contact Section - Persistent except in admin pages */}
        {!isAuthPage && (
          <section id="contacto" className="py-24 px-6">
            <div className="max-w-7xl mx-auto">
              <div 
                className="max-w-5xl mx-auto rounded-[3rem] overflow-hidden bg-[#25D366] text-white flex flex-col lg:flex-row shadow-2xl shadow-green-100 border border-green-500/10"
              >
                <div className="p-12 lg:p-20 lg:w-1/2 flex flex-col justify-center text-center lg:text-left relative">
                   <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                    <div className="absolute -top-20 -left-20 w-64 h-64 bg-white rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-400 rounded-full blur-3xl opacity-20" />
                  </div>
                  <div className="relative z-10">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">¿Preparado para aprobar?</h2>
                    <p className="text-white/90 text-lg mb-8 leading-relaxed">
                      Escríbeme con tus dudas y armamos tu plan de estudio hoy mismo.
                    </p>
                    <div className="flex items-center justify-center lg:justify-start gap-3 text-white font-medium text-sm">
                      <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-glow shadow-red-500"></span>
                      En línea ahora
                    </div>
                  </div>
                </div>
                <div className="p-8 lg:p-12 lg:w-1/2 bg-[#128C7E]/5 backdrop-blur-sm">
                  <WhatsAppForm />
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/servicios" element={<ServiciosPage />} />
          <Route path="/modalidad" element={<ModalidadPage />} />
          <Route path="/talleres" element={<TalleresPage />} />
          <Route path="/recursos" element={<RecursosPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </Router>
  );
}
