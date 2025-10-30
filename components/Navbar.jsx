'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Menu, X, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTheme } from 'next-themes'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { motion, AnimatePresence } from 'framer-motion'
import CommandPalette from '@/components/ui/CommandPalette'

/* ================= Mobile Booking Bar (collapsible) ================= */
const MobileBookingBar = ({
  checkIn,
  setCheckIn,
  checkOut,
  setCheckOut,
  adults,
  setAdults,
  children,
  setChildren,
}) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div
      animate={{ height: isExpanded ? 'auto' : '56px' }}
      transition={{ duration: 0.32, ease: 'easeInOut' }}
      className="overflow-hidden bg-green-700 text-white rounded-t-2xl shadow-2xl"
    >
      <div
        className="flex justify-between items-center px-4 py-3 bg-green-800 cursor-pointer"
        onClick={() => setIsExpanded((s) => !s)}
      >
        <span className="font-semibold text-sm">
          {isExpanded ? 'Hide Booking' : 'Book Your Stay'}
        </span>
        <ChevronDown className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
      </div>

      {isExpanded && (
        <div className="p-4 flex flex-col gap-3">
          <div className="flex flex-col">
            <label className="text-white text-sm mb-1">Check-in</label>
            <DatePicker
              selected={checkIn}
              onChange={setCheckIn}
              placeholderText="Select date"
              minDate={new Date()}
              className="w-full bg-transparent border border-white/30 text-white rounded-md px-3 py-2 placeholder-white/60 text-sm focus:outline-none"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-white text-sm mb-1">Check-out</label>
            <DatePicker
              selected={checkOut}
              onChange={setCheckOut}
              placeholderText="Select date"
              minDate={checkIn || new Date()}
              className="w-full bg-transparent border border-white/30 text-white rounded-md px-3 py-2 placeholder-white/60 text-sm focus:outline-none"
            />
          </div>

          <div className="flex gap-2">
            <div className="flex-1 flex flex-col">
              <label className="text-white text-sm mb-1">Adults</label>
              <select
                value={adults}
                onChange={(e) => setAdults(Number(e.target.value))}
                className="w-full bg-transparent border border-white/30 text-white rounded-md px-3 py-2 text-sm focus:outline-none"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                  <option key={n} value={n} className="text-gray-900">
                    {n}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex-1 flex flex-col">
              <label className="text-white text-sm mb-1">Children</label>
              <select
                value={children}
                onChange={(e) => setChildren(Number(e.target.value))}
                className="w-full bg-transparent border border-white/30 text-white rounded-md px-3 py-2 text-sm focus:outline-none"
              >
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                  <option key={n} value={n} className="text-gray-900">
                    {n}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <Button className="mt-3 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-5 py-3 rounded-lg shadow-md transition-all duration-300">
            Book your Stay
          </Button>
        </div>
      )}
    </motion.div>
  )
}

