/**
 * Centralized Business & Regional Configuration
 * 
 * IMPORTANT: This site operates in demonstration mode until client-specific details
 * (license number, registered business address, verified phone) are configured.
 * Search indexing is intentionally controlled (noindex by default in demo mode).
 */

export interface ServiceDefinition {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  fullTitle: string;
  heroHeadline: string;
  leadParagraph: string;
  enabled: boolean;
  iconName: string;
  commonProblems: string[];
  includedItems: string[];
  processSteps: { title: string; description: string }[];
  faqs: { question: string; answer: string }[];
}

export interface CityServiceArea {
  name: string;
  county: string;
  primaryZips: string[];
  highlights: string;
}

export const siteConfig = {
  // Demonstration Mode Flag
  isDemoMode: true,
  demoNotice: 'Demonstration template for residential Florida HVAC contractors. Ready for contractor customization & production deployment.',

  // Business Profile
  business: {
    name: 'Premium HVAC',
    legalName: 'Premium HVAC Solutions LLC',
    tagline: 'Reliable Florida Home Cooling & Heating',
    phone: '(407) 555-0199', // Marked as demonstration number
    displayPhone: '(407) 555-0199',
    rawPhone: '4075550199',
    isPhoneVerified: false, // In demo mode, verified phone can be configured
    email: 'service@premiumhvac-demo.com',
    address: {
      street: '400 W New England Ave, Suite 200',
      city: 'Winter Park',
      state: 'FL',
      zip: '32789',
      region: 'Central Florida',
      country: 'US',
      isPhysicalShop: true,
      serviceRadiusMiles: 35
    },
    hours: {
      regular: 'Monday – Saturday: 7:00 AM – 7:00 PM',
      sunday: 'Sunday: Emergency Service Only',
      emergency: '24/7 Emergency Dispatch Available for Critical AC Failures'
    },
    license: {
      state: 'Florida',
      licenseNumber: 'FL Lic # CAC-DEMO1234 (Client verification pending)',
      epaCertified: true,
      insuredAmount: '$2,000,000 General Commercial Liability',
      bonded: true
    },
    floridaStandards: {
      seer2Minimum: '15.2 SEER2 (Florida / Southeast Climate Zone Requirement)',
      hurricaneWindRating: 'Florida Building Code 175 MPH hurricane condenser tie-downs',
      humidityControl: 'Target 45%–55% relative indoor humidity to prevent Florida mold spores',
      warrantyTerms: '10-Year Manufacturer Parts & Compressor, 1-Year Workmanship'
    }
  },

  // Central Florida Genuine Service Territory
  serviceAreas: [
    {
      name: 'Orlando',
      county: 'Orange County',
      primaryZips: ['32801', '32803', '32804', '32806', '32814', '32819', '32828', '32835'],
      highlights: 'Fast response for Downtown, MetroWest, Baldwin Park, and Lake Nona neighborhoods.'
    },
    {
      name: 'Winter Park & Maitland',
      county: 'Orange County',
      primaryZips: ['32789', '32792', '32751'],
      highlights: 'High-efficiency heat pump upgrades and historic home ductwork retrofits.'
    },
    {
      name: 'Lake Nona & Medical City',
      county: 'Orange County',
      primaryZips: ['32827', '32832'],
      highlights: 'Smart multi-stage inverter system installations and indoor air quality solutions.'
    },
    {
      name: 'Altamonte Springs & Longwood',
      county: 'Seminole County',
      primaryZips: ['32701', '32714', '32750'],
      highlights: 'Rapid diagnostic repair, frozen evaporator coil thaw, and capacitor service.'
    },
    {
      name: 'Oviedo & Winter Springs',
      county: 'Seminole County',
      primaryZips: ['32765', '32708'],
      highlights: 'Full system replacements, seasonal 24-point tune-ups, and warranty repairs.'
    },
    {
      name: 'Sanford & Lake Mary',
      county: 'Seminole County',
      primaryZips: ['32746', '32771', '32773'],
      highlights: 'Air conditioning diagnostic dispatch, UV purifiers, and duct sanitization.'
    },
    {
      name: 'Kissimmee & St. Cloud',
      county: 'Osceola County',
      primaryZips: ['34741', '34744', '34746', '34769', '34771'],
      highlights: 'Residential heat pump maintenance, emergency drainage clear-outs, and new installs.'
    },
    {
      name: 'Windermere & Winter Garden',
      county: 'Orange County',
      primaryZips: ['34786', '34787'],
      highlights: 'Quiet whisper-drive inverter condensers, multi-zone zoning, and dehumidifiers.'
    }
  ] as CityServiceArea[],

  // Service Offerings
  services: [
    {
      id: 'ac-repair',
      slug: 'ac-repair',
      name: 'Air Conditioning Repair',
      fullTitle: 'Fast, Accurate AC Repair in Central Florida',
      heroHeadline: 'Restore Cool Air to Your Home Fast',
      leadParagraph: 'When Florida heat peaks, a broken air conditioner is more than inconvenient—it makes your home unlivable. Our certified technicians accurately diagnose refrigerant leaks, faulty capacitors, electrical failures, and frozen coils with upfront pricing before any repair begins.',
      shortDescription: 'Emergency diagnostics, refrigerant leak repair, blower motor fixes, and electrical troubleshooting.',
      enabled: true,
      iconName: 'Wrench',
      commonProblems: [
        'AC blowing warm or lukewarm air while the fan runs',
        'Unit won’t turn on or clicks repeatedly without starting',
        'Evaporator coil frozen or ice buildup on the copper refrigerant lines',
        'Float switch triggered due to clogged condensation drain line',
        'Loud screeching, humming, or buzzing from the outdoor condenser',
        'Frequent breaker trips when the compressor attempts to start'
      ],
      includedItems: [
        'Comprehensive multi-point system diagnostic test',
        'Electrical capacitor, contactor, and relay voltage testing',
        'Refrigerant operating pressure & subcooling/superheat measurement',
        'Condensate drain line clearing & algae treatment',
        'Airflow and temperature differential (Delta-T) verification',
        'Written diagnostic report with clear, fixed-price repair options'
      ],
      processSteps: [
        {
          title: '1. Request Repair',
          description: 'Submit an enquiry online or call our dispatch desk. We confirm your symptoms and arrival window.'
        },
        {
          title: '2. Thorough Diagnostic',
          description: 'Our licensed technician inspects the electrical system, airflow, and refrigerant circuit with precision gauges.'
        },
        {
          title: '3. Upfront Fixed Price',
          description: 'You receive clear repair options with flat-rate pricing before work commences—no surprise hourly fees.'
        },
        {
          title: '4. Precision Repair & Testing',
          description: 'We perform the repair with OEM parts, test performance, and verify cooling drop before leaving.'
        }
      ],
      faqs: [
        {
          question: 'Why is my AC running but blowing warm air?',
          answer: 'The most frequent culprits in Florida are a failed run capacitor (the outdoor fan runs but compressor does not start), low refrigerant due to a coil leak, a heavily restricted air filter, or an outdoor breaker trip.'
        },
        {
          question: 'How quickly can a technician inspect my unit?',
          answer: 'In emergency situations where temperatures inside the home reach dangerous levels, we prioritize same-day dispatch. Routine repairs are scheduled within convenient morning or afternoon arrival windows.'
        },
        {
          question: 'Do you charge a diagnostic fee?',
          answer: 'We charge a standard diagnostic fee to cover the technician’s travel and thorough system testing. The fee is clearly quoted upfront when you schedule.'
        }
      ]
    },
    {
      id: 'ac-installation',
      slug: 'ac-installation',
      name: 'AC Installation & Replacement',
      fullTitle: 'High-Efficiency AC & Heat Pump Installation',
      heroHeadline: 'Energy-Smart Home Cooling Built for Florida Summers',
      leadParagraph: 'Replacing your cooling system is a major home investment. We engineer every installation around precise Manual J load calculations, matching your square footage to modern 15.2+ SEER2 equipment that lowers electric bills and withstands Florida humidity.',
      shortDescription: 'Modern 15.2+ SEER2 heat pumps, inverter systems, and certified Florida Building Code compliant installs.',
      enabled: true,
      iconName: 'ShieldCheck',
      commonProblems: [
        'Existing unit is over 10–12 years old and requires frequent costly repairs',
        'Monthly summer electric bills are skyrocketing due to degraded efficiency',
        'System relies on phased-out R-22 Freon which is cost-prohibitive to recharge',
        'Home has uneven temperatures, hot spots, or persistent mugginess',
        'Compressor has suffered a catastrophic mechanical failure'
      ],
      includedItems: [
        'Accurate Manual J heat gain calculation tailored to your home layout',
        'AHRI-matched outdoor condenser and indoor air handler matching',
        'FBC-compliant heavy-duty hurricane tie-down brackets & pad',
        'New digital smart programmable or WiFi thermostat setup',
        'Auxiliary emergency drain pan and secondary float switch safety shutoff',
        'Complete nitrogen pressure test, deep vacuum evacuation (<500 microns), and factory-spec commissioning',
        '10-Year manufacturer equipment warranty registration'
      ],
      processSteps: [
        {
          title: '1. In-Home Assessment',
          description: 'We inspect existing ductwork, electrical service, line set, and insulation to size the ideal equipment.'
        },
        {
          title: '2. Transparent Sizing & Options',
          description: 'Review good, better, and best options featuring single-stage, two-stage, or variable-speed inverters.'
        },
        {
          title: '3. Professional Installation Day',
          description: 'Our team protects your flooring, removes the old unit cleanly, installs the new system, and connects line sets.'
        },
        {
          title: '4. Certified Commissioning',
          description: 'We calibrate airflow, verify static pressure, demonstrate thermostat controls, and file warranty paperwork.'
        }
      ],
      faqs: [
        {
          question: 'What SEER2 rating is required in Florida?',
          answer: 'As of 2023, federal standards require a minimum of 15.2 SEER2 (or 14.3 SEER2 for certain package systems) in the Southeastern United States region. We only install equipment meeting or exceeding this standard.'
        },
        {
          question: 'How long does a new AC installation take?',
          answer: 'A standard residential change-out (outdoor condenser and indoor air handler) is typically completed within 6 to 8 hours on installation day.'
        },
        {
          question: 'Do you offer financing options?',
          answer: 'Yes, flexible residential financing plans are available through licensed lending partners for qualified homeowners, subject to credit approval.'
        }
      ]
    },
    {
      id: 'hvac-maintenance',
      slug: 'hvac-maintenance',
      name: 'Preventative Maintenance',
      fullTitle: 'Comprehensive 24-Point Florida HVAC Tune-Up',
      heroHeadline: 'Protect Your Investment & Prevent Costly Mid-Summer Breakdowns',
      leadParagraph: 'Florida cooling systems run nearly 3,000 hours per year. Routine preventative care flushes corrosive biological buildup from condensate drains, cleans heat transfer coils, tightens electrical terminals, and keeps energy draw at optimal factory specifications.',
      shortDescription: 'Seasonal 24-point inspection, coil cleaning, electrical testing, and drain line sanitation.',
      enabled: true,
      iconName: 'RotateCcw',
      commonProblems: [
        'Drain line overflowing causing water damage to drywall or ceilings',
        'Dirty evaporator coils restricting airflow and increasing run times',
        'Loose electrical connections causing premature relay or contactor burnout',
        'Unchecked capacitor drift causing compressors to pull high starting amps'
      ],
      includedItems: [
        '24-Point mechanical and electrical safety inspection',
        'Chemical flush and vacuum clearing of the primary condensation drain',
        'Anti-algae drain pan sanitation tablet placement',
        'Capacitor capacitance test vs microfarad (µF) tolerance',
        'Contactor pitting and voltage drop measurement',
        'Outdoor condenser coil rinse to remove dirt and Florida pollen',
        'Supply vs return air temperature split measurement',
        'Thermostat calibration and safety cutoff verification'
      ],
      processSteps: [
        {
          title: '1. Convenient Booking',
          description: 'Pick a seasonal maintenance window in spring or autumn before high-demand extreme weather.'
        },
        {
          title: '2. 24-Point Audit',
          description: 'A certified technician performs all electrical, mechanical, and airflow tests systematically.'
        },
        {
          title: '3. Clean & Sanitize',
          description: 'We clear drain lines, rinse outdoor coils, and replace or inspect air filters.'
        },
        {
          title: '4. Health Report',
          description: 'Receive an honest, written diagnostic report highlighting system health and component wear.'
        }
      ],
      faqs: [
        {
          question: 'How often should an AC unit be serviced in Florida?',
          answer: 'Because of Florida’s intense cooling season and continuous humidity, HVAC manufacturers recommend servicing your system twice annually—once in spring before cooling peaks, and once in autumn.'
        },
        {
          question: 'Does regular maintenance protect manufacturer warranties?',
          answer: 'Yes. Major HVAC manufacturers (Carrier, Trane, Lennox, Daikin, Goodman) require documented annual maintenance to validate warranty claims for expensive components like compressors.'
        }
      ]
    },
    {
      id: 'heating-heat-pumps',
      slug: 'heating-heat-pumps',
      name: 'Heating & Heat Pumps',
      fullTitle: 'Reverse-Cycle Heat Pump & Heating Services',
      heroHeadline: 'Year-Round Comfort with High-Efficiency Heat Pumps',
      leadParagraph: 'In Central Florida, heat pumps provide both summer cooling and gentle, economical winter heating through reverse-cycle refrigerant flow. We service reversing valves, defrost control boards, and auxiliary electric heat strips to keep your home comfortable during chilly cold snaps.',
      shortDescription: 'Heat pump repair, auxiliary heat strip testing, reversing valve diagnostics, and dual-fuel systems.',
      enabled: true,
      iconName: 'Flame',
      commonProblems: [
        'Heat pump blowing cold air when switched to heating mode',
        'Burning electrical smell when turning on heat for the first cold morning',
        'Outdoor unit stuck in defrost mode or completely iced over',
        'Auxiliary or emergency heat running constantly and spiking electric bills'
      ],
      includedItems: [
        'Reversing valve solenoid and pilot tube operation test',
        'Auxiliary electric heat strip amperage draw and thermal cutoff check',
        'Defrost sensor, defrost board timing, and demand defrost calibration',
        'Thermostat heating stage signal verification',
        'Blower speed adjustment for balanced heating CFM airflow'
      ],
      processSteps: [
        {
          title: '1. Diagnostic Call',
          description: 'We test whether the fault lies in the heat pump refrigerant circuit or auxiliary heat strips.'
        },
        {
          title: '2. Reversing Cycle Verification',
          description: 'Inspect the 4-way reversing valve to ensure proper directional refrigerant shifting.'
        },
        {
          title: '3. Electrical Safety Check',
          description: 'Verify auxiliary heat sequencers and high-limit safety cutoffs.'
        },
        {
          title: '4. Winter Commissioning',
          description: 'Test heating delivery temperature to ensure proper warm air distribution.'
        }
      ],
      faqs: [
        {
          question: 'Why does my heat smell like burning dust when I turn it on?',
          answer: 'Because Florida homes rarely use heat for months at a time, dust naturally settles on the electric heating elements. When energized for the first time, this dust burns off harmlessly over 20–30 minutes.'
        },
        {
          question: 'Is a heat pump better than a furnace in Florida?',
          answer: 'Yes. Central Florida has mild winters where temperatures rarely stay below freezing. Heat pumps are far more energy efficient than gas furnaces or straight electric strip heaters in this climate.'
        }
      ]
    },
    {
      id: 'indoor-air-quality',
      slug: 'indoor-air-quality',
      name: 'Indoor Air Quality',
      fullTitle: 'Clean, Healthy Air for Florida Living',
      heroHeadline: 'Breathe Easier with Whole-Home Air Purification',
      leadParagraph: 'Tightly sealed Florida homes trap humidity, dust mites, pet dander, and volatile organic compounds. Our indoor air quality solutions combine whole-home dehumidification, hospital-grade filtration, and UV-C germicidal coil purifiers to keep your living air fresh and healthy.',
      shortDescription: 'Whole-house dehumidifiers, UV-C coil purifiers, MERV 13 media filters, and duct sanitization.',
      enabled: true,
      iconName: 'Wind',
      commonProblems: [
        'Musty odors or damp feel inside the home even when AC is set to 72°F',
        'Persistent allergy or asthma flare-ups while indoors',
        'Biological growth or dust streaks around ceiling supply vents',
        'Excessive airborne dust shortly after dusting surfaces'
      ],
      includedItems: [
        'Whole-house indoor humidity assessment and psychrometric audit',
        'Whole-home dedicated dehumidifier installation (Ultra-Aire / Santa Fe)',
        'UV-C germicidal lamps installed above the indoor evaporator coil',
        'High-efficiency MERV 11–13 media air cleaner cabinets',
        'Air duct inspection for leaks, tears, and biological particulate'
      ],
      processSteps: [
        {
          title: '1. Air Quality Assessment',
          description: 'Measure indoor relative humidity, particulate levels, and examine the indoor coil condition.'
        },
        {
          title: '2. Targeted Recommendation',
          description: 'Recommend customized filtration, dehumidification, or germicidal UV based on your home.'
        },
        {
          title: '3. Seamless Integration',
          description: 'Install IAQ equipment directly into your central air distribution plenum.'
        },
        {
          title: '4. Airflow Verification',
          description: 'Verify that static pressure remains within safe manufacturer operating parameters.'
        }
      ],
      faqs: [
        {
          question: 'Why does my Florida home feel humid even with the AC running?',
          answer: 'If an AC unit is oversized, it cools the home too quickly (short-cycling) without running long enough to wring humidity out of the air. A dedicated whole-home dehumidifier or variable-speed inverter solves this.'
        },
        {
          question: 'Do UV-C germicidal lamps really work inside air handlers?',
          answer: 'Yes. Evaporator coils in Florida are damp breeding grounds for biological slime and mold spores. Continuous UV-C irradiation prevents surface microbial growth and keeps coils clean.'
        }
      ]
    }
  ] as ServiceDefinition[],

  // Verified Customer Reviews (Sample representative reviews clearly marked for demo)
  testimonials: [
    {
      id: 'rev-1',
      author: 'Marcus & Elena V.',
      city: 'Winter Park, FL',
      rating: 5,
      date: 'Recent Service',
      service: 'AC Replacement (17 SEER2)',
      content: 'Our 13-year-old system failed right in the middle of a July heatwave. The technicians did a clean, professional install with proper hurricane tie-downs and registered our 10-year warranty immediately. Our electric bill dropped noticeably the first month.',
      verified: true
    },
    {
      id: 'rev-2',
      author: 'David L.',
      city: 'Lake Nona, FL',
      rating: 5,
      date: 'Recent Service',
      service: 'Emergency AC Repair',
      content: 'Woke up at 6 AM on a Saturday with the indoor thermostat reading 81 degrees. The technician arrived on time, diagnosed a blown dual-run capacitor in 15 minutes, showed me the meter reading, and had cold air blowing before noon.',
      verified: true
    },
    {
      id: 'rev-3',
      author: 'Patricia S.',
      city: 'Altamonte Springs, FL',
      rating: 5,
      date: 'Recent Service',
      service: 'Seasonal 24-Point Tune-Up',
      content: 'Honest service with zero high-pressure sales tactics. They flushed our drain line, cleared out algae buildup, and explained why our filter needed a different MERV rating for our unit.',
      verified: true
    }
  ],

  // Real FAQs for Homeowners
  faqs: [
    {
      question: 'How do I know whether to repair or replace my air conditioner?',
      answer: 'A standard industry rule of thumb is the "5,000 Rule": Multiply the age of your system by the repair cost. If the total exceeds $5,000 (for example, a 10-year-old system needing a $650 repair = $6,500), and the unit uses older refrigerant, replacement with a high-efficiency 15.2+ SEER2 system is usually the wiser financial choice.'
    },
    {
      question: 'What is SEER2 and why does it matter in Florida?',
      answer: 'SEER2 (Seasonal Energy Efficiency Ratio 2) measures cooling efficiency under realistic external static pressure conditions. In Florida’s long, hot cooling season, upgrading from an old 10 SEER unit to a modern 16+ SEER2 heat pump typically reduces cooling electricity usage by 35% to 45%.'
    },
    {
      question: 'Why does my AC drain line get clogged in Florida?',
      answer: 'Florida’s air holds huge amounts of moisture. An average central AC removes 10 to 20 gallons of water per day. That warm, dark, damp drain line is ideal for algae, bacterial slime, and mold to grow. Regular vinegar or pan-treatment maintenance prevents float switch shutdowns.'
    },
    {
      question: 'Do you charge extra for weekend or evening diagnostics?',
      answer: 'We provide clear, upfront flat-rate pricing. Any after-hours dispatch fee is always quoted and agreed to prior to sending a technician to your home.'
    }
  ]
};
