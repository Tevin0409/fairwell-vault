import Link from 'next/link'
import { Heart, MessageSquare, Video, Stars } from 'lucide-react'
import Countdown from '@/components/Countdown'
import Image from 'next/image'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-concrete text-dune font-sans selection:bg-light-coral selection:text-white">
      {/* Header */}
      <nav className="flex items-center justify-between px-6 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 group">
          <div className="relative">
            <Heart className="text-light-coral w-6 h-6 group-hover:animate-sparkle" fill="currentColor" />
            <div className="absolute inset-0 bg-light-coral blur-lg opacity-20 group-hover:opacity-40 transition-opacity" />
          </div>
          <span className="font-bold text-xl tracking-tight">Farewell Vault</span>
        </div>
        <Link
          href="/submit"
          className="bg-light-coral hover:bg-rose-500 text-white font-semibold px-6 py-2.5 rounded-full transition-all shadow-lg shadow-light-coral/20 hover:shadow-light-coral/40 hover:-translate-y-0.5"
        >
          Submit Your Message
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[700px] flex items-center justify-center px-6 py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/hero-bg.png"
            alt="Background"
            fill
            className="object-cover opacity-30 blur-[2px]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-concrete/0 via-concrete/50 to-concrete" />
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 backdrop-blur-sm border border-white/20 text-dune/60 text-sm font-medium mb-4 animate-float">
            <Stars className="w-4 h-4 text-light-coral" />
            <span>Celebrating a New Chapter</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight leading-[0.9]">
            A Farewell Vault for <br />
            <span className="text-light-coral relative inline-block">
              Njambi
              <svg className="absolute -bottom-2 left-0 w-full h-3 text-light-coral/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
              </svg>
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-dune/70 max-w-2xl mx-auto leading-relaxed font-light">
            Leave a heartfelt message or video that Njambi will cherish forever. 
            Your words and memories, preserved for her next adventure.
          </p>
          
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/submit"
              className="group relative inline-flex items-center gap-3 bg-dune text-white font-bold px-8 py-4 rounded-full transition-all hover:scale-105 hover:shadow-xl"
            >
              <Heart className="w-5 h-5 text-light-coral group-hover:animate-sparkle" fill="currentColor" />
              <span>Get Started</span>
            </Link>
            <a href="#how-it-works" className="text-dune/60 hover:text-dune font-medium px-6 py-4 transition-colors">
              How it works ↓
            </a>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-32 px-6 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-concrete to-white" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">How It Works</h2>
            <p className="text-xl text-dune/60 max-w-2xl mx-auto">Simple steps to share your love and memories.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: MessageSquare,
                title: "1. Write or Record",
                desc: "Share your favorite memory, a heartfelt wish, or a funny story through text or video.",
                delay: "0"
              },
              {
                icon: Video,
                title: "2. Submit Your Message",
                desc: "Your message is securely stored and will be compiled into a special keepsake.",
                delay: "100"
              },
              {
                icon: Stars,
                title: "3. Create Lasting Memories",
                desc: "Njambi will receive all messages as a cherished collection of memories and well-wishes.",
                delay: "200"
              }
            ].map((step, i) => (
              <div key={i} className="group p-8 rounded-3xl bg-concrete/30 hover:bg-concrete transition-colors duration-300">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                  <step.icon className="w-8 h-8 text-light-coral" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                <p className="text-dune/60 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-32 px-6 bg-dune text-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Captured Moments</h2>
              <p className="text-white/60 text-lg">Glimpses of the memories we've shared together</p>
            </div>
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-light-coral animate-pulse" />
              <div className="w-3 h-3 rounded-full bg-white/20" />
              <div className="w-3 h-3 rounded-full bg-white/20" />
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className={`relative aspect-[3/4] rounded-2xl overflow-hidden group ${i % 2 === 0 ? 'md:translate-y-12' : ''}`}>
                <Image
                  src={`/gallery-${i}.jpg`}
                  alt={`Memory ${i}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Countdown Section */}
      <section className="py-32 px-6 bg-light-coral relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay" />
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-white/10 rounded-full blur-3xl animate-float" />
          <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-rose-600/20 rounded-full blur-3xl animate-float-delayed" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-12">
            Time to Submit Your Message
          </h2>
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl">
            <Countdown />
          </div>
          <div className="mt-16">
            <Link
              href="/submit"
              className="inline-flex items-center gap-3 bg-white text-light-coral font-bold px-10 py-5 rounded-full transition-all hover:scale-105 shadow-xl hover:shadow-2xl"
            >
              <span>Submit Your Message Now</span>
              <Heart className="w-5 h-5 fill-current" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-concrete border-t border-dune/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-6 text-dune/40 text-sm">
          <p>© 2025 Farewell Vault. Created with love for Njambi.</p>
         
        </div>
      </footer>
    </div>
  )
}
