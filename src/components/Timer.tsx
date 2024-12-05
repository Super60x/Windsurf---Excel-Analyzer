import React, { useEffect, useState } from 'react';

interface TimerProps {
  initialSeconds: number;
  onComplete: () => void;
}

const Timer: React.FC<TimerProps> = ({ initialSeconds, onComplete }) => {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    if (seconds > 0) {
      const timerId = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds - 1);
      }, 1000);

      return () => clearInterval(timerId);
    } else {
      onComplete();
    }
  }, [seconds, onComplete]);

  return (
    <div style={{ position: 'absolute', top: 10, right: 10, backgroundColor: 'rgba(0, 0, 0, 0.5)', color: 'white', padding: '5px 10px', borderRadius: '5px' }}>
      {seconds}s
    </div>
  );
};

export default Timer;
