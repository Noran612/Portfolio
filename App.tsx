
import React, { useState, useEffect, useRef } from 'react';
import { PROJECTS, SKILLS } from './data';
import { Project } from './types';
import { askPortfolioAssistant } from './geminiService';

const TechPill: React.FC<{ text: string }> = ({ text }) => (
  <span className="font-mono text-[10px] bg-zinc-900 border border-zinc-800 text-zinc-400 px-2 py-0.5 rounded tracking-tighter">
    {text}
  </span>
);

const ProjectModule: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <div className="glass-panel rounded-xl overflow-hidden group hover:border-emerald-500/50 transition-all duration-500 flex flex-col h-full">
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={project.imageUrl} 
          alt={project.title} 
          className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-emerald-500 text-[10px] font-black text-black px-2 py-1 rounded uppercase tracking-widest">
            {project.impactLabel || 'Module'}
          </span>
        </div>
      </div>
      
      <div className="p-6 flex-1 flex flex-col">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-white mb-1 group-hover:text-emerald-400 transition-colors">{project.title}</h3>
          <p className="text-zinc-500 text-xs font-medium uppercase tracking-widest">{project.subtitle}</p>
        </div>

        <div className="space-y-4 mb-6">
          <p className="text-zinc-400 text-sm leading-relaxed line-clamp-3">
            {project.problem}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {project.tech.map(t => <TechPill key={t} text={t} />)}
          </div>
        </div>

        <div className="mt-auto pt-4 border-t border-white/5 space-y-3">
           <div className="flex justify-between items-center">
              <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest">Execution Path</span>
              <span className="text-[9px] font-bold text-emerald-500 uppercase tracking-widest">Verified</span>
           </div>
           <p className="text-xs text-zinc-300 font-medium leading-snug">
             <span className="text-emerald-500/50 mr-1">»</span> {project.outcome}
           </p>
        </div>
      </div>
    </div>
  );
};

