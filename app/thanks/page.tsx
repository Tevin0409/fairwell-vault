import Link from 'next/link'
import { Heart } from 'lucide-react'

export default function ThanksPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-concrete p-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-12 text-center shadow-xl">
        <div className="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
          <Heart className="w-10 h-10 text-light-coral" fill="currentColor" />
        </div>
        <h1 className="text-3xl font-bold text-dune mb-4">Thank You!</h1>
        <p className="text-dune/60 mb-8">
          Your message has been safely stored in the vault. Njambi will cherish this forever.
        </p>
        <Link 
          href="/"
          className="inline-block bg-light-coral text-white font-bold px-8 py-3 rounded-xl hover:bg-rose-500 transition-colors shadow-lg shadow-light-coral/20"
        >
          Return Home
        </Link>
      </div>
    </div>
  )
}
