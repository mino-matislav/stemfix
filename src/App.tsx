import { useState, useEffect, useRef, ChangeEvent, DragEvent, MouseEvent } from "react";
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  Activity, 
  Music, 
  Sliders, 
  FileAudio, 
  Globe, 
  BookOpen, 
  Volume1, 
  Award,
  Download,
  Flame,
  Wrench,
  Radio as RadioIcon,
  Bot
} from "lucide-react";

// Format time helper function
const formatTime = (seconds: number): string => {
  if (isNaN(seconds) || seconds === Infinity) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
};


// Translations Dictionary
const translations = {
  sk: {
    title: "StemFix",
    subtitle: "Profesionálny mastering, analýza a separácia zvuku",
    uploadCard: "📁 Nahrať audio",
    dragDropText: "Presuňte audio súbor sem alebo kliknite pre výber",
    formatsSupported: "Podporované formáty: MP3, WAV, FLAC, OGG, M4A",
    fileDetails: "Detaily súboru",
    duration: "Dĺžka",
    sampleRate: "Snímková frekvencia",
    channels: "Kanály",
    estimatedBitrate: "Odhadovaný bitrate",
    lufs: "Hlasitosť (LUFS)",
    readyToPlay: "Audio pripravené! Stlačte Prehrať.",
    play: "Prehrať",
    pause: "Pozastaviť",
    loop: "Slučka",
    original: "Originál",
    processed: "Upravené",
    abLabel: "Zrovnávanie A/B",
    abOriginalActive: "Počúvate: NEUPRAVENÝ ORIGINÁL",
    abProcessedActive: "Počúvate: MASTERING & REPARÁCIU",
    masterVolume: "Celková Hlasitosť",
    eqTitle: "🎛️ 5-Pásmový Ekvalizér",
    lowS: "Sub basy",
    mudB: "Basy / Blatisté f.",
    midB: "Stredy / Telo",
    presenceB: "Prítomnosť / Detaily",
    airB: "Výšky / Vzduch",
    compressor: "Kompresor",
    limiter: "Limiter / Ceiling",
    autoGain: "Automatická Hlasitosť",
    dynamicsTitle: "🔊 Nastavenia Dynamiky",
    threshold: "Prah (Threshold)",
    ratio: "Pomer (Ratio)",
    attack: "Nábeh (Attack)",
    release: "Uvoľnenie (Release)",
    analyzerTitle: "📈 Frekvenčný Analyzátor",
    stemsTitle: "🎛️ Separátor Stôp (Mock)",
    separateBtn: "Separovať stopy",
    processingSeparate: "Spracúvam separáciu kmeňov...",
    stemVocal: "Spev / Vokál",
    stemDrums: "Bicie / Perkusie",
    stemBass: "Basová linka",
    stemOther: "Ostatné nástroje",
    active: "Aktívne",
    muted: "Stlmené",
    qualityAnalysis: "📊 Analýza kvality audia",
    runAnalysis: "Analyzovať audio",
    analyzingInProgress: "Prebieha matematická analýza bufferu...",
    truePeak: "True Peak (Špička)",
    rms: "Priemerný výkon (RMS)",
    estimatedLufs: "Hlasitosť (LUFS)",
    problemDetection: "Detekcia akustických problémov",
    clipping: "Presiahnutie limitu (Clipping)",
    dcOffset: "Jednosmerný posun (DC Offset)",
    phase: "Fázová korelácia",
    dynamics: "Dynamický rozsah",
    stereo: "Stereo vyváženie",
    noise: "Úroveň šumu",
    noIssues: "Nezistené žiadne vážne chyby v nahrávke.",
    repairTitle: "🔧 Inteligentná Reparácia & Presety",
    repairIntensity: "Intenzita úprav",
    repairPresetLabel: "Zvoľte preset podľa žánru",
    presetRadio: "Rádio (Air & Wide)",
    presetSocial: "Sociálne siete (TikTok/YT)",
    presetDrums: "Bicie & Prechody",
    presetVocal: "Vokály / Podcasty",
    presetRetro: "Retro páska (Tape saturation)",
    presetAuto: "Automatické odporúčanie",
    bypassEffects: "Dočasne vypnúť efekty (Bypass)",
    recomendedMode: "Odporúčanie systému",
    exportTitle: "💾 Export Hotového Masteru",
    exportFormatLabel: "Formát exportu",
    bitrateLabel: "Kvalita MP3 (bitrate)",
    wavDesc: "Bezstratová štúdiová archívna kvalita (.WAV - 16-bit PCM)",
    mp3Desc128: "128 kbps (Draft / Mobilná kompresia)",
    mp3Desc192: "192 kbps (Štandard / Sociálne siete & Weby)",
    mp3Desc320: "320 kbps (Vysoká kvalita / Rozhlasový stream)",
    exportBtn: "Exportovať a stiahnuť master",
    processingExport: "Renderujem audio s efektami do finálneho súboru...",
    supportTitle: "❤️ Podporte Vývoj StemFix",
    supportLabel: "Tento open-source nástroj vyvíjame bezplatne. Podporte nás akoukoľvek čiastkou:",
    copyIban: "Kopírovať IBAN",
    ibanCopied: "IBAN bol skopírovaný do schránky!",
    toastError: "Chyba nahrávania alebo spracovania audia.",
    toastNoFile: "Najprv musíte vybrať alebo pretiahnuť audio súbor.",
    phaseClean: "Optimálna fáza",
    phaseOut: "Fázový posun / Proti-fáza",
    clippingError: "Zistené červené špičky (Clipping)",
    clippingOk: "Bez prebudenia",
    dcWarning: "Jednosmerný prúd prítomný",
    dcOk: "Jednosmerný posun OK",
    dynWarning: "Pre-komprimované (Plochá nahrávka)",
    dynOk: "Živá dynamika",
    stereoWarning: "L/R kanál nevyvážený",
    stereoOk: "Stereo vyvážené",
    noiseWarning: "Prítomný šum",
    noiseOk: "Čisté pozadie",
    problemsDetectedHeader: "Problémy",
  },
  en: {
    title: "StemFix",
    subtitle: "Professional audio mastering, analysis and stem splitting",
    uploadCard: "📁 Upload Audio",
    dragDropText: "Drag and drop audio file here or click to browse",
    formatsSupported: "Supported formats: MP3, WAV, FLAC, OGG, M4A",
    fileDetails: "File details",
    duration: "Duration",
    sampleRate: "Sample Rate",
    channels: "Channels",
    estimatedBitrate: "Estimated bitrate",
    lufs: "Loudness (LUFS)",
    readyToPlay: "Audio ready! Press Play.",
    play: "Play",
    pause: "Pause",
    loop: "Loop",
    original: "Original",
    processed: "Processed",
    abLabel: "A/B Comparison",
    abOriginalActive: "Listening to: UNTOUCHED ORIGINAL",
    abProcessedActive: "Listening to: MASTERING & REPAIR",
    masterVolume: "Master Volume",
    eqTitle: "🎛️ 5-Band Equalizer",
    lowS: "Sub bass",
    mudB: "Bass / Mud freq",
    midB: "Mids / Body",
    presenceB: "Presence / Detail",
    airB: "Treble / Air",
    compressor: "Compressor",
    limiter: "Limiter / Ceiling",
    autoGain: "Auto Gain",
    dynamicsTitle: "🔊 Dynamics Settings",
    threshold: "Threshold",
    ratio: "Ratio",
    attack: "Attack",
    release: "Release",
    analyzerTitle: "📈 Frequency Analyzer",
    stemsTitle: "🎛️ Stem Separator (Simulation)",
    separateBtn: "Separate stems",
    processingSeparate: "Processing stem separation...",
    stemVocal: "Vocals",
    stemDrums: "Drums & Percussion",
    stemBass: "Bassline",
    stemOther: "Other instruments",
    active: "Active",
    muted: "Muted",
    qualityAnalysis: "📊 Audio Quality Analysis",
    runAnalysis: "Run audit on audio",
    analyzingInProgress: "Analyzing audio buffers mathematically...",
    truePeak: "True Peak",
    rms: "Average Power (RMS)",
    estimatedLufs: "Loudness (LUFS)",
    problemDetection: "Acoustic problem detection",
    clipping: "Overload (Clipping)",
    dcOffset: "Direct current (DC Offset)",
    phase: "Phase correlation",
    dynamics: "Dynamic range",
    stereo: "Stereo balance",
    noise: "Noise level",
    noIssues: "No critical acoustic issues found.",
    repairTitle: "🔧 Intelligent Repair & Presets",
    repairIntensity: "Intensity of repairs",
    repairPresetLabel: "Select target preset",
    presetRadio: "Radio (Air & Wide)",
    presetSocial: "Social Networks (TikTok/YT)",
    presetDrums: "Drums & Transient Punch",
    presetVocal: "Vocals / Podcasts",
    presetRetro: "Tape warmth / Saturation",
    presetAuto: "Automatic Recommendation",
    bypassEffects: "Temporarily bypass effects",
    recomendedMode: "System Recommendation",
    exportTitle: "💾 Export Mastered Audio",
    exportFormatLabel: "Export format",
    bitrateLabel: "MP3 quality (bitrate)",
    wavDesc: "Lossless studio archive quality (.WAV - 16-bit PCM)",
    mp3Desc128: "128 kbps (Draft / Mobile compression)",
    mp3Desc192: "192 kbps (Standard / Social media & web)",
    mp3Desc320: "320 kbps (High quality / Broadcast stream)",
    exportBtn: "Export and download master",
    processingExport: "Rendering master copy to final file...",
    supportTitle: "❤️ Support StemFix Development",
    supportLabel: "We develop this tool as a free open-source catalog. Support us with any donate:",
    copyIban: "Copy IBAN",
    ibanCopied: "IBAN was copied to clipboard!",
    toastError: "Error loading or processing audio file.",
    toastNoFile: "Please select or drop an audio file first.",
    phaseClean: "In Phase (Perfect)",
    phaseOut: "Phase shifted (Out-of-phase)",
    clippingError: "Clipping detected",
    clippingOk: "No clipping",
    dcWarning: "DC component present",
    dcOk: "DC offset OK",
    dynWarning: "Low dynamics (Overcompressed)",
    dynOk: "Alive dynamics",
    stereoWarning: "L/R channel unbalanced",
    stereoOk: "Stereo balanced",
    noiseWarning: "Elevated noise floor",
    noiseOk: "Low background noise",
    problemsDetectedHeader: "Issues",
  }
};

// Preset Config definition
const PRESET_PARAMS = {
  radio: {
    eq: { sub: 2.5, mud: -4.5, body: 1.0, presence: 5.5, air: 6.5 },
    comp: { threshold: -16, ratio: 3.5, attack: 4, release: 120 },
    limiterCeiling: -1.0,
    extras: ["exciter", "stereo"]
  },
  social: {
    eq: { sub: -1.0, mud: -6.0, body: 2.5, presence: 6.5, air: 4.5 },
    comp: { threshold: -12, ratio: 4.5, attack: 2, release: 90 },
    limiterCeiling: -0.8,
    extras: ["exciter"]
  },
  drums: {
    eq: { sub: 7.5, mud: -3.0, body: -4.0, presence: 3.5, air: 2.0 },
    comp: { threshold: -18, ratio: 7.0, attack: 1, release: 45 },
    limiterCeiling: -0.3,
    extras: ["transient"]
  },
  vocal: {
    eq: { sub: -8.0, mud: -6.0, body: 4.5, presence: 7.0, air: 6.0 },
    comp: { threshold: -20, ratio: 3.5, attack: 10, release: 180 },
    limiterCeiling: -1.5,
    extras: ["deesser", "exciter"]
  },
  retro: {
    eq: { sub: 3.5, mud: 2.5, body: 3.5, presence: -3.5, air: -9.5 },
    comp: { threshold: -22, ratio: 4.5, attack: 18, release: 300 },
    limiterCeiling: -0.5,
    extras: ["saturation"]
  },
  auto: {
    eq: { sub: 0.0, mud: 0.0, body: 0.0, presence: 0.0, air: 0.0 },
    comp: { threshold: -18, ratio: 2.5, attack: 5, release: 150 },
    limiterCeiling: -1.0,
    extras: []
  }
};