const FloatingTerminal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [history, setHistory] = useState<{q: string, a: string}[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || isLoading) return;

    const currentQuery = query;
    setQuery('');
    setIsLoading(true);
    
    const answer = await askPortfolioAssistant(currentQuery);
    setHistory(prev => [...prev, { q: currentQuery, a: answer }]);
    setIsLoading(false);
  };

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${isOpen ? 'w-[90vw] md:w-[420px]' : 'w-14'}`}>
      {!isOpen ? (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-emerald-500 rounded-full flex items-center justify-center text-black shadow-lg shadow-emerald-500/30 hover:scale-110 transition-transform active:scale-95"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
        </button>
      ) : (
        <div className="glass-panel rounded-2xl overflow-hidden terminal-glow border-emerald-500/30 flex flex-col shadow-2xl">
          <div className="bg-zinc-900/80 px-4 py-3 border-b border-white/5 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-mono text-[10px] text-zinc-300 font-bold uppercase tracking-[0.2em]">Portfolio.Kernel.Assistant</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-zinc-500 hover:text-white transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          
          <div ref={scrollRef} className="h-80 overflow-y-auto p-5 font-mono text-[11px] space-y-4 bg-black/40">
            <div className="text-emerald-500/60">System initialized. Connection established. Ask a question to begin.</div>
            
            {history.map((item, i) => (
              <div key={i} className="space-y-2 animate-in fade-in duration-300">
                <div className="flex gap-2">
                  <span className="text-emerald-500">user@atlas:~$</span>
                  <span className="text-zinc-100">{item.q}</span>
                </div>
                <div className="flex gap-2 pl-4 border-l border-emerald-500/20">
                  <span className="text-zinc-500">[assistant]:</span>
                  <span className="text-zinc-400 italic">{item.a}</span>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex gap-2">
                <span className="text-emerald-500">user@atlas:~$</span>
                <span className="text-zinc-100 animate-pulse cursor">_</span>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="p-4 bg-zinc-900/50 border-t border-white/5">
            <input 
              autoFocus
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Query system (e.g. tell me about Amassina impact)" 
              className="w-full bg-black/50 border border-white/5 rounded-lg px-4 py-2 text-xs font-mono focus:outline-none focus:border-emerald-500/50 transition-colors text-white placeholder:text-zinc-700"
            />
          </form>
        </div>
      )}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 px-6 py-6 lg:px-12 flex justify-between items-center pointer-events-none">
        <div className="pointer-events-auto">
          <span className="text-emerald-500 font-black tracking-tighter text-2xl">ATLAS<span className="text-white">.01</span></span>
        </div>
        <div className="pointer-events-auto flex gap-8">
          {['About', 'Projects', 'Skills', 'Contact'].map(link => (
            <a key={link} href={`#${link.toLowerCase()}`} className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 hover:text-emerald-400 transition-colors">
              {link}
            </a>
          ))}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="about" className="relative pt-48 pb-32 px-6 lg:px-12 overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="mb-8 inline-flex items-center gap-3 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-500 text-[10px] font-bold uppercase tracking-widest">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Active Portfolio // v2024.Q4
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none mb-10 text-white">
            OWNERSHIP<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-zinc-600">DRIVEN.</span>
          </h1>
          <p className="max-w-2xl text-xl text-zinc-400 leading-relaxed font-medium">
            Software engineer specialized in building end-to-end systems. 
            I prioritize execution over buzzwords, focusing on solving complex problems with 
            speed and technical rigor.
          </p>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10 border-t border-white/5 pt-12">
            <div>
              <h4 className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em] mb-4">Core Philosophy</h4>
              <p className="text-sm text-zinc-500 leading-relaxed">I don't just write functions; I deliver products. Every line of code is measured by its contribution to the final outcome.</p>
            </div>
            <div>
              <h4 className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em] mb-4">Adaptation Speed</h4>
              <p className="text-sm text-zinc-500 leading-relaxed">I thrive in unfamiliar domains. Whether it's medical imaging or drone physics, I learn fast to ship high-fidelity solutions.</p>
            </div>
            <div>
              <h4 className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em] mb-4">Reliability</h4>
              <p className="text-sm text-zinc-500 leading-relaxed">Production-grade builds by default. I focus on modularity, state management, and scalability from the first commit.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section id="projects" className="py-32 px-6 lg:px-12 bg-black/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-xl">
              <h2 className="text-4xl font-black text-white mb-4 tracking-tight">Technical Logs</h2>
              <p className="text-zinc-500">Selected case studies demonstrating end-to-end delivery, complex domain navigation, and real-world business impact.</p>
            </div>
            <div className="hidden md:block">
              <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">Sorted by Impact // 001 - 007</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROJECTS.map(p => (
              <ProjectModule key={p.id} project={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Skills / Expertise */}
      <section id="skills" className="py-32 px-6 lg:px-12 border-y border-white/5 bg-[#080808]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-sm font-black text-emerald-500 uppercase tracking-[0.4em] mb-20 text-center">Standard Operating Stack</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {SKILLS.map(category => (
              <div key={category.title} className="space-y-6">
                <h4 className="font-mono text-[11px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-500/20 border border-emerald-500/40" />
                  {category.title}
                </h4>
                <ul className="space-y-3">
                  {category.skills.map(skill => (
                    <li key={skill} className="text-zinc-300 font-bold text-sm tracking-tight hover:text-white transition-colors cursor-default">
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer / Contact */}
      <footer id="contact" className="py-40 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-12">READY TO<br/>SHIP.</h2>
          <div className="flex flex-col items-center gap-8">
            <a href="mailto:contact@engineer.me" className="text-xl md:text-3xl font-medium text-emerald-400 border-b border-emerald-400/30 pb-2 hover:text-white hover:border-white transition-all">
              hello@atlas.dev
            </a>
            <div className="flex gap-10 mt-8">
              {['GitHub', 'LinkedIn', 'Twitter'].map(link => (
                <a key={link} href="#" className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600 hover:text-emerald-500 transition-colors">
                  {link}
                </a>
              ))}
            </div>
          </div>
          <div className="mt-40 text-[9px] font-mono text-zinc-700 uppercase tracking-[0.5em]">
            © 2024 ATLAS PROJECT // NO BUZZWORDS // PURE EXECUTION
          </div>
        </div>
      </footer>

      <FloatingTerminal />
    </div>
  );
};

export default App;
