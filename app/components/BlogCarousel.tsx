'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import ScrollReveal from './ScrollReveal'
import type { blogPosts as BlogPosts } from '../blog/data'

const AUTOPLAY_MS = 5500

type Post = (typeof BlogPosts)[number]

export default function BlogCarousel({
  posts,
  isDark,
  bg,
  clr,
  muted,
  bord,
  prevLabel,
  nextLabel,
  pageLabel,
}: {
  posts: readonly Post[]
  isDark: boolean
  bg: string
  clr: string
  muted: string
  bord: string
  prevLabel: string
  nextLabel: string
  pageLabel: string
}) {
  const [groupSize, setGroupSize] = useState(3)
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [direction, setDirection] = useState<1 | -1>(1)

  // Mobile: 1 kart, desktop: 3 kart
  useEffect(() => {
    const update = () => setGroupSize(window.innerWidth >= 768 ? 3 : 1)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const totalGroups = Math.max(1, Math.ceil(posts.length / groupSize))

  // Index'i yeni group sayısına göre clamp et (örn. resize sonrası)
  useEffect(() => {
    if (index >= totalGroups) setIndex(0)
  }, [totalGroups, index])

  const next = useCallback(() => {
    setDirection(1)
    setIndex(i => (i + 1) % totalGroups)
  }, [totalGroups])

  const prev = useCallback(() => {
    setDirection(-1)
    setIndex(i => (i - 1 + totalGroups) % totalGroups)
  }, [totalGroups])

  const goTo = useCallback((i: number) => {
    setDirection(i > index ? 1 : -1)
    setIndex(i)
  }, [index])

  // Auto-advance
  useEffect(() => {
    if (paused) return
    const reduce = typeof window !== 'undefined'
      && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    const timer = setInterval(() => {
      setDirection(1)
      setIndex(i => (i + 1) % totalGroups)
    }, AUTOPLAY_MS)
    return () => clearInterval(timer)
  }, [paused, totalGroups])

  // Görünür kartlar (sadece o anki grup)
  const start = index * groupSize
  const visible = posts.slice(start, start + groupSize)

  // Slide animation variants
  const slideVariants = {
    enter:  (dir: number) => ({ opacity: 0, x: dir * 80 }),
    center: { opacity: 1, x: 0 },
    exit:   (dir: number) => ({ opacity: 0, x: -dir * 80 }),
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
    >
      <div className="overflow-hidden">
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <motion.div
            key={index}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10"
          >
            {visible.map(post => (
              <Link href={`/blog/${post.id}`} key={post.id} className="group cursor-pointer block">
                <div
                  className="w-full aspect-video rounded-xl overflow-hidden mb-4 md:mb-6 relative"
                  style={{ background: isDark ? '#1a1a1a' : '#e5e5e5' }}
                >
                  <div
                    className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition duration-500 z-10"
                    aria-hidden="true"
                  />
                  <ScrollReveal fill duration={1.2}>
                    <Image
                      src={post.image}
                      alt={`${post.title} – blog görseli`}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover"
                    />
                  </ScrollReveal>
                </div>
                <span
                  className="text-xs font-bold tracking-widest uppercase mb-2 md:mb-3 block"
                  style={{ color: muted }}
                >
                  {post.category}
                </span>
                <h3
                  className="text-xl md:text-2xl font-bold leading-snug group-hover:opacity-60 transition-opacity"
                  style={{ color: clr }}
                >
                  {post.title}
                </h3>
              </Link>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Manuel kontroller */}
      <div className="flex items-center justify-center gap-3 md:gap-5 mt-10 md:mt-12">
        <button
          onClick={prev}
          aria-label={prevLabel}
          className="w-11 h-11 rounded-full border flex items-center justify-center hover:opacity-70 transition-opacity touch-manipulation"
          style={{ borderColor: bord, color: clr, background: bg }}
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
        </button>

        {/* Dots */}
        <div className="flex items-center gap-2" role="tablist" aria-label={pageLabel}>
          {Array.from({ length: totalGroups }).map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              role="tab"
              aria-selected={i === index}
              aria-label={`${pageLabel} ${i + 1}`}
              className="h-2 rounded-full transition-all duration-300 touch-manipulation"
              style={{
                width: i === index ? 28 : 8,
                background: i === index ? clr : (isDark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.18)'),
              }}
            />
          ))}
        </div>

        <button
          onClick={next}
          aria-label={nextLabel}
          className="w-11 h-11 rounded-full border flex items-center justify-center hover:opacity-70 transition-opacity touch-manipulation"
          style={{ borderColor: bord, color: clr, background: bg }}
        >
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}
