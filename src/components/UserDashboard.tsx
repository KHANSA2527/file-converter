// // import { useAuth } from '../contexts/AuthContext'
// // import HeroSection from './HeroSection'
import { Variants } from "framer-motion";


// // const UserDashboard = () => {
// //   const { user, isAuthenticated } = useAuth()

// //   // For authenticated users, show a different welcome section
// //   if (isAuthenticated && user) {
// //     const userName = user.email?.split('@')[0] || 'User'
// //     const displayName = user.user_metadata?.full_name || userName

// //     return (
// //       <section className="pt-20 pb-16 bg-gradient-to-br from-red-50 via-white to-orange-50">
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //           <div className="text-center">
// //             {/* Welcome Message */}
// //             <div className="mb-8">
// //               <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
// //                 Welcome back, <span className="text-red-600">{displayName}</span>!
// //               </h1>
// //               <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
// //                 You're now logged in and can access all PDF tools without limitations. 
// //                 Start working with your documents immediately.
// //               </p>
// //             </div>

// //             {/* User Stats */}
// //             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto mb-12">
// //               <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
// //                 <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mx-auto mb-4">
// //                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
// //                   </svg>
// //                 </div>
// //                 <div className="text-2xl font-bold text-gray-900 mb-2">Unlimited</div>
// //                 <div className="text-gray-600">File Processing</div>
// //               </div>
              
// //               <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
// //                 <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
// //                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
// //                   </svg>
// //                 </div>
// //                 <div className="text-2xl font-bold text-gray-900 mb-2">Fast</div>
// //                 <div className="text-gray-600">Processing Speed</div>
// //               </div>
              
// //               <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
// //                 <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
// //                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
// //                   </svg>
// //                 </div>
// //                 <div className="text-2xl font-bold text-gray-900 mb-2">Secure</div>
// //                 <div className="text-gray-600">Data Protection</div>
// //               </div>
// //             </div>

// //             {/* Call to Action */}
// //             <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 max-w-2xl mx-auto">
// //               <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to get started?</h3>
// //               <p className="text-gray-600 mb-6">
// //                 All 31 PDF tools are now available to you. Choose a tool below to start working with your documents.
// //               </p>
// //               <button 
// //                 onClick={() => {
// //                   const element = document.getElementById('tools')
// //                   if (element) {
// //                     element.scrollIntoView({ behavior: 'smooth' })
// //                   }
// //                 }}
// //                 className="px-8 py-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
// //               >
// //                 Start Using Tools
// //               </button>
// //             </div>

// //             {/* User Info */}
// //             <div className="mt-8 text-sm text-gray-500">
// //               Logged in as: {user.email}
// //             </div>
// //           </div>
// //         </div>
// //       </section>
// //     )
// //   }

// //   // For non-authenticated users, show the regular hero section
// //   return <HeroSection />

// // }

// // export default UserDashboard

// import { useAuth } from '../contexts/AuthContext'
// import HeroSection from './HeroSection'
// import { motion } from 'framer-motion'
// import { useEffect, useState } from 'react'

// // Animation variants
// const containerVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.1
//     }
//   }
// }

// const itemVariants = {
//   hidden: { y: 20, opacity: 0 },
//   visible: {
//     y: 0,
//     opacity: 1,
//     transition: {
//       type: "spring",
//       stiffness: 100
//     }
//   }
// }

// const cardHoverVariants = {
//   hover: {
//     y: -8,
//     scale: 1.02,
//     transition: {
//       type: "spring",
//       stiffness: 300
//     }
//   }
// }

// const pulseAnimation = {
//   scale: [1, 1.05, 1],
//   transition: {
//     duration: 2,
//     repeat: Infinity,
//     ease: "easeInOut"
//   }
// }

// const UserDashboard = () => {
//   const { user, isAuthenticated } = useAuth()
//   const [mounted, setMounted] = useState(false)

//   useEffect(() => {
//     setMounted(true)
//   }, [])

