import { useState, useEffect } from "react";

// ─── ESTILOS GLOBALES ────────────────────────────────────────────────────────
const injectStyles = () => {
  if (document.getElementById("rit-global")) return;
  const s = document.createElement("style");
  s.id = "rit-global";
  s.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Crimson+Pro:ital,wght@0,300;0,400;0,600;1,300;1,400&display=swap');
    *{box-sizing:border-box;margin:0;padding:0;}
    body{background:#05080F;color:#E2E8F4;font-family:'Crimson Pro',Georgia,serif;}
    ::-webkit-scrollbar{width:5px;}::-webkit-scrollbar-track{background:#05080F;}::-webkit-scrollbar-thumb{background:#7A6130;border-radius:3px;}
    @keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
    @keyframes spin{to{transform:rotate(360deg)}}
    @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.45}}
    @keyframes scaleIn{from{transform:scale(0.95);opacity:0}to{transform:scale(1);opacity:1}}
    @keyframes glow{0%,100%{box-shadow:0 0 24px rgba(200,169,81,0.15)}50%{box-shadow:0 0 48px rgba(200,169,81,0.4)}}
    @keyframes slideDown{from{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:translateY(0)}}
    .fade-up{animation:fadeUp 0.5s ease forwards;}
    .scale-in{animation:scaleIn 0.3s ease forwards;}
    .slide-down{animation:slideDown 0.3s ease forwards;}
    .spinner{width:40px;height:40px;border:3px solid #1A2540;border-top-color:#C8A951;border-radius:50%;animation:spin 0.85s linear infinite;}
    .btn-gold{background:linear-gradient(135deg,#C8A951,#E8C96A);color:#080600;font-family:'Cinzel',serif;font-weight:700;border:none;cursor:pointer;transition:all 0.2s;letter-spacing:0.05em;}
    .btn-gold:hover:not(:disabled){transform:translateY(-2px);box-shadow:0 6px 28px rgba(200,169,81,0.5);}
    .btn-gold:disabled{opacity:0.4;cursor:not-allowed;}
    .btn-teal{background:linear-gradient(135deg,#0D9488,#14B8A6);color:#fff;font-family:'Cinzel',serif;font-weight:600;border:none;cursor:pointer;transition:all 0.2s;}
    .btn-teal:hover{transform:translateY(-2px);box-shadow:0 6px 24px rgba(13,148,136,0.45);}
    .btn-ghost{background:transparent;border:1px solid #1E2A3A;color:#64748B;font-family:'Crimson Pro',serif;font-size:15px;cursor:pointer;transition:all 0.2s;}
    .btn-ghost:hover{border-color:#C8A951;color:#C8A951;}
    .btn-danger{background:transparent;border:1px solid #3B1A1A;color:#EF4444;font-family:'Crimson Pro',serif;font-size:14px;cursor:pointer;transition:all 0.2s;border-radius:6px;padding:6px 14px;}
    .btn-danger:hover{background:rgba(239,68,68,0.1);}
    .card{background:#0C1220;border:1px solid #1A2540;border-radius:12px;}
    .card-hover{transition:transform 0.2s,border-color 0.2s,box-shadow 0.2s;cursor:pointer;}
    .card-hover:hover{transform:translateY(-3px);border-color:#C8A951!important;box-shadow:0 8px 32px rgba(200,169,81,0.12);}
    textarea,input,select{background:#080D1A;border:1px solid #1A2540;color:#E2E8F4;font-family:'Crimson Pro',serif;font-size:15px;border-radius:8px;transition:border-color 0.2s;}
    textarea:focus,input:focus,select:focus{outline:none;border-color:#C8A951;}
    select option{background:#0C1220;}
    .glow-line{height:1px;background:linear-gradient(90deg,transparent,#C8A951,transparent);}
    .divider{height:1px;background:linear-gradient(90deg,transparent,#1A2540,transparent);margin:18px 0;}
    .badge{display:inline-flex;align-items:center;gap:4px;padding:3px 11px;border-radius:20px;font-size:11px;font-family:'Cinzel',serif;letter-spacing:0.05em;font-weight:600;}
    .badge-gold{background:rgba(200,169,81,0.12);color:#C8A951;border:1px solid rgba(200,169,81,0.28);}
    .badge-teal{background:rgba(13,148,136,0.12);color:#14B8A6;border:1px solid rgba(13,148,136,0.28);}
    .badge-free{background:rgba(100,116,139,0.1);color:#64748B;border:1px solid rgba(100,116,139,0.25);}
    .badge-ok{background:rgba(16,185,129,0.12);color:#10B981;}
    .badge-warn{background:rgba(245,158,11,0.12);color:#F59E0B;}
    .badge-err{background:rgba(239,68,68,0.12);color:#EF4444;}
    .badge-master{background:linear-gradient(135deg,rgba(200,169,81,0.2),rgba(232,201,106,0.1));color:#E8C96A;border:1px solid rgba(200,169,81,0.4);}
    .plan-card{background:#0C1220;border:1px solid #1A2540;border-radius:16px;padding:28px;transition:all 0.3s;}
    .plan-card:hover{border-color:#C8A951;box-shadow:0 12px 48px rgba(200,169,81,0.1);}
    .plan-premium{border-color:rgba(200,169,81,0.5);animation:glow 3s ease-in-out infinite;}
    .tab-btn{background:transparent;border:none;border-bottom:2px solid transparent;color:#64748B;font-family:'Cinzel',serif;font-size:12px;letter-spacing:0.08em;padding:12px 18px;cursor:pointer;transition:all 0.2s;white-space:nowrap;}
    .tab-btn:hover{color:#C8A951;}
    .tab-active{border-bottom-color:#C8A951!important;color:#C8A951!important;}
    .risk-alto{color:#EF4444;background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.25);}
    .risk-medio{color:#F59E0B;background:rgba(245,158,11,0.1);border:1px solid rgba(245,158,11,0.25);}
    .risk-bajo{color:#10B981;background:rgba(16,185,129,0.1);border:1px solid rgba(16,185,129,0.25);}
    .falencia-item{border-left:3px solid #EF4444;padding:12px 16px;background:rgba(239,68,68,0.04);border-radius:0 8px 8px 0;margin-bottom:10px;}
    .stat-card{background:#0C1220;border:1px solid #1A2540;border-radius:10px;padding:20px;text-align:center;}
    .norma-row{display:flex;align-items:center;gap:12px;padding:12px 16px;border-radius:8px;border:1px solid #1A2540;margin-bottom:8px;transition:border-color 0.2s;}
    .norma-row:hover{border-color:#C8A951;}
    .toggle{width:40px;height:22px;border-radius:11px;position:relative;cursor:pointer;transition:background 0.2s;border:none;flex-shrink:0;}
    .toggle-on{background:#C8A951;}
    .toggle-off{background:#1A2540;}
    .toggle::after{content:'';position:absolute;width:16px;height:16px;border-radius:50%;background:#fff;top:3px;transition:left 0.2s;}
    .toggle-on::after{left:21px;}
    .toggle-off::after{left:3px;}
  `;
  document.head.appendChild(s);
};

// ─── CONSTANTES ───────────────────────────────────────────────────────────────
const MASTER_PIN = "2580";
const USER_PLAN_KEY = "rit_user_plan";
const FREE_USED_KEY = "rit_free_used";

const INITIAL_NORMAS = [
  { id:"cst_104_107", codigo:"Arts. 104-107 CST", descripcion:"Obligatoriedad y contenido mínimo del reglamento interno de trabajo", categoria:"CST", activa:true },
  { id:"cst_108", codigo:"Art. 108 CST", descripcion:"Cláusulas que debe contener el reglamento de trabajo", categoria:"CST", activa:true },
  { id:"cst_112_114", codigo:"Arts. 112-114 CST", descripcion:"Sanciones disciplinarias — tipos y límites legales permitidos", categoria:"CST", activa:true },
  { id:"cst_115", codigo:"Art. 115 CST", descripcion:"Procedimiento para imposición de sanciones — garantía del debido proceso", categoria:"CST", activa:true },
  { id:"cst_62", codigo:"Art. 62 CST", descripcion:"Causales de terminación justa del contrato de trabajo", categoria:"CST", activa:true },
  { id:"dec1072_reg", codigo:"Dec. 1072/2015 §2.2.2.4", descripcion:"Obligación de registro del reglamento ante el Ministerio de Trabajo", categoria:"Decreto", activa:true },
  { id:"dec1072_sst", codigo:"Dec. 1072/2015 §2.2.4", descripcion:"Sistema de Gestión de Seguridad y Salud en el Trabajo (SG-SST)", categoria:"Decreto", activa:true },
  { id:"ley1010", codigo:"Ley 1010/2006", descripcion:"Prevención, corrección y sanción del acoso laboral en Colombia", categoria:"Ley", activa:true },
  { id:"ley1257", codigo:"Ley 1257/2008", descripcion:"No violencia y perspectiva de género en el entorno laboral", categoria:"Ley", activa:true },
  { id:"ley1581", codigo:"Ley 1581/2012", descripcion:"Protección de datos personales del trabajador — Habeas Data", categoria:"Ley", activa:true },
  { id:"cconst_c593", codigo:"C-593/14 C.Const.", descripcion:"Constitucionalidad del procedimiento disciplinario laboral privado", categoria:"Jurisprudencia", activa:true },
  { id:"cconst_su998", codigo:"SU-998/00 C.Const.", descripcion:"Derecho de defensa y contradicción del trabajador en proceso disciplinario", categoria:"Jurisprudencia", activa:true },
  { id:"csj_sl2771", codigo:"SL2771-2018 CSJ", descripcion:"Proporcionalidad entre la falta y la sanción — Sala Laboral CSJ", categoria:"Jurisprudencia", activa:true },
  { id:"csj_sl1360", codigo:"SL1360-2019 CSJ", descripcion:"Tipificación de faltas gravísimas como causal válida de despido", categoria:"Jurisprudencia", activa:true },
];

const INITIAL_USERS = [
  { id:"u1", nombre:"María López", email:"maria@empresa.com", plan:"premium", tipo:"mensual", fecha:"2025-04-01", evaluaciones:12, ingresos:39.98 },
  { id:"u2", nombre:"Carlos Ruiz", email:"carlos@hr.co", plan:"premium", tipo:"por_uso", fecha:"2025-04-15", evaluaciones:3, ingresos:29.97 },
  { id:"u3", nombre:"Ana Bermúdez", email:"ana@legal.co", plan:"free", tipo:"—", fecha:"2025-05-01", evaluaciones:1, ingresos:0 },
  { id:"u4", nombre:"Jorge Martínez", email:"jorge@corp.com", plan:"premium", tipo:"mensual", fecha:"2025-03-10", evaluaciones:28, ingresos:59.97 },
];

// ─── PROMPTS ─────────────────────────────────────────────────────────────────
const PROMPT_GRATUITO = `Eres experto jurídico laboral colombiano. Analiza este Reglamento Interno de Trabajo e identifica ÚNICAMENTE sus falencias y el nivel de riesgo legal global.
Responde SOLO en JSON válido sin markdown ni texto adicional:
{
  "riesgo_global": "ALTO",
  "resumen_riesgo": "Una oración describiendo el riesgo general encontrado en el reglamento",
  "falencias": [
    { "norma": "Art. 115 CST", "falencia": "Descripción clara y técnica de la falencia detectada", "riesgo": "ALTO" }
  ],
  "total_falencias": 5,
  "advertencia": "Mensaje persuasivo y técnico explicando qué encontrarían en el análisis premium completo"
}
Sé riguroso. Detecta todas las falencias reales. riesgo puede ser ALTO, MEDIO o BAJO.`;

const buildPromptPremium = (normas) => {
  const lista = normas.filter(n => n.activa).map(n => `- ${n.codigo}: ${n.descripcion}`).join("\n");
  return `Eres experto jurídico laboral colombiano. Emite un DICTAMEN TÉCNICO-JURÍDICO COMPLETO del Reglamento Interno de Trabajo evaluado con base en la siguiente normativa vigente:
${lista}

Evalúa especialmente: tipificación de faltas (leves/graves/gravísimas), garantía del debido proceso art.115 CST, proporcionalidad de sanciones, plazos del procedimiento, derecho de defensa y contradicción.

Responde SOLO en JSON válido sin markdown:
{
  "resumen": "Diagnóstico ejecutivo técnico en 3-4 oraciones",
  "puntuacion_global": 7.8,
  "riesgo_global": "MEDIO",
  "criterios": [
    {"id":"c1","label":"Arts. 104-107 CST — Contenido mínimo obligatorio","norma":"Arts. 104-107 CST","puntaje":8,"estado":"cumple","comentario":"Análisis jurídico detallado","alerta":null}
  ],
  "proceso_disciplinario": {
    "tipificacion": {"puntaje":7,"analisis":"análisis detallado de la tipificación de faltas","alerta":null},
    "debido_proceso": {"puntaje":6,"analisis":"análisis del debido proceso","alerta":"alerta si aplica"},
    "proporcionalidad": {"puntaje":8,"analisis":"análisis de proporcionalidad","alerta":null},
    "plazos": {"puntaje":7,"analisis":"análisis de plazos y términos","alerta":null},
    "derecho_defensa": {"puntaje":9,"analisis":"análisis del derecho de defensa","alerta":null}
  },
  "fortalezas": ["Fortaleza 1","Fortaleza 2","Fortaleza 3"],
  "debilidades": ["Debilidad 1","Debilidad 2","Debilidad 3"],
  "alertas_criticas": [],
  "recomendaciones": ["Recomendación accionable 1","Recomendación 2","Recomendación 3"]
}`;
};

const PROMPT_ELABORAR = `Eres experto jurídico laboral colombiano. Elabora un Reglamento Interno de Trabajo (RIT) completo, técnico y legalmente ajustado al CST y normativa colombiana vigente.
Incluye: objeto y campo de aplicación, condiciones de admisión, periodo de prueba, jornada y horarios, descansos, salario y pagos, obligaciones y prohibiciones (trabajador y empleador), tipificación de faltas (leves/graves/gravísimas), procedimiento disciplinario art.115 CST, sanciones proporcionales, causales de terminación art.62 CST, acoso laboral Ley 1010/2006, perspectiva de género Ley 1257/2008, datos personales Ley 1581/2012, SST Dec.1072/2015, vigencia y registro MinTrabajo.
Responde SOLO en JSON válido sin markdown:
{
  "titulo": "Reglamento Interno de Trabajo — [Empresa]",
  "capitulos": [
    {
      "numero": 1,
      "titulo": "Título del capítulo",
      "articulos": [
        {"numero": 1, "titulo": "Nombre del artículo", "contenido": "Texto legal completo y técnico del artículo."}
      ]
    }
  ]
}`;

// ─── UTILIDADES ───────────────────────────────────────────────────────────────
const callAI = async (systemPrompt, userContent) => {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 4000,
      system: systemPrompt,
      messages: [{ role: "user", content: userContent }]
    })
  });
  const data = await res.json();
  const raw = data.content?.map(b => b.text || "").join("") || "";
  return JSON.parse(raw.replace(/```json|```/g, "").trim());
};

const getRiskClass = r => ({ ALTO:"risk-alto", MEDIO:"risk-medio", BAJO:"risk-bajo" }[r] || "risk-bajo");
const getRiskIcon = r => ({ ALTO:"🔴", MEDIO:"🟡", BAJO:"🟢" }[r] || "🟢");

// ─── COMPONENTES BASE ─────────────────────────────────────────────────────────
const Loader = ({ msg = "Analizando..." }) => (
  <div style={{ textAlign:"center", padding:"60px 20px" }}>
    <div className="spinner" style={{ margin:"0 auto 20px" }}/>
    <p style={{ color:"#C8A951", fontFamily:"Cinzel,serif", fontSize:"13px", letterSpacing:"0.12em", animation:"pulse 1.5s ease infinite" }}>{msg}</p>
  </div>
);

const ScoreRing = ({ value, size=80 }) => {
  const pct = Math.min(100, Math.max(0, (value/10)*100));
  const color = value>=7 ? "#10B981" : value>=5 ? "#F59E0B" : "#EF4444";
  const r = (size/2)-8; const circ = 2*Math.PI*r; const dash = (pct/100)*circ;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#1A2540" strokeWidth="6"/>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth="6"
        strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
        transform={`rotate(-90 ${size/2} ${size/2})`} style={{ transition:"stroke-dasharray 0.8s ease" }}/>
      <text x={size/2} y={size/2+2} textAnchor="middle" dominantBaseline="middle"
        fill={color} fontSize={size/4} fontFamily="Cinzel,serif" fontWeight="700">{value.toFixed(1)}</text>
    </svg>
  );
};

const EstadoBadge = ({ estado }) => {
  const m = { cumple:["badge-ok","✓ Cumple"], cumple_parcial:["badge-warn","◐ Parcial"], incumple:["badge-err","✗ Incumple"] };
  const [cls, txt] = m[estado] || ["badge-free", estado];
  return <span className={`badge ${cls}`}>{txt}</span>;
};

// ─── MODAL PAYU ───────────────────────────────────────────────────────────────
const PayUModal = ({ onClose, onSuccess }) => {
  const [step, setStep] = useState("select");
  const [tipo, setTipo] = useState("mensual");
  const [form, setForm] = useState({ nombre:"", email:"", cedula:"", tarjeta:"", vence:"", cvv:"" });
  const precio = tipo === "mensual" ? "19.99" : "9.99";

  const pagar = async () => {
    setStep("processing");
    await new Promise(r => setTimeout(r, 2500));
    setStep("done");
    setTimeout(() => { onSuccess(tipo); onClose(); }, 1800);
  };

  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.88)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:1000, padding:"16px" }}>
      <div className="card scale-in" style={{ maxWidth:"420px", width:"100%", padding:"32px", position:"relative" }}>
        <button className="btn-ghost" onClick={onClose} style={{ position:"absolute", top:"14px", right:"14px", padding:"3px 10px", borderRadius:"6px" }}>✕</button>
        <div style={{ textAlign:"center", marginBottom:"24px" }}>
          <div style={{ fontSize:"32px", marginBottom:"8px" }}>💳</div>
          <div style={{ fontFamily:"Cinzel,serif", fontSize:"18px", color:"#C8A951", marginBottom:"4px" }}>Activar Plan Premium</div>
          <div style={{ color:"#64748B", fontSize:"13px" }}>Pago seguro procesado por PayU Colombia</div>
        </div>
        {step === "select" && (
          <div className="fade-up">
            {[["mensual","$19.99 USD / mes","Evaluaciones y elaboraciones ilimitadas"],["por_uso","$9.99 USD / evaluación","Acceso completo para una evaluación"]].map(([v,p,d]) => (
              <div key={v} onClick={() => setTipo(v)} style={{ padding:"16px", borderRadius:"10px", border:`2px solid ${tipo===v?"#C8A951":"#1A2540"}`, background:tipo===v?"rgba(200,169,81,0.06)":"#080D1A", marginBottom:"12px", cursor:"pointer", transition:"all 0.2s" }}>
                <div style={{ fontFamily:"Cinzel,serif", fontSize:"16px", color:tipo===v?"#C8A951":"#E2E8F4", marginBottom:"3px" }}>{p}</div>
                <div style={{ color:"#64748B", fontSize:"13px" }}>{d}</div>
              </div>
            ))}
            <button className="btn-gold" onClick={() => setStep("form")} style={{ width:"100%", padding:"14px", borderRadius:"8px", fontSize:"15px", marginTop:"8px" }}>
              Continuar — ${precio} USD
            </button>
          </div>
        )}
        {step === "form" && (
          <div className="fade-up">
            <div style={{ background:"rgba(200,169,81,0.07)", border:"1px solid rgba(200,169,81,0.22)", borderRadius:"8px", padding:"12px 16px", marginBottom:"18px" }}>
              <div style={{ color:"#C8A951", fontFamily:"Cinzel,serif", fontSize:"13px", marginBottom:"2px" }}>{tipo==="mensual"?"Suscripción mensual ilimitada":"Evaluación única completa"}</div>
              <div style={{ color:"#E8C96A", fontFamily:"Cinzel,serif", fontSize:"22px", fontWeight:"700" }}>${precio} USD</div>
            </div>
            {[["nombre","Nombre completo","text"],["email","Correo electrónico","email"],["cedula","Cédula / NIT","text"],["tarjeta","Número de tarjeta","text"],["vence","MM/AA","text"],["cvv","CVV","password"]].map(([k,lbl,t]) => (
              <div key={k} style={{ marginBottom:"10px" }}>
                <div style={{ color:"#64748B", fontSize:"11