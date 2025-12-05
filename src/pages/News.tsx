import { useState } from 'react';
import { Search, ExternalLink, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import type { NewsArticle } from '@/types';

const mockNews: NewsArticle[] = [
  {
    id: '1',
    title: 'Reliance Industries reports strong Q3 earnings, exceeds market expectations',
    source: 'Economic Times',
    timestamp: '2024-12-05T09:30:00Z',
    snippet: 'Reliance Industries Ltd reported a 15% increase in consolidated net profit for Q3 FY25, driven by strong performance across its retail and digital services segments.',
    sentiment: 'positive',
    related_stocks: ['RELIANCE.NS'],
    url: '#',
    image_url: 'https://via.placeholder.com/400x200',
  },
  {
    id: '2',
    title: 'IT sector faces headwinds as global tech spending slows',
    source: 'Mint',
    timestamp: '2024-12-05T08:45:00Z',
    snippet: 'Indian IT companies may face challenges in the coming quarters as global technology spending shows signs of moderation amid economic uncertainty.',
    sentiment: 'negative',
    related_stocks: ['TCS.NS', 'INFY.NS', 'WIPRO.NS'],
    url: '#',
  },
  {
    id: '3',
    title: 'SEBI introduces new regulations for algorithmic trading',
    source: 'Business Standard',
    timestamp: '2024-12-05T07:15:00Z',
    snippet: 'The Securities and Exchange Board of India has announced new guidelines for algorithmic trading to enhance market stability and investor protection.',
    sentiment: 'neutral',
    related_stocks: [],
    url: '#',
  },
  {
    id: '4',
    title: 'Banking sector rally continues as RBI maintains accommodative stance',
    source: 'Moneycontrol',
    timestamp: '2024-12-04T16:30:00Z',
    snippet: 'Bank Nifty extended its winning streak for the fifth consecutive session as the RBI kept interest rates unchanged in its latest monetary policy meeting.',
    sentiment: 'positive',
    related_stocks: ['HDFCBANK.NS', 'ICICIBANK.NS', 'SBIN.NS'],
    url: '#',
    image_url: 'https://via.placeholder.com/400x200',
  },
  {
    id: '5',
    title: 'Adani Group stocks surge after successful debt refinancing',
    source: 'Reuters',
    timestamp: '2024-12-04T14:20:00Z',
    snippet: 'Shares of Adani Group companies rallied sharply after the conglomerate announced successful completion of a major debt refinancing deal with international banks.',
    sentiment: 'positive',
    related_stocks: ['ADANIENT.NS', 'ADANIPOWER.NS'],
    url: '#',
  },
  {
    id: '6',
    title: 'Auto sales data for November shows mixed picture',
    source: 'LiveMint',
    timestamp: '2024-12-04T11:00:00Z',
    snippet: 'Indian automobile manufacturers reported mixed sales numbers for November, with two-wheeler segment showing growth while passenger vehicles remained flat.',
    sentiment: 'neutral',
    related_stocks: ['TATAMOTORS.NS', 'MARUTI.NS', 'BAJAJ-AUTO.NS'],
    url: '#',
  },
];

const categories = ['All', 'Stocks', 'Sectors', 'Economy', 'IPOs'];

export default function NewsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredNews = mockNews.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.snippet.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    return date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return <TrendingUp className="h-4 w-4" />;
      case 'negative':
        return <TrendingDown className="h-4 w-4" />;
      default:
        return <Minus className="h-4 w-4" />;
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'bg-success/10 text-success border-success/20';
      case 'negative':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  // Calculate market sentiment
  const sentimentCounts = mockNews.reduce(
    (acc, article) => {
      acc[article.sentiment]++;
      return acc;
    },
    { positive: 0, neutral: 0, negative: 0 }
  );
  const total = mockNews.length;
  const sentimentPercents = {
    positive: Math.round((sentimentCounts.positive / total) * 100),
    neutral: Math.round((sentimentCounts.neutral / total) * 100),
    negative: Math.round((sentimentCounts.negative / total) * 100),
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Market News</h1>
          <p className="text-muted-foreground">Stay updated with the latest market developments</p>
        </div>

        {/* Sentiment Overview */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h2 className="text-lg font-semibold mb-1">Market Sentiment</h2>
                <p className="text-2xl font-bold text-success flex items-center gap-2">
                  <TrendingUp className="h-6 w-6" />
                  Bullish
                </p>
              </div>
              <div className="flex gap-8">
                <div className="text-center">
                  <p className="text-2xl font-bold text-success">{sentimentPercents.positive}%</p>
                  <p className="text-sm text-muted-foreground">Positive</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-muted-foreground">{sentimentPercents.neutral}%</p>
                  <p className="text-sm text-muted-foreground">Neutral</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-destructive">{sentimentPercents.negative}%</p>
                  <p className="text-sm text-muted-foreground">Negative</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full sm:w-auto">
            <TabsList>
              {categories.map(cat => (
                <TabsTrigger key={cat} value={cat}>{cat}</TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          <div className="relative flex-1 max-w-md ml-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search news..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        {/* News Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredNews.map(article => (
            <Card key={article.id} className="overflow-hidden hover-lift group">
              {article.image_url && (
                <div className="aspect-video bg-muted overflow-hidden">
                  <img
                    src={article.image_url}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{article.source}</span>
                    <span>•</span>
                    <span>{formatTimestamp(article.timestamp)}</span>
                  </div>
                  <Badge variant="outline" className={cn("gap-1", getSentimentColor(article.sentiment))}>
                    {getSentimentIcon(article.sentiment)}
                    {article.sentiment}
                  </Badge>
                </div>

                <h3 className="font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                  {article.title}
                </h3>
                
                <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                  {article.snippet}
                </p>

                {article.related_stocks.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {article.related_stocks.map(stock => (
                      <Badge key={stock} variant="secondary" className="text-xs font-mono">
                        {stock.replace('.NS', '')}
                      </Badge>
                    ))}
                  </div>
                )}

                <Button variant="ghost" size="sm" className="w-full" asChild>
                  <a href={article.url} target="_blank" rel="noopener noreferrer">
                    Read more
                    <ExternalLink className="ml-2 h-3 w-3" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
