import React, { useState, useEffect, useRef } from 'react';
import { 
  Heart, 
  ChevronDown, 
  Calendar, 
  Camera, 
  Sparkles, 
  Video, 
  Eye, 
  Flame, 
  MessageCircle,
  Clock,
  Battery,
  Wifi
} from 'lucide-react';

// Custom Components
import BackgroundElements from './components/BackgroundElements';
import AudioPlayer from './components/AudioPlayer';
import SafeImage from './components/SafeImage';
import SafeVideo from './components/SafeVideo';
import Lightbox from './components/Lightbox';
import BirthdayLetter from './components/BirthdayLetter';
import CursorTrail from './components/CursorTrail';
import ReasonsILoveYou from './components/ReasonsILoveYou';
import FunnyMemories from './components/FunnyMemories';
import CatchHeartsGame from './components/CatchHeartsGame';
import FutureDreams from './components/FutureDreams';
import LiveCounter from './components/LiveCounter';
import LoveMeter from './components/LoveMeter';
import SpinWheel from './components/SpinWheel';
import SurpriseBoxes from './components/SurpriseBoxes';
import EmotionalEnding from './components/EmotionalEnding';
import BirthdayPreloader from './components/BirthdayPreloader';
import FindMyHeart from './components/FindMyHeart';
import HeartPuzzle from './components/HeartPuzzle';

// Data Configurations
import {
  childhoodMemories,
  presentMemories,
  eyesGallery,
  snapMemories,
  videoMemories,
  togetherMemories
} from './data/memories';

