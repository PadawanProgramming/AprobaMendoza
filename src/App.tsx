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
  Settings,
  X,
  Upload,
  Zap
} from "lucide-react";
import { useParams } from "react-router-dom";

// --- Types ---
interface WorkshopSection {
  id?: number;
  title: string;
  content: string;
}

interface Workshop {
  id?: number;
  title: string;
  description: string;
  coverUrl?: string;
  videoUrl?: string;
  syllabus: WorkshopSection[];
  createdAt: string;
}

interface Guide {
  id?: number;
  title: string;
  subject: string;
  topic?: string;
  url: string;
  fileName?: string;
  createdAt: string;
}

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

  const login = async (user: string, pass: string) => {
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user, pass })
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem("is_admin", "true");
        setIsAdmin(true);
        return true;
      }
    } catch (e) {
      console.error(e);
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem("is_admin");
    setIsAdmin(false);
  };

  return { isAdmin, login, logout };
};

// --- Logo Component ---
const Logo = ({ size = "md" }: { size?: "sm" | "md" | "lg" }) => {
  const dimensions = {
    sm: "w-8 h-8 text-sm",
    md: "w-10 h-10 text-xl",
    lg: "w-12 h-12 text-2xl"
  }[size];

  return (
    <div className={`${dimensions} bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold transition-transform hover:scale-110 shadow-lg shadow-blue-200`}>
      A
    </div>
  );
};

// --- Components ---

