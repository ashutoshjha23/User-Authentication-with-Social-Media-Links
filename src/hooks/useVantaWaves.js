
import { useEffect, useRef } from 'react';
import * as THREE from 'three';  
import WAVES from 'vanta/dist/vanta.waves.min'; 
const useVantaWaves = () => {
  const vantaRef = useRef(null);

  useEffect(() => {
    const vantaEffect = WAVES({
      el: vantaRef.current,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      scale: 1.00,
      scaleMobile: 1.00,
      color: 0x0,
    });

    return () => {
      if (vantaEffect) vantaEffect.destroy(); 
    };
  }, []);

  return vantaRef;
};

export default useVantaWaves;
