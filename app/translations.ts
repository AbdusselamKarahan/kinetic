export type Lang = 'tr' | 'en'

export const translations = {
  tr: {
    nav: {
      programs: 'Programlar', stories: 'Başarılar', trainer: 'Antrenör', blog: 'Blog',
      cta: 'Hemen Başla', whatsapp: "WhatsApp'tan Yaz", reachMe: 'Bana Ulaşın',
      menuOpen: 'Menüyü aç', menuClose: 'Menüyü kapat',
    },
    hero: {
      tag: 'Elite Performans', line1: 'Potansiyelini', line2: 'Özgür Bırak',
      desc: 'Sıradan antrenmanları unutun. Atletizm temelli bilimsel metotlarla gücünüzü, hızınızı ve dayanıklılığınızı yeniden inşa ediyoruz.',
      cta: 'Analiz Randevusu',
      imgAlt: 'KINETIC atletizm sahası – sprint antrenmanı',
    },
    video: { title: 'Mazeret Yok. Sadece Sonuç.', desc: 'Saha uygulamalarımızın yoğunluğunu ve disiplinini hisset.' },
    programs: {
      title: 'Uzmanlık Alanlarımız.', subtitle: 'Hangi hedefe koşarsanız koşun, ona ulaşmak için bilimsel bir yol haritamız var.',
      items: [
        { num:'01', tag:'Elite Segment', title:'Birebir Performans\nKoçluğu', desc:'Amatör veya profesyonel sporcular için maksimum hız, patlayıcı güç ve branşa özgü kondisyon yüklemeleri.', cta:'Detayları Konuşalım', featured:false },
        { num:'02', tag:'Hazırlık Sınıfı', title:'BESYO & POMEM\nParkur Eğitimi', desc:'Saniyelerin hayat değiştirdiği sınavlar için taktiksel driller, sıçrama mekaniği ve hata sıfırlama çalışmaları.', cta:'Kontenjan Sor', featured:true },
        { num:'03', tag:'Kurumsal Segment', title:'Seminer & Takım\nÖlçümleri', desc:'Kulüpler ve okullar için antrenman bilimi seminerleri, fiziksel uygunluk testleri ve takım taramaları.', cta:'Teklif Al', featured:false },
      ],
    },
    reviews: {
      title: 'Saha Yalan Söylemez.', subtitle: 'Bizimle çalışıp hedeflerine ulaşan sporcularımızın sahici deneyimleri.',
      items: [
        { text:'POMEM parkurunda 3 saniye takılı kalmıştım. Patlayıcı güç antrenmanları sayesinde sınavı dereceyle geçtim. Sadece bir koç değil, aynı zamanda harika bir mentör.', author:'Ahmet Y.', title:'POMEM Adayı', offset:'md:mt-0' },
        { text:'Amatör futbolcuyum, hızlanma problemim vardı. Atletizm temelli sprint mekaniği çalıştıktan sonra sahadaki ilk adımlarım inanılmaz değişti.', author:'Burak C.', title:'Futbolcu', offset:'md:mt-16' },
        { text:'Antrenman programları çok detaylı. Her idmanda neden o hareketi yaptığımızı bilmek, gelişimi hissetmek paha biçilemez. Kariyerimde yeni bir sayfa açtım.', author:'Selin K.', title:'Performans Sporcusu', offset:'md:-mt-8' },
      ],
    },
    process: {
      title: 'Başarı Tesadüf Değildir, Bir Algoritmadır.',
      subtitle: 'Ezbere antrenman yazmıyoruz. Her sporcunun biyomekaniği bir parmak izi gibi benzersizdir.',
      steps: [
        { n:'1', title:'Test ve Analiz', desc:'Mevcut fiziksel kapasitenizi, asimetrilerinizi ve zayıf halkalarınızı bilimsel testlerle (kuvvet, mobilite, hız) haritalandırıyoruz.', filled:false },
        { n:'2', title:'Periyotlama (Planlama)', desc:'Hedefinize (maç takvimi, sınav tarihi veya genel fitness) uygun mikro ve makro döngülerden oluşan özel antrenman programınızı yazıyoruz.', filled:true },
        { n:'3', title:'Saha Uygulaması & Takip', desc:'Birebir takiplerle sahada teknik düzeltmeler yapıyor, gelişiminizi sürekli ölçerek programı güncelliyoruz.', filled:false },
      ],
      imgAlt: 'KINETIC koçluk sürecinde performans analizi yapılıyor',
    },
    trainer: {
      role: 'Kurucu & Baş Antrenör',
      name: 'Abdusselam\nKARAHAN.',
      bio1: "Burdur Mehmet Akif Ersoy Üniversitesi (MAKÜ) Beden Eğitimi ve Spor Öğretmenliği akademik altyapısı ile sahada geçen 10 yılı aşkın sporculuk kariyerini sentezleyen vizyoner bir yaklaşım.",
      bio2: "Klasik antrenman metotlarının ötesinde, atletizm branşının temel mekaniklerini tüm spor disiplinlerine entegre ediyoruz. 2. Kademe Temel Antrenörlük vizyonuyla, sporu bir hobi olmaktan çıkarıp elit performans yönetimine dönüştürüyoruz.",
      badges: ['Beden Eğitimi Mezunu', '2. Kademe Antrenör', '10+ Yıl Kariyer'],
      imgAlt: 'Abdusselam Karahan – KINETIC Performans Baş Antrenörü ve Kurucusu',
    },
    blog: { title: 'Bilgi Bankası.', seeAll: 'Tüm Yazıları Gör' },
    faq: {
      title: 'Sıkça Sorulan Sorular', subtitle: 'Aklınızdaki soru işaretlerini başlamadan giderelim.',
      items: [
        { q:'Sadece profesyonel sporcularla mı çalışıyorsunuz?', a:'Hayır. Spora yeni başlayan, sağlıklı bir yaşama adım atmak isteyen veya BESYO/POMEM gibi özel parkur sınavlarına hazırlanan herkesle, seviyelerine uygun şekilde çalışıyoruz.' },
        { q:'Antrenmanlar nerede yapılıyor?', a:"Programın türüne göre uygun atletizm pistlerinde, parklarda veya anlaşmalı spor tesislerinde saha uygulamalarımızı gerçekleştiriyoruz." },
        { q:'Beslenme programı yazıyor musunuz?', a:'Performans koçluğu antrenman bilimine odaklanır. Beslenme konusunda genel stratejik tavsiyeler vermekle birlikte, klinik diyet programları için uzman diyetisyenlerle ortaklaşa ilerlemeyi tercih ediyoruz.' },
      ],
    },
    instagram: { title: 'Saha Günlükleri.', subtitle: 'Günlük antrenman rutinlerimiz ve sahadan kareler.', follow: 'Takip Et', followLabel: "Instagram'da KINETIC Performans'ı takip et" },
    contact: {
      title: 'HAYALLERİNİ\nMASADA BIRAKMA.',
      subtitle: 'Sana özel çalışma şartları, uygun saatler ve program fiyatlandırmaları hakkında görüşmek için hemen iletişim formunu doldur.',
      location: 'Türkiye',
      nameLabel: 'İsim Soyisim', namePlaceholder: 'Adınızı giriniz',
      programLabel: 'İlgilendiğiniz Program', programDefault: 'Program Seçiniz',
      programs: ['Birebir Performans Koçluğu', 'BESYO/POMEM Sınav Hazırlığı', 'Takım/Grup Eğitimleri', 'Diğer'],
      messageLabel: 'Mesajınız', messagePlaceholder: 'Hedeflerinizden kısaca bahsedin...',
      submit: 'Talebi Gönder',
    },
    marquee: 'KINETIC . BİLİM . GÜÇ . HIZ . KINETIC . BİLİM . GÜÇ . HIZ . KINETIC . BİLİM . GÜÇ . HIZ . KINETIC . BİLİM . GÜÇ . HIZ . ',
    footer: '© 2026 KINETIC Performans Yönetimi. Tüm hakları saklıdır.',
    scrollTop: 'Yukarı çık',
  },
  en: {
    nav: {
      programs: 'Programs', stories: 'Success Stories', trainer: 'Trainer', blog: 'Blog',
      cta: 'Get Started', whatsapp: 'Text on WhatsApp', reachMe: 'Reach Me',
      menuOpen: 'Open menu', menuClose: 'Close menu',
    },
    hero: {
      tag: 'Elite Performance', line1: 'Unleash Your', line2: 'Potential.',
      desc: 'Forget ordinary training. We rebuild your strength, speed and endurance through athletics-based, science-driven methods.',
      cta: 'Book Analysis',
      imgAlt: 'KINETIC athletics field – sprint training session',
    },
    video: { title: 'No Excuses. Just Results.', desc: 'Feel the intensity and discipline of our field sessions.' },
    programs: {
      title: 'Our Expertise.', subtitle: 'Whatever goal you are chasing, we have a science-backed roadmap to get you there.',
      items: [
        { num:'01', tag:'Elite Segment', title:'1-on-1 Performance\nCoaching', desc:'Maximum speed, explosive power and sport-specific conditioning for amateur and professional athletes.', cta:"Let's Talk", featured:false },
        { num:'02', tag:'Exam Prep', title:'BESYO & POMEM\nObstacle Training', desc:'Tactical drills, jump mechanics and error-elimination work for exams where seconds change your life.', cta:'Check Availability', featured:true },
        { num:'03', tag:'Corporate Segment', title:'Seminars &\nTeam Assessments', desc:'Training-science seminars, physical fitness tests and team screenings for clubs and schools.', cta:'Get a Quote', featured:false },
      ],
    },
    reviews: {
      title: "The Field Doesn't Lie.", subtitle: 'Genuine experiences from our athletes who reached their goals.',
      items: [
        { text:"I was stuck 3 seconds behind on the POMEM obstacle. Thanks to explosive power training, I passed the exam with top scores. Not just a coach — a great mentor.", author:'Ahmet Y.', title:'POMEM Candidate', offset:'md:mt-0' },
        { text:"I'm an amateur footballer with an acceleration problem. After working on sprint mechanics, my first steps on the field changed dramatically.", author:'Burak C.', title:'Footballer', offset:'md:mt-16' },
        { text:'The programs are incredibly detailed. Knowing why you do each movement and feeling the progress is priceless. I opened a new chapter in my career.', author:'Selin K.', title:'Performance Athlete', offset:'md:-mt-8' },
      ],
    },
    process: {
      title: "Success Is Not Coincidence. It's an Algorithm.",
      subtitle: "We don't write generic programs. Every athlete's biomechanics are as unique as a fingerprint.",
      steps: [
        { n:'1', title:'Test & Analysis', desc:'We map your current physical capacity, asymmetries and weak links using scientific tests (strength, mobility, speed).', filled:false },
        { n:'2', title:'Periodization (Planning)', desc:'We write a custom program with micro and macro cycles aligned to your goal — match schedule, exam date or general fitness.', filled:true },
        { n:'3', title:'Field Application & Follow-up', desc:'We make technical corrections during field sessions and continuously update the program by measuring your progress.', filled:false },
      ],
      imgAlt: 'Performance analysis during KINETIC coaching session',
    },
    trainer: {
      role: 'Founder & Head Coach',
      name: 'Abdusselam\nKARAHAN.',
      bio1: "A visionary approach synthesizing an academic background from Burdur Mehmet Akif Ersoy University's Physical Education department with over 10 years of competitive athletic career.",
      bio2: "Beyond classic methods, we integrate the core mechanics of athletics into all sports disciplines. With a Level 2 Coaching vision, we transform sport into elite performance management.",
      badges: ['Physical Education Graduate', 'Level 2 Coach', '10+ Year Career'],
      imgAlt: 'Abdusselam Karahan – KINETIC Performance Head Coach and Founder',
    },
    blog: { title: 'Knowledge Base.', seeAll: 'See All Posts' },
    faq: {
      title: 'Frequently Asked Questions', subtitle: "Let's clear up any doubts before you start.",
      items: [
        { q:'Do you only work with professional athletes?', a:'No. We work with everyone — beginners, those seeking a healthier lifestyle, or candidates preparing for specific fitness exams like BESYO/POMEM — at a level suitable for them.' },
        { q:'Where do sessions take place?', a:'Depending on the program, we conduct sessions on suitable athletics tracks, parks, or partner sports facilities.' },
        { q:'Do you write nutrition programs?', a:'Performance coaching focuses on training science. We provide general nutritional strategy advice, but prefer to partner with specialist dietitians for clinical dietary programs.' },
      ],
    },
    instagram: { title: 'Field Journals.', subtitle: 'Daily training routines and moments from the field.', follow: 'Follow', followLabel: 'Follow KINETIC Performance on Instagram' },
    contact: {
      title: "DON'T LEAVE YOUR\nDREAMS ON THE TABLE.",
      subtitle: 'Fill out the contact form to discuss tailored terms, available schedules, and program pricing.',
      location: 'Turkey',
      nameLabel: 'Full Name', namePlaceholder: 'Enter your name',
      programLabel: 'Program of Interest', programDefault: 'Select a Program',
      programs: ['1-on-1 Performance Coaching', 'BESYO/POMEM Exam Prep', 'Team/Group Training', 'Other'],
      messageLabel: 'Your Message', messagePlaceholder: 'Briefly describe your goals...',
      submit: 'Send Request',
    },
    marquee: 'KINETIC . SCIENCE . POWER . SPEED . KINETIC . SCIENCE . POWER . SPEED . KINETIC . SCIENCE . POWER . SPEED . KINETIC . SCIENCE . POWER . SPEED . ',
    footer: '© 2026 KINETIC Performance Management. All rights reserved.',
    scrollTop: 'Scroll to top',
  },
} as const

