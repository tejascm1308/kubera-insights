import { useState } from 'react';
import { User, Settings, Shield, Bell, Camera, Save, Loader2 } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

export default function ProfilePage() {
  const { user, updateUser } = useAuth();
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  
  const [isLoading, setIsLoading] = useState(false);
  const [profileData, setProfileData] = useState<{
    full_name: string;
    phone: string;
    investment_horizon: 'short-term' | 'medium-term' | 'long-term';
    risk_tolerance: 'conservative' | 'moderate' | 'aggressive';
  }>({
    full_name: user?.full_name || '',
    phone: user?.phone || '',
    investment_horizon: user?.investment_horizon || 'medium-term',
    risk_tolerance: user?.risk_tolerance || 'moderate',
  });

  const handleSave = async () => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    updateUser(profileData);
    toast({ title: 'Profile updated', description: 'Your changes have been saved.' });
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">Account Settings</h1>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile" className="gap-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
            <TabsTrigger value="preferences" className="gap-2">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Preferences</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="gap-2">
              <Shield className="h-4 w-4" />
              <span className="hidden sm:inline">Security</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2">
              <Bell className="h-4 w-4" />
              <span className="hidden sm:inline">Notifications</span>
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal details and investment profile</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar */}
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="h-20 w-20 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-2xl font-bold">
                      {user?.full_name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <Button size="icon" variant="secondary" className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full">
                      <Camera className="h-4 w-4" />
                    </Button>
                  </div>
                  <div>
                    <p className="font-medium">{user?.full_name}</p>
                    <p className="text-sm text-muted-foreground">@{user?.username}</p>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="full_name">Full Name</Label>
                    <Input
                      id="full_name"
                      value={profileData.full_name}
                      onChange={(e) => setProfileData(p => ({ ...p, full_name: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" value={user?.email || ''} disabled />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" value={user?.username || ''} disabled />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => setProfileData(p => ({ ...p, phone: e.target.value }))}
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>

                {/* Investment Profile */}
                <div className="pt-4 border-t border-border">
                  <h3 className="font-medium mb-4">Investment Profile</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Investment Horizon</Label>
                      <Select
                        value={profileData.investment_horizon}
                        onValueChange={(v: 'short-term' | 'medium-term' | 'long-term') => setProfileData(p => ({ ...p, investment_horizon: v }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="short-term">Short-term (&lt; 1 year)</SelectItem>
                          <SelectItem value="medium-term">Medium-term (1-5 years)</SelectItem>
                          <SelectItem value="long-term">Long-term (&gt; 5 years)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Risk Tolerance</Label>
                      <div className="grid grid-cols-3 gap-2">
                        {['conservative', 'moderate', 'aggressive'].map(risk => (
                          <button
                            key={risk}
                            type="button"
                            onClick={() => setProfileData(p => ({ ...p, risk_tolerance: risk as 'conservative' | 'moderate' | 'aggressive' }))}
                            className={cn(
                              "px-3 py-2 rounded-lg border text-sm transition-colors capitalize",
                              profileData.risk_tolerance === risk
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
                </div>

                <Button onClick={handleSave} disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Preferences Tab */}
          <TabsContent value="preferences">
            <Card>
              <CardHeader>
                <CardTitle>Preferences</CardTitle>
                <CardDescription>Customize your KUBERA experience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Theme</Label>
                    <p className="text-sm text-muted-foreground">Choose your preferred appearance</p>
                  </div>
                  <Select value={theme} onValueChange={(v: 'light' | 'dark') => setTheme(v)}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Include portfolio in analysis</Label>
                    <p className="text-sm text-muted-foreground">AI will consider your holdings</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Auto-suggest stocks</Label>
                    <p className="text-sm text-muted-foreground">Show suggestions while typing</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="pt-4 border-t border-border">
                  <h3 className="font-medium mb-4 text-destructive">Danger Zone</h3>
                  <div className="space-y-4">
                    <Button variant="outline" className="text-destructive border-destructive/50">
                      Clear Chat History
                    </Button>
                    <Button variant="outline" className="text-destructive border-destructive/50 ml-2">
                      Export My Data
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Manage your account security</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Change Password</h3>
                  <div className="grid gap-4 max-w-md">
                    <div className="space-y-2">
                      <Label htmlFor="current">Current Password</Label>
                      <Input id="current" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new">New Password</Label>
                      <Input id="new" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm">Confirm New Password</Label>
                      <Input id="confirm" type="password" />
                    </div>
                    <Button className="w-fit">Update Password</Button>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                    </div>
                    <Button variant="outline" disabled>Coming Soon</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Control how you receive updates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Portfolio Reports</Label>
                    <p className="text-sm text-muted-foreground">Daily summary of your portfolio</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Price Alerts</Label>
                    <p className="text-sm text-muted-foreground">Get notified when targets are hit</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>News Alerts</Label>
                    <p className="text-sm text-muted-foreground">Important news about your stocks</p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Notification Frequency</Label>
                    <p className="text-sm text-muted-foreground">How often to receive digests</p>
                  </div>
                  <Select defaultValue="daily">
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="realtime">Real-time</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
