'use client'
 
 import { motion } from 'framer-motion'
 import { useEffect, useState } from 'react'
 
 const Petal = ({ delay }: { delay: number }) => {
   const randomX = Math.random() * 100 // Random start position %
   const randomDuration = 10 + Math.random() * 10 // 10-20s duration
 
   return (
     <motion.div
       className="absolute top-[-20px] pointer-events-none"
       style={{ left: `${randomX}%` }}
       initial={{ y: -20, opacity: 0, rotate: 0 }}
       animate={{
         y: ['0vh', '100vh'],
         x: [0, Math.random() * 100 - 50, 0], // Swaying motion
         opacity: [0, 0.8, 0],
         rotate: [0, 360],
       }}
       transition={{
         duration: randomDuration,
         repeat: Infinity,
         delay: delay,
         ease: 'linear',
       }}
     >
       <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path
           d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
           fill="currentColor"
           className="text-white/30"
         />
       </svg>
     </motion.div>
   )
 }
 
 const Sparkle = ({ delay }: { delay: number }) => {
   const randomX = Math.random() * 100
   const randomY = Math.random() * 100
 
   return (
     <motion.div
       className="absolute pointer-events-none"
       style={{ left: `${randomX}%`, top: `${randomY}%` }}
       initial={{ scale: 0, opacity: 0 }}
       animate={{
         scale: [0, 1, 0],
         opacity: [0, 0.8, 0],
       }}
       transition={{
         duration: 2 + Math.random() * 2,
         repeat: Infinity,
         delay: delay,
         repeatDelay: Math.random() * 5,
       }}
     >
       <div className="w-1 h-1 bg-white rounded-full shadow-[0_0_5px_#fff]" />
     </motion.div>
   )
 }
 
 export default function FloatingPetals() {
   const [isMounted, setIsMounted] = useState(false)
 
   useEffect(() => {
     setIsMounted(true)
   }, [])
 
   if (!isMounted) return null
 
   return (
     <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
       {[...Array(15)].map((_, i) => (
         <Petal key={`petal-${i}`} delay={i * 1.5} />
       ))}
       {[...Array(20)].map((_, i) => (
         <Sparkle key={`sparkle-${i}`} delay={i * 0.5} />
       ))}
     </div>
   )
 }
