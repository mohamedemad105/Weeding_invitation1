import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Heart, MapPin, Calendar, Clock, VolumeX, Volume2,
  ChevronLeft, ChevronRight, X, Menu,
  MessageSquare, ExternalLink, Play, Pause, Phone, User, Users, Maximize2,
} from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import photo1 from "@/imports/WhatsApp_Image_2026-07-05_at_3.14.14_PM.jpeg";
import photo2 from "@/imports/WhatsApp_Image_2026-07-05_at_3.14.17_PM.jpeg";
import photo3 from "@/imports/WhatsApp_Image_2026-07-05_at_3.14.17_PM__1_.jpeg";
import photo4 from "@/imports/WhatsApp_Image_2026-07-05_at_3.14.17_PM__2_.jpeg";
import photo5 from "@/imports/WhatsApp_Image_2026-07-05_at_3.14.18_PM.jpeg";
import photo6 from "@/imports/WhatsApp_Image_2026-07-05_at_3.14.18_PM__1_.jpeg";
import photo7 from "@/imports/WhatsApp_Image_2026-07-05_at_3.14.18_PM__2_.jpeg";
import photo8 from "@/imports/WhatsApp_Image_2026-07-05_at_3.14.18_PM__3_.jpeg";
import photo9 from "@/imports/WhatsApp_Image_2026-07-05_at_3.14.19_PM.jpeg";

/* ─── Config ──────────────────────────────────────────────────── */
const GROOM = "Youssef";
const BRIDE = "Aya";
const WEDDING_DATE = new Date("2026-07-25T18:30:00");
const MAPS_URL = "https://maps.app.goo.gl/QVPqcpa9eEHQUktM8";

const FF = {
  display: "'Playfair Display', Georgia, serif",
  body: "'Jost', system-ui, sans-serif",
  script: "'Great Vibes', cursive",
};

const GOLD = "#C9A96E";
const ROSE = "#B76E79";
const DEEP = "#B8860B";
const BROWN = "#2C1810";
const MUTED = "#7A6252";

/* ─── Gallery ─────────────────────────────────────────────────── */
const GALLERY = [
  { src: photo1, alt: "Youssef & Aya — moment 1" },
  { src: photo2, alt: "Youssef & Aya — moment 2" },
  { src: photo3, alt: "Youssef & Aya — moment 3" },
  { src: photo4, alt: "Youssef & Aya — moment 4" },
  { src: photo5, alt: "Youssef & Aya — moment 5" },
  { src: photo6, alt: "Youssef & Aya — moment 6" },
  { src: photo7, alt: "Youssef & Aya — moment 7" },
  { src: photo8, alt: "Youssef & Aya — moment 8" },
  { src: photo9, alt: "Youssef & Aya — moment 9" },
];

/* ─── Floating SVGs ───────────────────────────────────────────── */
const PetalSVG = () => (
  <svg viewBox="0 0 40 60" fill="currentColor" className="w-full h-full">
    <path d="M20 0 Q32 15 28 35 Q20 50 20 60 Q20 50 12 35 Q8 15 20 0Z" opacity="0.75" />
  </svg>
);
const HeartSVG = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

/* ─── Floating decorations ────────────────────────────────────── */
function FloatingDecorations() {
  const items = Array.from({ length: 16 }, (_, i) => ({
    id: i,
    type: i % 4 === 0 ? "heart" : "petal",
    x: (i * 6.5) % 100,
    delay: (i * 0.9) % 8,
    duration: 7 + (i % 5),
    size: 10 + (i % 3) * 8,
    color: i % 3 === 0 ? ROSE : i % 2 === 0 ? GOLD : "#D4A86A",
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {items.map((item) => (
        <motion.div
          key={item.id}
          className="absolute top-0"
          style={{ left: `${item.x}%`, color: item.color, width: item.size, height: item.size }}
          initial={{ y: -60, opacity: 0, rotate: 0 }}
          animate={{
            y: "110vh",
            opacity: [0, 0.7, 0.7, 0],
            rotate: item.id % 2 === 0 ? 360 : -360,
            x: [0, 25, -15, 8, 0],
          }}
          transition={{ duration: item.duration, delay: item.delay, repeat: Infinity, ease: "linear" }}
        >
          {item.type === "heart" ? <HeartSVG /> : <PetalSVG />}
        </motion.div>
      ))}
    </div>
  );
}

/* ─── Confetti burst ──────────────────────────────────────────── */
function Confetti({ active }: { active: boolean }) {
  if (!active) return null;
  const particles = Array.from({ length: 120 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 2.5,
    color: [GOLD, ROSE, "#fff", DEEP, "#F5EDE0", "#FFD700"][Math.floor(Math.random() * 6)],
    w: Math.random() * 10 + 4,
    h: Math.random() * 6 + 3,
    dur: 2.5 + Math.random() * 2,
    rot: Math.random() * 720 - 360,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-[300] overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute top-0 rounded-sm"
          style={{ left: `${p.x}%`, width: p.w, height: p.h, backgroundColor: p.color }}
          initial={{ y: -20, opacity: 1, rotate: 0 }}
          animate={{ y: "108vh", opacity: [1, 1, 0], rotate: p.rot }}
          transition={{ duration: p.dur, delay: p.delay, ease: "linear" }}
        />
      ))}
    </div>
  );
}