const Navbar = () => {
  const [isRecursosHovered, setIsRecursosHovered] = useState(false);
  const { isAdmin } = useAuth();

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <Logo />
          <span className="font-semibold text-lg tracking-tight">Aprobá Mendoza</span>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <Link to="/servicios" className="hover:text-blue-600 transition-all hover:-translate-y-0.5">Servicios</Link>
          <Link to="/modalidad" className="hover:text-blue-600 transition-all hover:-translate-y-0.5">Modalidad</Link>
          <Link to="/talleres" className="hover:text-blue-600 transition-all hover:-translate-y-0.5">Talleres</Link>
          
          {isAdmin && (
            <Link to="/admin" className="text-orange-600 font-bold hover:text-orange-700 transition-all hover:-translate-y-0.5 flex items-center gap-2 bg-orange-50 px-4 py-2 rounded-xl border border-orange-100">
              <Settings className="w-4 h-4" />
              Panel Admin
            </Link>
          )}

          <div 
            className="relative group py-4"
            onMouseEnter={() => setIsRecursosHovered(true)}
            onMouseLeave={() => setIsRecursosHovered(false)}
          >
            <Link to="/recursos" className="flex items-center gap-2 hover:text-blue-600 transition-all font-bold text-blue-600 bg-blue-50/50 hover:bg-blue-50 px-4 py-2 rounded-xl border border-blue-100/50">
              Recursos Gratis
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
                    <span>Guías PDF Gratuitas</span>
                  </Link>
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
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#25D366] outline-none transition-all text-gray-900 placeholder:text-gray-400"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Duda o Tema</label>
          <textarea 
            required 
            placeholder="¿En qué te puedo ayudar?"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#25D366] outline-none transition-all h-32 resize-none text-gray-900 placeholder:text-gray-400"
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
      {/* Urgency / Exam Help Section */}
      <section className="pt-28 pb-12 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            whileHover={{ scale: 1.01 }}
            className="bg-gradient-to-r from-red-600 to-red-700 rounded-[3rem] p-8 md:p-14 text-white relative overflow-hidden shadow-2xl shadow-red-200 border border-red-500"
          >
            {/* Background elements */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 blur-[100px] rounded-full" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-black/10 blur-[80px] rounded-full" />
            
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
              <div className="text-center lg:text-left max-w-2xl">
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-[0.2em] mb-8 border border-white/30">
                  <Zap className="w-4 h-4 text-yellow-300 fill-yellow-300" />
                  Atención Inmediata
                </div>
                <h2 className="text-4xl md:text-6xl font-black mb-8 leading-[1.05] tracking-tight">
                  ¿Tenés un examen <br />
                  <span className="text-yellow-300 relative">
                    ¡MAÑANA MISMO!
                    <svg className="absolute -bottom-2 left-0 w-full" height="10" viewBox="0 0 200 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 9C50 1 150 1 199 9" stroke="#FDE047" strokeWidth="3" strokeLinecap="round"/>
                    </svg>
                  </span>
                </h2>
                <p className="text-red-50 text-xl md:text-2xl font-medium opacity-90 leading-relaxed mb-4">
                  No entres en pánico. Podemos prepararlo juntos en tiempo récord. 
                </p>
                <div className="flex items-center justify-center lg:justify-start gap-3 text-red-100 font-bold">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Respuesta en menos de 30 minutos</span>
                </div>
              </div>
              
              <div className="flex-shrink-0 w-full lg:w-auto">
                <a 
                  href={`https://wa.me/5492617204802?text=${encodeURIComponent("HOLA ANTÚ! NECESITO AYUDA YA MISMO! Tengo un examen urgente que preparar y necesito clases hoy.")}`}
                  target="_blank" rel="noopener noreferrer"
                  className="group relative flex items-center justify-center gap-4 bg-white text-red-600 px-12 py-7 rounded-[2rem] font-black text-2xl hover:bg-yellow-300 hover:text-red-700 transition-all shadow-2xl active:scale-95 w-full lg:w-auto"
                >
                  <span className="relative z-10">¡AYUDA YA!</span>
                  <ChevronRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
                  {/* Decorative pulse ring */}
                  <div className="absolute inset-0 rounded-[2rem] border-4 border-white/50 animate-ping pointer-events-none" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

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
            <motion.div 
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-gray-50 to-white rounded-[2.5rem] p-8 md:p-12 border border-gray-100 shadow-xl shadow-gray-100/50 flex flex-col md:flex-row items-center gap-10"
            >
              <div className="w-48 h-48 md:w-56 md:h-56 flex-shrink-0 relative group">
                <div className="absolute inset-0 bg-blue-600 rounded-full blur-2xl opacity-20 group-hover:opacity-30 transition-opacity translate-y-4"></div>
                <img 
                  src="https://i.imgur.com/GAskzf3.jpg" 
                  alt="Antú Boccalandro" 
                  className="w-full h-full object-cover rounded-full border-4 border-white shadow-lg relative z-10 hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="text-center md:text-left">
                <span className="text-blue-600 font-bold text-sm uppercase tracking-widest mb-2 block">Sobre Mí</span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Antú Boccalandro</h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-gray-700 bg-white/80 backdrop-blur-sm px-6 py-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <GraduationCap className="w-5 h-5 text-blue-600" />
                    <span className="font-semibold text-gray-800">Estudiante de Ciencias de la Computación</span>
                  </div>
                  <div className="flex items-center gap-4 text-gray-700 bg-white/80 backdrop-blur-sm px-6 py-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    <span className="font-semibold text-gray-800">Chacras de Coria, Mendoza</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

const ServiciosPage = () => {
  const [selectedService, setSelectedService] = useState<{ title: string; desc: string } | null>(null);

  const services = [
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
  ];

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
        {services.map((s, i) => (
          <button 
            key={i} 
            onClick={() => setSelectedService(s)}
            className="p-8 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all group text-left"
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-blue-50 text-blue-600 group-hover:scale-110 transition-transform`}>
              {s.icon}
            </div>
            <h3 className="text-xl font-bold mb-3">{s.title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{s.desc}</p>
            <div className="mt-6 text-blue-600 font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
              Me interesa <ChevronRight className="w-4 h-4" />
            </div>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-[3rem] p-10 shadow-2xl overflow-hidden"
            >
              <button 
                onClick={() => setSelectedService(null)}
                className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="mb-8">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Consultar por</h3>
                <p className="text-blue-600 font-medium">{selectedService.title}</p>
              </div>

              <ServiceWhatsAppForm serviceTitle={selectedService.title} onClose={() => setSelectedService(null)} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const ServiceWhatsAppForm = ({ serviceTitle, onClose }: { serviceTitle: string; onClose: () => void }) => {
  const [formData, setFormData] = useState({ name: "", query: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Hola Antú! Mi nombre es ${formData.name}. Estoy interesado en el servicio de "${serviceTitle}".\n\nConsulta:\n${formData.query}`;
    const encMessage = encodeURIComponent(message);
    window.open(`https://wa.me/5492617204802?text=${encMessage}`, "_blank");
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-xs font-bold uppercase text-gray-400 mb-1 ml-1">Tu Nombre</label>
        <input 
          type="text" 
          required 
          placeholder="Ej: Juan Pérez"
          className="w-full px-5 py-4 rounded-2xl border border-gray-100 bg-gray-50 outline-none focus:ring-2 focus:ring-blue-600 transition-all"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>
      <div>
        <label className="block text-xs font-bold uppercase text-gray-400 mb-1 ml-1">Mensaje o duda</label>
        <textarea 
          required 
          placeholder="Escribe aquí tu consulta..."
          className="w-full px-5 py-4 rounded-2xl border border-gray-100 bg-gray-50 outline-none focus:ring-2 focus:ring-blue-600 transition-all h-32 resize-none"
          value={formData.query}
          onChange={(e) => setFormData({ ...formData, query: e.target.value })}
        />
      </div>
      <button 
        type="submit"
        className="w-full bg-[#25D366] text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-[#128C7E] transition-all shadow-xl shadow-green-100"
      >
        <Send className="w-5 h-5" /> Enviar Consulta
      </button>
    </form>
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

const TalleresPage = () => {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkshops = async () => {
      try {
        const res = await fetch('/api/workshops');
        const data = await res.json();
        setWorkshops(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchWorkshops();
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-24 px-6 max-w-7xl mx-auto min-h-[60vh]">
      <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-blue-600 mb-12 transition-colors group">
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Volver
      </Link>
      <div className="bg-gray-900 rounded-[3rem] p-12 text-white text-center mb-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 blur-[100px] rounded-full" />
        <div className="relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Talleres de <span className="text-blue-400">Alto Rendimiento</span></h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">Plataforma de formación online: Aprende técnicas, herramientas y metodologías para potenciar tu estudio.</p>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : workshops.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-[3rem] border border-dashed border-gray-200">
          <Laptop className="w-16 h-16 text-gray-200 mx-auto mb-4" />
          <p className="text-gray-500 font-medium text-lg">Próximamente nuevos talleres...</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {workshops.map((workshop) => (
            <Link 
              key={workshop.id} 
              to={`/talleres/${workshop.id}`}
              className="group bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col"
            >
              <div className="aspect-video relative overflow-hidden bg-gray-100">
                {workshop.coverUrl ? (
                  <img src={workshop.coverUrl} alt={workshop.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-blue-50 text-blue-200">
                    <Laptop className="w-12 h-12" />
                  </div>
                )}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-blue-600 uppercase tracking-widest shadow-sm">
                  Online
                </div>
              </div>
              <div className="p-8 flex-grow flex flex-col">
                <h3 className="text-2xl font-bold mb-4 group-hover:text-blue-600 transition-colors line-clamp-2">{workshop.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-8 line-clamp-3">
                  {workshop.description}
                </p>
                <div className="mt-auto flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-400 text-xs font-semibold uppercase tracking-wider">
                    <BookOpen className="w-4 h-4" />
                    {workshop.syllabus.length} Secciones
                  </div>
                  <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all transform group-hover:rotate-45">
                    <ArrowLeft className="w-5 h-5 rotate-180" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </motion.div>
  );
};

const WorkshopDetailPage = () => {
  const { workshopId } = useParams();
  const [workshop, setWorkshop] = useState<Workshop | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeAccordion, setActiveAccordion] = useState<number | null>(0);

  useEffect(() => {
    const fetchWorkshop = async () => {
      if (!workshopId) return;
      try {
        const res = await fetch(`/api/workshops/${workshopId}`);
        if (res.ok) {
          const data = await res.json();
          setWorkshop(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchWorkshop();
  }, [workshopId]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (!workshop) return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <div className="w-20 h-20 bg-red-50 text-red-500 rounded-3xl flex items-center justify-center mb-6">
        <ArrowLeft className="w-10 h-10" />
      </div>
      <h1 className="text-3xl font-bold mb-4">Taller no encontrado</h1>
      <Link to="/talleres" className="text-blue-600 font-bold hover:underline">Volver a los talleres</Link>
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pb-24">
      {/* Header / Hero */}
      <div className="bg-gray-900 pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <Link to="/talleres" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-10 transition-colors group">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Volver a Talleres
          </Link>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block px-3 py-1 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest rounded-full mb-6">
                Especialización Online
              </span>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
                {workshop.title}
              </h1>
              <p className="text-gray-400 text-lg md:text-xl leading-relaxed mb-10">
                {workshop.description}
              </p>
              <div className="flex flex-wrap gap-6 text-white/60 text-sm font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-500" /> Certificado de asistencia
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-500" /> Material descargable
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="aspect-video rounded-[2.5rem] overflow-hidden bg-black/50 border border-white/10 shadow-2xl relative">
                {workshop.videoUrl ? (
                  <iframe 
                    src={workshop.videoUrl} 
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : workshop.coverUrl ? (
                  <img src={workshop.coverUrl} alt="Portada" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white/10">
                    <Laptop className="w-24 h-24" />
                  </div>
                )}
              </div>
              {/* Floating accents */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-600/30 blur-[60px] rounded-full -z-10" />
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-indigo-600/30 blur-[50px] rounded-full -z-10" />
            </div>
          </div>
        </div>
      </div>

      {/* Syllabus & Content */}
      <div className="max-w-4xl mx-auto px-6 mt-20">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
            <BookOpen className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 font-sans">Temario y Plan de Estudios</h2>
        </div>

        <div className="space-y-4">
          {workshop.syllabus.map((section, idx) => (
            <div 
              key={idx} 
              className={`bg-white rounded-3xl border transition-all duration-300 ${activeAccordion === idx ? 'border-blue-200 ring-4 ring-blue-50' : 'border-gray-100 hover:border-gray-200'}`}
            >
              <button 
                onClick={() => setActiveAccordion(activeAccordion === idx ? null : idx)}
                className="w-full px-8 py-6 flex items-center justify-between text-left group"
              >
                <div className="flex items-center gap-4">
                  <span className="w-8 h-8 rounded-lg bg-gray-50 text-gray-400 font-bold text-xs flex items-center justify-center group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                    0{idx + 1}
                  </span>
                  <h3 className="font-bold text-gray-800 text-lg">{section.title}</h3>
                </div>
                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${activeAccordion === idx ? 'rotate-180 text-blue-600' : ''}`} />
              </button>
              
              <AnimatePresence>
                {activeAccordion === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-8 pt-2">
                       <div className="h-px bg-gray-100 w-full mb-6" />
                       <div className="whitespace-pre-wrap text-gray-600 leading-relaxed text-sm lg:text-base">
                        {section.content}
                       </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Action Bar */}
        <div className="mt-16 bg-blue-50 rounded-[2.5rem] p-10 flex flex-col md:flex-row items-center justify-between gap-8 border border-blue-100">
          <div>
            <h4 className="text-xl font-bold text-blue-900 mb-2">¿Te interesa este taller?</h4>
            <p className="text-blue-700/80">Inscríbete ahora y potencia tus habilidades de estudio.</p>
          </div>
          <a 
            href={`https://wa.me/5492617204802?text=${encodeURIComponent(`Hola! Me interesa el taller: ${workshop.title}`)}`}
            target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#25D366] text-white px-8 py-4 rounded-2xl font-bold hover:bg-[#128C7E] transition-all shadow-xl shadow-green-100"
          >
            <Send className="w-5 h-5" /> Inscribirme vía WhatsApp
          </a>
        </div>
      </div>
    </motion.div>
  );
};

const RecursosPage = () => {
  const [guides, setGuides] = useState<Guide[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGuides = async () => {
      try {
        const res = await fetch('/api/guides');
        const data = await res.json();
        setGuides(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchGuides();
  }, []);

  const subjects = ["Matemática", "Física", "Programación e IA", "Técnicas de Estudio"];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-24 px-6 max-w-7xl mx-auto min-h-[60vh]">
      <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-blue-600 mb-12 transition-colors group">
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Volver
      </Link>
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Recursos Gratis</h1>
        <p className="text-gray-500 max-w-xl mx-auto">Explora nuestro material gratuito diseñado para acompañar tu proceso de aprendizaje.</p>
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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(username, password);
    if (success) {
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
  const [guides, setGuides] = useState<Guide[]>([]);
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  
  const [tab, setTab] = useState<"guides" | "workshops">("guides");
  const [loading, setLoading] = useState(false);
  
  // States for new items
  const [newGuide, setNewGuide] = useState({ title: "", subject: "Matemática", topic: "", url: "" });
  const [guideFile, setGuideFile] = useState<File | null>(null);

  const [newWorkshop, setNewWorkshop] = useState<any>({
    title: "",
    description: "",
    videoUrl: "",
    syllabus: [{ title: "", content: "" }]
  });
  const [workshopCover, setWorkshopCover] = useState<File | null>(null);

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const gRes = await fetch('/api/guides');
      const gData = await gRes.json();
      setGuides(gData);

      const wRes = await fetch('/api/workshops');
      const wData = await wRes.json();
      setWorkshops(wData);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (!isAdmin) {
      navigate("/login");
      return;
    }
    fetchData();
  }, [isAdmin, navigate]);

  const handleAddGuide = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('title', newGuide.title);
      formData.append('subject', newGuide.subject);
      formData.append('topic', newGuide.topic);
      if (guideFile) {
        formData.append('file', guideFile);
      } else {
        formData.append('url', newGuide.url);
      }

      await fetch('/api/guides', {
        method: 'POST',
        body: formData
      });

      setNewGuide({ title: "", subject: "Matemática", topic: "", url: "" });
      setGuideFile(null);
      fetchData();
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  const handleAddWorkshop = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('title', newWorkshop.title);
      formData.append('description', newWorkshop.description);
      formData.append('videoUrl', newWorkshop.videoUrl);
      formData.append('syllabus', JSON.stringify(newWorkshop.syllabus.filter((s:any) => s.title.trim())));
      
      if (workshopCover) {
        formData.append('cover', workshopCover);
      }

      await fetch('/api/workshops', {
        method: 'POST',
        body: formData
      });

      setNewWorkshop({
        title: "",
        description: "",
        videoUrl: "",
        syllabus: [{ title: "", content: "" }]
      });
      setWorkshopCover(null);
      fetchData();
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  const handleDelete = async (coll: "guides" | "workshops", id: number) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este item?")) {
      await fetch(`/api/${coll}/${id}`, { method: 'DELETE' });
      fetchData();
    }
  };

  if (!isAdmin) return null;

  return (
    <div className="py-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Settings className="w-8 h-8 text-blue-600" />
          Panel Administrativo
        </h1>
        <div className="flex items-center gap-4">
          <div className="bg-gray-100 p-1.5 rounded-2xl flex gap-2">
            <button 
              onClick={() => setTab("guides")}
              className={`px-6 py-3 rounded-xl text-sm font-bold transition-all ${tab === 'guides' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Recursos
            </button>
            <button 
              onClick={() => setTab("workshops")}
              className={`px-6 py-3 rounded-xl text-sm font-bold transition-all ${tab === 'workshops' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Talleres
            </button>
          </div>
          <button 
            onClick={() => { logout(); navigate("/"); window.location.reload(); }} 
            className="text-red-500 font-bold flex items-center gap-2 hover:bg-red-50 border border-red-100 px-6 py-3 rounded-2xl transition-all"
          >
            <LogOut className="w-5 h-5" /> Salir 
          </button>
        </div>
      </div>

      {tab === "guides" ? (
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Guides Form */}
          <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold mb-8 flex items-center gap-2 text-gray-800">
              <Plus className="w-6 h-6 text-blue-600" /> Nueva Guía PDF
            </h2>
            <form onSubmit={handleAddGuide} className="space-y-5">
              <div>
                <label className="text-xs font-bold uppercase text-gray-400 ml-2 mb-1 block">Título</label>
                <input 
                  type="text" placeholder="Ej: Guía de Física" required
                  className="w-full px-5 py-4 rounded-2xl border border-gray-100 bg-[#FAFAFA] outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                  value={newGuide.title} onChange={e => setNewGuide({...newGuide, title: e.target.value})}
                />
              </div>
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="text-xs font-bold uppercase text-gray-400 ml-2 mb-1 block">Materia</label>
                  <select 
                    className="w-full px-5 py-4 rounded-2xl border border-gray-100 bg-[#FAFAFA]"
                    value={newGuide.subject} onChange={e => setNewGuide({...newGuide, subject: e.target.value})}
                  >
                    <option>Matemática</option>
                    <option>Física</option>
                    <option>Programación e IA</option>
                    <option>Técnicas de Estudio</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold uppercase text-gray-400 ml-2 mb-1 block">Tema</label>
                  <input type="text" className="w-full px-5 py-4 rounded-2xl border border-gray-100 bg-[#FAFAFA]" value={newGuide.topic} onChange={e => setNewGuide({...newGuide, topic: e.target.value})} />
                </div>
              </div>
              
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase text-gray-400 ml-2 mb-1 block">Archivo PDF (Subir directo)</label>
                <div className="relative group">
                  <input 
                    type="file" 
                    accept=".pdf"
                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                    onChange={(e) => setGuideFile(e.target.files?.[0] || null)}
                  />
                  <div className="w-full px-5 py-6 rounded-2xl border-2 border-dashed border-gray-100 bg-gray-50 flex items-center justify-center gap-3 text-gray-400 group-hover:border-blue-200 group-hover:bg-blue-50 transition-all">
                    <Upload className="w-5 h-5" />
                    <span className="font-medium text-sm">
                      {guideFile ? guideFile.name : "Seleccionar archivo PDF"}
                    </span>
                  </div>
                </div>
                {!guideFile && (
                  <>
                    <p className="text-center text-[10px] text-gray-400 font-bold uppercase">o pega un link externo</p>
                    <input type="url" placeholder="URL PDF Externo" className="w-full px-5 py-4 rounded-2xl border border-gray-100 bg-[#FAFAFA]" value={newGuide.url} onChange={e => setNewGuide({...newGuide, url: e.target.value})} />
                  </>
                )}
              </div>

              <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white font-bold py-5 rounded-2xl shadow-xl shadow-blue-100 mt-4">
                {loading ? "Subiendo..." : "Publicar Guía"}
              </button>
            </form>
          </div>
          
          <div className="space-y-4 max-h-[600px] overflow-y-auto">
            {guides.map(guide => (
              <div key={guide.id} className="bg-white p-6 rounded-[2rem] border border-gray-50 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-gray-900">{guide.title}</h4>
                  <span className="text-[10px] font-bold text-blue-500 uppercase">{guide.subject}</span>
                </div>
                <button onClick={() => handleDelete("guides", guide.id)} className="p-3 text-gray-300 hover:text-red-500 transition-all"><Trash2 className="w-5 h-5" /></button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Workshops Form */}
          <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm overflow-y-auto max-h-[80vh]">
            <h2 className="text-xl font-bold mb-8 flex items-center gap-2 text-gray-800">
              <Plus className="w-6 h-6 text-blue-600" /> Nuevo Taller / Curso
            </h2>
            <form onSubmit={handleAddWorkshop} className="space-y-6">
              <div>
                <label className="text-xs font-bold uppercase text-gray-400 ml-2 mb-1 block">Título del Taller</label>
                <input type="text" required className="w-full px-5 py-4 rounded-2xl border border-gray-100 bg-[#FAFAFA]" value={newWorkshop.title} onChange={e => setNewWorkshop({...newWorkshop, title: e.target.value})} />
              </div>
              <div>
                <label className="text-xs font-bold uppercase text-gray-400 ml-2 mb-1 block">Descripción Corta</label>
                <textarea required className="w-full px-5 py-4 rounded-2xl border border-gray-100 bg-[#FAFAFA] h-24 resize-none" value={newWorkshop.description} onChange={e => setNewWorkshop({...newWorkshop, description: e.target.value})} />
              </div>
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="text-xs font-bold uppercase text-gray-400 ml-2 mb-1 block">Foto de Portada</label>
                  <div className="relative group">
                    <input 
                      type="file" 
                      accept="image/*"
                      className="absolute inset-0 opacity-0 cursor-pointer z-10"
                      onChange={(e) => setWorkshopCover(e.target.files?.[0] || null)}
                    />
                    <div className="w-full px-5 py-4 rounded-2xl border-2 border-dashed border-gray-100 bg-gray-50 flex items-center justify-center gap-3 text-gray-400 group-hover:border-blue-200 transition-all">
                      <Upload className="w-4 h-4" />
                      <span className="text-[10px] font-bold">
                        {workshopCover ? workshopCover.name : "Subir Imagen"}
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold uppercase text-gray-400 ml-2 mb-1 block">URL Video Youtube (Embed)</label>
                  <input type="text" placeholder="https://youtube.com/embed/..." className="w-full px-5 py-4 rounded-2xl border border-gray-100 bg-[#FAFAFA]" value={newWorkshop.videoUrl} onChange={e => setNewWorkshop({...newWorkshop, videoUrl: e.target.value})} />
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase text-blue-600">Plan de Estudios (Secciones)</label>
                  <button 
                    type="button" 
                    onClick={() => setNewWorkshop({...newWorkshop, syllabus: [...newWorkshop.syllabus, {title: "", content: ""}]})}
                    className="text-[10px] font-black bg-blue-50 px-3 py-1 rounded-lg text-blue-600"
                  >+ AGREGAR SECCIÓN</button>
                </div>
                {newWorkshop.syllabus.map((s, i) => (
                  <div key={i} className="p-5 border border-gray-100 rounded-2xl bg-gray-50/50 space-y-3 relative group">
                    <input 
                      placeholder="Título de la sección"
                      className="w-full bg-transparent font-bold border-b border-gray-200 py-1 outline-none focus:border-blue-500"
                      value={s.title} 
                      onChange={e => {
                        const sy = [...newWorkshop.syllabus];
                        sy[i].title = e.target.value;
                        setNewWorkshop({...newWorkshop, syllabus: sy});
                      }}
                    />
                    <textarea 
                      placeholder="Temas tratados (uno por línea)..."
                      className="w-full bg-transparent py-1 outline-none h-20 resize-none text-sm"
                      value={s.content} 
                      onChange={e => {
                        const sy = [...newWorkshop.syllabus];
                        sy[i].content = e.target.value;
                        setNewWorkshop({...newWorkshop, syllabus: sy});
                      }}
                    />
                    {newWorkshop.syllabus.length > 1 && (
                      <button 
                        type="button"
                        onClick={() => setNewWorkshop({...newWorkshop, syllabus: newWorkshop.syllabus.filter((_, idx) => idx !== i)})}
                        className="absolute top-2 right-2 text-red-300 hover:text-red-500 hidden group-hover:block"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white font-bold py-5 rounded-2xl shadow-xl shadow-blue-200">
                {loading ? "Creando..." : "Publicar Taller"}
              </button>
            </form>
          </div>

          <div className="space-y-4 overflow-y-auto max-h-[80vh]">
            {workshops.map(w => (
              <div key={w.id} className="bg-white p-6 rounded-[2rem] border border-gray-50 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-gray-900">{w.title}</h4>
                  <p className="text-[10px] text-gray-400">{w.syllabus.length} Secciones</p>
                </div>
                <div className="flex gap-2">
                  <Link to={`/talleres/${w.id}`} className="p-3 text-gray-300 hover:text-blue-500"><ExternalLink className="w-5 h-5" /></Link>
                  <button onClick={() => handleDelete("workshops", w.id!)} className="p-3 text-gray-300 hover:text-red-500"><Trash2 className="w-5 h-5" /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
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
          <Route path="/talleres/:workshopId" element={<WorkshopDetailPage />} />
          <Route path="/recursos" element={<RecursosPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </Router>
  );
}
