import { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Plus, 
  History, 
  Settings, 
  BarChart3, 
  TrendingUp,
  TrendingDown,
  MessageSquare,
  Loader2,
  Copy,
  ThumbsUp,
  ThumbsDown,
  RefreshCw,
  ChevronRight,
  Sparkles,
  Wrench
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { ClockWidget } from '@/components/common/ClockWidget';
import { MarketStatus } from '@/components/common/MarketStatus';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import type { Message, Chat } from '@/types';

// Mock data
const mockChats: Chat[] = [
  { chat_id: '1', title: 'Reliance Analysis', created_at: new Date().toISOString(), updated_at: new Date().toISOString(), message_count: 5, preview: 'Analyzing Reliance Industries...' },
  { chat_id: '2', title: 'TCS vs Infosys', created_at: new Date(Date.now() - 86400000).toISOString(), updated_at: new Date().toISOString(), message_count: 8, preview: 'Comparing IT giants...' },
];

const mockHoldings = [
  { symbol: 'RELIANCE.NS', name: 'Reliance Industries', price: 2847.50, change: 1.24 },
  { symbol: 'TCS.NS', name: 'Tata Consultancy', price: 3542.80, change: -0.45 },
  { symbol: 'INFY.NS', name: 'Infosys Ltd', price: 1623.15, change: 2.10 },
];

const mockTopGainers = [
  { symbol: 'ADANIPOWER', change: 8.5 },
  { symbol: 'TATASTEEL', change: 5.2 },
  { symbol: 'SBIN', change: 3.8 },
];

const suggestedPrompts = [
  'Analyze Reliance Industries',
  'Compare TCS and Infosys',
  "What's the IT sector doing?",
  'Show HDFC Bank technical charts',
];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeToolCall, setActiveToolCall] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateStreaming = async (response: string) => {
    const messageId = Date.now().toString();
    setMessages(prev => [...prev, {
      id: messageId,
      chat_id: '1',
      role: 'assistant',
      content: '',
      timestamp: new Date().toISOString(),
    }]);

    // Simulate tool call
    setActiveToolCall('Fetching stock data');
    await new Promise(r => setTimeout(r, 800));
    setActiveToolCall(null);

    // Stream the response word by word
    const words = response.split(' ');
    for (let i = 0; i < words.length; i++) {
      await new Promise(r => setTimeout(r, 30));
      setMessages(prev => prev.map(msg => 
        msg.id === messageId 
          ? { ...msg, content: words.slice(0, i + 1).join(' ') }
          : msg
      ));
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      chat_id: '1',
      role: 'user',
      content: input,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response
    const mockResponse = `📊 **Stock Analysis for ${input.includes('Reliance') ? 'Reliance Industries (RELIANCE.NS)' : input.includes('TCS') ? 'TCS (TCS.NS)' : 'the requested stock'}**

**Current Price:** ₹2,847.50
**Day Change:** +₹35.20 (+1.24%)
**52-Week Range:** ₹2,180.00 - ₹3,024.90

**Key Metrics:**
• P/E Ratio: 28.5
• Market Cap: ₹19.25 Lakh Cr
• Dividend Yield: 0.32%

**Technical Analysis:**
The stock is currently trading above its 50-day moving average (₹2,720) and 200-day moving average (₹2,580), indicating a bullish trend. RSI is at 62, suggesting moderate momentum without being overbought.

**Recommendation:** The stock shows strong fundamentals with diversified business segments. Consider holding existing positions or accumulating on dips around the ₹2,700-2,750 support zone.`;

    await simulateStreaming(mockResponse);
    setIsLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handlePromptClick = (prompt: string) => {
    setInput(prompt);
    setTimeout(() => handleSend(), 100);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Chat History */}
        <div className={cn(
          "hidden lg:flex flex-col w-64 border-r border-border bg-sidebar transition-all duration-300",
          !sidebarOpen && "w-0 border-none"
        )}>
          <div className="p-4">
            <Button className="w-full" onClick={() => setMessages([])}>
              <Plus className="mr-2 h-4 w-4" />
              New Chat
            </Button>
          </div>
          
          <ScrollArea className="flex-1 px-2">
            <div className="space-y-1">
              <div className="px-2 py-1 text-xs font-medium text-muted-foreground">Today</div>
              {mockChats.map(chat => (
                <button
                  key={chat.chat_id}
                  className="w-full flex items-start gap-2 rounded-lg px-3 py-2 text-left text-sm hover:bg-sidebar-accent transition-colors"
                >
                  <MessageSquare className="h-4 w-4 mt-0.5 shrink-0 text-muted-foreground" />
                  <div className="flex-1 overflow-hidden">
                    <p className="font-medium truncate">{chat.title}</p>
                    <p className="text-xs text-muted-foreground truncate">{chat.preview}</p>
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>
          
          <div className="p-3 border-t border-sidebar-border text-xs text-muted-foreground text-center">
            <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px]">Cmd</kbd> + <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px]">N</kbd> for new chat
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Chat Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border">
            <div className="flex items-center gap-2">
              <History className="h-4 w-4 text-muted-foreground" />
              <h2 className="font-medium">New Chat</h2>
            </div>
            <div className="flex items-center gap-2">
              <ClockWidget />
              <MarketStatus />
            </div>
          </div>

          {/* Messages Area */}
          <ScrollArea className="flex-1 p-4">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center max-w-2xl mx-auto">
                <div className="mb-8">
                  <span className="font-logo text-5xl text-primary">KUBERA</span>
                  <p className="mt-3 text-muted-foreground">
                    Your AI-powered stock analyst. Ask about any Indian stock.
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-3 w-full max-w-md">
                  {suggestedPrompts.map(prompt => (
                    <button
                      key={prompt}
                      onClick={() => handlePromptClick(prompt)}
                      className="flex items-center gap-2 rounded-xl border border-border bg-card p-4 text-left text-sm hover:border-primary/50 hover:bg-card/80 transition-all"
                    >
                      <Sparkles className="h-4 w-4 text-primary shrink-0" />
                      <span>{prompt}</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="max-w-3xl mx-auto space-y-4">
                {messages.map(message => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex animate-fade-in",
                      message.role === 'user' ? 'justify-end' : 'justify-start'
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[85%] rounded-2xl px-4 py-3",
                        message.role === 'user'
                          ? 'message-user rounded-br-md'
                          : 'message-bot rounded-bl-md'
                      )}
                    >
                      {message.role === 'assistant' && (
                        <div className="flex items-center gap-2 mb-2 text-xs text-muted-foreground">
                          <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                            <span className="font-logo text-[10px] text-primary-foreground">K</span>
                          </div>
                          <span>KUBERA</span>
                        </div>
                      )}
                      <div className="prose prose-sm dark:prose-invert max-w-none">
                        <p className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</p>
                      </div>
                      {message.role === 'assistant' && message.content && (
                        <div className="flex items-center gap-1 mt-3 pt-2 border-t border-border/50">
                          <Button variant="ghost" size="sm" className="h-7 px-2">
                            <Copy className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-7 px-2">
                            <RefreshCw className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-7 px-2">
                            <ThumbsUp className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-7 px-2">
                            <ThumbsDown className="h-3 w-3" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {activeToolCall && (
                  <div className="flex justify-start animate-fade-in">
                    <div className="inline-flex items-center gap-2 rounded-full bg-muted px-4 py-2 text-sm">
                      <Wrench className="h-4 w-4 text-primary animate-pulse" />
                      <span className="text-muted-foreground">{activeToolCall}...</span>
                    </div>
                  </div>
                )}

                {isLoading && !activeToolCall && (
                  <div className="flex justify-start animate-fade-in">
                    <div className="message-bot rounded-2xl rounded-bl-md px-4 py-3">
                      <div className="typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            )}
          </ScrollArea>

          {/* Input Area */}
          <div className="border-t border-border p-4">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-end gap-3 rounded-xl border border-border bg-card p-3 focus-within:border-primary/50 transition-colors">
                <Textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about any Indian stock (e.g., 'Analyze TCS' or 'Compare Infosys vs Wipro')"
                  className="min-h-[44px] max-h-[200px] resize-none border-0 bg-transparent p-0 focus-visible:ring-0 placeholder:text-muted-foreground"
                  rows={1}
                />
                <Button 
                  onClick={handleSend} 
                  disabled={!input.trim() || isLoading}
                  size="sm"
                  className="shrink-0"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <p className="mt-2 text-center text-xs text-muted-foreground">
                Press Enter to send, Shift + Enter for new line
              </p>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Context Panel */}
        <div className="hidden xl:flex flex-col w-80 border-l border-border bg-card">
          <Tabs defaultValue="portfolio" className="flex-1 flex flex-col">
            <TabsList className="mx-4 mt-4 grid grid-cols-3">
              <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
              <TabsTrigger value="market">Market</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="portfolio" className="flex-1 p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Your Holdings ({mockHoldings.length})</h3>
                <Button variant="ghost" size="sm" className="text-xs h-7">
                  Edit
                </Button>
              </div>
              <div className="space-y-2">
                {mockHoldings.map(stock => (
                  <div key={stock.symbol} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer group">
                    <div>
                      <p className="font-medium text-sm">{stock.name}</p>
                      <p className="text-xs text-muted-foreground">{stock.symbol}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-mono text-sm">₹{stock.price.toLocaleString()}</p>
                      <p className={cn(
                        "text-xs font-medium",
                        stock.change >= 0 ? "text-success" : "text-destructive"
                      )}>
                        {stock.change >= 0 ? '+' : ''}{stock.change}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full" asChild>
                <a href="/portfolio">
                  View Full Portfolio
                  <ChevronRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </TabsContent>

            <TabsContent value="market" className="flex-1 p-4 space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="h-4 w-4 text-success" />
                  <h3 className="font-medium text-sm">Top Gainers</h3>
                </div>
                <div className="space-y-2">
                  {mockTopGainers.map(stock => (
                    <div key={stock.symbol} className="flex items-center justify-between p-2 rounded-lg bg-success/10">
                      <span className="font-mono text-sm">{stock.symbol}</span>
                      <span className="text-success text-sm font-medium">+{stock.change}%</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <TrendingDown className="h-4 w-4 text-destructive" />
                  <h3 className="font-medium text-sm">Top Losers</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-destructive/10">
                    <span className="font-mono text-sm">HDFCBANK</span>
                    <span className="text-destructive text-sm font-medium">-2.1%</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-destructive/10">
                    <span className="font-mono text-sm">ICICIBANK</span>
                    <span className="text-destructive text-sm font-medium">-1.8%</span>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="settings" className="flex-1 p-4 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm">Include portfolio</Label>
                  <p className="text-xs text-muted-foreground">Use holdings in analysis</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm">Technical indicators</Label>
                  <p className="text-xs text-muted-foreground">Show charts & indicators</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm">Voice responses</Label>
                  <p className="text-xs text-muted-foreground">Coming soon</p>
                </div>
                <Switch disabled />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