//   // For authenticated users, show a different welcome section
//   if (isAuthenticated && user) {
//     const userName = user.email?.split('@')[0] || 'User'
//     const displayName = user.user_metadata?.full_name || userName

//     if (!mounted) {
//       return (
//         <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50" />
//       )
//     }

//     return (
//       <motion.section 
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.5 }}
//         className="min-h-screen pt-20 pb-16 bg-gradient-to-br from-red-50 via-white to-orange-50 relative overflow-hidden"
//       >
//         {/* Animated background elements */}
//         <div className="absolute inset-0 overflow-hidden">
//           <motion.div
//             animate={{
//               x: [0, 100, 0],
//               y: [0, -50, 0],
//             }}
//             transition={{
//               duration: 20,
//               repeat: Infinity,
//               ease: "linear"
//             }}
//             className="absolute -top-20 -left-20 w-72 h-72 bg-red-200 rounded-full mix-blend-multiply filter blur-xl opacity-20"
//           />
//           <motion.div
//             animate={{
//               x: [0, -80, 0],
//               y: [0, 60, 0],
//             }}
//             transition={{
//               duration: 15,
//               repeat: Infinity,
//               ease: "linear"
//             }}
//             className="absolute -bottom-20 -right-20 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-20"
//           />
//           <motion.div
//             animate={{
//               x: [0, 60, 0],
//               y: [0, 80, 0],
//             }}
//             transition={{
//               duration: 25,
//               repeat: Infinity,
//               ease: "linear"
//             }}
//             className="absolute top-1/2 left-1/2 w-64 h-64 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-20"
//           />
//         </div>

//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//           <motion.div
//             variants={containerVariants}
//             initial="hidden"
//             animate="visible"
//             className="text-center"
//           >
//             {/* Welcome Message */}
//             <motion.div
//               variants={itemVariants}
//               className="mb-12"
//             >
//               <motion.div
//                 initial={{ scale: 0.5, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
//                 className="inline-flex items-center px-4 py-2 rounded-full bg-white shadow-lg border border-gray-100 mb-6"
//               >
//                 <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
//                 <span className="text-sm font-medium text-gray-600">Welcome back!</span>
//               </motion.div>

//               <motion.h1
//                 initial={{ y: 30, opacity: 0 }}
//                 animate={{ y: 0, opacity: 1 }}
//                 transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
//                 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6"
//               >
//                 Welcome back,{' '}
//                 <motion.span
//                   animate={pulseAnimation}
//                   className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600"
//                 >
//                   {displayName}
//                 </motion.span>
//                 !
//               </motion.h1>

//               <motion.p
//                 variants={itemVariants}
//                 className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed"
//               >
//                 You're now logged in and can access all PDF tools without limitations. 
//                 Start working with your documents immediately.
//               </motion.p>
//             </motion.div>

