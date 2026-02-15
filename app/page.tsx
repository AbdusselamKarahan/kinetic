'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Plus, ChevronDown, Quote, Instagram, Play, Target } from 'lucide-react'
import { useState, useEffect } from 'react'
import { blogPosts } from './blog/data'
import Link from 'next/link'

export default function Home() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState("Program Seçiniz");
  const [scrolled, setScrolled] = useState(false);

  // Sayfa kaydırıldığında Navbar'ın şekil değiştirmesi
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const programs = [
    "Birebir Performans Koçluğu", 
    "BESYO/POMEM Sınav Hazırlığı", 
    "Takım/Grup Eğitimleri", 
    "Diğer"
  ];

  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const faqs = [
    { q: "Sadece profesyonel sporcularla mı çalışıyorsunuz?", a: "Hayır. Spora yeni başlayan, sağlıklı bir yaşama adım atmak isteyen veya BESYO/POMEM gibi özel parkur sınavlarına hazırlanan herkesle, seviyelerine uygun şekilde çalışıyoruz." },
    { q: "Antrenmanlar nerede yapılıyor?", a: "Programın türüne göre Isparta içindeki uygun atletizm pistlerinde, parklarda veya anlaşmalı spor tesislerinde saha uygulamalarımızı gerçekleştiriyoruz." },
    { q: "Beslenme programı yazıyor musunuz?", a: "Performans koçluğu antrenman bilimine odaklanır. Beslenme konusunda genel stratejik tavsiyeler vermekle birlikte, klinik diyet programları için uzman diyetisyenlerle ortaklaşa ilerlemeyi tercih ediyoruz." }
  ];

  return (
    <div className="bg-[#f9f9f9] text-[#0a0a0a] min-h-screen font-sans selection:bg-[#0a0a0a] selection:text-[#f9f9f9] relative">
      
      {/* YENİ: SABİT WHATSAPP BUTONU */}
      <motion.a
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5, type: "spring" }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        href="https://wa.me/905337013723?text=Merhaba,%20performans%20koçluğu%20hakkında%20bilgi%20almak%20istiyorum."
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[100] bg-[#25D366] text-white p-4 rounded-full shadow-[0_10px_40px_rgba(37,211,102,0.4)] flex items-center justify-center group hover:bg-[#20bd5a] transition-colors"
      >
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.305-.885-.653-1.482-1.459-1.656-1.756-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
        </svg>
        <span className="absolute right-16 md:right-20 bg-black text-white text-sm font-bold py-2 px-4 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
          Bana Ulaşın
        </span>
      </motion.a>

      {/* Navbar (Sabit ve Şık) */}
      <nav className={`fixed w-full z-50 transition-all duration-500 flex justify-center ${scrolled ? 'top-4 px-4' : 'top-0 py-5 px-6 lg:px-12'}`}>
        <div className={`w-full flex justify-between items-center transition-all duration-500 ${scrolled ? 'max-w-5xl bg-white/80 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] rounded-full px-6 py-3 border border-black/5' : 'max-w-screen-2xl bg-transparent'}`}>
          <a href="#" className="text-2xl font-display font-black tracking-tight">K I N E T I C <span className="text-gray-400">.</span></a>
          <ul className="hidden md:flex space-x-8 text-base font-semibold tracking-wide">
            <li><a href="#programlar" className="relative group hover:text-gray-500 transition-colors py-2">Programlar</a></li>
            <li><a href="#hikayeler" className="relative group hover:text-gray-500 transition-colors py-2">Başarılar</a></li>
            <li><a href="#koc" className="relative group hover:text-gray-500 transition-colors py-2">Antrenör</a></li>
            <li><a href="#blog" className="relative group hover:text-gray-500 transition-colors py-2">Blog</a></li>
          </ul>
          
          <motion.a 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#iletisim" 
            className="relative hidden md:inline-flex items-center justify-center overflow-hidden bg-black text-white px-8 py-3 rounded-full text-base font-bold shadow-xl group"
          >
            <span className="relative z-10">Hemen Başla</span>
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1s_infinite]"></span>
          </motion.a>
        </div>
      </nav>

      {/* SİNEMATİK HERO BÖLÜMÜ */}
      <main className="pt-28 pb-10 px-4 lg:px-8 max-w-[100rem] mx-auto">
        <motion.div 
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative w-full h-[80vh] md:h-[85vh] rounded-[2.5rem] overflow-hidden bg-black flex items-end p-8 md:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.2)] group"
        >
          <div className="absolute inset-0 z-0">
            <img 
              src="/atletizm.jpg" 
              alt="Elite Sprint" 
              className="w-full h-full object-cover grayscale opacity-60 group-hover:scale-105 group-hover:grayscale-0 group-hover:opacity-90 transition-all duration-[1.5s] ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none"></div>
          </div>

          <div className="relative z-10 w-full flex flex-col md:flex-row md:items-end justify-between gap-10">
            <div className="max-w-4xl">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="flex flex-wrap gap-3 mb-6"
              >
                <span className="flex items-center px-4 py-1.5 rounded-full border border-white/30 text-white text-xs font-bold tracking-widest uppercase backdrop-blur-md bg-white/10">
                  <Target className="w-3 h-3 mr-2" /> Elite Performans
                </span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="text-5xl md:text-8xl lg:text-[7.5rem] font-display font-black text-white leading-[0.95] tracking-tighter uppercase mb-2"
              >
                Potansiyelini
              </motion.h1>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="text-5xl md:text-8xl lg:text-[7.5rem] font-display font-black text-white leading-[0.95] tracking-tighter uppercase"
              >
                Özgür Bırak<span className="text-gray-400">.</span>
              </motion.h1>
            </div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="md:w-1/3 flex flex-col items-start md:items-end text-left md:text-right"
            >
              <p className="text-gray-300 text-lg md:text-xl font-medium leading-relaxed mb-8">
                Sıradan antrenmanları unutun. Atletizm temelli bilimsel metotlarla gücünüzü, hızınızı ve dayanıklılığınızı yeniden inşa ediyoruz.
              </p>
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#iletisim" 
                className="bg-white text-black px-8 py-4 rounded-full text-base font-black uppercase tracking-widest flex items-center hover:bg-gray-200 transition-colors shadow-2xl"
              >
                Analiz Randevusu <ArrowRight className="w-5 h-5 ml-3" />
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </main>

      {/* Aksiyon Videosu */}
      <section className="py-20 bg-black relative h-[60vh] overflow-hidden flex items-center justify-center group border-y border-white/10">
        <div className="absolute inset-0 z-0">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover opacity-30 group-hover:opacity-50 transition duration-1000 grayscale"
          >
            <source src="/aksiyon.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="relative z-10 text-center px-6">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-20 h-20 mx-auto rounded-full border border-white/30 flex items-center justify-center backdrop-blur-sm mb-6 cursor-pointer hover:bg-white/10 transition-colors"
          >
            <Play className="w-8 h-8 text-white ml-2" />
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-display font-black text-white tracking-tighter uppercase mb-4">Mazeret Yok. Sadece Sonuç.</h2>
          <p className="text-gray-400 text-lg font-medium max-w-2xl mx-auto">Saha uygulamalarımızın yoğunluğunu ve disiplinini hisset.</p>
        </div>
      </section>

      {/* Programlar Bölümü */}
      <section id="programlar" className="py-24 bg-black text-white px-6 lg:px-12 overflow-hidden">
        <div className="max-w-screen-2xl mx-auto relative">
           <div className="absolute top-0 right-0 text-[15rem] font-display font-black text-white/5 pointer-events-none select-none -translate-y-20 translate-x-10">PRO</div>

          <div className="mb-24 md:flex justify-between items-end border-b border-white/20 pb-8 relative z-10">
            <h2 className="text-4xl md:text-5xl font-display font-black tracking-tight">Uzmanlık Alanlarımız.</h2>
            <p className="text-gray-400 max-w-md mt-4 md:mt-0 font-medium text-xl leading-relaxed">Hangi hedefe koşarsanız koşun, ona ulaşmak için bilimsel bir yol haritamız var.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            <motion.div 
              whileHover={{ y: -15, scale: 1.02 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative border border-white/10 bg-[#0f0f0f] p-12 hover:border-white/30 hover:shadow-[0_20px_50px_rgba(255,255,255,0.05)] group rounded-2xl min-h-[450px] flex flex-col justify-between overflow-hidden cursor-pointer"
            >
              <motion.span 
                className="absolute -bottom-10 -right-4 text-[12rem] font-display font-black text-white/5 pointer-events-none"
                whileHover={{ scale: 1.1, x: -10, y: -10 }}
                transition={{ duration: 0.5 }}
              >01</motion.span>
              
              <div className="relative z-10">
                <span className="text-sm font-bold tracking-widest text-gray-500 uppercase mb-8 block border-b border-white/10 pb-4">Elite Segment</span>
                <h3 className="text-4xl font-display font-black mb-6 group-hover:text-gray-200 transition-colors duration-300">Birebir Performans<br/>Koçluğu</h3>
                <p className="text-gray-400 font-medium text-lg leading-relaxed group-hover:text-gray-300 transition-colors">Amatör veya profesyonel sporcular için maksimum hız, patlayıcı güç ve branşa özgü kondisyon yüklemeleri.</p>
              </div>
              <a href="#iletisim" className="text-white text-base font-bold uppercase tracking-wider flex items-center mt-10 w-fit relative z-10">
                Detayları Konuşalım <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-3 transition-transform duration-300" />
              </a>
            </motion.div>

             <motion.div 
              whileHover={{ y: -15, scale: 1.02 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative border border-white/20 bg-[#151515] p-12 hover:border-white/40 hover:shadow-[0_20px_50px_rgba(255,255,255,0.08)] group rounded-2xl min-h-[450px] flex flex-col justify-between overflow-hidden md:-translate-y-8 cursor-pointer"
            >
              <motion.span 
                className="absolute -bottom-10 -right-4 text-[12rem] font-display font-black text-white/5 pointer-events-none"
                whileHover={{ scale: 1.1, x: -10, y: -10 }}
                transition={{ duration: 0.5 }}
              >02</motion.span>

              <div className="relative z-10">
                <span className="text-sm font-bold tracking-widest text-white uppercase mb-8 block border-b border-white/20 pb-4">Hazırlık Sınıfı</span>
                <h3 className="text-4xl font-display font-black mb-6 text-white transition-colors duration-300">BESYO & POMEM<br/>Parkur Eğitimi</h3>
                <p className="text-gray-300 font-medium text-lg leading-relaxed group-hover:text-white transition-colors">Saniyelerin hayat değiştirdiği sınavlar için taktiksel driller, sıçrama mekaniği ve hata sıfırlama çalışmaları.</p>
              </div>
              <a href="#iletisim" className="text-white text-base font-bold uppercase tracking-wider flex items-center mt-10 w-fit relative z-10">
                Kontenjan Sor <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-3 transition-transform duration-300" />
              </a>
            </motion.div>

            <motion.div 
              whileHover={{ y: -15, scale: 1.02 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative border border-white/10 bg-[#0f0f0f] p-12 hover:border-white/30 hover:shadow-[0_20px_50px_rgba(255,255,255,0.05)] group rounded-2xl min-h-[450px] flex flex-col justify-between overflow-hidden cursor-pointer"
            >
              <motion.span 
                className="absolute -bottom-10 -right-4 text-[12rem] font-display font-black text-white/5 pointer-events-none"
                whileHover={{ scale: 1.1, x: -10, y: -10 }}
                transition={{ duration: 0.5 }}
              >03</motion.span>

              <div className="relative z-10">
                <span className="text-sm font-bold tracking-widest text-gray-500 uppercase mb-8 block border-b border-white/10 pb-4">Kurumsal Segment</span>
                <h3 className="text-4xl font-display font-black mb-6 group-hover:text-gray-200 transition-colors duration-300">Seminer & Takım<br/>Ölçümleri</h3>
                <p className="text-gray-400 font-medium text-lg leading-relaxed group-hover:text-gray-300 transition-colors">Kulüpler ve okullar için antrenman bilimi seminerleri, fiziksel uygunluk testleri ve takım taramaları.</p>
              </div>
              <a href="#iletisim" className="text-white text-base font-bold uppercase tracking-wider flex items-center mt-10 w-fit relative z-10">
                Teklif Al <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-3 transition-transform duration-300" />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Başarı Hikayeleri */}
      <section id="hikayeler" className="py-32 bg-[#050505] text-white px-6 lg:px-12 border-t border-white/10">
        <div className="max-w-screen-2xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-6xl font-display font-black tracking-tight mb-6">Saha Yalan Söylemez.</h2>
            <p className="text-gray-400 font-medium text-xl max-w-2xl mx-auto">Bizimle çalışıp hedeflerine ulaşan sporcularımızın sahici deneyimleri.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { text: "POMEM parkurunda 3 saniye takılı kalmıştım. Patlayıcı güç antrenmanları sayesinde sınavı dereceyle geçtim. Sadece bir koç değil, aynı zamanda harika bir mentör.", author: "Ahmet Y.", title: "POMEM Adayı", offset: "md:mt-0" },
              { text: "Amatör futbolcuyum, hızlanma problemim vardı. Atletizm temelli sprint mekaniği çalıştıktan sonra sahadaki ilk adımlarım inanılmaz değişti.", author: "Burak C.", title: "Futbolcu", offset: "md:mt-16" },
              { text: "Antrenman programları çok detaylı. Her idmanda neden o hareketi yaptığımızı bilmek, gelişimi hissetmek paha biçilemez. Kariyerimde yeni bir sayfa açtım.", author: "Selin K.", title: "Performans Sporcusu", offset: "md:-mt-8" }
            ].map((review, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -10, scale: 1.02 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`bg-[#111] p-10 rounded-3xl relative border border-white/5 hover:border-white/20 hover:shadow-[0_20px_40px_rgba(255,255,255,0.05)] cursor-default group ${review.offset}`}
              >
                <Quote className="w-12 h-12 text-white/5 absolute top-8 right-8 group-hover:text-white/20 group-hover:rotate-12 transition-all duration-500" />
                <p className="text-gray-300 text-xl leading-relaxed mb-10 font-light italic relative z-10 group-hover:text-white transition-colors duration-300">"{review.text}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-white/10 rounded-full mr-4 flex items-center justify-center font-bold text-lg group-hover:bg-white group-hover:text-black transition-colors duration-300">{review.author.charAt(0)}</div>
                  <div>
                    <h4 className="font-bold text-lg">{review.author}</h4>
                    <span className="text-sm text-gray-500 uppercase tracking-widest block mt-1">{review.title}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sürecimiz */}
      <section id="surec" className="py-32 px-6 lg:px-12 max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-display font-black tracking-tight mb-8 leading-tight">Başarı Tesadüf Değildir, Bir Algoritmadır.</h2>
            <p className="text-2xl text-gray-600 font-medium mb-12 leading-relaxed">Ezbere antrenman yazmıyoruz. Her sporcunun biyomekaniği bir parmak izi gibi benzersizdir. İşte metodolojimiz:</p>
            <div className="space-y-12">
              <div className="flex">
                <div className="flex-shrink-0 mr-8">
                  <span className="w-14 h-14 rounded-full border-2 border-black flex items-center justify-center font-display font-black text-xl">1</span>
                </div>
                <div>
                  <h4 className="text-2xl font-bold mb-3">Test ve Analiz</h4>
                  <p className="text-gray-600 font-medium text-lg leading-relaxed">Mevcut fiziksel kapasitenizi, asimetrilerinizi ve zayıf halkalarınızı bilimsel testlerle (kuvvet, mobilite, hız) haritalandırıyoruz.</p>
                </div>
              </div>
              <div className="flex">
                <div className="flex-shrink-0 mr-8">
                  <span className="w-14 h-14 rounded-full border-2 border-black flex items-center justify-center font-display font-black text-xl bg-black text-white">2</span>
                </div>
                <div>
                  <h4 className="text-2xl font-bold mb-3">Periyotlama (Planlama)</h4>
                  <p className="text-gray-600 font-medium text-lg leading-relaxed">Hedefinize (maç takvimi, sınav tarihi veya genel fitness) uygun mikro ve makro döngülerden oluşan özel antrenman programınızı yazıyoruz.</p>
                </div>
              </div>
              <div className="flex">
                <div className="flex-shrink-0 mr-8">
                  <span className="w-14 h-14 rounded-full border-2 border-black flex items-center justify-center font-display font-black text-xl">3</span>
                </div>
                <div>
                  <h4 className="text-2xl font-bold mb-3">Saha Uygulaması & Takip</h4>
                  <p className="text-gray-600 font-medium text-lg leading-relaxed">Birebir takiplerle sahada teknik düzeltmeler yapıyor, gelişiminizi sürekli ölçerek programı güncelliyoruz.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="h-[750px] bg-gray-200 rounded-3xl overflow-hidden relative group shadow-xl">
            <img src="/performance.jpg" alt="Performans Koçluğu" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition duration-1000" />
          </div>
        </div>
      </section>

      {/* Baş Antrenör */}
      <section id="koc" className="py-32 bg-[#e5e5e5]/50 px-6 lg:px-12">
        <div className="max-w-screen-2xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="w-full aspect-[4/5] md:aspect-[3/4] bg-gray-300 rounded-3xl overflow-hidden relative shadow-xl group">
              <img src="/antrenör.jpg" alt="Antrenör Profil" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition duration-1000" />
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="pl-0 lg:pl-12">
              <span className="text-base font-bold tracking-widest uppercase mb-4 block text-gray-500">Kurucu & Baş Antrenör</span>
              <h2 className="text-5xl md:text-7xl font-display font-black mb-10 leading-none tracking-tighter">Abdusselam <br/>KARAHAN.</h2>
              <div className="space-y-6 text-black/80 font-medium text-xl leading-relaxed mb-12">
                <p>Burdur Mehmet Akif Ersoy Üniversitesi (MAKÜ) Beden Eğitimi ve Spor Öğretmenliği akademik altyapısı ile sahada geçen 10 yılı aşkın sporculuk kariyerini sentezleyen vizyoner bir yaklaşım.</p>
                <p>Klasik antrenman metotlarının ötesinde, atletizm branşının temel mekaniklerini tüm spor disiplinlerine entegre ediyoruz. 2. Kademe Temel Antrenörlük vizyonuyla, sporu bir hobi olmaktan çıkarıp Isparta'da elit performans yönetimine dönüştürüyoruz.</p>
              </div>
              <div className="flex flex-wrap gap-4">
                <span className="px-6 py-3 border-2 border-black/20 rounded-full text-sm font-bold uppercase tracking-wider bg-white">Beden Eğitimi Mezunu</span>
                <span className="px-6 py-3 border-2 border-black/20 rounded-full text-sm font-bold uppercase tracking-wider bg-white">2. Kademe Antrenör</span>
                <span className="px-6 py-3 border-2 border-black/20 rounded-full text-sm font-bold uppercase tracking-wider bg-white">10+ Yıl Kariyer</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Blog & Bilgi Bankası - GÜNCELLENMİŞ HALİ */}
      <section id="blog" className="py-24 bg-[#f9f9f9] px-6 lg:px-12 border-t border-black/5">
        <div className="max-w-screen-2xl mx-auto">
          <div className="mb-16 md:flex justify-between items-end border-b border-black/10 pb-8">
            <h2 className="text-4xl md:text-5xl font-display font-black tracking-tight">Bilgi Bankası.</h2>
            <Link href="/blog/sprint-mekanigi" className="text-black font-bold uppercase tracking-widest border-b border-black pb-1 hover:text-gray-500 transition-colors hidden md:block">
              Tüm Yazıları Gör
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Veriyi artık data dosyasından çekiyoruz */}
            {blogPosts.map((post, i) => (
              <Link href={`/blog/${post.id}`} key={i} className="group cursor-pointer block">
                <div className="w-full aspect-video bg-gray-200 rounded-xl overflow-hidden mb-6 relative">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition duration-500 z-10"></div>
                  <img src={post.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition duration-700" alt={post.title} />
                </div>
                <span className="text-sm font-bold tracking-widest text-gray-400 uppercase mb-3 block">{post.category}</span>
                <h3 className="text-2xl font-bold leading-snug group-hover:text-gray-600 transition-colors">{post.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SSS */}
      <section id="sss" className="py-24 px-6 lg:px-12 max-w-screen-md mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-black tracking-tight mb-4">Sıkça Sorulan Sorular</h2>
          <p className="text-gray-600 font-medium text-lg">Aklınızdaki soru işaretlerini başlamadan giderelim.</p>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-black/10 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full text-left p-6 bg-white hover:bg-gray-50 transition-colors flex justify-between items-center">
                <h3 className="text-xl font-bold pr-8">{faq.q}</h3>
                <Plus className={`w-6 h-6 flex-shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-45 text-gray-400' : 'text-black'}`} />
              </button>
              {openFaq === i && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="p-6 pt-0 bg-white">
                  <p className="text-gray-600 font-medium text-lg leading-relaxed border-t border-black/5 pt-4">{faq.a}</p>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Instagram Akışı */}
      <section className="bg-black pt-20 pb-20 border-t border-white/10">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-12 mb-12 flex justify-between items-end">
          <div>
            <h2 className="text-4xl md:text-5xl font-display font-black text-white mb-4">Saha Günlükleri.</h2>
            <p className="text-gray-400 font-medium text-lg">Günlük antrenman rutinlerimiz ve sahadan kareler.</p>
          </div>
          <a href="https://instagram.com/kineticperformans" target="_blank" rel="noreferrer" className="hidden md:flex items-center text-white/50 hover:text-white transition-colors font-bold uppercase tracking-widest text-sm border border-white/20 px-6 py-3 rounded-full hover:bg-white/10">
            <Instagram className="w-5 h-5 mr-3" /> Takip Et
          </a>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="aspect-square bg-gray-900 relative group overflow-hidden cursor-pointer">
              <img src={`/insta${item}.jpg`} alt="Instagram Gönderisi" className="w-full h-full object-cover grayscale opacity-60 group-hover:opacity-100 group-hover:scale-105 group-hover:grayscale-0 transition duration-700" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-500 bg-black/40 backdrop-blur-sm">
                <Instagram className="w-12 h-12 text-white" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* İletişim Formu */}
      <section id="iletisim" className="py-32 bg-[#050505] text-white px-6 lg:px-12 border-t border-white/5">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <h2 className="text-5xl md:text-7xl font-display font-black tracking-tighter mb-8 leading-[1.1]">
              HAYALLERİNİ<br/>MASADA BIRAKMA.
            </h2>
            <p className="text-gray-300 font-medium text-xl mb-12 leading-relaxed">
              Sana özel çalışma şartları, uygun saatler ve program fiyatlandırmaları hakkında görüşmek için hemen iletişim formunu doldur.
            </p>
            <div className="space-y-6 font-medium text-lg">
              <p className="border-b border-white/10 pb-4">📍 Isparta, Türkiye</p>
              <p className="border-b border-white/10 pb-4 flex items-center justify-between">
                <span>📞 +90 (533) 701 37 23</span>
              </p>
            </div>
          </div>

          <div className="bg-[#0f0f0f] p-12 rounded-3xl border border-white/10 shadow-2xl">
            <form action="https://formspree.io/f/xlgwbjdy" method="POST" className="space-y-10">
              <div>
                <label className="text-sm font-bold tracking-widest text-gray-500 uppercase mb-3 block">İsim Soyisim</label>
                <input type="text" name="isim" required className="w-full bg-transparent border-b-2 border-white/10 py-3 text-lg focus:outline-none focus:border-white/50 transition-colors text-white placeholder-gray-700" placeholder="Adınızı giriniz" />
              </div>
              
              <div className="relative">
                <label className="text-sm font-bold tracking-widest text-gray-500 uppercase mb-3 block">İlgilendiğiniz Program</label>
                <input type="hidden" name="program" value={selectedProgram} />
                <div 
                  className="w-full bg-transparent border-b-2 border-white/10 py-3 text-lg cursor-pointer flex justify-between items-center transition-colors hover:border-white/50"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <span className={selectedProgram === "Program Seçiniz" ? "text-gray-600" : "text-white"}>{selectedProgram}</span>
                  <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </div>
                {isDropdownOpen && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="absolute z-20 w-full mt-3 bg-[#111] border border-white/10 rounded-2xl shadow-2xl overflow-hidden divide-y divide-white/5">
                    {programs.map((prog, idx) => (
                      <div key={idx} className="px-6 py-4 hover:bg-[#222] cursor-pointer text-gray-400 hover:text-white transition-all duration-200 text-lg font-medium" onClick={() => { setSelectedProgram(prog); setIsDropdownOpen(false); }}>
                        {prog}
                      </div>
                    ))}
                  </motion.div>
                )}
              </div>

              <div>
                <label className="text-sm font-bold tracking-widest text-gray-500 uppercase mb-3 block">Mesajınız</label>
                <textarea name="mesaj" rows={4} className="w-full bg-transparent border-b-2 border-white/10 py-3 text-lg focus:outline-none focus:border-white/50 transition-colors text-white resize-none placeholder-gray-700" placeholder="Hedeflerinizden kısaca bahsedin..."></textarea>
              </div>
              <button type="submit" className="w-full bg-white text-black font-black uppercase tracking-widest text-lg py-5 rounded-full hover:bg-gray-300 hover:scale-[1.02] transition-all duration-300 mt-8 shadow-xl">
                Talebi Gönder
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="bg-[#0a0a0a] text-white py-8 border-t border-white/5 overflow-hidden flex whitespace-nowrap">
        <div className="animate-marquee text-5xl font-display font-black tracking-tighter uppercase opacity-50">
          KINETIC . BİLİM . GÜÇ . HIZ . KINETIC . BİLİM . GÜÇ . HIZ . KINETIC . BİLİM . GÜÇ . HIZ . KINETIC . BİLİM . GÜÇ . HIZ . 
        </div>
      </div>
      
      <footer className="bg-black py-10 text-center border-t border-white/5">
        <p className="text-gray-500 text-base font-medium">&copy; 2026 KINETIC Performans Yönetimi. Tüm hakları saklıdır.</p>
      </footer>

    </div>
  )
}