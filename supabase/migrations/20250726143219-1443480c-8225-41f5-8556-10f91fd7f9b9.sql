-- Insert comprehensive fire training courses for hotel staff
INSERT INTO public.training_modules (title, description, duration, level, category, content, image_url) VALUES
(
  'Fire Safety Fundamentals for Hotel Staff',
  'Essential fire safety knowledge for all hotel personnel including prevention, detection, and evacuation procedures.',
  45,
  'beginner',
  'fire_safety',
  '{
    "modules": [
      {
        "title": "Understanding Fire Hazards in Hotels",
        "content": "Hotels present unique fire risks due to guest occupancy, cooking facilities, electrical systems, and storage areas. Learn to identify common fire hazards including overloaded electrical outlets, improper storage of flammable materials, blocked exits, and kitchen equipment risks.",
        "duration": 10
      },
      {
        "title": "Fire Prevention Strategies",
        "content": "Implement daily fire prevention practices including proper housekeeping, electrical safety checks, safe storage of cleaning chemicals, and maintaining clear evacuation routes. Understand the importance of regular equipment maintenance and guest education.",
        "duration": 15
      },
      {
        "title": "Fire Detection Systems",
        "content": "Learn about hotel fire detection systems including smoke detectors, heat sensors, manual pull stations, and sprinkler systems. Understand how to test systems, respond to alarms, and report malfunctions to maintenance.",
        "duration": 10
      },
      {
        "title": "Emergency Evacuation Procedures",
        "content": "Master the hotel evacuation plan including primary and secondary escape routes, assembly points, and guest assistance procedures. Practice the RACE protocol: Rescue, Alarm, Contain, Evacuate.",
        "duration": 10
      }
    ],
    "learning_objectives": [
      "Identify common fire hazards in hotel environments",
      "Implement fire prevention strategies in daily work",
      "Operate fire detection and suppression systems",
      "Execute proper evacuation procedures",
      "Assist guests during emergency situations"
    ],
    "practical_exercises": [
      "Fire hazard identification walk-through",
      "Evacuation route familiarization",
      "Fire extinguisher operation demonstration"
    ]
  }',
  'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b'
),
(
  'Emergency Response for Front Desk Personnel',
  'Specialized emergency response training for front desk and guest services staff focusing on guest communication and coordination.',
  60,
  'intermediate',
  'emergency_response',
  '{
    "modules": [
      {
        "title": "Front Desk Emergency Protocols",
        "content": "Learn specific responsibilities of front desk staff during fire emergencies including guest notification procedures, emergency contact protocols, and coordination with emergency services. Understand the front desk as the communication hub during emergencies.",
        "duration": 15
      },
      {
        "title": "Guest Communication and Assistance",
        "content": "Master techniques for calm, clear communication with panicked guests. Learn to provide instructions in multiple languages, assist guests with disabilities, and manage crowd control in lobby areas during evacuations.",
        "duration": 15
      },
      {
        "title": "Emergency Equipment Operation",
        "content": "Operate front desk emergency equipment including public address systems, emergency lighting controls, elevator recall systems, and communication devices. Practice using master keys for room access during emergencies.",
        "duration": 15
      },
      {
        "title": "Coordination with Emergency Services",
        "content": "Learn proper procedures for contacting and coordinating with fire department, EMS, and police. Understand how to provide accurate information about hotel layout, guest locations, and hazard conditions.",
        "duration": 15
      }
    ],
    "learning_objectives": [
      "Execute front desk emergency response protocols",
      "Communicate effectively with guests during emergencies",
      "Operate emergency communication systems",
      "Coordinate with emergency services",
      "Maintain guest safety records during incidents"
    ],
    "practical_exercises": [
      "Emergency communication scenario practice",
      "Guest assistance simulation",
      "Emergency services coordination drill"
    ]
  }',
  'https://images.unsplash.com/photo-1582719508461-905c673771fd'
),
(
  'Kitchen Fire Safety for Food Service Staff',
  'Advanced fire safety training for kitchen and food service personnel covering kitchen-specific hazards and suppression systems.',
  75,
  'advanced',
  'equipment',
  '{
    "modules": [
      {
        "title": "Kitchen Fire Hazards and Prevention",
        "content": "Identify kitchen-specific fire hazards including grease buildup, overheated cooking oil, faulty equipment, and improper storage. Learn daily cleaning protocols, equipment maintenance schedules, and safe cooking practices to prevent fires.",
        "duration": 20
      },
      {
        "title": "Grease Fire Management",
        "content": "Master techniques for handling grease fires safely including proper extinguisher selection (Class K), never using water on grease fires, and when to evacuate versus suppress. Practice turning off gas valves and electrical equipment.",
        "duration": 20
      },
      {
        "title": "Kitchen Suppression Systems",
        "content": "Operate kitchen hood suppression systems, understand automatic and manual activation procedures, and learn post-activation protocols. Study the importance of proper ventilation and exhaust system maintenance.",
        "duration": 20
      },
      {
        "title": "Emergency Shutdown Procedures",
        "content": "Learn rapid kitchen shutdown procedures including gas shut-offs, electrical disconnects, and ventilation controls. Practice coordinating kitchen evacuation while ensuring no personnel are left behind in storage areas or walk-in coolers.",
        "duration": 15
      }
    ],
    "learning_objectives": [
      "Prevent kitchen fires through proper safety practices",
      "Respond effectively to grease and cooking fires",
      "Operate kitchen fire suppression systems",
      "Execute emergency kitchen shutdown procedures",
      "Coordinate kitchen staff evacuation safely"
    ],
    "practical_exercises": [
      "Grease fire suppression drill",
      "Kitchen suppression system activation",
      "Emergency shutdown simulation",
      "Kitchen evacuation coordination"
    ]
  }',
  'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136'
);