//             {/* User Stats */}
//             <motion.div
//               variants={containerVariants}
//               className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16"
//             >
//               {[
//                 {
//                   icon: (
//                     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     </svg>
//                   ),
//                   value: "Unlimited",
//                   description: "File Processing",
//                   color: "green"
//                 },
//                 {
//                   icon: (
//                     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
//                     </svg>
//                   ),
//                   value: "Fast",
//                   description: "Processing Speed",
//                   color: "blue"
//                 },
//                 {
//                   icon: (
//                     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//                     </svg>
//                   ),
//                   value: "Secure",
//                   description: "Data Protection",
//                   color: "purple"
//                 }
//               ].map((stat, index) => (
//                 <motion.div
//                   key={index}
//                   variants={itemVariants}
//                   whileHover="hover"
//                   variants={cardHoverVariants}
//                   className="relative group"
//                 >
//                   <div className={`bg-white rounded-2xl p-8 shadow-lg border border-gray-100 backdrop-blur-sm transform transition-all duration-300 group-hover:shadow-2xl ${
//                     stat.color === 'green' ? 'group-hover:border-green-200' :
//                     stat.color === 'blue' ? 'group-hover:border-blue-200' :
//                     'group-hover:border-purple-200'
//                   }`}>
//                     <motion.div
//                       whileHover={{ rotate: 360 }}
//                       transition={{ duration: 0.5 }}
//                       className={`w-16 h-16 ${
//                         stat.color === 'green' ? 'bg-green-100 text-green-600' :
//                         stat.color === 'blue' ? 'bg-blue-100 text-blue-600' :
//                         'bg-purple-100 text-purple-600'
//                       } rounded-2xl flex items-center justify-center mx-auto mb-6`}
//                     >
//                       {stat.icon}
//                     </motion.div>
//                     <motion.div 
//                       className="text-3xl font-bold text-gray-900 mb-3"
//                       whileHover={{ scale: 1.1 }}
//                     >
//                       {stat.value}
//                     </motion.div>
//                     <div className={`text-gray-600 font-medium ${
//                       stat.color === 'green' ? 'group-hover:text-green-700' :
//                       stat.color === 'blue' ? 'group-hover:text-blue-700' :
//                       'group-hover:text-purple-700'
//                     } transition-colors duration-300`}>
//                       {stat.description}
//                     </div>
//                   </div>
//                 </motion.div>
//               ))}
//             </motion.div>

//             {/* Call to Action */}
//             <motion.div
//               variants={itemVariants}
//               whileHover={{ scale: 1.02 }}
//               className="relative"
//             >
//               <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-10 shadow-2xl border border-gray-100 max-w-2xl mx-auto relative overflow-hidden">
//                 {/* Background gradient */}
//                 <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-orange-500/5" />
                
//                 <motion.div
//                   initial={{ scale: 0 }}
//                   animate={{ scale: 1 }}
//                   transition={{ delay: 0.8, type: "spring", stiffness: 100 }}
//                   className="relative z-10"
//                 >
//                   <h3 className="text-3xl font-bold text-gray-900 mb-4">
//                     Ready to get started?
//                   </h3>
//                   <p className="text-gray-600 mb-8 text-lg leading-relaxed">
//                     All 31 PDF tools are now available to you. Choose a tool below to start working with your documents.
//                   </p>
//                   <motion.button
//                     onClick={() => {
//                       const element = document.getElementById('tools')
//                       if (element) {
//                         element.scrollIntoView({ behavior: 'smooth' })
//                       }
//                     }}
//                     whileHover={{ 
//                       scale: 1.05,
//                       boxShadow: "0 20px 40px rgba(220, 38, 38, 0.3)"
//                     }}
//                     whileTap={{ scale: 0.95 }}
//                     className="px-10 py-5 bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold rounded-2xl transform transition-all duration-200 shadow-lg relative overflow-hidden group"
//                   >
//                     <span className="relative z-10">Start Using Tools</span>
//                     <motion.div
//                       className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
//                     />
//                     <motion.div
//                       animate={{
//                         x: [-100, 300],
//                       }}
//                       transition={{
//                         duration: 2,
//                         repeat: Infinity,
//                         delay: 1
//                       }}
//                       className="absolute top-0 left-0 w-20 h-full bg-white/20 skew-x-12"
//                     />
//                   </motion.button>
//                 </motion.div>
//               </div>
//             </motion.div>

//             {/* User Info */}
//             <motion.div
//               variants={itemVariants}
//               className="mt-12 p-4 bg-white/50 backdrop-blur-sm rounded-2xl border border-gray-200 inline-flex items-center space-x-4"
//             >
//               <motion.div
//                 whileHover={{ scale: 1.1 }}
//                 className="w-10 h-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold"
//               >
//                 {displayName.charAt(0).toUpperCase()}
//               </motion.div>
//               <div className="text-left">
//                 <div className="text-sm font-medium text-gray-900">{displayName}</div>
//                 <div className="text-xs text-gray-500">{user.email}</div>
//               </div>
//             </motion.div>
//           </motion.div>
//         </div>

