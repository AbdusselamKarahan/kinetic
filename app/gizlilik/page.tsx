import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gizlilik Politikası & KVKK Aydınlatma Metni',
  description: 'KINETIC Performans Yönetimi gizlilik politikası, kişisel verilerin işlenmesine ilişkin aydınlatma metni ve çerez kullanımı bilgilendirmesi.',
  alternates: { canonical: 'https://kineticperformans.com/gizlilik' },
}

export default function PrivacyPage() {
  return (
    <div
      className="min-h-screen font-sans"
      style={{ backgroundColor: 'var(--page-bg,#f9f9f9)', color: 'var(--page-text,#0a0a0a)' }}
    >
      {/* NAVBAR */}
      <header role="banner">
        <nav
          className="fixed top-0 w-full z-50 py-4 px-4 lg:px-12 flex justify-between items-center backdrop-blur-xl shadow-sm border-b"
          style={{ backgroundColor: 'var(--page-surface,rgba(255,255,255,0.92))', borderColor: 'var(--page-border,rgba(0,0,0,0.08))' }}
          aria-label="Sayfa navigasyonu"
        >
          <Link href="/" aria-label="KINETIC Ana Sayfa"
            className="text-xl font-display font-black tracking-tight hover:opacity-70 transition-opacity py-2 touch-manipulation"
            style={{ color: 'var(--page-text,#0a0a0a)' }}>
            K I N E T I C <span style={{ color: 'var(--page-text-muted,#6b7280)' }}>.</span>
          </Link>
          <Link href="/"
            className="group flex items-center px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest hover:opacity-80 transition-all shadow-lg touch-manipulation"
            style={{ background: 'var(--page-text,#0a0a0a)', color: 'var(--page-bg,#f9f9f9)', minHeight: 44 }}>
            <ArrowLeft className="w-3 h-3 mr-2 group-hover:-translate-x-1 transition-transform" aria-hidden="true" />
            Ana Sayfa
          </Link>
        </nav>
      </header>

      <main className="pt-32 md:pt-40 pb-24 px-4 lg:px-12 max-w-3xl mx-auto">
        <header className="mb-12 md:mb-16 border-b pb-10" style={{ borderColor: 'var(--page-border,rgba(0,0,0,0.08))' }}>
          <span className="text-xs font-bold tracking-[0.4em] uppercase mb-4 block"
            style={{ color: 'var(--page-text-muted,#6b7280)' }}>
            Yasal Metin
          </span>
          <h1 className="text-3xl md:text-5xl font-display font-black tracking-tighter mb-4 leading-[1.1]">
            Gizlilik Politikası &<br />KVKK Aydınlatma Metni
          </h1>
          <p className="text-sm md:text-base font-medium leading-relaxed"
            style={{ color: 'var(--page-text-muted,#6b7280)' }}>
            Son güncelleme: Şubat 2026 · Yürürlük tarihi: yayın tarihi itibarıyla
          </p>
        </header>

        <div className="prose prose-lg max-w-none space-y-12 leading-relaxed text-base md:text-lg"
          style={{ color: 'var(--page-text,#0a0a0a)' }}>

          <section>
            <h2 className="text-2xl md:text-3xl font-display font-black mb-4 tracking-tight">1. Veri Sorumlusu</h2>
            <p style={{ color: 'var(--page-text-muted,#374151)' }}>
              KINETIC Performans Yönetimi ("KINETIC", "biz") olarak 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK")
              ve 2016/679 sayılı AB Genel Veri Koruma Tüzüğü (GDPR) çerçevesinde veri sorumlusu sıfatıyla kişisel verilerinizi
              işlemekteyiz. Bu metin, hangi verileri ne amaçla işlediğimizi, ne kadar sakladığımızı ve haklarınızı şeffaf
              biçimde açıklar.
            </p>
            <p className="mt-4" style={{ color: 'var(--page-text-muted,#374151)' }}>
              <strong>İletişim:</strong> info@kineticperformans.com · +90 533 701 37 23
            </p>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-display font-black mb-4 tracking-tight">2. İşlenen Kişisel Veriler</h2>
            <p style={{ color: 'var(--page-text-muted,#374151)' }}>
              Site üzerinden ve hizmetlerimiz çerçevesinde aşağıdaki kişisel veri kategorileri işlenebilir:
            </p>
            <ul className="mt-4 space-y-3 list-disc pl-6" style={{ color: 'var(--page-text-muted,#374151)' }}>
              <li><strong>Kimlik verileri:</strong> Ad, soyad</li>
              <li><strong>İletişim verileri:</strong> E-posta adresi, telefon numarası</li>
              <li><strong>Müşteri işlem verileri:</strong> Talep ettiğiniz program, mesajınızın içeriği</li>
              <li><strong>İşlem güvenliği verileri:</strong> IP adresi, tarayıcı bilgisi, ziyaret tarih/saati (sunucu logları)</li>
              <li><strong>Pazarlama verileri:</strong> Onayınız doğrultusunda anonim ziyaret istatistikleri</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-display font-black mb-4 tracking-tight">3. İşleme Amaçları</h2>
            <p style={{ color: 'var(--page-text-muted,#374151)' }}>Verileriniz aşağıdaki amaçlarla işlenir:</p>
            <ul className="mt-4 space-y-3 list-disc pl-6" style={{ color: 'var(--page-text-muted,#374151)' }}>
              <li>İletişim taleplerinin yanıtlanması ve randevu organizasyonu</li>
              <li>Performans koçluğu hizmetlerinin yürütülmesi</li>
              <li>Yasal yükümlülüklerin yerine getirilmesi (vergi, kayıt vb.)</li>
              <li>Sitenin teknik olarak çalışması ve güvenliğinin sağlanması</li>
              <li>Açık rıza vermeniz halinde anonim analiz ve hizmet iyileştirme</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-display font-black mb-4 tracking-tight">4. İşlemenin Hukuki Sebebi</h2>
            <p style={{ color: 'var(--page-text-muted,#374151)' }}>
              KVKK madde 5 ve GDPR madde 6 kapsamında verileriniz; sözleşmenin kurulması veya ifası için gerekli olması,
              hukuki yükümlülüğün yerine getirilmesi, meşru menfaat veya açık rızanız hukuki sebeplerine dayanılarak işlenir.
            </p>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-display font-black mb-4 tracking-tight">5. Veri Saklama Süreleri</h2>
            <ul className="mt-2 space-y-3 list-disc pl-6" style={{ color: 'var(--page-text-muted,#374151)' }}>
              <li>İletişim formundan gelen veriler: en fazla <strong>2 yıl</strong> (yanıt verilmezse 6 ay)</li>
              <li>Sözleşmeli müşteri kayıtları: yasal yükümlülükler süresince (Vergi Usul Kanunu uyarınca asgari 5 yıl)</li>
              <li>Sunucu logları: <strong>180 gün</strong></li>
              <li>Çerezler: aşağıdaki Çerez Politikası'na göre değişkendir</li>
            </ul>
            <p className="mt-4" style={{ color: 'var(--page-text-muted,#374151)' }}>
              Süre sonunda veriler güvenli biçimde silinir, yok edilir veya anonimleştirilir.
            </p>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-display font-black mb-4 tracking-tight">6. Üçüncü Taraflarla Paylaşım</h2>
            <p style={{ color: 'var(--page-text-muted,#374151)' }}>
              Kişisel verileriniz açık rızanız olmadan üçüncü kişilere satılmaz. Aşağıdaki teknik hizmet sağlayıcılarla
              hizmetin yürütülmesi amacıyla sınırlı kalmak üzere paylaşılabilir:
            </p>
            <ul className="mt-4 space-y-3 list-disc pl-6" style={{ color: 'var(--page-text-muted,#374151)' }}>
              <li><strong>Vercel</strong> (hosting altyapısı) — verileriniz AB ve ABD bölgelerindeki sunucularda işlenebilir</li>
              <li><strong>Formspree</strong> (iletişim formu) — yalnızca form gönderimi anında, mesaj içeriği ve iletişim bilgisi</li>
              <li><strong>Google Analytics</strong> ve <strong>Microsoft Clarity</strong> — yalnızca açık rıza verilirse, anonimleştirilmiş davranış verisi</li>
              <li>Yasal merciler — mahkeme kararı veya ilgili kanunlar gereği</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-display font-black mb-4 tracking-tight">7. KVKK Madde 11 — Haklarınız</h2>
            <p style={{ color: 'var(--page-text-muted,#374151)' }}>Veri sahibi olarak aşağıdaki haklara sahipsiniz:</p>
            <ul className="mt-4 space-y-3 list-disc pl-6" style={{ color: 'var(--page-text-muted,#374151)' }}>
              <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
              <li>İşlenmişse buna ilişkin bilgi talep etme</li>
              <li>İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme</li>
              <li>Yurt içinde / yurt dışında aktarıldığı üçüncü kişileri bilme</li>
              <li>Eksik veya yanlış işlenmişse düzeltilmesini isteme</li>
              <li>KVKK'nın öngördüğü şartlar çerçevesinde silinmesini veya yok edilmesini isteme</li>
              <li>Yapılan işlemlerin aktarıldığı üçüncü kişilere bildirilmesini talep etme</li>
              <li>Otomatik sistemlerce analiz edilerek aleyhinize bir sonuç çıkmasına itiraz etme</li>
              <li>Kanuna aykırı işleme nedeniyle zarara uğramışsanız tazminat talep etme</li>
            </ul>
            <p className="mt-4" style={{ color: 'var(--page-text-muted,#374151)' }}>
              Bu haklarınızı kullanmak için <strong>info@kineticperformans.com</strong> adresine yazılı başvuruda
              bulunabilirsiniz. Başvurunuz en geç 30 gün içinde ücretsiz olarak yanıtlanır.
            </p>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-display font-black mb-4 tracking-tight">8. Çerez Politikası</h2>
            <p style={{ color: 'var(--page-text-muted,#374151)' }}>
              Sitemizde üç tür çerez kullanılabilir:
            </p>
            <ul className="mt-4 space-y-3 list-disc pl-6" style={{ color: 'var(--page-text-muted,#374151)' }}>
              <li><strong>Zorunlu çerezler:</strong> Sitenin temel çalışması, dil ve tema tercihinizin hatırlanması için gereklidir. Açık rıza gerektirmez.</li>
              <li><strong>Analiz çerezleri:</strong> Anonim ziyaret istatistikleri (Google Analytics). Yalnızca açık rıza verirseniz yüklenir.</li>
              <li><strong>Pazarlama çerezleri:</strong> Davranışsal reklamcılık. Şu an aktif değildir.</li>
            </ul>
            <p className="mt-4" style={{ color: 'var(--page-text-muted,#374151)' }}>
              Tercihlerinizi siteyi ilk ziyaret ettiğinizde gösterilen çerez bildirimi üzerinden yönetebilirsiniz.
              Tarayıcınızdan da çerezleri her zaman silebilir veya engelleyebilirsiniz.
            </p>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-display font-black mb-4 tracking-tight">9. Veri Güvenliği</h2>
            <p style={{ color: 'var(--page-text-muted,#374151)' }}>
              Verilerinizin güvenliği için TLS/SSL şifreleme, erişim yetkilendirmesi ve düzenli güvenlik
              güncellemeleri uyguluyoruz. Bir veri ihlali tespit edildiğinde KVKK madde 12 uyarınca 72 saat içinde
              sizi ve Kişisel Verileri Koruma Kurumu'nu bilgilendiririz.
            </p>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-display font-black mb-4 tracking-tight">10. Politika Güncellemeleri</h2>
            <p style={{ color: 'var(--page-text-muted,#374151)' }}>
              Bu metin yasal değişiklikler veya hizmet kapsamında değişiklik durumunda güncellenebilir. Önemli
              değişiklikler size e-posta ile veya sitemiz üzerinden duyurulur. Son güncelleme tarihi sayfanın
              en üstündedir.
            </p>
          </section>

          <section className="border-t pt-10 mt-12" style={{ borderColor: 'var(--page-border,rgba(0,0,0,0.08))' }}>
            <h2 className="text-2xl md:text-3xl font-display font-black mb-4 tracking-tight">İletişim</h2>
            <p style={{ color: 'var(--page-text-muted,#374151)' }}>
              Bu metin veya kişisel verilerinizle ilgili her türlü sorunuz için bize ulaşabilirsiniz:
            </p>
            <ul className="mt-4 space-y-2 list-none" style={{ color: 'var(--page-text-muted,#374151)' }}>
              <li><strong>E-posta:</strong> <a className="underline hover:opacity-70" href="mailto:info@kineticperformans.com">info@kineticperformans.com</a></li>
              <li><strong>Telefon:</strong> <a className="underline hover:opacity-70" href="tel:+905337013723">+90 533 701 37 23</a></li>
            </ul>
          </section>
        </div>
      </main>

      <footer className="bg-black py-10 text-center border-t border-white/5" role="contentinfo">
        <p className="text-gray-500 text-sm font-medium">&copy; 2026 KINETIC Performans Yönetimi.</p>
      </footer>
    </div>
  )
}
