export interface ServiceDetail {
  id: string;
  title: string;
  category: string;
  tagline: string;
  heroImage: string;
  overview: string;
  symptoms: string[];
  causes: string[];
  treatmentProcess: { step: string; title: string; desc: string }[];
  benefits: string[];
  candidates: {
    take: string[];
    avoid: string[];
  };
  duration: string;
  sessionsRequired: string;
  recoveryTimeline: string;
  faqs: { question: string; answer: string }[];
  photos: { url: string; alt: string; caption: string }[];
  relatedServices: string[];
}

export const SERVICES_DATA: Record<string, ServiceDetail> = {
  "back-neck-pain": {
    id: "back-neck-pain",
    title: "Back & Neck Pain Rehabilitation",
    category: "Spine Care",
    tagline: "Evidence-led spine therapy to eliminate stiffness, correct posture, and restore daily movement.",
    heroImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&auto=format&fit=crop&q=80",
    overview:
      "Back and neck pain are among the most common musculoskeletal complaints causing restricted mobility, muscle spasms, and disrupted daily productivity. At Shreyaan Physiotherapy Center, Dr. Sonam Maurya delivers clinical assessment and evidence-guided manual therapy, spinal mobilization, core retraining, and ergonomic guidance to address the root cause of spine distress.",
    symptoms: [
      "Persistent lower back ache or stiffness",
      "Sharp pain during bending, sitting, or lifting",
      "Neck tightness radiating to shoulders or arms",
      "Frequent tension headaches triggered by neck stiffness",
      "Muscle spasms along the spinal column",
    ],
    causes: [
      "Poor sitting posture and prolonged screen desk work",
      "Muscle weakness in abdomen and lower back core",
      "Degenerative disc changes or ligament sprains",
      "Sudden heavy lifting or awkward postural twists",
    ],
    treatmentProcess: [
      {
        step: "01",
        title: "Clinical & Functional Assessment",
        desc: "Thorough physical evaluation of spinal alignment, posture, range of motion, nerve reflexes, and muscle strength.",
      },
      {
        step: "02",
        title: "Targeted Pain Relieving Modalities",
        desc: "Application of IFT/TENS, thermotherapy, or dry needling to reduce acute muscle spasm and nerve irritation.",
      },
      {
        step: "03",
        title: "Spinal Mobilization & Core Strengthening",
        desc: "Hands-on spinal mobilization techniques paired with progressive core stabilization exercises.",
      },
      {
        step: "04",
        title: "Ergonomic & Postural Re-education",
        desc: "Custom workstation setup advice, home exercise routine, and body mechanics coaching for permanent prevention.",
      },
    ],
    benefits: [
      "Rapid reduction in spinal pain and muscle tightness",
      "Restoration of natural lumbar and cervical curvature",
      "Enhanced core strength preventing future recurrences",
      "Improved work productivity and comfortable sleep posture",
    ],
    candidates: {
      take: [
        "Individuals suffering from chronic lower back or neck pain",
        "Desk workers and IT professionals with postural stiffness",
        "Patients recovering from spinal muscle sprains or strains",
        "Elderly patients experiencing age-related spinal stiffness",
      ],
      avoid: [
        "Unstable spinal fractures requiring immediate neurosurgical emergency",
        "Active spinal infections or open wounds in the treatment region",
      ],
    },
    duration: "45 – 60 minutes per session",
    sessionsRequired: "6 – 12 sessions depending on severity",
    recoveryTimeline: "Noticeable pain relief within 3–5 sessions; functional recovery in 2–4 weeks.",
    faqs: [
      {
        question: "How soon can I expect relief from lower back pain?",
        answer: "Most patients experience measurable pain reduction within 3 to 4 targeted physiotherapy sessions as muscle spasms dissipate.",
      },
      {
        question: "Is spinal manipulation safe for neck pain?",
        answer: "Yes, Dr. Sonam Maurya performs gentle, evidence-based joint mobilization tailored safely to your age and clinical condition.",
      },
    ],
    photos: [
      {
        url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80",
        alt: "Spinal mobilization treatment at Shreyaan Physiotherapy Center",
        caption: "Targeted spinal mobilization and postural therapy.",
      },
      {
        url: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&auto=format&fit=crop&q=80",
        alt: "Electrotherapy session for back pain relief",
        caption: "Electrotherapy modalities for deep muscle spasm relief.",
      },
    ],
    relatedServices: ["sciatica-slip-disc", "dry-needling", "electrotherapy"],
  },

  "knee-joint": {
    id: "knee-joint",
    title: "Knee & Joint Pain Management",
    category: "Joint Care",
    tagline: "Restore joint flexibility, strengthen supportive muscles, and walk without discomfort.",
    heroImage: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=1200&auto=format&fit=crop&q=80",
    overview:
      "Knee and peripheral joint pain can severely impair stair climbing, walking, and daily standing. Whether caused by osteoarthritis, ligament strain, patellofemoral syndrome, or cartilage wear, our specialized joint care program focuses on joint mobilization, quadriceps strengthening, gait correction, and inflammation control.",
    symptoms: [
      "Pain while climbing stairs or standing up from low chairs",
      "Stiffness and popping or clicking sounds in the knee joint",
      "Swelling or warmth around the joint after physical activity",
      "Instability or feeling like the knee might buckle",
    ],
    causes: [
      "Osteoarthritis and cartilage degeneration",
      "Ligament or meniscal sprains from twisting movements",
      "Muscle imbalance around the hip and thigh",
      "Excess weight putting increased biomechanical load on joints",
    ],
    treatmentProcess: [
      {
        step: "01",
        title: "Joint & Biomechanical Evaluation",
        desc: "Assessment of knee alignment, patellar tracking, range of motion, and muscle strength ratios.",
      },
      {
        step: "02",
        title: "Modality Pain Control",
        desc: "Ultrasound therapy and electrotherapy to reduce joint capsule inflammation and fluid accumulation.",
      },
      {
        step: "03",
        title: "Quadriceps & Gluteal Conditioning",
        desc: "Targeted strengthening exercises to offload joint compression forces.",
      },
      {
        step: "04",
        title: "Gait & Balance Retraining",
        desc: "Correcting walking mechanics to protect joints during long daily walks or work.",
      },
    ],
    benefits: [
      "Reduced knee swelling and movement pain",
      "Improved joint lubricity and range of motion",
      "Enhanced leg strength allowing pain-free stair climbing",
      "Delay or prevention of surgical joint replacement",
    ],
    candidates: {
      take: [
        "Patients with knee osteoarthritis (Stage I to III)",
        "Individuals with patellofemoral pain syndrome",
        "Runners or athletes with ligament strain",
        "Elderly patients seeking independent mobility",
      ],
      avoid: [
        "Acute septic arthritis requiring emergency intravenous antibiotics",
        "Complete un-stabilized ligament tears needing immediate surgical repair",
      ],
    },
    duration: "45 – 50 minutes per session",
    sessionsRequired: "8 – 15 sessions",
    recoveryTimeline: "Swelling reduction within 1 week; full functional gait improvement in 3–6 weeks.",
    faqs: [
      {
        question: "Can physiotherapy help avoid knee replacement surgery?",
        answer: "In mild to moderate osteoarthritis, structured quadriceps strengthening and joint mobilization can significantly relieve pain and defer surgical intervention.",
      },
    ],
    photos: [
      {
        url: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=800&auto=format&fit=crop&q=80",
        alt: "Knee joint physical therapy session",
        caption: "Targeted knee mobilization and joint care.",
      },
    ],
    relatedServices: ["post-surgical", "electrotherapy", "sports-injury"],
  },

  "slip-disc": {
    id: "slip-disc",
    title: "Slip Disc & Sciatica Care",
    category: "Neuromuscular",
    tagline: "Targeted non-surgical decompression for radiating leg pain, numbness, and disc herniation.",
    heroImage: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&auto=format&fit=crop&q=80",
    overview:
      "Herniated or bulging intervertebral discs can press against spinal nerve roots, leading to intense radiating pain down the buttock and leg (sciatica). Our non-surgical lumbar decompression and nerve gliding protocol safely relieves disc compression, desensitizes nerve tissue, and restores functional independence.",
    symptoms: [
      "Sharp, electric shock-like pain shooting down one leg",
      "Numbness, tingling, or pin-prick sensations in the foot",
      "Aggravation of pain during coughing, sneezing, or sitting",
      "Weakness in ankle dorsiflexion or toes",
    ],
    causes: [
      "Lumbar disc herniation (L4-L5, L5-S1 levels)",
      "Degenerative disc disease causing nerve root impingement",
      "Piriformis muscle tightness compressing the sciatic nerve",
    ],
    treatmentProcess: [
      {
        step: "01",
        title: "Neurological & Dermatomic Assessment",
        desc: "Slump testing, straight leg raise evaluation, and sensory reflex mapping.",
      },
      {
        step: "02",
        title: "Lumbar Decompression & Traction",
        desc: "Gentle manual or mechanical traction to increase intervertebral disc space and reduce nerve pressure.",
      },
      {
        step: "03",
        title: "Neural Mobilization / Gliding",
        desc: "Specialized nerve flossing exercises to restore free sliding of the sciatic nerve.",
      },
      {
        step: "04",
        title: "McKenzie Extension & Core Stability",
        desc: "Directional preference exercises to centralize pain back into the spine.",
      },
    ],
    benefits: [
      "Elimination of radiating leg pain and foot numbness",
      "Centralization and reduction of herniated disc protrusion",
      "Safe non-invasive alternative to spinal surgery",
      "Restoration of comfortable sitting and walking ability",
    ],
    candidates: {
      take: [
        "Patients diagnosed with L4-L5 or L5-S1 disc herniation / bulge",
        "Individuals with unilateral sciatic nerve radiation",
        "Patients experiencing discogenic lower back tightness",
      ],
      avoid: [
        "Cauda equina syndrome with sudden bowel/bladder dysfunction (Emergency Referral Required)",
        "Progressive severe motor loss without medical clearance",
      ],
    },
    duration: "45 – 60 minutes per session",
    sessionsRequired: "10 – 18 sessions",
    recoveryTimeline: "Pain centralization in 1–2 weeks; nerve recovery in 4–8 weeks.",
    faqs: [
      {
        question: "Is surgery always required for a slip disc?",
        answer: "No! Over 90% of herniated disc and sciatica cases respond successfully to conservative physical therapy and non-surgical decompression.",
      },
    ],
    photos: [
      {
        url: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&auto=format&fit=crop&q=80",
        alt: "Lumbar traction and sciatica rehabilitation",
        caption: "Non-surgical decompression for sciatica relief.",
      },
    ],
    relatedServices: ["back-neck-pain", "electrotherapy", "dry-needling"],
  },

  "sports-injury": {
    id: "sports-injury",
    title: "Sports Injury Rehabilitation",
    category: "Sports Rehab",
    tagline: "Accelerated athletic recovery, biomechanical optimization, and injury prevention.",
    heroImage: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1200&auto=format&fit=crop&q=80",
    overview:
      "Whether you are a competitive athlete or an active individual, sports injuries such as ankle sprains, hamstring pulls, rotator cuff tears, or ACL strains require specialized biomechanical rehab. We combine athletic conditioning, myofascial release, kinesiology taping, and return-to-sport testing.",
    symptoms: [
      "Acute pain and swelling immediately following sport activity",
      "Reduced joint agility, speed, or kicking power",
      "Recurrent muscle strains or ligament instability",
    ],
    causes: [
      "Inadequate warm-up or sudden overuse training stress",
      "Sudden directional changes causing ligament sprain",
      "Biomechanical flaws or muscle force imbalances",
    ],
    treatmentProcess: [
      {
        step: "01",
        title: "Acute Phase Inflammatory Control",
        desc: "RICE protocol, cryotherapy, compression taping, and electrotherapy.",
      },
      {
        step: "02",
        title: "Tissue Healing & Mobility",
        desc: "Cross-friction massage, dry needling, and joint mobilization.",
      },
      {
        step: "03",
        title: "Neuromuscular & Plyometric Rehab",
        desc: "Proprioceptive balance, agility drills, and explosive power retraining.",
      },
      {
        step: "04",
        title: "Return-to-Sport Testing",
        desc: "Functional movement screening before full athletic clearance.",
      },
    ],
    benefits: [
      "Rapid return to active training and competition",
      "Restoration of joint stability and explosive muscle power",
      "Reduction in re-injury risk through movement optimization",
    ],
    candidates: {
      take: [
        "Athletes recovering from sprains, strains, or tendonitis",
        "Runners experiencing shin splints or plantar fasciitis",
        "Active individuals returning to fitness programs",
      ],
      avoid: [
        "Un-cleared acute complete tendon ruptures prior to surgical evaluation",
      ],
    },
    duration: "45 – 60 minutes per session",
    sessionsRequired: "6 – 14 sessions",
    recoveryTimeline: "Acute swelling resolution in 3–5 days; full athletic clearance in 3–8 weeks.",
    faqs: [
      {
        question: "When can I resume running after an ankle sprain?",
        answer: "Once single-leg balance and painless hopping tests are achieved, typically within 2 to 3 weeks of structured rehabilitation.",
      },
    ],
    photos: [
      {
        url: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80",
        alt: "Sports injury physical therapy and conditioning",
        caption: "Athletic conditioning and functional agility rehabilitation.",
      },
    ],
    relatedServices: ["dry-needling", "knee-joint", "electrotherapy"],
  },

  "paralysis": {
    id: "paralysis",
    title: "Paralysis & Neuro Rehabilitation",
    category: "Neuro Rehab",
    tagline: "Compassionate motor re-education, stroke recovery, and gait independence training.",
    heroImage: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=1200&auto=format&fit=crop&q=80",
    overview:
      "Neurological conditions such as stroke (hemiplegia), facial palsy, spinal cord trauma, or peripheral neuropathy affect motor signaling between brain and muscles. Dr. Sonam Maurya employs neuro-developmental therapy (NDT), PNF stretching, task-oriented retraining, and electrical muscle stimulation to help patients regain lost function.",
    symptoms: [
      "Loss of muscle movement or weakness on one side of the body",
      "Facial drooping or difficulty closing eye (Bell's Palsy)",
      "Spasticity, muscle tightness, or tremors",
      "Impaired standing balance and walking unsteadiness",
    ],
    causes: [
      "Cerebrovascular accident (Stroke / Ischemic attack)",
      "Facial nerve inflammation (Bell's Palsy)",
      "Peripheral nerve compression or neuropathy",
    ],
    treatmentProcess: [
      {
        step: "01",
        title: "Neuro-Motor Evaluation",
        desc: "Assessment of tone, spasticity, voluntary control grade, and balance reflexes.",
      },
      {
        step: "02",
        title: "Functional Electrical Stimulation (FES)",
        desc: "Applying muscle stimulation to re-activate dormant motor pathways.",
      },
      {
        step: "03",
        title: "Task-Oriented Motor Retraining",
        desc: "Repetitive practice of sit-to-stand, gripping, standing, and gait cycles.",
      },
      {
        step: "04",
        title: "Caregiver Training & Home Protocol",
        desc: "Empowering family members with safe transfer techniques and daily mobility drills.",
      },
    ],
    benefits: [
      "Activation of dormant nerve pathways through neuroplasticity",
      "Reduction in painful muscle spasticity and joint contractures",
      "Greater independence in bathing, dressing, and walking",
      "Improved confidence and emotional wellbeing for patient and family",
    ],
    candidates: {
      take: [
        "Post-stroke survivors seeking functional recovery",
        "Patients with Bell's Palsy or facial nerve weakness",
        "Individuals with diabetic neuropathy or nerve palsy",
      ],
      avoid: [
        "Unstable cardiovascular vitals without medical stabilization clearance",
      ],
    },
    duration: "60 minutes per session",
    sessionsRequired: "15 – 30+ sessions",
    recoveryTimeline: "Initial motor responses in 2–4 weeks; sustained functional gains over 2–6 months.",
    faqs: [
      {
        question: "Can physiotherapy help months after a stroke?",
        answer: "Yes! Brain neuroplasticity allows continued motor improvement through targeted rehabilitation even months or years after a stroke.",
      },
    ],
    photos: [
      {
        url: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&auto=format&fit=crop&q=80",
        alt: "Neurological rehabilitation and gait training",
        caption: "Neurological motor re-education and gait training.",
      },
    ],
    relatedServices: ["electrotherapy", "post-surgical", "back-neck-pain"],
  },

  "post-surgical": {
    id: "post-surgical",
    title: "Post-Surgical Rehabilitation",
    category: "Post-Op Care",
    tagline: "Structured phase-by-phase recovery following orthopaedic and joint surgeries.",
    heroImage: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=1200&auto=format&fit=crop&q=80",
    overview:
      "Surgical procedures like total knee replacement (TKR), total hip replacement (THR), ACL reconstruction, or spinal fixation require immediate, safe, and progressive rehabilitation. We work alongside surgeon protocols to restore joint flexibility, prevent deep vein thrombosis, breakdown scar tissue, and rebuild muscle strength.",
    symptoms: [
      "Post-operative joint stiffness and swelling",
      "Muscle atrophy surrounding the surgical site",
      "Difficulty bearing weight or walking without crutches",
    ],
    causes: [
      "Total Knee / Hip Replacement surgery",
      "Ligament reconstruction (ACL / PCL repair)",
      "Fracture fixation (plates, pins, or external fixators)",
    ],
    treatmentProcess: [
      {
        step: "01",
        title: "Phase I: Protection & Mobility",
        desc: "Gentle passive range of motion, edema management, and circulation pumps.",
      },
      {
        step: "02",
        title: "Phase II: Active Movement & Scar Therapy",
        desc: "Gentle scar mobilization, active-assisted flexions, and quad lag correction.",
      },
      {
        step: "03",
        title: "Phase III: Progressive Resistance & Weight Bearing",
        desc: "Strengthening muscles and normalizing gait without walking aids.",
      },
      {
        step: "04",
        title: "Phase IV: Full Functional Independence",
        desc: "Advanced balance, stair navigation, and return to daily activities.",
      },
    ],
    benefits: [
      "Safe, surgeon-compliant recovery progression",
      "Prevention of joint stiffness and scar adhesions",
      "Restoration of 100% functional range of motion",
      "Rapid reduction in post-operative pain and swelling",
    ],
    candidates: {
      take: [
        "Patients following TKR, THR, or shoulder arthroscopy",
        "Individuals recovering from fracture fixation surgeries",
        "Patients post spinal discectomy or fusion",
      ],
      avoid: [
        "Surgical incisions showing active infection or unhealed discharge",
      ],
    },
    duration: "45 – 60 minutes per session",
    sessionsRequired: "12 – 24 sessions",
    recoveryTimeline: "Independent walking in 2–4 weeks; complete recovery in 6–12 weeks.",
    faqs: [
      {
        question: "When should physiotherapy start after joint replacement surgery?",
        answer: "Physiotherapy typically begins within 24 to 48 hours post-surgery as advised by your orthopaedic surgeon.",
      },
    ],
    photos: [
      {
        url: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&auto=format&fit=crop&q=80",
        alt: "Post surgical joint rehabilitation",
        caption: "Post-operative range of motion and quad activation.",
      },
    ],
    relatedServices: ["knee-joint", "electrotherapy", "paralysis"],
  },

  "dry-needling": {
    id: "dry-needling",
    title: "Dry Needling & Cupping Therapy",
    category: "Specialized Therapy",
    tagline: "Evidence-based trigger point release and myofascial circulation therapy.",
    heroImage: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200&auto=format&fit=crop&q=80",
    overview:
      "Dry Needling utilizes ultra-thin sterile filament needles inserted directly into muscular trigger points ('knots') to evoke a local twitch response, deactivating tight muscle fibers and relieving deep pain. Combined with clinical Cupping Therapy, it stimulates local micro-circulation, releases fascial restriction, and accelerates tissue repair.",
    symptoms: [
      "Deep muscular knots in upper back, neck, or calves",
      "Chronic trigger point tenderness that resists stretching",
      "Myofascial pain syndrome and restricted flexibility",
    ],
    causes: [
      "Chronic postural strain and repetitive muscle overuse",
      "Stress-induced muscle tension and fibrositis",
    ],
    treatmentProcess: [
      {
        step: "01",
        title: "Trigger Point Palpation",
        desc: "Identifying exact hyper-irritable taut bands in the affected muscle group.",
      },
      {
        step: "02",
        title: "Sterile Needle Insertion",
        desc: "Inserting fine single-use needles to induce therapeutic muscle relaxation.",
      },
      {
        step: "03",
        title: "Vacuum Cupping Application",
        desc: "Applying silicone or glass vacuum cups to decompress tight connective tissue fascia.",
      },
      {
        step: "04",
        title: "Post-Release Stretch & Integration",
        desc: "Gentle lengthening of the released muscle to establish new resting length.",
      },
    ],
    benefits: [
      "Immediate release of stubborn muscular knots and tension",
      "Enhanced local blood flow and lymphatic drainage",
      "Rapid reduction in chronic myofascial neck and back pain",
      "Certified safe treatment performed by Dr. Sonam Maurya",
    ],
    candidates: {
      take: [
        "Patients with myofascial pain syndrome and persistent muscle tightness",
        "Athletes with heavy muscle fatigue and calf/shoulder knots",
        "Individuals with chronic neck or upper back stiffness",
      ],
      avoid: [
        "Patients with severe needle phobia or bleeding disorders (haemophilia)",
        "Application directly over skin lesions, rashes, or open wounds",
      ],
    },
    duration: "30 – 45 minutes per session",
    sessionsRequired: "3 – 6 sessions",
    recoveryTimeline: "Immediate muscular tension release; full sore-free benefit in 24–48 hours.",
    faqs: [
      {
        question: "Is dry needling painful?",
        answer: "You may feel a minor prick followed by a brief muscle twitch response, which signals successful trigger point release.",
      },
    ],
    photos: [
      {
        url: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&auto=format&fit=crop&q=80",
        alt: "Dry needling and myofascial cupping therapy",
        caption: "Certified dry needling and myofascial release therapy.",
      },
    ],
    relatedServices: ["back-neck-pain", "sports-injury", "electrotherapy"],
  },

  "electrotherapy": {
    id: "electrotherapy",
    title: "Electrotherapy & K-Taping",
    category: "Advanced Modalities",
    tagline: "Targeted electrical stimulation, therapeutic ultrasound, and kinesiology taping.",
    heroImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&auto=format&fit=crop&q=80",
    overview:
      "Advanced Electrotherapy modalities—including Interferential Therapy (IFT), TENS, Therapeutic Ultrasound, and Kinesiology Taping—provide non-pharmacological pain relief, reduce localized swelling, and stimulate tissue cellular repair. Used alongside manual exercise therapy for optimal outcomes.",
    symptoms: [
      "Acute joint inflammation or post-injury swelling",
      "Severe acute nerve pain preventing physical movement",
      "Localized tissue edema or muscle weakness",
    ],
    causes: [
      "Acute soft tissue injuries, sprains, or contusions",
      "Nerve root irritation requiring electrical gate-control inhibition",
    ],
    treatmentProcess: [
      {
        step: "01",
        title: "Frequency & Modality Selection",
        desc: "Choosing IFT, TENS, or Ultrasound parameters specific to acute or chronic pain.",
      },
      {
        step: "02",
        title: "Therapeutic Application",
        desc: "Comfortable pad or probe placement for 15–20 minutes of targeted stimulation.",
      },
      {
        step: "03",
        title: "Kinesiology Taping Support",
        desc: "Applying elastic K-tape to support weak joints and enhance lymphatic fluid removal.",
      },
    ],
    benefits: [
      "Natural pain inhibition via gate-control nerve mechanism",
      "Accelerated cellular repair through acoustic ultrasound micro-streaming",
      "Continuous dynamic joint support with kinesiology tape",
    ],
    candidates: {
      take: [
        "Patients requiring non-chemical pain management",
        "Individuals with localized swelling or tendon inflammation",
      ],
      avoid: [
        "Patients with cardiac pacemakers or implanted electronic devices",
        "Application over abdominal region during pregnancy",
      ],
    },
    duration: "30 – 40 minutes per session",
    sessionsRequired: "5 – 10 sessions",
    recoveryTimeline: "Immediate temporary pain relief during session; cumulative benefit in 1–2 weeks.",
    faqs: [
      {
        question: "How does electrotherapy help relieve pain?",
        answer: "It blocks pain signal transmission to the brain and stimulates the body's natural endorphins to soothe inflamed tissue.",
      },
    ],
    photos: [
      {
        url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80",
        alt: "Electrotherapy treatment session",
        caption: "IFT electrotherapy and therapeutic ultrasound care.",
      },
    ],
    relatedServices: ["back-neck-pain", "knee-joint", "sports-injury"],
  },
};
