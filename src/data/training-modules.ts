
import { TrainingModule, Quiz } from "@/types/training";

export const trainingModules: TrainingModule[] = [
  {
    id: "fs-101",
    title: "Fire Safety Fundamentals for Hotel Staff",
    description: "Comprehensive introduction to fire safety principles, prevention strategies, and emergency response protocols specifically designed for hotel environments.",
    duration: 120,
    imageUrl: "https://images.unsplash.com/photo-1598620617450-28316d5bb8ab?q=80&w=2560&auto=format&fit=crop",
    level: "beginner",
    category: "fire_safety",
    roles: ["admin", "manager", "receptionist", "housekeeping", "security", "maintenance", "food_service"],
    progress: 0,
    completed: false,
    content: {
      modules: [
        {
          title: "Introduction to Hotel Fire Safety",
          duration: 20,
          content: `
            <h2>Understanding Fire Risks in Hotels</h2>
            <p>Hotels present unique fire safety challenges due to their 24/7 operations, diverse occupancy, and complex building systems. This module covers the fundamental principles of fire prevention and response in hospitality environments.</p>
            
            <h3>Learning Objectives:</h3>
            <ul>
              <li>Identify common fire hazards in hotel environments</li>
              <li>Understand the fire triangle and how fires start and spread</li>
              <li>Recognize the importance of fire prevention measures</li>
              <li>Learn basic fire safety terminology and concepts</li>
            </ul>

            <h3>Fire Triangle Basics</h3>
            <p>Fire requires three elements to exist:</p>
            <ul>
              <li><strong>Fuel:</strong> Any combustible material (paper, fabric, wood, chemicals)</li>
              <li><strong>Heat:</strong> Ignition source (electrical equipment, open flames, friction)</li>
              <li><strong>Oxygen:</strong> Present in normal air (approximately 21%)</li>
            </ul>
            <p>Remove any one element, and the fire cannot continue.</p>

            <h3>Common Hotel Fire Hazards</h3>
            <ul>
              <li>Electrical equipment malfunctions</li>
              <li>Cooking equipment in kitchens and guest rooms</li>
              <li>Smoking materials</li>
              <li>Heating equipment</li>
              <li>Housekeeping chemicals and linens</li>
              <li>Maintenance activities</li>
            </ul>
          `
        },
        {
          title: "Fire Classification and Extinguisher Types",
          duration: 25,
          content: `
            <h2>Types of Fires and Appropriate Suppression Methods</h2>
            
            <h3>Class A Fires - Ordinary Combustibles</h3>
            <ul>
              <li>Materials: Wood, paper, fabric, plastics, rubber</li>
              <li>Extinguisher: Water, foam, dry chemical</li>
              <li>Hotel examples: Furniture, linens, curtains, lobby decorations</li>
            </ul>

            <h3>Class B Fires - Flammable Liquids</h3>
            <ul>
              <li>Materials: Gasoline, oil, grease, alcohol, paint</li>
              <li>Extinguisher: Foam, CO2, dry chemical (never water)</li>
              <li>Hotel examples: Kitchen grease, cleaning solvents, maintenance fluids</li>
            </ul>

            <h3>Class C Fires - Electrical</h3>
            <ul>
              <li>Materials: Energized electrical equipment</li>
              <li>Extinguisher: CO2, dry chemical (never water on live electrical)</li>
              <li>Hotel examples: Computers, lighting, HVAC systems, kitchen equipment</li>
            </ul>

            <h3>Class K Fires - Cooking Oils</h3>
            <ul>
              <li>Materials: Vegetable oils, animal fats used in cooking</li>
              <li>Extinguisher: Wet chemical systems</li>
              <li>Hotel examples: Deep fryers, sauté pans, grill surfaces</li>
            </ul>

            <h3>PASS Technique for Fire Extinguisher Operation</h3>
            <ul>
              <li><strong>P</strong>ull the pin</li>
              <li><strong>A</strong>im at the base of the fire</li>
              <li><strong>S</strong>queeze the handle</li>
              <li><strong>S</strong>weep side to side</li>
            </ul>
          `
        },
        {
          title: "Fire Detection and Alarm Systems",
          duration: 20,
          content: `
            <h2>Hotel Fire Detection Systems</h2>
            
            <h3>Types of Fire Detection</h3>
            <ul>
              <li><strong>Smoke Detectors:</strong> Photoelectric and ionization types</li>
              <li><strong>Heat Detectors:</strong> Fixed temperature and rate-of-rise</li>
              <li><strong>Flame Detectors:</strong> UV and infrared sensors</li>
              <li><strong>Gas Detectors:</strong> Carbon monoxide and other gases</li>
            </ul>

            <h3>Manual Fire Alarm Components</h3>
            <ul>
              <li>Pull stations at exits and in corridors</li>
              <li>Emergency communication systems</li>
              <li>Fire warden phones</li>
              <li>Mass notification systems</li>
            </ul>

            <h3>When Fire Alarm Sounds</h3>
            <ol>
              <li>Stop what you're doing immediately</li>
              <li>Locate the nearest exit</li>
              <li>Assist guests calmly</li>
              <li>Use stairs, never elevators</li>
              <li>Meet at designated assembly point</li>
              <li>Report to incident commander</li>
            </ol>

            <h3>False Alarms</h3>
            <p>Even if you suspect a false alarm, always treat every alarm as real until confirmed otherwise by fire department or security.</p>
          `
        },
        {
          title: "Emergency Communication and Guest Assistance",
          duration: 30,
          content: `
            <h2>Effective Emergency Communication</h2>
            
            <h3>Communicating with Guests During Fire Emergency</h3>
            <ul>
              <li>Remain calm and speak clearly</li>
              <li>Use simple, direct language</li>
              <li>Avoid causing panic</li>
              <li>Provide clear directions</li>
              <li>Be patient with confused or frightened guests</li>
            </ul>

            <h3>Key Phrases for Guest Communication</h3>
            <ul>
              <li>"Please remain calm, we have a fire alarm activation"</li>
              <li>"For your safety, please exit the building using the stairs"</li>
              <li>"Do not use elevators"</li>
              <li>"Please gather at the assembly point in the parking lot"</li>
              <li>"Fire department is on their way"</li>
            </ul>

            <h3>Assisting Guests with Special Needs</h3>
            <ul>
              <li><strong>Mobility impaired:</strong> Assist to areas of refuge, notify fire department</li>
              <li><strong>Visually impaired:</strong> Offer your arm, describe surroundings</li>
              <li><strong>Hearing impaired:</strong> Use visual signals, written instructions</li>
              <li><strong>Elderly guests:</strong> Provide physical assistance as needed</li>
              <li><strong>Families with children:</strong> Help keep families together</li>
            </ul>

            <h3>Documentation and Reporting</h3>
            <p>After any fire emergency:</p>
            <ul>
              <li>Complete incident reports promptly</li>
              <li>Record guest assistance provided</li>
              <li>Note any equipment used or damaged</li>
              <li>Document lessons learned</li>
            </ul>
          `
        },
        {
          title: "Fire Prevention and Housekeeping Safety",
          duration: 25,
          content: `
            <h2>Daily Fire Prevention Practices</h2>
            
            <h3>Housekeeping Fire Prevention</h3>
            <ul>
              <li>Proper storage of cleaning chemicals</li>
              <li>Safe handling of linens and laundry</li>
              <li>Electrical equipment inspection</li>
              <li>Proper disposal of smoking materials</li>
              <li>Maintenance of escape routes</li>
            </ul>

            <h3>Guest Room Safety Checks</h3>
            <ul>
              <li>Test smoke detectors during cleaning</li>
              <li>Check for damaged electrical cords</li>
              <li>Ensure fire safety information is visible</li>
              <li>Verify balcony doors are not blocked</li>
              <li>Report any fire safety concerns immediately</li>
            </ul>

            <h3>Common Area Maintenance</h3>
            <ul>
              <li>Keep exits clear and marked</li>
              <li>Maintain emergency lighting</li>
              <li>Check fire extinguisher locations</li>
              <li>Monitor fire door functionality</li>
              <li>Report damaged fire safety equipment</li>
            </ul>

            <h3>Chemical Storage Safety</h3>
            <ul>
              <li>Store chemicals in approved containers</li>
              <li>Keep incompatible chemicals separated</li>
              <li>Maintain proper ventilation</li>
              <li>Use appropriate personal protective equipment</li>
              <li>Know location of safety data sheets</li>
            </ul>
          `
        }
      ]
    }
  },
  {
    id: "er-201",
    title: "Emergency Response for Front Desk Personnel",
    description: "Specialized training for front desk staff on managing fire emergencies, guest communications, and coordination with emergency services.",
    duration: 90,
    imageUrl: "https://images.unsplash.com/photo-1542513217-0b0eedf7005d?q=80&w=2564&auto=format&fit=crop",
    level: "intermediate",
    category: "emergency_response",
    roles: ["admin", "manager", "receptionist"],
    progress: 0,
    completed: false,
    content: {
      modules: [
        {
          title: "Front Desk Emergency Command Center",
          duration: 20,
          content: `
            <h2>Role of Front Desk During Fire Emergencies</h2>
            <p>The front desk serves as a critical command center during fire emergencies, coordinating guest evacuation, communicating with emergency services, and maintaining calm in chaotic situations.</p>
            
            <h3>Primary Responsibilities</h3>
            <ul>
              <li>Immediate notification of emergency services</li>
              <li>Guest accountability and evacuation coordination</li>
              <li>Communication with hotel management</li>
              <li>Coordination with fire department upon arrival</li>
              <li>Guest services and family notifications</li>
            </ul>

            <h3>Emergency Contact Procedures</h3>
            <ol>
              <li>Call 911 (or local emergency number)</li>
              <li>Notify hotel general manager</li>
              <li>Contact security supervisor</li>
              <li>Alert maintenance chief</li>
              <li>Notify corporate emergency line</li>
            </ol>

            <h3>Information to Provide to 911</h3>
            <ul>
              <li>Hotel name and exact address</li>
              <li>Nature of emergency (fire, alarm, etc.)</li>
              <li>Location within the building</li>
              <li>Number of guests potentially affected</li>
              <li>Any known injuries</li>
              <li>Your name and position</li>
            </ul>
          `
        },
        {
          title: "Guest Accountability Systems",
          duration: 25,
          content: `
            <h2>Managing Guest Information During Emergencies</h2>
            
            <h3>Guest Registration System Access</h3>
            <ul>
              <li>Print current guest roster immediately</li>
              <li>Identify guests with special needs</li>
              <li>Note room numbers and guest counts</li>
              <li>Gather emergency contact information</li>
              <li>Prepare for accountability reporting</li>
            </ul>

            <h3>Evacuation Accountability Process</h3>
            <ol>
              <li>Establish accountability station at assembly point</li>
              <li>Check off guests as they arrive</li>
              <li>Identify missing persons</li>
              <li>Provide information to fire department</li>
              <li>Coordinate search and rescue priorities</li>
            </ol>

            <h3>Guest with Special Needs</h3>
            <ul>
              <li><strong>Mobility limitations:</strong> Priority evacuation assistance</li>
              <li><strong>Medical conditions:</strong> Emergency medication needs</li>
              <li><strong>Language barriers:</strong> Translation assistance</li>
              <li><strong>Unaccompanied minors:</strong> Special care and family notification</li>
              <li><strong>VIP guests:</strong> Security and privacy considerations</li>
            </ul>

            <h3>Documentation Requirements</h3>
            <ul>
              <li>Guest evacuation checklist</li>
              <li>Missing person reports</li>
              <li>Emergency contact log</li>
              <li>Time stamps for all actions</li>
              <li>Post-incident guest services provided</li>
            </ul>
          `
        },
        {
          title: "Crisis Communication Management",
          duration: 25,
          content: `
            <h2>Managing Communications During Fire Emergencies</h2>
            
            <h3>Internal Communication Priorities</h3>
            <ol>
              <li>Alert all hotel departments</li>
              <li>Notify off-duty management</li>
              <li>Update housekeeping on guest locations</li>
              <li>Coordinate with maintenance on building systems</li>
              <li>Brief security on evacuation status</li>
            </ol>

            <h3>Guest Communication Strategies</h3>
            <ul>
              <li><strong>In-person:</strong> Calm, clear, authoritative voice</li>
              <li><strong>Phone system:</strong> Brief, informative announcements</li>
              <li><strong>Room phones:</strong> Direct contact for mobility-impaired</li>
              <li><strong>Public address:</strong> Evacuation instructions</li>
              <li><strong>Digital displays:</strong> Visual emergency information</li>
            </ul>

            <h3>Media and Family Communication</h3>
            <ul>
              <li>Refer all media inquiries to general manager</li>
              <li>Provide family notification services</li>
              <li>Coordinate with corporate communications</li>
              <li>Maintain guest privacy and confidentiality</li>
              <li>Document all external communications</li>
            </ul>

            <h3>Post-Emergency Communication</h3>
            <ul>
              <li>All-clear announcements</li>
              <li>Re-entry procedures</li>
              <li>Service restoration updates</li>
              <li>Guest compensation discussions</li>
              <li>Follow-up safety briefings</li>
            </ul>
          `
        },
        {
          title: "Emergency Service Coordination",
          duration: 20,
          content: `
            <h2>Working with Fire Department and Emergency Services</h2>
            
            <h3>Fire Department Arrival Protocol</h3>
            <ol>
              <li>Meet fire department at main entrance</li>
              <li>Provide building access and keys</li>
              <li>Share guest accountability information</li>
              <li>Escort to fire panel and incident location</li>
              <li>Maintain communication link</li>
            </ol>

            <h3>Information to Provide to Fire Department</h3>
            <ul>
              <li>Building layout and construction details</li>
              <li>Location of fire alarm panel</li>
              <li>Utility shut-off locations</li>
              <li>Hazardous material storage areas</li>
              <li>Guest and staff accountability status</li>
            </ul>

            <h3>Supporting Emergency Medical Services</h3>
            <ul>
              <li>Identify injured persons and locations</li>
              <li>Provide medical history if available</li>
              <li>Clear access routes for ambulances</li>
              <li>Coordinate family notifications</li>
              <li>Document medical transports</li>
            </ul>

            <h3>Incident Command Integration</h3>
            <ul>
              <li>Assign hotel liaison to incident commander</li>
              <li>Provide ongoing operational support</li>
              <li>Maintain communication with hotel management</li>
              <li>Coordinate resource requests</li>
              <li>Support investigation activities</li>
            </ul>
          `
        }
      ]
    }
  },
  {
    id: "kf-301",
    title: "Kitchen Fire Safety for Food Service Staff",
    description: "Advanced fire prevention and suppression training specifically designed for hotel kitchen and food service personnel, focusing on grease fires and commercial cooking equipment.",
    duration: 105,
    imageUrl: "https://images.unsplash.com/photo-1612199621372-80b9c7d51ee3?q=80&w=2532&auto=format&fit=crop",
    level: "advanced",
    category: "fire_safety",
    roles: ["admin", "manager", "food_service"],
    progress: 0,
    completed: false,
    content: {
      modules: [
        {
          title: "Commercial Kitchen Fire Hazards",
          duration: 25,
          content: `
            <h2>Understanding Kitchen Fire Risks</h2>
            <p>Commercial kitchens are high-risk environments for fires due to the combination of heat sources, flammable materials, and constant activity. Understanding these risks is essential for prevention.</p>
            
            <h3>Primary Fire Hazards in Hotel Kitchens</h3>
            <ul>
              <li><strong>Cooking oils and grease:</strong> High temperature ignition risk</li>
              <li><strong>Gas equipment:</strong> Leaks and improper ignition</li>
              <li><strong>Electrical equipment:</strong> Overloaded circuits and damaged cords</li>
              <li><strong>Heat-producing equipment:</strong> Grills, ovens, fryers, salamanders</li>
              <li><strong>Combustible materials:</strong> Paper, cardboard, cleaning supplies</li>
            </ul>

            <h3>Grease Fire Characteristics</h3>
            <ul>
              <li>Ignition temperature around 600°F (315°C)</li>
              <li>Spreads rapidly across cooking surfaces</li>
              <li>Can reach flash point quickly</li>
              <li>Water will cause dangerous splattering</li>
              <li>Requires specialized suppression methods</li>
            </ul>

            <h3>Equipment-Specific Risks</h3>
            <ul>
              <li><strong>Deep fryers:</strong> Oil overflow and overheating</li>
              <li><strong>Char broilers:</strong> Grease buildup and flare-ups</li>
              <li><strong>Sauté stations:</strong> Pan fires and alcohol ignition</li>
              <li><strong>Salamanders:</strong> Food debris ignition</li>
              <li><strong>Convection ovens:</strong> Paper and packaging fires</li>
            </ul>

            <h3>Daily Risk Assessment</h3>
            <ul>
              <li>Check equipment before each shift</li>
              <li>Inspect gas connections and hoses</li>
              <li>Verify proper ventilation operation</li>
              <li>Ensure fire suppression systems are armed</li>
              <li>Remove combustible materials from heat sources</li>
            </ul>
          `
        },
        {
          title: "Fire Suppression Systems in Kitchens",
          duration: 30,
          content: `
            <h2>Kitchen Fire Suppression Technology</h2>
            
            <h3>Automatic Fire Suppression Systems</h3>
            <ul>
              <li><strong>Wet Chemical Systems:</strong> Most common for cooking equipment</li>
              <li><strong>Dry Chemical Systems:</strong> Older systems, less effective on grease</li>
              <li><strong>Water Mist Systems:</strong> Newer technology for specific applications</li>
              <li><strong>Carbon Dioxide Systems:</strong> Limited use in occupied spaces</li>
            </ul>

            <h3>Wet Chemical System Operation</h3>
            <ul>
              <li>Detects fire through heat sensors or manual activation</li>
              <li>Automatically shuts off gas and electrical power</li>
              <li>Discharges wet chemical agent onto cooking surfaces</li>
              <li>Forms protective film to prevent re-ignition</li>
              <li>Activates exhaust fan shutdown</li>
            </ul>

            <h3>Manual Fire Suppression Equipment</h3>
            <ul>
              <li><strong>Class K Fire Extinguishers:</strong> Wet chemical for cooking oils</li>
              <li><strong>Fire Blankets:</strong> Smothering small grease fires</li>
              <li><strong>Class ABC Extinguishers:</strong> For non-cooking fires</li>
              <li><strong>Emergency shut-offs:</strong> Gas and electrical disconnects</li>
            </ul>

            <h3>System Maintenance Requirements</h3>
            <ul>
              <li>Monthly visual inspections</li>
              <li>Semi-annual professional service</li>
              <li>Immediate recharge after any discharge</li>
              <li>Keep nozzles and detectors clean</li>
              <li>Document all maintenance activities</li>
            </ul>

            <h3>Post-Discharge Procedures</h3>
            <ol>
              <li>Ensure fire is completely extinguished</li>
              <li>Do not restart equipment</li>
              <li>Call fire department even for automatic discharge</li>
              <li>Schedule immediate system recharge</li>
              <li>Document incident and response</li>
            </ol>
          `
        },
        {
          title: "Safe Cooking Practices and Fire Prevention",
          duration: 25,
          content: `
            <h2>Daily Fire Prevention in Kitchen Operations</h2>
            
            <h3>Grease Management</h3>
            <ul>
              <li>Monitor oil temperatures continuously</li>
              <li>Never exceed recommended cooking temperatures</li>
              <li>Filter fryer oil regularly</li>
              <li>Dispose of used oil properly</li>
              <li>Clean grease traps and interceptors regularly</li>
            </ul>

            <h3>Equipment Operation Safety</h3>
            <ul>
              <li><strong>Pre-heating:</strong> Gradual temperature increases</li>
              <li><strong>Loading:</strong> Avoid overloading cooking surfaces</li>
              <li><strong>Monitoring:</strong> Never leave cooking equipment unattended</li>
              <li><strong>Cleaning:</strong> Daily cleaning of grease and debris</li>
              <li><strong>Shutdown:</strong> Proper cooling and securing procedures</li>
            </ul>

            <h3>Personal Protective Equipment</h3>
            <ul>
              <li>Heat-resistant gloves for hot equipment</li>
              <li>Non-slip footwear for spill protection</li>
              <li>Aprons and clothing of appropriate materials</li>
              <li>Eye protection when using chemicals</li>
              <li>Burn treatment supplies readily available</li>
            </ul>

            <h3>Ventilation System Management</h3>
            <ul>
              <li>Operate exhaust systems during all cooking</li>
              <li>Clean hood filters regularly</li>
              <li>Inspect ductwork for grease buildup</li>
              <li>Report ventilation problems immediately</li>
              <li>Understand exhaust system fire response</li>
            </ul>

            <h3>Chemical Storage and Handling</h3>
            <ul>
              <li>Store cleaning chemicals away from heat sources</li>
              <li>Use proper containers and labeling</li>
              <li>Never mix different cleaning products</li>
              <li>Maintain safety data sheets</li>
              <li>Provide adequate ventilation during use</li>
            </ul>
          `
        },
        {
          title: "Emergency Response in Kitchen Fires",
          duration: 25,
          content: `
            <h2>Responding to Kitchen Fire Emergencies</h2>
            
            <h3>Small Grease Fire Response</h3>
            <ol>
              <li>Turn off heat source immediately</li>
              <li>Cover pan with tight-fitting lid</li>
              <li>Turn off ventilation system</li>
              <li>Use Class K extinguisher if needed</li>
              <li>Never use water on grease fires</li>
              <li>Evacuate if fire spreads</li>
            </ol>

            <h3>Large Kitchen Fire Response</h3>
            <ol>
              <li>Activate manual pull station</li>
              <li>Shut off gas and electrical supplies</li>
              <li>Evacuate kitchen immediately</li>
              <li>Close kitchen doors behind you</li>
              <li>Call 911 from safe location</li>
              <li>Meet fire department at entrance</li>
            </ol>

            <h3>Equipment Fire Procedures</h3>
            <ul>
              <li><strong>Fryer fires:</strong> Activate suppression system, shut off gas</li>
              <li><strong>Oven fires:</strong> Keep door closed, shut off power</li>
              <li><strong>Grill fires:</strong> Turn off gas, use Class K extinguisher</li>
              <li><strong>Electrical fires:</strong> Shut off power, use CO2 extinguisher</li>
            </ul>

            <h3>Post-Fire Procedures</h3>
            <ul>
              <li>Do not restart any equipment</li>
              <li>Ventilate area to remove smoke</li>
              <li>Document incident thoroughly</li>
              <li>Inspect all equipment before restart</li>
              <li>Recharge all fire suppression systems</li>
              <li>Review incident with all staff</li>
            </ul>

            <h3>Staff Communication During Emergencies</h3>
            <ul>
              <li>Use clear, calm voice commands</li>
              <li>Designate specific evacuation routes</li>
              <li>Account for all kitchen personnel</li>
              <li>Coordinate with front desk and management</li>
              <li>Provide information to emergency responders</li>
            </ul>
          `
        }
      ]
    }
  }
];