/* ================= MAIN NAVBAR ================= */
export default function Navbar() {
  const [scrollDir, setScrollDir] = useState('up') // 'up' | 'down'
  const [mobileOpen, setMobileOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)
  const { theme } = useTheme()
  const lastScrollY = useRef(0)
  const moreRef = useRef(null)
  const mobileRef = useRef(null)

  // booking states
  const [checkIn, setCheckIn] = useState(null)
  const [checkOut, setCheckOut] = useState(null)
  const [adults, setAdults] = useState(1)
  const [children, setChildren] = useState(0)

  const handleScroll = useCallback(() => {
    const current = window.scrollY
    if (current > lastScrollY.current + 10) {
      setScrollDir('down')
    } else if (current < lastScrollY.current - 10) {
      setScrollDir('up')
    }
    lastScrollY.current = current

    // Close dropdowns on scroll
    setMoreOpen(false)
    setMobileOpen(false)
  }, [])

  // Detect click outside (for both dropdowns)
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        moreRef.current &&
        !moreRef.current.contains(e.target) &&
        mobileRef.current &&
        !mobileRef.current.contains(e.target)
      ) {
        setMoreOpen(false)
        setMobileOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  const navLinks = [
    { name: 'Home', id: 'hero' },
    { name: 'About', id: 'about' },
    { name: 'Services', id: 'services' },
    { name: 'Gallery', id: 'gallery' },
    { name: 'Pricing', id: 'pricing' },
    { name: 'Contact', id: 'footer' },
  ]

  return (
    <>
      {/* TOP NAVBAR — hides on scroll down, shows on scroll up */}
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: scrollDir === 'down' ? -110 : 0 }}
        transition={{ duration: 0.38, ease: 'easeInOut' }}
        className="fixed top-0 z-50 w-full"
      >
        <nav
          className={`mx-4 sm:mx-auto max-w-7xl px-3 sm:px-6 py-3 rounded-full shadow-md backdrop-blur-md transition-colors flex items-center justify-between gap-4 mt-2
    ${scrollDir === 'down' ? 'bg-white/80 dark:bg-black/60' : 'bg-white/90 dark:bg-black/70'}`}
        >
          {/* left: logo */}
          <div className="flex items-center gap-3">
            <img src="/logo_main.png" alt="Nfarms Logo" className="w-10 h-10 object-contain" />
          </div>

          {/* center: search / command palette (desktop only) */}
          <div className="hidden md:flex flex-1 justify-center px-4">
            <div className="relative w-full max-w-lg rounded-2xl bg-white/60 backdrop-blur-sm">
              <CommandPalette />
            </div>
          </div>

          {/* right: actions */}
          <div className="flex items-center gap-3">
            {/* Desktop inline nav (visible md+) */}
            <div className="hidden md:flex items-center gap-4" ref={moreRef}>
              <button
                onClick={() =>
                  document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })
                }
                className={`font-medium transition-colors ${
                  scrollDir === 'down' ? 'text-gray-800' : 'text-green-700'
                }`}
              >
                Gallery
              </button>

              {/* More dropdown */}
              <div className="relative">
                <button
                  onClick={() => setMoreOpen((s) => !s)}
                  className={`flex items-center gap-1 font-medium ${
                    scrollDir === 'down' ? 'text-gray-800' : 'text-green-700'
                  }`}
                >
                  More <ChevronDown className="w-4 h-4" />
                </button>

                <AnimatePresence>
                  {moreOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.18 }}
                      className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
                    >
                      {navLinks
                        .filter((l) => l.name !== 'Gallery')
                        .map((link) => (
                          <button
                            key={link.id}
                            onClick={() => {
                              document
                                .getElementById(link.id)
                                ?.scrollIntoView({ behavior: 'smooth' })
                              setMoreOpen(false)
                            }}
                            className="w-full text-left px-4 py-2 text-gray-700 hover:bg-green-50"
                          >
                            {link.name}
                          </button>
                        ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Call Us button (desktop) */}
            <Button className="hidden md:inline-block bg-green-600 hover:bg-green-700 text-white rounded-full px-4 py-2">
              Call Us Now
            </Button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen((s) => !s)}
              className="md:hidden p-2 rounded-full bg-green-600 text-white"
              aria-label="Toggle menu"
              ref={mobileRef}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile dropdown menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ y: -8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -8, opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="md:hidden bg-green-700 text-white px-5 py-4 rounded-b-2xl shadow-lg"
            >
              <div className="flex flex-col gap-3">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => {
                      document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth' })
                      setMobileOpen(false)
                    }}
                    className="text-left font-semibold hover:text-orange-300"
                  >
                    {link.name}
                  </button>
                ))}

                <div className="pt-2">
                  <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-lg">
                    📞 Call Us Now
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* ================= BOTTOM BOOKING BAR (desktop scroll-based) ================= */}
      <AnimatePresence>
        {scrollDir === 'down' && (
          <motion.div
            key="desktop-booking"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="hidden md:block fixed bottom-6 left-[22%] -translate-x-1/2 z-50 w-[60%] max-w-5xl"
          >
            <div className="bg-green-700/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-green-600/40 px-4 py-4 flex items-center gap-4">
              <div className="flex flex-col flex-shrink-0 min-w-[160px]">
                <label className="text-white text-xs mb-1">Check-in</label>
                <DatePicker
                  selected={checkIn}
                  onChange={setCheckIn}
                  placeholderText="Check-in"
                  minDate={new Date()}
                  className="w-full bg-transparent border border-white/30 text-white rounded-md px-3 py-2 text-sm focus:outline-none"
                />
              </div>

              <div className="flex flex-col flex-shrink-0 min-w-[160px]">
                <label className="text-white text-xs mb-1">Check-out</label>
                <DatePicker
                  selected={checkOut}
                  onChange={setCheckOut}
                  placeholderText="Check-out"
                  minDate={checkIn || new Date()}
                  className="w-full bg-transparent border border-white/30 text-white rounded-md px-3 py-2 text-sm focus:outline-none"
                />
              </div>

              <div className="flex gap-3 items-end ml-auto">
                <div className="flex flex-col flex-shrink-0 w-[110px]">
                  <label className="text-white text-xs mb-1">Adults</label>
                  <select
                    value={adults}
                    onChange={(e) => setAdults(Number(e.target.value))}
                    className="w-full bg-transparent border border-white/30 text-white rounded-md px-3 py-2 text-sm focus:outline-none"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                      <option key={n} value={n} className="text-gray-900">
                        {n}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col flex-shrink-0 w-[110px]">
                  <label className="text-white text-xs mb-1">Children</label>
                  <select
                    value={children}
                    onChange={(e) => setChildren(Number(e.target.value))}
                    className="w-full bg-transparent border border-white/30 text-white rounded-md px-3 py-2 text-sm focus:outline-none"
                  >
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                      <option key={n} value={n} className="text-gray-900">
                        {n}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex-shrink-0">
                  <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-lg px-4 py-2 font-semibold">
                    Book your Stay
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= MOBILE BOOKING BAR ================= */}
      <div className="md:hidden fixed bottom-0 left-0 w-full z-[9999]">
        <MobileBookingBar
          checkIn={checkIn}
          setCheckIn={setCheckIn}
          checkOut={checkOut}
          setCheckOut={setCheckOut}
          adults={adults}
          setAdults={setAdults}
          children={children}
          setChildren={setChildren}
        />
      </div>
    </>
  )
}
