'use client'
 
 import { motion, AnimatePresence } from 'framer-motion'
 import { useEffect, useState } from 'react'
 import { Lock } from 'lucide-react'
 
 export default function VaultDoorTransition({ children }: { children: React.ReactNode }) {
   const [isOpen, setIsOpen] = useState(false)
 
   useEffect(() => {
     // Start opening sequence immediately
     const timer = setTimeout(() => setIsOpen(true), 500)
     return () => clearTimeout(timer)
   }, [])
 
   return (
     <div className="relative min-h-screen w-full overflow-hidden bg-concrete">
       <AnimatePresence mode="wait">
         {!isOpen && (
           <motion.div
             className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
             initial={{ opacity: 1 }}
             exit={{ opacity: 0, transition: { duration: 1.0, delay: 2 } }}
           >
             {/* Left Door */}
             <motion.div
               className="absolute left-0 top-0 bottom-0 w-1/2 bg-dune border-r-4 border-light-coral/20 flex items-center justify-end pr-8 shadow-2xl z-20"
               initial={{ x: 0 }}
               exit={{ x: '-100%', transition: { duration: 3.0, ease: [0.22, 1, 0.36, 1] } }}
             >
               <div className="w-32 h-32 rounded-full border-4 border-dashed border-light-coral/20 animate-[spin_10s_linear_infinite]" />
             </motion.div>
 
             {/* Right Door */}
             <motion.div
               className="absolute right-0 top-0 bottom-0 w-1/2 bg-dune border-l-4 border-light-coral/20 flex items-center justify-start pl-8 shadow-2xl z-20"
               initial={{ x: 0 }}
               exit={{ x: '100%', transition: { duration: 3.0, ease: [0.22, 1, 0.36, 1] } }}
             >
               <div className="w-32 h-32 rounded-full border-4 border-dashed border-light-coral/20 animate-[spin_10s_linear_infinite_reverse]" />
             </motion.div>
 
             {/* Center Lock Mechanism */}
             <motion.div
               className="absolute z-30 bg-dune p-6 rounded-full border-4 border-light-coral shadow-[0_0_50px_rgba(255,127,80,0.3)]"
               initial={{ scale: 1, rotate: 0 }}
               exit={{ 
                 scale: 0, 
                 rotate: 180, 
                 opacity: 0,
                 transition: { duration: 1.0 } 
               }}
             >
               <Lock className="w-12 h-12 text-light-coral" />
             </motion.div>
 
             {/* Light Bloom Effect Behind Doors */}
             <motion.div
               className="absolute inset-0 bg-light-coral/20 z-10"
               initial={{ opacity: 0 }}
               exit={{ 
                 opacity: [0, 1, 0],
                 scale: [1, 1.2, 1.5],
                 transition: { duration: 2.0 } 
               }}
             />
           </motion.div>
         )}
       </AnimatePresence>
 
       {/* Content */}
       <motion.div
         initial={{ opacity: 0, scale: 0.95 }}
         animate={{ 
           opacity: isOpen ? 1 : 0, 
           scale: isOpen ? 1 : 0.95 
         }}
         transition={{ duration: 0.8, delay: 0.5 }}
         className="relative z-0"
       >
         {children}
       </motion.div>
     </div>
   )
 }
