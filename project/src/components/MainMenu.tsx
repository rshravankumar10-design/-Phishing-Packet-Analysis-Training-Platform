import { Mail, Network } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const MainMenu = () => {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState<'email' | 'packet' | null>(null);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900" />

      <div className="absolute inset-0 opacity-20">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-green-400 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-8">
        <div className="text-center mb-16 animate-slide-down">
          <h1 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 mb-4 cinematic-font animate-gradient">
            PHISHING & PACKET ANALYSIS
          </h1>
          <p className="text-xl md:text-2xl text-green-400 font-light tracking-widest animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            Training Platform
          </p>
          <div className="mt-4 h-1 w-64 mx-auto bg-gradient-to-r from-transparent via-green-400 to-transparent animate-pulse" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full">
          <div
            className="group relative cursor-pointer transform transition-all duration-500 hover:scale-105 animate-fade-in-up"
            style={{ animationDelay: '0.4s' }}
            onMouseEnter={() => setHoveredCard('email')}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => navigate('/email-phishing')}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative backdrop-blur-xl bg-white/5 border-2 border-white/10 rounded-3xl p-12 shadow-2xl group-hover:border-blue-400/50 transition-all duration-500">
              <div className="flex flex-col items-center text-center">
                <div className="mb-6 relative">
                  <div className="absolute inset-0 bg-blue-400/30 blur-2xl rounded-full" />
                  <Mail
                    className={`w-24 h-24 text-blue-400 relative transition-transform duration-500 ${
                      hoveredCard === 'email' ? 'scale-125 rotate-12' : ''
                    }`}
                  />
                </div>
                <h2 className="text-3xl font-bold text-white mb-4 cinematic-font">
                  EMAIL PHISHING
                </h2>
                <p className="text-gray-400 text-lg">
                  Analyze and detect phishing attempts in email messages
                </p>
                <div className="mt-6 px-6 py-3 bg-blue-500/20 border border-blue-400/50 rounded-full text-blue-400 font-semibold group-hover:bg-blue-500/40 transition-all duration-300">
                  START ANALYSIS
                </div>
              </div>
            </div>
          </div>

          <div
            className="group relative cursor-pointer transform transition-all duration-500 hover:scale-105 animate-fade-in-up"
            style={{ animationDelay: '0.5s' }}
            onMouseEnter={() => setHoveredCard('packet')}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => navigate('/packet-analysis')}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative backdrop-blur-xl bg-white/5 border-2 border-white/10 rounded-3xl p-12 shadow-2xl group-hover:border-green-400/50 transition-all duration-500">
              <div className="flex flex-col items-center text-center">
                <div className="mb-6 relative">
                  <div className="absolute inset-0 bg-green-400/30 blur-2xl rounded-full" />
                  <Network
                    className={`w-24 h-24 text-green-400 relative transition-transform duration-500 ${
                      hoveredCard === 'packet' ? 'scale-125 rotate-12' : ''
                    }`}
                  />
                </div>
                <h2 className="text-3xl font-bold text-white mb-4 cinematic-font">
                  PACKET ANALYSIS
                </h2>
                <p className="text-gray-400 text-lg">
                  Detect network intrusions and analyze packet captures
                </p>
                <div className="mt-6 px-6 py-3 bg-green-500/20 border border-green-400/50 rounded-full text-green-400 font-semibold group-hover:bg-green-500/40 transition-all duration-300">
                  START ANALYSIS
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center text-gray-500 text-sm animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <p>Select an analysis mode to begin training</p>
        </div>
      </div>
    </div>
  );
};
