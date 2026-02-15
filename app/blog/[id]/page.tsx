'use client'

import { blogPosts } from '../data'
import { notFound } from 'next/navigation'
import { ArrowLeft, Calendar, User, Share2, Clock, MessageSquare, Send } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState, useEffect, use } from 'react'
import Link from 'next/link'

export default function BlogPost({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  
  const post = blogPosts.find((p) => p.id === id);
  
  // SCROLL MANTIĞI: Navbar efektleri için
  const [scrolled, setScrolled] = useState(false);
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(comment.trim() && name.trim()) {
        setIsSubmitted(true);
        setTimeout(() => {
            setIsSubmitted(false);
            setComment("");
            setName("");
            // Alert yerine özel bir UI kullanılabilir ama temel mantık aynı
        }, 1500);
    }
  };

  if (!post) {
    return notFound();
  }

  return (
    <div className="bg-[#f9f9f9] min-h-screen text-[#0a0a0a] font-sans selection:bg-black selection:text-white">
      
      {/* NAVBAR: Ana Sayfadaki ile Aynı Tasarım */}
      <nav className={`fixed w-full z-50 transition-all duration-500 flex justify-center ${scrolled ? 'top-4 px-4' : 'top-0 py-5 px-6 lg:px-12'}`}>
        <div className={`w-full flex justify-between items-center transition-all duration-500 ${
            scrolled 
            ? 'max-w-5xl bg-white/90 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] rounded-full px-6 py-3 border border-black/5' 
            : 'max-w-screen-2xl bg-transparent'
          }`}>
          
          <Link href="/" className="text-2xl font-display font-black tracking-tight hover:opacity-70 transition-opacity">
            K I N E T I C <span className="text-gray-400">.</span>
          </Link>
          
          <Link href="/" className="group flex items-center justify-center bg-black text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
            <ArrowLeft className="w-3 h-3 mr-2 group-hover:-translate-x-1 transition-transform" /> 
            Ana Sayfa
          </Link>
        </div>
      </nav>

      {/* Main content with reduced top padding */}
      <main className="pt-36 md:pt-48 pb-24 px-6 lg:px-12">
        <article className="max-w-2xl mx-auto">
          
          {/* HEADER KISMI */}
          <motion.header 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            {/* BAŞLIK */}
            <h1 
              className="text-4xl md:text-5xl lg:text-6xl font-display font-black leading-[1.1] tracking-tight text-black mb-6 text-balance">
              {post.title}
            </h1>
            
            {/* META ŞERİT (Kategori, Tarih, Yazar) */}
            <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6 text-xs md:text-sm font-bold text-gray-500 py-3 px-6 bg-white border border-black/5 rounded-2xl shadow-sm w-fit mx-auto">
              
              <span className="bg-black text-white px-4 py-1.5 rounded-full text-[10px] uppercase tracking-widest shadow-md cursor-default">
                {post.category}
              </span>

              <div className="hidden md:block w-px h-4 bg-gray-200"></div>

              <div className="flex items-center gap-2">
                <User className="w-3 h-3 md:w-4 md:h-4 text-black" />
                <span className="text-black text-[10px] md:text-xs uppercase tracking-wider">Antrenör</span>
              </div>
              
              <div className="hidden md:block w-px h-4 bg-gray-200"></div>
              
              <div className="flex items-center gap-2">
                <Calendar className="w-3 h-3 md:w-4 md:h-4 text-gray-400" /> 
                <span className="font-medium text-gray-600">{post.date}</span>
              </div>
            </div>
          </motion.header>

          {/* GÖRSEL: h-[250px] md:h-[380px] ile boyutu küçültüldü */}
          <motion.div 
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full h-[250px] md:h-[380px] rounded-2xl overflow-hidden mb-16 shadow-lg ring-1 ring-black/5"
          >
            <img 
              src={post.image} 
              alt={post.title} 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-[1.5s]"
            />
          </motion.div>

          {/* METİN İÇERİĞİ: Daha dar sütun (max-w-2xl) ile daha profesyonel okuma */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="prose prose-lg md:prose-2xl text-lg leading-relaxed text-gray-800 mx-auto mb-24 prose-headings:font-display prose-headings:font-black prose-p:text-gray-800 prose-p:leading-[1.8] prose-strong:text-black max-w-3xl"
          >
            {post.content.split('\n').map((paragraph, index) => (
               paragraph.trim() && (
                 <p key={index} className="mb-8 first-letter:text-5xl first-letter:font-black first-letter:text-black first-letter:mr-3 first-letter:float-left">
                   {paragraph}
                 </p>
               )
            ))}
          </motion.div>

        </article>
      </main>

      {/* MARQUEE ŞERİDİ */}
      <div className="bg-[#0a0a0a] text-white py-10 border-t border-white/5 overflow-hidden flex whitespace-nowrap">
        <div className="animate-marquee text-5xl font-display font-black tracking-tighter uppercase opacity-30">
          KINETIC . BİLİM . GÜÇ . HIZ . KINETIC . BİLİM . GÜÇ . HIZ . KINETIC . BİLİM . GÜÇ . HIZ .
        </div>
      </div>
      
      {/* FOOTER */}
      <footer className="bg-black py-16 text-center border-t border-white/5">
        <div className="max-w-screen-xl mx-auto px-6">
            <h2 className="text-4xl font-display font-black text-white mb-6 tracking-tighter uppercase">KINETIC<span className="text-gray-600"> .</span></h2>
            <p className="text-gray-600 text-sm font-medium">&copy; 2026 KINETIC Performans Yönetimi. Tüm hakları saklıdır.</p>
        </div>
      </footer>

    </div>
  )
}