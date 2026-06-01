import React, { useState } from "react";
import { 
  Shield, 
  Sword, 
  User, 
  Dumbbell, 
  Home, 
  Play, 
  Info, 
  ArrowLeft, 
  CheckCircle2, 
  AlertTriangle, 
  MessageSquare, 
  Trophy, 
  Activity, 
  ChevronRight, 
  ClipboardList 
} from "lucide-react";

// Definición local de tipos/estructuras para alinearlo al entorno plano de GitHub
const MODALIDAD = {
  FRAGUA: "Fragua",         // Gimnasio
  TRINCHERA: "Trinchera",   // Casa / Peso corporal
  ARTICULAR: "Articular",   // Calentamiento / Movilidad
  RECUPERACION: "Recuperacion" // Terapéutico
};

const ZONA_DOLOR = {
  HOMBROS: "Hombros",
  CODOS: "Codos",
  RODILLAS: "Rodillas",
  LUMBAR: "Lumbar",
  NINGUNA: "Ninguna"
};

// Rutinas precargadas según el flujo del Bautismo del Escudero
const PROTOCOLO_ARTICULAR = {
  id: "art-001",
  nombre: "Protocolo de Blindaje Articular",
  modalidad: MODALIDAD.ARTICULAR,
  foco: "Preparación Hombro, Cadera y Columna (Enfoque Movilidad 40+)",
  ejercicios: [
    {
      id: "a1",
      nombre: "Rotaciones de CARs de Hombro",
      series: 2,
      repeticiones: "5 por lado",
      descanso: 30,
      notaArticular: "Realiza rotaciones circulares lentas. Mantén la tensión en el abdomen para no compensar con el lumbar."
    },
    {
      id: "a2",
      nombre: "Cat-Cow Segmentado (Gato-Camello)",
      series: 2,
      repeticiones: "8 controladas",
      descanso: 30,
      notaArticular: "Mueve vértebra por vértebra. Inicia desde la pelvis hasta coronar con el cuello. Controla el ritmo."
    },
    {
      id: "a3",
      nombre: "Rotación de Cadera 90/90",
      series: 2,
      repeticiones: "6 por lado",
      descanso: 30,
      notaArticular: "Si sientes molestia o falta de flexión, levanta el torso ligeramente o apoya las manos."
    }
  ]
};

const RUTINAS_ESCUDERO = {
  FRAGUA: {
    id: "fra-esc-01",
    nombre: "Bautismo del Escudero (Gimnasio)",
    modalidad: MODALIDAD.FRAGUA,
    foco: "Fuerza Primal y Estabilidad Base",
    ejercicios: [
      {
        id: "f1",
        nombre: "Goblet Squat (Sentadilla Copa con Mancuerna)",
        series: 3,
        repeticiones: "10 rps controladas",
        descanso: 75,
        notaArticular: "Asegúrate de romper el paralelo con la cadera si la movilidad lo permite. Mantén el pecho erguido."
      },
      {
        id: "f2",
        nombre: "Flexiones de Brazos Técnicas",
        series: 3,
        repeticiones: "8 a 12 rps lentas",
        descanso: 90,
        notaArticular: "Codos metidos en un ángulo de 45 grados. No dejes caer la pelvis; mantén el núcleo rígido."
      },
      {
        id: "f3",
        nombre: "Puente de Glúteo Isométrico",
        series: 3,
        repeticiones: "Sostener 30 segundos",
        descanso: 60,
        notaArticular: "Contrae los glúteos al máximo arriba presionando con los talones. Libera la carga del lumbar."
      }
    ]
  },
  TRINCHERA: {
    id: "tri-esc-01",
    nombre: "Bautismo del Escudero (La Trinchera)",
    modalidad: MODALIDAD.TRINCHERA,
    foco: "Control de Peso Corporal Fuerte",
    ejercicios: [
      {
        id: "t1",
        nombre: "Sentadilla Libre Profunda",
        series: 3,
        repeticiones: "12 contadas",
        descanso: 60,
        notaArticular: "Empuja las rodillas hacia afuera y asegura la pisada completa con el talón pegado al suelo."
      },
      {
        id: "t2",
        nombre: "Flexiones con Manos Elevadas",
        series: 3,
        repeticiones: "10 a 15 rps",
        descanso: 60,
        notaArticular: "Usa un banco o cajón si en el suelo sientes sobrecarga en los hombros o falta de fuerza."
      },
      {
        id: "t3",
        nombre: "Puente de Glúteo a una Pierna",
        series: 3,
        repeticiones: "8 por lado",
        descanso: 60,
        notaArticular: "Enfócate en la activación pura del glúteo e isquiotibiales de la pierna de apoyo."
      }
    ]
  }
};

