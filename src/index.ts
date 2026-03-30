import { type Core } from '@strapi/strapi';

export default {
  register(/* { strapi }: { strapi: Core.Strapi } */) { },

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    strapi.log.info('Bootstrap: Starting seeding...');

    // Helper to seed single types
    const seedSingleType = async (uid: string, data: any) => {
      strapi.log.info(`Bootstrap: Checking ${uid}...`);
      try {
        const existing = await strapi.documents(uid as any).findMany();
        if (existing.length === 0) {
          strapi.log.info(`Bootstrap: Seeding ${uid}...`);
          const created = await strapi.documents(uid as any).create({
            data,
            status: 'published' as any
          });
          strapi.log.info(`Bootstrap: ${uid} seeded and published (ID: ${created.id}).`);
        } else {
          strapi.log.info(`Bootstrap: ${uid} already exists. Updating with seed data...`);
          const docId = existing[0].documentId;
          await strapi.documents(uid as any).update({
            documentId: docId,
            data,
            status: 'published' as any
          });
          strapi.log.info(`Bootstrap: ${uid} updated and published.`);
        }
      } catch (err) {
        strapi.log.error(`Bootstrap: Failed to seed/update ${uid}: ${err.message}`);
      }
    };

    // Seed Technology Page
    await seedSingleType('api::technology-page.technology-page', {
      tag_pill: "Technology Stack",
      title: "AI-First Architecture for Animal Health Intelligence",
      description: "Mattera follows a layered technical architecture where wearable devices, structured data pipelines, and predictive AI models converge into a unified intelligence platform.",
      architecture_steps: [
        { step: "01", label: "Wearable Devices", sub: "Sensor data capture", color: "#4FD1C5" },
        { step: "02", label: "Signal Processing", sub: "Noise filtration & normalization", color: "#6ac8c2" },
        { step: "03", label: "Data Pipeline", sub: "Event ingestion & enrichment", color: "#8FA7FF" },
        { step: "04", label: "AI Models", sub: "Anomaly detection & scoring", color: "#7a9aff" },
        { step: "05", label: "Insights Engine", sub: "Risk index computation", color: "#4FD1C5" },
        { step: "06", label: "PawOS Applications", sub: "Veterinary & owner interfaces", color: "#8FA7FF" },
      ],
      tech_layers: [
        {
          id: "ai",
          tag: "AI",
          title: "AI Intelligence Layer",
          color: "#4FD1C5",
          desc: "The core reasoning engine of the Mattera platform. Machine learning models trained on longitudinal animal health datasets to detect anomalies, score health trajectories, and generate predictive risk indicators.",
          items: [
            { label: "Behavioral Anomaly Detection", detail: "Identifies deviations from established breed-level behavioral baselines using unsupervised anomaly scoring models." },
            { label: "Risk Scoring Models", detail: "Probabilistic risk indices computed from multi-signal health data, updated continuously as new observations arrive." },
            { label: "Longitudinal Health Modeling", detail: "Temporal modeling of health trajectories to track gradual decline or improvement patterns across months and years." },
            { label: "Breed-Species Stratification", detail: "Individual baseline normalization across breed, age, weight, and activity profiles to eliminate false positive detection." },
          ],
        },
        {
          id: "data",
          tag: "Data",
          title: "Data Infrastructure Layer",
          color: "#8FA7FF",
          desc: "A cloud-native, API-first data platform engineered for high-frequency health event ingestion, normalization, and longitudinal storage. Designed to accumulate structured intelligence over time.",
          items: [
            { label: "Structured Event Pipelines", detail: "Real-time ingestion of behavioral and physiological events with automated schema normalization and validation." },
            { label: "Health Data Normalization", detail: "Standardized health event taxonomy ensuring cross-species, cross-device data comparability." },
            { label: "Multi-Signal Fusion", detail: "Integration layer combining behavioral, environmental, and physiological signal streams into unified health records." },
            { label: "Longitudinal Storage", detail: "Time-series data architecture optimized for health trajectory queries across months and years of accumulated records." },
          ],
        },
        {
          id: "hardware",
          tag: "Hardware",
          title: "Wearable Hardware Systems",
          color: "#4FD1C5",
          desc: "Mattera is developing a low-power wearable device layer enabling passive, continuous health signal capture from animals across species. Designed for long-term deployment in field and livestock environments.",
          items: [
            { label: "Activity & Movement Capture", detail: "High-frequency accelerometer and gyroscope data for activity variability, gait, and movement symmetry analysis." },
            { label: "Physiological Signal Sensors", detail: "Future roadmap includes heart rate variability, respiration variability, and temperature deviation monitoring." },
            { label: "Edge Inference Models", detail: "On-device ML inference for real-time anomaly flagging without continuous cloud dependency." },
            { label: "Low-Power Firmware", detail: "Energy-efficient embedded systems designed for extended field deployment with minimal maintenance cycles." },
          ],
        },
      ]
    });

    // Seed Company Page
    await seedSingleType('api::company-page.company-page', {
      tag_pill: "About",
      title: "Building the Missing Intelligence Infrastructure for Animals",
      description: "Mattera Life Systems Private Limited is a research and technology company based in India with operations in the United States — engineering predictive health intelligence infrastructure for animals across species and environments.",
      mission: { title: "Mission", h2: "Build Predictive Health Intelligence Infrastructure for Animals", desc: "To develop the foundational AI infrastructure layer that enables continuous health monitoring, early disease detection, and predictive health modeling across all animal species and environments — closing the gap between observation and intelligence in animal healthcare." },
      vision: { title: "Vision", h2: "Continuous Health Monitoring Infrastructure for All Animals", desc: "A world where animal health is monitored continuously, diseases are identified before symptoms appear, and every veterinary decision is supported by structured longitudinal intelligence — regardless of species, region, or economic context." },
      profile_rows: [
        { label: "Entity Type", value: "Private Limited Company" },
        { label: "Jurisdiction", value: "India (with US Operations)" },
        { label: "Domain", value: "matteralifesystems.com" },
        { label: "Product Platform", value: "pawos.app" },
        { label: "Contact", value: "contact@matteralifesystems.com" },
        { label: "Stage", value: "Early-Stage Deep-Tech / Research" },
      ],
      values: [
        { title: "Infrastructure-First Thinking", desc: "We build foundational platforms, not point solutions. Every decision prioritizes long-term data accumulation and structural defensibility.", color: "#4FD1C5" },
        { title: "Research-Driven Development", desc: "Product decisions are grounded in scientific methodology, validated datasets, and peer-reviewed animal health research.", color: "#8FA7FF" },
        { title: "Multi-Species Scope", desc: "Our infrastructure is designed to scale across companion animals, working animals, and livestock — not limited to a single segment.", color: "#4FD1C5" },
        { title: "Cross-Domain Synthesis", desc: "We integrate AI, veterinary science, behavioral analytics, and embedded hardware — requiring deep expertise across domains.", color: "#8FA7FF" },
      ],
      locations: [
        {
          location: "Hyderabad, India",
          role: "Research, Engineering & Product Development Hub",
          color: "#4FD1C5",
          details: ["Core engineering team", "AI & data science research", "PawOS product development", "Hardware R&D coordination"],
        },
        {
          location: "United States",
          role: "Strategic Operations & Global Expansion",
          color: "#8FA7FF",
          details: ["Strategic partnerships", "Investor relations", "Global research collaborations", "International expansion base"],
        },
      ]
    });

    // Seed Applications Page
    await seedSingleType('api::applications-page.applications-page', {
      tag_pill: "Applications",
      title: "Cross-Segment Real-World Applications",
      description: "Mattera's intelligence infrastructure serves four distinct segments — delivering precision health monitoring across companion animals, veterinary clinics, livestock operations, and performance animals.",
      applications: [
        {
          id: "companion",
          tag: "Companion Animals",
          color: "#4FD1C5",
          headline: "Preventive Health Monitoring for Companion Animals",
          desc: "PawOS provides companion animal owners with a structured, longitudinal health intelligence layer — moving beyond reactive veterinary visits toward continuous, data-driven preventive care.",
          features: [
            { title: "Behavioral Awareness Scoring", detail: "Continuous analysis of activity patterns, sleep cycles, and behavioral deviations to identify early health changes." },
            { title: "Preventive Health Monitoring", detail: "Long-term health trajectory modeling with automated alerts for anomalies before symptoms appear." },
            { title: "Structured Longitudinal Records", detail: "Breed-normalized health records accumulated over time, providing rich context for veterinary consultations." },
            { title: "Diet & Activity Mapping", detail: "Structured logging and analysis of diet, activity, and environmental exposure correlated with health outcomes." },
          ],
        },
        {
          id: "veterinary",
          tag: "Veterinary Clinics",
          color: "#8FA7FF",
          headline: "Clinical Intelligence for Veterinary Professionals",
          desc: "Mattera enables veterinary clinics to access structured, longitudinal patient health data — enabling evidence-based decision support, early risk detection, and improved patient outcomes.",
          features: [
            { title: "Structured Patient History", detail: "Comprehensive longitudinal health records replacing fragmented, paper-based veterinary records." },
            { title: "Early Risk Alert Systems", detail: "Proactive notifications when patient health indicators approach anomaly thresholds requiring clinical attention." },
            { title: "Remote Monitoring Insights", detail: "Continuous patient health monitoring between clinic visits via PawOS behavior and wearable data streams." },
            { title: "Evidence-Based Decision Support", detail: "Population-level breed and species health baselines providing clinical reference context for individual patients." },
          ],
        },
        {
          id: "livestock",
          tag: "Livestock Operations",
          color: "#4FD1C5",
          headline: "Population-Scale Health Analytics for Livestock",
          desc: "For commercial livestock operators, Mattera provides population-scale behavioral monitoring enabling early strain detection, welfare analytics, and productivity health optimization.",
          features: [
            { title: "Strain & Overexertion Detection", detail: "Activity deviation scoring identifies early signs of physical overload and fatigue in working animal populations." },
            { title: "Productivity Health Scoring", detail: "Correlated health-productivity analytics enabling optimized work scheduling and welfare-driven management." },
            { title: "Welfare Analytics Dashboards", detail: "Population-level behavioral monitoring dashboards providing fleet-scale health oversight for large livestock operations." },
            { title: "Disease Outbreak Early Warning", detail: "Anomaly propagation detection across population behavioral patterns indicating emerging infectious or environmental health risks." },
          ],
        },
        {
          id: "performance",
          tag: "Performance Animals",
          color: "#8FA7FF",
          headline: "Precision Diagnostics for Performance & Equine Animals",
          desc: "High-value performance animals demand precision health monitoring. Mattera's gait analysis, movement symmetry modeling, and injury prevention systems serve equine athletes and performance animals.",
          features: [
            { title: "Gait Asymmetry Detection", detail: "Accelerometer-based analysis of step symmetry and movement phase deviation for early lameness identification." },
            { title: "Injury Prevention Modeling", detail: "Predictive risk scoring based on movement pattern deviation before catastrophic musculoskeletal injury occurs." },
            { title: "Performance Optimization", detail: "Health-performance correlation analytics enabling evidence-based training and recovery scheduling." },
            { title: "Orthopedic Early Detection", detail: "Longitudinal movement signature tracking to identify subtle deterioration in joint and limb function." },
          ],
        },
      ]
    });

    // Seed Platform Page
    await seedSingleType('api::platform-page.platform-page', {
      tag_pill: "Platform",
      title: "Integrated Animal Health Intelligence Platform",
      description: "Mattera's platform layer bridges software intelligence, wearable hardware, and predictive AI models into a unified, continuously learning ecosystem.",
      pawos_features: ["Breed-specific baseline modeling", "Longitudinal health scoring", "Behavioral anomaly detection", "Structured diet & activity mapping", "Preventive health alerts", "Environmental health context"],
      signals: ["Activity Variability", "Rest Cycle Patterns", "Movement Symmetry", "Stress Behavior Indicators", "Temperature Deviation", "Environmental Exposure"],
      future_hardware: ["Heart Rate Variability", "Respiration Variability", "Gait Anomaly Detection"],
      engine_cards: [
        { title: "Cloud-Native Backend", desc: "Encrypted, scalable data pipelines with offline-first synchronization and API-first ecosystem design.", color: "#4FD1C5" },
        { title: "Multi-Signal Fusion", desc: "Behavioral, environmental, and physiological signal integration into unified health records with adaptive calibration.", color: "#8FA7FF" },
        { title: "Longitudinal Intelligence", desc: "Temporal health trajectory modeling accumulating insight over months and years of continuous observation.", color: "#4FD1C5" },
        { title: "Role-Based Access", desc: "Structured event logging with role-based data access controls for owners, veterinarians, and researchers.", color: "#8FA7FF" },
        { title: "Federated Learning", desc: "Future architecture enabling privacy-preserving distributed model training across large animal populations.", color: "#4FD1C5" },
        { title: "Veterinary API Layer", desc: "Planned integrations with veterinary clinic management systems and electronic health record platforms.", color: "#8FA7FF" },
      ]
    });

    // Seed Research Page
    await seedSingleType('api::research-page.research-page', {
      tag_pill: "Mattera Animal Intelligence Lab",
      title: "Structured Research in Veterinary Predictive Intelligence",
      description: "Mattera operates a structured research architecture spanning four major scientific pillars — generating the longitudinal datasets and validated models that power the intelligence platform.",
      research_areas: [
        {
          id: "behavioral",
          tag: "Behavioral",
          color: "#4FD1C5",
          title: "Behavioral Baseline Modeling",
          objective: "Develop statistical behavioral baselines across breeds and species.",
          methodology: ["Longitudinal behavioral observation datasets", "Breed stratification models", "Activity variance analysis", "Anomaly threshold detection algorithms"],
          applications: ["Early arthritis indicators", "Cognitive decline detection", "Chronic stress identification"],
        },
        {
          id: "predictive",
          tag: "Predictive",
          color: "#8FA7FF",
          title: "Predictive Disease Modeling",
          objective: "Develop probabilistic models identifying early disease indicators before visible symptoms appear.",
          methodology: ["Breed-disease correlation mapping", "Multi-signal risk modeling", "Longitudinal trajectory analysis", "Early deviation scoring frameworks"],
          applications: ["Pre-symptomatic disease detection", "Risk stratification by breed", "Veterinary early alert systems"],
        },
        {
          id: "signal",
          tag: "Signal Fusion",
          color: "#4FD1C5",
          title: "Signal Fusion Algorithms",
          objective: "Integrate behavioral, environmental, and physiological signals into unified health intelligence scores.",
          methodology: ["Sensor noise filtration pipelines", "Multi-signal weighting frameworks", "Adaptive baseline calibration", "Anomaly confidence scoring"],
          applications: ["Unified health score computation", "Cross-sensor validation", "Environmental health context modeling"],
        },
        {
          id: "wearable",
          tag: "Hardware",
          color: "#8FA7FF",
          title: "Wearable Hardware Systems",
          objective: "Develop low-power wearable devices for long-term passive animal monitoring.",
          methodology: ["Sensor calibration models", "Edge computing inference pipelines", "Energy-efficient firmware design", "Secure device communication protocols"],
          applications: ["Field livestock deployment", "Performance animal monitoring", "Companion animal health tracking"],
        },
      ],
      studies: [
        { id: "01", title: "Activity Variability Monitoring in Working Buffaloes", tag: "Livestock", color: "#4FD1C5", duration: "120-day study", methodology: ["Movement intensity scoring", "Rest cycle variance analysis", "Strain threshold modeling"], outcomes: ["Early overexertion detection", "Improved livestock welfare metrics", "Productivity health analytics"] },
        { id: "02", title: "Gait Asymmetry Detection in Performance Horses", tag: "Equine", color: "#8FA7FF", duration: "Ongoing", methodology: ["Accelerometer-based gait analysis", "Step symmetry modeling", "Movement phase deviation scoring"], outcomes: ["Early orthopedic detection", "Injury prevention modeling", "Performance optimization insights"] },
        { id: "03", title: "Behavioral Stress Index — Companion Dogs", tag: "Companion", color: "#4FD1C5", duration: "Longitudinal", methodology: ["Sleep variability analysis", "Activity imbalance scoring", "Owner behavioral tagging integration", "Anomaly clustering algorithms"], outcomes: ["Early anxiety disorder detection", "Behavioral health trending", "Owner-reported signal validation"] },
      ],
      methodology_items: [
        { label: "Longitudinal Observation", color: "#4FD1C5" },
        { label: "Signal Fusion Modeling", color: "#8FA7FF" },
        { label: "Statistical Anomaly Detection", color: "#4FD1C5" },
        { label: "ML Risk Scoring", color: "#8FA7FF" },
        { label: "Breed Stratification", color: "#4FD1C5" },
        { label: "Multi-Signal Validation", color: "#8FA7FF" },
      ]
    });

    // Seed Investors Page
    await seedSingleType('api::investors-page.investors-page', {
      tag_pill: "Investor Overview",
      title: "Venture-Scale Infrastructure for Animal Health Intelligence",
      description: "Mattera is building the foundational AI infrastructure layer for animal health analytics — a category-defining platform with structural defensibility across data, algorithms, and hardware integration.",
      market_stats: [
        { value: "$50B+", label: "Global Animal Healthcare Market" },
        { value: "3 Moats", label: "Data · Algorithmic · Hardware" },
        { value: "India + US", label: "Dual-Market Operations" },
      ],
      market_drivers: ["Pet humanization driving premium health spend", "Rising veterinary expenditure globally", "Precision livestock farming expansion", "Increased demand for smart monitoring devices", "Regulatory push toward animal welfare standards", "Predictive systems largely absent from market"],
      moats: [
        { title: "Data Moat", color: "#4FD1C5", desc: "Longitudinal animal health datasets combining behavioral signals, environmental exposure, and physiological indicators — creating proprietary datasets difficult for competitors to replicate.", items: ["Behavioral signal archives", "Cross-species longitudinal records", "Environmental health context data", "Breed-stratified health baselines"] },
        { title: "Algorithmic Moat", color: "#8FA7FF", desc: "Purpose-built algorithms for behavioral anomaly detection, multi-signal health scoring, and breed-specific baseline modeling that improve continuously as data accumulates.", items: ["Behavioral anomaly detection models", "Multi-signal health scoring", "Breed-specific baseline algorithms", "Predictive risk indices"] },
        { title: "Hardware Integration", color: "#4FD1C5", desc: "Integration between proprietary wearable devices and the PawOS intelligence platform creates a vertically integrated ecosystem that generates compounding data network effects.", items: ["Proprietary sensor hardware", "Direct PawOS integration", "Edge inference models", "Low-power field deployment"] },
        { title: "Ecosystem Lock-In", color: "#8FA7FF", desc: "Over time PawOS becomes the data layer connecting owners, veterinarians, livestock operators, and researchers — switching costs increase as longitudinal data accumulates.", items: ["Owner longitudinal records", "Veterinary clinical integrations", "Livestock operator workflows", "Research institution partnerships"] },
      ],
      trl_levels: [
        { level: "TRL 3", label: "Concept Validation", desc: "Algorithm research and theoretical validation", status: "achieved", pct: 100 },
        { level: "TRL 4", label: "Software Prototype", desc: "PawOS prototype platform operational", status: "achieved", pct: 100 },
        { level: "TRL 5", label: "Integrated Wearable", desc: "Hardware-software integration prototype", status: "target", pct: 45 },
        { level: "TRL 6", label: "Pilot Deployments", desc: "Research environment pilot programs", status: "future", pct: 10 },
      ],
      ip_roadmap: ["Behavioral health scoring models", "Animal activity anomaly detection", "Wearable sensor calibration algorithms", "Predictive veterinary risk indexing", "Multi-signal fusion methodologies", "Edge inference for animal monitoring"],
      growth_steps: [
        { phase: "Phase 1", title: "Software Intelligence Layer", desc: "PawOS platform accumulates longitudinal data at scale", color: "#4FD1C5" },
        { phase: "Phase 2", title: "Wearable Integration", desc: "Proprietary hardware expands passive signal capture", color: "#8FA7FF" },
        { phase: "Phase 3", title: "Predictive AI Models", desc: "Population-scale ML models with competitive moat", color: "#4FD1C5" },
        { phase: "Phase 4", title: "Global Research Network", desc: "International collaborations and data partnerships", color: "#8FA7FF" },
      ]
    });

    // Seed Contact Page
    await seedSingleType('api::contact-page.contact-page', {
      tag_pill: "Contact",
      title: "Connect with Mattera Life Systems",
      description: "We welcome enquiries from investors, research institutions, veterinary partners, and hardware development teams.",
      enquiry_areas: [
        { label: "Research Collaborations", desc: "Academic and institutional R&D partnerships" },
        { label: "Veterinary Partnerships", desc: "Clinical pilot programs and data validation" },
        { label: "Hardware Development", desc: "Sensor and IoT co-development" },
        { label: "Investment Discussions", desc: "Venture and strategic investment enquiries" },
      ],
      locations: [
        { city: "Hyderabad, India", role: "Research & Engineering", color: "#4FD1C5" },
        { city: "United States", role: "Strategic Operations", color: "#8FA7FF" },
      ]
    });

    // Seed Research Collaboration Page
    await seedSingleType('api::research-collaboration-page.research-collaboration-page', {
      tag_pill: "Grants & Collaborations",
      title: "Research Partnerships & Grant Programs",
      description: "Mattera Life Systems actively seeks research collaborations with veterinary institutions, agricultural universities, and AI research labs — and is eligible for and pursuing grant funding across AI, veterinary science, and precision agriculture domains.",
      partner_categories: [
        { title: "Veterinary Academic Institutions", desc: "Collaboration with veterinary schools on clinical validation studies, behavioral dataset development, and research methodology peer review.", color: "#4FD1C5" },
        { title: "Agricultural Universities", desc: "Research partnerships on livestock health monitoring, precision farming analytics, and population-scale animal behavioral studies.", color: "#8FA7FF" },
        { title: "AI & Robotics Research Labs", desc: "Technical collaborations on sensor fusion algorithms, edge inference models, and machine learning methodologies for animal health data.", color: "#4FD1C5" },
        { title: "Veterinary Clinics", desc: "Clinical pilot programs to validate PawOS health scoring models with real-world patient data and professional veterinary feedback.", color: "#8FA7FF" },
      ],
      grant_areas: [
        { title: "AI for Animal Health", desc: "Research grants advancing AI applications in veterinary diagnostics and disease prevention.", tag: "AI / Veterinary" },
        { title: "Precision Livestock Farming", desc: "Agricultural innovation grants for technology-driven livestock health and productivity monitoring.", tag: "Agriculture" },
        { title: "Animal Behavioral Research", desc: "Behavioral science grants funding longitudinal observation and anomaly detection methodology development.", tag: "Behavioral Science" },
        { title: "Wearable Health Devices", desc: "Hardware R&D grants for low-power wearable sensor development targeting animal health applications.", tag: "Hardware / IoT" },
      ],
      trl_framework: [
        { level: "TRL 3", label: "Concept Validation & Algorithm Research", achieved: true, color: "#4FD1C5", pct: 100 },
        { level: "TRL 4", label: "Software Prototype — PawOS Platform", achieved: true, color: "#4FD1C5", pct: 100 },
        { level: "TRL 5", label: "Integrated Wearable Prototype (Target)", achieved: false, color: "#8FA7FF", pct: 40 },
        { level: "TRL 6", label: "Pilot Deployments in Research Environments (Future)", achieved: false, color: "var(--text-muted)", pct: 5 },
      ],
      validation_pathways: [
        { title: "Veterinary Academic Partnerships", desc: "Controlled validation studies with veterinary institutions." },
        { title: "Behavioral Dataset Validation", desc: "Statistical validation of anomaly detection accuracy." },
        { title: "Wearable Pilot Deployments", desc: "Signal reliability and calibration testing in real environments." },
        { title: "Anomaly Detection Accuracy", desc: "Precision metrics across breed and species groups." },
        { title: "Early Detection Precision", desc: "Evaluation metrics for pre-symptomatic indicator accuracy." },
        { title: "Signal Reliability Studies", desc: "Cross-device, cross-environment sensor validation." },
      ]
    });

    // Seed Navigation
    await seedSingleType('api::navigation.navigation', {
      logo_text_top: "Mattera",
      logo_text_bottom: "Life Systems",
      nav_links: [
        { label: "Home", href: "/" },
        { label: "Technology", href: "/technology" },
        { label: "Research", href: "/research" },
        { label: "Platform", href: "/platform" },
        { label: "Applications", href: "/applications" },
        { label: "Investors", href: "/investors" },
        { label: "Grants", href: "/research-collaboration" },
        { label: "Company", href: "/company" },
        { label: "Contact", href: "/contact" },
      ],
      cta_text: "Access PawOS",
      cta_href: "https://pawos.app",
      notification: {
        enabled: false,
        text: "New Update Available",
        color: "#4FD1C5"
      },
      footer_columns: [
        {
          title: "Technology",
          links: [
            { label: "AI Layer", href: "/technology#ai" },
            { label: "Data Infrastructure", href: "/technology#data" },
            { label: "Wearable Systems", href: "/technology#hardware" },
            { label: "Platform Architecture", href: "/technology#architecture" },
          ],
        },
        {
          title: "Research",
          links: [
            { label: "R&D Lab", href: "/research" },
            { label: "Research Areas", href: "/research#areas" },
            { label: "Current Studies", href: "/research#studies" },
            { label: "Methodology", href: "/research#methodology" },
          ],
        },
        {
          title: "Platform",
          links: [
            { label: "PawOS", href: "/platform#pawos" },
            { label: "Wearable Devices", href: "/platform#devices" },
            { label: "Data Engine", href: "/platform#engine" },
            { label: "Applications", href: "/applications" },
          ],
        },
        {
          title: "Company",
          links: [
            { label: "Investors", href: "/investors" },
            { label: "Grants", href: "/research-collaboration" },
            { label: "About", href: "/company" },
            { label: "Contact", href: "/contact" },
          ],
        },
      ]
    });

    // Seed Sample Page
    const existingPages = await strapi.documents('api::page.page' as any).findMany({
      filters: { slug: 'test' }
    });
    if (existingPages.length === 0) {
      await strapi.documents('api::page.page' as any).create({
        data: {
          title: "Test Page",
          slug: "test",
          hero_title: "Welcome to the Dynamic Test Page",
          hero_description: "This page was created entirely from the CMS without any new code.",
          sections: [
            { title: "Dynamic Content", desc: "This is a segment added via JSON in the CMS." },
            { title: "Scalability", desc: "You can add as many pages as you want using the Page collection type." }
          ]
        },
        status: 'published' as any
      });
      strapi.log.info('Bootstrap: Sample Test page seeded.');
    }

    strapi.log.info('Bootstrap: Single types checked/seeded.');
    // Set Permissions for Public Role
    try {
      const publicRole = await strapi.query('plugin::users-permissions.role').findOne({
        where: { type: 'public' },
      });

      if (publicRole) {
        const controllers = [
          'api::hero.hero',
          'api::tech-pillar.tech-pillar',
          'api::use-case.use-case',
          'api::research-study.research-study',
          'api::location.location',
          'api::technology-page.technology-page',
          'api::navigation.navigation',
          'api::page.page',
          'api::company-page.company-page',
          'api::applications-page.applications-page',
          'api::platform-page.platform-page',
          'api::research-page.research-page',
          'api::investors-page.investors-page',
          'api::contact-page.contact-page',
          'api::research-collaboration-page.research-collaboration-page'
        ];

        for (const controllerUid of controllers) {
          const apiName = controllerUid.split('.')[1];
          const actions = ['find', 'findMany', 'findOne'];

          for (const action of actions) {
            const permissionUid = `api::${apiName}.${apiName}.${action}`;
            const existing = await strapi.query('plugin::users-permissions.permission').findOne({
              where: { action: permissionUid, role: publicRole.id }
            });

            if (!existing) {
              await strapi.query('plugin::users-permissions.permission').create({
                data: {
                  action: permissionUid,
                  role: publicRole.id,
                }
              });
            }
          }
        }
        strapi.log.info('Bootstrap: Public permissions set.');
      }
    } catch (err) {
      strapi.log.error('Failed to set public permissions:', err);
    }

    // Register Contact Lifecycle Hooks
    strapi.db.lifecycles.subscribe({
      models: ['api::contact.contact'],
      async afterCreate(event) {
        const { result } = event;
        try {
          await strapi.plugins['email'].services.email.send({
            to: 'info@matteralifesystems.com',
            from: 'info@matteralifesystems.com',
            subject: `New Enquiry from ${result.name}`,
            text: `
              New enquiry received:
              Name: ${result.name}
              Email: ${result.email}
              Organisation: ${result.organisation}
              Type: ${result.type}
              Message: ${result.message}
            `,
          });
          strapi.log.info(`Email sent successfully for contact: ${result.id}`);
        } catch (err) {
          strapi.log.error(`Email Error: ${err.message}`);
        }
      },
    });
  },
};
