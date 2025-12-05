import { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Plus, 
  Download,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  Search,
  Pencil,
  Trash2,
  BarChart3
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import type { Holding, PortfolioSummary } from '@/types';

// Mock data
const mockSummary: PortfolioSummary = {
  total_value: 1245678,
  total_invested: 1122222,
  today_change: 4532,
  today_change_percent: 0.36,
  total_pnl: 123456,
  total_pnl_percent: 10.99,
  holdings_count: 8,
};

const mockHoldings: Holding[] = [
  { stock_id: '1', symbol: 'RELIANCE.NS', name: 'Reliance Industries', quantity: 50, buy_price: 2400, current_price: 2847.50, change_percent: 1.24, change_absolute: 35.20, current_value: 142375, total_pnl: 22375, total_pnl_percent: 18.64, sector: 'Energy' },
  { stock_id: '2', symbol: 'TCS.NS', name: 'Tata Consultancy', quantity: 30, buy_price: 3200, current_price: 3542.80, change_percent: -0.45, change_absolute: -16.10, current_value: 106284, total_pnl: 10284, total_pnl_percent: 10.71, sector: 'IT' },
  { stock_id: '3', symbol: 'INFY.NS', name: 'Infosys Ltd', quantity: 100, buy_price: 1450, current_price: 1623.15, change_percent: 2.10, change_absolute: 33.40, current_value: 162315, total_pnl: 17315, total_pnl_percent: 11.94, sector: 'IT' },
  { stock_id: '4', symbol: 'HDFCBANK.NS', name: 'HDFC Bank', quantity: 40, buy_price: 1580, current_price: 1712.35, change_percent: -0.82, change_absolute: -14.20, current_value: 68494, total_pnl: 5294, total_pnl_percent: 8.38, sector: 'Banking' },
  { stock_id: '5', symbol: 'ICICIBANK.NS', name: 'ICICI Bank', quantity: 80, buy_price: 920, current_price: 1045.60, change_percent: 1.56, change_absolute: 16.10, current_value: 83648, total_pnl: 10048, total_pnl_percent: 13.65, sector: 'Banking' },
  { stock_id: '6', symbol: 'TATASTEEL.NS', name: 'Tata Steel', quantity: 150, buy_price: 125, current_price: 142.80, change_percent: 3.25, change_absolute: 4.50, current_value: 21420, total_pnl: 2670, total_pnl_percent: 14.24, sector: 'Metals' },
  { stock_id: '7', symbol: 'WIPRO.NS', name: 'Wipro Ltd', quantity: 200, buy_price: 420, current_price: 478.50, change_percent: 0.95, change_absolute: 4.50, current_value: 95700, total_pnl: 11700, total_pnl_percent: 13.93, sector: 'IT' },
  { stock_id: '8', symbol: 'SBIN.NS', name: 'State Bank of India', quantity: 120, buy_price: 580, current_price: 628.40, change_percent: 1.85, change_absolute: 11.40, current_value: 75408, total_pnl: 5808, total_pnl_percent: 8.34, sector: 'Banking' },
];

const sectorData = [
  { name: 'IT', value: 364299, percent: 47.1, color: 'bg-primary' },
  { name: 'Banking', value: 227550, percent: 29.4, color: 'bg-success' },
  { name: 'Energy', value: 142375, percent: 18.4, color: 'bg-warning' },
  { name: 'Metals', value: 21420, percent: 2.8, color: 'bg-destructive' },
];

export default function PortfolioPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<keyof Holding>('current_value');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const filteredHoldings = mockHoldings
    .filter(h => 
      h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
      }
      return 0;
    });

  const handleSort = (field: keyof Holding) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const formatCurrency = (value: number) => {
    if (value >= 10000000) return `₹${(value / 10000000).toFixed(2)} Cr`;
    if (value >= 100000) return `₹${(value / 100000).toFixed(2)} L`;
    return `₹${value.toLocaleString('en-IN')}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">My Portfolio</h1>
            <p className="text-muted-foreground">Last updated: 2 minutes ago</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Stock
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Value</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold font-mono">{formatCurrency(mockSummary.total_value)}</p>
              <div className="flex items-center gap-1 mt-1">
                {mockSummary.total_pnl_percent >= 0 ? (
                  <ArrowUpRight className="h-4 w-4 text-success" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 text-destructive" />
                )}
                <span className={cn(
                  "text-sm font-medium",
                  mockSummary.total_pnl_percent >= 0 ? "text-success" : "text-destructive"
                )}>
                  {mockSummary.total_pnl_percent >= 0 ? '+' : ''}{mockSummary.total_pnl_percent}% all time
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Today's P&L</CardTitle>
            </CardHeader>
            <CardContent>
              <p className={cn(
                "text-2xl font-bold font-mono",
                mockSummary.today_change >= 0 ? "text-success" : "text-destructive"
              )}>
                {mockSummary.today_change >= 0 ? '+' : ''}₹{mockSummary.today_change.toLocaleString()}
              </p>
              <p className={cn(
                "text-sm font-medium mt-1",
                mockSummary.today_change_percent >= 0 ? "text-success" : "text-destructive"
              )}>
                {mockSummary.today_change_percent >= 0 ? '+' : ''}{mockSummary.today_change_percent}%
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total P&L</CardTitle>
            </CardHeader>
            <CardContent>
              <p className={cn(
                "text-2xl font-bold font-mono",
                mockSummary.total_pnl >= 0 ? "text-success" : "text-destructive"
              )}>
                {mockSummary.total_pnl >= 0 ? '+' : ''}{formatCurrency(mockSummary.total_pnl)}
              </p>
              <p className={cn(
                "text-sm font-medium mt-1",
                mockSummary.total_pnl_percent >= 0 ? "text-success" : "text-destructive"
              )}>
                {mockSummary.total_pnl_percent >= 0 ? '+' : ''}{mockSummary.total_pnl_percent}%
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Holdings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold font-mono">{mockSummary.holdings_count}</p>
              <p className="text-sm text-muted-foreground mt-1">Total stocks</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Holdings Table */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="pb-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <CardTitle>Holdings</CardTitle>
                  <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search stocks..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Stock</TableHead>
                        <TableHead className="text-right cursor-pointer hover:text-foreground" onClick={() => handleSort('quantity')}>
                          Qty
                        </TableHead>
                        <TableHead className="text-right cursor-pointer hover:text-foreground" onClick={() => handleSort('buy_price')}>
                          Avg Price
                        </TableHead>
                        <TableHead className="text-right cursor-pointer hover:text-foreground" onClick={() => handleSort('current_price')}>
                          Current
                        </TableHead>
                        <TableHead className="text-right cursor-pointer hover:text-foreground" onClick={() => handleSort('total_pnl_percent')}>
                          P&L
                        </TableHead>
                        <TableHead className="text-right cursor-pointer hover:text-foreground" onClick={() => handleSort('current_value')}>
                          Value
                        </TableHead>
                        <TableHead className="w-10"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredHoldings.map((holding) => (
                        <TableRow key={holding.stock_id} className="group">
                          <TableCell>
                            <div>
                              <p className="font-medium">{holding.name}</p>
                              <p className="text-xs text-muted-foreground font-mono">{holding.symbol}</p>
                            </div>
                          </TableCell>
                          <TableCell className="text-right font-mono">{holding.quantity}</TableCell>
                          <TableCell className="text-right font-mono">₹{holding.buy_price.toLocaleString()}</TableCell>
                          <TableCell className="text-right">
                            <p className="font-mono">₹{holding.current_price.toLocaleString()}</p>
                            <p className={cn(
                              "text-xs font-medium",
                              holding.change_percent >= 0 ? "text-success" : "text-destructive"
                            )}>
                              {holding.change_percent >= 0 ? '+' : ''}{holding.change_percent}%
                            </p>
                          </TableCell>
                          <TableCell className="text-right">
                            <p className={cn(
                              "font-mono font-medium",
                              holding.total_pnl >= 0 ? "text-success" : "text-destructive"
                            )}>
                              {holding.total_pnl >= 0 ? '+' : ''}₹{holding.total_pnl.toLocaleString()}
                            </p>
                            <p className={cn(
                              "text-xs",
                              holding.total_pnl_percent >= 0 ? "text-success" : "text-destructive"
                            )}>
                              {holding.total_pnl_percent >= 0 ? '+' : ''}{holding.total_pnl_percent}%
                            </p>
                          </TableCell>
                          <TableCell className="text-right font-mono font-medium">
                            {formatCurrency(holding.current_value)}
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <BarChart3 className="mr-2 h-4 w-4" />
                                  Analyze
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Pencil className="mr-2 h-4 w-4" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Remove
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sector Allocation */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Sector Allocation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sectorData.map((sector) => (
                    <div key={sector.name}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">{sector.name}</span>
                        <span className="text-sm text-muted-foreground">{sector.percent}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className={cn("h-full rounded-full transition-all", sector.color)}
                          style={{ width: `${sector.percent}%` }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatCurrency(sector.value)}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
