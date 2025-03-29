
import React, { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { Navbar } from "@/components/layout/navbar";
import { 
  Shield, 
  CheckCircle, 
  Clock, 
  Users, 
  Award, 
  Zap, 
  Flame, 
  BarChart,
  PieChart,
  Heart
} from "lucide-react";

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => {
  return (
    <div className="rounded-xl bg-white/5 backdrop-blur-sm p-6 border border-white/10 shadow-lg hover:shadow-fire-500/10 transition-all hover:-translate-y-1">
      <div className="text-fire-500 mb-4 text-2xl">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

const TestimonialCard = ({ quote, author, role, avatar }: { quote: string, author: string, role: string, avatar: string }) => {
  return (
    <div className="rounded-xl bg-white/5 backdrop-blur-sm p-6 border border-white/10 shadow-lg">
      <div className="mb-4 text-lg italic text-muted-foreground">"{quote}"</div>
      <div className="flex items-center gap-3">
        <img src={avatar} alt={author} className="w-12 h-12 rounded-full object-cover" />
        <div>
          <div className="font-semibold">{author}</div>
          <div className="text-sm text-muted-foreground">{role}</div>
        </div>
      </div>
    </div>
  );
};

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const Landing = () => {
  const { user } = useAuth();
  
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const howItWorksRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const modulesRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const partnersRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);
  const newsRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  
  const heroInView = useInView(heroRef, { once: true, amount: 0.3 });
  const featuresInView = useInView(featuresRef, { once: true, amount: 0.3 });
  const howItWorksInView = useInView(howItWorksRef, { once: true, amount: 0.3 });
  const testimonialsInView = useInView(testimonialsRef, { once: true, amount: 0.3 });
  const modulesInView = useInView(modulesRef, { once: true, amount: 0.3 });
  const benefitsInView = useInView(benefitsRef, { once: true, amount: 0.3 });
  const ctaInView = useInView(ctaRef, { once: true, amount: 0.3 });
  const teamInView = useInView(teamRef, { once: true, amount: 0.3 });
  const statsInView = useInView(statsRef, { once: true, amount: 0.3 });
  const partnersInView = useInView(partnersRef, { once: true, amount: 0.3 });
  const pricingInView = useInView(pricingRef, { once: true, amount: 0.3 });
  const newsInView = useInView(newsRef, { once: true, amount: 0.3 });
  const faqInView = useInView(faqRef, { once: true, amount: 0.3 });
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background/95 to-background">
      <Navbar />
      
      <section 
        ref={heroRef} 
        className="min-h-screen flex flex-col items-center justify-center text-center px-4 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,107,69,0.1),transparent_50%)]"></div>
        <motion.div
          initial="hidden"
          animate={heroInView ? "visible" : "hidden"}
          variants={fadeIn}
          className="max-w-4xl mx-auto z-10"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            Fire Training <span className="bg-gradient-fire text-transparent bg-clip-text">Management</span> System
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Comprehensive fire safety training and certification management for your organization
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {user ? (
              <Button 
                className="bg-gradient-fire hover:bg-gradient-fire/90"
                size="lg"
                onClick={() => window.location.href = "/dashboard"}
              >
                Go to Dashboard
              </Button>
            ) : (
              <>
                <Button 
                  className="bg-gradient-fire hover:bg-gradient-fire/90"
                  size="lg"
                  onClick={() => window.location.href = "/auth?mode=login"}
                >
                  Sign In
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-fire-500 text-fire-500 hover:bg-fire-500/10"
                  onClick={() => window.location.href = "/auth?mode=signup"}
                >
                  Create Account
                </Button>
              </>
            )}
          </div>
        </motion.div>
      </section>

      <section 
        ref={featuresRef} 
        id="features"
        className="py-20 px-4"
      >
        <motion.div
          initial="hidden"
          animate={featuresInView ? "visible" : "hidden"}
          variants={fadeIn}
          className="max-w-7xl mx-auto"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform offers everything you need to manage fire safety training effectively
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Shield />} 
              title="Compliance Tracking" 
              description="Automatically track compliance status for all employees" 
            />
            <FeatureCard 
              icon={<BarChart />} 
              title="Analytics Dashboard" 
              description="Get real-time insights into training progress and completion rates" 
            />
            <FeatureCard 
              icon={<Award />} 
              title="Interactive Learning" 
              description="Engage users with interactive training modules and quizzes" 
            />
            <FeatureCard 
              icon={<Zap />} 
              title="Mobile Access" 
              description="Access training materials from any device, anywhere" 
            />
            <FeatureCard 
              icon={<Clock />} 
              title="Automated Reminders" 
              description="Send automatic notifications for certification renewals" 
            />
            <FeatureCard 
              icon={<PieChart />} 
              title="Custom Reports" 
              description="Generate custom reports for audits and management reviews" 
            />
          </div>
        </motion.div>
      </section>

      {/* Stats Section - New Section 1 */}
      <section 
        ref={statsRef} 
        className="py-20 px-4 bg-gradient-to-r from-fire-900/20 to-azure-900/20"
      >
        <motion.div
          initial="hidden"
          animate={statsInView ? "visible" : "hidden"}
          variants={fadeIn}
          className="max-w-7xl mx-auto"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Making Fire Safety Measurable</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              See how our platform is transforming safety training with real results
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-6 rounded-lg glass-card">
              <div className="text-4xl md:text-5xl font-bold text-fire-500 mb-2">98%</div>
              <p className="text-sm md:text-base text-muted-foreground">Compliance Rate</p>
            </div>
            <div className="p-6 rounded-lg glass-card">
              <div className="text-4xl md:text-5xl font-bold text-azure-500 mb-2">75%</div>
              <p className="text-sm md:text-base text-muted-foreground">Reduction in Admin Time</p>
            </div>
            <div className="p-6 rounded-lg glass-card">
              <div className="text-4xl md:text-5xl font-bold text-fire-500 mb-2">65%</div>
              <p className="text-sm md:text-base text-muted-foreground">Fewer Incidents</p>
            </div>
            <div className="p-6 rounded-lg glass-card">
              <div className="text-4xl md:text-5xl font-bold text-azure-500 mb-2">24/7</div>
              <p className="text-sm md:text-base text-muted-foreground">Platform Availability</p>
            </div>
          </div>
        </motion.div>
      </section>

      <section 
        ref={howItWorksRef} 
        className="py-20 px-4 bg-gradient-to-b from-background to-muted/30"
      >
        <motion.div
          initial="hidden"
          animate={howItWorksInView ? "visible" : "hidden"}
          variants={fadeIn}
          className="max-w-7xl mx-auto"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our streamlined process makes fire safety training management simple and effective
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-fire flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">1</div>
              <h3 className="text-xl font-bold mb-2">Assign Training</h3>
              <p className="text-muted-foreground">
                Assign relevant fire safety training modules to employees based on their roles
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-azure flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">2</div>
              <h3 className="text-xl font-bold mb-2">Complete Courses</h3>
              <p className="text-muted-foreground">
                Employees complete interactive training courses and assessments at their own pace
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-purple flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">3</div>
              <h3 className="text-xl font-bold mb-2">Track Progress</h3>
              <p className="text-muted-foreground">
                Monitor completion rates, certification status, and compliance in real-time
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Partners Section - New Section 2 */}
      <section 
        ref={partnersRef} 
        className="py-20 px-4 bg-gradient-to-b from-muted/30 to-background"
      >
        <motion.div
          initial="hidden"
          animate={partnersInView ? "visible" : "hidden"}
          variants={fadeIn}
          className="max-w-7xl mx-auto"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted By Industry Leaders</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join hundreds of organizations that rely on our platform for safety training
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex justify-center">
                <div className="w-24 h-24 rounded-full bg-muted/50 flex items-center justify-center text-2xl font-bold text-muted-foreground">
                  Logo {i}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      <section 
        ref={testimonialsRef} 
        className="py-20 px-4"
      >
        <motion.div
          initial="hidden"
          animate={testimonialsInView ? "visible" : "hidden"}
          variants={fadeIn}
          className="max-w-7xl mx-auto"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Don't just take our word for it - hear from our satisfied customers
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard 
              quote="This platform has transformed how we manage fire safety training across our organization. The compliance tracking alone has saved us countless hours of administrative work."
              author="Sarah Johnson"
              role="Safety Manager, ABC Industries"
              avatar="https://ui-avatars.com/api/?name=Sarah+Johnson&background=FF6B45&color=fff"
            />
            <TestimonialCard 
              quote="As a training coordinator, I love how easy it is to assign courses and track completion. The automated reminder system ensures nothing falls through the cracks."
              author="Michael Chen"
              role="Training Coordinator, XYZ Corp"
              avatar="https://ui-avatars.com/api/?name=Michael+Chen&background=1CA0E8&color=fff"
            />
            <TestimonialCard 
              quote="The interactive training modules have significantly improved engagement with our safety program. Our compliance rates are at an all-time high."
              author="Jessica Martinez"
              role="HR Director, 123 Company"
              avatar="https://ui-avatars.com/api/?name=Jessica+Martinez&background=7A5AF8&color=fff"
            />
          </div>
        </motion.div>
      </section>

      <section 
        ref={modulesRef} 
        className="py-20 px-4 bg-gradient-to-b from-background to-muted/30"
      >
        <motion.div
          initial="hidden"
          animate={modulesInView ? "visible" : "hidden"}
          variants={fadeIn}
          className="max-w-7xl mx-auto"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Training Modules</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our comprehensive catalog of fire safety training modules covers all aspects of fire prevention and response
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="rounded-xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm">
              <div className="h-40 bg-gradient-fire flex items-center justify-center">
                <span className="text-5xl">🧯</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Fire Extinguisher Use</h3>
                <p className="text-muted-foreground mb-4">
                  Learn the proper techniques for using different types of fire extinguishers in various emergency scenarios.
                </p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>45 minutes</span>
                  <span>•</span>
                  <span>Interactive</span>
                  <span>•</span>
                  <span>Certificate</span>
                </div>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm">
              <div className="h-40 bg-gradient-azure flex items-center justify-center">
                <span className="text-5xl">🚨</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Emergency Evacuation</h3>
                <p className="text-muted-foreground mb-4">
                  Master the protocols for safe and efficient evacuation during fire emergencies and other critical situations.
                </p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>60 minutes</span>
                  <span>•</span>
                  <span>Simulation</span>
                  <span>•</span>
                  <span>Certificate</span>
                </div>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm">
              <div className="h-40 bg-gradient-purple flex items-center justify-center">
                <span className="text-5xl">🔥</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Fire Prevention</h3>
                <p className="text-muted-foreground mb-4">
                  Identify and mitigate fire hazards in different environments before they become dangerous situations.
                </p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>30 minutes</span>
                  <span>•</span>
                  <span>Video + Quiz</span>
                  <span>•</span>
                  <span>Certificate</span>
                </div>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm">
              <div className="h-40 bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center">
                <span className="text-5xl">🚑</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">First Aid for Burns</h3>
                <p className="text-muted-foreground mb-4">
                  Learn essential first aid techniques for treating various degrees of burns and related injuries.
                </p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>40 minutes</span>
                  <span>•</span>
                  <span>Practical</span>
                  <span>•</span>
                  <span>Certificate</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Pricing Section - New Section 3 */}
      <section 
        ref={pricingRef} 
        id="pricing"
        className="py-20 px-4 bg-gradient-to-r from-fire-900/10 to-azure-900/10"
      >
        <motion.div
          initial="hidden"
          animate={pricingInView ? "visible" : "hidden"}
          variants={fadeIn}
          className="max-w-7xl mx-auto"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose the plan that works best for your organization's size and needs
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Starter Plan */}
            <div className="rounded-xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm transition-transform hover:scale-105">
              <div className="p-6 border-b border-white/10">
                <h3 className="text-xl font-bold mb-2">Starter</h3>
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold">$99</span>
                  <span className="text-muted-foreground ml-1">/month</span>
                </div>
                <p className="text-muted-foreground mt-2">Perfect for small teams up to 25 users</p>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="text-green-500 mr-2 h-5 w-5" />
                    <span>Essential training modules</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-500 mr-2 h-5 w-5" />
                    <span>Basic compliance tracking</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-500 mr-2 h-5 w-5" />
                    <span>Email notifications</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-500 mr-2 h-5 w-5" />
                    <span>Standard reports</span>
                  </li>
                </ul>
                <Button className="w-full mt-6 bg-gradient-fire hover:bg-gradient-fire/90"
                  onClick={() => window.location.href = "/auth?mode=signup&plan=starter"}>
                  Get Started
                </Button>
              </div>
            </div>
            
            {/* Business Plan */}
            <div className="rounded-xl overflow-hidden border-2 border-fire-500 bg-white/5 backdrop-blur-sm transform scale-105 shadow-lg shadow-fire-500/20">
              <div className="p-6 border-b border-white/10 relative">
                <div className="absolute top-0 right-0 bg-fire-500 text-white px-3 py-1 text-xs font-bold rounded-bl-lg">
                  POPULAR
                </div>
                <h3 className="text-xl font-bold mb-2">Business</h3>
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold">$249</span>
                  <span className="text-muted-foreground ml-1">/month</span>
                </div>
                <p className="text-muted-foreground mt-2">For growing organizations up to 100 users</p>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="text-green-500 mr-2 h-5 w-5" />
                    <span>All Starter features</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-500 mr-2 h-5 w-5" />
                    <span>Advanced training modules</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-500 mr-2 h-5 w-5" />
                    <span>Custom certification paths</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-500 mr-2 h-5 w-5" />
                    <span>Advanced analytics</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-500 mr-2 h-5 w-5" />
                    <span>Priority support</span>
                  </li>
                </ul>
                <Button className="w-full mt-6 bg-gradient-fire hover:bg-gradient-fire/90"
                  onClick={() => window.location.href = "/auth?mode=signup&plan=business"}>
                  Get Started
                </Button>
              </div>
            </div>
            
            {/* Enterprise Plan */}
            <div className="rounded-xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm transition-transform hover:scale-105">
              <div className="p-6 border-b border-white/10">
                <h3 className="text-xl font-bold mb-2">Enterprise</h3>
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold">Custom</span>
                </div>
                <p className="text-muted-foreground mt-2">For large organizations with custom needs</p>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="text-green-500 mr-2 h-5 w-5" />
                    <span>All Business features</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-500 mr-2 h-5 w-5" />
                    <span>Unlimited users</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-500 mr-2 h-5 w-5" />
                    <span>Custom integrations</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-500 mr-2 h-5 w-5" />
                    <span>White labeling</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-500 mr-2 h-5 w-5" />
                    <span>Dedicated account manager</span>
                  </li>
                </ul>
                <Button className="w-full mt-6" variant="outline"
                  onClick={() => window.location.href = "/contact"}>
                  Contact Sales
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section 
        ref={benefitsRef} 
        className="py-20 px-4"
      >
        <motion.div
          initial="hidden"
          animate={benefitsInView ? "visible" : "hidden"}
          variants={fadeIn}
          className="max-w-7xl mx-auto"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Our Platform</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform offers numerous advantages over traditional fire safety training approaches
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-fire-500/20 flex items-center justify-center text-fire-500">✓</div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">Reduce Administrative Burden</h3>
                    <p className="text-muted-foreground">
                      Automated tracking and reporting eliminates manual record-keeping and follow-ups
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-azure-500/20 flex items-center justify-center text-azure-500">✓</div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">Ensure Compliance</h3>
                    <p className="text-muted-foreground">
                      Stay compliant with regulatory requirements and industry standards
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-500">✓</div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">Improve Safety Culture</h3>
                    <p className="text-muted-foreground">
                      Foster a strong safety culture through consistent, high-quality training
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">✓</div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">Reduce Incidents</h3>
                    <p className="text-muted-foreground">
                      Properly trained employees respond better in emergencies, reducing injuries and damage
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="rounded-xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm p-8">
              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-5xl font-bold text-fire-500 mb-2">98%</div>
                  <p className="text-muted-foreground">Compliance Rate</p>
                </div>
                <div className="h-px bg-white/10" />
                <div className="text-center">
                  <div className="text-5xl font-bold text-azure-500 mb-2">75%</div>
                  <p className="text-muted-foreground">Reduction in Administrative Time</p>
                </div>
                <div className="h-px bg-white/10" />
                <div className="text-center">
                  <div className="text-5xl font-bold text-purple-500 mb-2">65%</div>
                  <p className="text-muted-foreground">Fewer Fire-Related Incidents</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* News Section */}
      <section 
        ref={newsRef} 
        className="py-20 px-4 bg-gradient-to-b from-background to-muted/20"
      >
        <motion.div
          initial="hidden"
          animate={newsInView ? "visible" : "hidden"}
          variants={fadeIn}
          className="max-w-7xl mx-auto"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Latest News & Updates</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Stay informed about the latest developments in fire safety training
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* News 1 */}
            <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm hover:shadow-lg transition-all hover:-translate-y-1">
              <div className="h-48 bg-gradient-to-r from-fire-500 to-fire-600"></div>
              <div className="p-6">
                <div className="text-sm text-muted-foreground mb-2">June 15, 2023</div>
                <h3 className="text-xl font-bold mb-2">New Fire Safety Regulations to Take Effect in 2023</h3>
                <p className="text-muted-foreground mb-4">Learn about the upcoming regulatory changes and how our platform is ready to help you stay compliant.</p>
                <Button variant="link" className="px-0 text-fire-500" onClick={() => window.location.href = "/news/1"}>
                  Read More
                </Button>
              </div>
            </div>
            
            {/* News 2 */}
            <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm hover:shadow-lg transition-all hover:-translate-y-1">
              <div className="h-48 bg-gradient-to-r from-azure-500 to-azure-600"></div>
              <div className="p-6">
                <div className="text-sm text-muted-foreground mb-2">May 22, 2023</div>
                <h3 className="text-xl font-bold mb-2">Case Study: How ABC Company Improved Safety Training</h3>
                <p className="text-muted-foreground mb-4">Discover how a manufacturing company achieved 99% compliance and reduced incidents by 70% using our platform.</p>
                <Button variant="link" className="px-0 text-azure-500" onClick={() => window.location.href = "/news/2"}>
                  Read More
                </Button>
              </div>
            </div>
            
            {/* News 3 */}
            <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm hover:shadow-lg transition-all hover:-translate-y-1">
              <div className="h-48 bg-gradient-to-r from-purple-500 to-purple-600"></div>
              <div className="p-6">
                <div className="text-sm text-muted-foreground mb-2">April 10, 2023</div>
                <h3 className="text-xl font-bold mb-2">Introducing Advanced Fire Simulation Training</h3>
                <p className="text-muted-foreground mb-4">Our new VR fire simulation modules provide realistic training scenarios without the risks of live fire exercises.</p>
                <Button variant="link" className="px-0 text-purple-500" onClick={() => window.location.href = "/news/3"}>
                  Read More
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* FAQ Section */}
      <section 
        ref={faqRef} 
        className="py-20 px-4"
      >
        <motion.div
          initial="hidden"
          animate={faqInView ? "visible" : "hidden"}
          variants={fadeIn}
          className="max-w-7xl mx-auto"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Find answers to common questions about our fire training management platform
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-8">
              <div className="rounded-xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm p-6">
                <h3 className="text-xl font-bold mb-3">How does the platform ensure regulatory compliance?</h3>
                <p className="text-muted-foreground">Our platform stays updated with the latest fire safety regulations across different jurisdictions. We automatically track training requirements and certifications to ensure your organization remains compliant.</p>
              </div>
              
              <div className="rounded-xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm p-6">
                <h3 className="text-xl font-bold mb-3">Can I customize training modules for my specific industry?</h3>
                <p className="text-muted-foreground">Yes, our Business and Enterprise plans allow for customization of training modules to address industry-specific scenarios and requirements. This ensures your team receives relevant training for their work environment.</p>
              </div>
              
              <div className="rounded-xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm p-6">
                <h3 className="text-xl font-bold mb-3">How are training certifications verified?</h3>
                <p className="text-muted-foreground">Our platform includes built-in assessment tools that verify comprehension and skill acquisition. Upon successful completion, digital certificates are issued and stored securely in the system for easy retrieval during audits.</p>
              </div>
            </div>
            
            <div className="space-y-8">
              <div className="rounded-xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm p-6">
                <h3 className="text-xl font-bold mb-3">What kind of reporting capabilities does the platform offer?</h3>
                <p className="text-muted-foreground">Our comprehensive reporting system provides real-time insights into training completion rates, certification status, and compliance metrics. Custom reports can be generated for specific departments, locations, or time periods.</p>
              </div>
              
              <div className="rounded-xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm p-6">
                <h3 className="text-xl font-bold mb-3">How long does implementation typically take?</h3>
                <p className="text-muted-foreground">Most organizations can be fully onboarded within 2-4 weeks, depending on the size of your team and complexity of your training requirements. Our implementation specialists work closely with you throughout the process.</p>
              </div>
              
              <div className="rounded-xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm p-6">
                <h3 className="text-xl font-bold mb-3">Can the platform integrate with our existing HR systems?</h3>
                <p className="text-muted-foreground">Yes, our platform offers integration capabilities with major HR and learning management systems. The Enterprise plan includes custom API integrations to ensure seamless data flow across your organization's tech ecosystem.</p>
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-6">Still have questions? We're here to help!</p>
            <Button className="bg-gradient-fire hover:bg-gradient-fire/90" size="lg" onClick={() => window.location.href = "/contact"}>
              Contact Support
            </Button>
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section 
        ref={ctaRef} 
        className="py-20 px-4 bg-gradient-to-r from-fire-900/30 to-azure-900/30"
      >
        <motion.div
          initial="hidden"
          animate={ctaInView ? "visible" : "hidden"}
          variants={fadeIn}
          className="max-w-7xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Transform Your Fire Safety Training?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Join thousands of organizations that trust our platform to keep their teams safe and compliant
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="bg-gradient-fire hover:bg-gradient-fire/90"
              size="lg"
              onClick={() => window.location.href = "/auth?mode=signup"}
            >
              Get Started For Free
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => window.location.href = "/demo"}
            >
              Request Demo
            </Button>
          </div>
        </motion.div>
      </section>

      <footer className="py-12 px-4 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
            <div className="col-span-2">
              <div className="mb-4">
                <h2 className="text-2xl font-bold mb-2">FireTrainPro</h2>
                <p className="text-muted-foreground">Comprehensive fire safety training management for modern organizations</p>
              </div>
              <div className="flex space-x-4">
                <a href="#" className="text-muted-foreground hover:text-white">
                  <span className="sr-only">Twitter</span>
                  <div className="w-6 h-6">T</div>
                </a>
                <a href="#" className="text-muted-foreground hover:text-white">
                  <span className="sr-only">LinkedIn</span>
                  <div className="w-6 h-6">L</div>
                </a>
                <a href="#" className="text-muted-foreground hover:text-white">
                  <span className="sr-only">Facebook</span>
                  <div className="w-6 h-6">F</div>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Product</h3>
              <ul className="space-y-2">
                <li><a href="#features" className="text-muted-foreground hover:text-white">Features</a></li>
                <li><a href="#pricing" className="text-muted-foreground hover:text-white">Pricing</a></li>
                <li><a href="/demo" className="text-muted-foreground hover:text-white">Demo</a></li>
                <li><a href="/docs" className="text-muted-foreground hover:text-white">Documentation</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Company</h3>
              <ul className="space-y-2">
                <li><a href="/about" className="text-muted-foreground hover:text-white">About Us</a></li>
                <li><a href="/careers" className="text-muted-foreground hover:text-white">Careers</a></li>
                <li><a href="/blog" className="text-muted-foreground hover:text-white">Blog</a></li>
                <li><a href="/contact" className="text-muted-foreground hover:text-white">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Legal</h3>
              <ul className="space-y-2">
                <li><a href="/privacy" className="text-muted-foreground hover:text-white">Privacy Policy</a></li>
                <li><a href="/terms" className="text-muted-foreground hover:text-white">Terms of Service</a></li>
                <li><a href="/security" className="text-muted-foreground hover:text-white">Security</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-white/10 text-center text-muted-foreground">
            <p>© 2023 FireTrainPro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
