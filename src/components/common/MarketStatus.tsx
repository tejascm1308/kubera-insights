import { useMemo } from 'react';

export function MarketStatus() {
  const { isOpen, statusText, nextSession } = useMemo(() => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const day = now.getDay();
    const currentTime = hours * 60 + minutes;
    
    // Market hours: 9:15 AM to 3:30 PM IST, Mon-Fri
    const marketOpen = 9 * 60 + 15; // 9:15 AM
    const marketClose = 15 * 60 + 30; // 3:30 PM
    
    const isWeekday = day >= 1 && day <= 5;
    const isDuringHours = currentTime >= marketOpen && currentTime < marketClose;
    const isOpen = isWeekday && isDuringHours;
    
    let nextSession = '';
    if (!isOpen) {
      if (isWeekday && currentTime < marketOpen) {
        const minsUntil = marketOpen - currentTime;
        const h = Math.floor(minsUntil / 60);
        const m = minsUntil % 60;
        nextSession = `Opens in ${h}h ${m}m`;
      } else if (day === 6) {
        nextSession = 'Opens Monday 9:15 AM';
      } else if (day === 0) {
        nextSession = 'Opens Monday 9:15 AM';
      } else {
        nextSession = 'Opens tomorrow 9:15 AM';
      }
    } else {
      const minsUntil = marketClose - currentTime;
      const h = Math.floor(minsUntil / 60);
      const m = minsUntil % 60;
      nextSession = `Closes in ${h}h ${m}m`;
    }
    
    return {
      isOpen,
      statusText: isOpen ? 'Market Open' : 'Market Closed',
      nextSession
    };
  }, []);

  return (
    <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-1.5">
      <div className="relative flex h-2 w-2">
        <span className={`absolute inline-flex h-full w-full rounded-full ${isOpen ? 'bg-success animate-ping' : 'bg-muted-foreground'} opacity-75`}></span>
        <span className={`relative inline-flex h-2 w-2 rounded-full ${isOpen ? 'bg-success' : 'bg-muted-foreground'}`}></span>
      </div>
      <div className="flex flex-col">
        <span className={`text-xs font-medium ${isOpen ? 'text-success' : 'text-muted-foreground'}`}>
          {statusText}
        </span>
        <span className="text-[10px] text-muted-foreground">{nextSession}</span>
      </div>
    </div>
  );
}