/* ─── Loading screen ──────────────────────────────────────────── */
function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const t = setTimeout(onComplete, 2800);
    return () => clearTimeout(t);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[500] flex flex-col items-center justify-center"
      style={{ background: `linear-gradient(135deg, #FDF8F0 0%, #F5EDE0 50%, #FFF3E0 100%)` }}
      exit={{ opacity: 0, scale: 1.04, transition: { duration: 0.8 } }}
    >
      <FloatingDecorations />
      <motion.div
        className="relative z-10 flex flex-col items-center gap-7"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9 }}
      >
        {/* Animated floral ring */}
        <div className="relative w-44 h-44 flex items-center justify-center">
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ border: `2px solid ${GOLD}40` }}
            animate={{ rotate: 360, scale: [1, 1.04, 1] }}
            transition={{ rotate: { duration: 10, repeat: Infinity, ease: "linear" }, scale: { duration: 2.5, repeat: Infinity } }}
          />
          <motion.div
            className="absolute inset-5 rounded-full"
            style={{ border: `1px solid ${ROSE}30` }}
            animate={{ rotate: -360 }}
            transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-10 rounded-full"
            style={{ border: `1px solid ${GOLD}25` }}
            animate={{ rotate: 360 }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            animate={{ scale: [1, 1.18, 1] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          >
            <Heart className="w-14 h-14 fill-current" style={{ color: ROSE }} />
          </motion.div>
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
            <motion.div
              key={angle}
              className="absolute"
              style={{
                top: "50%",
                left: "50%",
                transform: `rotate(${angle}deg) translateY(-82px) translateX(-50%)`,
              }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, delay: angle / 600, repeat: Infinity }}
            >
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: GOLD, opacity: 0.7 }} />
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center space-y-1"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-xs tracking-[0.4em] uppercase" style={{ color: MUTED, fontFamily: FF.body }}>
            The Wedding Of
          </p>
          <h1 className="text-5xl" style={{ color: BROWN, fontFamily: FF.script }}>
            {GROOM} <span style={{ color: GOLD }}>&amp;</span> {BRIDE}
          </h1>
        </motion.div>

        <div className="flex gap-2.5">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full"
              style={{ background: GOLD }}
              animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.3, 0.8] }}
              transition={{ duration: 1.1, delay: i * 0.22, repeat: Infinity }}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Invitation card ─────────────────────────────────────────── */
