import { UserPlus, FolderPlus, MessageCircleQuestion, Lightbulb } from 'lucide-react';

const steps = [
  {
    icon: UserPlus,
    title: 'Sign Up Free',
    description: 'Create your account in 30 seconds. No credit card required.',
  },
  {
    icon: FolderPlus,
    title: 'Add Portfolio',
    description: 'Import your holdings or add them manually. This step is optional.',
  },
  {
    icon: MessageCircleQuestion,
    title: 'Ask Questions',
    description: 'Chat naturally about any Indian stock. "Analyze TCS" or "Compare Infosys vs Wipro".',
  },
  {
    icon: Lightbulb,
    title: 'Get Insights',
    description: 'Receive AI-powered analysis with charts, metrics, and actionable recommendations.',
  },
];

export function HowItWorks() {
  return (
    <section className="py-20">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Get Started in Minutes
          </h2>
          <p className="text-lg text-muted-foreground">
            Simple steps to unlock AI-powered stock analysis
          </p>
        </div>

        <div className="relative mx-auto max-w-4xl">
          {/* Connection Line - Desktop */}
          <div className="absolute left-0 right-0 top-16 hidden h-0.5 bg-gradient-to-r from-transparent via-border to-transparent lg:block" />
          
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <div key={step.title} className="relative text-center">
                {/* Step Number */}
                <div className="relative mx-auto mb-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary bg-card text-primary transition-all duration-200 hover:bg-primary hover:text-primary-foreground">
                    <step.icon className="h-7 w-7" />
                  </div>
                  <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {index + 1}
                  </span>
                </div>
                
                <h3 className="mb-2 text-lg font-semibold">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
