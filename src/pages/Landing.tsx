import React, { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";

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
  
  const heroInView = useInView(heroRef, { once: true, amount: 0.3 });
  const featuresInView = useInView(featuresRef, { once: true, amount: 0.3 });
  const howItWorksInView = useInView(howItWorksRef, { once: true, amount: 0.3 });
  const testimonialsInView = useInView(testimonialsRef, { once: true, amount: 0.3 });
  const modulesInView = useInView(modulesRef, { once: true, amount: 0.3 });
  const benefitsInView = useInView(benefitsRef, { once: true, amount: 0.3 });
  const ctaInView = useInView(ctaRef, { once: true, amount: 0.3 });
  const teamInView = useInView(teamRef, { once: true, amount: 0.3 });
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background/95 to-background">
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
              icon={<span>🔍</span>} 
              title="Compliance Tracking" 
              description="Automatically track compliance status for all employees" 
            />
            <FeatureCard 
              icon={<span>📊</span>} 
              title="Analytics Dashboard" 
              description="Get real-time insights into training progress and completion rates" 
            />
            <FeatureCard 
              icon={<span>🎓</span>} 
              title="Interactive Learning" 
              description="Engage users with interactive training modules and quizzes" 
            />
            <FeatureCard 
              icon={<span>📱</span>} 
              title="Mobile Access" 
              description="Access training materials from any device, anywhere" 
            />
            <FeatureCard 
              icon={<span>🔔</span>} 
              title="Automated Reminders" 
              description="Send automatic notifications for certification renewals" 
            />
            <FeatureCard 
              icon={<span>📝</span>} 
              title="Custom Reports" 
              description="Generate custom reports for audits and management reviews" 
            />
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

      <section 
        ref={teamRef} 
        className="py-20 px-4 bg-gradient-to-b from-background to-muted/30"
      >
        <motion.div
          initial="hidden"
          animate={teamInView ? "visible" : "hidden"}
          variants={fadeIn}
          className="max-w-7xl mx-auto"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Expert Team</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our team of fire safety experts and learning specialists ensures the highest quality training content
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
                <img
                  src="https://ui-avatars.com/api/?name=John+Smith&background=FF6B45&color=fff&size=128"
                  alt="John Smith"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold mb-1">John Smith</h3>
              <p className="text-muted-foreground mb-2">Fire Safety Director</p>
              <p className="text-sm text-muted-foreground">
                25+ years experience in fire prevention and emergency management
              </p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
                <img
                  src="https://ui-avatars.com/api/?name=Laura+Chen&background=1CA0E8&color=fff&size=128"
                  alt="Laura Chen"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold mb-1">Laura Chen</h3>
              <p className="text-muted-foreground mb-2">Training Lead</p>
              <p className="text-sm text-muted-foreground">
                Specialist in developing interactive learning experiences
              </p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
                <img
                  src="https://ui-avatars.com/api/?name=Marcus+Johnson&background=7A5AF8&color=fff&size=128"
                  alt="Marcus Johnson"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold mb-1">Marcus Johnson</h3>
              <p className="text-muted-foreground mb-2">Compliance Expert</p>
              <p className="text-sm text-muted-foreground">
                Former fire marshal with deep knowledge of regulations
              </p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
                <img
                  src="https://ui-avatars.com/api/?name=Sofia+Rodriguez&background=10B981&color=fff&size=128"
                  alt="Sofia Rodriguez"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold mb-1">Sofia Rodriguez</h3>
              <p className="text-muted-foreground mb-2">Product Manager</p>
              <p className="text-sm text-muted-foreground">
                Ensures our platform meets the needs of safety professionals
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      <section 
        ref={ctaRef} 
        className="py-32 px-4 bg-gradient-to-b from-background via-fire-950/20 to-background relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,107,69,0.15),transparent_70%)]"></div>
        <motion.div
          initial="hidden"
          animate={ctaInView ? "visible" : "hidden"}
          variants={fadeIn}
          className="max-w-4xl mx-auto text-center relative z-10"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Fire Safety Training?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of organizations that trust our platform for their fire safety training needs
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
                  onClick={() => window.location.href = "/auth?mode=signup"}
                >
                  Get Started for Free
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white/20 hover:bg-white/10"
                  onClick={() => window.location.href = "/auth?mode=login"}
                >
                  Sign In
                </Button>
              </>
            )}
          </div>
        </motion.div>
      </section>

      <footer className="py-12 px-4 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Fire Training System</h3>
              <p className="text-muted-foreground mb-4">
                Comprehensive fire safety training and certification management for organizations of all sizes.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-muted-foreground hover:text-white">
                  <span className="sr-only">Twitter</span>
                  <span className="text-xl">𝕏</span>
                </a>
                <a href="#" className="text-muted-foreground hover:text-white">
                  <span className="sr-only">LinkedIn</span>
                  <span className="text-xl">in</span>
                </a>
                <a href="#" className="text-muted-foreground hover:text-white">
                  <span className="sr-only">Facebook</span>
                  <span className="text-xl">f</span>
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Training Modules</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Compliance</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Case Studies</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/10 text-center text-muted-foreground">
            <p>© 2023 Fire Training System. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