function InvitationCard({ onOpen }: { onOpen: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-[400] flex items-center justify-center p-4 overflow-hidden"
      style={{ background: `linear-gradient(160deg, #FDF8F0 0%, #F5EDE0 60%, #FFF3E0 100%)` }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.7 } }}
    >
      <FloatingDecorations />

      <motion.div
        className="relative max-w-sm w-full rounded-3xl p-10 text-center"
        style={{
          background: "rgba(255,252,247,0.88)",
          backdropFilter: "blur(16px)",
          border: `1px solid ${GOLD}50`,
          boxShadow: `0 32px 80px rgba(184,134,11,0.14), 0 0 0 1px ${GOLD}18`,
        }}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.9, type: "spring", stiffness: 90 }}
      >
        {/* Corner ornaments */}
        {["top-4 left-4 border-t-2 border-l-2 rounded-tl-lg", "top-4 right-4 border-t-2 border-r-2 rounded-tr-lg",
          "bottom-4 left-4 border-b-2 border-l-2 rounded-bl-lg", "bottom-4 right-4 border-b-2 border-r-2 rounded-br-lg"].map((cls, i) => (
          <div key={i} className={`absolute w-8 h-8 ${cls}`} style={{ borderColor: `${GOLD}60` }} />
        ))}

        <motion.div
          className="space-y-5"
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.4 } } }}
        >
          {["Together With Their Families", "Invite You To Celebrate", "The Wedding Of"].map((txt, i) => (
            <motion.p
              key={i}
              className="text-xs tracking-[0.25em] uppercase"
              style={{ color: MUTED, fontFamily: FF.body }}
              variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}
            >
              {txt}
            </motion.p>
          ))}

          <motion.div
            className="py-5 space-y-1"
            variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
          >
            <h1 className="text-6xl leading-none" style={{ color: BROWN, fontFamily: FF.script }}>
              {GROOM}
            </h1>
            <div className="flex items-center gap-3 my-3">
              <div className="h-px flex-1" style={{ background: `linear-gradient(to right, transparent, ${GOLD}60)` }} />
              <span className="text-3xl" style={{ color: GOLD, fontFamily: FF.display }}>&amp;</span>
              <div className="h-px flex-1" style={{ background: `linear-gradient(to left, transparent, ${GOLD}60)` }} />
            </div>
            <h1 className="text-6xl leading-none" style={{ color: BROWN, fontFamily: FF.script }}>
              {BRIDE}
            </h1>
          </motion.div>

          <motion.div
            className="flex flex-col items-center gap-2"
            variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
          >
            <div className="flex items-center gap-2" style={{ color: MUTED }}>
              <Calendar className="w-3.5 h-3.5" style={{ color: GOLD }} />
              <span className="text-xs tracking-widest" style={{ fontFamily: FF.body }}>25 July 2026</span>
            </div>
            <div className="flex items-center gap-2" style={{ color: MUTED }}>
              <Clock className="w-3.5 h-3.5" style={{ color: GOLD }} />
              <span className="text-xs tracking-widest" style={{ fontFamily: FF.body }}>6:30 PM</span>
            </div>
          </motion.div>

          <motion.button
            onClick={onOpen}
            className="relative w-full py-3.5 rounded-full text-white text-xs tracking-[0.25em] uppercase overflow-hidden"
            style={{ background: `linear-gradient(135deg, ${GOLD}, ${DEEP})`, fontFamily: FF.body }}
            variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
            whileHover={{ scale: 1.03, boxShadow: `0 10px 28px ${GOLD}50` }}
            whileTap={{ scale: 0.97 }}
          >
            <motion.div
              className="absolute inset-0 bg-white/25"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.45 }}
            />
            Open Invitation
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Music player ────────────────────────────────────────────── */
function MusicPlayer({ autoPlay }: { autoPlay: boolean }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.65);
  const [expanded, setExpanded] = useState(false);
  const started = useRef(false);

  useEffect(() => {
  const startMusic = () => {
    if (!audioRef.current || started.current) return;

    started.current = true;
    audioRef.current.volume = volume;

    audioRef.current
      .play()
      .then(() => setPlaying(true))
      .catch(console.error);

    document.removeEventListener("click", startMusic);
  };

  document.addEventListener("click", startMusic);

  return () => {
    document.removeEventListener("click", startMusic);
  };
}, [volume]);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) { a.pause(); setPlaying(false); }
    else { a.play().catch(() => {}); setPlaying(true); }
  };

  const handleVolume = (v: number) => {
    setVolume(v);
    if (audioRef.current) audioRef.current.volume = v;
  };

  return (
    <>
      <audio ref={audioRef} loop src="/Albumaty.Com_Tamer_Ashour_Khalini.mp3" />
      <motion.div
        className="fixed bottom-6 left-6 z-[200] flex flex-col-reverse items-start gap-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <motion.button
          className="w-12 h-12 rounded-full flex items-center justify-center text-white shadow-xl"
          style={{ background: `linear-gradient(135deg, ${GOLD}, ${DEEP})` }}
          onClick={() => { toggle(); setExpanded((e) => !e); }}
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.9 }}
        >
          {playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </motion.button>

        <AnimatePresence>
          {expanded && (
            <motion.div
              className="rounded-2xl p-4 shadow-2xl flex flex-col gap-3 min-w-[168px]"
              style={{
                background: "rgba(255,252,247,0.94)",
                backdropFilter: "blur(16px)",
                border: `1px solid ${GOLD}30`,
              }}
              initial={{ opacity: 0, y: 8, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.92 }}
            >
              <p className="text-xs tracking-[0.2em] uppercase" style={{ color: MUTED, fontFamily: FF.body }}>
                Wedding Music
              </p>
              <button
                onClick={() => { setMuted(!muted); if (audioRef.current) audioRef.current.muted = !muted; }}
                className="flex items-center gap-2 transition-colors"
                style={{ color: muted ? ROSE : BROWN }}
              >
                {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                <span className="text-xs" style={{ fontFamily: FF.body }}>{muted ? "Unmute" : "Mute"}</span>
              </button>
              <div className="flex items-center gap-2">
                <Volume2 className="w-3 h-3" style={{ color: GOLD }} />
                <input
                  type="range" min={0} max={1} step={0.05} value={volume}
                  onChange={(e) => handleVolume(Number(e.target.value))}
                  className="w-full"
                  style={{ accentColor: GOLD }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}

/* ─── Scroll progress bar ─────────────────────────────────────── */
function ScrollProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const fn = () => {
      const el = document.documentElement;
      setPct((window.scrollY / (el.scrollHeight - el.clientHeight)) * 100);
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 h-0.5 z-[250]" style={{ background: `${GOLD}15` }}>
      <div
        className="h-full transition-all duration-75"
        style={{ width: `${pct}%`, background: `linear-gradient(to right, ${GOLD}, ${ROSE})` }}
      />
    </div>
  );
}

/* ─── Navbar ──────────────────────────────────────────────────── */
const NAV_ITEMS = [
  { label: "Home", id: "home" },
  { label: "Story", id: "story" },
  { label: "Moments", id: "moments" },
  { label: "Details", id: "details" },
  { label: "Location", id: "location" },
  { label: "RSVP", id: "rsvp" },
  { label: "Guests", id: "guests" },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-[180] transition-all duration-500"
      style={{
        padding: scrolled ? "12px 0" : "20px 0",
        background: scrolled ? "rgba(253,248,240,0.88)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        boxShadow: scrolled ? `0 1px 0 ${GOLD}25` : "none",
      }}
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.7 }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <button
          onClick={() => go("home")}
          className="text-lg transition-colors"
          style={{ color: BROWN, fontFamily: FF.script }}
        >
          {GROOM} <span style={{ color: GOLD }}>&amp;</span> {BRIDE}
        </button>

        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => go(item.id)}
              className="text-xs tracking-[0.2em] uppercase transition-colors hover:opacity-70"
              style={{ color: MUTED, fontFamily: FF.body }}
            >
              {item.label}
            </button>
          ))}
        </div>

        <button className="md:hidden" style={{ color: BROWN }} onClick={() => setOpen(!open)}>
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="md:hidden"
            style={{ background: "rgba(253,248,240,0.97)", borderTop: `1px solid ${GOLD}20` }}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="px-6 py-5 flex flex-col gap-5">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => go(item.id)}
                  className="text-xs tracking-[0.25em] uppercase text-left transition-colors"
                  style={{ color: MUTED, fontFamily: FF.body }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

/* ─── Section heading ─────────────────────────────────────────── */
function SectionHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="text-center mb-14">
      {subtitle && (
        <p className="text-xs tracking-[0.35em] uppercase mb-3" style={{ color: GOLD, fontFamily: FF.body }}>
          {subtitle}
        </p>
      )}
      <h2 className="text-4xl md:text-5xl" style={{ color: BROWN, fontFamily: FF.display, fontStyle: "italic" }}>
        {title}
      </h2>
      <div className="flex items-center justify-center gap-4 mt-5">
        <div className="h-px w-14" style={{ background: `linear-gradient(to right, transparent, ${GOLD})` }} />
        <Heart className="w-3.5 h-3.5 fill-current" style={{ color: GOLD }} />
        <div className="h-px w-14" style={{ background: `linear-gradient(to left, transparent, ${GOLD})` }} />
      </div>
    </div>
  );
}

