import { Link } from 'react-router-dom';
import { Check, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const plans = [
  {
    name: 'Free',
    price: '₹0',
    period: 'forever',
    description: 'Perfect for getting started with AI stock analysis',
    features: [
      '100 AI chat messages/month',
      'Basic stock analysis',
      'Portfolio tracking (up to 10 stocks)',
      'Watchlist (up to 20 stocks)',
      '5 price alerts',
      'Daily market summary',
      'Community support',
    ],
    cta: 'Get Started',
    ctaLink: '/register',
    highlighted: true,
    badge: 'Most Popular',
  },
  {
    name: 'Premium',
    price: '₹499',
    period: '/month',
    description: 'For serious investors who need more power',
    features: [
      'Unlimited AI chat messages',
      'Advanced technical analysis',
      'Unlimited portfolio tracking',
      'Unlimited watchlist',
      'Unlimited price alerts',
      'Custom reports & exports',
      'Priority support',
      'Early access to new features',
    ],
    cta: 'Coming Soon',
    ctaLink: '#',
    highlighted: false,
    disabled: true,
  },
];

export function Pricing() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-muted-foreground">
            Start free and upgrade when you need more. No hidden fees.
          </p>
        </div>

        <div className="mx-auto grid max-w-4xl gap-8 lg:grid-cols-2">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl border-2 p-8 transition-all duration-200 ${
                plan.highlighted
                  ? 'border-primary bg-card shadow-lg scale-[1.02]'
                  : 'border-border bg-card/50'
              } ${plan.disabled ? 'opacity-75' : ''}`}
            >
              {plan.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 rounded-full bg-primary px-4 py-1 text-xs font-semibold text-primary-foreground">
                  <Sparkles className="h-3 w-3" />
                  {plan.badge}
                </span>
              )}

              <div className="mb-6">
                <h3 className="text-2xl font-bold">{plan.name}</h3>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
              </div>

              <ul className="mb-8 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <Check className="h-5 w-5 shrink-0 text-success" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                asChild={!plan.disabled}
                className="w-full"
                variant={plan.highlighted ? 'default' : 'outline'}
                disabled={plan.disabled}
              >
                {plan.disabled ? (
                  <span>{plan.cta}</span>
                ) : (
                  <Link to={plan.ctaLink}>{plan.cta}</Link>
                )}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
