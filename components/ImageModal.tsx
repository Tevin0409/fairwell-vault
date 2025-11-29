'use client'

import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { useEffect } from 'react'

interface ImageModalProps {
  isOpen: boolean
  onClose: () => void
  imageSrc: string | null
  onNext: () => void
  onPrev: () => void
}

export default function ImageModal({ isOpen, onClose, imageSrc, onNext, onPrev }: ImageModalProps) {
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

  if (!isOpen || !imageSrc) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-dune/90 backdrop-blur-md transition-opacity" 
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-6xl h-full max-h-[90vh] flex flex-col items-center justify-center animate-fade-in-up group">
        <button 
          onClick={onClose}
          className="absolute top-0 right-0 sm:-top-12 sm:-right-12 z-20 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors backdrop-blur-sm"
        >
          <X size={24} />
        </button>

        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="absolute left-2 sm:-left-16 z-20 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors backdrop-blur-sm opacity-0 group-hover:opacity-100 focus:opacity-100"
        >
          <ChevronLeft size={32} />
        </button>

        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute right-2 sm:-right-16 z-20 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors backdrop-blur-sm opacity-0 group-hover:opacity-100 focus:opacity-100"
        >
          <ChevronRight size={32} />
        </button>

        <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
          <Image
            src={imageSrc}
            alt="Gallery Image"
            fill
            className="object-contain"
            quality={100}
            priority
          />
        </div>
      </div>
    </div>
  )
}
