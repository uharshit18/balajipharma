import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const RajasthanMap: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapGroupRef = useRef<SVGGElement>(null);
  
  // Refs for animation elements
  const majorCitiesRef = useRef<SVGGElement>(null);
  const bhilwaraRef = useRef<SVGGElement>(null);
  const bhilwaraLabelRef = useRef<SVGTextElement>(null);
  
  const connectionsRef = useRef<SVGGElement>(null);
  const microNodesRef = useRef<SVGGElement>(null);

  useEffect(() => {
    if (!mapGroupRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 5 });

      // Initial State: Reset everything
      // Pivot around Bhilwara (450, 500)
      tl.set(mapGroupRef.current, { scale: 1, x: 0, y: 0, transformOrigin: "450px 500px" });
      
      const cityGroups = majorCitiesRef.current?.children;
      if (cityGroups) {
          tl.set(cityGroups, { scale: 0, opacity: 0, transformOrigin: "center" });
      }

      tl.set(bhilwaraRef.current, { scale: 0, opacity: 0, transformOrigin: "center" });
      tl.set(connectionsRef.current, { opacity: 0 });
      tl.set(microNodesRef.current, { opacity: 0 });
      tl.set(bhilwaraLabelRef.current, { opacity: 0, y: 5 });

      // Phase 1: Reveal Major Cities
      if (cityGroups) {
        tl.to(cityGroups, {
            scale: 1,
            opacity: 1,
            duration: 1,
            stagger: 0.1,
            ease: "back.out(1.7)"
        });
      }
      
      tl.to(bhilwaraRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: "back.out(1.7)"
      }, "<0.5");

      // Pulse effect for cities
      if (cityGroups) {
        tl.to(cityGroups, {
            scale: 1.2,
            duration: 0.6,
            yoyo: true,
            repeat: 1,
            ease: "sine.inOut"
        });
      }

      // Phase 2: Zoom into Bhilwara
      // Zoom scale 2.8x (reduced from 3.5x for better context)
      // Bhilwara is at x=450. Center of viewbox is 400.
      // x: 0 keeps Bhilwara at 450 (Right of center), allowing space for left-side labels.
      // y: -100 moves Bhilwara (500) to Center Y (400).
      tl.to(mapGroupRef.current, {
        scale: 2.8, 
        x: 0,
        y: -100,
        duration: 2.5,
        ease: "power2.inOut"
      }, "+=0.5");

      // Fade out major cities to focus on Bhilwara district
      if (cityGroups) {
        tl.to(cityGroups, {
            opacity: 0, // Fade out completely to avoid clutter
            scale: 0.5,
            duration: 1
        }, "<");
      }

      // Keep Bhilwara marker prominent
      tl.to(bhilwaraRef.current, {
        scale: 1.2,
        duration: 1
      }, "<");
      
      // Show Bhilwara Label
      tl.to(bhilwaraLabelRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5
      }, "-=0.5");

      // Phase 3: Show District Connections (Neighboring Districts)
      tl.to(connectionsRef.current, {
        opacity: 1,
        duration: 0.8
      });
      
      const paths = connectionsRef.current?.querySelectorAll('path');
      if (paths) {
        tl.fromTo(paths, 
          { strokeDasharray: 20, strokeDashoffset: 20 },
          { strokeDashoffset: 0, duration: 1.5, stagger: 0.2, ease: "none" },
          "<"
        );
      }

      // Phase 4: Micro Distribution (Tehsils & Villages)
      tl.to(microNodesRef.current, {
        opacity: 1,
        duration: 0.8
      });
      
      const townGroups = microNodesRef.current?.querySelectorAll('g');
      
      if (townGroups) {
        townGroups.forEach((group) => {
            const line = group.querySelector('line');
            const circle = group.querySelector('circle');
            const text = group.querySelector('text');
            
            if (line) {
                tl.fromTo(line, { opacity: 0, drawSVG: 0 }, { opacity: 0.6, duration: 0.5 }, "<0.05");
            }
            if (circle) {
                tl.fromTo(circle, { scale: 0 }, { scale: 1, duration: 0.4, ease: "back.out(2)" }, "<0.1");
            }
            if (text) {
                tl.fromTo(text, { opacity: 0, x: -2 }, { opacity: 1, x: 0, duration: 0.4 }, "<0.1");
            }
        });
      }

      // Hold final state
      tl.to({}, { duration: 6 });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full relative overflow-hidden bg-slate-900/40 rounded-xl border border-white/5">
      <svg 
        viewBox="0 0 800 800" 
        className="w-full h-full"
        preserveAspectRatio="xMidYMid slice"
        style={{ cursor: 'default' }}
      >
        <defs>
          <radialGradient id="hubGradient" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="1" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <filter id="textShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="0.5"/>
            <feOffset dx="0.5" dy="0.5" result="offsetblur"/>
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.8"/>
            </feComponentTransfer>
            <feMerge>
              <feMergeNode/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        <g ref={mapGroupRef}>
          {/* Stylized Rajasthan Map Path - Darker for contrast */}
          <path 
            d="M 280 150 L 550 50 L 720 180 L 750 350 L 680 550 L 550 750 L 350 780 L 150 650 L 100 450 L 280 150 Z" 
            className="fill-slate-900/90 stroke-blue-600/30"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
          
          {/* Grid Lines Overlay */}
          <g className="stroke-white/5" strokeWidth="0.5" vectorEffect="non-scaling-stroke">
             <path d="M 100 200 H 700 M 100 400 H 700 M 100 600 H 700" />
             <path d="M 200 100 V 700 M 400 100 V 700 M 600 100 V 700" />
          </g>

          {/* Major Cities Group (Phase 1) */}
          <g ref={majorCitiesRef}>
            {[
              { x: 580, y: 250, name: 'Jaipur' },
              { x: 250, y: 380, name: 'Jodhpur' },
              { x: 380, y: 680, name: 'Udaipur' },
              { x: 600, y: 580, name: 'Kota' },
              { x: 280, y: 200, name: 'Bikaner' },
            ].map((city, i) => (
              <g key={i} transform={`translate(${city.x}, ${city.y})`}>
                <circle r="8" className="fill-blue-500" filter="url(#glow)" />
                <text y="-15" className="fill-blue-100 text-[16px] font-bold font-sans pointer-events-none" textAnchor="middle" filter="url(#textShadow)">{city.name}</text>
              </g>
            ))}
          </g>

          {/* District Connections (Phase 3) */}
          <g ref={connectionsRef}>
            <g className="stroke-yellow-500/60" strokeWidth="1.5" strokeDasharray="6 6" fill="none">
                <path d="M 450 500 L 480 380" vectorEffect="non-scaling-stroke" /> {/* Ajmer */}
                <path d="M 450 500 L 460 620" vectorEffect="non-scaling-stroke" /> {/* Chittor */}
                <path d="M 450 500 L 380 550" vectorEffect="non-scaling-stroke" /> {/* Rajsamand */}
            </g>
            
            <g className="fill-yellow-400">
                <circle cx="480" cy="380" r="2.5" />
                <circle cx="460" cy="620" r="2.5" />
                <circle cx="380" cy="550" r="2.5" />
            </g>

            <text x="490" y="380" className="fill-yellow-200 font-bold" style={{ fontSize: '6px' }} filter="url(#textShadow)">Ajmer</text>
            <text x="470" y="620" className="fill-yellow-200 font-bold" style={{ fontSize: '6px' }} filter="url(#textShadow)">Chittor</text>
          </g>

          {/* Micro Distribution Towns & Villages (Phase 4) - Relative to Bhilwara (450,500) */}
          <g ref={microNodesRef}>
            {/* Common Styles for Lines */}
            <g className="stroke-blue-200/50" strokeWidth="1" vectorEffect="non-scaling-stroke">
                {/* Lines to Tehsils */}
                <line x1="450" y1="500" x2="435" y2="485" /> {/* Mandal */}
                <line x1="450" y1="500" x2="470" y2="480" /> {/* Banera */}
                <line x1="450" y1="500" x2="500" y2="470" /> {/* Shahpura */}
                <line x1="500" y1="470" x2="530" y2="460" /> {/* Jahazpur */}
                <line x1="450" y1="500" x2="480" y2="510" /> {/* Kotri */}
                <line x1="450" y1="500" x2="500" y2="550" /> {/* Mandalgarh */}
                <line x1="500" y1="550" x2="530" y2="570" /> {/* Beejoliya */}
                <line x1="450" y1="500" x2="420" y2="540" /> {/* Sahada */}
                <line x1="450" y1="500" x2="410" y2="510" /> {/* Raipur */}
                <line x1="450" y1="500" x2="420" y2="460" /> {/* Asind */}
                <line x1="450" y1="500" x2="440" y2="450" /> {/* Hurda */}
            </g>

            {/* Nodes and Labels */}
            {/* Groups allow specific animation targeting */}
            
            {/* Mandal */}
            <g>
                <circle cx="435" cy="485" r="1.5" className="fill-white" />
                <text x="432" y="484" className="fill-white font-bold" textAnchor="end" style={{ fontSize: '5px', textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}>Mandal</text>
            </g>
            {/* Banera */}
            <g>
                <circle cx="470" cy="480" r="1.5" className="fill-white" />
                <text x="474" y="482" className="fill-white font-bold" textAnchor="start" style={{ fontSize: '5px', textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}>Banera</text>
            </g>
             {/* Shahpura */}
            <g>
                <circle cx="500" cy="470" r="1.5" className="fill-white" />
                <text x="500" y="466" className="fill-white font-bold" textAnchor="middle" style={{ fontSize: '5px', textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}>Shahpura</text>
            </g>
            {/* Jahazpur */}
            <g>
                <circle cx="530" cy="460" r="1.2" className="fill-blue-200" />
                <text x="534" y="461" className="fill-blue-100 font-bold" textAnchor="start" style={{ fontSize: '4.5px', textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}>Jahazpur</text>
            </g>
             {/* Kotri */}
            <g>
                <circle cx="480" cy="510" r="1.5" className="fill-white" />
                <text x="484" y="512" className="fill-white font-bold" textAnchor="start" style={{ fontSize: '5px', textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}>Kotri</text>
            </g>
             {/* Mandalgarh */}
            <g>
                <circle cx="500" cy="550" r="1.5" className="fill-white" />
                <text x="504" y="552" className="fill-white font-bold" textAnchor="start" style={{ fontSize: '5px', textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}>Mandalgarh</text>
            </g>
             {/* Beejoliya */}
            <g>
                <circle cx="530" cy="570" r="1.2" className="fill-blue-200" />
                <text x="534" y="572" className="fill-blue-100 font-bold" textAnchor="start" style={{ fontSize: '4.5px', textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}>Beejoliya</text>
            </g>
             {/* Sahada */}
            <g>
                <circle cx="420" cy="540" r="1.5" className="fill-white" />
                <text x="416" y="542" className="fill-white font-bold" textAnchor="end" style={{ fontSize: '5px', textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}>Sahada</text>
            </g>
             {/* Raipur */}
            <g>
                <circle cx="410" cy="510" r="1.5" className="fill-white" />
                <text x="406" y="512" className="fill-white font-bold" textAnchor="end" style={{ fontSize: '5px', textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}>Raipur</text>
            </g>
             {/* Asind */}
            <g>
                <circle cx="420" cy="460" r="1.5" className="fill-white" />
                <text x="416" y="462" className="fill-white font-bold" textAnchor="end" style={{ fontSize: '5px', textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}>Asind</text>
            </g>
             {/* Hurda */}
            <g>
                <circle cx="440" cy="450" r="1.5" className="fill-white" />
                <text x="438" y="448" className="fill-white font-bold" textAnchor="end" style={{ fontSize: '5px', textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}>Hurda</text>
            </g>
          </g>

          {/* Central Hub: Bhilwara */}
          <g ref={bhilwaraRef} transform="translate(450, 500)">
            <circle r="8" className="fill-white animate-pulse" filter="url(#glow)" />
            <circle r="20" fill="url(#hubGradient)" className="opacity-60" />
          </g>
          
          <text 
            ref={bhilwaraLabelRef}
            x="450" 
            y="525" 
            textAnchor="middle" 
            className="fill-white font-extrabold tracking-widest uppercase"
            style={{ fontSize: '10px', textShadow: '0 2px 4px rgba(0,0,0,0.9)' }}
          >
            Bhilwara
          </text>

        </g>
        
        {/* Static UI Overlay */}
        <g pointerEvents="none">
             <rect x="20" y="20" width="160" height="30" rx="4" className="fill-slate-900/90 stroke-white/20" />
             <circle cx="35" cy="35" r="4" className="fill-green-500 animate-pulse" />
             <text x="50" y="40" className="fill-white text-xs font-mono font-bold">LIVE TRACKING: ACTIVE</text>
        </g>
      </svg>
    </div>
  );
};