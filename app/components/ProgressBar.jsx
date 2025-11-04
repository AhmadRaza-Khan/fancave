import {useEffect, useState} from 'react';

export default function ProgressBar() {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const startLoading = () => {
      setLoading(true);
      setProgress(0);
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) return prev;
          return prev + 10;
        });
      }, 200);
      return interval;
    };

    const stopLoading = (interval) => {
      setProgress(100);
      setTimeout(() => {
        clearInterval(interval);
        setLoading(false);
        setProgress(0);
      }, 400);
    };
    
    window.addEventListener('beforeunload', () => startLoading());
    return () => window.removeEventListener('beforeunload', () => startLoading());
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 h-[3px] bg-blue-500 transition-all duration-300 ${
        loading ? 'opacity-100' : 'opacity-0'
      }`}
      style={{width: `${progress}%`, zIndex: 9999}}
    />
  );
}