/* ─── Hero ────────────────────────────────────────────────────── */
function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden"
      style={{ background: `linear-gradient(180deg, #FDF8F0 0%, #F5EDE0 55%, #FFF3E0 100%)` }}
    >
      <FloatingDecorations />

      {/* Concentric ring decorations */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[640, 480, 320].map((size, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{ width: size, height: size, border: `1px solid ${GOLD}${["10", "15", "20"][i]}` }}
          />
        ))}
      </div>

      <motion.div
        className="relative z-10 space-y-4"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <p className="text-xs tracking-[0.5em] uppercase" style={{ color: GOLD, fontFamily: FF.body }}>
          We&apos;re Getting Married
        </p>

        <div>
          <motion.h1
            className="text-8xl md:text-[108px] leading-none"
            style={{ color: BROWN, fontFamily: FF.script }}
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.55 }}
          >
            {GROOM}
          </motion.h1>
          <div className="flex items-center justify-center gap-8 my-4">
            <div className="h-px w-28" style={{ background: `linear-gradient(to right, transparent, ${GOLD}70)` }} />
            <motion.span
              className="text-3xl"
              style={{ color: GOLD, fontFamily: FF.display }}
              animate={{ scale: [1, 1.12, 1] }}
              transition={{ duration: 2.2, repeat: Infinity }}
            >
              &amp;
            </motion.span>
            <div className="h-px w-28" style={{ background: `linear-gradient(to left, transparent, ${GOLD}70)` }} />
          </div>
          <motion.h1
            className="text-8xl md:text-[108px] leading-none"
            style={{ color: BROWN, fontFamily: FF.script }}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.7 }}
          >
            {BRIDE}
          </motion.h1>
        </div>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-5 mt-8"
          style={{ color: MUTED }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
        >
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" style={{ color: GOLD }} />
            <span className="text-sm tracking-widest" style={{ fontFamily: FF.body }}>25 July 2026</span>
          </div>
          <div className="w-1 h-1 rounded-full hidden sm:block" style={{ background: GOLD }} />
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" style={{ color: GOLD }} />
            <span className="text-sm tracking-widest" style={{ fontFamily: FF.body }}>6:30 PM</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll mouse */}
      <motion.div
        className="absolute bottom-10 flex flex-col items-center gap-2"
        animate={{ y: [0, 9, 0] }}
        transition={{ duration: 2.2, repeat: Infinity }}
      >
        <div className="w-6 h-10 rounded-full border-2 flex justify-center pt-2" style={{ borderColor: `${GOLD}50` }}>
          <div className="w-1 h-3 rounded-full" style={{ background: `${GOLD}80` }} />
        </div>
      </motion.div>
    </section>
  );
}

