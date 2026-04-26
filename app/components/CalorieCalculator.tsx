'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Activity, Flame, Droplet } from 'lucide-react'
import type { Lang } from '../translations'

const copy = {
  tr: {
    heading: 'Günlük Kalori & Makro Hesaplayıcı',
    sub: 'Mifflin-St Jeor formülüyle bilimsel temelli günlük kalori ve makro besin ihtiyacınızı hesaplayın.',
    weight: 'Kilo (kg)',
    height: 'Boy (cm)',
    age: 'Yaş',
    gender: 'Cinsiyet',
    male: 'Erkek',
    female: 'Kadın',
    activity: 'Aktivite Seviyesi',
    activityLevels: [
      { v: 1.2,   label: 'Hareketsiz', desc: 'Masa başı, az/hiç egzersiz' },
      { v: 1.375, label: 'Az aktif',   desc: 'Haftada 1-3 gün hafif egzersiz' },
      { v: 1.55,  label: 'Orta aktif', desc: 'Haftada 3-5 gün egzersiz' },
      { v: 1.725, label: 'Çok aktif',  desc: 'Haftada 6-7 gün yoğun egzersiz' },
      { v: 1.9,   label: 'Aşırı aktif', desc: 'Günde 2 antrenman / fiziksel iş' },
    ],
    bmr: 'Bazal Metabolizma',
    bmrDesc: 'Hiçbir şey yapmasanız bile yaktığınız enerji',
    tdee: 'Günlük Kalori',
    tdeeDesc: 'Aktivite seviyesi ile birlikte toplam ihtiyaç',
    protein: 'Protein',
    proteinDesc: '1.8 g/kg — atletik aktivite için',
    carbs: 'Karbonhidrat',
    carbsDesc: 'Kalan enerjinin ana kaynağı',
    fat: 'Yağ',
    fatDesc: 'Toplam kalorinin %25\'i',
    water: 'Su',
    waterDesc: 'Vücut ağırlığının her kg\'ı için 35 ml',
    note: 'Bu değerler genel rehber niteliğindedir; bireysel beslenme planı için lütfen bir diyetisyene danışın.',
  },
  en: {
    heading: 'Daily Calorie & Macro Calculator',
    sub: 'Calculate your science-backed daily calorie and macronutrient needs using the Mifflin-St Jeor formula.',
    weight: 'Weight (kg)',
    height: 'Height (cm)',
    age: 'Age',
    gender: 'Gender',
    male: 'Male',
    female: 'Female',
    activity: 'Activity Level',
    activityLevels: [
      { v: 1.2,   label: 'Sedentary',  desc: 'Desk job, little/no exercise' },
      { v: 1.375, label: 'Light',      desc: '1-3 days/week light exercise' },
      { v: 1.55,  label: 'Moderate',   desc: '3-5 days/week exercise' },
      { v: 1.725, label: 'Very active', desc: '6-7 days/week intense exercise' },
      { v: 1.9,   label: 'Extra active', desc: '2x daily training / physical job' },
    ],
    bmr: 'Basal Metabolism',
    bmrDesc: 'Energy you burn even at complete rest',
    tdee: 'Daily Calories',
    tdeeDesc: 'Total need including activity level',
    protein: 'Protein',
    proteinDesc: '1.8 g/kg — for athletic activity',
    carbs: 'Carbohydrate',
    carbsDesc: 'Main source of remaining energy',
    fat: 'Fat',
    fatDesc: '25% of total calories',
    water: 'Water',
    waterDesc: '35 ml per kg of body weight',
    note: 'These values are general guidance; please consult a dietitian for a personalized nutrition plan.',
  },
}

