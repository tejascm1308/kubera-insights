import { Link } from 'react-router-dom';
import { ArrowRight, Play, TrendingUp, Shield, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 animated-gradient" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLW9wYWNpdHk9IjAuMDMiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-50" />
      
      <div className="container relative py-20 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-4 py-1.5 text-sm backdrop-blur-sm animate-fade-in-up">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-success"></span>
            </span>
            <span className="text-muted-foreground">Powered by Advanced AI</span>
          </div>

          {/* Main Heading */}
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            <span className="font-logo text-primary">KUBERA</span>
            <span className="block mt-2 text-foreground">Your AI Stock Analyst</span>
          </h1>

          {/* Subheadline */}
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground md:text-xl animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            Get personalized insights on Indian stocks with advanced AI and real-time data. 
            Analyze NSE & BSE stocks, manage your portfolio, and make smarter investment decisions.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
            <Button asChild size="lg" className="h-12 px-8 text-base">
              <Link to="/register">
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="h-12 px-8 text-base">
              <Play className="mr-2 h-4 w-4" />
              View Demo
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground animate-fade-in-up" style={{ animationDelay: '400ms' }}>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-success" />
              <span>Real-time NSE & BSE Data</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" />
              <span>Bank-level Security</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-warning" />
              <span>Instant AI Analysis</span>
            </div>
          </div>
        </div>

        {/* Hero Visual - Mock Chat Interface */}
        <div className="mx-auto mt-16 max-w-4xl animate-fade-in-up" style={{ animationDelay: '500ms' }}>
          <div className="relative rounded-2xl border border-border bg-card/80 p-4 shadow-2xl backdrop-blur-sm">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-medium text-primary-foreground">
              Live Demo
            </div>
            
            {/* Mock Chat Messages */}
            <div className="space-y-4 p-4">
              <div className="flex justify-end">
                <div className="max-w-[80%] rounded-2xl rounded-br-md bg-user-message px-4 py-3 text-user-message-foreground">
                  <p className="text-sm">Analyze Reliance Industries for me</p>
                </div>
              </div>
              
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-2xl rounded-bl-md border border-border bg-bot-message px-4 py-3 text-bot-message-foreground">
                  <p className="text-sm mb-3">
                    📊 <strong>Reliance Industries (RELIANCE.NS)</strong>
                  </p>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="rounded-lg bg-muted p-2">
                      <span className="text-muted-foreground">Current Price</span>
                      <p className="font-mono font-semibold">₹2,847.50</p>
                    </div>
                    <div className="rounded-lg bg-muted p-2">
                      <span className="text-muted-foreground">Day Change</span>
                      <p className="font-mono font-semibold text-success">+1.24%</p>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">
                    Strong fundamentals with diversified business segments. Currently trading above 50-DMA...
                  </p>
                </div>
              </div>
            </div>

            {/* Mock Input */}
            <div className="flex items-center gap-3 rounded-xl border border-border bg-background p-3">
              <input
                type="text"
                placeholder="Ask about any Indian stock..."
                className="flex-1 bg-transparent text-sm outline-none"
                disabled
              />
              <Button size="sm" disabled>
                Send
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
