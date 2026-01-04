
import React, { useState, useEffect } from 'react';
import { PROJECTS, SKILLS } from './data';
import { Project, SkillCategory } from './types';
import { askPortfolioAssistant } from './geminiService';

const Nav: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass px-6 py-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <span className="font-bold tracking-tight text-xl">Portfolio.</span>
        <div className="flex gap-8 text-sm font-medium text-zinc-600">
          <a href="#about" className="hover:text-black transition-colors">About</a>
          <a href="#projects" className="hover:text-black transition-colors">Projects</a>
          <a href="#skills" className="hover:text-black transition-colors">Skills</a>
          <a href="#contact" className="hover:text-black transition-colors">Contact</a>
        </div>
      </div>
    </nav>
  );
};

const Hero: React.FC = () => {
  return (
    <section className="pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
          Software Engineer. <br />
          <span className="text-zinc-400">Owner. Builder.</span>
        </h1>
        <p className="text-xl text-zinc-600 leading-relaxed max-w-2xl">
          I build end-to-end systems with a focus on impact and ownership. 
          Specializing in solving complex problems through fast learning and robust engineering.
        </p>
        <div className="mt-10 flex gap-4">
          <a href="#projects" className="bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-zinc-800 transition-all">
            View Projects
          </a>
          <a href="#contact" className="border border-zinc-200 px-8 py-3 rounded-full font-medium hover:border-black transition-all">
            Get in touch
          </a>
        </div>
      </div>
    </section>
  );
};

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <div className="group border border-zinc-100 rounded-2xl overflow-hidden bg-white hover:shadow-xl hover:shadow-zinc-200/50 transition-all duration-500">
      <div className="aspect-video overflow-hidden bg-zinc-100 relative">
        <img 
          src={project.imageUrl} 
          alt={project.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        {project.impactLabel && (
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase border border-zinc-100 shadow-sm">
            {project.impactLabel}
          </div>
        )}
      </div>
      <div className="p-8">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-2xl font-bold mb-1">{project.title}</h3>
            <p className="text-zinc-400 text-sm font-medium">{project.subtitle}</p>
          </div>
        </div>
        
        <div className="space-y-6">
          <div>
            <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">Problem</h4>
            <p className="text-zinc-600 text-sm leading-relaxed">{project.problem}</p>
          </div>
          
          <div>
            <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">The Solution</h4>
            <p className="text-zinc-800 text-sm leading-relaxed">{project.whatIBuilt}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {project.tech.map(t => (
              <span key={t} className="px-2 py-1 bg-zinc-50 border border-zinc-100 rounded text-[10px] font-bold text-zinc-500 uppercase">
                {t}
              </span>
            ))}
          </div>

          <div className="pt-4 border-t border-zinc-100 grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Challenge</h4>
              <p className="text-xs text-zinc-600 leading-snug">{project.challenges}</p>
            </div>
            <div>
              <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Outcome</h4>
              <p className="text-xs text-zinc-900 font-medium leading-snug">{project.outcome}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AIAssistant: React.FC = () => {
  const [query, setQuery] = useState('');
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setIsLoading(true);
    const res = await askPortfolioAssistant(query);
    setAnswer(res);
    setIsLoading(false);
  };

  return (
    <div className="mt-20 border border-zinc-200 rounded-3xl p-8 bg-zinc-50 max-w-4xl mx-auto shadow-inner">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-3 h-3 bg-zinc-800 rounded-full animate-pulse" />
        <h3 className="font-bold text-lg">AI Assistant</h3>
        <span className="text-xs text-zinc-400 font-medium bg-zinc-200 px-2 py-0.5 rounded">BETA</span>
      </div>
      <p className="text-sm text-zinc-500 mb-6">
        Ask a specific question about my experience, tech stack, or problem-solving approach.
      </p>
      <form onSubmit={handleAsk} className="flex gap-2">
        <input 
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g., How does the developer handle project ownership?" 
          className="flex-1 px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-black/5 text-sm"
        />
        <button 
          disabled={isLoading}
          className="bg-zinc-900 text-white px-6 py-3 rounded-xl font-medium hover:bg-black disabled:bg-zinc-400 transition-colors text-sm"
        >
          {isLoading ? 'Thinking...' : 'Ask'}
        </button>
      </form>
      {answer && (
        <div className="mt-6 p-4 bg-white rounded-xl border border-zinc-100 animate-in fade-in slide-in-from-bottom-2">
          <p className="text-sm leading-relaxed text-zinc-700 font-medium italic">"{answer}"</p>
        </div>
      )}
    </div>
  );
};

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-20 px-6 bg-zinc-900 text-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <h2 className="text-3xl font-bold mb-4">Expertise</h2>
            <p className="text-zinc-400 text-sm leading-relaxed">
              A concise overview of my core technical stack and engineering philosophy.
            </p>
          </div>
          <div className="md:col-span-3 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {SKILLS.map(cat => (
              <div key={cat.title}>
                <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">{cat.title}</h4>
                <ul className="space-y-2">
                  {cat.skills.map(s => (
                    <li key={s} className="text-zinc-300 font-medium text-sm flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="py-20 px-6 border-t border-zinc-100">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-8">Let's build something.</h2>
        <div className="flex justify-center gap-12 text-zinc-600 font-medium">
          <a href="mailto:hello@engineer.me" className="hover:text-black transition-colors">Email</a>
          <a href="#" className="hover:text-black transition-colors">LinkedIn</a>
          <a href="#" className="hover:text-black transition-colors">GitHub</a>
        </div>
        <p className="mt-12 text-xs text-zinc-400 font-medium uppercase tracking-widest">
          © 2024 • Impact Driven Engineering
        </p>
      </div>
    </footer>
  );
};

const App: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Nav />
      
      <main>
        <Hero />
        
        <section id="about" className="py-20 px-6 border-y border-zinc-100 bg-white">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-12 items-center">
            <div className="w-48 h-48 rounded-3xl bg-zinc-100 overflow-hidden flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-500">
              <img src="https://picsum.photos/seed/engineer-portrait/400/400" alt="Profile" className="w-full h-full object-cover" />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">Execution is everything.</h2>
              <div className="space-y-4 text-zinc-600 leading-relaxed">
                <p>
                  I am a Software Engineer with a strong academic background and deep hands-on experience building end-to-end systems. 
                  My philosophy centers on <strong>ownership</strong>—I don't just write code; I take responsibility for the product from initial concept to deployment.
                </p>
                <p>
                  Whether it's self-learning complex medical imaging for ML or architecting a real-time collaborative platform for students, 
                  I prioritize speed, adaptability, and high-fidelity output.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="py-24 px-6 bg-zinc-50">
          <div className="max-w-6xl mx-auto">
            <div className="mb-16">
              <h2 className="text-4xl font-bold mb-4">Selected Works</h2>
              <p className="text-zinc-500 max-w-lg">
                A showcase of projects where I led the architecture, solved core technical challenges, and delivered measurable impact.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {PROJECTS.map(p => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>

            <AIAssistant />
          </div>
        </section>

        <Skills />
      </main>

      <Footer />
    </div>
  );
};

export default App;
