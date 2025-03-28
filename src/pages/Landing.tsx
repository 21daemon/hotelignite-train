
import { useState, useRef, useEffect } from "react";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LoginForm, SignupForm } from "@/components/auth/auth-forms";
import { 
  Flame, ShieldCheck, Clock, Award, Users, Building, BookOpen, 
  CheckCircle, ChevronRight, Star, BadgeCheck, Coffee, ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Landing() {
  const [activeTab, setActiveTab] = useState("login");
  const [visibleSections, setVisibleSections] = useState<Record<string, boolean>>({});
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Handle intersection observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => ({
              ...prev,
              [entry.target.id]: true
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const registerSection = (id: string, ref: HTMLDivElement | null) => {
    if (ref) {
      sectionRefs.current[id] = ref;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Section 1: Hero Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b flex items-center px-6 h-16 justify-between">
        <Logo />
        <div className="hidden sm:flex gap-4">
          <Button variant="ghost" onClick={() => setActiveTab("login")}>Login</Button>
          <Button variant="ghost" onClick={() => setActiveTab("signup")}>Sign Up</Button>
          <a href="#get-started">
            <Button className="bg-gradient-fire">Get Started</Button>
          </a>
        </div>
      </header>

      <main className="flex-1 flex flex-col">
        {/* Section 2: Hero Section */}
        <section 
          id="hero" 
          ref={(ref) => registerSection("hero", ref)}
          className={`py-16 md:py-24 px-6 md:px-12 overflow-hidden relative ${
            visibleSections.hero ? "animate-fade-in" : "opacity-0"
          }`}
        >
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 z-10">
              <div className="inline-block bg-amber-100 text-amber-700 px-4 py-1 rounded-full text-sm font-medium mb-4">
                Professional Fire Safety
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold gradient-text leading-tight">
                Fire Safety Training for Hotel Staff
              </h1>
              <p className="text-lg text-gray-600 max-w-xl">
                Comprehensive, interactive fire safety training built specifically for the hotel industry. 
                Keep your team prepared and your guests safe with role-based training modules.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <a href="#get-started">
                  <Button size="lg" className="bg-gradient-fire">
                    Get Started <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </a>
                <a href="#learn-more">
                  <Button size="lg" variant="outline">
                    Learn More
                  </Button>
                </a>
              </div>
              <div className="flex items-center gap-4 pt-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className={`w-10 h-10 rounded-full border-2 border-white bg-gradient-to-br from-azure-${i}00 to-fire-${i}00 flex items-center justify-center text-white text-xs font-bold`}>
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-600">
                  Trusted by <span className="font-bold text-gray-900">500+</span> hotels worldwide
                </p>
              </div>
            </div>
            <div className="relative z-10">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-fire-500 to-azure-500 rounded-lg blur-lg opacity-30"></div>
                <div className="relative bg-white rounded-lg shadow-xl overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80" 
                    alt="Hotel staff training" 
                    className="w-full h-80 object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                    <div className="p-6 text-white">
                      <div className="flex items-center gap-2 mb-2">
                        <Flame className="h-5 w-5 text-fire-500" />
                        <span className="font-medium">Training in progress</span>
                      </div>
                      <h3 className="text-xl font-bold">Evacuation Procedures</h3>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white rounded-lg shadow-lg p-4 border">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Certifications Issued</p>
                    <p className="text-2xl font-bold">10,000+</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Gradient orbs in background */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-fire-100 opacity-20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-azure-100 opacity-20 rounded-full blur-3xl"></div>
        </section>

        {/* Section 3: Features */}
        <section 
          id="features" 
          ref={(ref) => registerSection("features", ref)}
          className={`py-16 md:py-24 px-6 md:px-12 bg-gray-50 ${
            visibleSections.features ? "animate-fade-in" : "opacity-0"
          }`}
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-4">Tailored Training for Every Role</h2>
              <p className="text-lg text-gray-600">Our comprehensive fire safety training program is designed to meet the specific needs of each role in your hotel.</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { 
                  title: "Role-Based Training", 
                  description: "Customized modules for each hotel position", 
                  icon: <Users className="h-6 w-6" />,
                  color: "bg-gradient-fire"
                },
                { 
                  title: "Self-Paced Learning", 
                  description: "Complete training at your own convenience", 
                  icon: <Clock className="h-6 w-6" />,
                  color: "bg-gradient-azure" 
                },
                { 
                  title: "Certification", 
                  description: "Earn recognized safety credentials", 
                  icon: <Award className="h-6 w-6" />,
                  color: "bg-gradient-mixed" 
                },
                { 
                  title: "Management Dashboard", 
                  description: "Track progress across departments", 
                  icon: <Building className="h-6 w-6" />,
                  color: "bg-gradient-to-r from-green-500 to-emerald-500" 
                },
              ].map((feature, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100">
                  <div className={`${feature.color} rounded-full w-12 h-12 flex items-center justify-center text-white mb-4`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Section 4: How It Works */}
        <section 
          id="how-it-works" 
          ref={(ref) => registerSection("how-it-works", ref)}
          className={`py-16 md:py-24 px-6 md:px-12 ${
            visibleSections["how-it-works"] ? "animate-fade-in" : "opacity-0"
          }`}
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-block bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-medium mb-4">
                Simple Process
              </div>
              <h2 className="text-3xl font-bold mb-4">How FireTrainPro Works</h2>
              <p className="text-lg text-gray-600">Our streamlined process makes implementing hotel-wide fire safety training easy.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { 
                  step: "1", 
                  title: "Register Your Team", 
                  description: "Add staff members and assign appropriate roles" 
                },
                { 
                  step: "2", 
                  title: "Complete Training Modules", 
                  description: "Staff learn through interactive content and simulations" 
                },
                { 
                  step: "3", 
                  title: "Earn Certifications", 
                  description: "Pass assessments to receive role-specific certifications" 
                },
              ].map((step, index) => (
                <div key={index} className="relative">
                  <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-8 border border-gray-100 relative z-10 h-full">
                    <div className="absolute -top-5 -left-5 w-10 h-10 rounded-full bg-gradient-fire flex items-center justify-center text-white font-bold">
                      {step.step}
                    </div>
                    <h3 className="text-xl font-semibold mb-3 mt-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                  {index < 2 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-20">
                      <ChevronRight className="h-8 w-8 text-fire-300" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Section 5: Testimonials */}
        <section 
          id="testimonials" 
          ref={(ref) => registerSection("testimonials", ref)}
          className={`py-16 md:py-24 px-6 md:px-12 bg-gradient-to-br from-gray-900 to-gray-800 text-white ${
            visibleSections.testimonials ? "animate-fade-in" : "opacity-0"
          }`}
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-block bg-white/10 text-white px-4 py-1 rounded-full text-sm font-medium mb-4">
                Success Stories
              </div>
              <h2 className="text-3xl font-bold mb-4">What Our Clients Say</h2>
              <p className="text-lg text-gray-300">Hear from hotel managers who have implemented our fire safety training program.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { 
                  quote: "The role-specific training modules have significantly improved our staff's preparedness for emergencies.",
                  name: "Sarah Johnson",
                  role: "General Manager, Grand Plaza Hotel",
                  rating: 5
                },
                { 
                  quote: "Interactive simulations made training engaging for our staff. Compliance rates are up 95% since implementing FireTrainPro.",
                  name: "Michael Rodriguez",
                  role: "Operations Director, Seaside Resort & Spa",
                  rating: 5
                },
                { 
                  quote: "The analytics dashboard helps me easily track which departments need additional training. A game-changer for our safety program.",
                  name: "Emily Chen",
                  role: "HR Manager, Metropolitan Suites",
                  rating: 4
                },
              ].map((testimonial, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <div className="flex gap-1 mb-4">
                    {Array(5).fill(0).map((_, i) => (
                      <Star key={i} className={`h-5 w-5 ${i < testimonial.rating ? "text-amber-400" : "text-gray-600"}`} />
                    ))}
                  </div>
                  <p className="text-gray-200 mb-6 italic">"{testimonial.quote}"</p>
                  <div>
                    <p className="font-medium">{testimonial.name}</p>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Section 6: Training Modules */}
        <section 
          id="training-modules" 
          ref={(ref) => registerSection("training-modules", ref)}
          className={`py-16 md:py-24 px-6 md:px-12 ${
            visibleSections["training-modules"] ? "animate-fade-in" : "opacity-0"
          }`}
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-block bg-amber-100 text-amber-700 px-4 py-1 rounded-full text-sm font-medium mb-4">
                Comprehensive Curriculum
              </div>
              <h2 className="text-3xl font-bold mb-4">Training Modules</h2>
              <p className="text-lg text-gray-600">Explore our specialized fire safety training modules for hotel staff.</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {[
                { 
                  title: "Fire Prevention Basics",
                  description: "Essential knowledge for preventing fires in hotel environments",
                  icon: <Flame className="h-6 w-6" />,
                  roles: ["All Staff"],
                  duration: "2 hours"
                },
                { 
                  title: "Emergency Response",
                  description: "Protocols for efficiently responding to fire emergencies",
                  icon: <ShieldCheck className="h-6 w-6" />,
                  roles: ["All Staff"],
                  duration: "3 hours"
                },
                { 
                  title: "Evacuation Leadership",
                  description: "Advanced training for leading evacuations",
                  icon: <Users className="h-6 w-6" />,
                  roles: ["Managers", "Security"],
                  duration: "4 hours"
                },
                { 
                  title: "Kitchen Fire Safety",
                  description: "Specialized training for preventing and managing kitchen fires",
                  icon: <Coffee className="h-6 w-6" />,
                  roles: ["Food Service"],
                  duration: "3 hours"
                },
                { 
                  title: "Equipment Maintenance",
                  description: "Proper maintenance of fire safety equipment",
                  icon: <Building className="h-6 w-6" />,
                  roles: ["Maintenance"],
                  duration: "2.5 hours"
                },
                { 
                  title: "Guest Safety Protocols",
                  description: "Ensuring guest safety during fire emergencies",
                  icon: <BookOpen className="h-6 w-6" />,
                  roles: ["Reception", "Housekeeping"],
                  duration: "2 hours"
                },
              ].map((module, index) => (
                <div key={index} className="group">
                  <div className="bg-white rounded-xl shadow-sm group-hover:shadow-md transition-shadow p-6 border border-gray-100 h-full flex flex-col">
                    <div className="bg-fire-50 rounded-lg w-12 h-12 flex items-center justify-center text-fire-500 mb-4">
                      {module.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-fire-600 transition-colors">{module.title}</h3>
                    <p className="text-gray-600 mb-4">{module.description}</p>
                    <div className="mt-auto space-y-3">
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>{module.duration}</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {module.roles.map((role, i) => (
                          <span key={i} className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded">
                            {role}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Section 7: Benefits */}
        <section 
          id="benefits" 
          ref={(ref) => registerSection("benefits", ref)}
          className={`py-16 md:py-24 px-6 md:px-12 bg-gradient-to-br from-fire-50 to-azure-50 ${
            visibleSections.benefits ? "animate-fade-in" : "opacity-0"
          }`}
        >
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-medium mb-4">
                Why Choose FireTrainPro
              </div>
              <h2 className="text-3xl font-bold mb-6">Benefits of Our Training Platform</h2>
              
              <div className="space-y-6">
                {[
                  { 
                    title: "Enhanced Staff Confidence",
                    description: "Well-trained staff are more confident in their ability to handle emergencies",
                    icon: <BadgeCheck className="h-5 w-5" />
                  },
                  { 
                    title: "Regulatory Compliance",
                    description: "Stay compliant with local and national fire safety regulations",
                    icon: <CheckCircle className="h-5 w-5" />
                  },
                  { 
                    title: "Reduced Liability",
                    description: "Comprehensive training helps reduce legal liability in case of incidents",
                    icon: <ShieldCheck className="h-5 w-5" />
                  },
                  { 
                    title: "Improved Guest Safety",
                    description: "Create a safer environment for all guests and visitors",
                    icon: <Users className="h-5 w-5" />
                  },
                ].map((benefit, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="bg-white p-2 rounded-lg shadow-sm h-min">
                      <div className="bg-gradient-fire rounded-full p-2 text-white">
                        {benefit.icon}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">{benefit.title}</h3>
                      <p className="text-gray-600">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-fire-500/20 to-azure-500/20 rounded-2xl blur-lg"></div>
              <div className="bg-white relative rounded-xl shadow-xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80" 
                  alt="Hotel staff training session" 
                  className="w-full h-96 object-cover"
                />
                <div className="p-8">
                  <h3 className="text-xl font-bold mb-2">Industry-Leading Training</h3>
                  <p className="text-gray-600 mb-4">Our training modules combine theoretical knowledge with practical exercises to ensure comprehensive learning.</p>
                  <div className="flex flex-wrap gap-3">
                    {["Interactive", "Role-specific", "Compliance-focused", "Updated regularly"].map((tag, i) => (
                      <span key={i} className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Section 8: Get Started (CTA) */}
        <section 
          id="get-started" 
          ref={(ref) => registerSection("get-started", ref)}
          className={`py-16 md:py-24 px-6 md:px-12 ${
            visibleSections["get-started"] ? "animate-fade-in" : "opacity-0"
          }`}
        >
          <div className="max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-fire-500 to-azure-600 rounded-2xl overflow-hidden shadow-xl">
              <div className="md:grid md:grid-cols-2">
                <div className="p-8 md:p-12 flex items-center">
                  <div className="text-white">
                    <h2 className="text-3xl font-bold mb-4">Start Training Your Team Today</h2>
                    <p className="text-white/90 mb-8">Join hundreds of hotels worldwide in providing top-tier fire safety training for your staff.</p>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-white/20 rounded-full p-2">
                          <CheckCircle className="h-5 w-5" />
                        </div>
                        <p>Role-based training modules</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="bg-white/20 rounded-full p-2">
                          <CheckCircle className="h-5 w-5" />
                        </div>
                        <p>Interactive learning experience</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="bg-white/20 rounded-full p-2">
                          <CheckCircle className="h-5 w-5" />
                        </div>
                        <p>Comprehensive analytics</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-8 md:p-12">
                  <Card className="shadow-none border-0">
                    <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="login">Login</TabsTrigger>
                        <TabsTrigger value="signup">Sign Up</TabsTrigger>
                      </TabsList>
                      <CardContent className="pt-6">
                        <TabsContent value="login">
                          <div className="space-y-4">
                            <div className="space-y-2 text-center">
                              <h2 className="text-2xl font-bold">Welcome back</h2>
                              <p className="text-sm text-muted-foreground">Enter your credentials to access your account</p>
                            </div>
                            <LoginForm />
                          </div>
                        </TabsContent>
                        <TabsContent value="signup">
                          <div className="space-y-4">
                            <div className="space-y-2 text-center">
                              <h2 className="text-2xl font-bold">Create an account</h2>
                              <p className="text-sm text-muted-foreground">Enter your details to create a new account</p>
                            </div>
                            <SignupForm />
                          </div>
                        </TabsContent>
                      </CardContent>
                    </Tabs>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-12 border-t bg-gray-50">
        <div className="container px-6 mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
            <div className="col-span-2">
              <Logo className="mb-4" />
              <p className="text-gray-600 mb-4">
                Comprehensive fire safety training tailored for hotel staff.
              </p>
              <div className="flex gap-4">
                {["twitter", "facebook", "instagram", "linkedin"].map((social) => (
                  <a key={social} href="#" className="text-gray-400 hover:text-fire-500 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                      {social === "twitter" && <span className="text-sm">𝕏</span>}
                      {social === "facebook" && <span className="text-sm">f</span>}
                      {social === "instagram" && <span className="text-sm">i</span>}
                      {social === "linkedin" && <span className="text-sm">in</span>}
                    </div>
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-3">
                {["Features", "Pricing", "For Teams", "For Enterprise"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-600 hover:text-fire-500 transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-3">
                {["Documentation", "Guides", "API", "Blog"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-600 hover:text-fire-500 transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-3">
                {["About", "Careers", "Contact", "Terms", "Privacy"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-600 hover:text-fire-500 transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Flame className="h-5 w-5 text-fire-500" />
              <span className="text-sm font-medium">FireTrainPro © {new Date().getFullYear()}</span>
            </div>
            <div className="flex gap-6 text-sm text-gray-600">
              <a href="#" className="hover:text-fire-500 transition-colors">Terms</a>
              <a href="#" className="hover:text-fire-500 transition-colors">Privacy</a>
              <a href="#" className="hover:text-fire-500 transition-colors">Cookies</a>
              <a href="#" className="hover:text-fire-500 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
