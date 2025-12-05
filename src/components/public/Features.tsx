import { 
  MessageSquare, 
  BarChart3, 
  TrendingUp, 
  Bell, 
  Newspaper, 
  Shield,
  Zap,
  LineChart,
  PieChart
} from 'lucide-react';

const features = [
  {
    icon: MessageSquare,
    title: 'AI Chat Analysis',
    description: 'Ask questions in natural language and get detailed stock analysis, technical indicators, and investment insights.',
  },
  {
    icon: BarChart3,
    title: 'Portfolio Tracking',
    description: 'Track your holdings in real-time with P&L calculations, sector allocation, and performance metrics.',
  },
  {
    icon: TrendingUp,
    title: 'Real-time Data',
    description: 'Access live market data from NSE and BSE exchanges with instant price updates and volume analysis.',
  },
  {
    icon: LineChart,
    title: 'Technical Charts',
    description: 'Interactive candlestick charts with indicators like RSI, MACD, Moving Averages, and Bollinger Bands.',
  },
  {
    icon: Bell,
    title: 'Price Alerts',
    description: 'Set custom price alerts for your watchlist stocks and get notified when targets are hit.',
  },
  {
    icon: Newspaper,
    title: 'News & Sentiment',
    description: 'Stay updated with market news and AI-powered sentiment analysis for better decision making.',
  },
  {
    icon: PieChart,
    title: 'Sector Analysis',
    description: 'Understand sector performance and diversification with detailed breakdown and comparisons.',
  },
  {
    icon: Shield,
    title: 'Secure & Private',
    description: 'Your data is encrypted and secure. We never share your portfolio or personal information.',
  },
  {
    icon: Zap,
    title: 'Instant Insights',
    description: 'Get quick summaries and key metrics without wading through complex financial reports.',
  },
];

export function Features() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Everything You Need for Smarter Investing
          </h2>
          <p className="text-lg text-muted-foreground">
            Powerful features designed to help you analyze stocks, track your portfolio, and make informed decisions.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group relative rounded-xl border border-border bg-card p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-primary/20"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
