import { useState } from 'react';
import { 
  Plus, 
  Search, 
  TrendingUp, 
  TrendingDown,
  Bell,
  Trash2,
  BarChart3,
  LayoutGrid,
  List
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { WatchlistStock } from '@/types';

const mockWatchlist: WatchlistStock[] = [
  { stock_id: '1', symbol: 'ADANIENT.NS', name: 'Adani Enterprises', current_price: 2834.50, change_percent: 4.25, change_absolute: 115.80, volume: 12500000, market_cap: 323000 },
  { stock_id: '2', symbol: 'TATAMOTORS.NS', name: 'Tata Motors', current_price: 785.30, change_percent: -1.85, change_absolute: -14.80, volume: 8900000, market_cap: 293000 },
  { stock_id: '3', symbol: 'BAJFINANCE.NS', name: 'Bajaj Finance', current_price: 7245.60, change_percent: 2.10, change_absolute: 149.20, volume: 2100000, market_cap: 447000 },
  { stock_id: '4', symbol: 'LT.NS', name: 'Larsen & Toubro', current_price: 3156.75, change_percent: 0.95, change_absolute: 29.70, volume: 3400000, market_cap: 433000 },
  { stock_id: '5', symbol: 'MARUTI.NS', name: 'Maruti Suzuki', current_price: 10234.50, change_percent: -0.45, change_absolute: -46.30, volume: 1800000, market_cap: 320000 },
  { stock_id: '6', symbol: 'SUNPHARMA.NS', name: 'Sun Pharmaceutical', current_price: 1456.80, change_percent: 1.65, change_absolute: 23.70, volume: 4500000, market_cap: 350000 },
];

export default function WatchlistPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStocks = mockWatchlist.filter(stock =>
    stock.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    stock.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatVolume = (volume: number) => {
    if (volume >= 10000000) return `${(volume / 10000000).toFixed(1)}Cr`;
    if (volume >= 100000) return `${(volume / 100000).toFixed(1)}L`;
    return volume.toLocaleString();
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Watchlist</h1>
            <p className="text-muted-foreground">{mockWatchlist.length} stocks tracked</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Stock
          </Button>
        </div>

        {/* Search & View Toggle */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search watchlist..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex items-center gap-1 border border-border rounded-lg p-1">
            <Button
              variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Stock Cards Grid View */}
        {viewMode === 'grid' && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredStocks.map(stock => (
              <Card key={stock.stock_id} className="hover-lift group">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold">{stock.name}</h3>
                      <p className="text-sm text-muted-foreground font-mono">{stock.symbol}</p>
                    </div>
                    <div className={cn(
                      "flex items-center gap-1 px-2 py-1 rounded-full text-sm font-medium",
                      stock.change_percent >= 0 
                        ? "bg-success/10 text-success" 
                        : "bg-destructive/10 text-destructive"
                    )}>
                      {stock.change_percent >= 0 ? (
                        <TrendingUp className="h-3 w-3" />
                      ) : (
                        <TrendingDown className="h-3 w-3" />
                      )}
                      {stock.change_percent >= 0 ? '+' : ''}{stock.change_percent}%
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-2xl font-bold font-mono">
                      ₹{stock.current_price.toLocaleString()}
                    </p>
                    <p className={cn(
                      "text-sm",
                      stock.change_absolute >= 0 ? "text-success" : "text-destructive"
                    )}>
                      {stock.change_absolute >= 0 ? '+' : ''}₹{stock.change_absolute.toFixed(2)}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                    <span>Volume: {formatVolume(stock.volume)}</span>
                    {stock.market_cap && (
                      <span>MCap: ₹{stock.market_cap.toLocaleString()}Cr</span>
                    )}
                  </div>

                  {/* Mini Chart Placeholder */}
                  <div className="h-12 mb-4 rounded bg-muted/50 flex items-center justify-center">
                    <span className="text-xs text-muted-foreground">Chart</span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Plus className="mr-1 h-3 w-3" />
                      Add to Portfolio
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <BarChart3 className="mr-1 h-3 w-3" />
                      Analyze
                    </Button>
                  </div>
                  
                  <div className="flex gap-2 mt-2">
                    <Button variant="ghost" size="sm" className="flex-1 text-muted-foreground">
                      <Bell className="mr-1 h-3 w-3" />
                      Alert
                    </Button>
                    <Button variant="ghost" size="sm" className="flex-1 text-destructive opacity-0 group-hover:opacity-100 transition-opacity">
                      <Trash2 className="mr-1 h-3 w-3" />
                      Remove
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* List View */}
        {viewMode === 'list' && (
          <Card>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 font-medium">Stock</th>
                    <th className="text-right p-4 font-medium">Price</th>
                    <th className="text-right p-4 font-medium">Change</th>
                    <th className="text-right p-4 font-medium">Volume</th>
                    <th className="text-right p-4 font-medium">Market Cap</th>
                    <th className="p-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStocks.map(stock => (
                    <tr key={stock.stock_id} className="border-b border-border hover:bg-muted/50 transition-colors group">
                      <td className="p-4">
                        <p className="font-medium">{stock.name}</p>
                        <p className="text-sm text-muted-foreground font-mono">{stock.symbol}</p>
                      </td>
                      <td className="p-4 text-right font-mono">
                        ₹{stock.current_price.toLocaleString()}
                      </td>
                      <td className="p-4 text-right">
                        <span className={cn(
                          "inline-flex items-center gap-1 font-medium",
                          stock.change_percent >= 0 ? "text-success" : "text-destructive"
                        )}>
                          {stock.change_percent >= 0 ? (
                            <TrendingUp className="h-3 w-3" />
                          ) : (
                            <TrendingDown className="h-3 w-3" />
                          )}
                          {stock.change_percent >= 0 ? '+' : ''}{stock.change_percent}%
                        </span>
                      </td>
                      <td className="p-4 text-right text-muted-foreground">
                        {formatVolume(stock.volume)}
                      </td>
                      <td className="p-4 text-right text-muted-foreground">
                        ₹{stock.market_cap?.toLocaleString()}Cr
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-1 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <BarChart3 className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Bell className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {/* Price Alerts Section */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-4">Price Alerts</h2>
          <Card>
            <CardContent className="p-6">
              <div className="text-center text-muted-foreground py-8">
                <Bell className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="mb-2">No price alerts set</p>
                <Button variant="outline">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Alert
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
