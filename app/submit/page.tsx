'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Heart, PenLine, Video, Send, Upload } from 'lucide-react'
import clsx from 'clsx'
import Link from 'next/link'

export default function SubmitPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'text' | 'video'>('text')
  const [checking, setChecking] = useState(true)

  // Form States
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const submitted = localStorage.getItem('submitted')
    if (submitted === 'true') {
      router.replace('/submitted')
    } else {
      setChecking(false)
    }
  }, [router])

  const handleTextSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, message }),
      })

      if (res.ok) {
        localStorage.setItem('submitted', 'true')
        router.push('/thanks')
      } else {
        alert('Something went wrong. Please try again.')
      }
    } catch (error) {
      console.error(error)
      alert('Error submitting message.')
    } finally {
      setLoading(false)
    }
  }

  const handleVideoSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!videoFile) return

    setLoading(true)
    setProgress(10)

    const formData = new FormData()
    formData.append('name', name)
    formData.append('video', videoFile)

    try {
      const interval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 10, 90))
      }, 500)

      const res = await fetch('/api/videos', {
        method: 'POST',
        body: formData,
      })

      clearInterval(interval)
      setProgress(100)

      if (res.ok) {
        localStorage.setItem('submitted', 'true')
        router.push('/thanks')
      } else {
        const data = await res.json()
        alert(`Error: ${JSON.stringify(data)}`)
      }
    } catch (error) {
      console.error(error)
      alert('Error uploading video.')
    } finally {
      setLoading(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      if (selectedFile.size > 200 * 1024 * 1024) {
        alert('File size exceeds 200MB')
        return
      }
      setVideoFile(selectedFile)
    }
  }

  if (checking) return null

  return (
    <div className="min-h-screen bg-concrete text-dune font-sans selection:bg-light-coral selection:text-white">
      {/* Header */}
      <nav className="flex items-center px-6 py-6 max-w-5xl mx-auto">
        <Link href="/" className="flex items-center gap-2 group">
          <Heart className="text-light-coral group-hover:scale-110 transition-transform" fill="none" />
          <span className="font-bold text-lg tracking-tight">Farewell Vault</span>
        </Link>
      </nav>

      <main className="max-w-3xl mx-auto px-4 py-8 pb-20">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-serif font-bold mb-4 tracking-tight">
            A Message for Njambi
          </h1>
          <p className="text-dune/60 text-lg max-w-xl mx-auto leading-relaxed">
            Your memories, wishes, and stories will be a cherished keepsake for her new adventure. Share your farewell message below.
          </p>
        </div>

        {/* Tabs */}
        <div className="grid grid-cols-2 gap-6 mb-12">
          <button
            onClick={() => setActiveTab('text')}
            className={clsx(
              'flex flex-col items-center justify-center p-8 rounded-3xl border-2 transition-all duration-300',
              activeTab === 'text'
                ? 'border-light-coral bg-orange-50/50 text-dune shadow-lg scale-105'
                : 'border-white bg-white text-dune/60 hover:border-light-coral/30 hover:bg-white/80'
            )}
          >
            <div className={clsx(
              "w-14 h-14 rounded-full flex items-center justify-center mb-4 transition-colors",
              activeTab === 'text' ? "bg-light-coral text-white" : "bg-orange-100 text-light-coral"
            )}>
              <PenLine size={24} />
            </div>
            <span className="font-bold text-lg">Write a Message</span>
            <span className="text-sm opacity-70 mt-1">Pen down your thoughts.</span>
          </button>

          <button
            onClick={() => setActiveTab('video')}
            className={clsx(
              'flex flex-col items-center justify-center p-8 rounded-3xl border-2 transition-all duration-300',
              activeTab === 'video'
                ? 'border-light-coral bg-orange-50/50 text-dune shadow-lg scale-105'
                : 'border-white bg-white text-dune/60 hover:border-light-coral/30 hover:bg-white/80'
            )}
          >
            <div className={clsx(
              "w-14 h-14 rounded-full flex items-center justify-center mb-4 transition-colors",
              activeTab === 'video' ? "bg-light-coral text-white" : "bg-orange-100 text-light-coral"
            )}>
              <Video size={24} />
            </div>
            <span className="font-bold text-lg">Record a Video</span>
            <span className="text-sm opacity-70 mt-1">Share a moment on camera.</span>
          </button>
        </div>

        {/* Form Area */}
        <div className="bg-white rounded-3xl border border-white shadow-xl shadow-dune/5 p-8 md:p-12">
          {activeTab === 'text' ? (
            <form onSubmit={handleTextSubmit} className="space-y-8">
              <div className="space-y-3">
                <label className="block text-base font-bold text-dune">
                  Your heartfelt message
                </label>
                <textarea
                  required
                  maxLength={500}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={6}
                  className="w-full rounded-2xl border-gray-200 bg-concrete/30 p-6 text-dune placeholder:text-dune/30 focus:border-light-coral focus:ring-light-coral transition-all resize-none text-lg"
                  placeholder="Share a memory, a wish, or a funny story..."
                />
              </div>

              <div className="space-y-3">
                <label className="block text-base font-bold text-dune">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-2xl border-gray-200 bg-concrete/30 p-6 text-dune placeholder:text-dune/30 focus:border-light-coral focus:ring-light-coral transition-all text-lg"
                  placeholder="Let Njambi know who this is from"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 bg-light-coral hover:bg-rose-500 text-white font-bold py-5 px-8 rounded-2xl transition-all transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-light-coral/20 hover:shadow-xl"
              >
                {loading ? (
                  'Sending...'
                ) : (
                  <>
                    <Send size={20} />
                    Submit Message
                  </>
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVideoSubmit} className="space-y-8">
              <div className="space-y-3">
                <label className="block text-base font-bold text-dune">
                  Upload Video
                </label>
                <div className="mt-1 flex justify-center px-6 pt-12 pb-12 border-2 border-gray-200 border-dashed rounded-3xl hover:border-light-coral hover:bg-orange-50/30 transition-all cursor-pointer group relative">
                  <div className="space-y-4 text-center">
                    <div className="mx-auto w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform text-light-coral">
                      <Upload size={28} />
                    </div>
                    <div className="flex text-sm text-dune/60 justify-center">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md font-bold text-light-coral hover:text-rose-500 focus-within:outline-none"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          accept="video/mp4,video/quicktime,video/webm"
                          className="sr-only"
                          onChange={handleFileChange}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-dune/40">MP4, MOV, WEBM up to 200MB</p>
                  </div>
                  {videoFile && (
                    <div className="absolute inset-0 bg-white/95 flex items-center justify-center rounded-3xl border-2 border-light-coral">
                      <div className="text-center">
                        <p className="text-dune font-bold mb-2">Selected: {videoFile.name}</p>
                        <button 
                          type="button" 
                          onClick={(e) => { e.preventDefault(); setVideoFile(null); }}
                          className="text-sm text-light-coral hover:underline font-medium"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-base font-bold text-dune">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-2xl border-gray-200 bg-concrete/30 p-6 text-dune placeholder:text-dune/30 focus:border-light-coral focus:ring-light-coral transition-all text-lg"
                  placeholder="Let Njambi know who this is from"
                />
              </div>

              {loading && (
                <div className="w-full bg-concrete rounded-full h-3 overflow-hidden">
                  <div 
                    className="bg-light-coral h-full transition-all duration-300 ease-out" 
                    style={{ width: `${progress}%` }}
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={loading || !videoFile}
                className="w-full flex items-center justify-center gap-3 bg-light-coral hover:bg-rose-500 text-white font-bold py-5 px-8 rounded-2xl transition-all transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-light-coral/20 hover:shadow-xl"
              >
                {loading ? (
                  'Uploading...'
                ) : (
                  <>
                    <Upload size={20} />
                    Submit Video
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </main>
    </div>
  )
}
