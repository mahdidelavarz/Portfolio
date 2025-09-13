// import React, { useState, useRef, useEffect } from 'react';
// import { motion, useInView, useAnimation } from 'framer-motion';

// const ContactMe = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     subject: '',
//     message: '',
//     budget: '',
//     timeline: ''
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitStatus, setSubmitStatus] = useState('');
  
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true, threshold: 0.3 });
//   const controls = useAnimation();

//   const contactMethods = [
//     {
//       id: 'email',
//       label: 'Email',
//       value: 'mahdi.delavar@email.com',
//       icon: '📧',
//       color: '#ff6b6b',
//       description: 'Drop me an email anytime',
//       action: 'Copy Email'
//     },
//     {
//       id: 'phone',
//       label: 'Phone',
//       value: '+98 912 345 6789',
//       icon: '📱',
//       color: '#4ecdc4',
//       description: 'Call me during work hours',
//       action: 'Call Now'
//     },
//     {
//       id: 'telegram',
//       label: 'Telegram',
//       value: '@mahdi_delavar',
//       icon: '💬',
//       color: '#00d4ff',
//       description: 'Quick messages and updates',
//       action: 'Open Chat'
//     },
//     {
//       id: 'linkedin',
//       label: 'LinkedIn',
//       value: 'mahdi-delavar-dev',
//       icon: '💼',
//       color: '#a8e6cf',
//       description: 'Professional networking',
//       action: 'Connect'
//     }
//   ];

//   const socialLinks = [
//     { name: 'GitHub', url: 'https://github.com/mahdi-delavar', icon: '🐱', color: '#333' },
//     { name: 'LinkedIn', url: 'https://linkedin.com/in/mahdi-delavar', icon: '💼', color: '#0077b5' },
//     { name: 'Telegram', url: 'https://t.me/mahdi_delavar', icon: '💬', color: '#0088cc' },
//     { name: 'WhatsApp', url: 'https://wa.me/989123456789', icon: '📱', color: '#25d366' }
//   ];

//   useEffect(() => {
//     if (isInView) {
//       controls.start('visible');
//     }
//   }, [isInView, controls]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
    
//     // Simulate form submission
//     setTimeout(() => {
//       setIsSubmitting(false);
//       setSubmitStatus('success');
//       setFormData({
//         name: '',
//         email: '',
//         subject: '',
//         message: '',
//         budget: '',
//         timeline: ''
//       });
//     }, 2000);
//   };

//   const copyToClipboard = (text) => {
//     navigator.clipboard.writeText(text);
//   };

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.2,
//         delayChildren: 0.1
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 30 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.6, ease: "easeOut" }
//     }
//   };

