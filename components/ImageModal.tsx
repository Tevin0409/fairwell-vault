'use client'

import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ImageModalProps {
  isOpen: boolean
  onClose: () => void
  imageSrc: string | null
  onNext: () => void
  onPrev: () => void
  currentIndex?: number
  totalImages?: number
}

export default function ImageModal({ 
  isOpen, 
  onClose, 
  imageSrc, 
  onNext, 
  onPrev,
  currentIndex,
  totalImages 
}: ImageModalProps) {
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return
      
      if (e.key === 'ArrowRight') onNext()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onNext, onPrev, onClose])

  return (
    <AnimatePresence>
      {isOpen && imageSrc && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
        >
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/90 backdrop-blur-xl" 
            onClick={onClose}
          />
          
          {/* Close Button */}
          <motion.button 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            onClick={onClose}
            className="absolute top-4 right-4 z-50 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors backdrop-blur-md border border-white/10"
          >
            <X size={24} />
          </motion.button>

          {/* Navigation Buttons */}
          <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none z-40 px-2 sm:px-8">
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              onClick={(e) => { e.stopPropagation(); onPrev(); }}
              className="pointer-events-auto p-4 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all backdrop-blur-md border border-white/10 hover:scale-110 active:scale-95 group"
            >
              <ChevronLeft size={32} className="group-hover:-translate-x-0.5 transition-transform" />
            </motion.button>

            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              onClick={(e) => { e.stopPropagation(); onNext(); }}
              className="pointer-events-auto p-4 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all backdrop-blur-md border border-white/10 hover:scale-110 active:scale-95 group"
            >
              <ChevronRight size={32} className="group-hover:translate-x-0.5 transition-transform" />
            </motion.button>
          </div>

          {/* Image Container */}
          <div className="relative w-full max-w-7xl h-full max-h-[85vh] flex flex-col items-center justify-center pointer-events-none">
            <AnimatePresence mode="wait">
              <motion.div
                key={imageSrc}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="relative w-full h-full rounded-lg overflow-hidden shadow-2xl pointer-events-auto"
              >
                <Image
                  src={imageSrc}
                  alt="Gallery Image"
                  fill
                  className="object-contain"
                  quality={100}
                  priority
                />
              </motion.div>
            </AnimatePresence>
            
            {/* Counter */}
            {currentIndex !== undefined && totalImages !== undefined && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="absolute -bottom-12 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-white/80 text-sm font-medium border border-white/10"
              >
                {currentIndex + 1} / {totalImages}
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
