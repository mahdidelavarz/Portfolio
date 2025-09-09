import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

const Education = () => {
  const [activeTab, setActiveTab] = useState('formal');
  const [selectedCourse, setSelectedCourse] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.3 });
  const controls = useAnimation();

  const formalEducation = [
    {
      degree: "Bachelor of Computer Science",
      institution: "University of Tehran",
      period: "2019 - 2023",
      status: "Graduated",
      grade: "GPA: 3.8/4.0",
      location: "Tehran, Iran",
      description: "Comprehensive study of computer science fundamentals including algorithms, data structures, software engineering, and system design.",
      subjects: [
        "Data Structures & Algorithms",
        "Software Engineering",
        "Database Systems",
        "Computer Networks",
        "Operating Systems",
        "Web Programming",
        "Object-Oriented Programming",
        "System Analysis & Design"
      ],
      projects: [
        {
          name: "E-Learning Platform",
          tech: "React, Node.js, MongoDB",
          description: "Full-stack web application for online learning"
        },
        {
          name: "Task Management System",
          tech: "Java, MySQL, JavaFX",
          description: "Desktop application for project management"
        },
        {
          name: "Network Chat Application",
          tech: "Python, Socket Programming",
          description: "Real-time messaging system"
        }
      ]
    }
  ];

  const onlineCourses = [
    {
      title: "Advanced React Development",
      platform: "Meta Frontend Professional",
      instructor: "Meta Engineers",
      duration: "6 months",
      completed: "2023",
      certificate: "Meta Certified",
      rating: 4.9,
      skills: ["React Hooks", "Context API", "Performance Optimization", "Testing"],
      description: "Comprehensive React course covering advanced patterns, performance optimization, and modern development practices."
    },
    {
      title: "TypeScript Mastery",
      platform: "TypeScript Deep Dive",
      instructor: "Basarat Ali Syed",
      duration: "3 months",
      completed: "2022",
      certificate: "Certified",
      rating: 4.8,
      skills: ["Advanced Types", "Generics", "Decorators", "Module Systems"],
      description: "Deep dive into TypeScript covering advanced type system, patterns, and best practices for large-scale applications."
    },
    {
      title: "Three.js Journey",
      platform: "Three.js Journey",
      instructor: "Bruno Simon",
      duration: "4 months",
      completed: "2023",
      certificate: "Certified",
      rating: 4.9,
      skills: ["3D Graphics", "WebGL", "Shaders", "Animation"],
      description: "Complete course on 3D web development using Three.js, covering everything from basics to advanced techniques."
    },
    {
      title: "Full Stack Web Development",
      platform: "The Odin Project",
      instructor: "Open Source Community",
      duration: "8 months",
      completed: "2021",
      certificate: "Self-Paced",
      rating: 4.7,
      skills: ["JavaScript", "Node.js", "Express", "MongoDB", "Git"],
      description: "Comprehensive full-stack curriculum covering frontend and backend development with practical projects."
    },
    {
      title: "Advanced CSS & Animations",
      platform: "CSS-Tricks & CodePen",
      instructor: "Chris Coyier",
      duration: "2 months",
      completed: "2022",
      certificate: "Community Verified",
      rating: 4.6,
      skills: ["CSS Grid", "Flexbox", "Animations", "Responsive Design"],
      description: "Master level CSS course focusing on modern layout techniques and advanced animations."
    },
    {
      title: "State Management with Zustand",
      platform: "Frontend Masters",
      instructor: "Kent C. Dodds",
      duration: "1 month",
      completed: "2023",
      certificate: "Certified",
      rating: 4.8,
      skills: ["Zustand", "State Patterns", "Performance", "Testing"],
      description: "Modern state management patterns using Zustand for React applications."
    }
  ];

  const certifications = [
    {
      name: "Meta Frontend Developer Professional Certificate",
      issuer: "Meta",
      date: "2023",
      credentialId: "ABC123XYZ",
      skills: ["React", "JavaScript", "HTML/CSS", "Version Control"],
      verified: true
    },
    {
      name: "TypeScript Essential Training",
      issuer: "LinkedIn Learning",
      date: "2022",
      credentialId: "DEF456UVW",
      skills: ["TypeScript", "Advanced Types", "Node.js"],
      verified: true
    },
    {
      name: "Three.js Journey Certificate",
      issuer: "Three.js Journey",
      date: "2023",
      credentialId: "GHI789RST",
      skills: ["Three.js", "WebGL", "3D Graphics"],
      verified: true
    }
  ];

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <motion.section
      ref={ref}
      className="w-full min-h-screen snap-start flex flex-col justify-center px-8 lg:px-16 py-16 text-white relative overflow-hidden"
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${10 + (i % 4) * 25}%`,
              top: `${10 + Math.floor(i / 4) * 25}%`,
              width: '100px',
              height: '100px',
              background: `conic-gradient(from ${i * 30}deg, #00d4ff10, #ff6b6b10, #4ecdc410, #a8e6cf10)`,
              borderRadius: '50%'
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{
              duration: 8 + i,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Header */}
      <motion.div className="text-center mb-16" variants={itemVariants}>
        <h1 className="text-5xl lg:text-7xl font-black mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          EDUCATION
        </h1>
        <p className="text-xl text-white/70 max-w-2xl mx-auto">
          Continuous learning journey in technology and development
        </p>
      </motion.div>

      {/* Tab Navigation */}
      <motion.div 
        className="flex justify-center mb-12" 
        variants={itemVariants}
      >
        <div className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-2 flex gap-2">
          {[
            { id: 'formal', label: 'Formal Education', icon: '🎓' },
            { id: 'online', label: 'Online Courses', icon: '💻' },
            { id: 'certificates', label: 'Certifications', icon: '🏆' }
          ].map((tab) => (
            <button
              key={tab.id}
              className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center gap-3 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-white shadow-lg border border-cyan-500/30'
                  : 'text-white/60 hover:text-white hover:bg-white/10'
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="text-2xl">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Content */}
      <div className="max-w-6xl mx-auto w-full">
        {/* Formal Education */}
        {activeTab === 'formal' && (
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.5 }}
          >
            {formalEducation.map((edu, index) => (
              <div key={index} className="bg-gradient-to-br from-white/10 to-white/[0.02] backdrop-blur-xl border border-white/20 rounded-2xl p-8 mb-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Left Column - Basic Info */}
                  <div className="lg:col-span-1">
                    <div className="text-center lg:text-left">
                      <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-2xl flex items-center justify-center text-3xl mb-6 mx-auto lg:mx-0">
                        🎓
                      </div>
                      <h2 className="text-2xl font-bold mb-2">{edu.degree}</h2>
                      <p className="text-cyan-400 text-lg font-semibold mb-4">{edu.institution}</p>
                      
                      <div className="space-y-3 text-sm">
                        <div className="bg-white/5 rounded-xl p-3">
                          <span className="text-white/60">Period:</span>
                          <span className="ml-2 font-semibold">{edu.period}</span>
                        </div>
                        <div className="bg-white/5 rounded-xl p-3">
                          <span className="text-white/60">Status:</span>
                          <span className="ml-2 font-semibold text-green-400">{edu.status}</span>
                        </div>
                        <div className="bg-white/5 rounded-xl p-3">
                          <span className="text-white/60">Grade:</span>
                          <span className="ml-2 font-semibold">{edu.grade}</span>
                        </div>
                        <div className="bg-white/5 rounded-xl p-3">
                          <span className="text-white/60">Location:</span>
                          <span className="ml-2 font-semibold">{edu.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Middle Column - Subjects */}
                  <div className="lg:col-span-1">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <span className="text-purple-400">📚</span>
                      Core Subjects
                    </h3>
                    <div className="space-y-2">
                      {edu.subjects.map((subject, idx) => (
                        <motion.div
                          key={subject}
                          className="bg-white/5 border border-white/10 rounded-xl p-3 hover:border-white/30 transition-all duration-300"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          whileHover={{ x: 5 }}
                        >
                          <span className="text-white/80">{subject}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Right Column - Projects */}
                  <div className="lg:col-span-1">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <span className="text-pink-400">🚀</span>
                      Major Projects
                    </h3>
                    <div className="space-y-4">
                      {edu.projects.map((project, idx) => (
                        <motion.div
                          key={project.name}
                          className="bg-white/5 border border-white/10 rounded-xl p-4 hover:border-white/30 transition-all duration-300"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.15 }}
                          whileHover={{ y: -2 }}
                        >
                          <h4 className="font-semibold text-white mb-2">{project.name}</h4>
                          <p className="text-cyan-400 text-sm font-medium mb-2">{project.tech}</p>
                          <p className="text-white/70 text-sm">{project.description}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Online Courses */}
        {activeTab === 'online' && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            {onlineCourses.map((course, index) => (
              <motion.div
                key={course.title}
                className="bg-gradient-to-br from-white/10 to-white/[0.02] backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:border-white/40 transition-all duration-300 group"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0, 212, 255, 0.1)' }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-xl flex items-center justify-center text-2xl">
                    💻
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 mb-1">
                      <span className="text-yellow-400">★</span>
                      <span className="text-sm font-semibold">{course.rating}</span>
                    </div>
                    <span className="text-xs text-white/60">{course.completed}</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold mb-2 group-hover:text-cyan-400 transition-colors duration-300">
                  {course.title}
                </h3>
                <p className="text-white/60 text-sm mb-3">{course.platform}</p>
                <p className="text-white/80 text-sm mb-4 line-clamp-3">{course.description}</p>

                <div className="flex justify-between items-center mb-4 text-xs text-white/60">
                  <span>{course.duration}</span>
                  <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
                    {course.certificate}
                  </span>
                </div>

                <div className="flex flex-wrap gap-1">
                  {course.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs px-2 py-1 bg-white/10 rounded-full text-white/80 hover:bg-cyan-500/20 hover:text-cyan-400 transition-all duration-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Certifications */}
        {activeTab === 'certificates' && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.name}
                className="bg-gradient-to-br from-white/10 to-white/[0.02] backdrop-blur-xl border border-white/20 rounded-2xl p-8 hover:border-white/40 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0">
                    🏆
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-white leading-tight">{cert.name}</h3>
                      {cert.verified && (
                        <div className="bg-green-500/20 border border-green-500/30 rounded-full px-3 py-1 flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                          <span className="text-green-400 text-xs font-medium">Verified</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between">
                        <span className="text-white/60">Issuer:</span>
                        <span className="font-semibold text-cyan-400">{cert.issuer}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Date:</span>
                        <span className="font-semibold">{cert.date}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Credential ID:</span>
                        <span className="font-mono text-sm text-white/80">{cert.credentialId}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {cert.skills.map((skill) => (
                        <span
                          key={skill}
                          className="text-xs px-3 py-1 bg-white/10 border border-white/20 rounded-full text-white/80 hover:border-cyan-400 hover:text-cyan-400 transition-all duration-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Learning Stats */}
      <motion.div
        className="absolute bottom-8 left-8 bg-black/70 backdrop-blur-xl border border-white/20 rounded-2xl p-6"
        variants={itemVariants}
      >
        <h4 className="font-bold text-center mb-4">Learning Stats</h4>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-cyan-400">15+</div>
            <div className="text-xs text-white/60">Courses</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-400">500+</div>
            <div className="text-xs text-white/60">Study Hours</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-pink-400">10+</div>
            <div className="text-xs text-white/60">Certificates</div>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default Education;