export const quizzes: Quiz[] = [
  {
    id: "fs-101-quiz",
    module_id: "fs-101",
    moduleId: "fs-101",
    title: "Fire Safety Fundamentals Quiz",
    questions: [
      {
        id: "fs-101-q1",
        text: "What are the three elements of the fire triangle?",
        options: [
          { id: "fs-101-q1-a", text: "Fuel, Heat, Oxygen", isCorrect: true },
          { id: "fs-101-q1-b", text: "Water, Gas, Electricity", isCorrect: false },
          { id: "fs-101-q1-c", text: "Smoke, Flame, Ash", isCorrect: false },
          { id: "fs-101-q1-d", text: "Carbon, Hydrogen, Oxygen", isCorrect: false }
        ]
      },
      {
        id: "fs-101-q2",
        text: "Which fire extinguisher class is appropriate for cooking oil fires?",
        options: [
          { id: "fs-101-q2-a", text: "Class A", isCorrect: false },
          { id: "fs-101-q2-b", text: "Class B", isCorrect: false },
          { id: "fs-101-q2-c", text: "Class C", isCorrect: false },
          { id: "fs-101-q2-d", text: "Class K", isCorrect: true }
        ]
      },
      {
        id: "fs-101-q3",
        text: "What does the 'P' stand for in the PASS technique?",
        options: [
          { id: "fs-101-q3-a", text: "Point", isCorrect: false },
          { id: "fs-101-q3-b", text: "Pull", isCorrect: true },
          { id: "fs-101-q3-c", text: "Push", isCorrect: false },
          { id: "fs-101-q3-d", text: "Press", isCorrect: false }
        ]
      },
      {
        id: "fs-101-q4",
        text: "When a fire alarm sounds, what should you do first?",
        options: [
          { id: "fs-101-q4-a", text: "Investigate the source of the alarm", isCorrect: false },
          { id: "fs-101-q4-b", text: "Stop what you're doing and prepare to evacuate", isCorrect: true },
          { id: "fs-101-q4-c", text: "Call the fire department", isCorrect: false },
          { id: "fs-101-q4-d", text: "Continue working until you see smoke", isCorrect: false }
        ]
      },
      {
        id: "fs-101-q5",
        text: "Which guests require priority assistance during evacuation?",
        options: [
          { id: "fs-101-q5-a", text: "VIP guests only", isCorrect: false },
          { id: "fs-101-q5-b", text: "Guests with mobility limitations and special needs", isCorrect: true },
          { id: "fs-101-q5-c", text: "Guests on upper floors only", isCorrect: false },
          { id: "fs-101-q5-d", text: "Guests who are sleeping", isCorrect: false }
        ]
      },
      {
        id: "fs-101-q6",
        text: "Why should you never use water on grease fires?",
        options: [
          { id: "fs-101-q6-a", text: "It makes the fire burn hotter", isCorrect: false },
          { id: "fs-101-q6-b", text: "It causes dangerous splattering and spreads the fire", isCorrect: true },
          { id: "fs-101-q6-c", text: "Water is too expensive", isCorrect: false },
          { id: "fs-101-q6-d", text: "It damages the equipment", isCorrect: false }
        ]
      },
      {
        id: "fs-101-q7",
        text: "How often should smoke detectors be tested during housekeeping?",
        options: [
          { id: "fs-101-q7-a", text: "Once a month", isCorrect: false },
          { id: "fs-101-q7-b", text: "Once a week", isCorrect: false },
          { id: "fs-101-q7-c", text: "During every room cleaning", isCorrect: true },
          { id: "fs-101-q7-d", text: "Only when they beep", isCorrect: false }
        ]
      },
      {
        id: "fs-101-q8",
        text: "What should you do if you suspect a fire alarm is false?",
        options: [
          { id: "fs-101-q8-a", text: "Ignore it and continue working", isCorrect: false },
          { id: "fs-101-q8-b", text: "Treat it as real until confirmed otherwise", isCorrect: true },
          { id: "fs-101-q8-c", text: "Turn off the alarm", isCorrect: false },
          { id: "fs-101-q8-d", text: "Wait for someone else to investigate", isCorrect: false }
        ]
      }
    ]
  },
  {
    id: "er-201-quiz",
    module_id: "er-201",
    moduleId: "er-201",
    title: "Emergency Response for Front Desk Quiz",
    questions: [
      {
        id: "er-201-q1",
        text: "What is the first priority when discovering a fire emergency at the front desk?",
        options: [
          { id: "er-201-q1-a", text: "Print guest roster", isCorrect: false },
          { id: "er-201-q1-b", text: "Call 911", isCorrect: true },
          { id: "er-201-q1-c", text: "Notify hotel management", isCorrect: false },
          { id: "er-201-q1-d", text: "Activate fire alarm", isCorrect: false }
        ]
      },
      {
        id: "er-201-q2",
        text: "What information should you provide to 911 during a fire emergency?",
        options: [
          { id: "er-201-q2-a", text: "Only the hotel address", isCorrect: false },
          { id: "er-201-q2-b", text: "Hotel name, address, nature of emergency, location, guest count, injuries, your name", isCorrect: true },
          { id: "er-201-q2-c", text: "Just your name and the emergency type", isCorrect: false },
          { id: "er-201-q2-d", text: "The general manager's contact information", isCorrect: false }
        ]
      },
      {
        id: "er-201-q3",
        text: "During evacuation, where should the accountability station be established?",
        options: [
          { id: "er-201-q3-a", text: "In the hotel lobby", isCorrect: false },
          { id: "er-201-q3-b", text: "At the assembly point", isCorrect: true },
          { id: "er-201-q3-c", text: "In the parking garage", isCorrect: false },
          { id: "er-201-q3-d", text: "At the front desk", isCorrect: false }
        ]
      },
      {
        id: "er-201-q4",
        text: "When communicating with guests during an emergency, you should:",
        options: [
          { id: "er-201-q4-a", text: "Speak quickly to save time", isCorrect: false },
          { id: "er-201-q4-b", text: "Use technical fire safety terminology", isCorrect: false },
          { id: "er-201-q4-c", text: "Remain calm and speak clearly with simple, direct language", isCorrect: true },
          { id: "er-201-q4-d", text: "Shout to get everyone's attention", isCorrect: false }
        ]
      },
      {
        id: "er-201-q5",
        text: "Who should handle media inquiries during a fire emergency?",
        options: [
          { id: "er-201-q5-a", text: "The front desk clerk", isCorrect: false },
          { id: "er-201-q5-b", text: "The fire department", isCorrect: false },
          { id: "er-201-q5-c", text: "The general manager", isCorrect: true },
          { id: "er-201-q5-d", text: "Any available hotel employee", isCorrect: false }
        ]
      },
      {
        id: "er-201-q6",
        text: "What should you provide to the fire department upon their arrival?",
        options: [
          { id: "er-201-q6-a", text: "Building access, keys, guest accountability, building layout information", isCorrect: true },
          { id: "er-201-q6-b", text: "Only the guest registration list", isCorrect: false },
          { id: "er-201-q6-c", text: "Your personal contact information", isCorrect: false },
          { id: "er-201-q6-d", text: "Insurance policy information", isCorrect: false }
        ]
      },
      {
        id: "er-201-q7",
        text: "How should you assist guests with hearing impairments during evacuation?",
        options: [
          { id: "er-201-q7-a", text: "Speak louder", isCorrect: false },
          { id: "er-201-q7-b", text: "Use visual signals and written instructions", isCorrect: true },
          { id: "er-201-q7-c", text: "Ignore them, they'll figure it out", isCorrect: false },
          { id: "er-201-q7-d", text: "Use hand gestures only", isCorrect: false }
        ]
      },
      {
        id: "er-201-q8",
        text: "What documentation is required after a fire emergency?",
        options: [
          { id: "er-201-q8-a", text: "Guest evacuation checklist, missing person reports, emergency contact log, time stamps", isCorrect: true },
          { id: "er-201-q8-b", text: "Only the guest registration list", isCorrect: false },
          { id: "er-201-q8-c", text: "Fire department contact information", isCorrect: false },
          { id: "er-201-q8-d", text: "No documentation is necessary", isCorrect: false }
        ]
      }
    ]
  },
  {
    id: "kf-301-quiz",
    module_id: "kf-301",
    moduleId: "kf-301",
    title: "Kitchen Fire Safety Quiz",
    questions: [
      {
        id: "kf-301-q1",
        text: "At what temperature do cooking oils typically ignite?",
        options: [
          { id: "kf-301-q1-a", text: "300°F (150°C)", isCorrect: false },
          { id: "kf-301-q1-b", text: "400°F (200°C)", isCorrect: false },
          { id: "kf-301-q1-c", text: "600°F (315°C)", isCorrect: true },
          { id: "kf-301-q1-d", text: "800°F (425°C)", isCorrect: false }
        ]
      },
      {
        id: "kf-301-q2",
        text: "What type of fire suppression system is most common for commercial cooking equipment?",
        options: [
          { id: "kf-301-q2-a", text: "Dry chemical systems", isCorrect: false },
          { id: "kf-301-q2-b", text: "Wet chemical systems", isCorrect: true },
          { id: "kf-301-q2-c", text: "Water sprinkler systems", isCorrect: false },
          { id: "kf-301-q2-d", text: "Carbon dioxide systems", isCorrect: false }
        ]
      },
      {
        id: "kf-301-q3",
        text: "When should you never leave cooking equipment unattended?",
        options: [
          { id: "kf-301-q3-a", text: "Only when frying", isCorrect: false },
          { id: "kf-301-q3-b", text: "During busy periods only", isCorrect: false },
          { id: "kf-301-q3-c", text: "Never - always monitor cooking equipment", isCorrect: true },
          { id: "kf-301-q3-d", text: "Only when using gas equipment", isCorrect: false }
        ]
      },
      {
        id: "kf-301-q4",
        text: "How should you respond to a small grease fire in a pan?",
        options: [
          { id: "kf-301-q4-a", text: "Pour water on it immediately", isCorrect: false },
          { id: "kf-301-q4-b", text: "Turn off heat, cover with tight-fitting lid, turn off ventilation", isCorrect: true },
          { id: "kf-301-q4-c", text: "Use a Class A fire extinguisher", isCorrect: false },
          { id: "kf-301-q4-d", text: "Carry the pan outside", isCorrect: false }
        ]
      },
      {
        id: "kf-301-q5",
        text: "What should you do immediately after an automatic fire suppression system discharges?",
        options: [
          { id: "kf-301-q5-a", text: "Restart cooking equipment to test it", isCorrect: false },
          { id: "kf-301-q5-b", text: "Clean up the chemical agent", isCorrect: false },
          { id: "kf-301-q5-c", text: "Ensure fire is out, do not restart equipment, call fire department", isCorrect: true },
          { id: "kf-301-q5-d", text: "Open all windows and doors", isCorrect: false }
        ]
      },
      {
        id: "kf-301-q6",
        text: "How often should kitchen fire suppression systems receive professional service?",
        options: [
          { id: "kf-301-q6-a", text: "Monthly", isCorrect: false },
          { id: "kf-301-q6-b", text: "Semi-annually", isCorrect: true },
          { id: "kf-301-q6-c", text: "Annually", isCorrect: false },
          { id: "kf-301-q6-d", text: "Only when they malfunction", isCorrect: false }
        ]
      },
      {
        id: "kf-301-q7",
        text: "What is the primary hazard when using water on a grease fire?",
        options: [
          { id: "kf-301-q7-a", text: "It makes the fire burn longer", isCorrect: false },
          { id: "kf-301-q7-b", text: "It causes dangerous splattering and spreads burning grease", isCorrect: true },
          { id: "kf-301-q7-c", text: "It damages the cooking equipment", isCorrect: false },
          { id: "kf-301-q7-d", text: "It creates toxic fumes", isCorrect: false }
        ]
      },
      {
        id: "kf-301-q8",
        text: "When should ventilation systems be operated in the kitchen?",
        options: [
          { id: "kf-301-q8-a", text: "Only when smoke is visible", isCorrect: false },
          { id: "kf-301-q8-b", text: "During all cooking operations", isCorrect: true },
          { id: "kf-301-q8-c", text: "Only during busy periods", isCorrect: false },
          { id: "kf-301-q8-d", text: "Only when frying foods", isCorrect: false }
        ]
      },
      {
        id: "kf-301-q9",
        text: "What should you do if you discover a large kitchen fire?",
        options: [
          { id: "kf-301-q9-a", text: "Try to extinguish it with available equipment", isCorrect: false },
          { id: "kf-301-q9-b", text: "Activate manual pull station, shut off utilities, evacuate, close doors", isCorrect: true },
          { id: "kf-301-q9-c", text: "Continue cooking in other areas", isCorrect: false },
          { id: "kf-301-q9-d", text: "Move cooking equipment away from the fire", isCorrect: false }
        ]
      },
      {
        id: "kf-301-q10",
        text: "Where should cleaning chemicals be stored in relation to heat sources?",
        options: [
          { id: "kf-301-q10-a", text: "Next to heat sources for convenience", isCorrect: false },
          { id: "kf-301-q10-b", text: "Away from heat sources in approved containers", isCorrect: true },
          { id: "kf-301-q10-c", text: "Under cooking equipment", isCorrect: false },
          { id: "kf-301-q10-d", text: "Location doesn't matter", isCorrect: false }
        ]
      }
    ]
  }
];

export const getUserTrainingModules = (userRole: string) => {
  return trainingModules
    .filter(module => module.roles.includes(userRole as any))
    .map(module => ({
      ...module,
      progress: Math.floor(Math.random() * 100),
      completed: Math.random() > 0.7
    }));
};
