import Link from 'next/link'
import { CheckCircle } from 'lucide-react'

export default function SubmittedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-concrete p-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-12 text-center shadow-xl">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-dune mb-4">Already Submitted!</h1>
        <p className="text-dune/60 mb-8">
          You have already submitted a message. Thank you for sharing your memories with Njambi!
        </p>
        <Link 
          href="/"
          className="inline-block bg-dune text-white font-bold px-8 py-3 rounded-xl hover:bg-dune/90 transition-colors"
        >
          Back Home
        </Link>
      </div>
    </div>
  )
}
