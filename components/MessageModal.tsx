'use client'

import { useEffect, useState } from 'react'
import { X, Heart, Video, FileText } from 'lucide-react'
import clsx from 'clsx'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  item: {
    id: string
    name: string
    type: 'text' | 'video'
    content: string // message text or video url
    createdAt: string
    isFavorite: boolean
  } | null
}

export default function MessageModal({ isOpen, onClose, item }: ModalProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    if (isOpen && item?.type === 'text') {
      setDisplayedText('')
      setIsTyping(true)
      let i = 1
      const text = item.content
      const interval = setInterval(() => {
        if (i <= text.length) {
          setDisplayedText(text.slice(0, i))
          i++
        } else {
          setIsTyping(false)
          clearInterval(interval)
        }
      }, 30) // Typing speed

      return () => clearInterval(interval)
    }
  }, [isOpen, item])

  if (!isOpen || !item) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-dune/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-fade-in-up">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className={clsx(
              "w-10 h-10 rounded-full flex items-center justify-center",
              item.type === 'video' ? "bg-orange-100 text-light-coral" : "bg-blue-50 text-blue-500"
            )}>
              {item.type === 'video' ? <Video size={20} /> : <FileText size={20} />}
            </div>
            <div>
              <h3 className="font-bold text-dune text-lg">{item.name}</h3>
              <p className="text-xs text-dune/40 font-medium">
                {new Date(item.createdAt).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          </div>
          
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-dune/40 hover:text-dune"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto bg-concrete/30 p-6 sm:p-10 flex items-center justify-center min-h-[400px]">
          {item.type === 'video' ? (
            <div className="w-full max-w-3xl aspect-video bg-black rounded-2xl overflow-hidden shadow-lg ring-1 ring-black/5">
              <video 
                src={item.content} 
                controls 
                autoPlay 
                className="w-full h-full object-contain"
              />
            </div>
          ) : (
            <div className="w-full max-w-2xl">
              <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100 relative">
                <div className="absolute -top-3 -left-3 text-6xl text-light-coral/20 font-serif">"</div>
                <p className="text-xl md:text-2xl text-dune/80 leading-relaxed font-medium whitespace-pre-wrap font-serif">
                  {displayedText}
                  {isTyping && <span className="inline-block w-1 h-6 ml-1 bg-light-coral animate-pulse align-middle" />}
                </p>
                <div className="absolute -bottom-8 -right-3 text-6xl text-light-coral/20 font-serif rotate-180">"</div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-white border-t border-gray-100 flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 bg-dune text-white font-bold rounded-xl hover:bg-dune/90 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
