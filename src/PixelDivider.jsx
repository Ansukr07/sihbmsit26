import React, { useEffect, useRef } from 'react';

const ROWS = 4; // Reduced to 4 vertical boxes
const BLOCK_SIZE = 48; // Increased size of each square block in pixels

function PixelDivider({ 
  topColor = '#f2f0e6', 
  bottomColor = '#094CB8', 
  accentColor = '#5CE1E6' 
}) {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Maintain sharp pixels for high DPI displays
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = ROWS * BLOCK_SIZE * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${ROWS * BLOCK_SIZE}px`;
      canvas.style.display = 'block'; // Removes the baseline gap that causes the beige line
    };
    
    window.addEventListener('resize', resize);
    resize();

    // Pre-generate random seeds for the columns to ensure consistent patterns
    const seeds = Array.from({ length: 300 }, () => 
      Array.from({ length: ROWS }, () => Math.random())
    );

    let animationFrameId;

    const render = () => {
      // Use window.scrollY to drive the animation pattern itself (for continuous morphing)
      const scrollY = window.scrollY;
      const width = window.innerWidth;
      const height = ROWS * BLOCK_SIZE;
      
      const cols = Math.ceil(width / BLOCK_SIZE);
      
      // Clear background with the provided top color
      ctx.fillStyle = topColor;
      ctx.fillRect(0, 0, width, height);

      // Calculate a "fill" factor based on when this specific canvas enters the screen.
      const rect = canvas.getBoundingClientRect();
      const visiblePixels = window.innerHeight - rect.top;
      // Start filling slightly after it enters the screen
      const scrollFill = Math.max(0, (visiblePixels - 50) * 0.0003);

      for (let x = 0; x < cols; x++) {
        for (let y = 0; y < ROWS; y++) {
          // The bottom row is always solid bottomColor to ground the divider
          if (y === ROWS - 1) {
            ctx.fillStyle = bottomColor;
            ctx.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE + 1, BLOCK_SIZE + 1); // +1 prevents subpixel gaps
            continue;
          }

          const seedX = x % seeds.length;
          const seed = seeds[seedX][y];
          
          // Combine Sine waves with scroll position to create organic shifting clusters
          const waveX = Math.sin(x * 0.3 + scrollY * 0.0004);
          const waveY = Math.cos(y * 0.5 - scrollY * 0.0003);
          const noise = Math.sin(seed * 15 + scrollY * 0.001);
          
          // Normalize the combined waves so the value is strictly between 0.0 and 1.0
          const value = (waveX + waveY + noise + 3) / 6;
          
          // Base threshold depends on row (y). 
          const threshold = 0.8 - (y * 0.2) - scrollFill;

          if (value > threshold) {
            const cyanThreshold = 0.85 + (scrollFill * 0.5);
            ctx.fillStyle = seed > cyanThreshold ? accentColor : bottomColor;
            ctx.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE + 1, BLOCK_SIZE + 1);
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div style={{ width: '100%', backgroundColor: topColor, paddingTop: '40px' }}>
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%' }} />
    </div>
  );
}

export default PixelDivider;