export default function CalorieCalculator({
  lang,
  bg,
  surf,
  clr,
  muted,
  bord,
  isDark,
}: {
  lang: Lang
  bg: string
  surf: string
  clr: string
  muted: string
  bord: string
  isDark: boolean
}) {
  const t = copy[lang]
  const [weight, setWeight]     = useState(70)
  const [height, setHeight]     = useState(175)
  const [age, setAge]           = useState(25)
  const [gender, setGender]     = useState<'m' | 'f'>('m')
  const [activity, setActivity] = useState(1.55)

  const result = useMemo(() => {
    const bmr = gender === 'm'
      ? 10 * weight + 6.25 * height - 5 * age + 5
      : 10 * weight + 6.25 * height - 5 * age - 161
    const tdee = bmr * activity
    const proteinG = weight * 1.8                       // g/day
    const fatG     = (tdee * 0.25) / 9                   // g/day (9 kcal/g)
    const carbsG   = (tdee - proteinG * 4 - fatG * 9) / 4 // g/day (4 kcal/g)
    const waterL   = (weight * 35) / 1000                // L/day
    return {
      bmr:     Math.round(bmr),
      tdee:    Math.round(tdee),
      protein: Math.round(proteinG),
      fat:     Math.round(fatG),
      carbs:   Math.max(0, Math.round(carbsG)),
      water:   Math.round(waterL * 10) / 10,
    }
  }, [weight, height, age, activity, gender])

  // Macro yüzdeleri (görselleştirme için)
  const macroPct = useMemo(() => {
    const proteinKcal = result.protein * 4
    const fatKcal     = result.fat * 9
    const carbsKcal   = result.carbs * 4
    const total       = proteinKcal + fatKcal + carbsKcal || 1
    return {
      p: Math.round((proteinKcal / total) * 100),
      c: Math.round((carbsKcal / total)   * 100),
      f: Math.round((fatKcal / total)     * 100),
    }
  }, [result])

  return (
    <section
      id="hesaplayici"
      aria-label={t.heading}
      className="py-20 md:py-28 px-4 lg:px-12 border-t"
      style={{ background: bg, borderColor: bord }}
    >
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-12 md:mb-16">
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-bold uppercase tracking-widest mb-5"
            style={{ borderColor: bord, color: muted, background: surf }}
          >
            <Flame className="w-3 h-3" aria-hidden="true" />
            {lang === 'tr' ? 'Bilimsel Hesap' : 'Science-backed'}
          </span>
          <h2
            className="text-3xl md:text-5xl font-display font-black tracking-tight mb-4"
            style={{ color: clr }}
          >
            {t.heading}
          </h2>
          <p className="text-base md:text-lg font-medium max-w-2xl mx-auto" style={{ color: muted }}>
            {t.sub}
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* INPUTS */}
          <div
            className="rounded-3xl p-6 md:p-10 border space-y-7"
            style={{ background: surf, borderColor: bord }}
          >
            {/* Cinsiyet */}
            <div>
              <label className="text-xs font-bold tracking-widest uppercase mb-3 block" style={{ color: muted }}>
                {t.gender}
              </label>
              <div className="grid grid-cols-2 gap-2 rounded-full border p-1" style={{ borderColor: bord }}>
                {(['m', 'f'] as const).map(g => (
                  <button
                    key={g}
                    onClick={() => setGender(g)}
                    className="py-2.5 rounded-full text-sm font-black uppercase tracking-wider transition-all touch-manipulation"
                    style={{
                      background: gender === g ? clr : 'transparent',
                      color:      gender === g ? bg  : muted,
                    }}
                    aria-pressed={gender === g}
                  >
                    {g === 'm' ? t.male : t.female}
                  </button>
                ))}
              </div>
            </div>

            {/* Kilo */}
            <RangeRow
              label={t.weight}
              value={weight}
              onChange={setWeight}
              min={40}
              max={150}
              step={1}
              unit="kg"
              clr={clr}
              muted={muted}
              bord={bord}
            />

            {/* Boy */}
            <RangeRow
              label={t.height}
              value={height}
              onChange={setHeight}
              min={140}
              max={210}
              step={1}
              unit="cm"
              clr={clr}
              muted={muted}
              bord={bord}
            />

            {/* Yaş */}
            <RangeRow
              label={t.age}
              value={age}
              onChange={setAge}
              min={15}
              max={75}
              step={1}
              unit=""
              clr={clr}
              muted={muted}
              bord={bord}
            />

            {/* Aktivite */}
            <div>
              <label className="text-xs font-bold tracking-widest uppercase mb-3 block" style={{ color: muted }}>
                {t.activity}
              </label>
              <div className="space-y-2">
                {t.activityLevels.map(level => (
                  <button
                    key={level.v}
                    onClick={() => setActivity(level.v)}
                    className="w-full text-left p-3 md:p-4 rounded-xl border transition-all touch-manipulation"
                    style={{
                      borderColor: activity === level.v ? clr : bord,
                      background:  activity === level.v ? (isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)') : 'transparent',
                    }}
                    aria-pressed={activity === level.v}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex-1">
                        <div className="text-sm font-black tracking-wide" style={{ color: clr }}>{level.label}</div>
                        <div className="text-xs mt-0.5" style={{ color: muted }}>{level.desc}</div>
                      </div>
                      <div
                        className="w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center"
                        style={{ borderColor: activity === level.v ? clr : bord }}
                        aria-hidden="true"
                      >
                        {activity === level.v && (
                          <div className="w-2.5 h-2.5 rounded-full" style={{ background: clr }} />
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* RESULTS */}
          <div className="space-y-5">
            {/* TDEE — büyük kart */}
            <motion.div
              key={result.tdee}
              initial={{ scale: 0.96, opacity: 0.6 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-3xl p-6 md:p-10 border shadow-xl"
              style={{ background: clr, color: bg, borderColor: bord }}
            >
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.3em] opacity-60 mb-3">
                <Activity className="w-3 h-3" aria-hidden="true" />
                {t.tdee}
              </div>
              <div className="text-5xl md:text-7xl font-display font-black tabular-nums leading-none mb-2">
                {result.tdee.toLocaleString('tr-TR')}
              </div>
              <div className="text-sm md:text-base font-medium opacity-80">kcal · {t.tdeeDesc}</div>
              <div className="mt-5 pt-5 border-t opacity-60 text-xs md:text-sm font-medium" style={{ borderColor: 'currentColor' }}>
                {t.bmr}: <span className="font-black tabular-nums">{result.bmr.toLocaleString('tr-TR')}</span> kcal · {t.bmrDesc}
              </div>
            </motion.div>

            {/* Macros */}
            <div
              className="rounded-3xl p-6 md:p-8 border"
              style={{ background: surf, borderColor: bord }}
            >
              {/* Macro bar */}
              <div className="flex h-2 rounded-full overflow-hidden mb-5" style={{ background: bord }}>
                <div style={{ width: `${macroPct.p}%`, background: '#ef4444' }} title={`Protein ${macroPct.p}%`} />
                <div style={{ width: `${macroPct.c}%`, background: '#3b82f6' }} title={`Karbonhidrat ${macroPct.c}%`} />
                <div style={{ width: `${macroPct.f}%`, background: '#f59e0b' }} title={`Yağ ${macroPct.f}%`} />
              </div>

              <div className="grid grid-cols-3 gap-3 md:gap-4">
                <MacroBox label={t.protein} value={result.protein} unit="g" pct={macroPct.p} color="#ef4444" clr={clr} muted={muted} desc={t.proteinDesc} />
                <MacroBox label={t.carbs}   value={result.carbs}   unit="g" pct={macroPct.c} color="#3b82f6" clr={clr} muted={muted} desc={t.carbsDesc} />
                <MacroBox label={t.fat}     value={result.fat}     unit="g" pct={macroPct.f} color="#f59e0b" clr={clr} muted={muted} desc={t.fatDesc} />
              </div>
            </div>

            {/* Su */}
            <div
              className="rounded-3xl p-6 md:p-8 border flex items-center gap-5"
              style={{ background: surf, borderColor: bord }}
            >
              <div
                className="w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(59,130,246,0.12)', color: '#3b82f6' }}
                aria-hidden="true"
              >
                <Droplet className="w-6 h-6 md:w-7 md:h-7" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-black uppercase tracking-widest mb-1" style={{ color: muted }}>
                  {t.water}
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl md:text-4xl font-display font-black tabular-nums" style={{ color: clr }}>
                    {result.water.toLocaleString('tr-TR')}
                  </span>
                  <span className="text-sm font-medium" style={{ color: muted }}>L · {t.waterDesc}</span>
                </div>
              </div>
            </div>

            <p className="text-xs md:text-sm font-medium leading-relaxed text-center px-2" style={{ color: muted }}>
              {t.note}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Reusable range input row ─────────────────────────────────── */
function RangeRow({
  label, value, onChange, min, max, step, unit, clr, muted, bord,
}: {
  label: string
  value: number
  onChange: (v: number) => void
  min: number
  max: number
  step: number
  unit: string
  clr: string
  muted: string
  bord: string
}) {
  const pct = ((value - min) / (max - min)) * 100
  return (
    <div>
      <div className="flex justify-between items-baseline mb-2">
        <label className="text-xs font-bold tracking-widest uppercase" style={{ color: muted }}>{label}</label>
        <span className="text-2xl font-display font-black tabular-nums" style={{ color: clr }}>
          {value}<span className="text-sm font-medium ml-1" style={{ color: muted }}>{unit}</span>
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        aria-label={label}
        className="w-full h-2 rounded-full appearance-none cursor-pointer touch-manipulation"
        style={{
          background: `linear-gradient(to right, ${clr} 0%, ${clr} ${pct}%, ${bord} ${pct}%, ${bord} 100%)`,
        }}
      />
    </div>
  )
}

function MacroBox({
  label, value, unit, pct, color, clr, muted, desc,
}: {
  label: string
  value: number
  unit: string
  pct: number
  color: string
  clr: string
  muted: string
  desc: string
}) {
  return (
    <div className="text-center">
      <div className="w-2 h-2 rounded-full mx-auto mb-2" style={{ background: color }} aria-hidden="true" />
      <div className="text-xs font-black uppercase tracking-widest mb-1" style={{ color: muted }}>{label}</div>
      <div className="text-2xl md:text-3xl font-display font-black tabular-nums leading-none mb-1" style={{ color: clr }}>
        {value}<span className="text-sm font-medium ml-0.5" style={{ color: muted }}>{unit}</span>
      </div>
      <div className="text-[10px] font-medium tabular-nums" style={{ color: muted }}>%{pct}</div>
      <div className="text-[10px] mt-1.5 leading-tight hidden md:block" style={{ color: muted }}>{desc}</div>
    </div>
  )
}