export type T = typeof translations.tr

// ── İSTATİSTİKLER (stats section) ──────────────────────────────────
export const statsData = {
  tr: {
    heading: 'Rakamlar Yalan Söylemez.',
    sub: 'Saha içindeki performansımızı sayılarla kanıtlıyoruz.',
    items: [
      { value: '120+', label: 'Aktif Sporcu',       desc: '3 yılda yetiştirilen sporcu sayısı'  },
      { value: '%94',  label: 'Hedef Başarısı',     desc: 'Sporcuların hedefine ulaşma oranı'   },
      { value: '10+',  label: 'Yıl Sahada',         desc: 'Toplam profesyonel kariyer süresi'   },
      { value: '3.2s', label: 'Ortalama Gelişim',   desc: '60m sprint süresinde ortalama düşüş' },
    ],
  },
  en: {
    heading: "Numbers Don't Lie.",
    sub: 'We prove our on-field performance with data.',
    items: [
      { value: '120+', label: 'Active Athletes',    desc: 'Athletes trained over 3 years'          },
      { value: '94%',  label: 'Goal Achievement',   desc: 'Athletes who reached their target'      },
      { value: '10+',  label: 'Years on the Field', desc: 'Total professional career'              },
      { value: '3.2s', label: 'Avg. Improvement',   desc: 'Average drop in 60m sprint time'       },
    ],
  },
}