const RUTINA_RECUPERACION_HOMBROS = {
  id: "rec-hom-01",
  nombre: "Protocolo de Recuperación: Cintura Escapular",
  modalidad: MODALIDAD.RECUPERACION,
  esRecuperacion: true,
  foco: "Liberación de sobrecarga articular y control motor",
  ejercicios: [
    {
      id: "r1",
      nombre: "Isométrico de Rotadores Externos en Pared",
      series: 3,
      repeticiones: "20 segundos de empuje",
      descanso: 30,
      notaArticular: "Ejerce una presión suave y continua de 4/10 en escala de esfuerzo. Sin dolor punzante."
    },
    {
      id: "r2",
      nombre: "Y-T-W Estables en Suelo",
      series: 2,
      repeticiones: "8 por postura",
      descanso: 45,
      notaArticular: "Movimientos enfocados puramente en despertar el manguito rotador y trapecio medio."
    }
  ]
};

export default function App() {
  // CONFIGURACIÓN DINÁMICA DE ESTADOS (useState)
  const [view, setView] = useState("home"); // home | select-mode | workout | report | success | profile
  const [selectedMode, setSelectedMode] = useState(null);
  const [currentRoutine, setCurrentRoutine] = useState(null);
  
  // Puntos iniciales ajustables de forma dinámica (Iniciamos a 290 como pide el Cid para acariciar el Rango Caballero)
  const [puntosForja, setPuntosForja] = useState(290);
  
  // Gestión de Ejercicios en Sesión Activa (Checklist interactivo)
  const [completedExercises, setCompletedExercises] = useState({});

  // Formulario del reporte final
  const [misionCumplida, setMisionCumplida] = useState(false);
  const [cargas, setCargas] = useState("");
  const [notas, setNotas] = useState("");
  
  // Alerta de dolor articular interactivo
  const [alertaDolor, setAlertaDolor] = useState(false);
  const [zonaDolor, setZonaDolor] = useState(ZONA_DOLOR.NINGUNA);
  
  // Control de desvío automático de la próxima rutina por dolor reportado
  const [lastPainReported, setLastPainReported] = useState(null);

  // Umbral y rango dinámico basado en puntos
  const LIMITE_CABALLERO = 300;
  const rank = puntosForja >= LIMITE_CABALLERO ? "Caballero" : "Escudero";
  const progressPercent = Math.min((puntosForja / LIMITE_CABALLERO) * 100, 100);

  // Dosis estoica inyectada de forma fija y limpia conforme al Cid:
  const dosisEstoica = {
    cita: "No es que tengamos poco tiempo, sino que perdemos mucho.",
    autor: "Séneca",
    reflexion: "La forja no es solo levantar cargas de hierro, sino templar tu carácter para resistir las batallas del día a día.",
    retoDelCid: "Presta atención plena a la alineación de tus codos hoy. Prioriza la técnica sobre el ego."
  };

  // Iniciar entrenamiento de preparación
  const handleStartWorkout = (mode) => {
    setSelectedMode(mode);
    setCurrentRoutine(PROTOCOLO_ARTICULAR);
    setCompletedExercises({});
    setView("workout");
  };

  // Marcar/desmarcar ejercicio individual
  const toggleExerciseCheck = (id) => {
    setCompletedExercises(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const allExercisesCompleted = currentRoutine 
    ? currentRoutine.ejercicios.every(ex => completedExercises[ex.id]) 
    : false;

  // Cerrar y finalizar la sesión de hoy (+10 Puntos)
  const handleFinishDay = () => {
    setPuntosForja(prev => prev + 10);
    
    // Si reportó dolor, guardamos la zona afectada para aplicar el desvío táctico
    if (alertaDolor && zonaDolor !== ZONA_DOLOR.NINGUNA) {
      setLastPainReported(zonaDolor);
    } else {
      setLastPainReported(null);
    }
    
    setView("success");
  };

  // Resetear estados para reiniciar ciclo de entrenes
  const handleResetForja = () => {
    setView("home");
    setMisionCumplida(false);
    setCargas("");
    setNotas("");
    setAlertaDolor(false);
    setZonaDolor(ZONA_DOLOR.NINGUNA);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900 selection:bg-amber-500 selection:text-slate-950 pb-20">
      
      {/* CABECERA ROBUSTA SLATE CON ACCENTO ÁMBAR */}
      <header className="bg-slate-900 border-b border-slate-800 text-white shadow-md sticky top-0 z-40">
        <div className="max-w-md mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setView("home")}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-md">
              <Shield className="w-5 h-5 text-slate-950 stroke-[2.5]" />
            </div>
            <div>
              <span className="font-display text-lg font-black tracking-tighter uppercase italic block leading-none">FORJA</span>
              <span className="text-[10px] font-mono tracking-widest text-slate-400 font-semibold uppercase">Estirpe del Cid</span>
            </div>
          </div>
          
          <button 
            onClick={() => setView("profile")}
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-755 px-3.5 py-1.5 rounded-full border border-slate-700 transition"
          >
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span className="text-[11px] font-mono text-amber-400 font-bold uppercase">{rank}</span>
            <User className="w-4 h-4 text-slate-300" />
          </button>
        </div>
      </header>

      {/* FLUJO DE NAVEGACIÓN DINÁMICO */}
      <main className="flex-grow max-w-md w-full mx-auto px-5 py-6">
        
        {/* PANTALLA PRINCIPAL (HOME) */}
        {view === "home" && (
          <div className="space-y-6">
            
            {/* BARRA DE PROGRESO INTERACTIVA */}
            <section 
              onClick={() => setView("profile")}
              className="bg-slate-900 text-white p-5 rounded-2xl shadow-lg border border-slate-800 cursor-pointer hover:border-amber-500/50 transition duration-350 transform active:scale-98"
            >
              <div className="flex justify-between items-end mb-3">
                <div className="space-y-0.5">
                  <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Progreso de Rango</p>
                  <p className="text-2xl font-display font-black tracking-tight text-white italic">
                    {puntosForja} <span className="text-xs text-slate-500 not-italic font-mono">/ {LIMITE_CABALLERO} PTS</span>
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono py-1 px-2.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold">
                    Siguiente: Caballero
                  </span>
                </div>
              </div>
              
              <div className="w-full bg-slate-850 h-3 rounded-full overflow-hidden border border-slate-700/50 p-[2px]">
                <div 
                  className="bg-amber-500 h-full rounded-full transition-all duration-700 shadow-[0_0_12px_rgba(245,158,11,0.6)]"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <p className="text-[10px] text-slate-400 mt-2 text-right italic font-medium">
                Faltan {Math.max(0, LIMITE_CABALLERO - puntosForja)} puntos para ascender
              </p>
            </section>

            {/* DOSIS ESTOICA DIARIA - LIMPIA Y SÓLIDA */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/60 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <ClipboardList className="w-20 h-20 text-slate-900" />
              </div>
              
              <div className="flex items-center gap-2 mb-3">
                <span className="w-1.5 h-4 bg-amber-500 rounded-full" />
                <h2 className="text-xs uppercase tracking-widest text-slate-400 font-black">Dosis Estoica de Hoy</h2>
              </div>
              
              <div className="space-y-4">
                <blockquote className="text-lg italic font-medium leading-relaxed text-slate-800">
                  "{dosisEstoica.cita}"
                </blockquote>
                <p className="text-xs text-slate-500 font-bold font-mono tracking-wide">— {dosisEstoica.autor}</p>
                
                <div className="bg-amber-50 rounded-xl p-4 border border-amber-100 space-y-1">
                  <span className="text-[11px] font-black text-amber-800 flex items-center gap-1.5 uppercase tracking-wider">
                    <Sword className="w-3.5 h-3.5" /> Reto del Cid
                  </span>
                  <p className="text-xs text-amber-900 leading-relaxed font-semibold">
                    {dosisEstoica.retoDelCid}
                  </p>
                </div>
              </div>
            </section>

            {/* ALERTA DE PROTOCOLO DE RECUPERACIÓN (DESVÍO ACTIVO) */}
            {lastPainReported && (
              <div className="bg-blue-50 border-2 border-blue-200 p-5 rounded-2xl space-y-3">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg text-blue-700 shrink-0">
                    <Activity className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">Protección del Escudero Activada</h3>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                      Llevas una sobrecarga reportada en **{lastPainReported}**. El Cid te aconseja entrenar hoy la rutina de recuperación del manguito rotador y columna para blindarte.
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => {
                      setSelectedMode("Recuperacion");
                      setCurrentRoutine(RUTINA_RECUPERACION_HOMBROS);
                      setCompletedExercises({});
                      setView("workout");
                    }}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-mono text-[10px] font-bold py-2 border border-blue-700 rounded-lg uppercase tracking-wider active:scale-97 transition"
                  >
                    Usar Rutina de Recuperación
                  </button>
                  <button 
                    onClick={() => setLastPainReported(null)}
                    className="px-3 bg-white hover:bg-slate-50 text-slate-500 font-mono text-[10px] py-1.5 border border-slate-200 rounded-lg uppercase font-bold transition"
                  >
                    Ignorar
                  </button>
                </div>
              </div>
            )}

            {/* SECCIÓN DE ELECCIÓN PRINCIPAL */}
            <div className="space-y-3">
              <h3 className="text-xs uppercase tracking-widest text-slate-400 font-black flex items-center gap-1.5">
                <Dumbbell className="w-3.5 h-3.5 text-slate-400" /> Registro Forja - Día 1
              </h3>
              
              <button 
                onClick={() => setView("select-mode")}
                className="w-full bg-slate-900 text-white p-5 rounded-2xl shadow-md border border-slate-800 flex items-center justify-between group active:scale-98 hover:border-amber-500 transition duration-300 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-5 opacity-5 rotate-12">
                  <Sword className="w-16 h-16" />
                </div>
                <div className="flex items-center gap-4 text-left z-10">
                  <div className="w-12 h-12 bg-amber-500 text-slate-950 rounded-xl flex items-center justify-center shadow-inner">
                    <Play className="w-6 h-6 fill-current stroke-none" />
                  </div>
                  <div>
                    <h4 className="font-display font-black text-lg tracking-tight uppercase">Templar la Forja</h4>
                    <p className="text-[11px] text-slate-400 uppercase tracking-widest font-mono font-bold">Empezar mi Día 1</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-amber-500 group-hover:translate-x-1 transition" />
              </button>

              <div className="w-full opacity-50 bg-white/70 p-4 rounded-xl border border-dashed border-slate-300 flex items-center justify-between text-slate-400">
                <span className="text-xs font-mono font-bold uppercase tracking-wider">Próximo día: El Torno</span>
                <span className="text-[10px] bg-slate-100 px-2.5 py-1 rounded font-bold uppercase tracking-wider">Bloqueado</span>
              </div>
            </div>

          </div>
        )}

        {/* SELECCIÓN DE CAMPO (MODALIDAD) */}
        {view === "select-mode" && (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <button onClick={() => setView("home")} className="p-2 bg-white rounded-full border border-slate-200">
                <ArrowLeft className="w-4 h-4 text-slate-600" />
              </button>
              <h2 className="text-lg font-display font-black uppercase text-slate-900">¿Dónde combatirás hoy?</h2>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <button 
                onClick={() => handleStartWorkout(MODALIDAD.FRAGUA)}
                className="bg-white p-6 rounded-3xl border-2 border-transparent hover:border-amber-500 text-left group shadow-sm hover:shadow-md transition duration-300"
              >
                <div className="w-14 h-14 bg-amber-100 text-amber-700 rounded-xl flex items-center justify-center mb-4 group-hover:scale-105 transition">
                  <Dumbbell className="w-7 h-7" />
                </div>
                <h3 className="font-display font-black text-lg uppercase tracking-tight text-slate-900">La Fragua</h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">
                  Gimnasio comercial con peso libre y poleas. Ideal para incrementar la densidad del hierro.
                </p>
                <span className="inline-flex items-center text-[10px] font-mono tracking-widest font-black text-amber-600 uppercase">
                  Elegir Destierro <ChevronRight className="w-3.5 h-3.5 ml-1" />
                </span>
              </button>

              <button 
                onClick={() => handleStartWorkout(MODALIDAD.TRINCHERA)}
                className="bg-white p-6 rounded-3xl border-2 border-transparent hover:border-slate-800 text-left group shadow-sm hover:shadow-md transition duration-300"
              >
                <div className="w-14 h-14 bg-slate-100 text-slate-700 rounded-xl flex items-center justify-center mb-4 group-hover:scale-105 transition">
                  <Home className="w-7 h-7" />
                </div>
                <h3 className="font-display font-black text-lg uppercase tracking-tight text-slate-900">La Trinchera</h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">
                  En casa o parque. Calistenia sistemática con tu peso corporal y adaptaciones técnicas 40+.
                </p>
                <span className="inline-flex items-center text-[10px] font-mono tracking-widest font-black text-slate-900 uppercase">
                  Elegir Destierro <ChevronRight className="w-3.5 h-3.5 ml-1" />
                </span>
              </button>
            </div>
          </div>
        )}

        {/* PANTALLA DE ENTRENAMIENTO ACTIVO */}
        {view === "workout" && currentRoutine && (
          <div className="space-y-6">
            
            <div className={`p-5 rounded-2xl text-white shadow-md relative overflow-hidden ${
              currentRoutine.esRecuperacion ? "bg-gradient-to-br from-blue-700 to-blue-900" : "bg-slate-900"
            }`}>
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <Shield className="w-24 h-24" />
              </div>
              <span className="text-[10px] font-mono font-black tracking-widest uppercase text-amber-400 block mb-1">
                {currentRoutine.modalidad === MODALIDAD.ARTICULAR ? "Fase 1: Movilidad de Entrada" : "Fase 2: Estímulo Principal"}
              </span>
              <h2 className="text-xl font-display font-black italic uppercase tracking-tight leading-none mb-1">
                {currentRoutine.nombre}
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed font-semibold italic">
                Enfoque: {currentRoutine.foco}
              </p>
            </div>

            {/* LISTADO DE EJERCICIOS INTERACTIVOS */}
            <div className="space-y-4">
              <div className="flex justify-between items-center px-1">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400">
                  Ejercicios de la Estancia
                </span>
                <span className="text-[10px] font-mono bg-slate-200 px-2 py-0.5 rounded font-black">
                  {Object.values(completedExercises).filter(Boolean).length} / {currentRoutine.ejercicios.length} Completados
                </span>
              </div>

              {currentRoutine.ejercicios.map((ex, index) => {
                const isChecked = !!completedExercises[ex.id];
                return (
                  <div 
                    key={ex.id} 
                    onClick={() => toggleExerciseCheck(ex.id)}
                    className={`bg-white rounded-2xl p-5 border shadow-sm transition cursor-pointer flex flex-col gap-4 ${
                      isChecked ? "border-amber-400 bg-amber-500/5" : "border-slate-200"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 bg-slate-900 text-white rounded-full font-mono text-xs font-black flex items-center justify-center">
                          {index + 1}
                        </span>
                        <div>
                          <h4 className={`font-bold text-[15px] ${isChecked ? "text-slate-900 line-through decoration-amber-500 decoration-2" : "text-slate-900"}`}>
                            {ex.nombre}
                          </h4>
                          <span className="text-[10px] font-mono tracking-widest bg-slate-100 font-bold px-2 py-0.5 rounded text-slate-600 uppercase">
                            {ex.series} series x {ex.repeticiones}
                          </span>
                        </div>
                      </div>
                      
                      <div className={`w-6 h-6 rounded-md border flex items-center justify-center transition-all ${
                        isChecked ? "bg-amber-500 border-amber-600 text-slate-950" : "border-slate-300 bg-slate-50"
                      }`}>
                        {isChecked && <CheckCircle2 className="w-4 h-4 text-slate-950" />}
                      </div>
                    </div>

                    <div className="bg-slate-50 rounded-xl p-3 border border-slate-150 flex items-start gap-2">
                      <Info className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                      <p className="text-[11px] text-slate-600 leading-relaxed font-semibold italic">
                        {ex.notaArticular}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* BOTÓN DE TRANSICIÓN */}
            <button 
              onClick={() => {
                if (currentRoutine.modalidad === MODALIDAD.ARTICULAR) {
                  // Finalizó fase articular, vamos a fuerza
                  const subRoutine = selectedMode === MODALIDAD.FRAGUA ? RUTINAS_ESCUDERO.FRAGUA : RUTINAS_ESCUDERO.TRINCHERA;
                  setCurrentRoutine(subRoutine);
                  setCompletedExercises({});
                  window.scrollTo(0,0);
                } else {
                  // Finalizar fuerza, entramos a reporte
                  setView("report");
                  window.scrollTo(0,0);
                }
              }}
              className="w-full bg-slate-900 hover:bg-slate-950 text-white p-5 rounded-2xl font-mono text-xs font-black uppercase tracking-widest shadow-lg active:scale-97 transition duration-200"
            >
              {currentRoutine.modalidad === MODALIDAD.ARTICULAR ? "Templar Huesos (Ir al Ejercicios)" : "Completar Forja y Reportar"}
            </button>
          </div>
        )}

        {/* PANTALLA DE REPORTE DE MISIÓN (INTERACTIVA) */}
        {view === "report" && (
          <div className="space-y-6 pb-10">
            <div className="text-center space-y-1">
              <h2 className="text-2xl font-display font-black uppercase tracking-tight italic">Registrar en la Piedra</h2>
              <p className="text-xs text-slate-500 font-medium">Sella tu disciplina para los próximos combates, Caballero de Forja.</p>
            </div>

            {/* Casilla interactiva de victoria */}
            <div 
              onClick={() => setMisionCumplida(!misionCumplida)}
              className={`p-6 rounded-2xl border-2 cursor-pointer transition text-center flex flex-col items-center justify-center gap-3 ${
                misionCumplida 
                  ? "bg-amber-500 border-amber-600 text-slate-950 shadow-md"
                  : "bg-white border-slate-200 text-slate-400"
              }`}
            >
              <CheckCircle2 className="w-12 h-12" />
              <span className="font-display font-black text-lg uppercase tracking-tight">
                {misionCumplida ? "Victoria Consumada" : "Sellar Victoria"}
              </span>
              <p className="text-[10px] opacity-80 leading-none">Confirma que completaste la sesión con honor.</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/60 space-y-5">
              
              {/* Formulario de Pesos */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono font-black uppercase tracking-widest text-slate-400 block">
                  Cargas Utilizadas (Acero Levantado)
                </label>
                <div className="relative">
                  <Dumbbell className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                  <input 
                    type="text" 
                    value={cargas}
                    onChange={(e) => setCargas(e.target.value)}
                    placeholder="Ej: Mancuerna 25lb en Cupa, Flexiones en suelo..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition"
                  />
                </div>
              </div>

              {/* Notas del Combate */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono font-black uppercase tracking-widest text-slate-400 block">
                  Notas de Combate (Reflexiones de Esfuerzo)
                </label>
                <div className="relative">
                  <MessageSquare className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                  <textarea 
                    value={notas}
                    onChange={(e) => setNotas(e.target.value)}
                    placeholder="Escribe cómo respondió tu cuerpo hoy..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition h-20 resize-none"
                  />
                </div>
              </div>

              {/* ALERTA DE DOLOR ARTICULAR */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <label className="text-[10px] font-mono font-black uppercase tracking-widest text-slate-400 block">
                  ¿Hubo dolor o molestia articular? (Seguridad 40+)
                </label>
                
                <div className="flex gap-3">
                  <button 
                    onClick={() => {
                      setAlertaDolor(false);
                      setZonaDolor(ZONA_DOLOR.NINGUNA);
                    }}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-bold uppercase transition ${
                      !alertaDolor 
                        ? "bg-slate-900 text-white" 
                        : "bg-slate-105 text-slate-500 border border-slate-200 hover:bg-slate-150"
                    }`}
                  >
                    Sin Dolores
                  </button>
                  <button 
                    onClick={() => setAlertaDolor(true)}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-bold uppercase transition flex items-center justify-center gap-1.5 ${
                      alertaDolor 
                        ? "bg-red-600 text-white" 
                        : "bg-slate-105 text-slate-500 border border-slate-200 hover:bg-slate-150"
                    }`}
                  >
                    <AlertTriangle className="w-3.5 h-3.5" /> Reportar Dolor
                  </button>
                </div>

                {/* Selección de zonas afectadas */}
                {alertaDolor && (
                  <div className="bg-red-50 p-3 rounded-xl border border-red-100 space-y-2">
                    <span className="text-[10px] text-red-700 font-bold block">
                      Selecciona la zona para desviar tu entrenamiento del siguiente día:
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {[ZONA_DOLOR.HOMBROS, ZONA_DOLOR.CODOS, ZONA_DOLOR.RODILLAS, ZONA_DOLOR.LUMBAR].map(zona => (
                        <button 
                          key={zona}
                          onClick={() => setZonaDolor(zona)}
                          className={`py-1.5 px-2 rounded-lg text-[10px] font-mono uppercase font-black tracking-wide border-2 transition ${
                            zonaDolor === zona 
                              ? "bg-red-100 border-red-600 text-red-700" 
                              : "bg-white border-slate-200 text-slate-500 hover:border-slate-350"
                          }`}
                        >
                          {zona}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

            </div>

            <button 
              disabled={!misionCumplida}
              onClick={handleFinishDay}
              className={`w-full py-5 rounded-2xl font-mono text-xs font-black uppercase tracking-widest shadow-lg transition ${
                misionCumplida 
                  ? "bg-slate-900 border border-slate-800 text-white hover:bg-slate-950 active:scale-97 cursor-pointer" 
                  : "bg-slate-200 text-slate-400 cursor-not-allowed"
              }`}
            >
              Grabar Forja en la Piedra (+10 pts)
            </button>
          </div>
        )}

        {/* PANTALLA DE ÉXITO (COFRE DE VICTORIA) */}
        {view === "success" && (
          <div className="space-y-6 text-center py-10">
            
            <div className="w-24 h-24 bg-gradient-to-tr from-amber-500 to-amber-600 rounded-full mx-auto flex items-center justify-center shadow-[0_0_35px_rgba(245,158,11,0.55)] border-4 border-white">
              <Trophy className="w-11 h-11 text-slate-950 stroke-[2]" />
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-mono font-black text-amber-600 uppercase tracking-widest">
                Victoria Consumada
              </span>
              <h2 className="text-3xl font-display font-black italic uppercase leading-none tracking-tight">
                ¡Fuerza y Honor!
              </h2>
              <p className="text-base text-slate-700 font-bold">
                Tu diario militar sumó +10 Puntos de Forja
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/60 relative italic text-slate-600 max-w-sm mx-auto shadow-sm">
              <span className="absolute -top-3.5 -left-3 bg-amber-500 text-slate-950 font-mono text-[9px] font-black px-2 py-1 rounded uppercase tracking-widest">
                Templanza
              </span>
              "{dosisEstoica.reflexion}"
              <p className="text-[9px] text-slate-400 not-italic font-mono uppercase tracking-widest mt-3.5 font-bold">
                — Sabiduría de Escudero
              </p>
            </div>

            <button 
              onClick={handleResetForja}
              className="w-full bg-slate-900 hover:bg-slate-950 text-white p-5 rounded-2xl font-mono text-xs font-black uppercase tracking-widest shadow-md active:scale-97 transition duration-150"
            >
              Volver al Cuartel General
            </button>
          </div>
        )}

        {/* PERFIL EXPEDIENTES */}
        {view === "profile" && (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <button onClick={() => setView("home")} className="p-2 bg-white rounded-full border border-slate-200">
                <ArrowLeft className="w-4 h-4 text-slate-600" />
              </button>
              <h2 className="text-lg font-display font-black uppercase text-slate-900">Libro De Linajes</h2>
            </div>

            <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 space-y-4 shadow-lg text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <Shield className="w-20 h-20" />
              </div>
              <div className="w-20 h-20 bg-slate-800 border-4 border-amber-500/80 rounded-full mx-auto flex items-center justify-center">
                <User className="w-10 h-10 text-amber-500" />
              </div>
              <div>
                <h3 className="font-display text-xl font-black italic uppercase tracking-wider">Rodrigo El Cid</h3>
                <span className="text-[10px] font-mono tracking-widest text-amber-400 uppercase font-black">
                  Rango Actual: {rank}
                </span>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4">
              <h4 className="text-[10px] font-mono font-black uppercase tracking-widest text-slate-400">
                Atribución Cósmica de Estirpe
              </h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-500 uppercase">Rango Escudero</span>
                  <span className="font-mono text-slate-400 font-bold">0 Ptos</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-amber-600 uppercase">Rango Caballero (Tu Meta)</span>
                  <span className="font-mono text-amber-600 font-bold">300 Ptos</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-300 uppercase">Rango Campeador (Mítico)</span>
                  <span className="font-mono text-slate-300 font-bold">1000 Ptos</span>
                </div>
              </div>
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Puntuación exacta:</span>
                <span className="font-mono font-black text-slate-800">{puntosForja} PUNTOS</span>
              </div>
            </div>

            <button 
              onClick={() => setView("home")}
              className="w-full bg-slate-950 text-white py-4 rounded-xl font-mono text-[11px] font-black uppercase tracking-widest"
            >
              Cerrar Expediente
            </button>
          </div>
        )}

      </main>

      {/* FOOTER MENÚ INFERIOR (ESTILO CLAN) */}
      {(view === "home" || view === "profile") && (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-3 shadow-[0_-4px_12px_rgba(0,0,0,0.05)] z-40">
          <div className="max-w-md mx-auto flex justify-between items-center px-4">
            <button 
              onClick={() => setView("home")}
              className={`flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-xl transition ${
                view === "home" ? "text-slate-950 font-bold scale-105" : "text-slate-400"
              }`}
            >
              <Home className="w-5.5 h-5.5" />
              <span className="text-[9px] font-mono uppercase tracking-wider">Cuartel</span>
            </button>

            <button 
              onClick={() => setView("select-mode")}
              className="w-13 h-13 rounded-full bg-slate-900 border-4 border-white text-amber-400 flex items-center justify-center shadow-xl active:scale-90 transition -translate-y-4"
            >
              <Sword className="w-6 h-6 stroke-[2.5]" />
            </button>

            <button 
              onClick={() => setView("profile")}
              className={`flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-xl transition ${
                view === "profile" ? "text-slate-950 font-bold scale-105" : "text-slate-400"
              }`}
            >
              <User className="w-5.5 h-5.5" />
              <span className="text-[9px] font-mono uppercase tracking-wider">Expediente</span>
            </button>
          </div>
        </nav>
      )}

    </div>
  );
}