//   return (
//     <motion.section
//       ref={ref}
//       className="w-full min-h-screen snap-start flex flex-col justify-center px-8 lg:px-16 py-16 text-white relative overflow-hidden"
//       initial="hidden"
//       animate={controls}
//       variants={containerVariants}
//     >
//       {/* Animated Background */}
//       <div className="absolute inset-0 pointer-events-none">
//         {[...Array(20)].map((_, i) => (
//           <motion.div
//             key={i}
//             className="absolute w-1 h-1 bg-cyan-400 rounded-full"
//             style={{
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`
//             }}
//             animate={{
//               scale: [0, 1, 0],
//               opacity: [0, 1, 0],
//               x: [0, Math.random() * 100 - 50],
//               y: [0, Math.random() * 100 - 50]
//             }}
//             transition={{
//               duration: 3,
//               repeat: Infinity,
//               delay: i * 0.2,
//               ease: "easeInOut"
//             }}
//           />
//         ))}
        
//         <motion.div
//           className="absolute top-20 right-20 w-32 h-32 rounded-full bg-gradient-to-br from-cyan-400/10 to-purple-400/10"
//           animate={{
//             rotate: [0, 360],
//             scale: [1, 1.2, 1]
//           }}
//           transition={{
//             duration: 10,
//             repeat: Infinity,
//             ease: "linear"
//           }}
//         />
//         <motion.div
//           className="absolute bottom-20 left-20 w-24 h-24 rounded-full bg-gradient-to-br from-pink-400/10 to-orange-400/10"
//           animate={{
//             rotate: [360, 0],
//             scale: [1, 0.8, 1]
//           }}
//           transition={{
//             duration: 8,
//             repeat: Infinity,
//             ease: "linear"
//           }}
//         />
//       </div>

//       {/* Header */}
//       <motion.div className="text-center mb-16" variants={itemVariants}>
//         <h1 className="text-5xl lg:text-7xl font-black mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
//           GET IN TOUCH
//         </h1>
//         <p className="text-xl text-white/70 max-w-2xl mx-auto">
//           Ready to start your next project? Let's create something amazing together.
//         </p>
//       </motion.div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto w-full">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//           {/* Left Column - Contact Info */}
//           <motion.div className="space-y-8" variants={itemVariants}>
//             {/* Contact Methods */}
//             <div className="bg-gradient-to-br from-white/10 to-white/[0.02] backdrop-blur-xl border border-white/20 rounded-2xl p-8">
//               <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
//                 <span className="text-cyan-400">📞</span>
//                 Contact Methods
//               </h2>
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 {contactMethods.map((method, index) => (
//                   <motion.div
//                     key={method.id}
//                     className="bg-white/5 border border-white/10 rounded-xl p-4 hover:border-white/30 transition-all duration-300 cursor-pointer group"
//                     initial={{ opacity: 0, scale: 0.9 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     transition={{ delay: index * 0.1 }}
//                     whileHover={{ y: -5, scale: 1.02 }}
//                     onClick={() => method.id === 'email' ? copyToClipboard(method.value) : null}
//                   >
//                     <div className="flex items-center gap-3 mb-3">
//                       <div 
//                         className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
//                         style={{ backgroundColor: `${method.color}20` }}
//                       >
//                         {method.icon}
//                       </div>
//                       <div>
//                         <h3 className="font-semibold text-white">{method.label}</h3>
//                         <p 
//                           className="text-sm font-medium"
//                           style={{ color: method.color }}
//                         >
//                           {method.value}
//                         </p>
//                       </div>
//                     </div>
//                     <p className="text-white/60 text-sm mb-3">{method.description}</p>
//                     <button 
//                       className="w-full py-2 rounded-lg text-sm font-medium transition-all duration-300 group-hover:shadow-lg"
//                       style={{ 
//                         backgroundColor: `${method.color}20`,
//                         color: method.color,
//                         border: `1px solid ${method.color}40`
//                       }}
//                     >
//                       {method.action}
//                     </button>
//                   </motion.div>
//                 ))}
//               </div>
//             </div>

//             {/* Social Links */}
//             <div className="bg-gradient-to-br from-white/10 to-white/[0.02] backdrop-blur-xl border border-white/20 rounded-2xl p-8">
//               <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
//                 <span className="text-purple-400">🌐</span>
//                 Social Media
//               </h2>
//               <div className="flex flex-wrap gap-4">
//                 {socialLinks.map((social, index) => (
//                   <motion.a
//                     key={social.name}
//                     href={social.url}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-6 py-3 hover:border-white/30 transition-all duration-300 group"
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: index * 0.1 }}
//                     whileHover={{ scale: 1.05, x: 5 }}
//                   >
//                     <span className="text-xl">{social.icon}</span>
//                     <span className="font-medium group-hover:text-white/90">{social.name}</span>
//                   </motion.a>
//                 ))}
//               </div>
//             </div>

//             {/* Quick Stats */}
//             <div className="bg-gradient-to-br from-white/10 to-white/[0.02] backdrop-blur-xl border border-white/20 rounded-2xl p-8">
//               <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
//                 <span className="text-pink-400">⚡</span>
//                 Quick Facts
//               </h2>
//               <div className="grid grid-cols-2 gap-4">
//                 <div className="text-center">
//                   <div className="text-3xl font-bold text-cyan-400 mb-1">24h</div>
//                   <div className="text-sm text-white/60">Response Time</div>
//                 </div>
//                 <div className="text-center">
//                   <div className="text-3xl font-bold text-purple-400 mb-1">100%</div>
//                   <div className="text-sm text-white/60">Client Satisfaction</div>
//                 </div>
//                 <div className="text-center">
//                   <div className="text-3xl font-bold text-pink-400 mb-1">50+</div>
//                   <div className="text-sm text-white/60">Projects Delivered</div>
//                 </div>
//                 <div className="text-center">
//                   <div className="text-3xl font-bold text-orange-400 mb-1">3+</div>
//                   <div className="text-sm text-white/60">Years Experience</div>
//                 </div>
//               </div>
//             </div>
//           </motion.div>

//           {/* Right Column - Contact Form */}
//           <motion.div variants={itemVariants}>
//             <div className="bg-gradient-to-br from-white/10 to-white/[0.02] backdrop-blur-xl border border-white/20 rounded-2xl p-8">
//               <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
//                 <span className="text-cyan-400">📝</span>
//                 Send Message
//               </h2>

//               <form onSubmit={handleSubmit} className="space-y-6">
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-white/80 mb-2">
//                       Full Name *
//                     </label>
//                     <input
//                       type="text"
//                       name="name"
//                       value={formData.name}
//                       onChange={handleInputChange}
//                       required
//                       className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/50 focus:border-cyan-400 focus:outline-none transition-all duration-300"
//                       placeholder="Your Name"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-white/80 mb-2">
//                       Email Address *
//                     </label>
//                     <input
//                       type="email"
//                       name="email"
//                       value={formData.email}
//                       onChange={handleInputChange}
//                       required
//                       className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/50 focus:border-cyan-400 focus:outline-none transition-all duration-300"
//                       placeholder="your.email@example.com"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-white/80 mb-2">
//                     Subject *
//                   </label>
//                   <input
//                     type="text"
//                     name="subject"
//                     value={formData.subject}
//                     onChange={handleInputChange}
//                     required
//                     className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/50 focus:border-cyan-400 focus:outline-none transition-all duration-300"
//                     placeholder="Project inquiry, collaboration, etc."
//                   />
//                 </div>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-white/80 mb-2">
//                       Budget Range
//                     </label>
//                     <select
//                       name="budget"
//                       value={formData.budget}
//                       onChange={handleInputChange}
//                       className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:border-cyan-400 focus:outline-none transition-all duration-300"
//                     >
//                       <option value="">Select Budget</option>
//                       <option value="under-5k">Under $5,000</option>
//                       <option value="5k-10k">$5,000 - $10,000</option>
//                       <option value="10k-25k">$10,000 - $25,000</option>
//                       <option value="25k-plus">$25,000+</option>
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-white/80 mb-2">
//                       Timeline
//                     </label>
//                     <select
//                       name="timeline"
//                       value={formData.timeline}
//                       onChange={handleInputChange}
//                       className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:border-cyan-400 focus:outline-none transition-all duration-300"
//                     >
//                       <option value="">Select Timeline</option>
//                       <option value="asap">ASAP</option>
//                       <option value="1-month">Within 1 month</option>
//                       <option value="2-3-months">2-3 months</option>
//                       <option value="flexible">Flexible</option>
//                     </select>
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-white/80 mb-2">
//                     Message *
//                   </label>
//                   <textarea
//                     name="message"
//                     value={formData.message}
//                     onChange={handleInputChange}
//                     required
//                     rows={6}
//                     className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/50 focus:border-cyan-400 focus:outline-none transition-all duration-300 resize-none"
//                     placeholder="Tell me about your project, goals, and any specific requirements..."
//                   />
//                 </div>

//                 <motion.button
//                   type="submit"
//                   disabled={isSubmitting}
//                   className="w-full py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl font-semibold text-white shadow-lg hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                 >
//                   {isSubmitting ? (
//                     <div className="flex items-center justify-center gap-3">
//                       <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
//                       Sending Message...
//                     </div>
//                   ) : (
//                     'Send Message'
//                   )}
//                 </motion.button>

//                 {submitStatus === 'success' && (
//                   <motion.div
//                     className="bg-green-500/20 border border-green-500/30 rounded-xl p-4 text-green-400 text-center"
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                   >
//                     Message sent successfully! I'll get back to you within 24 hours.
//                   </motion.div>
//                 )}
//               </form>
//             </div>
//           </motion.div>
//         </div>
//       </div>

//       {/* Footer */}
//       <motion.div 
//         className="text-center mt-16 pt-8 border-t border-white/10"
//         variants={itemVariants}
//       >
//         <p className="text-white/60 text-lg">
//           Let's turn your ideas into reality.
//         </p>
//         <p className="text-white/40 text-sm mt-2">
//           © 2024 Mahdi Delavar. All rights reserved.
//         </p>
//       </motion.div>
//     </motion.section>
//   );
// };

// export default ContactMe;
// !
import React, { useState, useRef, useEffect } from 'react';
import { Icon } from "@iconify/react";

interface ContactMeProps {
  scrollToSection?: (id: string) => void;
}

const ContactMe = ({ scrollToSection }: ContactMeProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    budget: '',
    timeline: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  
  const sectionRef = useRef<HTMLDivElement>(null);

  const contactMethods = [
    {
      id: 'email',
      label: 'Email',
      value: 'mahdi.delavar@email.com',
      icon: 'mingcute:mail-line',
      color: 'from-orange-400 to-red-500',
      description: 'Drop me an email anytime',
      action: 'Copy Email'
    },
    {
      id: 'phone',
      label: 'Phone',
      value: '+98 912 345 6789',
      icon: 'mingcute:phone-line',
      color: 'from-cyan-400 to-teal-500',
      description: 'Call me during work hours',
      action: 'Call Now'
    },
    {
      id: 'telegram',
      label: 'Telegram',
      value: '@mahdi_delavar',
      icon: 'mingcute:send-line',
      color: 'from-blue-400 to-cyan-500',
      description: 'Quick messages and updates',
      action: 'Open Chat'
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      value: 'mahdi-delavar-dev',
      icon: 'mingcute:linkedin-line',
      color: 'from-green-400 to-emerald-500',
      description: 'Professional networking',
      action: 'Connect'
    }
  ];

  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/mahdi-delavar', icon: 'mingcute:github-line', color: 'from-slate-400 to-slate-600' },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/mahdi-delavar', icon: 'mingcute:linkedin-line', color: 'from-blue-400 to-cyan-500' },
    { name: 'Telegram', url: 'https://t.me/mahdi_delavar', icon: 'mingcute:send-line', color: 'from-cyan-400 to-teal-500' },
    { name: 'WhatsApp', url: 'https://wa.me/989123456789', icon: 'mingcute:whatsapp-line', color: 'from-green-400 to-emerald-500' }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        budget: '',
        timeline: ''
      });
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('');
      }, 5000);
    }, 2000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div ref={sectionRef} className="relative min-h-screen py-20 overflow-hidden">
      {/* Background Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-black/50 to-transparent"></div>
      
      {/* Floating Particles Animation */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-orange-400 to-red-500 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
            <span className="text-cyan-400 font-medium tracking-wider text-lg">Contact Me</span>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
          </div>
          <h2 className="text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-slate-200 to-cyan-400 bg-clip-text text-transparent">
              Let's Work Together
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Ready to bring your ideas to life? I'm here to help you create amazing digital experiences.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Column - Contact Information */}
          <div className={`space-y-8 transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
            {/* Contact Methods */}
            <div className="backdrop-blur-md bg-slate-800/30 border border-slate-700/50 rounded-2xl p-8 hover:border-cyan-400/30 transition-all duration-500">
              <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                <Icon icon="mingcute:phone-line" width="32" height="32" className="text-cyan-400" />
                Get In Touch
              </h3>
              <div className="space-y-4">
                {contactMethods.map((method, index) => (
                  <div
                    key={method.id}
                    className="flex items-center gap-4 p-4 bg-slate-700/30 rounded-xl hover:bg-slate-700/50 transition-all duration-300 group cursor-pointer"
                    onClick={() => method.id === 'email' ? copyToClipboard(method.value) : null}
                  >
                    <div className={`w-12 h-12 bg-gradient-to-br ${method.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <Icon icon={method.icon} width="24" height="24" className="text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-semibold">{method.label}</p>
                      <p className="text-slate-400 text-sm">{method.value}</p>
                      <p className="text-slate-500 text-xs mt-1">{method.description}</p>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Icon icon="mingcute:external-link-line" width="16" height="16" className="text-slate-400" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="backdrop-blur-md bg-slate-800/30 border border-slate-700/50 rounded-2xl p-8 hover:border-purple-400/30 transition-all duration-500">
              <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                <Icon icon="mingcute:social-line" width="32" height="32" className="text-purple-400" />
                Connect With Me
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 bg-slate-700/30 rounded-xl hover:bg-slate-700/50 transition-all duration-300 group"
                  >
                    <div className={`w-10 h-10 bg-gradient-to-br ${social.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <Icon icon={social.icon} width="20" height="20" className="text-white" />
                    </div>
                    <span className="text-slate-300 font-medium group-hover:text-white transition-colors duration-300">{social.name}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="backdrop-blur-md bg-slate-800/30 border border-slate-700/50 rounded-2xl p-8 hover:border-green-400/30 transition-all duration-500">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Icon icon="mingcute:lightning-line" width="28" height="28" className="text-green-400" />
                Response Time
              </h3>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { icon: "mingcute:time-line", number: "24h", label: "Email Response", color: "from-cyan-400 to-blue-500" },
                  { icon: "mingcute:phone-line", number: "2h", label: "Call Response", color: "from-green-400 to-emerald-500" },
                  { icon: "mingcute:calendar-line", number: "100%", label: "Meeting Rate", color: "from-purple-400 to-pink-500" },
                  { icon: "mingcute:star-line", number: "5.0", label: "Client Rating", color: "from-orange-400 to-red-500" }
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className={`w-14 h-14 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                      <Icon icon={stat.icon} width="24" height="24" className="text-white" />
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">{stat.number}</div>
                    <div className="text-slate-400 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
            <div className="backdrop-blur-md bg-slate-800/30 border border-slate-700/50 rounded-2xl p-8 hover:border-cyan-400/30 transition-all duration-500">
              <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                <Icon icon="mingcute:mail-line" width="32" height="32" className="text-cyan-400" />
                Send Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 font-medium mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-slate-700/30 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:border-cyan-400 focus:outline-none transition-all duration-300"
                      placeholder="Your Name"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-medium mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-slate-700/30 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:border-cyan-400 focus:outline-none transition-all duration-300"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-slate-700/30 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:border-cyan-400 focus:outline-none transition-all duration-300"
                    placeholder="Project inquiry, collaboration, etc."
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 font-medium mb-2">
                      Budget Range
                    </label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-700/30 border border-slate-600/50 rounded-xl text-white focus:border-cyan-400 focus:outline-none transition-all duration-300"
                    >
                      <option value="">Select Budget</option>
                      <option value="under-5k">Under $5,000</option>
                      <option value="5k-10k">$5,000 - $10,000</option>
                      <option value="10k-25k">$10,000 - $25,000</option>
                      <option value="25k-plus">$25,000+</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-300 font-medium mb-2">
                      Timeline
                    </label>
                    <select
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-700/30 border border-slate-600/50 rounded-xl text-white focus:border-cyan-400 focus:outline-none transition-all duration-300"
                    >
                      <option value="">Select Timeline</option>
                      <option value="asap">ASAP</option>
                      <option value="1-month">Within 1 month</option>
                      <option value="2-3-months">2-3 months</option>
                      <option value="flexible">Flexible</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-2">
                    Project Details *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-slate-700/30 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:border-cyan-400 focus:outline-none transition-all duration-300 resize-none"
                    placeholder="Tell me about your project, goals, and any specific requirements..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative w-full px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold text-white overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/30 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                  <div className="relative flex items-center justify-center gap-3">
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <Icon icon="mingcute:send-line" width="20" height="20" />
                        <span>Send Message</span>
                      </>
                    )}
                  </div>
                </button>

                {submitStatus === 'success' && (
                  <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-4 text-green-400 text-center flex items-center justify-center gap-3">
                    <Icon icon="mingcute:check-circle-line" width="20" height="20" />
                    <span>Message sent successfully! I'll get back to you within 24 hours.</span>
                  </div>
                )}
              </form>
            </div>

            {/* Quick Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => scrollToSection?.("aboutme")}
                className="group relative px-6 py-3 bg-transparent border-2 border-slate-600 rounded-xl font-semibold text-white hover:border-cyan-400 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative flex items-center gap-3">
                  <Icon icon="mingcute:user-line" width="20" height="20" />
                  <span>About Me</span>
                </div>
              </button>
              <button
                onClick={() => scrollToSection?.("experiences")}
                className="group relative px-6 py-3 bg-transparent border-2 border-slate-600 rounded-xl font-semibold text-white hover:border-purple-400 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative flex items-center gap-3">
                  <Icon icon="mingcute:briefcase-line" width="20" height="20" />
                  <span>My Work</span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className={`text-center mt-16 pt-8 border-t border-slate-700/50 transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <p className="text-slate-300 text-lg mb-4">
            Let's turn your ideas into reality.
          </p>
          <p className="text-slate-500 text-sm">
            Available for freelance projects and collaborations worldwide.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactMe;