import { Link } from 'react-router-dom';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <span className="font-logo text-2xl text-primary">KUBERA</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Your AI-powered companion for intelligent stock analysis and portfolio management.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="mb-4 text-sm font-semibold">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/features" className="hover:text-primary transition-colors">Features</Link></li>
              <li><Link to="/pricing" className="hover:text-primary transition-colors">Pricing</Link></li>
              <li><Link to="/demo" className="hover:text-primary transition-colors">Live Demo</Link></li>
              <li><Link to="/roadmap" className="hover:text-primary transition-colors">Roadmap</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="mb-4 text-sm font-semibold">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/docs" className="hover:text-primary transition-colors">Documentation</Link></li>
              <li><Link to="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
              <li><Link to="/support" className="hover:text-primary transition-colors">Support</Link></li>
              <li><Link to="/api" className="hover:text-primary transition-colors">API</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-4 text-sm font-semibold">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link to="/disclaimer" className="hover:text-primary transition-colors">Disclaimer</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {currentYear} KUBERA. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>Data Sources:</span>
            <span className="font-medium">NSE</span>
            <span>•</span>
            <span className="font-medium">BSE</span>
            <span>•</span>
            <span className="font-medium">Yahoo Finance</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
