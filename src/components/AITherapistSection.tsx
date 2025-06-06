
import React, { useEffect, useState } from 'react';
import { MessageCircle, Zap, Clock, Shield, CheckCircle } from 'lucide-react';

const AITherapistSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(0);
  const [typingText, setTypingText] = useState('');
  const [parallaxOffset, setParallaxOffset] = useState(0);

  const conversation = [
    {
      type: 'ai',
      message: "Hello! I'm your AI therapist. I'm here to listen and support you. What's on your mind today?",
      time: "2:14 PM"
    },
    {
      type: 'user', 
      message: "I've been feeling overwhelmed with work stress lately. It's affecting my sleep.",
      time: "2:15 PM"
    },
    {
      type: 'ai',
      message: "I understand how challenging work stress can be. Let's explore some strategies together. What specific aspects of work are creating the most pressure?",
      time: "2:15 PM"
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('ai-therapist');
      if (element) {
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top;
        const elementHeight = rect.height;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight && elementTop + elementHeight > 0) {
          const progress = Math.max(0, Math.min(1, (windowHeight - elementTop) / (windowHeight + elementHeight)));
          setParallaxOffset(progress * 50 - 25);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          
          const startTyping = () => {
            if (currentMessage < conversation.length) {
              const message = conversation[currentMessage].message;
              let currentIndex = 0;
              
              const typeWriter = setInterval(() => {
                if (currentIndex < message.length) {
                  setTypingText(message.slice(0, currentIndex + 1));
                  currentIndex++;
                } else {
                  clearInterval(typeWriter);
                  setTimeout(() => {
                    setCurrentMessage(prev => prev + 1);
                    setTypingText('');
                  }, 1500);
                }
              }, 50);
            }
          };

          setTimeout(startTyping, 500);
        }
      },
      { threshold: 0.2 }
    );

    const section = document.getElementById('ai-therapist');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, [currentMessage]);

  return (
    <section 
      id="ai-therapist" 
      className="py-24 bg-gradient-to-br from-slate-50 to-indigo-50 relative overflow-hidden"
    >
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column - Professional Chat Interface */}
          <div 
            className={`transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
            }`}
            style={{ transform: `translateY(${parallaxOffset}px) translateX(${isVisible ? 0 : -80}px)` }}
          >
            <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
              
              {/* Chat Header */}
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg">AI Therapist</h3>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-indigo-100 text-sm">Available 24/7</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="p-6 space-y-4 h-96 overflow-y-auto bg-slate-50">
                {conversation.slice(0, currentMessage).map((msg, i) => (
                  <div 
                    key={i}
                    className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'} opacity-0 animate-[fadeInMessage_0.6s_ease-out_forwards]`}
                    style={{ animationDelay: `${i * 500}ms` }}
                  >
                    <div className={`max-w-xs lg:max-w-sm px-4 py-3 rounded-2xl shadow-sm ${
                      msg.type === 'user' 
                        ? 'bg-indigo-600 text-white rounded-br-md' 
                        : 'bg-white text-slate-900 rounded-bl-md border border-slate-200'
                    }`}>
                      <p className="text-sm leading-relaxed">{msg.message}</p>
                      <p className={`text-xs mt-2 ${
                        msg.type === 'user' ? 'text-indigo-200' : 'text-slate-500'
                      }`}>
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))}

                {/* Current typing message */}
                {currentMessage < conversation.length && typingText && (
                  <div className={`flex ${conversation[currentMessage].type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs lg:max-w-sm px-4 py-3 rounded-2xl shadow-sm ${
                      conversation[currentMessage].type === 'user' 
                        ? 'bg-indigo-600 text-white rounded-br-md' 
                        : 'bg-white text-slate-900 rounded-bl-md border border-slate-200'
                    }`}>
                      <p className="text-sm leading-relaxed">
                        {typingText}
                        <span className="animate-pulse">|</span>
                      </p>
                    </div>
                  </div>
                )}
                
                {/* Typing indicator */}
                {currentMessage < conversation.length && !typingText && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Chat Input */}
              <div className="p-6 border-t border-slate-200">
                <div className="flex items-center space-x-3">
                  <div className="flex-1 bg-slate-100 rounded-xl px-4 py-3">
                    <p className="text-slate-500 text-sm">Type your message...</p>
                  </div>
                  <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center hover:bg-indigo-700 transition-colors cursor-pointer">
                    <span className="text-white text-lg">→</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div 
            className={`space-y-8 transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
            }`}
            style={{ transform: `translateY(${-parallaxOffset}px) translateX(${isVisible ? 0 : 80}px)` }}
          >
            
            {/* Section Badge */}
            <div className="inline-flex items-center space-x-2 bg-indigo-100 rounded-full px-4 py-2">
              <Zap className="w-4 h-4 text-indigo-600" />
              <span className="text-sm font-semibold text-indigo-700">AI-Powered Therapy</span>
            </div>

            <div className="space-y-6">
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
                Professional Support
                <br />
                <span className="text-indigo-600">Available Instantly</span>
              </h2>
              
              <p className="text-xl text-slate-600 leading-relaxed">
                Our AI therapist combines evidence-based therapeutic techniques with the latest advances in artificial intelligence to provide personalized mental health support.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                {
                  icon: Clock,
                  title: "24/7 Availability",
                  description: "Get support whenever you need it, day or night"
                },
                {
                  icon: Shield,
                  title: "Private & Secure",
                  description: "End-to-end encryption ensures your conversations stay confidential"
                },
                {
                  icon: CheckCircle,
                  title: "Evidence-Based",
                  description: "Techniques rooted in CBT, DBT, and mindfulness therapy"
                },
                {
                  icon: MessageCircle,
                  title: "Personalized",
                  description: "Adapts to your unique needs and communication style"
                }
              ].map((feature, i) => (
                <div 
                  key={i}
                  className={`bg-white rounded-xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                  style={{ transitionDelay: `${(i + 1) * 150}ms` }}
                >
                  <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="w-5 h-5 text-indigo-600" />
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2">{feature.title}</h3>
                  <p className="text-slate-600 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInMessage {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default AITherapistSection;
