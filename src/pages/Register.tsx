import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Loader2, ArrowRight, ArrowLeft, Check } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const steps = ['Account', 'Profile', 'Portfolio'];

export default function Register() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    phone: '',
    investment_horizon: '',
    risk_tolerance: 'moderate',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateStep = () => {
    if (currentStep === 0) {
      if (!formData.full_name || !formData.email || !formData.username || !formData.password) {
        toast({ title: 'Error', description: 'Please fill in all required fields', variant: 'destructive' });
        return false;
      }
      if (formData.username.length < 5 || formData.username.length > 10) {
        toast({ title: 'Error', description: 'Username must be 5-10 characters', variant: 'destructive' });
        return false;
      }
      if (formData.password.length < 8) {
        toast({ title: 'Error', description: 'Password must be at least 8 characters', variant: 'destructive' });
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        toast({ title: 'Error', description: 'Passwords do not match', variant: 'destructive' });
        return false;
      }
    }
    return true;
  };

  const nextStep = () => {
    if (validateStep()) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await register({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        full_name: formData.full_name,
        phone: formData.phone,
      });
      toast({ title: 'Welcome to KUBERA!', description: 'Your account has been created.' });
      navigate('/chat');
    } catch (error) {
      toast({ title: 'Registration failed', description: 'Please try again.', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrength = (password: string) => {
    if (!password) return { strength: 0, label: '' };
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    const labels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
    const colors = ['', 'bg-destructive', 'bg-warning', 'bg-primary', 'bg-success'];
    return { strength, label: labels[strength], color: colors[strength] };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="absolute inset-0 animated-gradient opacity-50" />
      
      <div className="relative w-full max-w-[480px]">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <span className="font-logo text-4xl text-primary">KUBERA</span>
          </Link>
          <p className="mt-2 text-muted-foreground">Create your account to get started</p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {steps.map((step, index) => (
            <div key={step} className="flex items-center">
              <div className={cn(
                "flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-colors",
                index <= currentStep
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              )}>
                {index < currentStep ? <Check className="h-4 w-4" /> : index + 1}
              </div>
              <span className={cn(
                "ml-2 text-sm hidden sm:inline",
                index <= currentStep ? "text-foreground" : "text-muted-foreground"
              )}>
                {step}
              </span>
              {index < steps.length - 1 && (
                <div className={cn(
                  "w-8 sm:w-12 h-0.5 mx-2",
                  index < currentStep ? "bg-primary" : "bg-muted"
                )} />
              )}
            </div>
          ))}
        </div>

        {/* Registration Card */}
        <div className="rounded-xl border border-border bg-card p-8 shadow-lg">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Account Info */}
            {currentStep === 0 && (
              <div className="space-y-4 animate-fade-in">
                <div className="space-y-2">
                  <Label htmlFor="full_name">Full Name *</Label>
                  <Input
                    id="full_name"
                    placeholder="John Doe"
                    value={formData.full_name}
                    onChange={(e) => updateField('full_name', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => updateField('email', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="username">Username * <span className="text-xs text-muted-foreground">(5-10 characters)</span></Label>
                  <Input
                    id="username"
                    placeholder="johndoe"
                    value={formData.username}
                    onChange={(e) => updateField('username', e.target.value.toLowerCase().replace(/[^a-z0-9]/g, ''))}
                    maxLength={10}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password *</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => updateField('password', e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {formData.password && (
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div 
                          className={cn("h-full transition-all", passwordStrength.color)}
                          style={{ width: `${(passwordStrength.strength / 4) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">{passwordStrength.label}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password *</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) => updateField('confirmPassword', e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* Step 2: Investment Profile (Optional) */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-fade-in">
                <div className="text-center mb-4">
                  <p className="text-sm text-muted-foreground">
                    This step is optional. You can skip and set these preferences later.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone (Optional)</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Investment Horizon</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {['short-term', 'medium-term', 'long-term'].map(horizon => (
                      <button
                        key={horizon}
                        type="button"
                        onClick={() => updateField('investment_horizon', horizon)}
                        className={cn(
                          "px-3 py-2 rounded-lg border text-sm transition-colors capitalize",
                          formData.investment_horizon === horizon
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border hover:border-primary/50"
                        )}
                      >
                        {horizon.replace('-', ' ')}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Risk Tolerance</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {['conservative', 'moderate', 'aggressive'].map(risk => (
                      <button
                        key={risk}
                        type="button"
                        onClick={() => updateField('risk_tolerance', risk)}
                        className={cn(
                          "px-3 py-2 rounded-lg border text-sm transition-colors capitalize",
                          formData.risk_tolerance === risk
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border hover:border-primary/50"
                        )}
                      >
                        {risk}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Portfolio (Optional) */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-fade-in">
                <div className="text-center">
                  <div className="mb-4 mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <Check className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Almost There!</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    You can add your portfolio holdings now or do it later from your dashboard.
                  </p>
                </div>

                <div className="rounded-lg border border-dashed border-border p-6 text-center">
                  <p className="text-sm text-muted-foreground mb-3">
                    Portfolio import feature coming soon!
                  </p>
                  <p className="text-xs text-muted-foreground">
                    You can add stocks manually after signing up.
                  </p>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
              {currentStep > 0 ? (
                <Button type="button" variant="ghost" onClick={prevStep}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
              ) : (
                <div />
              )}

              {currentStep < steps.length - 1 ? (
                <div className="flex items-center gap-2">
                  {currentStep === 1 && (
                    <Button type="button" variant="ghost" onClick={() => setCurrentStep(2)}>
                      Skip
                    </Button>
                  )}
                  <Button type="button" onClick={nextStep}>
                    Next
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    'Create Account'
                  )}
                </Button>
              )}
            </div>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link to="/login" className="text-primary hover:underline font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