// A simple local ScrollReveal component to give premium fade-in-up animations as the user scrolls
function ScrollReveal({ children, className = '' }: { children: React.ReactNode; className?: string; key?: any }) {

  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Once visible, keep it visible
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0 filter blur-none' : 'opacity-0 translate-y-10 filter blur-[2px]'
      } ${className}`}
    >
      {children}
    </div>
  );
}

export default function App() {
  // Lightbox State
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<any[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Preloader / Entry state
  const [hasEntered, setHasEntered] = useState(false);

  // Smooth scroll helper
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Typewriter effect in Hero Section
  const fullTitle = "Happy Birthday, My Bacha ❤️";
  const [typedTitle, setTypedTitle] = useState("");

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setTypedTitle(fullTitle.substring(0, index + 1));
      index++;
      if (index >= fullTitle.length) {
        clearInterval(timer);
      }
    }, 120);
    return () => clearInterval(timer);
  }, []);

  // Helper to open lightbox with specified image group
  const openLightbox = (imageGroup: any[], index: number) => {
    setLightboxImages(imageGroup);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const handlePrevImage = () => {
    setLightboxIndex((prev) => (prev === 0 ? lightboxImages.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setLightboxIndex((prev) => (prev === lightboxImages.length - 1 ? 0 : prev + 1));
  };

  // Sections array for floating dot navigation
  const sectionIds = [
    { id: 'hero', label: 'Welcome' },
    { id: 'childhood', label: 'Childhood' },
    { id: 'present', label: 'Beautiful Present' },
    { id: 'eyes', label: 'Eyes' },
    { id: 'snap', label: 'Snaps' },
    { id: 'videos', label: 'Memories' },
    { id: 'together', label: 'Us' },
    { id: 'reasons', label: 'Reasons I Love You' },
    { id: 'funny', label: 'Funny Memories' },
    { id: 'game', label: 'Mini Game' },
    { id: 'interactive', label: 'Interactive' },
    { id: 'dreams', label: 'Future Dreams' },
    { id: 'surprise', label: 'Surprise Notes' },
    { id: 'find-heart', label: 'Find My Heart' },
    { id: 'heart-puzzle', label: 'Birthday Puzzle' },
    { id: 'letter', label: 'Letter' },
    { id: 'ending', label: 'Forever' }
  ];

  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 300;
      for (const section of sectionIds) {
        const element = document.getElementById(section.id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen font-sans selection:bg-romantic-pink-200 selection:text-romantic-pink-500">
      
      {/* 1. Interactive Background & Floating Elements */}
      <BackgroundElements />
      
      {/* Cursor Trail of floating hearts behind mouse */}
      <CursorTrail />
      
      {/* 2. Floating Audio Player (Autoplays perfectly once Jagriti clicks Enter) */}
      <AudioPlayer hasEntered={hasEntered} />

      {/* 3. Floating Scroll Nav Dots (Desktop only for a highly premium layout) */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-3.5 px-3 py-5 bg-white/35 backdrop-blur-md rounded-full border border-white/20 shadow-md">
        {sectionIds.map((sec) => (
          <a
            key={sec.id}
            href={`#${sec.id}`}
            className="group relative flex items-center justify-center"
            aria-label={`Scroll to ${sec.label}`}
          >
            {/* Tooltip on hover */}
            <span className="absolute right-7 px-2.5 py-1 text-[10px] font-sans tracking-wider uppercase bg-neutral-900/80 text-white rounded opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 pointer-events-none whitespace-nowrap">
              {sec.label}
            </span>
            <div 
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                activeSection === sec.id 
                  ? 'bg-romantic-pink-500 scale-125 shadow-lg shadow-romantic-pink-400/40' 
                  : 'bg-romantic-pink-300/30 hover:bg-romantic-pink-400/60'
              }`} 
            />
          </a>
        ))}
      </div>

      {/* Main Container */}
      <main className="relative z-10 w-full overflow-x-hidden">
        
        {/* ================= HERO SECTION ================= */}
        <section 
          id="hero" 
          className="relative min-h-screen flex flex-col justify-between items-center text-center px-4 py-12 bg-radial-gradient from-romantic-pink-50/20 via-transparent to-transparent"
        >
          {/* Header Accent */}
          <div className="pt-8 flex flex-col items-center gap-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/60 border border-white/80 rounded-full text-xs font-serif italic text-romantic-pink-500 shadow-sm backdrop-blur-md">
              <Sparkles size={11} className="text-romantic-gold-300 animate-pulse" />
              11:11 • A special corner for you
            </span>

            {/* Special Birthday Announcement Banner */}
            <div className="max-w-md mx-auto bg-gradient-to-r from-rose-500/10 via-romantic-pink-500/5 to-amber-500/10 border border-rose-200/40 py-3 px-6 rounded-2xl shadow-sm backdrop-blur-sm">
              <p className="font-serif italic text-xs sm:text-sm text-romantic-pink-600 font-medium leading-relaxed">
                "On 04 July 2008, a beautiful girl was born into this world, and today, she has become my entire world... ❤️"
              </p>
            </div>
          </div>

          {/* Typing Title Box */}
          <div className="flex flex-col items-center max-w-2xl px-2">
            <div className="relative mb-3">
              <Heart className="text-romantic-pink-200 absolute -top-8 -right-8 animate-bounce" size={24} fill="currentColor" style={{ animationDuration: '4s' }} />
              <Heart className="text-romantic-pink-300 absolute -bottom-6 -left-10 scale-75 animate-bounce" size={20} fill="currentColor" style={{ animationDuration: '5s' }} />
              
              <h1 className="font-cursive text-5xl sm:text-7xl lg:text-8xl text-romantic-pink-500 tracking-wide drop-shadow-sm min-h-[1.5em] flex items-center justify-center">
                {typedTitle}
                <span className="inline-block w-1 h-12 bg-romantic-pink-400 ml-1 animate-pulse" />
              </h1>
            </div>

            <p className="font-serif italic text-base sm:text-lg text-neutral-600 mt-2 tracking-wide max-w-md">
              “A small corner of the internet made only for you.”
            </p>
          </div>

          {/* Bounce Down Indicator */}
          <a 
            href="#childhood" 
            className="flex flex-col items-center gap-1 group text-neutral-400 hover:text-romantic-pink-500 transition-colors duration-300"
          >
            <span className="text-[10px] font-sans uppercase tracking-widest text-neutral-400">Our Story</span>
            <ChevronDown size={20} className="animate-bounce" />
          </a>
        </section>


        {/* ================= 1. CHILDHOOD MEMORIES ================= */}
        <section id="childhood" className="py-24 px-4 max-w-6xl mx-auto">
          <ScrollReveal className="text-center mb-16">
            <div className="inline-flex p-3 rounded-full bg-romantic-pink-50/60 mb-3 border border-romantic-pink-100">
              <Calendar className="text-romantic-pink-400" size={20} />
            </div>
            <h2 className="font-serif font-medium text-3xl md:text-4xl tracking-tight text-neutral-800">
              Childhood Memories
            </h2>
            <div className="w-12 h-0.5 bg-romantic-pink-300/40 mx-auto mt-3 rounded-full" />
            <p className="font-sans font-light text-neutral-500 text-sm max-w-md mx-auto mt-3 leading-relaxed">
              Before the rest of the world met you, you were already a masterpiece in the making.
            </p>
          </ScrollReveal>

          {/* Polaroid Cards Row */}
          <div className="flex flex-wrap items-center justify-center gap-12 max-w-4xl mx-auto">
            {childhoodMemories.map((photo, idx) => (
              <ScrollReveal key={photo.id} className="w-full sm:w-[320px]">
                <div 
                  className="polaroid cursor-pointer relative group" 
                  style={{ '--rotation': idx === 0 ? '-4deg' : '4deg' } as React.CSSProperties}
                  onClick={() => openLightbox(childhoodMemories, idx)}
                >
                  {/* Cute animal/baby stickers */}
                  <span className="absolute -top-3.5 -right-3 text-4xl select-none z-20 drop-shadow-md animate-bounce group-hover:scale-110 transition-transform" style={{ animationDuration: idx === 0 ? '3s' : '4s' }}>
                    {idx === 0 ? '🧸' : '🐣'}
                  </span>

                  <div className="aspect-[3/4] rounded-sm overflow-hidden mb-4 border border-neutral-100 bg-neutral-50">
                    <SafeImage
                      src={photo.src}
                      fallback={photo.fallback}
                      alt={photo.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Handwritten aesthetic caption on Polaroid bottom */}
                  <div className="text-center">
                    <span className="text-romantic-pink-500 font-cursive text-2xl tracking-wide">
                      {photo.title}
                    </span>
                    <p className="text-[10px] uppercase font-sans tracking-widest text-neutral-400 mt-1">
                      {photo.year}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>


        {/* ================= 2. BEAUTIFUL PRESENT ================= */}
        <section id="present" className="py-24 px-4 bg-romantic-pink-50/20 border-y border-romantic-pink-100/30">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal className="text-center mb-16">
              <div className="inline-flex p-3 rounded-full bg-white mb-3 border border-romantic-pink-50 shadow-sm">
                <Camera className="text-romantic-pink-400" size={20} />
              </div>
              <h2 className="font-serif font-medium text-3xl md:text-4xl tracking-tight text-neutral-800">
                Beautiful Present
              </h2>
              <div className="w-12 h-0.5 bg-romantic-pink-300/40 mx-auto mt-3 rounded-full" />
              <p className="font-sans font-light text-neutral-500 text-sm max-w-md mx-auto mt-3 leading-relaxed">
                Glowing, breathtaking, and full of life. Capturing the beautiful light you bring everywhere.
              </p>
            </ScrollReveal>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {presentMemories.map((photo, idx) => (
                <ScrollReveal key={photo.id}>
                  <button 
                    onClick={() => openLightbox(presentMemories, idx)}
                    className="w-full text-left group relative aspect-[4/5] rounded-[32px] overflow-hidden p-2.5 bg-white border-[6px] border-white shadow-md hover:shadow-xl hover:scale-105 hover:border-romantic-pink-100 transition-all duration-500 cursor-pointer focus:outline-none ring-1 ring-romantic-pink-100/10"
                  >
                    <div className="w-full h-full rounded-2xl overflow-hidden relative">
                      <SafeImage
                        src={photo.src}
                        fallback={photo.fallback}
                        alt={photo.title}
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Cute sparkle sticker overlay */}
                      <span className="absolute top-4 right-4 text-2.5xl select-none z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse">
                        ✨
                      </span>

                      {/* Hover details overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-romantic-pink-500/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                        <span className="text-[9px] font-sans tracking-widest text-white/70 uppercase mb-0.5">
                          {photo.year}
                        </span>
                        <h4 className="font-serif font-semibold text-white text-base">
                          {photo.title}
                        </h4>
                        <p className="text-[11px] text-white/90 font-sans mt-1 line-clamp-2">
                          {photo.caption}
                        </p>
                      </div>
                    </div>
                  </button>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>


        {/* ================= 3. EYES GALLERY ================= */}
        <section id="eyes" className="py-24 px-4 max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-16">
            <div className="inline-flex p-3 rounded-full bg-romantic-pink-50/60 mb-3 border border-romantic-pink-100">
              <Eye className="text-romantic-pink-400" size={20} />
            </div>
            <h2 className="font-serif font-medium text-3xl md:text-4xl tracking-tight text-neutral-800">
              Eyes Gallery
            </h2>
            <div className="w-12 h-0.5 bg-romantic-pink-300/40 mx-auto mt-3 rounded-full" />
            <p className="font-sans font-light text-neutral-500 text-sm max-w-md mx-auto mt-3 leading-relaxed">
              They say eyes are the windows to the soul. Yours are the windows to a pure, beautiful universe.
            </p>
          </ScrollReveal>

          {/* Closeups Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {eyesGallery.map((photo, idx) => (
              <ScrollReveal key={photo.id}>
                <div 
                  onClick={() => openLightbox(eyesGallery, idx)}
                  className="group flex flex-col items-center bg-white border border-neutral-100/20 p-6 rounded-[32px] shadow-md hover:shadow-xl hover:scale-103 transition-all duration-500 cursor-pointer relative"
                >
                  {/* Cute eye decoration sticker */}
                  <span className="absolute top-3 left-6 text-3xl select-none animate-bounce" style={{ animationDuration: idx === 0 ? '4s' : '4.8s' }}>
                    {idx === 0 ? '👀' : '💖'}
                  </span>

                  {/* Classic circle crop to focus perfectly on her gorgeous eyes */}
                  <div className="w-72 h-72 rounded-full overflow-hidden border-[6px] border-white shadow-lg relative ring-4 ring-romantic-pink-50 flex-shrink-0">
                    <SafeImage
                      src={photo.src}
                      fallback={photo.fallback}
                      alt={photo.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-romantic-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  
                  <h3 className="font-serif font-medium text-lg text-neutral-800 mt-6 group-hover:text-romantic-pink-500 transition-colors">
                    {photo.title}
                  </h3>
                  <p className="font-sans font-light text-neutral-500 text-xs text-center mt-2 max-w-xs leading-relaxed">
                    {photo.caption}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>


        {/* ================= 4. CUTE SNAP MEMORIES ================= */}
        <section id="snap" className="py-24 px-4 bg-romantic-pink-50/20 border-y border-romantic-pink-100/30 overflow-hidden">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal className="text-center mb-16">
              <div className="inline-flex p-3 rounded-full bg-white mb-3 border border-romantic-pink-50 shadow-sm">
                <Flame className="text-romantic-pink-400 animate-pulse" size={20} />
              </div>
              <h2 className="font-serif font-medium text-3xl md:text-4xl tracking-tight text-neutral-800">
                Cute Snap Memories
              </h2>
              <div className="w-12 h-0.5 bg-romantic-pink-300/40 mx-auto mt-3 rounded-full" />
              <p className="font-sans font-light text-neutral-500 text-sm max-w-md mx-auto mt-3 leading-relaxed">
                Short, silly, beautiful clips that loop forever in my head. Play inline silently.
              </p>
            </ScrollReveal>

            {/* Vertical phone mockup arrangement */}
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
              {snapMemories.map((snap, idx) => (
                <ScrollReveal key={snap.id} className="w-[250px] sm:w-[270px]">
                  {/* Phone body frame with interactive scaling and glowing ring */}
                  <div className="relative aspect-[9/16] w-full rounded-[42px] border-[10px] border-neutral-900 bg-neutral-950 shadow-2xl hover:shadow-romantic-pink-200/50 hover:scale-105 transition-all duration-500 overflow-hidden group">
                    
                    {/* Cute cartoon status sticker */}
                    <span className="absolute top-2.5 right-6 text-2xl select-none z-30 animate-pulse">
                      {idx === 0 ? '👑' : idx === 1 ? '🎀' : '🐱'}
                    </span>

                    {/* Top Speaker/Notch Area */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-5 bg-neutral-900 rounded-b-2xl z-30 flex items-center justify-center">
                      {/* Lens and Speaker dot */}
                      <div className="w-2.5 h-2.5 rounded-full bg-neutral-950/80 mr-4 border border-white/5" />
                      <div className="w-8 h-1 rounded-full bg-neutral-850" />
                    </div>

                    {/* Status Bar elements to feel real and highly premium */}
                    <div className="absolute top-1.5 left-0 w-full px-5 flex justify-between items-center z-20 text-[9px] text-white/80 font-sans tracking-wide">
                      <div className="flex items-center gap-1">
                        <Clock size={8} className="mr-0.5" /> 11:11
                      </div>
                      <div className="flex items-center gap-1">
                        <Wifi size={8} />
                        <Battery size={9} />
                      </div>
                    </div>

                    {/* Inline Silent Autoplayer Video */}
                    <SafeVideo
                      src={snap.src}
                      fallback={snap.fallback}
                      title={snap.title}
                      autoplay={true}
                      loop={true}
                      muted={true}
                      className="w-full h-full object-cover"
                    />

                    {/* Chat Capsule footer overlay */}
                    <div className="absolute bottom-4 left-0 w-full px-4 z-20">
                      <div className="flex items-center gap-2 p-1.5 rounded-full bg-black/45 border border-white/10 backdrop-blur-md">
                        <div className="p-1 rounded-full bg-romantic-pink-500 text-white">
                          <MessageCircle size={10} />
                        </div>
                        <span className="text-[10px] text-white/95 font-sans truncate pr-2">
                          {snap.caption}
                        </span>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>


        {/* ================= 5. OUR VIDEO MEMORIES ================= */}
        <section id="videos" className="py-24 px-4 max-w-6xl mx-auto">
          <ScrollReveal className="text-center mb-16">
            <div className="inline-flex p-3 rounded-full bg-romantic-pink-50/60 mb-3 border border-romantic-pink-100">
              <Video className="text-romantic-pink-400" size={20} />
            </div>
            <h2 className="font-serif font-medium text-3xl md:text-4xl tracking-tight text-neutral-800">
              Our Video Memories
            </h2>
            <div className="w-12 h-0.5 bg-romantic-pink-300/40 mx-auto mt-3 rounded-full" />
            <p className="font-sans font-light text-neutral-500 text-sm max-w-md mx-auto mt-3 leading-relaxed">
              Cinematic blocks of our best moments together. Hover to reveal title and play with controls.
            </p>
          </ScrollReveal>

          {/* Videos Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {videoMemories.map((vid, idx) => (
              <ScrollReveal key={vid.id}>
                <div className="relative bg-white border-[6px] border-white p-2.5 shadow-md hover:shadow-xl hover:scale-103 transition-all duration-500 rounded-[28px] flex flex-col group">
                  {/* Cute movie/popcorn floating sticker */}
                  <span className="absolute -top-3.5 -right-2 text-3xl select-none z-20 animate-bounce" style={{ animationDuration: '3.5s', animationDelay: `${idx * 0.4}s` }}>
                    {idx === 0 ? '🍿' : idx === 1 ? '🎬' : '🐳'}
                  </span>

                  <div className="aspect-[9/16] w-full rounded-2xl overflow-hidden relative shadow-inner">
                    <SafeVideo
                      src={vid.src}
                      fallback={vid.fallback}
                      title={vid.title}
                      autoplay={true}
                      controls={true}
                      loop={true}
                      muted={true}
                      poster={vid.thumbnail}
                      className="w-full h-full"
                    />
                  </div>
                  
                  {/* Video text card description bottom */}
                  <div className="p-3">
                    <h4 className="font-serif font-semibold text-neutral-800 text-base">
                      {vid.title}
                    </h4>
                    <p className="text-neutral-500 text-xs font-sans mt-1.5 leading-relaxed">
                      {vid.caption}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>


        {/* ================= 6. OUR FAVORITE PICTURES ================= */}
        <section id="together" className="py-24 px-4 bg-romantic-pink-50/10 border-t border-romantic-pink-100/20">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal className="text-center mb-16">
              <div className="inline-flex p-3 rounded-full bg-white mb-3 border border-romantic-pink-50 shadow-sm">
                <Heart className="text-romantic-pink-400 animate-pulse" size={20} fill="currentColor" />
              </div>
              <h2 className="font-serif font-medium text-3xl md:text-4xl tracking-tight text-neutral-800">
                Our Favorite Pictures
              </h2>
              <div className="w-12 h-0.5 bg-romantic-pink-300/40 mx-auto mt-3 rounded-full" />
              <p className="font-sans font-light text-neutral-500 text-sm max-w-md mx-auto mt-3 leading-relaxed">
                When I look at these, my heart does a happy little flip. Together, we are an unbreakable team.
              </p>
            </ScrollReveal>

            {/* Glowing Border Card Items */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {togetherMemories.map((photo, idx) => (
                <ScrollReveal key={photo.id}>
                  <div 
                    onClick={() => openLightbox(togetherMemories, idx)}
                    className="group relative cursor-pointer rounded-[32px] overflow-hidden bg-white p-2.5 border-[6px] border-white hover:scale-105 shadow-md hover:shadow-2xl transition-all duration-500 ring-1 ring-romantic-pink-100/10"
                  >
                    {/* Cute floating sticker */}
                    <span className="absolute top-4 left-4 text-3xl select-none z-20 animate-bounce" style={{ animationDuration: '3.8s' }}>
                      {idx === 0 ? '🌹' : idx === 1 ? '💍' : '💒'}
                    </span>

                    {/* Glowing golden border layout on card hover */}
                    <div className="absolute inset-0 rounded-[28px] border-2 border-transparent group-hover:border-romantic-gold-300/60 group-hover:shadow-[0_0_20px_rgba(223,177,91,0.25)] transition-all duration-500 pointer-events-none" />
                    
                    <div className="aspect-[3/4] rounded-2xl overflow-hidden relative">
                      <SafeImage
                        src={photo.src}
                        fallback={photo.fallback}
                        alt={photo.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="p-3 text-center">
                      <h4 className="font-serif font-medium text-neutral-800 text-base group-hover:text-romantic-pink-500 transition-colors">
                        {photo.title}
                      </h4>
                      <p className="text-[10px] uppercase font-sans tracking-widest text-neutral-400 mt-0.5">
                        {photo.year}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>


        {/* ================= Reasons I Love You Section ================= */}
        <section id="reasons" className="py-24 px-4 bg-gradient-to-b from-transparent to-rose-50/10">
          <ScrollReveal className="text-center mb-16">
            <h2 className="font-serif font-medium text-3xl md:text-4xl tracking-tight text-neutral-800">
              Reasons I Love You
            </h2>
            <div className="w-12 h-0.5 bg-romantic-pink-300/40 mx-auto mt-3 rounded-full" />
            <p className="font-sans font-light text-neutral-500 text-sm max-w-md mx-auto mt-3 leading-relaxed">
              Just a few tiny reasons out of the infinite ones in my heart. Use the slider to see them all.
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <ReasonsILoveYou />
          </ScrollReveal>
        </section>


        {/* ================= Funny Memories Section ================= */}
        <section id="funny" className="py-24 px-4 border-t border-romantic-pink-100/10">
          <ScrollReveal className="text-center mb-16">
            <h2 className="font-serif font-medium text-3xl md:text-4xl tracking-tight text-neutral-800">
              Funny Memories
            </h2>
            <div className="w-12 h-0.5 bg-romantic-pink-300/40 mx-auto mt-3 rounded-full" />
            <p className="font-sans font-light text-neutral-500 text-sm max-w-md mx-auto mt-3 leading-relaxed">
              Because our love is incomplete without leg-pulling and non-stop laughter! Click a card to read the story.
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <FunnyMemories />
          </ScrollReveal>
        </section>


        {/* ================= Catch The Hearts Mini Game Section ================= */}
        <section id="game" className="py-24 px-4 bg-gradient-to-b from-transparent to-pink-50/10">
          <ScrollReveal className="text-center mb-16">
            <h2 className="font-serif font-medium text-3xl md:text-4xl tracking-tight text-neutral-800">
              Catch The Hearts ❤️
            </h2>
            <div className="w-12 h-0.5 bg-romantic-pink-300/40 mx-auto mt-3 rounded-full" />
            <p className="font-sans font-light text-neutral-500 text-sm max-w-md mx-auto mt-3 leading-relaxed">
              Play a quick, sweet game to unlock a secret envelope from Somu!
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <CatchHeartsGame />
          </ScrollReveal>
        </section>


        {/* ================= Interactive Love Dashboard Section ================= */}
        <section id="interactive" className="py-24 px-4 border-t border-romantic-pink-100/10">
          <ScrollReveal className="text-center mb-16">
            <h2 className="font-serif font-medium text-3xl md:text-4xl tracking-tight text-neutral-800">
              Our Love Dashboard
            </h2>
            <div className="w-12 h-0.5 bg-romantic-pink-300/40 mx-auto mt-3 rounded-full" />
            <p className="font-sans font-light text-neutral-500 text-sm max-w-md mx-auto mt-3 leading-relaxed">
              Dynamic counters, random tests, and a fortune spin wheel made purely for Jagriti.
            </p>
          </ScrollReveal>

          <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
            <ScrollReveal>
              <LiveCounter />
            </ScrollReveal>
            
            <ScrollReveal>
              <LoveMeter />
            </ScrollReveal>
            
            <ScrollReveal>
              <SpinWheel />
            </ScrollReveal>
          </div>
        </section>


        {/* ================= Future Dreams Section ================= */}
        <section id="dreams" className="py-24 px-4 bg-gradient-to-b from-transparent to-rose-50/15">
          <ScrollReveal className="text-center mb-16">
            <h2 className="font-serif font-medium text-3xl md:text-4xl tracking-tight text-neutral-800">
              Future Dreams Together
            </h2>
            <div className="w-12 h-0.5 bg-romantic-pink-300/40 mx-auto mt-3 rounded-full" />
            <p className="font-sans font-light text-neutral-500 text-sm max-w-md mx-auto mt-3 leading-relaxed">
              Every single dream I have for the future features you, my gorgeous child.
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <FutureDreams />
          </ScrollReveal>
        </section>


        {/* ================= Surprise Message Boxes Section ================= */}
        <section id="surprise" className="py-24 px-4 border-t border-romantic-pink-100/10">
          <ScrollReveal className="text-center mb-16">
            <h2 className="font-serif font-medium text-3xl md:text-4xl tracking-tight text-neutral-800">
              Secret Surprise Boxes
            </h2>
            <div className="w-12 h-0.5 bg-romantic-pink-300/40 mx-auto mt-3 rounded-full" />
            <p className="font-sans font-light text-neutral-500 text-sm max-w-md mx-auto mt-3 leading-relaxed">
              Special envelopes and hidden stardust to brighten up your mood or guide you to sweet sleep.
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <SurpriseBoxes />
          </ScrollReveal>
        </section>


        {/* ================= GAME 1: FIND MY HEART ================= */}
        <section id="find-heart" className="py-24 px-4 bg-gradient-to-b from-transparent via-rose-50/10 to-transparent border-t border-romantic-pink-100/10">
          <ScrollReveal>
            <FindMyHeart onNextStep={() => scrollToSection('heart-puzzle')} />
          </ScrollReveal>
        </section>


        {/* ================= GAME 2: BIRTHDAY HEART PUZZLE ================= */}
        <section id="heart-puzzle" className="py-24 px-4 bg-gradient-to-b from-transparent via-romantic-pink-50/5 to-transparent border-t border-romantic-pink-100/10">
          <ScrollReveal>
            <HeartPuzzle onComplete={() => scrollToSection('letter')} />
          </ScrollReveal>
        </section>


        {/* ================= 7. BIRTHDAY LETTER ================= */}
        <section id="letter" className="py-24 px-4 bg-radial-gradient from-romantic-pink-50/30 via-transparent to-transparent">
          <ScrollReveal className="text-center mb-10">
            <h2 className="font-cursive text-5xl md:text-6xl text-romantic-pink-500 tracking-wide">
              A Love Letter for You
            </h2>
            <div className="w-12 h-0.5 bg-romantic-pink-300/40 mx-auto mt-2 rounded-full" />
            <p className="font-sans font-light text-neutral-500 text-xs max-w-sm mx-auto mt-2.5 leading-relaxed">
              Click the sealed envelope to reveal the handwritten letter. You can customize the words by clicking "Edit".
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <BirthdayLetter />
          </ScrollReveal>
        </section>


        {/* ================= 8. ENDING SECTION (MOST EMOTIONAL) ================= */}
        <section id="ending">
          <EmotionalEnding />
        </section>

      </main>

      {/* ================= LIGHTBOX MODAL CONTAINER ================= */}
      <Lightbox
        isOpen={lightboxOpen}
        images={lightboxImages}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxOpen(false)}
        onPrev={handlePrevImage}
        onNext={handleNextImage}
      />

      {/* Conditional Birthday Preloader Screen */}
      {!hasEntered && (
        <BirthdayPreloader onEnter={() => setHasEntered(true)} />
      )}

    </div>
  );
}
