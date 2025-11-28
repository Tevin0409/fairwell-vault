'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Heart, Video, FileText, LogOut, Search, SlidersHorizontal, ArrowUpDown, Play } from 'lucide-react'
import Image from 'next/image'
import clsx from 'clsx'
import { supabase } from '@/lib/supabase'
import MessageModal from '@/components/MessageModal'

interface Message {
  id: string
  name: string
  message: string
  createdAt: string
  isFavorite: boolean
}

interface VideoSubmission {
  id: string
  name: string
  videoUrl: string
  createdAt: string
  isFavorite: boolean
}

export default function AdminDashboard() {
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>([])
  const [videos, setVideos] = useState<VideoSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'text' | 'video' | 'favorites'>('all')
  
  // Modal State
  const [selectedItem, setSelectedItem] = useState<{
    id: string
    name: string
    type: 'text' | 'video'
    content: string
    createdAt: string
    isFavorite: boolean
  } | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push('/admin/login')
      } else {
        fetchData(session.access_token)
      }
    }
    checkAuth()
  }, [router])

  const fetchData = async (token: string) => {
    try {
      const [msgRes, vidRes] = await Promise.all([
        fetch('/api/messages', { headers: { Authorization: `Bearer ${token}` } }),
        fetch('/api/videos', { headers: { Authorization: `Bearer ${token}` } })
      ])
      
      if (msgRes.ok) {
        const data = await msgRes.json()
        setMessages(data.docs || data) // Handle potential { docs: [] } or [] response
      }
      if (vidRes.ok) {
        const data = await vidRes.json()
        setVideos(data.docs || data)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const toggleFavorite = async (id: string, type: 'text' | 'video', currentStatus: boolean) => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) return

      // Map 'text' type back to 'messages' endpoint
      const endpoint = type === 'text' ? `/api/messages/${id}` : `/api/videos/${id}`
      const res = await fetch(endpoint, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`
        },
        body: JSON.stringify({ isFavorite: !currentStatus }),
      })

      if (res.ok) {
        if (type === 'text') {
          setMessages(prev => prev.map(m => m.id === id ? { ...m, is_favorite: !currentStatus } as any : m))
        } else {
          setVideos(prev => prev.map(v => v.id === id ? { ...v, is_favorite: !currentStatus } as any : v))
        }
        
        // Update selected item if open
        if (selectedItem?.id === id) {
          setSelectedItem(prev => prev ? { ...prev, isFavorite: !currentStatus } : null)
        }
      }
    } catch (error) {
      console.error('Error toggling favorite:', error)
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    localStorage.removeItem('auth-token')
    router.push('/admin/login')
  }

  const allItems = [
    ...messages.map(m => ({
      ...m,
      type: 'text' as const,
      content: m.message,
      createdAt: (m as any).created_at, // Map from DB snake_case
      isFavorite: (m as any).is_favorite // Map from DB snake_case
    })),
    ...videos.map(v => ({
      ...v,
      type: 'video' as const,
      content: (v as any).url, // Map from DB 'url' column
      createdAt: (v as any).created_at, // Map from DB snake_case
      isFavorite: (v as any).is_favorite // Map from DB snake_case
    }))
  ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  const filteredItems = allItems.filter(item => {
    if (filter === 'all') return true
    if (filter === 'favorites') return item.isFavorite
    return item.type === filter
  })

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-concrete">
      <div className="w-16 h-16 border-4 border-light-coral/30 border-t-light-coral rounded-full animate-spin" />
    </div>
  )

  const openModal = (item: typeof allItems[0]) => {
    setSelectedItem(item)
    setIsModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-concrete font-sans text-dune">
      <MessageModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        item={selectedItem} 
      />

      {/* Header ... */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-light-coral rounded-xl flex items-center justify-center shadow-lg shadow-light-coral/20">
              <Heart className="text-white w-6 h-6" fill="currentColor" />
            </div>
            <span className="font-bold text-xl tracking-tight">Farewell Vault</span>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <div className="w-8 h-8 rounded-full bg-orange-100 border-2 border-white shadow-sm overflow-hidden">
                 <Image src="/gallery-1.jpg" alt="Admin" width={32} height={32} className="object-cover" />
              </div>
            </button>
            <button 
              onClick={handleLogout}
              className="p-2 text-dune/40 hover:text-light-coral hover:bg-rose-50 rounded-lg transition-colors"
              title="Logout"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">

        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            A Farewell from Your Friends, Njambi!
          </h1>
          <p className="text-dune/60 text-lg">
            Here are all the wonderful memories and messages your friends have shared.
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            {[
              { id: 'all', label: 'All Messages' },
              { id: 'text', label: 'Text' },
              { id: 'video', label: 'Video' },
              { id: 'favorites', label: 'Favorites', icon: Heart }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as any)}
                className={clsx(
                  'px-6 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap flex items-center gap-2',
                  filter === tab.id
                    ? 'bg-light-coral text-white shadow-md shadow-light-coral/20'
                    : 'bg-concrete text-dune/60 hover:bg-gray-200'
                )}
              >
                {tab.icon && <tab.icon size={16} className={filter === tab.id ? 'fill-current' : ''} />}
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-dune/30 w-4 h-4" />
              <input 
                type="text" 
                placeholder="Search messages..." 
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-concrete border-transparent focus:bg-white focus:border-light-coral focus:ring-2 focus:ring-light-coral/20 transition-all text-sm font-medium placeholder:text-dune/30"
              />
            </div>
            <button className="p-2.5 text-dune/60 hover:bg-concrete rounded-xl transition-colors">
              <ArrowUpDown size={20} />
            </button>
            <button className="p-2.5 text-dune/60 hover:bg-concrete rounded-xl transition-colors">
              <SlidersHorizontal size={20} />
            </button>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div 
              key={item.id} 
              onClick={() => openModal(item)}
              className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            >
              <div className="relative aspect-video bg-dune/5">
                {item.type === 'video' ? (
                  <>
                    <video 
                      src={item.content} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40">
                        <Play className="w-5 h-5 text-white ml-1" fill="currentColor" />
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white text-xs font-bold px-3 py-1.5 bg-black/40 backdrop-blur-md rounded-full">
                      <Video size={14} />
                      Video Message
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full p-8 flex items-center justify-center bg-gradient-to-br from-orange-50 to-rose-50">
                    <p className="text-dune/80 text-center font-medium line-clamp-4 italic">
                      "{item.content}"
                    </p>
                    <div className="absolute bottom-4 left-4 flex items-center gap-2 text-dune/80 text-xs font-bold px-3 py-1.5 bg-white/60 backdrop-blur-md rounded-full">
                      <FileText size={14} />
                      Text Message
                    </div>
                  </div>
                )}
                
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleFavorite(item.id, item.type, item.isFavorite)
                  }}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center hover:bg-white hover:scale-110 transition-all group/btn"
                >
                  <Heart 
                    className={clsx(
                      "w-5 h-5 transition-colors",
                      item.isFavorite ? "text-light-coral fill-current" : "text-white group-hover/btn:text-light-coral"
                    )} 
                  />
                </button>
              </div>

              <div className="p-6">
                <h3 className="font-bold text-lg text-dune mb-1">
                  {item.type === 'video' ? 'Video' : 'Message'} from {item.name}
                </h3>
                <p className="text-sm text-dune/40 font-medium">
                  {new Date(item.createdAt).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-concrete rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-dune/20" />
            </div>
            <h3 className="text-xl font-bold text-dune/40">No messages found</h3>
          </div>
        )}
      </main>
    </div>
  )
}
