import { useState, useEffect } from 'react';
import { format } from 'date-fns';

export function ClockWidget() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-border bg-card px-3 py-1.5 text-center">
      <span className="text-sm font-medium font-mono">{format(time, 'hh:mm a')}</span>
      <span className="text-xs text-muted-foreground">{format(time, 'EEEE')}</span>
    </div>
  );
}