-- Insert comprehensive quizzes for each course
INSERT INTO public.quizzes (module_id, title, questions) VALUES
(
  (SELECT id FROM training_modules WHERE title = 'Fire Safety Fundamentals for Hotel Staff'),
  'Fire Safety Fundamentals Assessment',
  '[
    {
      "id": 1,
      "question": "What is the most common cause of hotel fires?",
      "type": "multiple_choice",
      "options": [
        "Electrical equipment malfunctions",
        "Kitchen accidents",
        "Guest smoking",
        "Arson"
      ],
      "correct_answer": "Electrical equipment malfunctions",
      "explanation": "Electrical equipment malfunctions account for approximately 40% of hotel fires, making proper electrical safety critical."
    },
    {
      "id": 2,
      "question": "What does the RACE protocol stand for?",
      "type": "multiple_choice",
      "options": [
        "Rescue, Alarm, Contain, Evacuate",
        "Remove, Alert, Call, Exit",
        "Respond, Assess, Control, Escape",
        "React, Announce, Clear, Escape"
      ],
      "correct_answer": "Rescue, Alarm, Contain, Evacuate",
      "explanation": "RACE is the standard fire emergency response protocol used in most facilities."
    },
    {
      "id": 3,
      "question": "How often should smoke detectors be tested in guest rooms?",
      "type": "multiple_choice",
      "options": [
        "Weekly",
        "Monthly", 
        "Quarterly",
        "Annually"
      ],
      "correct_answer": "Monthly",
      "explanation": "Monthly testing ensures smoke detectors are functioning properly and helps identify maintenance needs early."
    },
    {
      "id": 4,
      "question": "Which areas should be checked daily for fire hazards?",
      "type": "multiple_choice",
      "options": [
        "Only guest rooms",
        "Only public areas",
        "Exit routes and electrical panels",
        "All areas including storage and mechanical rooms"
      ],
      "correct_answer": "All areas including storage and mechanical rooms",
      "explanation": "Comprehensive daily fire safety checks should cover all hotel areas as fires can start anywhere."
    },
    {
      "id": 5,
      "question": "What should you do if you discover a small fire?",
      "type": "multiple_choice", 
      "options": [
        "Immediately try to extinguish it",
        "Sound the alarm first, then assess if you can safely extinguish it",
        "Call the fire department and wait",
        "Evacuate immediately without taking action"
      ],
      "correct_answer": "Sound the alarm first, then assess if you can safely extinguish it",
      "explanation": "Always sound the alarm first to ensure others are alerted, then assess if the fire is small enough to safely extinguish."
    }
  ]'
),
(
  (SELECT id FROM training_modules WHERE title = 'Emergency Response for Front Desk Personnel'),
  'Front Desk Emergency Response Assessment',
  '[
    {
      "id": 1,
      "question": "As front desk staff, what is your first priority when a fire alarm sounds?",
      "type": "multiple_choice",
      "options": [
        "Call the fire department",
        "Verify the alarm and announce emergency procedures",
        "Start evacuating guests personally",
        "Secure the cash drawer"
      ],
      "correct_answer": "Verify the alarm and announce emergency procedures",
      "explanation": "Front desk staff should verify the alarm source and make appropriate announcements to guide guest response."
    },
    {
      "id": 2,
      "question": "When communicating with emergency services, what information should you provide first?",
      "type": "multiple_choice",
      "options": [
        "Number of guests in the hotel",
        "Hotel address and nature of emergency",
        "Your name and position",
        "Insurance information"
      ],
      "correct_answer": "Hotel address and nature of emergency",
      "explanation": "Emergency services need location and emergency type first to dispatch appropriate resources quickly."
    },
    {
      "id": 3,
      "question": "How should you assist guests who do not speak English during an evacuation?",
      "type": "multiple_choice",
      "options": [
        "Use gestures and point to exits",
        "Find another guest to translate",
        "Use simple English words only",
        "Use visual aids and demonstrate evacuation routes"
      ],
      "correct_answer": "Use visual aids and demonstrate evacuation routes",
      "explanation": "Visual communication and demonstration are most effective when language barriers exist during emergencies."
    },
    {
      "id": 4,
      "question": "What should you do with the guest registry during a fire emergency?",
      "type": "multiple_choice",
      "options": [
        "Leave it at the front desk",
        "Take it to the assembly point for accountability",
        "Email it to management",
        "Hide it for security"
      ],
      "correct_answer": "Take it to the assembly point for accountability",
      "explanation": "The guest registry is essential for emergency responders to account for all individuals in the building."
    },
    {
      "id": 5,
      "question": "When should elevators be used during a fire emergency?",
      "type": "multiple_choice",
      "options": [
        "Only for disabled guests",
        "Never, elevators should be recalled and secured",
        "Only by emergency personnel",
        "For fast evacuation of upper floors"
      ],
      "correct_answer": "Never, elevators should be recalled and secured",
      "explanation": "Elevators become unsafe during fires and should be recalled to the ground floor and taken out of service."
    }
  ]'
),
(
  (SELECT id FROM training_modules WHERE title = 'Kitchen Fire Safety for Food Service Staff'),
  'Kitchen Fire Safety Assessment',
  '[
    {
      "id": 1,
      "question": "What type of fire extinguisher should be used on grease fires?",
      "type": "multiple_choice",
      "options": [
        "Class A (Water)",
        "Class B (Foam)",
        "Class C (CO2)",
        "Class K (Wet Chemical)"
      ],
      "correct_answer": "Class K (Wet Chemical)",
      "explanation": "Class K extinguishers are specifically designed for cooking oil and grease fires in commercial kitchens."
    },
    {
      "id": 2,
      "question": "What should you NEVER do when dealing with a grease fire?",
      "type": "multiple_choice",
      "options": [
        "Turn off the heat source",
        "Use water to extinguish it",
        "Cover with a lid",
        "Use baking soda"
      ],
      "correct_answer": "Use water to extinguish it",
      "explanation": "Water on grease fires causes violent spattering and spreads the fire. Never use water on grease fires."
    },
    {
      "id": 3,
      "question": "How often should kitchen hood systems be cleaned?",
      "type": "multiple_choice",
      "options": [
        "Daily",
        "Weekly",
        "Monthly", 
        "According to manufacturer specifications and local codes"
      ],
      "correct_answer": "According to manufacturer specifications and local codes",
      "explanation": "Cleaning frequency depends on usage volume and local fire codes, typically ranging from monthly to quarterly."
    },
    {
      "id": 4,
      "question": "What is the proper procedure when the kitchen suppression system activates?",
      "type": "multiple_choice",
      "options": [
        "Immediately reset the system",
        "Continue cooking after the chemical settles",
        "Turn off gas/electricity and evacuate until system is inspected",
        "Clean up the chemicals immediately"
      ],
      "correct_answer": "Turn off gas/electricity and evacuate until system is inspected",
      "explanation": "After suppression system activation, utilities must be shut off and the area evacuated until professional inspection and cleaning."
    },
    {
      "id": 5,
      "question": "What temperature should cooking oil not exceed to prevent auto-ignition?",
      "type": "multiple_choice",
      "options": [
        "300°F (149°C)",
        "400°F (204°C)",
        "450°F (232°C)",
        "500°F (260°C)"
      ],
      "correct_answer": "450°F (232°C)",
      "explanation": "Most cooking oils have auto-ignition temperatures around 450°F, so maintaining lower temperatures prevents spontaneous combustion."
    }
  ]'
);