//         {/* Floating particles */}
//         <div className="absolute inset-0 pointer-events-none">
//           {[...Array(15)].map((_, i) => (
//             <motion.div
//               key={i}
//               className="absolute w-2 h-2 bg-red-400/30 rounded-full"
//               animate={{
//                 y: [0, -100, 0],
//                 x: [0, Math.random() * 50 - 25, 0],
//                 opacity: [0, 1, 0],
//               }}
//               transition={{
//                 duration: 3 + Math.random() * 2,
//                 repeat: Infinity,
//                 delay: Math.random() * 2,
//               }}
//               style={{
//                 left: `${Math.random() * 100}%`,
//                 top: `${Math.random() * 100}%`,
//               }}
//             />
//           ))}
//         </div>
//       </motion.section>
//     )
//   }

//   // For non-authenticated users, show the regular hero section
//   return <HeroSection />
// }

// export default UserDashboard


import { useAuth } from "../contexts/AuthContext";
import HeroSection from "./HeroSection";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// Animation variants
const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } } };
const cardHoverVariants = { hover: { y: -8, scale: 1.02, transition: { type: "spring", stiffness: 300 } } };
const pulseAnimation = { scale: [1, 1.05, 1], transition: { duration: 2, repeat: Infinity, ease: "easeInOut" } };

const UserDashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50" />;

  if (!isAuthenticated || !user) return <HeroSection />;

  const userName = user.email?.split("@")[0] || "User";
  const displayName = user.user_metadata?.full_name || userName;

  const stats = [
    { icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>, value: "Unlimited", description: "File Processing", color: "green" },
    { icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>, value: "Fast", description: "Processing Speed", color: "blue" },
    { icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>, value: "Secure", description: "Data Protection", color: "purple" }
  ];

  const itemVariants: Variants = {
  hidden: { 
    y: 20, 
    opacity: 0 
  },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2
    }
  }
};

  
  return (
    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="min-h-screen pt-20 pb-16 bg-gradient-to-br from-red-50 via-white to-orange-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="text-center">
          <motion.div variants={itemVariants} className="mb-12">
            <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 100, delay: 0.2 }} className="inline-flex items-center px-4 py-2 rounded-full bg-white shadow-lg border border-gray-100 mb-6">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
              <span className="text-sm font-medium text-gray-600">Welcome back!</span>
            </motion.div>

            <motion.h1 initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3, type: "spring", stiffness: 100 }} className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Welcome back, <motion.span animate={pulseAnimation} className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">{displayName}</motion.span>!
            </motion.h1>

            <motion.p variants={itemVariants} className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              You're now logged in and can access all PDF tools without limitations. Start working with your documents immediately.
            </motion.p>
          </motion.div>

          {/* Stats */}
          <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
            {stats.map((stat, i) => (
              <motion.div key={i} variants={itemVariants} whileHover="hover" className="relative group">
                <div className={`bg-white rounded-2xl p-8 shadow-lg border border-gray-100 backdrop-blur-sm transform transition-all duration-300 group-hover:shadow-2xl ${stat.color === 'green' ? 'group-hover:border-green-200' : stat.color === 'blue' ? 'group-hover:border-blue-200' : 'group-hover:border-purple-200'}`}>
                  <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }} className={`w-16 h-16 ${stat.color === 'green' ? 'bg-green-100 text-green-600' : stat.color === 'blue' ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                    {stat.icon}
                  </motion.div>
                  <motion.div className="text-3xl font-bold text-gray-900 mb-3" whileHover={{ scale: 1.1 }}>{stat.value}</motion.div>
                  <div className={`text-gray-600 font-medium ${stat.color === 'green' ? 'group-hover:text-green-700' : stat.color === 'blue' ? 'group-hover:text-blue-700' : 'group-hover:text-purple-700'} transition-colors duration-300`}>{stat.description}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default UserDashboard;