/* ─── Countdown ───────────────────────────────────────────────── */
function useCountdown(target: Date) {
  const [t, setT] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const update = () => {
      const diff = Math.max(0, target.getTime() - Date.now());
      setT({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [target]);
  return t;
}

function CountdownSection() {
  const { days, hours, minutes, seconds } = useCountdown(WEDDING_DATE);
  const units = [
    { v: days, l: "Days" },
    { v: hours, l: "Hours" },
    { v: minutes, l: "Minutes" },
    { v: seconds, l: "Seconds" },
  ];

  return (
    <motion.section
      className="py-28 px-6"
      style={{ background: `linear-gradient(180deg, #FFF3E0 0%, #FDF8F0 100%)` }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      <div className="max-w-3xl mx-auto text-center">
        <SectionHeading title="Counting Down" subtitle="Until We Say I Do" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {units.map(({ v, l }) => (
            <motion.div
              key={l}
              className="rounded-2xl p-7 relative overflow-hidden"
              style={{
                background: "rgba(255,252,247,0.9)",
                backdropFilter: "blur(12px)",
                border: `1px solid ${GOLD}25`,
                boxShadow: `0 8px 32px ${GOLD}10`,
              }}
              whileHover={{ y: -5, boxShadow: `0 16px 48px ${GOLD}22` }}
            >
              <div
                className="absolute inset-x-0 top-0 h-0.5"
                style={{ background: `linear-gradient(to right, transparent, ${GOLD}, transparent)` }}
              />
              <motion.span
                key={v}
                className="block text-5xl md:text-6xl font-bold"
                style={{ color: DEEP, fontFamily: FF.display }}
                initial={{ y: -8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.25 }}
              >
                {String(v).padStart(2, "0")}
              </motion.span>
              <span className="text-xs tracking-[0.2em] uppercase mt-2 block" style={{ color: MUTED, fontFamily: FF.body }}>
                {l}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

/* ─── Our Story ───────────────────────────────────────────────── */
const STORY_ITEMS = [
  { year: "The Beginning", text: "Our paths crossed in the most unexpected way, and what began as a simple conversation bloomed into something neither of us could have imagined." },
  { year: "Friendship", text: "From that first meeting, we became inseparable. Every adventure was better together, every memory brighter when shared with one another." },
  { year: "Something More", text: "Somewhere between all those moments and laughter, friendship quietly became love — the kind that feels like coming home." },
  { year: "Forever", text: "And now, we stand at the beginning of our greatest adventure yet — a lifetime of love, partnership, and making memories together." },
];

function OurStorySection() {
  return (
    <motion.section
      id="story"
      className="py-28 px-6"
      style={{ background: "#FDF8F0" }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      <div className="max-w-4xl mx-auto">
        <SectionHeading title="Our Story" subtitle="Every Love Story" />
        <p
          className="text-center text-xl mb-16 leading-relaxed"
          style={{ color: MUTED, fontFamily: FF.display, fontStyle: "italic" }}
        >
          Every love story is beautiful,<br />but ours is our favorite.
        </p>

        <div className="relative">
          <div
            className="absolute left-1/2 top-0 bottom-0 w-px hidden md:block"
            style={{ background: `linear-gradient(to bottom, transparent, ${GOLD}50, transparent)` }}
          />
          <div className="space-y-14">
            {STORY_ITEMS.map((item, i) => (
              <motion.div
                key={i}
                className={`flex flex-col md:flex-row items-center gap-8 ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}
                initial={{ opacity: 0, x: i % 2 === 0 ? -28 : 28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: 0.1 }}
              >
                <div className="flex-1">
                  <div
                    className={`rounded-2xl p-8 ${i % 2 === 0 ? "md:text-right" : "md:text-left"}`}
                    style={{
                      background: "rgba(255,252,247,0.9)",
                      border: `1px solid ${GOLD}18`,
                      boxShadow: `0 6px 28px ${GOLD}08`,
                    }}
                  >
                    <h3 className="text-xl mb-3" style={{ color: DEEP, fontFamily: FF.display, fontStyle: "italic" }}>
                      {item.year}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: "#5A4438", fontFamily: FF.body }}>
                      {item.text}
                    </p>
                  </div>
                </div>

                <div
                  className="hidden md:flex w-10 h-10 rounded-full items-center justify-center flex-shrink-0 z-10 shadow-lg"
                  style={{ background: `linear-gradient(135deg, ${GOLD}, ${DEEP})` }}
                >
                  <Heart className="w-4 h-4 fill-white text-white" />
                </div>
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}

/* ─── Gallery ─────────────────────────────────────────────────── */
function GallerySection() {
  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);

  useEffect(() => {
    const id = setInterval(() => setCurrent((c) => (c + 1) % GALLERY.length), 4500);
    return () => clearInterval(id);
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + GALLERY.length) % GALLERY.length);
  const next = () => setCurrent((c) => (c + 1) % GALLERY.length);

  return (
    <motion.section
      id="moments"
      className="py-28 px-6"
      style={{ background: `linear-gradient(180deg, #FDF8F0 0%, #F5EDE0 100%)` }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      <div className="max-w-5xl mx-auto">
        <SectionHeading title="Our Moments" subtitle="Captured Forever" />

        {/* Main slider */}
        <div
          className="relative rounded-3xl overflow-hidden shadow-2xl"
          style={{ aspectRatio: "16/9" }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              className="absolute inset-0 w-full h-full"
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.7 }}
            >
              <ImageWithFallback
                src={GALLERY[current].src}
                alt={GALLERY[current].alt}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />

          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
            style={{ background: "rgba(255,252,247,0.85)", backdropFilter: "blur(8px)" }}
          >
            <ChevronLeft className="w-5 h-5" style={{ color: BROWN }} />
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
            style={{ background: "rgba(255,252,247,0.85)", backdropFilter: "blur(8px)" }}
          >
            <ChevronRight className="w-5 h-5" style={{ color: BROWN }} />
          </button>

          <button
            onClick={() => setLightbox(current)}
            className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
            style={{ background: "rgba(255,252,247,0.8)", backdropFilter: "blur(8px)" }}
          >
            <Maximize2 className="w-4 h-4" style={{ color: BROWN }} />
          </button>

          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            {GALLERY.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className="h-1.5 rounded-full transition-all duration-300"
                style={{
                  width: i === current ? 28 : 8,
                  background: i === current ? "white" : "rgba(255,255,255,0.45)",
                }}
              />
            ))}
          </div>
        </div>

        {/* Thumbnails */}
        <div className="grid grid-cols-9 gap-2 mt-4">
          {GALLERY.map((photo, i) => (
            <motion.button
              key={i}
              onClick={() => setCurrent(i)}
              className="rounded-lg overflow-hidden aspect-square transition-all"
              style={{
                opacity: i === current ? 1 : 0.55,
                outline: i === current ? `2px solid ${GOLD}` : "none",
                outlineOffset: 2,
              }}
              whileHover={{ opacity: 1, scale: 1.05 }}
            >
              <ImageWithFallback src={photo.src} alt={photo.alt} className="w-full h-full object-cover" />
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            className="fixed inset-0 z-[400] flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.92)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <motion.div
              className="max-h-[88vh] max-w-full rounded-2xl shadow-2xl overflow-hidden"
              initial={{ scale: 0.88 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.88 }}
              onClick={(e) => e.stopPropagation()}
            >
              <ImageWithFallback
                src={GALLERY[lightbox].src}
                alt={GALLERY[lightbox].alt}
                className="max-h-[88vh] max-w-full object-contain"
              />
            </motion.div>
            <button
              className="absolute top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center text-white transition-colors hover:bg-white/20"
              style={{ background: "rgba(255,255,255,0.15)" }}
              onClick={() => setLightbox(null)}
            >
              <X className="w-5 h-5" />
            </button>
            <div className="absolute bottom-6 flex gap-3">
              <button
                onClick={(e) => { e.stopPropagation(); setLightbox((l) => (l! - 1 + GALLERY.length) % GALLERY.length); }}
                className="w-10 h-10 rounded-full flex items-center justify-center text-white transition-colors hover:bg-white/20"
                style={{ background: "rgba(255,255,255,0.15)" }}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); setLightbox((l) => (l! + 1) % GALLERY.length); }}
                className="w-10 h-10 rounded-full flex items-center justify-center text-white transition-colors hover:bg-white/20"
                style={{ background: "rgba(255,255,255,0.15)" }}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}

/* ─── Details ─────────────────────────────────────────────────── */
function DetailsSection() {
  const details = [
    { icon: <Calendar className="w-6 h-6" />, label: "Date", value: "25 July 2026" },
    { icon: <Clock className="w-6 h-6" />, label: "Time", value: "6:30 PM" },
    { icon: <Users className="w-6 h-6" />, label: "Event", value: "Wedding Reception" },
    { icon: <Heart className="w-6 h-6 fill-current" />, label: "Dress Code", value: "Formal Attire" },
  ];

  return (
    <motion.section
      id="details"
      className="py-28 px-6"
      style={{ background: "#FDF8F0" }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      <div className="max-w-4xl mx-auto">
        <SectionHeading title="The Details" subtitle="Join Us For" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {details.map((d, i) => (
            <motion.div
              key={i}
              className="text-center p-8 rounded-2xl relative overflow-hidden"
              style={{
                background: "rgba(255,252,247,0.85)",
                backdropFilter: "blur(12px)",
                border: `1px solid ${GOLD}22`,
                boxShadow: `0 8px 28px ${GOLD}08`,
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6, boxShadow: `0 18px 48px ${GOLD}20` }}
            >
              <div
                className="absolute inset-x-0 top-0 h-0.5"
                style={{ background: `linear-gradient(to right, transparent, ${GOLD}60, transparent)` }}
              />
              <div
                className="w-13 h-13 rounded-full flex items-center justify-center mx-auto mb-5"
                style={{
                  background: `linear-gradient(135deg, ${GOLD}20, ${ROSE}20)`,
                  color: GOLD,
                  width: 52,
                  height: 52,
                }}
              >
                {d.icon}
              </div>
              <p className="text-xs tracking-[0.2em] uppercase mb-2" style={{ color: GOLD, fontFamily: FF.body }}>{d.label}</p>
              <p className="text-lg" style={{ color: BROWN, fontFamily: FF.display }}>{d.value}</p>
            </motion.div>
          ))}
        </div>
        <motion.p
          className="text-center mt-12 text-sm tracking-[0.3em] uppercase"
          style={{ color: MUTED, fontFamily: FF.body }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Love &bull; Family &bull; Memories
        </motion.p>
      </div>
    </motion.section>
  );
}

/* ─── Location ────────────────────────────────────────────────── */
function LocationSection() {
  return (
    <motion.section
      id="location"
      className="py-28 px-6"
      style={{ background: `linear-gradient(180deg, #F5EDE0 0%, #FDF8F0 100%)` }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      <div className="max-w-xl mx-auto">
        <SectionHeading title="Find Us" subtitle="The Venue" />
        <motion.div
          className="rounded-3xl overflow-hidden shadow-2xl"
          style={{ background: "white", border: `1px solid ${GOLD}20` }}
          whileHover={{ boxShadow: `0 24px 64px ${GOLD}22` }}
        >
          {/* Map visual placeholder */}
          <div
            className="h-60 relative overflow-hidden flex items-center justify-center"
            style={{ background: `linear-gradient(135deg, #F5EDE0, #EEE0CC, #F0E0C8)` }}
          >
            {/* Grid lines */}
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="absolute"
                style={{
                  left: 0, right: 0,
                  top: `${(i + 1) * 12.5}%`,
                  height: 1,
                  background: `${GOLD}15`,
                }}
              />
            ))}
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="absolute"
                style={{
                  top: 0, bottom: 0,
                  left: `${(i + 1) * 12.5}%`,
                  width: 1,
                  background: `${GOLD}15`,
                }}
              />
            ))}

            {/* Animated pin */}
            <motion.div
              className="relative z-10 flex flex-col items-center"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center shadow-2xl"
                style={{ background: `linear-gradient(135deg, ${GOLD}, ${DEEP})` }}
              >
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <div
                className="w-5 h-2 rounded-full mt-1 blur-sm"
                style={{ background: `${BROWN}30` }}
              />
            </motion.div>
          </div>

          <div className="p-8 text-center space-y-4">
            <h3 className="text-2xl" style={{ color: BROWN, fontFamily: FF.display, fontStyle: "italic" }}>
              Wedding Reception Venue
            </h3>
            <div className="flex items-center justify-center gap-2" style={{ color: MUTED }}>
              <Calendar className="w-4 h-4" style={{ color: GOLD }} />
              <span className="text-sm" style={{ fontFamily: FF.body }}>25 July 2026 &mdash; 6:30 PM</span>
            </div>
            <motion.a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full text-white text-sm tracking-wider mt-2"
              style={{ background: `linear-gradient(135deg, ${GOLD}, ${DEEP})`, fontFamily: FF.body }}
              whileHover={{ scale: 1.04, boxShadow: `0 10px 28px ${DEEP}35` }}
              whileTap={{ scale: 0.97 }}
            >
              <ExternalLink className="w-4 h-4" />
              Open In Google Maps
            </motion.a>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

/* ─── RSVP ────────────────────────────────────────────────────── */
type RSVPData = { name: string; phone: string; guests: string; message: string; accepted: boolean };

function RSVPSection({ onConfetti }: { onConfetti: () => void }) {
  const [form, setForm] = useState({ name: "", phone: "", guests: "1", message: "" });
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [response, setResponse] = useState<RSVPData | null>(() => {
    try { return JSON.parse(localStorage.getItem("wedding-rsvp") || "null"); } catch { return null; }
  });

  const validate = () => {
    const e: { name?: string; phone?: string } = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.phone.trim()) e.phone = "Phone is required";
    return e;
  };

  const submit = (accepted: boolean) => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    const data: RSVPData = { ...form, accepted };
    localStorage.setItem("wedding-rsvp", JSON.stringify(data));
    setResponse(data);
    if (accepted) onConfetti();
  };

  const inputStyle = (err?: string) => ({
    background: "#FDF8F0",
    border: `1px solid ${err ? ROSE : GOLD + "35"}`,
    fontFamily: FF.body,
    color: BROWN,
    borderRadius: 12,
    outline: "none",
    width: "100%",
    padding: "12px 16px 12px 44px",
    fontSize: 14,
    transition: "border-color 0.2s",
  });

  if (response) {
    return (
      <motion.section
        id="rsvp"
        className="py-28 px-6"
        style={{ background: "#FDF8F0" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="max-w-md mx-auto text-center">
          <SectionHeading title={response.accepted ? "See You There!" : "We&apos;ll Miss You"} subtitle="RSVP" />
          <motion.div
            className="rounded-3xl p-12 shadow-xl"
            style={{ background: "white", border: `1px solid ${GOLD}20` }}
            initial={{ scale: 0.88, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <motion.div animate={{ scale: [1, 1.16, 1] }} transition={{ duration: 1.6, repeat: Infinity }}>
              <Heart
                className="w-16 h-16 mx-auto mb-5 fill-current"
                style={{ color: response.accepted ? ROSE : GOLD }}
              />
            </motion.div>
            <p className="text-2xl mb-3" style={{ color: BROWN, fontFamily: FF.display, fontStyle: "italic" }}>
              {response.name}
            </p>
            <p className="text-sm leading-relaxed" style={{ color: MUTED, fontFamily: FF.body }}>
              {response.accepted
                ? `We can't wait to celebrate with you and your ${response.guests} guest(s)!`
                : "Thank you for letting us know. You'll be in our hearts on our special day."}
            </p>
            <button
              onClick={() => { localStorage.removeItem("wedding-rsvp"); setResponse(null); setForm({ name: "", phone: "", guests: "1", message: "" }); }}
              className="mt-7 text-sm underline underline-offset-4 transition-opacity hover:opacity-70"
              style={{ color: GOLD, fontFamily: FF.body }}
            >
              Change my response
            </button>
          </motion.div>
        </div>
      </motion.section>
    );
  }

  return (
    <motion.section
      id="rsvp"
      className="py-28 px-6"
      style={{ background: "#FDF8F0" }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      <div className="max-w-lg mx-auto">
        <SectionHeading title="Will You Join Us?" subtitle="RSVP" />
        <div
          className="rounded-3xl p-8 shadow-xl"
          style={{ background: "white", border: `1px solid ${GOLD}15` }}
        >
          <div className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-xs tracking-[0.18em] uppercase mb-2" style={{ color: MUTED, fontFamily: FF.body }}>
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: GOLD }} />
                <input
                  type="text"
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  style={inputStyle(errors.name)}
                  onFocus={(e) => (e.target.style.borderColor = GOLD)}
                  onBlur={(e) => (e.target.style.borderColor = errors.name ? ROSE : `${GOLD}35`)}
                />
              </div>
              {errors.name && <p className="text-xs mt-1" style={{ color: ROSE, fontFamily: FF.body }}>{errors.name}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs tracking-[0.18em] uppercase mb-2" style={{ color: MUTED, fontFamily: FF.body }}>
                Mobile Number
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: GOLD }} />
                <input
                  type="tel"
                  placeholder="+20 xxx xxx xxxx"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  style={inputStyle(errors.phone)}
                  onFocus={(e) => (e.target.style.borderColor = GOLD)}
                  onBlur={(e) => (e.target.style.borderColor = errors.phone ? ROSE : `${GOLD}35`)}
                />
              </div>
              {errors.phone && <p className="text-xs mt-1" style={{ color: ROSE, fontFamily: FF.body }}>{errors.phone}</p>}
            </div>

            {/* Guests */}
            <div>
              <label className="block text-xs tracking-[0.18em] uppercase mb-2" style={{ color: MUTED, fontFamily: FF.body }}>
                Number of Guests
              </label>
              <select
                value={form.guests}
                onChange={(e) => setForm({ ...form, guests: e.target.value })}
                style={{ background: "#FDF8F0", border: `1px solid ${GOLD}35`, fontFamily: FF.body, color: BROWN, borderRadius: 12, outline: "none", width: "100%", padding: "12px 16px", fontSize: 14 }}
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>{n} Guest{n > 1 ? "s" : ""}</option>
                ))}
              </select>
            </div>

            {/* Message */}
            <div>
              <label className="block text-xs tracking-[0.18em] uppercase mb-2" style={{ color: MUTED, fontFamily: FF.body }}>
                Message (Optional)
              </label>
              <textarea
                rows={3}
                placeholder="Share your wishes..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                style={{ background: "#FDF8F0", border: `1px solid ${GOLD}35`, fontFamily: FF.body, color: BROWN, borderRadius: 12, outline: "none", width: "100%", padding: "12px 16px", fontSize: 14, resize: "none" }}
              />
            </div>

            <div className="flex gap-4 pt-1">
              <motion.button
                onClick={() => submit(true)}
                className="flex-1 py-3.5 rounded-xl text-white text-sm tracking-wider"
                style={{ background: `linear-gradient(135deg, ${GOLD}, ${DEEP})`, fontFamily: FF.body }}
                whileHover={{ scale: 1.02, boxShadow: `0 10px 28px ${DEEP}35` }}
                whileTap={{ scale: 0.97 }}
              >
                Accept Invitation
              </motion.button>
              <motion.button
                onClick={() => submit(false)}
                className="flex-1 py-3.5 rounded-xl text-sm tracking-wider"
                style={{ border: `1px solid ${GOLD}35`, color: MUTED, fontFamily: FF.body }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                Decline
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

/* ─── Guestbook ───────────────────────────────────────────────── */
type GuestMsg = { id: string; name: string; message: string };

const SAMPLE_MSGS: GuestMsg[] = [
  { id: "s1", name: "Ahmed", message: "Congratulations ❤️" },
  { id: "s2", name: "Sara", message: "Wishing you a lifetime of happiness ❤️" },
];

function GuestbookSection() {
  const [msgs, setMsgs] = useState<GuestMsg[]>(() => {
    try { return JSON.parse(localStorage.getItem("wedding-guestbook") || "[]"); } catch { return []; }
  });
  const [form, setForm] = useState({ name: "", message: "" });
  const [error, setError] = useState("");

  const save = (m: GuestMsg[]) => { setMsgs(m); localStorage.setItem("wedding-guestbook", JSON.stringify(m)); };

  const add = () => {
    if (!form.name.trim() || !form.message.trim()) { setError("Please fill in both fields."); return; }
    save([{ id: Date.now().toString(), ...form }, ...msgs]);
    setForm({ name: "", message: "" });
    setError("");
  };

  const remove = (id: string) => save(msgs.filter((m) => m.id !== id));
  const displayed = msgs.length ? msgs : SAMPLE_MSGS;

  return (
    <motion.section
      id="guests"
      className="py-28 px-6"
      style={{ background: `linear-gradient(180deg, #FDF8F0 0%, #F5EDE0 100%)` }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      <div className="max-w-2xl mx-auto">
        <SectionHeading title="Guest Wishes" subtitle="Leave A Message" />

        {/* Add form */}
        <div className="rounded-3xl p-6 shadow-lg mb-8" style={{ background: "white", border: `1px solid ${GOLD}15` }}>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Your name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              style={{ background: "#FDF8F0", border: `1px solid ${GOLD}35`, fontFamily: FF.body, color: BROWN, borderRadius: 12, outline: "none", width: "100%", padding: "11px 16px", fontSize: 14 }}
            />
            <textarea
              rows={2}
              placeholder="Your message..."
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              style={{ background: "#FDF8F0", border: `1px solid ${GOLD}35`, fontFamily: FF.body, color: BROWN, borderRadius: 12, outline: "none", width: "100%", padding: "11px 16px", fontSize: 14, resize: "none" }}
            />
            {error && <p className="text-xs" style={{ color: ROSE, fontFamily: FF.body }}>{error}</p>}
            <motion.button
              onClick={add}
              className="w-full py-3 rounded-xl text-white text-sm tracking-wider flex items-center justify-center gap-2"
              style={{ background: `linear-gradient(135deg, ${ROSE}, ${GOLD})`, fontFamily: FF.body }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              <MessageSquare className="w-4 h-4" />
              Leave a Wish
            </motion.button>
          </div>
        </div>

        {/* Messages */}
        <div className="space-y-4">
          <AnimatePresence>
            {displayed.map((msg, i) => (
              <motion.div
                key={msg.id}
                className="rounded-2xl p-5 relative"
                style={{ background: "rgba(255,252,247,0.9)", border: `1px solid ${GOLD}15` }}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ delay: i * 0.05 }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: `linear-gradient(135deg, ${GOLD}20, ${ROSE}20)` }}
                  >
                    <Heart className="w-4 h-4 fill-current" style={{ color: ROSE }} />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm mb-1" style={{ color: BROWN, fontFamily: FF.display }}>{msg.name}</p>
                    <p className="text-sm" style={{ color: MUTED, fontFamily: FF.body }}>{msg.message}</p>
                  </div>
                  {msgs.find((m) => m.id === msg.id) && (
                    <button
                      onClick={() => remove(msg.id)}
                      className="transition-colors hover:opacity-70"
                      style={{ color: `${GOLD}70` }}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  );
}

/* ─── Quote ───────────────────────────────────────────────────── */
function QuoteSection() {
  return (
    <section
      className="py-28 px-6 relative overflow-hidden"
      style={{ background: `linear-gradient(160deg, ${BROWN} 0%, #3D2314 50%, #2C1810 100%)` }}
    >
      <div className="absolute inset-0 opacity-[0.07]">
        <FloatingDecorations />
      </div>
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: `linear-gradient(to right, transparent, ${GOLD}50, transparent)` }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-px"
        style={{ background: `linear-gradient(to right, transparent, ${GOLD}50, transparent)` }}
      />
      <motion.div
        className="relative max-w-2xl mx-auto text-center space-y-6"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-7xl leading-none opacity-30" style={{ color: GOLD, fontFamily: FF.display }}>&ldquo;</div>
        <p
          className="text-xl md:text-2xl leading-relaxed text-white/90"
          style={{ fontFamily: FF.display, fontStyle: "italic" }}
        >
          And now these three remain:<br />Faith, Hope and Love.<br />But the greatest of these is Love.
        </p>
        <p className="text-xs tracking-[0.35em] uppercase" style={{ color: GOLD, fontFamily: FF.body }}>
          1 Corinthians 13:13
        </p>
      </motion.div>
    </section>
  );
}

/* ─── Footer ──────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer
      className="py-20 px-6 text-center relative overflow-hidden"
      style={{ background: `linear-gradient(180deg, #F5EDE0, #FDF8F0)` }}
    >
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: `linear-gradient(to right, transparent, ${GOLD}40, transparent)` }}
      />
      <motion.div
        className="space-y-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <p className="text-xs tracking-[0.4em] uppercase" style={{ color: MUTED, fontFamily: FF.body }}>
          Thank You For Being Part Of Our Special Day
        </p>
        <h2 className="text-6xl md:text-7xl" style={{ color: BROWN, fontFamily: FF.script }}>
          {GROOM} &amp; {BRIDE}
        </h2>
        <p className="text-sm tracking-[0.3em]" style={{ color: GOLD, fontFamily: FF.body }}>
          25 July 2026
        </p>
        <div className="flex items-center justify-center gap-4 mt-6">
          <div className="h-px w-14" style={{ background: `linear-gradient(to right, transparent, ${GOLD}50)` }} />
          <Heart className="w-5 h-5 fill-current" style={{ color: ROSE }} />
          <div className="h-px w-14" style={{ background: `linear-gradient(to left, transparent, ${GOLD}50)` }} />
        </div>
      </motion.div>
    </footer>
  );
}

/* ─── Main content ────────────────────────────────────────────── */
function MainContent({ autoPlay }: { autoPlay: boolean }) {
  const [confetti, setConfetti] = useState(false);

  const triggerConfetti = () => {
    setConfetti(true);
    setTimeout(() => setConfetti(false), 5500);
  };

  return (
    <div style={{ fontFamily: FF.body }}>
      <Confetti active={confetti} />
      <ScrollProgress />
      <Navbar />
      <MusicPlayer autoPlay={autoPlay} />
      <HeroSection />
      <CountdownSection />
      <OurStorySection />
      <GallerySection />
      <DetailsSection />
      <LocationSection />
      <RSVPSection onConfetti={triggerConfetti} />
      <GuestbookSection />
      <QuoteSection />
      <Footer />
    </div>
  );
}

/* ─── App ─────────────────────────────────────────────────────── */
export default function App() {
  const [phase, setPhase] = useState<"loading" | "invitation" | "main">("loading");
  const [autoPlay, setAutoPlay] = useState(false);

  const handleOpen = () => {
    setPhase("main");
    setAutoPlay(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <AnimatePresence mode="wait">
        {phase === "loading" && (
          <LoadingScreen key="loading" onComplete={() => setPhase("invitation")} />
        )}
        {phase === "invitation" && (
          <InvitationCard key="invitation" onOpen={handleOpen} />
        )}
      </AnimatePresence>

      {phase === "main" && <MainContent autoPlay={autoPlay} />}
    </div>
  );
}
