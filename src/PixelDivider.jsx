import React, { useEffect, useRef } from 'react';

const ROWS = 8;
const BLOCK_SIZE = 48; // Increased size of each square block in pixels

function PixelDivider() {
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
    };
    
    window.addEventListener('resize', resize);
    resize();

    // Pre-generate random seeds for the columns to ensure consistent patterns
    const seeds = Array.from({ length: 300 }, () => 
      Array.from({ length: ROWS }, () => Math.random())
    );

    let animationFrameId;

    const render = () => {
      // Use window.scrollY to drive the animation pattern
      const scrollY = window.scrollY;
      const width = window.innerWidth;
      const height = ROWS * BLOCK_SIZE;
      
      const cols = Math.ceil(width / BLOCK_SIZE);
      
      // Clear background with the beige color from the landing page
      ctx.fillStyle = '#f2f0e6';
      ctx.fillRect(0, 0, width, height);

      for (let x = 0; x < cols; x++) {
        for (let y = 0; y < ROWS; y++) {
          // The bottom two rows are mostly solid blue to ground the divider
          if (y >= ROWS - 2) {
            ctx.fillStyle = '#094CB8';
            ctx.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE + 1, BLOCK_SIZE + 1); // +1 prevents subpixel gaps
            continue;
          }

          const seedX = x % seeds.length;
          const seed = seeds[seedX][y];
          
          // Combine Sine waves with scroll position to create organic shifting clusters
          const waveX = Math.sin(x * 0.3 + scrollY * 0.004);
          const waveY = Math.cos(y * 0.5 - scrollY * 0.003);
          const noise = Math.sin(seed * 15 + scrollY * 0.015);
          
          const value = waveX + waveY + noise;
          
          // Lower rows have a lower threshold (more likely to spawn a block)
          const threshold = 2.0 - (y * 0.3);

          if (value > threshold) {
            // 15% chance for a cyan block, otherwise standard blue
            ctx.fillStyle = seed > 0.85 ? '#5CE1E6' : '#094CB8';
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
    <div style={{ width: '100%', backgroundColor: '#f2f0e6', paddingTop: '40px' }}>
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%' }} />
    </div>
  );
}

export default PixelDivider;