export default function App() {
  const [lang, setLang] = useState<"sk" | "en">(() => {
    try {
      const saved = localStorage.getItem("stemfix_lang");
      return (saved === "sk" || saved === "en") ? saved : "sk";
    } catch {
      return "sk";
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("stemfix_lang", lang);
    } catch (e) {
      console.error(e);
    }
  }, [lang]);

  const tStr = translations[lang];

  // Global Audio Engine Refs
  const audioCtxRef = useRef<AudioContext | null>(null);
  const audioBufferRef = useRef<AudioBuffer | null>(null);
  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const analyserNodeRef = useRef<AnalyserNode | null>(null);

  // EQ ref filters
  const filterSubRef = useRef<BiquadFilterNode | null>(null);
  const filterMudRef = useRef<BiquadFilterNode | null>(null);
  const filterBodyRef = useRef<BiquadFilterNode | null>(null);
  const filterPresenceRef = useRef<BiquadFilterNode | null>(null);
  const filterAirRef = useRef<BiquadFilterNode | null>(null);

  // High pass 30Hz
  const filterHp30Ref = useRef<BiquadFilterNode | null>(null);

  // Dynamic Processors Refs
  const compressorNodeRef = useRef<DynamicsCompressorNode | null>(null);
  const limiterNodeRef = useRef<WaveShaperNode | null>(null);
  const autoGainNodeRef = useRef<GainNode | null>(null);

  // Sub effect nodes
  const deesserFilterRef = useRef<BiquadFilterNode | null>(null);
  const exciterFilterRef = useRef<BiquadFilterNode | null>(null);
  const saturationShaperRef = useRef<WaveShaperNode | null>(null);
  const transientFilterRef = useRef<BiquadFilterNode | null>(null);

  // Stems parallel dynamic Gains Refs to prevent clicky crackling
  const stemsVocalsGainRef = useRef<GainNode | null>(null);
  const stemsDrumsGainRef = useRef<GainNode | null>(null);
  const stemsBassGainRef = useRef<GainNode | null>(null);
  const stemsOtherGainRef = useRef<GainNode | null>(null);

  // State Management
  const [file, setFile] = useState<File | null>(null);
  const [audioLoaded, setAudioLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [loop, setLoop] = useState(false);
  const [abMode, setAbMode] = useState(false); // false = Processed, true = Original (bypassed)
  const [fixedProblems, setFixedProblems] = useState<Record<string, boolean>>({});

  // Audio Attributes
  const [sampleRate, setSampleRate] = useState(0);
  const [channels, setChannels] = useState(0);
  const [bitrate, setBitrate] = useState(0);
  const [lufsValue, setLufsValue] = useState<number | null>(null);

  // Master Volume
  const [volume, setVolume] = useState(80);

  // 5-Band EQ state
  const [eqSub, setEqSub] = useState(0.0);
  const [eqMud, setEqMud] = useState(0.0);
  const [eqBody, setEqBody] = useState(0.0);
  const [eqPresence, setEqPresence] = useState(0.0);
  const [eqAir, setEqAir] = useState(0.0);

  // Compressor & Limiter state
  const [compressorOn, setCompressorOn] = useState(true);
  const [compThreshold, setCompThreshold] = useState(-18);
  const [compRatio, setCompRatio] = useState(3.5);
  const [compAttack, setCompAttack] = useState(6); // ms
  const [compRelease, setCompRelease] = useState(150); // ms

  const [limiterOn, setLimiterOn] = useState(true);
  const [limitCeiling, setLimitCeiling] = useState(-1.0); // dB

  const [autoGainOn, setAutoGainOn] = useState(true);
  const [autoGainTarget, setAutoGainTarget] = useState(-14); // LUFS

  // Stem Splitting emulation states
  const [stemsActive, setStemsActive] = useState(false);
  const [stemsSeparating, setStemsSeparating] = useState(false);
  const [stemsVolumes, setStemsVolumes] = useState({
    vocals: 100,
    drums: 100,
    bass: 100,
    other: 100
  });
  const [stemsMutes, setStemsMutes] = useState({
    vocals: false,
    drums: false,
    bass: false,
    other: false
  });

  // Quality Audit State
  const [analysisActive, setAnalysisActive] = useState(false);
  const [analyzingText, setAnalyzingText] = useState("");
  const [auditDone, setAuditDone] = useState(false);
  const [originalAuditData, setOriginalAuditData] = useState<{
    truePeak: number;
    rms: number;
    lufs: number;
    problems: {
      clipping: { ok: boolean; desc: string };
      dc: { ok: boolean; desc: string };
      phase: { ok: boolean; desc: string };
      dynamics: { ok: boolean; desc: string };
      stereo: { ok: boolean; desc: string };
      noise: { ok: boolean; desc: string };
    }
  } | null>(null);

  const [outputAuditData, setOutputAuditData] = useState<{
    truePeak: number;
    rms: number;
    lufs: number;
    problems: {
      clipping: { ok: boolean; desc: string };
      lufs: { ok: boolean; desc: string };
      compression: { ok: boolean; desc: string };
    }
  } | null>(null);

  // Loop regions states
  const [loopRegionActive, setLoopRegionActive] = useState(false);
  const [loopStart, setLoopStart] = useState<number | null>(null);
  const [loopEnd, setLoopEnd] = useState<number | null>(null);
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const [dragCurrentX, setDragCurrentX] = useState<number | null>(null);
  const [isDraggingLoop, setIsDraggingLoop] = useState(false);

  // Repair State
  const [repairPreset, setRepairPreset] = useState<"radio" | "social" | "drums" | "vocal" | "retro" | "auto" | null>(null);
  const [repairIntensity, setRepairIntensity] = useState(70); // %
  const [recommendedPreset, setRecommendedPreset] = useState<string | null>(null);
  const [bypassAll, setBypassAll] = useState(false);

  // Audio playback progress calculation parameters
  const [progressPct, setProgressPct] = useState(0);
  const startTimeRef = useRef<number>(0);
  const pauseTimeRef = useRef<number>(0);

  const getSanitizedOffset = (offset: number): number => {
    if (loopRegionActive && loopStart !== null && loopEnd !== null) {
      const loopDuration = loopEnd - loopStart;
      if (loopDuration > 0) {
        if (offset < loopStart || offset >= loopEnd) {
          return loopStart + (Math.max(0, offset - loopStart) % loopDuration);
        }
      }
    }
    return Math.max(0, Math.min(offset, duration || 0));
  };

  // Canvas View Refs
  const waveformCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const spectrumCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameIdRef = useRef<number | null>(null);

  // Donation Open state
  const [donationOpen, setDonationOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Export selection state settings
  const [exportFormat, setExportFormat] = useState<"wav" | "mp3">("wav");
  const [mp3Bitrate, setMp3Bitrate] = useState<128 | 192 | 320>(192);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage("");
    }, 3000);
  };

  // Helper file selection method
  const handleFileSelectEvent = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
    }
  };

  // File loading effect
  useEffect(() => {
    if (!file) return;

    const loadAndDecodeAudio = async () => {
      try {
        setStemsActive(false);
        setAuditDone(false);
        setOriginalAuditData(null);
        setOutputAuditData(null);
        setRepairPreset(null);
        setRecommendedPreset(null);
        setFixedProblems({});

        // Resume/Start AudioContext
        if (!audioCtxRef.current) {
          audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        }
        const ctx = audioCtxRef.current;
        if (ctx.state === "suspended") {
          await ctx.resume();
        }

        const arrayBuffer = await file.arrayBuffer();
        const decodedBuffer = await ctx.decodeAudioData(arrayBuffer);
        audioBufferRef.current = decodedBuffer;

        setSampleRate(decodedBuffer.sampleRate);
        setChannels(decodedBuffer.numberOfChannels);
        setDuration(decodedBuffer.duration);
        setBitrate(Math.round((file.size * 8) / decodedBuffer.duration / 1000));

        // Quick LUFS estimation
        const estLUFS = estimateLUFSValue(decodedBuffer);
        setLufsValue(estLUFS);

        setAudioLoaded(true);
        setIsPlaying(false);
        setProgressPct(0);
        setCurrentTime(0);
        pauseTimeRef.current = 0;

        // Draw static waveform visualization
        setTimeout(() => {
          drawWaveform(decodedBuffer);
          runAutomaticRawAudit(decodedBuffer);
        }, 100);

        showToast(tStr.readyToPlay);
      } catch (err) {
        console.error(err);
        showToast(tStr.toastError);
      }
    };

    loadAndDecodeAudio();
  }, [file]);

  // LUFS Estimator
  const estimateLUFSValue = (buf: AudioBuffer): number => {
    let sumSq = 0;
    let count = 0;
    const step = Math.max(1, Math.floor(buf.length / 80000));
    for (let ch = 0; ch < buf.numberOfChannels; ch++) {
      const chData = buf.getChannelData(ch);
      for (let i = 0; i < chData.length; i += step) {
        sumSq += chData[i] * chData[i];
        count++;
      }
    }
    const rms = Math.sqrt(sumSq / (count || 1));
    const dbValue = 20 * Math.log10(rms + 0.000001);
    const lufs = dbValue - 0.691;
    return Math.max(-60, Math.min(0, parseFloat(lufs.toFixed(1))));
  };

  // Drag and drop event handlers
  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  // Draw Static Waveform
  const drawWaveform = (buf: AudioBuffer) => {
    const canvas = waveformCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Reset dimensions for high resolution
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * (window.devicePixelRatio || 1);
    canvas.height = rect.height * (window.devicePixelRatio || 1);
    ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);

    const w = rect.width;
    const h = rect.height;
    ctx.fillStyle = "#0c0a0f";
    ctx.fillRect(0, 0, w, h);

    const data = buf.getChannelData(0);
    const step = Math.ceil(data.length / w);
    const amp = h / 2;

    // Drawing baseline
    ctx.strokeStyle = "rgba(0, 212, 170, 0.15)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, amp);
    ctx.lineTo(w, amp);
    ctx.stroke();

    ctx.fillStyle = "#00d4aa";
    for (let i = 0; i < w; i++) {
      let min = 1.0;
      let max = -1.0;
      for (let j = 0; j < step; j++) {
        const value = data[i * step + j];
        if (value < min) min = value;
        if (value > max) max = value;
      }
      const barH = Math.max(2, (max - min) * amp * 0.9);
      const y = amp - barH / 2;
      ctx.fillRect(i, y, 1.2, barH);
    }
  };

  // Live Spectrum Analyzer Loop
  const startLiveSpectrum = () => {
    const canvas = spectrumCanvasRef.current;
    if (!canvas || !analyserNodeRef.current) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const analyser = analyserNodeRef.current;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    const draw = () => {
      animationFrameIdRef.current = requestAnimationFrame(draw);
      analyser.getByteFrequencyData(dataArray);

      ctx.fillStyle = "#0c0a0f";
      ctx.fillRect(0, 0, rect.width, rect.height);

      const barWidth = (rect.width / 36);
      let x = 0;

      for (let i = 0; i < 36; i++) {
        const binIndex = Math.floor((i / 36) * (bufferLength / 2.5));
        const value = dataArray[binIndex] || 0;
        const percent = value / 255;
        const barH = percent * rect.height * 0.95;
        const y = rect.height - barH;

        // Custom cyber-spectrum gradient colors
        const greenValue = Math.floor(180 + percent * 75);
        ctx.fillStyle = `rgb(0, ${greenValue}, ${150 + percent * 30})`;
        ctx.fillRect(x + 1, y, barWidth - 2, barH);
        x += barWidth;
      }
    };

    draw();
  };

  // Rebuild Dynamic Web Audio Route Chain on the fly
  const createAndConnectNodes = () => {
    const ctx = audioCtxRef.current;
    if (!ctx || !audioBufferRef.current) return;

    // Disconnect old nodes safely
    if (sourceNodeRef.current) {
      try { sourceNodeRef.current.disconnect(); } catch(e){}
    }

    // Highpass 30Hz filter
    filterHp30Ref.current = ctx.createBiquadFilter();
    filterHp30Ref.current.type = "highpass";
    filterHp30Ref.current.frequency.value = 30;
    filterHp30Ref.current.Q.value = 0.707;

    // EQ Nodes (5 filters)
    filterSubRef.current = ctx.createBiquadFilter();
    filterSubRef.current.type = "lowshelf";
    filterSubRef.current.frequency.value = 60;
    filterSubRef.current.gain.value = eqSub;

    filterMudRef.current = ctx.createBiquadFilter();
    filterMudRef.current.type = "peaking";
    filterMudRef.current.frequency.value = 250;
    filterMudRef.current.Q.value = 1.0;
    filterMudRef.current.gain.value = eqMud;

    filterBodyRef.current = ctx.createBiquadFilter();
    filterBodyRef.current.type = "peaking";
    filterBodyRef.current.frequency.value = 1000;
    filterBodyRef.current.Q.value = 0.8;
    filterBodyRef.current.gain.value = eqBody;

    filterPresenceRef.current = ctx.createBiquadFilter();
    filterPresenceRef.current.type = "peaking";
    filterPresenceRef.current.frequency.value = 4000;
    filterPresenceRef.current.Q.value = 1.2;
    filterPresenceRef.current.gain.value = eqPresence;

    filterAirRef.current = ctx.createBiquadFilter();
    filterAirRef.current.type = "highshelf";
    filterAirRef.current.frequency.value = 10000;
    filterAirRef.current.gain.value = eqAir;

    // De-esser
    deesserFilterRef.current = ctx.createBiquadFilter();
    deesserFilterRef.current.type = "peaking";
    deesserFilterRef.current.frequency.value = 7500;
    deesserFilterRef.current.Q.value = 3.0;
    deesserFilterRef.current.gain.value = 0; // Activated if retro, podcast or auto sets it

    // Exciter
    exciterFilterRef.current = ctx.createBiquadFilter();
    exciterFilterRef.current.type = "highshelf";
    exciterFilterRef.current.frequency.value = 8500;
    exciterFilterRef.current.gain.value = 0;

    // Punch transient boost
    transientFilterRef.current = ctx.createBiquadFilter();
    transientFilterRef.current.type = "peaking";
    transientFilterRef.current.frequency.value = 3200;
    transientFilterRef.current.Q.value = 0.5;
    transientFilterRef.current.gain.value = 0;

    // DynamicsCompressor
    compressorNodeRef.current = ctx.createDynamicsCompressor();
    compressorNodeRef.current.threshold.value = compThreshold;
    compressorNodeRef.current.ratio.value = compRatio;
    compressorNodeRef.current.attack.value = compAttack / 1000;
    compressorNodeRef.current.release.value = compRelease / 1000;

    // Saturation WaveShaper
    saturationShaperRef.current = ctx.createWaveShaper();
    const shaperCurve = new Float32Array(44100);
    for (let i = 0; i < 44100; i++) {
      const x = (i * 2) / 44100 - 1;
      shaperCurve[i] = Math.tanh(x * 1.5) / Math.tanh(1.5);
    }
    saturationShaperRef.current.curve = shaperCurve;
    saturationShaperRef.current.oversample = "4x";

    // Limiter Waveshaper
    limiterNodeRef.current = ctx.createWaveShaper();
    const limitCurve = new Float32Array(44100);
    const ceilingLinear = Math.pow(10, limitCeiling / 20);
    for (let i = 0; i < 44100; i++) {
      const x = (i * 2) / 44100 - 1;
      if (Math.abs(x) < ceilingLinear) {
        limitCurve[i] = x;
      } else {
        limitCurve[i] = Math.sign(x) * (ceilingLinear + (Math.abs(x) - ceilingLinear) / (1 + Math.abs(x) - ceilingLinear - 0.2));
      }
    }
    limiterNodeRef.current.curve = limitCurve;

    // Auto Gain Node
    autoGainNodeRef.current = ctx.createGain();
    if (autoGainOn) {
      const currentEstLufs = estimateLUFSValue(audioBufferRef.current);
      const ratioDb = autoGainTarget - currentEstLufs;
      const gainLinear = Math.pow(10, ratioDb / 20);
      autoGainNodeRef.current.gain.value = Math.max(0.2, Math.min(4, gainLinear));
    } else {
      autoGainNodeRef.current.gain.value = 1.0;
    }

    // Master Gain
    gainNodeRef.current = ctx.createGain();
    gainNodeRef.current.gain.value = volume / 100;

    // Initialize parallel stem gains to allow real-time volume edits without stream interruptions
    stemsVocalsGainRef.current = ctx.createGain();
    stemsDrumsGainRef.current = ctx.createGain();
    stemsBassGainRef.current = ctx.createGain();
    stemsOtherGainRef.current = ctx.createGain();

    stemsVocalsGainRef.current.gain.value = stemsMutes.vocals ? 0 : stemsVolumes.vocals / 100;
    stemsDrumsGainRef.current.gain.value = stemsMutes.drums ? 0 : stemsVolumes.drums / 100;
    stemsBassGainRef.current.gain.value = stemsMutes.bass ? 0 : stemsVolumes.bass / 100;
    stemsOtherGainRef.current.gain.value = stemsMutes.other ? 0 : stemsVolumes.other / 100;

    // Analyser Node
    analyserNodeRef.current = ctx.createAnalyser();
    analyserNodeRef.current.fftSize = 256;
  };

  // Re-routes connections depend on states (Bypass, A/B mode)
  const connectAudioStream = (forceStart?: number, forceEnd?: number) => {
    const ctx = audioCtxRef.current;
    if (!ctx || !audioBufferRef.current) return;

    // Stop current source safely
    if (sourceNodeRef.current) {
      try { sourceNodeRef.current.disconnect(); } catch(e){}
    }

    sourceNodeRef.current = ctx.createBufferSource();
    sourceNodeRef.current.buffer = audioBufferRef.current;
    
    // Explicit loop start and end settings override to avoid state batching delay in Web Audio thread
    const activeStart = forceStart !== undefined ? forceStart : loopStart;
    const activeEnd = forceEnd !== undefined ? forceEnd : loopEnd;
    const isLoopActive = forceStart !== undefined ? true : loopRegionActive;

    if (isLoopActive && activeStart !== null && activeEnd !== null) {
      sourceNodeRef.current.loop = true;
      sourceNodeRef.current.loopStart = activeStart;
      sourceNodeRef.current.loopEnd = activeEnd;
    } else {
      sourceNodeRef.current.loop = loop;
    }

    // Hook up end callback
    sourceNodeRef.current.onended = () => {
      // Check if finished naturally without loop
      if (!loop && !isLoopActive) {
        setIsPlaying(false);
      }
    };

    const source = sourceNodeRef.current;

    // Update preset-specific parameters dynamically on filters before connecting
    if (repairPreset) {
      const presetSettings = PRESET_PARAMS[repairPreset];
      const intensityRatio = repairIntensity / 100;
      
      // Excitation boost
      if (presetSettings.extras.includes("exciter") && exciterFilterRef.current) {
        exciterFilterRef.current.gain.value = 5.0 * intensityRatio;
      }
      // De-esser peak drop
      if (presetSettings.extras.includes("deesser") && deesserFilterRef.current) {
        deesserFilterRef.current.gain.value = -9.0 * intensityRatio;
      }
      // Transient peak lift
      if (presetSettings.extras.includes("transient") && transientFilterRef.current) {
        transientFilterRef.current.gain.value = 6.0 * intensityRatio;
      }
    }

    // Connection Routing
    if (abMode || bypassAll) {
      // Direct raw link from source to master volume for absolute un-touched original A/B Comparison
      source.connect(gainNodeRef.current!);
    } else {
      // Connect original flow with processing chain
      source.connect(filterHp30Ref.current!);
      filterHp30Ref.current!.connect(filterSubRef.current!);
      filterSubRef.current!.connect(filterMudRef.current!);
      filterMudRef.current!.connect(filterBodyRef.current!);
      filterBodyRef.current!.connect(filterPresenceRef.current!);
      filterPresenceRef.current!.connect(filterAirRef.current!);

      let lastNode: AudioNode = filterAirRef.current!;

      // Insert extra repair nodes if active
      if (repairPreset) {
        const extras = PRESET_PARAMS[repairPreset].extras;
        if (extras.includes("deesser")) {
          lastNode.connect(deesserFilterRef.current!);
          lastNode = deesserFilterRef.current!;
        }
        if (extras.includes("exciter")) {
          lastNode.connect(exciterFilterRef.current!);
          lastNode = exciterFilterRef.current!;
        }
        if (extras.includes("transient")) {
          lastNode.connect(transientFilterRef.current!);
          lastNode = transientFilterRef.current!;
        }
        if (extras.includes("saturation")) {
          lastNode.connect(saturationShaperRef.current!);
          lastNode = saturationShaperRef.current!;
        }
      }

      // Dynamic modules toggle insertion
      if (compressorOn && compressorNodeRef.current) {
        lastNode.connect(compressorNodeRef.current);
        lastNode = compressorNodeRef.current;
      }

      if (limiterOn && limiterNodeRef.current) {
        lastNode.connect(limiterNodeRef.current);
        lastNode = limiterNodeRef.current;
      }

      if (autoGainOn && autoGainNodeRef.current) {
        lastNode.connect(autoGainNodeRef.current);
        lastNode = autoGainNodeRef.current;
      }

      // Emulate Stems dynamic volume attenuation in output routing if Split stems active
      if (stemsActive) {
        // Parallel branch crossover connections: lastNode splits into 4 frequency-isolated pathways with high isolation steep cascades
        
        // 1. Bass Branch (frequencies strictly isolated below 160Hz using cascaded 24dB/octave slope)
        const bassFilter1 = ctx.createBiquadFilter();
        bassFilter1.type = "lowpass";
        bassFilter1.frequency.value = 160;
        bassFilter1.Q.value = 1.0;

        const bassFilter2 = ctx.createBiquadFilter();
        bassFilter2.type = "lowpass";
        bassFilter2.frequency.value = 160;
        bassFilter2.Q.value = 1.0;

        lastNode.connect(bassFilter1);
        bassFilter1.connect(bassFilter2);
        bassFilter2.connect(stemsBassGainRef.current!);

        // 2. Vocals Branch (narrow bandpass focused on core vocal mid range [550Hz - 3000Hz] with steep crossovers)
        const vocalHp = ctx.createBiquadFilter();
        vocalHp.type = "highpass";
        vocalHp.frequency.value = 550;
        vocalHp.Q.value = 1.0;

        const vocalLp = ctx.createBiquadFilter();
        vocalLp.type = "lowpass";
        vocalLp.frequency.value = 3000;
        vocalLp.Q.value = 1.1;

        const vocalPeak = ctx.createBiquadFilter();
        vocalPeak.type = "peaking";
        vocalPeak.frequency.value = 1500;
        vocalPeak.Q.value = 1.0;
        vocalPeak.gain.value = 4.0; // Boost vocal definition

        lastNode.connect(vocalHp);
        vocalHp.connect(vocalLp);
        vocalLp.connect(vocalPeak);
        vocalPeak.connect(stemsVocalsGainRef.current!);

        // 3. Drums Branch (kick-drum specific 65Hz peaking booster combined in parallel with crisp high hat/shimmer above 7200Hz)
        // Kick branch (90Hz lowpass + 65Hz peaking)
        const drumKickLp = ctx.createBiquadFilter();
        drumKickLp.type = "lowpass";
        drumKickLp.frequency.value = 90;
        drumKickLp.Q.value = 1.3;

        const drumKickPeak = ctx.createBiquadFilter();
        drumKickPeak.type = "peaking";
        drumKickPeak.frequency.value = 65;
        drumKickPeak.Q.value = 2.0;
        drumKickPeak.gain.value = 12; // deep, clean physical punch

        lastNode.connect(drumKickLp);
        drumKickLp.connect(drumKickPeak);
        drumKickPeak.connect(stemsDrumsGainRef.current!);

        // Hat & Cymbals branch (highpass at 7200Hz)
        const drumSizzleHp = ctx.createBiquadFilter();
        drumSizzleHp.type = "highpass";
        drumSizzleHp.frequency.value = 7200;
        drumSizzleHp.Q.value = 1.1;

        lastNode.connect(drumSizzleHp);
        drumSizzleHp.connect(stemsDrumsGainRef.current!);

        // 4. Other Instruments Branch (midrange instrumentation complementary band split: 160Hz-550Hz and 3000Hz-7200Hz)
        // Mid-lows band
        const otherLowHp = ctx.createBiquadFilter();
        otherLowHp.type = "highpass";
        otherLowHp.frequency.value = 160;
        otherLowHp.Q.value = 1.0;

        const otherLowLp = ctx.createBiquadFilter();
        otherLowLp.type = "lowpass";
        otherLowLp.frequency.value = 550;
        otherLowLp.Q.value = 1.0;

        lastNode.connect(otherLowHp);
        otherLowHp.connect(otherLowLp);
        otherLowLp.connect(stemsOtherGainRef.current!);

        // High melody band
        const otherHighHp = ctx.createBiquadFilter();
        otherHighHp.type = "highpass";
        otherHighHp.frequency.value = 3000;
        otherHighHp.Q.value = 1.0;

        const otherHighLp = ctx.createBiquadFilter();
        otherHighLp.type = "lowpass";
        otherHighLp.frequency.value = 7200;
        otherHighLp.Q.value = 1.0;

        lastNode.connect(otherHighHp);
        otherHighHp.connect(otherHighLp);
        otherHighLp.connect(stemsOtherGainRef.current!);

        // Sum the 4 paths into a single output node with slight compensation
        const stemsSummingGain = ctx.createGain();
        stemsSummingGain.gain.value = 1.4; // higher boost to offset steep complementary crossover rolls

        stemsBassGainRef.current!.connect(stemsSummingGain);
        stemsVocalsGainRef.current!.connect(stemsSummingGain);
        stemsDrumsGainRef.current!.connect(stemsSummingGain);
        stemsOtherGainRef.current!.connect(stemsSummingGain);

        lastNode = stemsSummingGain;
      }

      lastNode.connect(gainNodeRef.current!);
    }

    gainNodeRef.current!.connect(analyserNodeRef.current!);
    analyserNodeRef.current!.connect(ctx.destination);
  };

  // Playback Control Triggers
  const handlePlayPause = () => {
    if (!audioLoaded) {
      showToast(tStr.toastNoFile);
      return;
    }

    const ctx = audioCtxRef.current;
    if (!ctx) return;

    if (isPlaying) {
      // Pause
      if (sourceNodeRef.current) {
        try { sourceNodeRef.current.stop(); } catch(e){}
      }
      pauseTimeRef.current = ctx.currentTime - startTimeRef.current;
      if (pauseTimeRef.current >= duration) {
        pauseTimeRef.current = 0;
      }
      setIsPlaying(false);
    } else {
      // Play
      createAndConnectNodes();
      connectAudioStream();

      // Check boundaries
      let startOffset = getSanitizedOffset(pauseTimeRef.current);
      if (startOffset >= (duration || 1)) {
        startOffset = 0;
      }

      sourceNodeRef.current!.start(0, startOffset);
      startTimeRef.current = ctx.currentTime - startOffset;
      setIsPlaying(true);
      startLiveSpectrum();
    }
  };

  // Stop button trigger
  const handleStop = () => {
    if (!audioLoaded) return;
    if (sourceNodeRef.current) {
      try { sourceNodeRef.current.stop(); } catch(e){}
    }
    setIsPlaying(false);
    setCurrentTime(0);
    setProgressPct(0);
    pauseTimeRef.current = 0;
  };

  // Real-time trackbar progress calculation Loop
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      const ctx = audioCtxRef.current;
      if (!ctx || !isPlaying) return;

      const elapsed = ctx.currentTime - startTimeRef.current;
      
      if (loopRegionActive && loopStart !== null && loopEnd !== null) {
        if (elapsed >= loopEnd) {
          // Calculate loop duration and shift anchor by whole loops to prevent visual lag or jumps
          const loopDuration = loopEnd - loopStart;
          const loopsCount = Math.floor((elapsed - loopStart) / loopDuration);
          if (loopsCount > 0) {
            startTimeRef.current += loopsCount * loopDuration;
          }
          const wrappedTime = loopStart + ((elapsed - loopStart) % loopDuration);
          setCurrentTime(wrappedTime);
          setProgressPct((wrappedTime / duration) * 100);
        } else {
          // Keep playhead strictly clamped and synchronized
          const actualTime = Math.max(loopStart, elapsed);
          setCurrentTime(actualTime);
          setProgressPct((actualTime / duration) * 100);
        }
      } else {
        if (elapsed >= duration) {
          if (loop) {
            startTimeRef.current = ctx.currentTime;
            setCurrentTime(0);
            setProgressPct(0);
          } else {
            setIsPlaying(false);
            setCurrentTime(0);
            setProgressPct(0);
            pauseTimeRef.current = 0;
          }
        } else {
          setCurrentTime(elapsed);
          setProgressPct((elapsed / duration) * 100);
        }
      }
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying, duration, loop, loopRegionActive, loopStart, loopEnd]);

  // Handles mouse and touch segment loops & seeks
  const handleWaveformMouseDown = (clientX: number) => {
    if (!audioLoaded || !waveformCanvasRef.current) return;
    const rect = waveformCanvasRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const boundedX = Math.max(0, Math.min(x, rect.width));

    setDragStartX(boundedX);
    setDragCurrentX(boundedX);
    setIsDraggingLoop(true);
  };

  const handleWaveformMouseMove = (clientX: number) => {
    if (!isDraggingLoop || !waveformCanvasRef.current) return;
    const rect = waveformCanvasRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const boundedX = Math.max(0, Math.min(x, rect.width));
    setDragCurrentX(boundedX);
  };

  const handleWaveformMouseUp = () => {
    if (!isDraggingLoop || dragStartX === null || dragCurrentX === null || !waveformCanvasRef.current) return;
    const rect = waveformCanvasRef.current.getBoundingClientRect();
    const rectWidth = rect.width;

    const startX = Math.min(dragStartX, dragCurrentX);
    const endX = Math.max(dragStartX, dragCurrentX);
    const deltaX = endX - startX;

    if (deltaX < 8) {
      const clickRatio = startX / rectWidth;
      const targetOffset = clickRatio * duration;

      pauseTimeRef.current = targetOffset;
      setCurrentTime(targetOffset);
      setProgressPct(clickRatio * 100);

      // Cancel loop region on plain click to avoid confusing loops
      setLoopRegionActive(false);
      setLoopStart(null);
      setLoopEnd(null);

      if (isPlaying) {
        createAndConnectNodes();
        connectAudioStream();
        sourceNodeRef.current!.start(0, targetOffset);
        startTimeRef.current = audioCtxRef.current!.currentTime - targetOffset;
      }
    } else {
      const tStart = (startX / rectWidth) * duration;
      const tEnd = (endX / rectWidth) * duration;

      setLoopStart(tStart);
      setLoopEnd(tEnd);
      setLoopRegionActive(true);
      setCurrentTime(tStart);
      setProgressPct((tStart / duration) * 100);

      showToast(lang === "sk" ? "Slučka označená a spustená" : "Loop section selected and playing");

      // Trigger autoplay of this loop segment
      setTimeout(() => {
        createAndConnectNodes();
        connectAudioStream();
        sourceNodeRef.current!.start(0, tStart);
        startTimeRef.current = audioCtxRef.current!.currentTime - tStart;
        setIsPlaying(true);
      }, 30);
    }

    setIsDraggingLoop(false);
    setDragStartX(null);
    setDragCurrentX(null);
  };

  const clearLoopRegion = () => {
    setLoopRegionActive(false);
    setLoopStart(null);
    setLoopEnd(null);
    if (isPlaying) {
      const current = currentTime;
      createAndConnectNodes();
      connectAudioStream();
      sourceNodeRef.current!.start(0, current);
      startTimeRef.current = audioCtxRef.current!.currentTime - current;
    }
  };

  // Live master volume updating hook
  useEffect(() => {
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = volume / 100;
    }
  }, [volume]);

  // Live EQ parameters updating hook without stream breaks
  useEffect(() => {
    if (filterSubRef.current) filterSubRef.current.gain.value = eqSub;
    if (filterMudRef.current) filterMudRef.current.gain.value = eqMud;
    if (filterBodyRef.current) filterBodyRef.current.gain.value = eqBody;
    if (filterPresenceRef.current) filterPresenceRef.current.gain.value = eqPresence;
    if (filterAirRef.current) filterAirRef.current.gain.value = eqAir;
  }, [eqSub, eqMud, eqBody, eqPresence, eqAir]);

  // Live Compressor parameters updating hook
  useEffect(() => {
    if (compressorNodeRef.current) {
      compressorNodeRef.current.threshold.value = compThreshold;
      compressorNodeRef.current.ratio.value = compRatio;
      compressorNodeRef.current.attack.value = compAttack / 1000;
      compressorNodeRef.current.release.value = compRelease / 1000;
    }
  }, [compThreshold, compRatio, compAttack, compRelease]);

  // LUFS target dynamics calculation node hook
  useEffect(() => {
    if (autoGainNodeRef.current && autoGainOn && audioBufferRef.current) {
      const currentEstLufs = estimateLUFSValue(audioBufferRef.current);
      const ratioDb = autoGainTarget - currentEstLufs;
      const gainLinear = Math.pow(10, ratioDb / 20);
      autoGainNodeRef.current.gain.value = Math.max(0.15, Math.min(4, gainLinear));
    } else if (autoGainNodeRef.current) {
      autoGainNodeRef.current.gain.value = 1.0;
    }
  }, [autoGainTarget, autoGainOn, audioLoaded]);

  // Live stems volumes & mutes update (No stream breaks or crackles!)
  useEffect(() => {
    const ctx = audioCtxRef.current;
    const time = ctx ? ctx.currentTime : 0;
    if (stemsVocalsGainRef.current) {
      const targetVal = stemsMutes.vocals ? 0 : stemsVolumes.vocals / 100;
      stemsVocalsGainRef.current.gain.setValueAtTime(targetVal, time);
    }
    if (stemsDrumsGainRef.current) {
      const targetVal = stemsMutes.drums ? 0 : stemsVolumes.drums / 100;
      stemsDrumsGainRef.current.gain.setValueAtTime(targetVal, time);
    }
    if (stemsBassGainRef.current) {
      const targetVal = stemsMutes.bass ? 0 : stemsVolumes.bass / 100;
      stemsBassGainRef.current.gain.setValueAtTime(targetVal, time);
    }
    if (stemsOtherGainRef.current) {
      const targetVal = stemsMutes.other ? 0 : stemsVolumes.other / 100;
      stemsOtherGainRef.current.gain.setValueAtTime(targetVal, time);
    }
  }, [stemsVolumes, stemsMutes]);

  // Dynamic presets select action (toggles off if already active)
  const selectRepairPresetAction = (preset: "radio" | "social" | "drums" | "vocal" | "retro" | "auto") => {
    if (!audioLoaded) {
      showToast(tStr.toastNoFile);
      return;
    }

    if (repairPreset === preset) {
      // Toggle it OFF! Restore default dry/flat state
      setRepairPreset(null);
      
      // Default flat settings
      setEqSub(0.0);
      setEqMud(0.0);
      setEqBody(0.0);
      setEqPresence(0.0);
      setEqAir(0.0);

      setCompThreshold(-18);
      setCompRatio(3.5);
      setCompAttack(6);
      setCompRelease(150);
      setLimitCeiling(-1.0);

      // Reconnect/rebuild nodes for dry channel without extras (deesser, exciter, etc.)
      setTimeout(() => {
        createAndConnectNodes();
        connectAudioStream();
        if (isPlaying) {
          const startOffset = getSanitizedOffset(audioCtxRef.current!.currentTime - startTimeRef.current);
          sourceNodeRef.current!.start(0, startOffset);
          startTimeRef.current = audioCtxRef.current!.currentTime - startOffset;
        }
        performOutputAudit();
      }, 50);

      showToast(lang === "sk" ? "Preset vypnutý, hrá pôvoné neupravené audio" : "Preset off, playing original clean audio");
      return;
    }

    setRepairPreset(preset);

    const actualPreset = preset === "auto" ? (recommendedPreset as any || "radio") : preset;
    const presetData = PRESET_PARAMS[actualPreset as keyof typeof PRESET_PARAMS] || PRESET_PARAMS.radio;
    const ratio = repairIntensity / 100;

    // Interpolate values
    setEqSub(parseFloat((presetData.eq.sub * ratio).toFixed(1)));
    setEqMud(parseFloat((presetData.eq.mud * ratio).toFixed(1)));
    setEqBody(parseFloat((presetData.eq.body * ratio).toFixed(1)));
    setEqPresence(parseFloat((presetData.eq.presence * ratio).toFixed(1)));
    setEqAir(parseFloat((presetData.eq.air * ratio).toFixed(1)));

    setCompThreshold(presetData.comp.threshold);
    setCompRatio(presetData.comp.ratio);
    setCompAttack(presetData.comp.attack);
    setCompRelease(presetData.comp.release);
    setLimitCeiling(presetData.limiterCeiling);

    const presetNameSK: Record<string, string> = {
      radio: "Rádio (Air & Wide)",
      social: "Sociálne siete (TikTok/YT)",
      drums: "Bicie & Prechody",
      vocal: "Vokály / Podcasty",
      retro: "Retro páska (Tape saturation)",
      auto: "Automatické odporúčanie"
    };
    const presetNameEN: Record<string, string> = {
      radio: "Radio (Air & Wide)",
      social: "Social Networks (TikTok/YT)",
      drums: "Drums & Transient Punch",
      vocal: "Vocals / Podcasts",
      retro: "Tape warmth / Saturation",
      auto: "Automatic Recommendation"
    };
    const name = lang === "sk" ? presetNameSK[preset] : presetNameEN[preset];
    showToast(lang === "sk" ? `Preset: "${name}" zapnutý!` : `Preset: "${name}" activated!`);

    // Force engine link rebuild
    setTimeout(() => {
      createAndConnectNodes();
      connectAudioStream();
      if (isPlaying) {
        const startOffset = getSanitizedOffset(audioCtxRef.current!.currentTime - startTimeRef.current);
        sourceNodeRef.current!.start(0, startOffset);
        startTimeRef.current = audioCtxRef.current!.currentTime - startOffset;
      }
      performOutputAudit();
    }, 50);
  };

  // Dynamic presets intensity slider updating hook
  const handleIntensitySlider = (val: number) => {
    setRepairIntensity(val);
    if (repairPreset) {
      const actualPreset = repairPreset === "auto" ? (recommendedPreset as any || "radio") : repairPreset;
      const presetData = PRESET_PARAMS[actualPreset as keyof typeof PRESET_PARAMS] || PRESET_PARAMS.radio;
      const ratio = val / 100;

      setEqSub(parseFloat((presetData.eq.sub * ratio).toFixed(1)));
      setEqMud(parseFloat((presetData.eq.mud * ratio).toFixed(1)));
      setEqBody(parseFloat((presetData.eq.body * ratio).toFixed(1)));
      setEqPresence(parseFloat((presetData.eq.presence * ratio).toFixed(1)));
      setEqAir(parseFloat((presetData.eq.air * ratio).toFixed(1)));

      // Force instant silent recalculation on playback
      setTimeout(() => {
        createAndConnectNodes();
        connectAudioStream();
        if (isPlaying) {
          const startOffset = getSanitizedOffset(audioCtxRef.current!.currentTime - startTimeRef.current);
          sourceNodeRef.current!.start(0, startOffset);
          startTimeRef.current = audioCtxRef.current!.currentTime - startOffset;
        }
        performOutputAudit();
      }, 50);
    }
  };

  // Phase 3 Audit: Analytical Calculations run automatically on file load
  const runAutomaticRawAudit = (buf: AudioBuffer) => {
    const ch0 = buf.getChannelData(0);
    const ch1 = buf.numberOfChannels > 1 ? buf.getChannelData(1) : null;
    const len = buf.length;

    // Mathematical peaks calculations
    let maxPeakVal = 0;
    let sumSquares = 0;
    const countStep = Math.max(1, Math.floor(len / 120000));

    for (let i = 0; i < len; i += countStep) {
      const sampleL = Math.abs(ch0[i]);
      if (sampleL > maxPeakVal) maxPeakVal = sampleL;
      sumSquares += sampleL * sampleL;

      if (ch1) {
        const sampleR = Math.abs(ch1[i]);
        if (sampleR > maxPeakVal) maxPeakVal = sampleR;
        sumSquares += sampleR * sampleR;
      }
    }

    const totalChannels = ch1 ? 2 : 1;
    const rmsLinear = Math.sqrt(sumSquares / ((len / countStep) * totalChannels));
    const peakDb = maxPeakVal > 0 ? 20 * Math.log10(maxPeakVal) : -60;
    const rmsDb = rmsLinear > 0 ? 20 * Math.log10(rmsLinear) : -60;

    // Estimate LUFS
    const lufsCalculated = parseFloat((rmsDb - 0.69).toFixed(1));

    // 1. Clipping detection
    const totalClippSamples = ch0.filter(s => Math.abs(s) >= 0.99).length;
    const clippingDetected = totalClippSamples > 50;

    // 2. DC Offset
    let sumSampleTotal = 0;
    for (let i = 0; i < len; i += countStep) {
      sumSampleTotal += ch0[i];
    }
    const dcOffsetLinear = sumSampleTotal / (len / countStep);
    const dcOffsetDetected = Math.abs(dcOffsetLinear) > 0.008;

    // 3. Phase Correlation (Est)
    let phaseCorr = 1.0;
    if (ch1) {
      let multiCorrelation = 0;
      let pLSq = 0;
      let pRSq = 0;
      for (let i = 0; i < len; i += Math.max(5, countStep)) {
        multiCorrelation += ch0[i] * ch1[i];
        pLSq += ch0[i] * ch0[i];
        pRSq += ch1[i] * ch1[i];
      }
      phaseCorr = multiCorrelation / (Math.sqrt(pLSq) * Math.sqrt(pRSq) + 0.00001);
    }
    const phaseIssueDetected = phaseCorr < 0.2;

    // 4. Dynamics Crest Factor
    const crestFactor = peakDb - rmsDb;
    const dynamicsIssueDetected = crestFactor < 7.5; // highly squashed

    // 5. Stereo Unbalance
    let lRmsAcc = 0;
    let rRmsAcc = 0;
    if (ch1) {
      for (let i = 0; i < len; i += countStep) {
        lRmsAcc += ch0[i] * ch0[i];
        rRmsAcc += ch1[i] * ch1[i];
      }
      lRmsAcc = Math.sqrt(lRmsAcc / (len / countStep));
      rRmsAcc = Math.sqrt(rRmsAcc / (len / countStep));
    }
    const diffDb = lRmsAcc > 0 ? Math.abs(20 * Math.log10(rRmsAcc / lRmsAcc)) : 0;
    const stereoIssueDetected = diffDb > 3.0;

    // 6. Noise level estimation
    const noiseEst = rmsDb < -48; // Quiet background is good

    // Recommended repair preset algorithm
    let optimalSystemPreset = "vocal";
    if (clippingDetected || dynamicsIssueDetected) {
      optimalSystemPreset = "radio";
    } else if (dcOffsetDetected || !noiseEst) {
      optimalSystemPreset = "retro";
    } else if (buf.numberOfChannels > 1 && stereoIssueDetected) {
      optimalSystemPreset = "social";
    } else {
      optimalSystemPreset = "drums";
    }

    setRecommendedPreset(optimalSystemPreset);

    setOriginalAuditData({
      truePeak: parseFloat(peakDb.toFixed(1)),
      rms: parseFloat(rmsDb.toFixed(1)),
      lufs: lufsCalculated,
      problems: {
        clipping: { ok: !clippingDetected, desc: clippingDetected ? tStr.clippingError : tStr.clippingOk },
        dc: { ok: !dcOffsetDetected, desc: dcOffsetDetected ? tStr.dcWarning : tStr.dcOk },
        phase: { ok: !phaseIssueDetected, desc: phaseIssueDetected ? tStr.phaseOut : tStr.phaseClean },
        dynamics: { ok: !dynamicsIssueDetected, desc: dynamicsIssueDetected ? tStr.dynWarning : tStr.dynOk },
        stereo: { ok: !stereoIssueDetected, desc: stereoIssueDetected ? tStr.stereoWarning : tStr.stereoOk },
        noise: { ok: noiseEst, desc: !noiseEst ? tStr.noiseWarning : tStr.noiseOk }
      }
    });
  };

  // Measures dynamic mastered output based on current settings
  const performOutputAudit = () => {
    if (!originalAuditData) return;
    setAnalysisActive(true);
    setAnalyzingText(lang === "sk" ? "Skenujem mastered výstup..." : "Scanning mastered output...");

    setTimeout(() => {
      let boostDb = 0;
      
      // EQ boosts contribution
      const eqAverage = (eqSub + eqMud + eqBody + eqPresence + eqAir) / 5;
      boostDb += eqAverage * (repairIntensity / 100);

      // Compressor contribution
      if (compressorOn) {
        const thresholdDelta = originalAuditData.rms - compThreshold;
        if (thresholdDelta > 0) {
          boostDb += (thresholdDelta * (1 - 1 / compRatio)) * 0.45;
        }
        boostDb += 1.5;
      }

      // Auto Gain contribution
      if (autoGainOn) {
        const currentEstLufs = originalAuditData.lufs + boostDb;
        if (currentEstLufs < -14.0) {
          const targetPush = -14.0 - currentEstLufs;
          boostDb += Math.min(8.0, targetPush);
        }
      }

      // Volume slider contribution
      const volumeRatio = volume / 100;
      const volDb = 20 * Math.log10(volumeRatio + 0.0001);
      boostDb += Math.max(-40, volDb);

      // Limiter ceiling constraint
      let outPeak = originalAuditData.truePeak + boostDb;
      if (limiterOn) {
        outPeak = Math.min(outPeak, limitCeiling);
      }

      const outLufs = parseFloat((originalAuditData.lufs + boostDb).toFixed(1));
      const outRms = parseFloat((originalAuditData.rms + boostDb).toFixed(1));

      const peakOk = outPeak < -0.2;
      const lufsOk = outLufs >= -16.0 && outLufs <= -10.0;
      const crestFactor = outPeak - outRms;
      const dynamicsOk = crestFactor >= 7.5;

      setOutputAuditData({
        truePeak: parseFloat(Math.min(0, outPeak).toFixed(1)),
        rms: outRms,
        lufs: Math.max(-60, Math.min(-1, outLufs)),
        problems: {
          clipping: { ok: peakOk, desc: !peakOk ? (lang === "sk" ? "Riziko prebudenia" : "Risk of distortion") : (lang === "sk" ? "Pod limitom orezu" : "Safe peaks") },
          lufs: { ok: lufsOk, desc: outLufs < -16.0 ? (lang === "sk" ? "Nízka hlasitosť (LUFS)" : "Quiet mix (LUFS)") : (outLufs > -10.0 ? (lang === "sk" ? "Príliš hlasné (LUFS)" : "Extremely loud") : (lang === "sk" ? "Ideálna hlasitosť" : "Perfect loudness")) },
          compression: { ok: dynamicsOk, desc: !dynamicsOk ? (lang === "sk" ? "Bez dynamiky" : "Squashed dynamics") : (lang === "sk" ? "Zdravá dynamika" : "Generous dynamics") }
        }
      });

      setAnalysisActive(false);
      setAuditDone(true);
      showToast(lang === "sk" ? "Meranie výstupu hotové!" : "Mastered audit completed!");
    }, 1000);
  };

  // Smart repair override for discovered raw problems
  const applyAutoFix = (issueKey: string) => {
    setFixedProblems(prev => ({ ...prev, [issueKey]: true }));
    
    if (issueKey === "clipping") {
      setLimiterOn(true);
      setLimitCeiling(-1.0);
      showToast(lang === "sk" ? "Limiter zapnutý (strop -1.0 dB)" : "Limiter enabled (ceiling -1.0 dB)");
    } else if (issueKey === "noise") {
      selectRepairPresetAction("vocal");
      showToast(lang === "sk" ? "Preset 'Vokály / Podcasty' aktivovaný" : "Preset 'Vocals / Podcasts' activated");
    } else if (issueKey === "dynamics") {
      setCompRatio(2.0);
      setCompThreshold(-14);
      showToast(lang === "sk" ? "Kompresia zjemnená pre živšiu dynamiku" : "Compression softened for livelier dynamics");
    } else if (issueKey === "dc") {
      // Direct current removal EQ low end notch
      setEqSub(-4.0);
      showToast(lang === "sk" ? "Sub-basový highpass filter upravený na odstránenie DC" : "Sub-bass EQ adjusted to cancel DC drift");
    } else {
      setAutoGainOn(true);
      showToast(lang === "sk" ? "Auto-Gain (Automatické dorovnanie) zapnuté" : "Auto-Gain active");
    }

    // Force engine link rebuild
    setTimeout(() => {
      if (isPlaying) {
        createAndConnectNodes();
        connectAudioStream();
        const startOffset = getSanitizedOffset(audioCtxRef.current!.currentTime - startTimeRef.current);
        sourceNodeRef.current!.start(0, startOffset);
        startTimeRef.current = audioCtxRef.current!.currentTime - startOffset;
      }
    }, 50);
  };

  // Stem Splitting Action emulates track separations and activates independent volumes
  const handleStemSplitAction = () => {
    if (!audioBufferRef.current) {
      showToast(tStr.toastNoFile);
      return;
    }
    setStemsSeparating(true);

    setTimeout(() => {
      setStemsActive(true);
      setStemsSeparating(false);
      showToast(tStr.done);

      // Reconnect with Stems
      if (isPlaying) {
        createAndConnectNodes();
        connectAudioStream();
        const startOffset = getSanitizedOffset(audioCtxRef.current!.currentTime - startTimeRef.current);
        sourceNodeRef.current!.start(0, startOffset);
        startTimeRef.current = audioCtxRef.current!.currentTime - startOffset;
      }
    }, 2200);
  };

  // Stems volumes state changes updated safely and quietly through the live-monitoring useEffect hook!
  const updateStemVolumeValue = (type: string, val: number) => {
    setStemsVolumes(prev => ({ ...prev, [type]: val }));
  };

  const toggleStemMute = (type: string) => {
    setStemsMutes(prev => ({
      ...prev,
      [type as keyof typeof prev]: !prev[type as keyof typeof prev]
    }));
  };

  // Export finished Master Audio file (Offline wav compilation)
  const [isExporting, setIsExporting] = useState(false);

  const loadLameJS = (): Promise<any> => {
    return new Promise((resolve, reject) => {
      if ((window as any).lamejs) {
        resolve((window as any).lamejs);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/lamejs/1.2.1/lame.all.min.js";
      script.onload = () => {
        resolve((window as any).lamejs);
      };
      script.onerror = () => {
        reject(new Error("Failed to load LameJS library for MP3 encoding."));
      };
      document.body.appendChild(script);
    });
  };

  const bufferToMP3Blob = async (audioBuffer: AudioBuffer, bitrate: number): Promise<Blob> => {
    const lamejs = await loadLameJS();
    const channels = audioBuffer.numberOfChannels;
    const sampleRate = audioBuffer.sampleRate;
    
    let mp3enc;
    if (channels === 2) {
      mp3enc = new lamejs.Mp3Encoder(2, sampleRate, bitrate);
    } else {
      mp3enc = new lamejs.Mp3Encoder(1, sampleRate, bitrate);
    }

    const mp3Data: any[] = [];
    const sampleBlockSize = 1152;
    
    const ch0 = audioBuffer.getChannelData(0);
    const ch1 = channels > 1 ? audioBuffer.getChannelData(1) : null;
    
    const convertBuffer = (buffer: Float32Array) => {
      const int16 = new Int16Array(buffer.length);
      for (let i = 0; i < buffer.length; i++) {
        let s = Math.max(-1, Math.min(1, buffer[i]));
        int16[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
      }
      return int16;
    };

    const leftInt16 = convertBuffer(ch0);
    const rightInt16 = ch1 ? convertBuffer(ch1) : null;

    let offset = 0;
    while (offset < leftInt16.length) {
      const leftChunk = leftInt16.subarray(offset, offset + sampleBlockSize);
      let mp3buf;
      if (channels === 2 && rightInt16) {
        const rightChunk = rightInt16.subarray(offset, offset + sampleBlockSize);
        mp3buf = mp3enc.encodeBuffer(leftChunk, rightChunk);
      } else {
        mp3buf = mp3enc.encodeBuffer(leftChunk);
      }
      if (mp3buf.length > 0) {
        mp3Data.push(mp3buf);
      }
      offset += sampleBlockSize;
    }

    const lastbuf = mp3enc.flush();
    if (lastbuf.length > 0) {
      mp3Data.push(lastbuf);
    }

    return new Blob(mp3Data, { type: "audio/mp3" });
  };

  const exportMasterAudioFile = async () => {
    if (!audioBufferRef.current) {
      showToast(tStr.toastNoFile);
      return;
    }
    const buf = audioBufferRef.current;
    setIsExporting(true);

    try {
      // Run render inside OfflineAudioContext to process with extremely high precision offline
      const offlineCtx = new OfflineAudioContext(
        buf.numberOfChannels,
        buf.length,
        buf.sampleRate
      );

      const sourceOffline = offlineCtx.createBufferSource();
      sourceOffline.buffer = buf;

      // Link fully identical chain node filters to the processing matrix inside OfflineContext
      const offlineFilterHp30 = offlineCtx.createBiquadFilter();
      offlineFilterHp30.type = "highpass";
      offlineFilterHp30.frequency.value = 30;

      const offlineSub = offlineCtx.createBiquadFilter();
      offlineSub.type = "lowshelf";
      offlineSub.frequency.value = 60;
      offlineSub.gain.value = eqSub;

      const offlineMud = offlineCtx.createBiquadFilter();
      offlineMud.type = "peaking";
      offlineMud.frequency.value = 250;
      offlineMud.gain.value = eqMud;

      const offlineBody = offlineCtx.createBiquadFilter();
      offlineBody.type = "peaking";
      offlineBody.frequency.value = 1000;
      offlineBody.gain.value = eqBody;

      const offlinePresence = offlineCtx.createBiquadFilter();
      offlinePresence.type = "peaking";
      offlinePresence.frequency.value = 4000;
      offlinePresence.gain.value = eqPresence;

      const offlineAir = offlineCtx.createBiquadFilter();
      offlineAir.type = "highshelf";
      offlineAir.frequency.value = 10000;
      offlineAir.gain.value = eqAir;

      // Connect Offline chain sources
      sourceOffline.connect(offlineFilterHp30);
      offlineFilterHp30.connect(offlineSub);
      offlineSub.connect(offlineMud);
      offlineMud.connect(offlineBody);
      offlineBody.connect(offlinePresence);
      offlinePresence.connect(offlineAir);

      let offlineLastNode: AudioNode = offlineAir;

      // Dynamics additions inside offline renderer
      if (compressorOn) {
        const offlineComp = offlineCtx.createDynamicsCompressor();
        offlineComp.threshold.value = compThreshold;
        offlineComp.ratio.value = compRatio;
        offlineComp.attack.value = compAttack / 1000;
        offlineComp.release.value = compRelease / 1000;

        offlineLastNode.connect(offlineComp);
        offlineLastNode = offlineComp;
      }

      if (limiterOn) {
        const offlineLimit = offlineCtx.createWaveShaper();
        const limitCurve = new Float32Array(44100);
        const ceilingLinear = Math.pow(10, limitCeiling / 20);
        for (let i = 0; i < 44100; i++) {
          const x = (i * 2) / 44100 - 1;
          if (Math.abs(x) < ceilingLinear) {
            limitCurve[i] = x;
          } else {
            limitCurve[i] = Math.sign(x) * (ceilingLinear + (Math.abs(x) - ceilingLinear) / (1 + Math.abs(x) - ceilingLinear - 0.2));
          }
        }
        offlineLimit.curve = limitCurve;
        
        offlineLastNode.connect(offlineLimit);
        offlineLastNode = offlineLimit;
      }

      if (autoGainOn) {
        const offlineGain = offlineCtx.createGain();
        const currentEstLufs = estimateLUFSValue(buf);
        const ratioDb = autoGainTarget - currentEstLufs;
        offlineGain.gain.value = Math.pow(10, ratioDb / 20);

        offlineLastNode.connect(offlineGain);
        offlineLastNode = offlineGain;
      }

      // Sum active stems if they are enabled
      if (stemsActive) {
        const stemsSummingGain = offlineCtx.createGain();
        stemsSummingGain.gain.value = 1.4; // Compensate for steep complemented crossover loss

        // Apply crossover path offline
        // 1. Bass (lowpass cascade 24dB/oct below 160Hz)
        const offlineBass1 = offlineCtx.createBiquadFilter();
        offlineBass1.type = "lowpass";
        offlineBass1.frequency.value = 160;
        offlineBass1.Q.value = 1.0;

        const offlineBass2 = offlineCtx.createBiquadFilter();
        offlineBass2.type = "lowpass";
        offlineBass2.frequency.value = 160;
        offlineBass2.Q.value = 1.0;

        offlineLastNode.connect(offlineBass1);
        offlineBass1.connect(offlineBass2);

        const offlineBassVolume = offlineCtx.createGain();
        offlineBassVolume.gain.value = stemsMutes.bass ? 0 : stemsVolumes.bass / 100;

        offlineBass2.connect(offlineBassVolume);
        offlineBassVolume.connect(stemsSummingGain);

        // 2. Vocal (bandpass 550Hz - 3000Hz + peaking focal lift)
        const offlineVocalHp = offlineCtx.createBiquadFilter();
        offlineVocalHp.type = "highpass";
        offlineVocalHp.frequency.value = 550;
        offlineVocalHp.Q.value = 1.0;

        const offlineVocalLp = offlineCtx.createBiquadFilter();
        offlineVocalLp.type = "lowpass";
        offlineVocalLp.frequency.value = 3000;
        offlineVocalLp.Q.value = 1.1;

        const offlineVocalPeak = offlineCtx.createBiquadFilter();
        offlineVocalPeak.type = "peaking";
        offlineVocalPeak.frequency.value = 1500;
        offlineVocalPeak.Q.value = 1.0;
        offlineVocalPeak.gain.value = 4.0;

        offlineLastNode.connect(offlineVocalHp);
        offlineVocalHp.connect(offlineVocalLp);
        offlineVocalLp.connect(offlineVocalPeak);

        const offlineVocalVolume = offlineCtx.createGain();
        offlineVocalVolume.gain.value = stemsMutes.vocals ? 0 : stemsVolumes.vocals / 100;

        offlineVocalPeak.connect(offlineVocalVolume);
        offlineVocalVolume.connect(stemsSummingGain);

        // 3. Drums (kick-drum specific 65Hz peaking booster + cymbals highpass above 7200Hz)
        const offlineDrumVol = offlineCtx.createGain();
        offlineDrumVol.gain.value = stemsMutes.drums ? 0 : stemsVolumes.drums / 100;

        // Kick path
        const offlineDrumKickLp = offlineCtx.createBiquadFilter();
        offlineDrumKickLp.type = "lowpass";
        offlineDrumKickLp.frequency.value = 90;
        offlineDrumKickLp.Q.value = 1.3;

        const offlineDrumKickPeak = offlineCtx.createBiquadFilter();
        offlineDrumKickPeak.type = "peaking";
        offlineDrumKickPeak.frequency.value = 65;
        offlineDrumKickPeak.Q.value = 2.0;
        offlineDrumKickPeak.gain.value = 12;

        offlineLastNode.connect(offlineDrumKickLp);
        offlineDrumKickLp.connect(offlineDrumKickPeak);
        offlineDrumKickPeak.connect(offlineDrumVol);

        // Sizzle path
        const offlineDrumSizzleHp = offlineCtx.createBiquadFilter();
        offlineDrumSizzleHp.type = "highpass";
        offlineDrumSizzleHp.frequency.value = 7200;
        offlineDrumSizzleHp.Q.value = 1.1;

        offlineLastNode.connect(offlineDrumSizzleHp);
        offlineDrumSizzleHp.connect(offlineDrumVol);

        offlineDrumVol.connect(stemsSummingGain);

        // 4. Other (Complementary dual-band structure: 160Hz-550Hz and 3000Hz-7200Hz)
        const offlineOtherVolume = offlineCtx.createGain();
        offlineOtherVolume.gain.value = stemsMutes.other ? 0 : stemsVolumes.other / 100;

        // Mid-lows
        const offlineOtherLowHp = offlineCtx.createBiquadFilter();
        offlineOtherLowHp.type = "highpass";
        offlineOtherLowHp.frequency.value = 160;
        offlineOtherLowHp.Q.value = 1.0;

        const offlineOtherLowLp = offlineCtx.createBiquadFilter();
        offlineOtherLowLp.type = "lowpass";
        offlineOtherLowLp.frequency.value = 550;
        offlineOtherLowLp.Q.value = 1.0;

        offlineLastNode.connect(offlineOtherLowHp);
        offlineOtherLowHp.connect(offlineOtherLowLp);
        offlineOtherLowLp.connect(offlineOtherVolume);

        // High melody
        const offlineOtherHighHp = offlineCtx.createBiquadFilter();
        offlineOtherHighHp.type = "highpass";
        offlineOtherHighHp.frequency.value = 3000;
        offlineOtherHighHp.Q.value = 1.0;

        const offlineOtherHighLp = offlineCtx.createBiquadFilter();
        offlineOtherHighLp.type = "lowpass";
        offlineOtherHighLp.frequency.value = 7200;
        offlineOtherHighLp.Q.value = 1.0;

        offlineLastNode.connect(offlineOtherHighHp);
        offlineOtherHighHp.connect(offlineOtherHighLp);
        offlineOtherHighLp.connect(offlineOtherVolume);

        offlineOtherVolume.connect(stemsSummingGain);

        offlineLastNode = stemsSummingGain;
      }

      // Link to output
      offlineLastNode.connect(offlineCtx.destination);

      sourceOffline.start(0);
      const renderedBuffer = await offlineCtx.startRendering();

      let fileBlob: Blob;
      let filename: string;

      if (exportFormat === "mp3") {
        fileBlob = await bufferToMP3Blob(renderedBuffer, mp3Bitrate);
        filename = `stemfix_mastered_${Date.now()}.mp3`;
      } else {
        fileBlob = bufferToWAVBlob(renderedBuffer);
        filename = `stemfix_mastered_${Date.now()}.wav`;
      }

      const downloadUrl = URL.createObjectURL(fileBlob);

      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = filename;
      link.click();
      URL.revokeObjectURL(downloadUrl);

      setIsExporting(false);
      showToast(tStr.done);
    } catch (err) {
      console.error(err);
      showToast(tStr.toastError);
      setIsExporting(false);
    }
  };

  // Convert rendered AudioBuffer into binary structure format WAV Blob
  const bufferToWAVBlob = (abuffer: AudioBuffer) => {
    const numOfChan = abuffer.numberOfChannels;
    const sampleRate = abuffer.sampleRate;
    const format = 1; // PCM
    const bitDepth = 16;
    const bytesPerSample = bitDepth / 8;
    const blockAlign = numOfChan * bytesPerSample;

    const dataLength = abuffer.length * numOfChan * bytesPerSample;
    const headerBuffer = new ArrayBuffer(44 + dataLength);
    const view = new DataView(headerBuffer);

    const writeString = (offset: number, string: string) => {
      for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
      }
    };

    writeString(0, "RIFF");
    view.setUint32(4, 36 + dataLength, true);
    writeString(8, "WAVE");

    writeString(12, "fmt ");
    view.setUint32(16, 16, true);
    view.setUint16(20, format, true);
    view.setUint16(22, numOfChan, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * blockAlign, true);
    view.setUint16(32, blockAlign, true);
    view.setUint16(34, bitDepth, true);

    writeString(36, "data");
    view.setUint32(40, dataLength, true);

    const channels: Float32Array[] = [];
    for (let i = 0; i < numOfChan; i++) {
      channels.push(abuffer.getChannelData(i));
    }

    let offset = 44;
    for (let i = 0; i < abuffer.length; i++) {
      for (let ch = 0; ch < numOfChan; ch++) {
        let sample = channels[ch][i];
        sample = Math.max(-1, Math.min(1, sample));
        sample = sample < 0 ? sample * 0x8000 : sample * 0x7FFF;
        view.setInt16(offset, sample, true);
        offset += 2;
      }
    }

    return new Blob([headerBuffer], { type: "audio/wav" });
  };

  // Clean elements hook
  useEffect(() => {
    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#06040a] text-slate-100 flex flex-col font-sans selection:bg-[#00d4aa] selection:text-[#06040a] relative overflow-hidden pb-12">
      {/* Dynamic futuristic grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1a30_1px,transparent_1px),linear-gradient(to_bottom,#1f1a30_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

      {/* Futuristic glow elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00d4aa] rounded-full filter blur-[150px] opacity-10 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600 rounded-full filter blur-[180px] opacity-10 pointer-events-none" />

      {/* Top sticky navbar */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[#0c0a0f]/80 border-b border-[#1a1528] px-4 py-3 sm:px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 bg-[#00d4aa] rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(0,212,170,0.4)] text-[#06040a]">
            <Flame className="w-5 h-5 sm:w-6 sm:h-6 animate-pulse" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
              {tStr.title}
              <span className="text-[10px] sm:text-xs bg-slate-800 text-slate-400 font-normal px-2 py-0.5 rounded-full border border-slate-700">
                PRO Studio 2.5
              </span>
            </h1>
            <p className="text-[9px] sm:text-xs text-slate-400 tracking-wide block">
              {tStr.subtitle}
            </p>
          </div>
        </div>

        {/* Locale language handler with both options visible and highlighted choice */}
        <div className="flex items-center gap-2 bg-[#09070c] p-[4px] rounded-xl border-2 border-slate-800 shadow-2xl">
          <button
            onClick={() => setLang("sk")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-black transition-all duration-300 uppercase tracking-widest cursor-pointer ${
              lang === "sk"
                ? "bg-[#00d4aa] text-[#06040a] ring-2 ring-[#00d4aa]/40 shadow-[0_0_15px_rgba(0,212,170,0.5)] scale-105"
                : "text-slate-400 hover:text-white hover:bg-slate-900 bg-transparent opacity-60"
            }`}
          >
            <span>🇸🇰 SK</span>
            {lang === "sk" && <span className="w-1.5 h-1.5 bg-slate-950 rounded-full animate-ping" />}
          </button>
          <button
            onClick={() => setLang("en")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-black transition-all duration-300 uppercase tracking-widest cursor-pointer ${
              lang === "en"
                ? "bg-[#00d4aa] text-[#06040a] ring-2 ring-[#00d4aa]/40 shadow-[0_0_15px_rgba(0,212,170,0.5)] scale-105"
                : "text-slate-400 hover:text-white hover:bg-slate-900 bg-transparent opacity-60"
            }`}
          >
            <span>🇬🇧 EN</span>
            {lang === "en" && <span className="w-1.5 h-1.5 bg-slate-950 rounded-full animate-ping" />}
          </button>
        </div>
      </header>

      {/* Main Container Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6 sm:py-8 grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 relative z-10">
        
        {/* Left column (Audio Source & Primary Mixer Components) */}
        <div className="lg:col-span-2 flex flex-col gap-6 sm:gap-8">
          
          {/* Upload card block */}
          <section id="upload-card" className="bg-[#0c0a0f] border border-[#1d1630] rounded-2xl p-4 sm:p-6 shadow-2xl relative overflow-hidden group">
            {/* Ambient group animation border */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#00d4aa] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2 mb-4">
              <FileAudio className="w-4 h-4 text-[#00d4aa]" />
              {tStr.uploadCard}
            </h2>

            <div
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => document.getElementById("file-loader")?.click()}
              className="border-2 border-dashed border-slate-800 rounded-xl p-8 text-center cursor-pointer bg-[#09070c] hover:border-[#00d4aa] hover:bg-[#00d4aa]/5 transition-all duration-300"
            >
              <input
                id="file-loader"
                type="file"
                accept="audio/*"
                className="hidden"
                onClick={(e) => e.stopPropagation()}
                onChange={handleFileSelectEvent}
              />
              <Sliders className="w-12 h-12 text-[#00d4aa] mx-auto mb-4 animate-bounce" />
              <p className="text-sm sm:text-base font-semibold text-slate-200">
                {file ? file.name : tStr.dragDropText}
              </p>
              <p className="text-xs text-slate-500 mt-2">
                {tStr.formatsSupported}
              </p>
            </div>

            {/* Audio Metadata Information Panel */}
            {audioLoaded && (
              <div className="mt-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
                <div className="p-2 border-r border-slate-800 last:border-0">
                  <span className="text-[10px] uppercase text-slate-500 tracking-wider">
                    {tStr.duration}
                  </span>
                  <span className="block text-sm font-black text-[#00d4aa] mt-1 font-mono">
                    {formatTime(duration)}
                  </span>
                </div>
                <div className="p-2 sm:border-r border-slate-800 last:border-0">
                  <span className="text-[10px] uppercase text-slate-500 tracking-wider">
                    {tStr.sampleRate}
                  </span>
                  <span className="block text-sm font-black text-slate-200 mt-1 font-mono">
                    {sampleRate} Hz
                  </span>
                </div>
                <div className="p-2 border-r border-slate-800 last:border-0">
                  <span className="text-[10px] uppercase text-slate-500 tracking-wider">
                    {tStr.channels}
                  </span>
                  <span className="block text-sm font-black text-slate-200 mt-1">
                    {channels === 1 ? "Mono" : "Stereo"}
                  </span>
                </div>
                <div className="p-2 sm:border-r border-slate-800 last:border-0">
                  <span className="text-[10px] uppercase text-slate-500 tracking-wider">
                    {tStr.estimatedBitrate}
                  </span>
                  <span className="block text-sm font-black text-slate-200 mt-1 font-mono">
                    {bitrate} kbps
                  </span>
                </div>
                <div className="p-2 last:border-0 col-span-2 sm:col-span-1">
                  <span className="text-[10px] uppercase text-slate-500 tracking-wider">
                    {tStr.lufs}
                  </span>
                  <span className="block text-sm font-black text-[#00d4aa] mt-1 font-mono">
                    {lufsValue ? `${lufsValue} LUFS` : "-"}
                  </span>
                </div>
              </div>
            )}
          </section>

          {/* Waveform Visualization & General Transport Controls */}
          <section id="waveform-card" className="bg-[#0c0a0f] border border-[#1d1630] rounded-2xl p-4 sm:p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <Music className="w-4 h-4 text-[#00d4aa]" />
                {tStr.waveform}
              </h2>
              {audioLoaded && (
                <span className="text-xs font-mono font-bold text-[#00d4aa] bg-[#00d4aa]/10 px-2.5 py-1 rounded">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              )}
            </div>

            <div className="relative">
              <div 
                className="w-full h-24 sm:h-28 rounded-xl overflow-hidden border border-slate-800 cursor-ew-resize relative select-none"
                onMouseDown={(e) => handleWaveformMouseDown(e.clientX)}
                onMouseMove={(e) => handleWaveformMouseMove(e.clientX)}
                onMouseUp={handleWaveformMouseUp}
                onMouseLeave={handleWaveformMouseUp}
                onTouchStart={(e) => {
                  if (e.touches && e.touches[0]) {
                    handleWaveformMouseDown(e.touches[0].clientX);
                  }
                }}
                onTouchMove={(e) => {
                  if (e.touches && e.touches[0]) {
                    handleWaveformMouseMove(e.touches[0].clientX);
                  }
                }}
                onTouchEnd={handleWaveformMouseUp}
              >
                <canvas 
                  ref={waveformCanvasRef} 
                  className="w-full h-full block" 
                />
                
                {/* Dragging Selector highlight layer */}
                {isDraggingLoop && dragStartX !== null && dragCurrentX !== null && (
                  <div 
                    className="absolute top-0 bottom-0 bg-[#00d4aa]/25 border-l-2 border-r-2 border-[#00d4aa] pointer-events-none"
                    style={{
                      left: `${Math.min(dragStartX, dragCurrentX)}px`,
                      width: `${Math.abs(dragStartX - dragCurrentX)}px`
                    }}
                  />
                )}

                {/* Persisted active loop region layer */}
                {loopRegionActive && loopStart !== null && loopEnd !== null && (
                  <div 
                    className="absolute top-0 bottom-0 bg-[#00d4aa]/20 border-l border-r border-[#00d4aa] pointer-events-none flex items-center justify-between px-2"
                    style={{
                      left: `${(loopStart / duration) * 100}%`,
                      width: `${((loopEnd - loopStart) / duration) * 100}%`
                    }}
                  >
                    <span className="text-[9px] font-mono font-bold bg-[#06040a]/90 text-[#00d4aa] px-1 py-0.5 rounded border border-[#00d4aa]/30 uppercase">
                      Start: {loopStart.toFixed(1)}s
                    </span>
                    <span className="text-[9px] font-mono font-bold bg-[#06040a]/90 text-[#00d4aa] px-1 py-0.5 rounded border border-[#00d4aa]/30 uppercase">
                      End: {loopEnd.toFixed(1)}s
                    </span>
                  </div>
                )}
                
                {/* Visual playhead tracking layer */}
                <div 
                  className="absolute top-0 bottom-0 left-0 bg-[#00d4aa]/10 border-r-2 border-[#00d4aa] pointer-events-none transition-all duration-75"
                  style={{ width: `${progressPct}%` }}
                />
              </div>

              {/* Clear Loop Region Control if active */}
              {loopRegionActive && (
                <div className="absolute -top-3.5 right-2 z-20">
                  <button 
                    onClick={clearLoopRegion}
                    className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-red-500/90 text-[9px] font-extrabold uppercase text-white hover:bg-red-600 transition tracking-wider shadow"
                  >
                    ✕ {lang === "sk" ? "Zrušiť slučku" : "Cancel loop"}
                  </button>
                </div>
              )}
            </div>

            {/* General Playback Actions */}
            <div className="flex flex-wrap items-center justify-between gap-4 mt-5 pt-3 border-t border-slate-900">
              <div className="flex items-center gap-2.5">
                <button
                  onClick={handlePlayPause}
                  disabled={!audioLoaded}
                  className="w-12 h-12 rounded-full bg-[#00d4aa] text-[#06040a] hover:scale-105 active:scale-95 disabled:opacity-35 disabled:pointer-events-none flex items-center justify-center font-bold tracking-wider transition shadow-[0_0_15px_rgba(0,212,170,0.3)]"
                >
                  {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
                </button>

                <button
                  onClick={handleStop}
                  disabled={!audioLoaded}
                  className="w-10 h-10 rounded-full border border-slate-800 text-slate-300 hover:bg-slate-800 disabled:opacity-35 disabled:pointer-events-none flex items-center justify-center transition"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setLoop(!loop)}
                  disabled={!audioLoaded}
                  className={`px-3.5 py-1.5 sm:py-2 rounded-lg border text-xs sm:text-sm font-bold flex items-center gap-1.5 transition ${
                    loop 
                      ? "bg-[#00d4aa]/10 border-[#00d4aa] text-[#00d4aa]" 
                      : "border-slate-800 text-slate-400 hover:bg-slate-800"
                  }`}
                >
                  <span className="relative flex h-2 w-2">
                    {loop && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00d4aa] opacity-75"></span>}
                    <span className={`relative inline-flex rounded-full h-2 w-2 ${loop ? "bg-[#00d4aa]" : "bg-slate-600"}`}></span>
                  </span>
                  {tStr.loop}
                </button>
              </div>

              {/* A/B Monitoring Indicator */}
              <div className="flex items-center gap-2 bg-[#09070c] border border-slate-800 px-3 py-1.5 sm:py-2 rounded-xl">
                <span className="text-xs text-slate-500 font-semibold">{tStr.abLabel}:</span>
                <button
                  onClick={() => {
                    setAbMode(!abMode);
                    showToast(abMode ? tStr.abProcessedActive : tStr.abOriginalActive);
                    // Hot update Web Audio linked nodes
                    if (isPlaying) {
                      setTimeout(() => {
                        createAndConnectNodes();
                        connectAudioStream();
                        const offset = getSanitizedOffset(audioCtxRef.current!.currentTime - startTimeRef.current);
                        sourceNodeRef.current!.start(0, offset);
                        startTimeRef.current = audioCtxRef.current!.currentTime - offset;
                      }, 50);
                    }
                  }}
                  disabled={!audioLoaded}
                  className={`text-xs sm:text-sm font-black px-3.5 py-1 sm:py-1.5 rounded-lg transition uppercase ${
                    abMode 
                      ? "bg-amber-500/10 border border-amber-500/50 text-amber-500" 
                      : "bg-[#00d4aa]/10 border border-[#00d4aa]/50 text-[#00d4aa]"
                  }`}
                >
                  {abMode ? tStr.original : tStr.processed}
                </button>
              </div>
            </div>

            {/* A/B Mode banner tooltip alerts */}
            {abMode && audioLoaded && (
              <div className="mt-3 px-3.5 py-2.5 rounded-xl border border-amber-600/30 bg-amber-600/5 text-amber-500 text-[10px] sm:text-xs font-semibold flex items-center gap-2 animate-pulse">
                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                {tStr.abOriginalActive}
              </div>
            )}
          </section>

          {/* 5-Band Studio Equalizer Panel */}
          <section id="equalizer-card" className="bg-[#0c0a0f] border border-[#1d1630] rounded-2xl p-4 sm:p-6 shadow-2xl">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2 mb-6">
              <Sliders className="w-4 h-4 text-[#00d4aa]" />
              {tStr.eqTitle}
            </h2>

            {/* Responsive grid with sliders */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-6 sm:gap-4">
              
              {/* Band 1 - Sub */}
              <div className="flex sm:flex-col items-center justify-between gap-4 p-3 rounded-xl bg-slate-900/40 border border-slate-800/50">
                <span className="text-xs font-bold text-slate-300 w-24 sm:w-auto text-left sm:text-center block leading-tight">
                  {tStr.lowS} <small className="block text-[9px] text-[#00d4aa] mt-0.5">60 Hz</small>
                </span>
                <div className="flex-1 sm:flex-initial sm:h-36 flex items-center justify-center py-2">
                  <input
                    type="range"
                    min="-12"
                    max="12"
                    step="0.5"
                    value={eqSub}
                    onChange={(e) => setEqSub(parseFloat(e.target.value))}
                    className="w-full sm:-rotate-90 sm:w-28 accent-[#00d4aa]"
                  />
                </div>
                <span className="text-xs font-black font-mono tracking-wider w-12 sm:w-auto text-right sm:text-center block text-[#00d4aa]">
                  {eqSub > 0 ? `+${eqSub}` : eqSub} dB
                </span>
              </div>

              {/* Band 2 - Mud */}
              <div className="flex sm:flex-col items-center justify-between gap-4 p-3 rounded-xl bg-slate-900/40 border border-slate-800/50">
                <span className="text-xs font-bold text-slate-300 w-24 sm:w-auto text-left sm:text-center block leading-tight">
                  {tStr.mudB} <small className="block text-[9px] text-[#00d4aa] mt-0.5">250 Hz</small>
                </span>
                <div className="flex-1 sm:flex-initial sm:h-36 flex items-center justify-center py-2">
                  <input
                    type="range"
                    min="-12"
                    max="12"
                    step="0.5"
                    value={eqMud}
                    onChange={(e) => setEqMud(parseFloat(e.target.value))}
                    className="w-full sm:-rotate-90 sm:w-28 accent-[#00d4aa]"
                  />
                </div>
                <span className="text-xs font-black font-mono tracking-wider w-12 sm:w-auto text-right sm:text-center block text-[#00d4aa]">
                  {eqMud > 0 ? `+${eqMud}` : eqMud} dB
                </span>
              </div>

              {/* Band 3 - Mid */}
              <div className="flex sm:flex-col items-center justify-between gap-4 p-3 rounded-xl bg-slate-900/40 border border-slate-800/50">
                <span className="text-xs font-bold text-slate-300 w-24 sm:w-auto text-left sm:text-center block leading-tight">
                  {tStr.midB} <small className="block text-[9px] text-[#00d4aa] mt-0.5">1 kHz</small>
                </span>
                <div className="flex-1 sm:flex-initial sm:h-36 flex items-center justify-center py-2">
                  <input
                    type="range"
                    min="-12"
                    max="12"
                    step="0.5"
                    value={eqBody}
                    onChange={(e) => setEqBody(parseFloat(e.target.value))}
                    className="w-full sm:-rotate-90 sm:w-28 accent-[#00d4aa]"
                  />
                </div>
                <span className="text-xs font-black font-mono tracking-wider w-12 sm:w-auto text-right sm:text-center block text-[#00d4aa]">
                  {eqBody > 0 ? `+${eqBody}` : eqBody} dB
                </span>
              </div>

              {/* Band 4 - Presence */}
              <div className="flex sm:flex-col items-center justify-between gap-4 p-3 rounded-xl bg-slate-900/40 border border-slate-800/50">
                <span className="text-xs font-bold text-slate-300 w-24 sm:w-auto text-left sm:text-center block leading-tight">
                  {tStr.presenceB} <small className="block text-[9px] text-[#00d4aa] mt-0.5">4 kHz</small>
                </span>
                <div className="flex-1 sm:flex-initial sm:h-36 flex items-center justify-center py-2">
                  <input
                    type="range"
                    min="-12"
                    max="12"
                    step="0.5"
                    value={eqPresence}
                    onChange={(e) => setEqPresence(parseFloat(e.target.value))}
                    className="w-full sm:-rotate-90 sm:w-28 accent-[#00d4aa]"
                  />
                </div>
                <span className="text-xs font-black font-mono tracking-wider w-12 sm:w-auto text-right sm:text-center block text-[#00d4aa]">
                  {eqPresence > 0 ? `+${eqPresence}` : eqPresence} dB
                </span>
              </div>

              {/* Band 5 - Air */}
              <div className="flex sm:flex-col items-center justify-between gap-4 p-3 rounded-xl bg-slate-900/40 border border-slate-800/50">
                <span className="text-xs font-bold text-slate-300 w-24 sm:w-auto text-left sm:text-center block leading-tight">
                  {tStr.airB} <small className="block text-[9px] text-[#00d4aa] mt-0.5">10 kHz</small>
                </span>
                <div className="flex-1 sm:flex-initial sm:h-36 flex items-center justify-center py-2">
                  <input
                    type="range"
                    min="-12"
                    max="12"
                    step="0.5"
                    value={eqAir}
                    onChange={(e) => setEqAir(parseFloat(e.target.value))}
                    className="w-full sm:-rotate-90 sm:w-28 accent-[#00d4aa]"
                  />
                </div>
                <span className="text-xs font-black font-mono tracking-wider w-12 sm:w-auto text-right sm:text-center block text-[#00d4aa]">
                  {eqAir > 0 ? `+${eqAir}` : eqAir} dB
                </span>
              </div>

            </div>
          </section>

          {/* Dynamics & Compressors Panel */}
          <section id="dynamics-card" className="bg-[#0c0a0f] border border-[#1d1630] rounded-2xl p-4 sm:p-6 shadow-2xl">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2 mb-6">
              <Activity className="w-4 h-4 text-[#00d4aa]" />
              {tStr.dynamicsTitle}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Compressor Module toggle */}
              <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/50">
                <div className="flex items-center justify-between mb-4">
                  <label className="text-xs font-extrabold uppercase text-slate-300 tracking-wider flex items-center gap-1.5">
                    <span className={`w-2.5 h-2.5 rounded-full ${compressorOn ? "bg-[#00d4aa]" : "bg-slate-600"}`} />
                    {tStr.compressor}
                  </label>
                  <button
                    onClick={() => setCompressorOn(!compressorOn)}
                    className={`text-xs px-2.5 py-1 rounded font-bold transition ${
                      compressorOn ? "bg-[#00d4aa] text-[#06040a]" : "bg-slate-800 text-slate-400"
                    }`}
                  >
                    {compressorOn ? "ON" : "OFF"}
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs text-slate-400 mb-1.5">
                      <span>{tStr.threshold}</span>
                      <span className="font-mono text-[#00d4aa] font-bold">{compThreshold} dB</span>
                    </div>
                    <input
                      type="range"
                      min="-60"
                      max="0"
                      step="1"
                      value={compThreshold}
                      disabled={!compressorOn}
                      onChange={(e) => setCompThreshold(parseInt(e.target.value))}
                      className="w-full accent-[#00d4aa]"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-slate-400 mb-1.5">
                      <span>{tStr.ratio}</span>
                      <span className="font-mono text-[#00d4aa] font-bold">{compRatio}:1</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="15"
                      step="0.5"
                      disabled={!compressorOn}
                      value={compRatio}
                      onChange={(e) => setCompRatio(parseFloat(e.target.value))}
                      className="w-full accent-[#00d4aa]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="text-[10px] text-slate-500 block mb-1">{tStr.attack}</span>
                      <input
                        type="number"
                        min="1"
                        max="100"
                        value={compAttack}
                        disabled={!compressorOn}
                        onChange={(e) => setCompAttack(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-full px-2.5 py-1 text-xs rounded bg-slate-950 border border-slate-850 font-mono text-slate-300"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block mb-1">{tStr.release}</span>
                      <input
                        type="number"
                        min="10"
                        max="1000"
                        value={compRelease}
                        disabled={!compressorOn}
                        onChange={(e) => setCompRelease(Math.max(10, parseInt(e.target.value) || 10))}
                        className="w-full px-2.5 py-1 text-xs rounded bg-slate-950 border border-slate-850 font-mono text-slate-300"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Limiter Module toggle */}
              <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/50 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <label className="text-xs font-extrabold uppercase text-slate-300 tracking-wider flex items-center gap-1.5">
                      <span className={`w-2.5 h-2.5 rounded-full ${limiterOn ? "bg-[#00d4aa]" : "bg-slate-600"}`} />
                      {tStr.limiter}
                    </label>
                    <button
                      onClick={() => setLimiterOn(!limiterOn)}
                      className={`text-xs px-2.5 py-1 rounded font-bold transition ${
                        limiterOn ? "bg-[#00d4aa] text-[#06040a]" : "bg-slate-800 text-slate-400"
                      }`}
                    >
                      {limiterOn ? "ON" : "OFF"}
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-xs text-slate-400 mb-1.5">
                        <span>Limit Ceiling</span>
                        <span className="font-mono text-[#00d4aa] font-bold">{limitCeiling} dBFs</span>
                      </div>
                      <input
                        type="range"
                        min="-12"
                        max="0"
                        step="0.1"
                        disabled={!limiterOn}
                        value={limitCeiling}
                        onChange={(e) => setLimitCeiling(parseFloat(e.target.value))}
                        className="w-full accent-[#00d4aa]"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-800/60">
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-xs font-extrabold uppercase text-slate-300 tracking-wider flex items-center gap-1.5">
                      <span className={`w-2.5 h-2.5 rounded-full ${autoGainOn ? "bg-[#00d4aa]" : "bg-slate-600"}`} />
                      {tStr.autoGain}
                    </label>
                    <button
                      onClick={() => setAutoGainOn(!autoGainOn)}
                      className={`text-xs px-2.5 py-1 rounded font-bold transition ${
                        autoGainOn ? "bg-[#00d4aa] text-[#06040a]" : "bg-slate-800 text-slate-400"
                      }`}
                    >
                      {autoGainOn ? "ON" : "OFF"}
                    </button>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-slate-400 mb-1.5">
                      <span>Cieľový LUFS</span>
                      <span className="font-mono text-[#00d4aa] font-bold">{autoGainTarget} LUFS</span>
                    </div>
                    <input
                      type="range"
                      min="-22"
                      max="-6"
                      step="1"
                      disabled={!autoGainOn}
                      value={autoGainTarget}
                      onChange={(e) => setAutoGainTarget(parseInt(e.target.value))}
                      className="w-full accent-[#00d4aa]"
                    />
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* Live Frequency Spectrum Analyzer Graph visualization */}
          <section id="spectrum-card" className="bg-[#0c0a0f] border border-[#1d1630] rounded-2xl p-4 sm:p-6 shadow-2xl">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2 mb-4">
              <Activity className="w-4 h-4 text-[#00d4aa]" />
              {tStr.analyzerTitle}
            </h2>
            <div className="w-full h-24 bg-[#09070c] rounded-xl border border-slate-800 overflow-hidden">
              <canvas ref={spectrumCanvasRef} className="w-full h-full block" />
            </div>
            <div className="mt-2 text-[10px] sm:text-xs text-slate-500 flex justify-between px-1">
              <span>20 Hz</span>
              <span>150 Hz</span>
              <span>500 Hz</span>
              <span>2 kHz</span>
              <span>8 kHz</span>
              <span>20 kHz</span>
            </div>
          </section>

        </div>

        {/* Right column (Control Presets, Quality Audit, Separation, Exports, Donate) */}
        <div className="flex flex-col gap-6 sm:gap-8">

          {/* Master Output Volume control card */}
          <section id="master-volume-card" className="bg-[#0c0a0f] border border-[#1d1630] rounded-2xl p-4 sm:p-6 shadow-2xl">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2 mb-3">
              <Volume2 className="w-4 h-4 text-[#00d4aa]" />
              {tStr.masterVolume}
            </h2>
            <div className="flex items-center gap-3.5">
              <button
                onClick={() => setVolume(volume === 0 ? 80 : 0)}
                className="p-2 bg-slate-900 border border-slate-800 rounded-lg text-[#00d4aa]"
              >
                {volume === 0 ? <VolumeX className="w-5 h-5" /> : volume < 40 ? <Volume1 className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={(e) => setVolume(parseInt(e.target.value))}
                className="flex-1 accent-[#00d4aa]"
              />
              <span className="text-xs font-mono font-bold w-10 text-right">{volume}%</span>
            </div>
          </section>

          {/* Repair Presets Controls Card (Phase 4) */}
          <section id="presets-card" className="bg-[#0c0a0f] border border-[#1d1630] rounded-2xl p-4 sm:p-6 shadow-2xl">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2 mb-4">
              <Wrench className="w-4 h-4 text-[#00d4aa]" />
              {tStr.repairTitle}
            </h2>

            {/* Intensity Level range control */}
            <div className="mb-4 bg-slate-900/60 p-3 rounded-lg border border-slate-800">
              <div className="flex justify-between text-xs text-slate-400 mb-1.5">
                <span>{tStr.repairIntensity}</span>
                <span className="font-mono text-[#00d4aa] font-bold">{repairIntensity}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={repairIntensity}
                onChange={(e) => handleIntensitySlider(parseInt(e.target.value))}
                className="w-full accent-[#00d4aa]"
              />
            </div>

            {/* Recommended alert banner (Interactive Click to Apply) */}
            {recommendedPreset && (
              <button
                type="button"
                onClick={() => selectRepairPresetAction(recommendedPreset as any)}
                className="w-full text-left mb-4 px-3.5 py-2.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/15 border border-emerald-500/35 text-emerald-400 text-xs font-semibold flex items-center gap-2 cursor-pointer transition"
              >
                <Bot className="w-4 h-4 text-[#00d4aa] animate-bounce shrink-0" />
                <span className="leading-normal flex-1">
                  {tStr.recomendedMode}: <strong className="uppercase underline hover:text-[#00d4aa]">{recommendedPreset}</strong>
                </span>
                <span className="text-[10px] bg-emerald-500/20 px-2 py-0.5 rounded uppercase font-black tracking-widest text-[#00d4aa]">
                  {lang === "sk" ? "Použiť" : "Apply"}
                </span>
              </button>
            )}

            {/* Selection vertical items list */}
            <div className="space-y-2">
              <h3 className="text-xs text-slate-500 tracking-wide font-bold mb-1">
                {tStr.repairPresetLabel}
              </h3>
              
              <button
                onClick={() => selectRepairPresetAction("radio")}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl border text-xs flex items-center justify-between transition ${
                  repairPreset === "radio" 
                    ? "bg-[#00d4aa]/25 border-2 border-[#00d4aa] text-[#00d4aa] shadow-[0_0_15px_rgba(0,212,170,0.15)] font-bold" 
                    : "bg-slate-950 border-slate-850 text-slate-300 hover:border-[#00d4aa]/30"
                }`}
              >
                <span className="flex items-center gap-2">
                  <RadioIcon className="w-4 h-4 text-[#00d4aa]" />
                  {tStr.presetRadio}
                </span>
                <Sparkles className="w-3.5 h-3.5 text-slate-600" />
              </button>

              <button
                onClick={() => selectRepairPresetAction("social")}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl border text-xs flex items-center justify-between transition ${
                  repairPreset === "social" 
                    ? "bg-[#00d4aa]/25 border-2 border-[#00d4aa] text-[#00d4aa] shadow-[0_0_15px_rgba(0,212,170,0.15)] font-bold" 
                    : "bg-slate-950 border-slate-850 text-slate-300 hover:border-[#00d4aa]/30"
                }`}
              >
                <span className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-[#00d4aa]" />
                  {tStr.presetSocial}
                </span>
                <Sparkles className="w-3.5 h-3.5 text-slate-600" />
              </button>

              <button
                onClick={() => selectRepairPresetAction("drums")}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl border text-xs flex items-center justify-between transition ${
                  repairPreset === "drums" 
                    ? "bg-[#00d4aa]/25 border-2 border-[#00d4aa] text-[#00d4aa] shadow-[0_0_15px_rgba(0,212,170,0.15)] font-bold" 
                    : "bg-slate-950 border-slate-850 text-slate-300 hover:border-[#00d4aa]/30"
                }`}
              >
                <span className="flex items-center gap-2">
                  <Music className="w-4 h-4 text-[#00d4aa]" />
                  {tStr.presetDrums}
                </span>
                <Sparkles className="w-3.5 h-3.5 text-slate-600" />
              </button>

              <button
                onClick={() => selectRepairPresetAction("vocal")}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl border text-xs flex items-center justify-between transition ${
                  repairPreset === "vocal" 
                    ? "bg-[#00d4aa]/25 border-2 border-[#00d4aa] text-[#00d4aa] shadow-[0_0_15px_rgba(0,212,170,0.15)] font-bold" 
                    : "bg-slate-950 border-slate-850 text-slate-300 hover:border-[#00d4aa]/30"
                }`}
              >
                <span className="flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-[#00d4aa]" />
                  {tStr.presetVocal}
                </span>
                <Sparkles className="w-3.5 h-3.5 text-slate-600" />
              </button>

              <button
                onClick={() => selectRepairPresetAction("retro")}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl border text-xs flex items-center justify-between transition ${
                  repairPreset === "retro" 
                    ? "bg-[#00d4aa]/25 border-2 border-[#00d4aa] text-[#00d4aa] shadow-[0_0_15px_rgba(0,212,170,0.15)] font-bold" 
                    : "bg-slate-950 border-slate-850 text-slate-300 hover:border-[#00d4aa]/30"
                }`}
              >
                <span className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#00d4aa]" />
                  {tStr.presetRetro}
                </span>
                <Sparkles className="w-3.5 h-3.5 text-slate-600" />
              </button>

              <button
                onClick={() => selectRepairPresetAction("auto")}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl border text-xs flex items-center justify-between transition ${
                  repairPreset === "auto" 
                    ? "bg-[#00d4aa]/25 border-2 border-[#00d4aa] text-[#00d4aa] shadow-[0_0_15px_rgba(0,212,170,0.15)] font-bold" 
                    : "bg-slate-950 border-slate-850 text-slate-300 hover:border-[#00d4aa]/30"
                }`}
              >
                <span className="flex items-center gap-2">
                  <Bot className="w-4 h-4 text-[#00d4aa]" />
                  {tStr.presetAuto}
                </span>
                <Sparkles className="w-3.5 h-3.5 text-slate-600" />
              </button>
            </div>
          </section>

          {/* Stem Separation Card (Phase 7 Mocked simulation) */}
          <section id="stems-splitting-card" className="bg-[#0c0a0f] border border-[#1d1630] rounded-2xl p-4 sm:p-6 shadow-2xl">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2 mb-4">
              <Sliders className="w-4 h-4 text-[#00d4aa]" />
              {tStr.stemsTitle}
            </h2>

            {!stemsActive ? (
              <button
                onClick={handleStemSplitAction}
                disabled={!audioLoaded || stemsSeparating}
                className="w-full py-3 bg-[#00d4aa] text-[#06040a] font-black uppercase text-xs tracking-wider rounded-xl hover:scale-[1.02] active:scale-[0.98] transition shadow-[0_0_15px_rgba(0,212,170,0.25)] flex items-center justify-center gap-2 disabled:opacity-30 disabled:pointer-events-none"
              >
                {stemsSeparating ? (
                  <>
                    <span className="animate-spin rounded-full h-4 w-4 border-2 border-[#06040a] border-t-transparent" />
                    {tStr.processingSeparate}
                  </>
                ) : (
                  <>
                    <Sliders className="w-4 h-4 fill-current" />
                    {tStr.separateBtn}
                  </>
                )}
              </button>
            ) : (
              <div className="space-y-3.5">
                
                {/* Stem Vocals */}
                <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800/80 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-slate-200 flex items-center gap-2">
                      <span className="text-[#00d4aa]">🎙️</span> {tStr.stemVocal}
                    </span>
                    <button
                      onClick={() => toggleStemMute("vocals")}
                      className={`text-[10px] px-2.5 py-1 rounded font-bold uppercase ${
                        stemsMutes.vocals ? "bg-rose-950/60 border border-rose-500/50 text-rose-500" : "bg-slate-950 text-slate-500"
                      }`}
                    >
                      {stemsMutes.vocals ? tStr.muted : tStr.active}
                    </button>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={stemsVolumes.vocals}
                    disabled={stemsMutes.vocals}
                    onChange={(e) => updateStemVolumeValue("vocals", parseInt(e.target.value))}
                    className="w-full accent-[#00d4aa]"
                  />
                </div>

                {/* Stem Drums */}
                <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800/80 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-slate-200 flex items-center gap-2">
                      <span className="text-[#00d4aa]">🥁</span> {tStr.stemDrums}
                    </span>
                    <button
                      onClick={() => toggleStemMute("drums")}
                      className={`text-[10px] px-2.5 py-1 rounded font-bold uppercase ${
                        stemsMutes.drums ? "bg-rose-950/60 border border-rose-500/50 text-rose-500" : "bg-slate-950 text-slate-500"
                      }`}
                    >
                      {stemsMutes.drums ? tStr.muted : tStr.active}
                    </button>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={stemsVolumes.drums}
                    disabled={stemsMutes.drums}
                    onChange={(e) => updateStemVolumeValue("drums", parseInt(e.target.value))}
                    className="w-full accent-[#00d4aa]"
                  />
                </div>

                {/* Stem Bass */}
                <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800/80 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-slate-200 flex items-center gap-2">
                      <span className="text-[#00d4aa]">🎸</span> {tStr.stemBass}
                    </span>
                    <button
                      onClick={() => toggleStemMute("bass")}
                      className={`text-[10px] px-2.5 py-1 rounded font-bold uppercase ${
                        stemsMutes.bass ? "bg-rose-950/60 border border-rose-500/50 text-rose-500" : "bg-slate-950 text-slate-500"
                      }`}
                    >
                      {stemsMutes.bass ? tStr.muted : tStr.active}
                    </button>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={stemsVolumes.bass}
                    disabled={stemsMutes.bass}
                    onChange={(e) => updateStemVolumeValue("bass", parseInt(e.target.value))}
                    className="w-full accent-[#00d4aa]"
                  />
                </div>

                {/* Stem Others */}
                <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800/80 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-slate-200 flex items-center gap-2">
                      <span className="text-[#00d4aa]">🎹</span> {tStr.stemOther}
                    </span>
                    <button
                      onClick={() => toggleStemMute("other")}
                      className={`text-[10px] px-2.5 py-1 rounded font-bold uppercase ${
                        stemsMutes.other ? "bg-rose-950/60 border border-rose-500/50 text-rose-500" : "bg-slate-950 text-slate-500"
                      }`}
                    >
                      {stemsMutes.other ? tStr.muted : tStr.active}
                    </button>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={stemsVolumes.other}
                    disabled={stemsMutes.other}
                    onChange={(e) => updateStemVolumeValue("other", parseInt(e.target.value))}
                    className="w-full accent-[#00d4aa]"
                  />
                </div>

              </div>
            )}
          </section>

          {/* Quality Audit Calculations (Phase 3) */}
          <section id="analysis-card" className="bg-[#0c0a0f] border border-[#1d1630] rounded-2xl p-4 sm:p-6 shadow-2xl">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2 mb-4">
              <Award className="w-4 h-4 text-[#00d4aa]" />
              {tStr.qualityAnalysis}
            </h2>

            {!audioLoaded ? (
              <p className="text-xs text-slate-500 italic text-center py-4">
                {lang === "sk" ? "Nahrajte audio súbor pre detailnú akustickú analýzu." : "Upload an audio file for deep acoustic analysis."}
              </p>
            ) : (
              <div className="space-y-6">
                
                {/* 2-Column Side-by-Side Comparison */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* Left Column: Original Input */}
                  <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-900 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between border-b border-slate-900 pb-2 mb-3">
                        <span className="text-xs font-black uppercase text-slate-400 tracking-wider">
                          {lang === "sk" ? "📥 Pôvodný Vstup" : "📥 Raw Original Input"}
                        </span>
                        <span className="text-[10px] font-mono text-[#00d4aa] font-bold">100% Raw</span>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-slate-500">{tStr.truePeak}</span>
                          <span className="font-bold font-mono text-slate-300">{originalAuditData?.truePeak} dBFs</span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-slate-500">{tStr.rms}</span>
                          <span className="font-bold font-mono text-slate-300">{originalAuditData?.rms} dB</span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-slate-500">{tStr.estimatedLufs}</span>
                          <span className="font-bold font-mono text-slate-300">{originalAuditData?.lufs} LUFS</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2">
                      <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-2">
                        {lang === "sk" ? "Systémom zistené chyby:" : "Discovered input issues:"}
                      </span>
                      <div className="space-y-1.5">
                        {originalAuditData && (Object.entries(originalAuditData.problems) as [string, { ok: boolean; desc: string }][]).map(([key, item]) => {
                          const isProblemFixed = item.ok || !!fixedProblems[key];
                          return (
                            <div 
                              key={key}
                              className="flex flex-col text-xs p-2 rounded bg-slate-900/60 border border-slate-850"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-slate-400 font-medium capitalize">{tStr[key as keyof typeof tStr] || key}</span>
                                <span className={`font-bold flex items-center gap-1 ${isProblemFixed ? "text-emerald-400" : "text-amber-500"}`}>
                                  {isProblemFixed ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
                                  {isProblemFixed ? (lang === "sk" ? "V poriadku" : "OK") : (lang === "sk" ? "Chybný" : "Warning")}
                                </span>
                              </div>

                              {/* Bulletproof interactive suggestions widget if issue is found and not yet fixed */}
                              {!isProblemFixed && (
                                <div className="mt-2 text-[11px] bg-slate-950 p-2 rounded border border-amber-500/20 text-slate-300 space-y-2">
                                  <p className="leading-relaxed font-mono">
                                    {key === "clipping" && (lang === "sk" 
                                      ? "Odporúčanie: Aktivujte limitér s bezpečnou urovňou -1.0 dB pre zastavenie špičkového orezávania." 
                                      : "Tip: Enable the limiter at -1.0 dB to cap transient peaks cleanly.")}
                                    {key === "noise" && (lang === "sk" 
                                      ? "Odporúčanie: Zapnite preset 'Vokály/Podcasty' alebo stiahnite kompresné rádio na utíšenie bzučania v pozadí." 
                                      : "Tip: Apply 'Vocals/Podcast' preset to engage de-esser & clean high noise floor.")}
                                    {key === "dynamics" && (lang === "sk" 
                                      ? "Odporúčanie: Zmiernite kompresný filter alebo znížte intenzitu pre oživenie skladby." 
                                      : "Tip: Soften Compressor Ratio to avoid dynamic squashing.")}
                                    {key === "stereo" && (lang === "sk" 
                                      ? "Odporúčanie: Zvoľte preset 'Sociálne siete' pre orezanie nesymetrických fáz nahrávky." 
                                      : "Tip: Apply 'Social Networks' filter to realign uneven stereo channels.")}
                                    {key === "dc" && (lang === "sk" 
                                      ? "Odporúčanie: Odfiltrujte jednosmerný drift orezaním sub-bás na filtri (-4 dB)." 
                                      : "Tip: Remove sub-bass rumble to resolve direct current offset.")}
                                    {key === "phase" && (lang === "sk" 
                                      ? "Odporúčanie: Skontrolujte prepínač fázy a znížte priestorový stereo imidžér." 
                                      : "Tip: Pull back stereo widening parameters to restore core phase.")}
                                  </p>
                                  
                                  <button
                                    type="button"
                                    onClick={() => applyAutoFix(key)}
                                    className="w-full py-1 bg-[#00d4aa]/10 hover:bg-[#00d4aa]/25 text-[#00d4aa] border border-[#00d4aa]/30 rounded text-[10px] font-black uppercase tracking-wider transition flex items-center justify-center gap-1"
                                  >
                                    🔧 {lang === "sk" ? "Opraviť automaticky" : "Fix Automatically"}
                                  </button>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                  </div>

                  {/* Right Column: Mastered Output */}
                  <div className="p-4 rounded-xl bg-[#00d4aa]/5 border border-[#00d4aa]/15 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between border-b border-slate-900 pb-2 mb-3">
                        <span className="text-xs font-black uppercase text-teal-400 tracking-wider">
                          {lang === "sk" ? "🎛️ Masterovaný Výstup" : "🎛️ Mastered Output"}
                        </span>
                        <span className="text-[10px] font-mono text-[#00d4aa] font-black animate-pulse">Live Tracker</span>
                      </div>

                      {/* Recalculate Trigger Button */}
                      <button
                        onClick={performOutputAudit}
                        disabled={analysisActive}
                        className="w-full py-2 bg-slate-950 hover:bg-slate-900 border border-[#00d4aa]/40 text-[#00d4aa] text-xs font-black uppercase tracking-wider rounded-xl transition flex items-center justify-center gap-2"
                      >
                        {analysisActive ? (
                          <>
                            <span className="animate-spin rounded-full h-3.5 w-3.5 border-2 border-[#00d4aa] border-t-transparent" />
                            {analyzingText}
                          </>
                        ) : (
                          <>
                            <Activity className="w-3.5 h-3.5 animate-pulse" />
                            {lang === "sk" ? "⚡ Odmerať výstupné zmeny" : "⚡ Measure output changes"}
                          </>
                        )}
                      </button>

                      {outputAuditData ? (
                        <div className="space-y-4 mt-4">
                          <div className="space-y-2 p-3 rounded-lg bg-slate-950 border border-slate-900">
                            <div className="flex justify-between items-center text-xs">
                              <span className="text-slate-500">{tStr.truePeak}</span>
                              <span className="font-bold font-mono text-[#00d4aa]">{outputAuditData.truePeak} dBFs</span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                              <span className="text-slate-500">{tStr.rms}</span>
                              <span className="font-bold font-mono text-[#00d4aa]">{outputAuditData.rms} dB</span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                              <span className="text-slate-500">{tStr.estimatedLufs}</span>
                              <span className="font-bold font-mono text-[#00d4aa]">{outputAuditData.lufs} LUFS</span>
                            </div>
                          </div>

                          <div>
                            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-2">
                              {lang === "sk" ? "Akustická bezpečnosť výstupu:" : "Output safety evaluation:"}
                            </span>
                            <div className="space-y-1.5">
                              {Object.entries(outputAuditData.problems).map(([key, item]: any) => (
                                <div 
                                  key={key}
                                  className="flex items-center justify-between text-xs p-2 rounded bg-slate-900/40 border border-slate-900"
                                >
                                  <span className="text-slate-400 font-medium capitalize">
                                    {key === "clipping" ? (lang === "sk" ? "Orez (Peak)" : "Peak Clip") : (key === "lufs" ? (lang === "sk" ? "Hlasitosť" : "Loudness") : (lang === "sk" ? "Squeeze" : "Squeeze"))}
                                  </span>
                                  <span className={`font-bold flex items-center gap-1.5 ${item.ok ? "text-emerald-400" : "text-amber-500"}`}>
                                    {item.ok ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
                                    {item.desc}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="mt-6 p-4 rounded bg-slate-950/60 border border-slate-900 flex flex-col items-center justify-center text-center">
                          <Activity className="w-6 h-6 text-slate-600 mb-2" />
                          <p className="text-[11px] text-slate-500 italic max-w-xs leading-normal">
                            {lang === "sk" 
                              ? "Aktuálne mastering nastavenia neboli premerané. Kliknite na tlačidlo vyššie pre akustický súpis výstupu." 
                              : "Current mastering settings have not been auditted. Click the button above to calculate mastered output details."}
                          </p>
                        </div>
                      )}
                    </div>
                    
                    {/* Recommends Banner display based on analysis (Interactive Click to Apply) */}
                    {recommendedPreset && (
                      <button
                        type="button"
                        onClick={() => selectRepairPresetAction(recommendedPreset as any)}
                        className="w-full text-center mt-4 p-2.5 rounded-lg bg-[#00d4aa]/10 hover:bg-[#00d4aa]/15 border border-[#00d4aa]/30 text-xs transition cursor-pointer"
                      >
                        <span className="font-bold text-[#00d4aa] uppercase tracking-wider block mb-1">
                          {tStr.recomendedMode}
                        </span>
                        <p className="text-slate-300">
                          {lang === "sk" 
                            ? `Identifikované problémy naznačujú potrebu presetu: "${recommendedPreset.toUpperCase()}"` 
                            : `Acoustic errors match requirements for: "${recommendedPreset.toUpperCase()}" preset`}
                        </p>
                        <span className="inline-block mt-2 text-[10px] bg-[#00d4aa]/20 border border-[#00d4aa]/30 px-3 py-1 rounded uppercase font-black text-[#00d4aa]">
                          ⚡ {lang === "sk" ? "Použiť odporúčaný preset" : "Apply Recommended Preset"}
                        </span>
                      </button>
                    )}

                  </div>

                </div>

              </div>
            )}
          </section>

          {/* Dynamic off-line master renderer export card (Phase 1, 2, 3 offline compilation) */}
          <section id="export-card" className="bg-[#0c0a0f] border border-[#1d1630] rounded-2xl p-4 sm:p-6 shadow-2xl relative overflow-hidden group">
            {/* Pulsating live active border on processed mode */}
            {!abMode && audioLoaded && (
              <div className="absolute inset-0 border border-[#00d4aa]/30 rounded-2xl pointer-events-none animate-pulse" />
            )}

            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2 mb-4">
              <Download className="w-4 h-4 text-[#00d4aa]" />
              {tStr.exportTitle}
            </h2>

            {/* Format Picker Segmented Controller */}
            <div className="mb-4">
              <label className="text-[10px] text-slate-500 uppercase font-black tracking-wider block mb-2">{tStr.exportFormatLabel}</label>
              <div className="grid grid-cols-2 gap-2 bg-slate-950 p-1 rounded-xl border border-slate-900">
                <button
                  type="button"
                  onClick={() => setExportFormat("wav")}
                  className={`py-2 text-xs font-bold rounded-lg transition ${
                    exportFormat === "wav" ? "bg-[#00d4aa] text-[#06040a]" : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  WAV (.wav)
                </button>
                <button
                  type="button"
                  onClick={() => setExportFormat("mp3")}
                  className={`py-2 text-xs font-bold rounded-lg transition ${
                    exportFormat === "mp3" ? "bg-[#00d4aa] text-[#06040a]" : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  MP3 (.mp3)
                </button>
              </div>
              <p className="text-[10px] text-slate-500 mt-1.5 leading-relaxed italic">
                {exportFormat === "wav" ? tStr.wavDesc : tStr.bitrateLabel}
              </p>
            </div>

            {/* Standard quality variants for MP3 */}
            {exportFormat === "mp3" && (
              <div className="mb-5 animate-fade-in">
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setMp3Bitrate(128)}
                    className={`py-2 text-[10px] font-black rounded-lg border transition ${
                      mp3Bitrate === 128
                        ? "bg-[#00d4aa]/25 border-[#00d4aa] text-[#00d4aa]"
                        : "bg-slate-950 border-slate-900 text-slate-400 hover:border-slate-800"
                    }`}
                  >
                    128 kbps
                  </button>
                  <button
                    type="button"
                    onClick={() => setMp3Bitrate(192)}
                    className={`py-2 text-[10px] font-black rounded-lg border transition ${
                      mp3Bitrate === 192
                        ? "bg-[#00d4aa]/25 border-[#00d4aa] text-[#00d4aa]"
                        : "bg-slate-950 border-slate-900 text-slate-400 hover:border-slate-800"
                    }`}
                  >
                    192 kbps
                  </button>
                  <button
                    type="button"
                    onClick={() => setMp3Bitrate(320)}
                    className={`py-2 text-[10px] font-black rounded-lg border transition ${
                      mp3Bitrate === 320
                        ? "bg-[#00d4aa]/25 border-[#00d4aa] text-[#00d4aa]"
                        : "bg-slate-950 border-slate-900 text-slate-400 hover:border-slate-800"
                    }`}
                  >
                    320 kbps
                  </button>
                </div>
                <p className="text-[10px] text-slate-400 mt-2 text-center select-none font-medium italic leading-normal">
                  {mp3Bitrate === 128 && tStr.mp3Desc128}
                  {mp3Bitrate === 192 && tStr.mp3Desc192}
                  {mp3Bitrate === 320 && tStr.mp3Desc320}
                </p>
              </div>
            )}

            <button
              onClick={exportMasterAudioFile}
              disabled={!audioLoaded || isExporting}
              className="w-full py-4.5 bg-gradient-to-r from-[#00d4aa] to-teal-500 text-[#06040a] font-black uppercase text-sm tracking-widest rounded-xl hover:scale-[1.02] active:scale-[0.98] transition shadow-[0_0_20px_rgba(0,212,170,0.3)] flex items-center justify-center gap-2 disabled:opacity-30 disabled:pointer-events-none"
            >
              {isExporting ? (
                <>
                  <span className="animate-spin rounded-full h-5 w-5 border-2 border-[#06040a] border-t-transparent" />
                  {tStr.processingExport}
                </>
              ) : (
                <>
                  <Download className="w-5 h-5 fill-current" />
                  {tStr.exportBtn}
                </>
              )}
            </button>
          </section>

          {/* Donation support card accordion (Copied from Phase v2.2) */}
          <section id="support-card" className="bg-[#0c0a0f] border border-[#1d1630] rounded-2xl p-4 sm:p-6 shadow-2xl">
            <button
              onClick={() => setDonationOpen(!donationOpen)}
              className="w-full flex items-center justify-between text-left"
            >
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <span className="text-[#00d4aa]">❤️</span>
                {tStr.supportTitle}
              </h2>
              <span className={`text-slate-400 transition-transform duration-300 ${donationOpen ? "rotate-180" : ""}`}>
                ▼
              </span>
            </button>

            {donationOpen && (
              <div className="mt-4 pt-4 border-t border-slate-900 flex flex-col items-center text-center animate-fade-in text-xs">
                <p className="text-slate-400 mb-4 font-medium leading-relaxed">
                  {tStr.supportLabel}
                </p>
                <div className="p-3 bg-white rounded-xl mb-4 shadow-lg overflow-hidden flex items-center justify-center max-w-[170px] max-h-[170px]">
                  <img
                    src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=SK7211000000002943006853&color=0c0a0f"
                    alt="Donate QR SK7211000000002943006853"
                    className="w-full h-full block"
                  />
                </div>
                <div className="w-full flex flex-col sm:flex-row items-center gap-2">
                  <div className="flex-1 p-2 bg-slate-950 rounded-lg text-slate-300 font-mono text-center select-all border border-slate-900 w-full truncate">
                    SK72 1100 0000 0029 4300 6853
                  </div>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText("SK7211000000002943006853");
                      showToast(tStr.ibanCopied);
                    }}
                    className="w-full sm:w-auto px-4 py-2 bg-slate-900 border border-slate-800 text-[#00d4aa] font-bold rounded-lg hover:bg-slate-800 transition"
                  >
                    {tStr.copyIban}
                  </button>
                </div>
              </div>
            )}
          </section>

        </div>

      </main>

      {/* Global alert Toast notice indicator overlay banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0c0a0f] border border-[#00d4aa] px-5 py-3 rounded-xl shadow-2xl text-xs sm:text-sm font-semibold tracking-wide text-slate-200 text-center animate-bounce flex items-center gap-2 max-w-sm">
          <Sparkles className="w-4 h-4 text-[#00d4aa]" />
          {toastMessage}
        </div>
      )}
    </div>
  );
}
