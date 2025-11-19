import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Clock, MapPin, Users, Award, TrendingUp, Shield, Zap, ArrowRight, Check, Twitter, Linkedin, Facebook, Instagram, Mail, Phone, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import logoImage from '../assets/logo.png';
import inotechLogo from '../assets/inotech.png';

const CTISummitLanding: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const [expandedSchedule, setExpandedSchedule] = useState<Set<number>>(new Set());
  const [currentSpeakerIndex, setCurrentSpeakerIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [autoSlidePaused, setAutoSlidePaused] = useState(false);
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const speakerSliderRef = useRef<HTMLDivElement>(null);

  // Loading effect - longer duration to showcase logo
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000); // Increased to 4 seconds for better logo visibility
    return () => clearTimeout(timer);
  }, []);

  // Scroll handler for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-50px 0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute('data-section-id');
          if (sectionId) {
            setVisibleSections((prev) => new Set(prev).add(sectionId));
          }
        }
      });
    }, observerOptions);

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      Object.values(sectionRefs.current).forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  const speakers = [
    {
      name: 'Muhammad Maad',
      role: 'Chief Information Security Officer',
      company: 'Faysal Bank',
      image: '/people/maad.jpeg',
      bio: 'Strategic security leader driving information security initiatives at Faysal Bank. Specializes in banking security frameworks, threat intelligence, and building resilient cybersecurity programs for financial institutions.',
    },
    {
      name: 'Muhammad Ali Manzer',
      role: 'Chief Information Security Officer',
      company: 'Bank of Punjab',
      image: '/people/alimanzar.jpeg',
      bio: 'CISO responsible for safeguarding Bank of Punjab\'s digital assets and customer data. Expert in financial cybersecurity, risk management, and implementing comprehensive security controls in banking environments.',
    },
    {
      name: 'Dr. Haider Abbas',
      role: 'Director Cyber Security',
      company: 'NUST / National Research Leader',
      image: '/people/haiderabbas.jpeg',
      bio: 'Renowned cybersecurity researcher and Director at NUST. National research leader in cybersecurity, contributing to Pakistan\'s cybersecurity strategy, research, and development of next-generation security technologies.',
    },
    {
      name: 'Dr. Mehreen Afzal',
      role: 'Professor of Cyber Security & Former HoD',
      company: 'Air University',
      image: '/people/mehreenafzal.jpeg',
      bio: 'Distinguished Professor and former Head of Department at Air University. Leading academic in cybersecurity education, research, and developing the next generation of cybersecurity professionals in Pakistan.',
    },
    {
      name: 'Wahaj Siraj',
      role: 'Chief Executive Officer',
      company: 'Nayatel',
      image: '/people/wahaj.jpeg',
      bio: 'CEO of Nayatel, Pakistan\'s leading fiber-optic telecommunications provider. Visionary leader in telecommunications security, infrastructure protection, and building secure, resilient network systems.',
    },
  ];

  const handleDragStart = (clientX: number) => {
    setIsDragging(true);
    setDragStartX(clientX);
    setDragOffset(0);
    setAutoSlidePaused(true);
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging) return;
    const offset = clientX - dragStartX;
    setDragOffset(offset);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    
    const threshold = 100; // Minimum drag distance to trigger slide
    
    if (Math.abs(dragOffset) > threshold) {
      if (dragOffset > 0) {
        prevSpeaker();
      } else {
        nextSpeaker();
      }
    }
    
    setIsDragging(false);
    setDragOffset(0);
    setDragStartX(0);
    
    // Resume auto-slide after a delay
    setTimeout(() => {
      setAutoSlidePaused(false);
    }, 2000);
  };

  // Global mouse event listeners for better drag handling
  useEffect(() => {
    if (!isDragging) return;

    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const offset = e.clientX - dragStartX;
        setDragOffset(offset);
      }
    };

    const handleGlobalMouseUp = () => {
      if (!isDragging) return;
      
      const threshold = 100;
      
      if (Math.abs(dragOffset) > threshold) {
        if (dragOffset > 0) {
          setCurrentSpeakerIndex((prev) => (prev - 1 + speakers.length) % speakers.length);
        } else {
          setCurrentSpeakerIndex((prev) => (prev + 1) % speakers.length);
        }
      }
      
      setIsDragging(false);
      setDragOffset(0);
      setDragStartX(0);
      
      setTimeout(() => {
        setAutoSlidePaused(false);
      }, 2000);
    };

    window.addEventListener('mousemove', handleGlobalMouseMove);
    window.addEventListener('mouseup', handleGlobalMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging, dragStartX, dragOffset, speakers.length]);

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleDragStart(e.clientX);
  };

  const handleMouseMove = () => {
    // Handled by global listener
  };

  const handleMouseUp = () => {
    // Handled by global listener
  };

  const handleMouseLeave = () => {
    // Handled by global listener
  };

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    handleDragStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging) {
      e.preventDefault(); // Prevent scrolling while dragging
      handleDragMove(e.touches[0].clientX);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault();
    handleDragEnd();
  };

  const schedule = [
    {
      time: '09:00 - 09:30',
      title: 'Registration & Networking Breakfast',
      type: 'Networking',
      description: 'Welcome reception with continental breakfast. Network with fellow CISOs and security leaders while enjoying refreshments.',
    },
    {
      time: '09:30 - 10:15',
      title: 'Opening Keynote: The Future of Threat Intelligence',
      speaker: 'Dr. Sarah Chen',
      type: 'Keynote',
      description: 'Explore emerging trends in threat intelligence and how CISOs can leverage advanced analytics to stay ahead of evolving cyber threats.',
    },
    {
      time: '10:15 - 10:30',
      title: 'Coffee Break',
      type: 'Break',
      description: 'Refreshment break with networking opportunities.',
    },
    {
      time: '10:30 - 11:30',
      title: 'Panel Discussion: Evolving Threat Landscape',
      speakers: ['Michael Rodriguez', 'Dr. Emily Watson', 'James Thompson'],
      type: 'Panel',
      description: 'Expert panel discussion on current threat vectors, attack patterns, and strategic defense approaches for enterprise security.',
    },
    {
      time: '11:30 - 12:30',
      title: 'Workshop: Building Effective Threat Intelligence Programs',
      speaker: 'Michael Rodriguez',
      type: 'Workshop',
      description: 'Hands-on workshop covering best practices for establishing and scaling threat intelligence capabilities within your organization.',
    },
    {
      time: '12:30 - 13:30',
      title: 'Lunch & Networking',
      type: 'Networking',
      description: 'Catered lunch session with dedicated networking time to connect with peers and industry experts.',
    },
    {
      time: '13:30 - 14:30',
      title: 'AI-Powered Threat Detection',
      speaker: 'Dr. Emily Watson',
      type: 'Presentation',
      description: 'Learn how artificial intelligence and machine learning are revolutionizing threat detection and response capabilities.',
    },
    {
      time: '14:30 - 15:30',
      title: 'Advanced Threat Hunting Techniques',
      speaker: 'James Thompson',
      type: 'Presentation',
      description: 'Deep dive into proactive threat hunting methodologies and techniques for identifying advanced persistent threats.',
    },
    {
      time: '15:30 - 16:00',
      title: 'Afternoon Break',
      type: 'Break',
      description: 'Afternoon refreshment break.',
    },
    {
      time: '16:00 - 17:00',
      title: 'Closing Keynote: Next-Generation Security',
      speaker: 'Dr. Sarah Chen',
      type: 'Keynote',
      description: 'Closing session on the future of cybersecurity leadership and how CISOs can prepare for tomorrow\'s security challenges.',
    },
  ];

  const toggleSchedule = (index: number) => {
    setExpandedSchedule((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const nextSpeaker = () => {
    setCurrentSpeakerIndex((prev) => (prev + 1) % speakers.length);
  };

  const prevSpeaker = () => {
    setCurrentSpeakerIndex((prev) => (prev - 1 + speakers.length) % speakers.length);
  };

  const goToSpeaker = (index: number) => {
    setCurrentSpeakerIndex(index);
  };

  const sponsors = [
    { name: 'Inotech', tier: 'Platinum', logo: 'Inotech', image: inotechLogo },
    { name: 'TechCorp', tier: 'Platinum', logo: 'TC' },
    { name: 'SecureNet', tier: 'Gold', logo: 'SN' },
    { name: 'CyberShield', tier: 'Gold', logo: 'CS' },
    { name: 'DataGuard', tier: 'Silver', logo: 'DG' },
    { name: 'ThreatWatch', tier: 'Silver', logo: 'TW' },
    { name: 'InfoSec Pro', tier: 'Silver', logo: 'IP' },
  ];

  const features = [
    {
      icon: Shield,
      title: 'Threat Intelligence',
      description: 'Learn cutting-edge techniques for identifying and mitigating cyber threats.',
    },
    {
      icon: TrendingUp,
      title: 'Industry Trends',
      description: 'Stay ahead with insights into the latest security trends and technologies.',
    },
    {
      icon: Users,
      title: 'Networking',
      description: 'Connect with industry leaders, experts, and peers in cybersecurity.',
    },
    {
      icon: Award,
      title: 'Expert Speakers',
      description: 'Learn from renowned professionals with years of real-world experience.',
    },
  ];

  // Helper function to check if section is visible
  const isSectionVisible = (sectionId: string) => visibleSections.has(sectionId);

  // Helper function to set section ref
  const setSectionRef = (sectionId: string) => (el: HTMLDivElement | null) => {
    sectionRefs.current[sectionId] = el;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a] text-white">
      {/* Loading Screen */}
      {isLoading && (
        <div className={`fixed inset-0 z-[100] bg-gradient-to-b from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a] flex items-center justify-center transition-opacity duration-1000 ${
          isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}>
          <div className="text-center">
            {/* 3D Large Logo with Enhanced Effects */}
            <div 
              className="relative mx-auto mb-16 flex items-center justify-center"
              style={{ 
                perspective: '1000px',
                perspectiveOrigin: 'center center'
              }}
            >
              {/* 3D Logo Container with Transform - Square Frame */}
              <div 
                className="relative z-10 w-96 h-96 md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] flex items-center justify-center"
                style={{
                  transform: 'translateZ(50px) rotateY(-5deg)',
                  transformStyle: 'preserve-3d',
                  animation: 'float3D 3s ease-in-out infinite'
                }}
              >
                {/* Multiple Shadow Layers for 3D Depth */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#3B9EFF]/20 via-gray-300/15 to-[#3B9EFF]/20 rounded-2xl blur-3xl" style={{ transform: 'translateZ(-100px)' }}></div>
                <div className="absolute inset-0 bg-gradient-to-br from-[#3B9EFF]/15 to-gray-300/10 rounded-2xl blur-2xl" style={{ transform: 'translateZ(-50px)' }}></div>
                
                {/* Square Frame Container */}
                <div 
                  className="relative w-full h-full flex items-center justify-center rounded-2xl overflow-hidden"
                  style={{
                    transform: 'translateZ(0px)',
                    transformStyle: 'preserve-3d',
                    background: 'linear-gradient(135deg, rgba(26, 26, 26, 0.95) 0%, rgba(42, 42, 42, 0.95) 100%)',
                    boxShadow: 'inset 0 0 60px rgba(0, 0, 0, 0.5), 0 0 100px rgba(59, 158, 255, 0.3)'
                  }}
                >
                  {/* Square Glowing Border */}
                  <div 
                    className="absolute inset-0 rounded-2xl border-4"
                    style={{
                      borderColor: 'rgba(59, 158, 255, 0.5)',
                      transform: 'translateZ(25px)',
                      boxShadow: 'inset 0 0 40px rgba(59, 158, 255, 0.4), 0 0 80px rgba(59, 158, 255, 0.3), 0 0 120px rgba(59, 158, 255, 0.2)',
                      background: 'linear-gradient(135deg, rgba(59, 158, 255, 0.1) 0%, rgba(200, 200, 200, 0.05) 100%)'
                    }}
                  ></div>
                  
                  {/* Inner Glow Square */}
                  <div className="absolute inset-4 rounded-xl" style={{ background: 'radial-gradient(ellipse at center, rgba(59, 158, 255, 0.2) 0%, rgba(59, 158, 255, 0.05) 50%, transparent 100%)' }}></div>
                  
                  {/* Logo Image - Rotating 3D inside Square */}
                  <div 
                    className="relative w-[85%] h-[85%] flex items-center justify-center overflow-hidden"
                    style={{
                      transformStyle: 'preserve-3d',
                      perspective: '1000px'
                    }}
                  >
                    <img 
                      src={logoImage} 
                      alt="CISO Conclave Logo" 
                      className="w-full h-full object-contain"
                      style={{ 
                        filter: 'drop-shadow(0 0 40px rgba(59, 158, 255, 0.6)) drop-shadow(0 15px 30px rgba(0, 0, 0, 0.4))',
                        transform: 'translateZ(50px)',
                        animation: 'rotate3D 8s linear infinite',
                        transformStyle: 'preserve-3d'
                      }}
                    />
                  </div>
                  
                  {/* Top Highlight for 3D Effect - Square */}
                  <div 
                    className="absolute top-0 left-0 right-0 h-1/2 rounded-t-2xl"
                    style={{ 
                      background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.15) 0%, transparent 70%)',
                      transform: 'translateZ(30px)'
                    }}
                  ></div>
                  
                  {/* Bottom Shadow for 3D Depth */}
                  <div 
                    className="absolute bottom-0 left-0 right-0 h-1/2 rounded-b-2xl"
                    style={{ 
                      background: 'linear-gradient(to top, rgba(0, 0, 0, 0.3) 0%, transparent 70%)',
                      transform: 'translateZ(-10px)'
                    }}
                  ></div>
                </div>
              </div>
            </div>
            
            {/* Title Below Logo - Delayed Appearance */}
            <h2 
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
              style={{ 
                transitionDelay: '2000ms',
                animation: 'fadeInUp 1s ease-out 2s both',
                textShadow: '0 0 30px rgba(59, 158, 255, 0.5), 0 0 60px rgba(59, 158, 255, 0.3)'
              }}
            >
              <span className="text-[#3B9EFF]">CISO</span>{' '}
              <span className="text-gray-300">CONCLAVE</span>{' '}
              <span className="text-[#3B9EFF]">2025</span>
            </h2>
            <p 
              className="text-gray-400 mt-6 text-xl md:text-2xl"
              style={{ 
                transitionDelay: '2500ms',
                animation: 'fadeInUp 1s ease-out 2.5s both'
              }}
            >
              Loading...
            </p>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-[#1a1a1a]/98 backdrop-blur-2xl border-b border-[#3B9EFF]/20 shadow-2xl shadow-[#3B9EFF]/10' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            <div className="flex items-center space-x-4 group cursor-pointer">
              <div className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#3B9EFF]/10 to-gray-300/10 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <img 
                  src={logoImage} 
                  alt="CISO Conclave Logo" 
                  className="w-full h-full object-contain drop-shadow-xl relative z-10"
                  style={{ filter: '' }}
                />
              </div>
              <span className="text-2xl md:text-3xl font-bold tracking-tight">
                <span className="text-[#3B9EFF]">CISO</span>{' '}
                <span className="text-gray-300">CONCLAVE</span>{' '}
                <span className="text-[#3B9EFF]">2025</span>
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-10">
              <a href="#about" className="text-gray-300 hover:text-white transition-all duration-300 font-medium text-sm uppercase tracking-wide hover:scale-105 relative group">
                About
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#3B9EFF] to-gray-300 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href="#speakers" className="text-gray-300 hover:text-white transition-all duration-300 font-medium text-sm uppercase tracking-wide hover:scale-105 relative group">
                Speakers
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#3B9EFF] to-gray-300 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href="#schedule" className="text-gray-300 hover:text-white transition-all duration-300 font-medium text-sm uppercase tracking-wide hover:scale-105 relative group">
                Schedule
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#3B9EFF] to-gray-300 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href="#sponsors" className="text-gray-300 hover:text-white transition-all duration-300 font-medium text-sm uppercase tracking-wide hover:scale-105 relative group">
                Sponsors
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#3B9EFF] to-gray-300 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href="#register" className="btn-primary shadow-lg shadow-[#3B9EFF]/30 hover:shadow-xl hover:shadow-[#3B9EFF]/40">Register Now</a>
            </div>
            <button className="md:hidden text-gray-300">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section 
        className={`relative pt-40 pb-28 px-4 sm:px-6 lg:px-8 overflow-hidden transition-all duration-1000 ${
          !isLoading ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-96 h-96 bg-[#3B9EFF]/25 rounded-full blur-3xl animate-pulse floating-orb"></div>
          <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-gray-400/20 rounded-full blur-3xl animate-pulse drift-orb"></div>
          <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-[#3B9EFF]/15 rounded-full blur-3xl sparkle-orb"></div>
          <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-gray-300/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center">
            <div className={`inline-flex items-center space-x-3 bg-gradient-to-r from-[#3B9EFF]/20 via-gray-300/20 to-[#3B9EFF]/20 border-2 border-[#3B9EFF]/40 rounded-full px-6 py-3 mb-6 shadow-lg shadow-[#3B9EFF]/20 backdrop-blur-sm transition-all duration-1000 hover:scale-105 hover:border-[#3B9EFF]/60 ${
              !isLoading ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
            }`} style={{ transitionDelay: '200ms' }}>
              <div className="relative">
                <Calendar className="w-5 h-5 text-[#3B9EFF] drop-shadow-lg" />
                <div className="absolute inset-0 w-5 h-5 text-[#3B9EFF] animate-ping opacity-20">
                  <Calendar className="w-5 h-5" />
                </div>
              </div>
              <span className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#3B9EFF] via-gray-300 to-[#3B9EFF] tracking-wide">December 3, 2025</span>
            </div>
            <h1 className={`text-6xl md:text-8xl font-extrabold mb-8 leading-tight transition-all duration-1000 ${
              !isLoading ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`} style={{ transitionDelay: '400ms', textShadow: '0 0 60px rgba(59, 158, 255, 0.4), 0 0 100px rgba(59, 158, 255, 0.3)' }}>
              <span className="text-[#3B9EFF]">CISO</span>{' '}
              <span className="text-gray-300">CONCLAVE</span>
              <br />
              <span className="text-[#3B9EFF]">
              SUMMIT 2025 
              </span>
            </h1>
            <p className={`text-xl md:text-2xl text-gray-300 mb-6 max-w-4xl mx-auto leading-relaxed transition-all duration-1000 ${
              !isLoading ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`} style={{ transitionDelay: '600ms' }}>
              Join Chief Information Security Officers and industry leaders for a premier conclave 
              featuring cutting-edge insights, strategic threat intelligence and executive-level 
              networking in cybersecurity.
            </p>
            <p className={`text-base md:text-lg text-[#3B9EFF] mb-10 font-semibold transition-all duration-1000 ${
              !isLoading ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`} style={{ transitionDelay: '700ms' }}>
              Organized by <span className="text-gray-300">Cyber Division</span>
            </p>
            <div className={`flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 transition-all duration-1000 ${
              !isLoading ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`} style={{ transitionDelay: '800ms' }}>
              <a href="#register" className="btn-primary inline-flex items-center space-x-2 group hover:scale-105 transition-transform duration-300">
                <span>Register Now</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#about" className="btn-secondary inline-flex items-center space-x-2 hover:scale-105 transition-transform duration-300">
                <span>Learn More</span>
              </a>
            </div>
            <div className={`mt-20 flex flex-wrap items-center justify-center gap-6 md:gap-8 transition-all duration-1000 ${
              !isLoading ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`} style={{ transitionDelay: '1000ms' }}>
              {/* Location Card */}
              <div className="group relative flex items-center space-x-4 bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-xl border-2 border-[#3B9EFF]/30 rounded-2xl px-8 py-5 hover:bg-gradient-to-br hover:from-white/15 hover:via-white/10 hover:to-white/15 transition-all duration-300 hover:scale-110 hover:border-[#3B9EFF]/60 hover:shadow-2xl hover:shadow-[#3B9EFF]/30">
                <div className="relative">
                  <div className="absolute inset-0 bg-[#3B9EFF]/20 rounded-full blur-lg group-hover:bg-[#3B9EFF]/30 transition-colors"></div>
                  <MapPin className="relative w-8 h-8 md:w-10 md:h-10 text-[#3B9EFF] drop-shadow-lg" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs md:text-sm font-semibold text-gray-400 uppercase tracking-wider mb-1">Location</span>
                  <span className="text-lg md:text-xl font-bold text-white">Mcs Qasid Complex</span>
                  <span className="text-sm md:text-base text-gray-300">Rawalpindi</span>
                </div>
              </div>
              
              {/* Duration Card */}
              <div className="group relative flex items-center space-x-4 bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-xl border-2 border-gray-300/30 rounded-2xl px-8 py-5 hover:bg-gradient-to-br hover:from-white/15 hover:via-white/10 hover:to-white/15 transition-all duration-300 hover:scale-110 hover:border-gray-300/60 hover:shadow-2xl hover:shadow-gray-300/30">
                <div className="relative">
                  <div className="absolute inset-0 bg-gray-300/20 rounded-full blur-lg group-hover:bg-gray-300/30 transition-colors"></div>
                  <Clock className="relative w-8 h-8 md:w-10 md:h-10 text-gray-300 drop-shadow-lg" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs md:text-sm font-semibold text-gray-400 uppercase tracking-wider mb-1">Duration</span>
                  <span className="text-lg md:text-xl font-bold text-white">1 Day</span>
                  <span className="text-sm md:text-base text-gray-300">Full Event</span>
                </div>
              </div>
              
              {/* Attendees Card */}
              <div className="group relative flex items-center space-x-4 bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-xl border-2 border-[#3B9EFF]/30 rounded-2xl px-8 py-5 hover:bg-gradient-to-br hover:from-white/15 hover:via-white/10 hover:to-white/15 transition-all duration-300 hover:scale-110 hover:border-[#3B9EFF]/60 hover:shadow-2xl hover:shadow-[#3B9EFF]/30">
                <div className="relative">
                  <div className="absolute inset-0 bg-[#3B9EFF]/20 rounded-full blur-lg group-hover:bg-[#3B9EFF]/30 transition-colors"></div>
                  <Users className="relative w-8 h-8 md:w-10 md:h-10 text-[#3B9EFF] drop-shadow-lg" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs md:text-sm font-semibold text-gray-400 uppercase tracking-wider mb-1">Attendees</span>
                  <span className="text-lg md:text-xl font-bold text-white">100+</span>
                  <span className="text-sm md:text-base text-gray-300">Professionals</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section 
        ref={setSectionRef('features')}
        data-section-id="features"
        className={`py-20 px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${
          isSectionVisible('features') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index} 
                  className={`card p-6 text-center transition-all duration-700 hover:scale-105 ${
                    isSectionVisible('features') 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-10'
                  }`}
                  style={{
                    transitionDelay: `${index * 100}ms`
                  }}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-[#3B9EFF] to-gray-400 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#3B9EFF]/30">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section 
        id="about"
        ref={setSectionRef('about')}
        data-section-id="about"
        className={`relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent via-white/5 to-transparent transition-all duration-1000 overflow-hidden ${
          isSectionVisible('about') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-96 h-96 bg-[#3B9EFF]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-gray-300/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="text-sm font-semibold text-[#3B9EFF] uppercase tracking-wider">About The Event</span>
            </div>
            <h2 className={`text-5xl md:text-6xl font-extrabold mb-6 transition-all duration-1000 ${
              isSectionVisible('about') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <span className="text-white">About </span>
              <span className="text-[#3B9EFF]">CISO</span>{' '}
              <span className="text-gray-300">CONCLAVE</span>
              <br />
              <span className="text-[#3B9EFF]">
                2025
              </span>
            </h2>
            <p className={`text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed transition-all duration-1000 ${
              isSectionVisible('about') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`} style={{ transitionDelay: '200ms' }}>
              The premier CISO Conclave bringing together Chief Information Security Officers, 
              cybersecurity professionals, threat intelligence analysts, and security leaders.
            </p>
            <p className={`text-base md:text-lg text-[#3B9EFF] mt-4 font-semibold transition-all duration-1000 ${
              isSectionVisible('about') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`} style={{ transitionDelay: '300ms' }}>
              Organized by <span className="text-gray-300">Cyber Division</span>
            </p>
          </div>
          
          <div className="mb-16">
            <div className="relative group">
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#3B9EFF] via-gray-300 to-[#3B9EFF] rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
              
              <div className="relative card p-10 md:p-12 backdrop-blur-xl bg-gradient-to-br from-white/10 via-white/5 to-white/10 border border-white/10 shadow-2xl">
                <div className="flex items-center justify-center mb-8">
                  <div className="w-16 h-1 bg-gradient-to-r from-transparent via-[#3B9EFF] to-transparent"></div>
                  <h3 className="text-3xl md:text-4xl font-bold mx-4 bg-gradient-to-r from-[#3B9EFF] via-gray-300 to-[#3B9EFF] bg-clip-text text-transparent">
                    Central Topic & Theme
                  </h3>
                  <div className="w-16 h-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                </div>
                
                <div className="space-y-8">
                  <div className="relative">
                    <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-[#3B9EFF] to-gray-300 rounded-full"></div>
                    <div className="pl-6">
                      <h4 className="text-xl md:text-2xl font-bold mb-4 bg-gradient-to-r from-[#3B9EFF] to-cyan-300 bg-clip-text text-transparent">
                        Central Topic
                      </h4>
                      <div className="relative">
                        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#3B9EFF]/50 to-gray-300/50"></div>
                            <p className="text-gray-200 text-lg md:text-xl leading-relaxed pl-6 italic font-light">
                              "Fortifying Pakistan's Digital Future: Building Resilience Against Cyber Threats"
                            </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative pt-8 border-t border-white/10">
                    <div className="absolute -left-4 top-8 bottom-0 w-1 bg-gradient-to-b from-gray-300 to-[#3B9EFF] rounded-full"></div>
                    <div className="pl-6">
                      <h4 className="text-xl md:text-2xl font-bold mb-6 bg-gradient-to-r from-gray-300 to-[#3B9EFF] bg-clip-text text-transparent">
                        Theme & Scope
                      </h4>
                      <p className="text-gray-300 text-lg leading-relaxed mb-8">
                        The CISO Conclave 2025 focuses on empowering security executives 
                        and leaders with actionable threat intelligence, strategic insights, and 
                        innovative defense methodologies. Our comprehensive scope encompasses:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                          { title: 'Strategic Threat Intelligence', desc: 'Building and leveraging threat intelligence programs that drive executive decision-making and organizational resilience' },
                          { title: 'Advanced Persistent Threats (APTs)', desc: 'Understanding, detecting, and defending against sophisticated nation-state and criminal threat actors' },
                          { title: 'AI-Powered Security', desc: 'Leveraging artificial intelligence and machine learning for threat detection, analysis, and automated response' },
                          { title: 'Zero Trust Architecture', desc: 'Implementing comprehensive zero-trust frameworks and identity-centric security models' },
                          { title: 'Incident Response & Crisis Management', desc: 'Building effective response capabilities and executive communication strategies during security incidents' },
                          { title: 'Regulatory Compliance & Risk Management', desc: 'Navigating complex regulatory landscapes while maintaining security posture' },
                          { title: 'Supply Chain Security', desc: 'Managing third-party risks and securing the extended enterprise ecosystem' },
                          { title: 'Executive Leadership', desc: 'Communicating security value to boards, managing budgets, and building security-first organizational cultures' },
                        ].map((item, index) => (
                          <div 
                            key={index}
                            className="group relative p-5 rounded-xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 hover:border-[#3B9EFF]/30 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#3B9EFF]/10"
                          >
                            <div className="flex items-start space-x-3">
                              <div className="flex-shrink-0 mt-1">
                                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-lg shadow-green-500/30">
                                  <Check className="w-4 h-4 text-white" />
                                </div>
                              </div>
                              <div className="flex-1">
                                <h5 className="font-semibold text-white mb-2 group-hover:text-[#3B9EFF] transition-colors">
                                  {item.title}
                                </h5>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                  {item.desc}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Why Attend Section */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#3B9EFF] to-gray-300 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
              <div className="relative card p-8 backdrop-blur-xl bg-gradient-to-br from-white/10 via-white/5 to-white/10 border border-white/10">
                <div className="flex items-center mb-6">
                  <div className="w-1 h-8 bg-gradient-to-b from-[#3B9EFF] to-gray-300 rounded-full mr-4"></div>
                  <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#3B9EFF] to-gray-300 bg-clip-text text-transparent">
                    Why Attend?
                  </h3>
                </div>
                <ul className="space-y-5">
                  {[
                    'Learn from industry-leading CISOs and security executives',
                    'Discover the latest threat intelligence tools and techniques',
                    'Network with peers and industry leaders',
                    'Gain insights into emerging threats and attack vectors',
                    'Participate in hands-on workshops and training sessions',
                    'Access exclusive research and case studies',
                  ].map((item, index) => (
                    <li key={index} className="group/item flex items-start space-x-4 hover:translate-x-1 transition-transform duration-300">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-lg shadow-green-500/30 group-hover/item:scale-110 transition-transform duration-300">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      </div>
                      <span className="text-gray-300 text-base leading-relaxed group-hover/item:text-white transition-colors">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* Event Highlights Section */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-300 to-[#3B9EFF] rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
              <div className="relative card p-8 backdrop-blur-xl bg-gradient-to-br from-white/10 via-white/5 to-white/10 border border-white/10">
                <div className="flex items-center mb-6">
                  <div className="w-1 h-8 bg-gradient-to-b from-gray-300 to-[#3B9EFF] rounded-full mr-4"></div>
                  <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-300 to-[#3B9EFF] bg-clip-text text-transparent">
                    Event Highlights
                  </h3>
                </div>
                <div className="space-y-5">
                  <div className="group/item flex items-center space-x-4 p-4 rounded-xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 hover:border-[#3B9EFF]/30 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02]">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#3B9EFF]/20 to-[#3B9EFF]/30 rounded-xl flex items-center justify-center border border-[#3B9EFF]/30 group-hover/item:scale-110 transition-transform duration-300 shadow-lg shadow-[#3B9EFF]/20">
                      <Users className="w-7 h-7 text-[#3B9EFF]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-white mb-1">100+ Professionals</h4>
                      <p className="text-gray-400 text-sm">Connect with industry leaders</p>
                    </div>
                  </div>
                  <div className="group/item flex items-center space-x-4 p-4 rounded-xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 hover:border-gray-300/30 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02]">
                    <div className="w-14 h-14 bg-gradient-to-br from-gray-300/20 to-gray-400/20 rounded-xl flex items-center justify-center border border-gray-300/30 group-hover/item:scale-110 transition-transform duration-300 shadow-lg shadow-gray-300/20">
                      <Award className="w-7 h-7 text-gray-300" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-white mb-1">15+ Expert Speakers</h4>
                      <p className="text-gray-400 text-sm">Learn from the best in the field</p>
                    </div>
                  </div>
                  <div className="group/item flex items-center space-x-4 p-4 rounded-xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 hover:border-[#3B9EFF]/30 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02]">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#3B9EFF]/20 to-[#3B9EFF]/30 rounded-xl flex items-center justify-center border border-[#3B9EFF]/30 group-hover/item:scale-110 transition-transform duration-300 shadow-lg shadow-[#3B9EFF]/20">
                      <Zap className="w-7 h-7 text-[#3B9EFF]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-white mb-1">20+ Sessions</h4>
                      <p className="text-gray-400 text-sm">Keynotes, panels, and workshops</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Speakers Section */}
      <section 
        id="speakers"
        ref={setSectionRef('speakers')}
        data-section-id="speakers"
        className={`relative py-24 px-4 sm:px-6 lg:px-8 transition-all duration-1000 overflow-hidden ${
          isSectionVisible('speakers') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-96 h-96 bg-gray-300/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#3B9EFF]/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="text-sm font-semibold text-[#3B9EFF] uppercase tracking-wider">Our Experts</span>
            </div>
            <h2 className={`text-5xl md:text-6xl font-extrabold mb-6 transition-all duration-1000 ${
              isSectionVisible('speakers') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <span className="bg-gradient-to-r from-white via-[#3B9EFF] to-gray-300 bg-clip-text text-transparent">
                Featured Speakers
              </span>
            </h2>
            <p className={`text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 ${
              isSectionVisible('speakers') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`} style={{ transitionDelay: '200ms' }}>
              Learn from industry experts and thought leaders in cybersecurity and threat intelligence.
            </p>
          </div>

          {/* 3D Carousel Container */}
          <div className="relative">
            {/* Navigation Buttons */}
            <button
              onClick={prevSpeaker}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-30 w-14 h-14 rounded-full bg-gradient-to-br from-[#3B9EFF]/90 to-gray-300/90 backdrop-blur-xl border border-white/20 flex items-center justify-center shadow-2xl hover:scale-110 transition-all duration-300 hover:shadow-[#3B9EFF]/50 group"
              aria-label="Previous speaker"
            >
              <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
            </button>
            <button
              onClick={nextSpeaker}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-30 w-14 h-14 rounded-full bg-gradient-to-br from-gray-300/90 to-[#3B9EFF]/90 backdrop-blur-xl border border-white/20 flex items-center justify-center shadow-2xl hover:scale-110 transition-all duration-300 hover:shadow-[#3B9EFF]/50 group"
              aria-label="Next speaker"
            >
              <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
            </button>

            {/* 3D Carousel Wrapper */}
            <div 
              ref={speakerSliderRef}
              className="relative h-[600px] md:h-[700px] perspective-1000 select-none"
              style={{
                perspective: '1000px',
                perspectiveOrigin: 'center center',
                cursor: isDragging ? 'grabbing' : 'grab'
              }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div className="relative w-full h-full flex items-center justify-center">
                {speakers.map((speaker, index) => {
                  // Calculate position relative to current speaker
                  const position = (index - currentSpeakerIndex + speakers.length) % speakers.length;
                  const isActive = position === 0;
                  const isPrev = position === speakers.length - 1;
                  const isNext = position === 1;

                  // 3D Transform calculations
                  let transform = '';
                  let opacity = 0.3;
                  let scale = 0.7;
                  let zIndex = 1;

                  // Apply drag offset to active card
                  let dragTransform = '';
                  if (isActive && isDragging && dragOffset !== 0) {
                    dragTransform = `translateX(${dragOffset}px)`;
                  }

                  if (isActive) {
                    transform = `${dragTransform || 'translateX(0)'} translateZ(0) rotateY(0deg)`;
                    opacity = 1;
                    scale = 1;
                    zIndex = 10;
                  } else if (isPrev) {
                    transform = 'translateX(-60%) translateZ(-200px) rotateY(25deg)';
                    opacity = 0.5;
                    scale = 0.8;
                    zIndex = 5;
                  } else if (isNext) {
                    transform = 'translateX(60%) translateZ(-200px) rotateY(-25deg)';
                    opacity = 0.5;
                    scale = 0.8;
                    zIndex = 5;
                  } else {
                    // Hide cards that are not adjacent
                    opacity = 0;
                    scale = 0.5;
                    zIndex = 0;
                  }

                  return (
                    <div
                      key={index}
                      className={`absolute w-full max-w-4xl px-4 ${
                        isDragging && isActive ? '' : 'transition-all duration-700 ease-in-out'
                      }`}
                      style={{
                        transform: transform,
                        transformStyle: 'preserve-3d',
                        opacity: opacity,
                        scale: scale,
                        zIndex: zIndex,
                        pointerEvents: isActive ? 'auto' : 'none'
                      }}
                    >
                      <div className="relative group">
                        {/* Glow effect - stronger for active */}
                        <div 
                          className={`absolute -inset-1 bg-gradient-to-r from-[#3B9EFF] via-gray-300 to-[#3B9EFF] rounded-3xl blur-2xl transition-opacity duration-500 ${
                            isActive ? 'opacity-40' : 'opacity-20'
                          }`}
                        ></div>
                        
                        {/* Speaker Card */}
                        <div className={`relative card p-6 md:p-10 backdrop-blur-xl bg-gradient-to-br from-white/10 via-white/5 to-white/10 border border-white/10 shadow-2xl transition-all duration-500 ${
                          isActive ? 'shadow-[#3B9EFF]/30' : ''
                        }`}>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-center">
                            {/* Image Section */}
                            <div className="flex justify-center md:justify-start">
                              <div className="relative">
                                {/* Decorative rings */}
                                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#3B9EFF]/20 to-gray-300/20 blur-xl scale-150"></div>
                                <div className={`absolute -inset-2 rounded-full bg-gradient-to-br from-[#3B9EFF]/30 to-gray-300/30 transition-opacity duration-500 ${
                                  isActive ? 'animate-pulse opacity-100' : 'opacity-50'
                                }`}></div>
                                
                                {/* Image container */}
                                <div className={`relative rounded-full overflow-hidden ring-4 transition-all duration-500 shadow-2xl ${
                                  isActive 
                                    ? 'w-48 h-48 md:w-56 md:h-56 ring-[#3B9EFF]/40 group-hover:ring-gray-300/60' 
                                    : 'w-32 h-32 md:w-40 md:h-40 ring-[#3B9EFF]/20'
                                }`}>
                                  <img 
                                    src={speaker.image} 
                                    alt={speaker.name}
                                    className={`w-full h-full object-cover transition-transform duration-700 ${
                                      isActive ? 'scale-110 group-hover:scale-100' : 'scale-100'
                                    }`}
                                  />
                                  {/* Overlay gradient */}
                                  <div className="absolute inset-0 bg-gradient-to-t from-[#3B9EFF]/20 to-transparent"></div>
                                </div>
                                
                                {/* Floating badge - only show on active */}
                                {isActive && (
                                  <div className="absolute -bottom-2 -right-2 w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-[#3B9EFF] to-gray-400 rounded-full flex items-center justify-center shadow-xl border-4 border-[#1a1a1a] animate-bounce">
                                    <Award className="w-7 h-7 md:w-8 md:h-8 text-white" />
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Content Section */}
                            <div className="md:col-span-2 text-center md:text-left">
                              <div className="mb-4">
                                <span className={`inline-block px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-gradient-to-r from-[#3B9EFF]/20 to-gray-300/20 border border-[#3B9EFF]/30 text-[#3B9EFF] text-xs md:text-sm font-semibold mb-3 transition-all duration-300 ${
                                  isActive ? 'opacity-100' : 'opacity-70'
                                }`}>
                                  Expert Speaker
                                </span>
                              </div>
                              
                              <h3 className={`font-bold mb-2 md:mb-3 bg-gradient-to-r from-white via-[#3B9EFF] to-gray-300 bg-clip-text text-transparent transition-all duration-300 ${
                                isActive ? 'text-2xl md:text-4xl' : 'text-xl md:text-2xl'
                              }`}>
                                {speaker.name}
                              </h3>
                              
                              <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                                <div className="w-1 h-4 md:h-6 bg-gradient-to-b from-[#3B9EFF] to-gray-300 rounded-full"></div>
                                <p className={`text-[#3B9EFF] font-semibold transition-all duration-300 ${
                                  isActive ? 'text-lg md:text-xl' : 'text-sm md:text-base'
                                }`}>
                                  {speaker.role}
                                </p>
                              </div>
                              
                              <p className={`text-gray-400 mb-4 md:mb-6 transition-all duration-300 ${
                                isActive ? 'text-base md:text-lg' : 'text-sm md:text-base'
                              }`}>
                                {speaker.company}
                              </p>
                              
                              {isActive && (
                                <div className="relative">
                                  <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#3B9EFF]/50 to-gray-300/50"></div>
                                  <p className="text-gray-300 text-sm md:text-base leading-relaxed pl-4 md:pl-6">
                                    {speaker.bio}
                                  </p>
                                </div>
                              )}

                              {/* Social links - only show on active */}
                              {isActive && (
                                <div className="flex items-center justify-center md:justify-start gap-4 mt-4 md:mt-6">
                                  <div className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110">
                                    <Linkedin className="w-5 h-5 text-[#3B9EFF]" />
                                  </div>
                                  <div className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110">
                                    <Twitter className="w-5 h-5 text-[#3B9EFF]" />
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Dot Indicators */}
            <div className="flex justify-center items-center gap-3 mt-8">
              {speakers.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSpeaker(index)}
                  className={`transition-all duration-300 rounded-full ${
                    index === currentSpeakerIndex
                      ? 'w-12 h-3 bg-gradient-to-r from-[#3B9EFF] to-gray-300 shadow-lg shadow-[#3B9EFF]/50'
                      : 'w-3 h-3 bg-gray-600 hover:bg-gray-500'
                  }`}
                  aria-label={`Go to speaker ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section 
        id="schedule"
        ref={setSectionRef('schedule')}
        data-section-id="schedule"
        className={`py-20 px-4 sm:px-6 lg:px-8 bg-white/5 transition-all duration-1000 ${
          isSectionVisible('schedule') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 transition-all duration-1000 ${
              isSectionVisible('schedule') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>Event Schedule</h2>
            <p className={`text-xl text-gray-300 max-w-3xl mx-auto transition-all duration-1000 ${
              isSectionVisible('schedule') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`} style={{ transitionDelay: '200ms' }}>
              Two days packed with insightful sessions, workshops, and networking opportunities.
            </p>
          </div>
          <div className="space-y-3 max-w-5xl mx-auto">
            {schedule.map((item, index) => {
              const isExpanded = expandedSchedule.has(index);
              return (
                <div 
                  key={index} 
                  className={`card overflow-hidden transition-all duration-500 ${
                    isSectionVisible('schedule') 
                      ? 'opacity-100 translate-x-0' 
                      : 'opacity-0 -translate-x-10'
                  } ${isExpanded ? 'bg-white/8 border border-white/10' : 'hover:bg-white/5 border border-transparent'}`}
                  style={{
                    transitionDelay: `${index * 30}ms`
                  }}
                >
                  <button
                    onClick={() => toggleSchedule(index)}
                    className="w-full p-6 text-left flex items-start justify-between gap-6 group cursor-pointer"
                  >
                    <div className="flex items-start space-x-5 flex-1 min-w-0">
                      <div className="flex-shrink-0 w-32 text-[#3B9EFF]/80 font-semibold text-sm">
                        {item.time}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-white group-hover:text-[#3B9EFF] transition-colors mb-2 leading-snug">
                          {item.title}
                        </h3>
                        {item.speaker && (
                          <p className="text-gray-400 text-sm">Speaker: {item.speaker}</p>
                        )}
                        {item.speakers && (
                          <p className="text-gray-400 text-sm">
                            Speakers: {item.speakers.join(', ')}
                          </p>
                        )}
                      </div>
                    </div>
                    <ChevronDown 
                      className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-all duration-300 group-hover:text-[#3B9EFF] mt-1 ${
                        isExpanded ? 'transform rotate-180 text-[#3B9EFF]' : ''
                      }`}
                    />
                  </button>
                  <div 
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      isExpanded ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-6 pb-6 pt-2">
                      <div className="pl-36 border-l-2 border-[#3B9EFF]/20">
                        <p className="text-gray-300 leading-relaxed text-sm">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Sponsors Section */}
      <section 
        id="sponsors"
        ref={setSectionRef('sponsors')}
        data-section-id="sponsors"
        className={`py-20 px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${
          isSectionVisible('sponsors') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 transition-all duration-1000 ${
              isSectionVisible('sponsors') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>Our Sponsors</h2>
            <p className={`text-xl text-gray-300 max-w-3xl mx-auto transition-all duration-1000 ${
              isSectionVisible('sponsors') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`} style={{ transitionDelay: '200ms' }}>
              Thank you to our amazing sponsors who make this event possible.
            </p>
          </div>
          <div className="space-y-12">
            {/* Platinum */}
            <div>
              <h3 className="text-xl font-semibold mb-6 text-center text-gray-400">Platinum Sponsors</h3>
              <div className="flex flex-wrap justify-center gap-8">
                {sponsors.filter(s => s.tier === 'Platinum').map((sponsor, index) => (
                  <div key={index} className="card p-8 w-64 h-40 flex items-center justify-center hover:scale-105 transition-transform duration-300">
                    {sponsor.image ? (
                      <img 
                        src={sponsor.image} 
                        alt={sponsor.name} 
                        className="max-w-full max-h-full object-contain opacity-90 hover:opacity-100 transition-opacity"
                      />
                    ) : (
                      <span className="text-2xl font-bold text-[#3B9EFF]">{sponsor.logo}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
            {/* Gold */}
            <div>
              <h3 className="text-xl font-semibold mb-6 text-center text-gray-400">Gold Sponsors</h3>
              <div className="flex flex-wrap justify-center gap-8">
                {sponsors.filter(s => s.tier === 'Gold').map((sponsor, index) => (
                  <div key={index} className="card p-6 w-40 h-28 flex items-center justify-center">
                    <span className="text-xl font-bold text-gray-300">{sponsor.logo}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Silver */}
            <div>
              <h3 className="text-xl font-semibold mb-6 text-center text-gray-400">Silver Sponsors</h3>
              <div className="flex flex-wrap justify-center gap-6">
                {sponsors.filter(s => s.tier === 'Silver').map((sponsor, index) => (
                  <div key={index} className="card p-4 w-32 h-24 flex items-center justify-center">
                    <span className="text-lg font-bold text-gray-400">{sponsor.logo}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Registration CTA Section */}
      <section 
        id="register"
        ref={setSectionRef('register')}
        data-section-id="register"
        className={`py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#3B9EFF]/20 via-gray-300/20 to-[#3B9EFF]/20 transition-all duration-1000 ${
          isSectionVisible('register') ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 transition-all duration-1000 ${
            isSectionVisible('register') ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
          }`}>Ready to Join Us?</h2>
          <p className={`text-xl text-gray-300 mb-4 transition-all duration-1000 ${
            isSectionVisible('register') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`} style={{ transitionDelay: '200ms' }}>
            Secure your spot at the most anticipated cybersecurity event of the year.
          </p>
          <p className={`text-base text-[#3B9EFF] mb-8 font-semibold transition-all duration-1000 ${
            isSectionVisible('register') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`} style={{ transitionDelay: '250ms' }}>
            Organized by <span className="text-gray-300">Cyber Division</span>
          </p>
          <div className="card p-8 max-w-2xl mx-auto">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  className="input-field"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="input-field"
                />
              </div>
              <input
                type="email"
                placeholder="Email Address"
                className="input-field"
              />
              <input
                type="text"
                placeholder="Company"
                className="input-field"
              />
              <input
                type="text"
                placeholder="Job Title"
                className="input-field"
              />
              <button type="submit" className="btn-primary w-full">
                Register Now
              </button>
              <p className="text-sm text-gray-400">
                Early bird pricing available until October 15, 2025
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 sm:px-6 lg:px-8 border-t border-white/10 bg-gradient-to-b from-transparent to-[#1a1a1a]/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
            <div>
              <div className="flex items-center space-x-4 mb-5">
                <div className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#3B9EFF]/10 to-gray-300/10 rounded-full blur-md"></div>
                  <img 
                    src={logoImage} 
                    alt="CISO Conclave Logo" 
                    className="w-full h-full object-contain drop-shadow-xl relative z-10"
                    style={{ filter: 'drop-shadow(0 0 10px rgba(59, 158, 255, 0.3))' }}
                  />
                </div>
                <span className="text-2xl md:text-3xl font-bold">
                  <span className="text-[#3B9EFF]">CISO</span>{' '}
                  <span className="text-gray-300">CONCLAVE</span>
                </span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-3">
                The premier cybersecurity and threat intelligence conference for Chief Information Security Officers.
              </p>
              <p className="text-sm text-[#3B9EFF] font-semibold">
                Organized by <span className="text-gray-300">Cyber Division</span>
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Event</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#speakers" className="hover:text-white transition-colors">Speakers</a></li>
                <li><a href="#schedule" className="hover:text-white transition-colors">Schedule</a></li>
                <li><a href="#sponsors" className="hover:text-white transition-colors">Sponsors</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Information</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Venue</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Travel</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <div className="flex space-x-4 mb-4">
                <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
              <div className="space-y-2 text-sm text-gray-400">
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>info@ctisummit.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>+1 (555) 123-4567</span>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 text-center text-sm text-gray-400">
            <p>© 2025 <span className="text-[#3B9EFF]">CISO</span> <span className="text-gray-300">CONCLAVE</span>. All rights reserved.</p>
            <p className="mt-2 text-[#3B9EFF] font-semibold">
              Organized by <span className="text-gray-300">Cyber Division</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CTISummitLanding;

