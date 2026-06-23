export interface Profile {
  id: number;
  name: string;
  title: string;
  tagline: string | null;
  about: string;
  techSkills: string[];
  avatarUrl: string | null;
  yearsExperience: string | null;
  studentsMentored: string | null;
  github: string;
  linkedin: string;
  email: string;
  topmate?: string;
  googleScholarUrl: string | null;
  location: string | null;
  role: string | null;
  community: string | null;
  experienceTitle: string | null;
  experienceSub: string | null;
  mentorshipTitle: string | null;
  mentorshipSub: string | null;
}

export interface Experience {
  id: number;
  role: string;
  company: string;
  companyDescription: string | null;
  date: string;
  duration: string;
  location: string;
  highlights: string[];
  skills: string[];
}

export interface Education {
  id: number;
  degree: string;
  field: string;
  institution: string;
  institutionType: string | null;
  date: string;
  description: string | null;
}

export interface Certification {
  id: number;
  name: string;
  issuer: string;
  credentialId: string | null;
  credentialUrl: string | null;
  date: string | null;
  logoUrl?: string | null;
}

export interface Award {
  id: number;
  name: string;
  issuer: string | null;
  year: string | null;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string | null;
  link: string | null;
  github: string | null;
  tags: string[];
}

export interface Publication {
  id: number;
  title: string;
  description: string;
  link: string;
  publisher: string | null;
  date: string;
}

export interface Patent {
  id: number;
  title: string;
  description: string;
  link: string;
  date: string;
}

export interface Blog {
  id: number;
  title: string;
  description: string;
  link: string;
  date: string;
}

export interface PortfolioData {
  profile: Profile;
  experiences: Experience[];
  education: Education[];
  certifications: Certification[];
  awards: Award[];
  projects: Project[];
  publications: Publication[];
  patents: Patent[];
  blogs: Blog[];
}

export const portfolioData: PortfolioData = {
  profile: {
    id: 1,
    name: "Jeevitha Murugan",
    title: "Data Scientist",
    tagline: "Data Scientist specializing in advanced analytics, machine learning, and intelligent decision systems | AWS Community Builder (AI Engineering)",
    about: "Data Scientist specializing in advanced analytics, machine learning, and intelligent decision systems for BFSI and enterprise transformation initiatives. Experienced in architecting scalable data, AI, and automation solutions spanning predictive analytics, risk intelligence, document intelligence, and business optimization. Strong foundation in cloud technologies and production-grade AI systems with a focus on measurable business impact. Combines deep technical expertise with solution consulting, strategic partnerships, and stakeholder management to bridge business objectives and emerging technologies.",
    techSkills: [
      "Python", "TensorFlow", "PyTorch", "LangChain", "Rasa", "MLflow", 
      "Azure", "AWS", "Hugging Face", "Agentic AI", "Apache Spark", "CrewAI", 
      "FastAPI", "Streamlit", "ClickHouse", "SQL", "Elasticsearch", "OpenTelemetry"
    ],
    avatarUrl: "/Jeevitha.png",
    yearsExperience: "3+",
    studentsMentored: "450+",
    github: "https://github.com/JEEVITHA2512",
    linkedin: "https://www.linkedin.com/in/jeevitha-murugan-357979223",
    email: "jeevithamurugan.2512@gmail.com",
    topmate: "https://topmate.io/jeevitha_m_25/",
    googleScholarUrl: "https://scholar.google.com/citations?user=sNlZI-4AAAAJ&hl=en",
    location: "Chennai, India",
    role: "Data Scientist",
    community: "AWS Community Builder",
    experienceTitle: "Experience",
    experienceSub: "Work Experience",
    mentorshipTitle: "Mentorship",
    mentorshipSub: "AWS SBG Students & AWS User Group Members",
  },
  experiences: [
    {
      id: 1,
      role: "Data Scientist",
      company: "BigTapp Analytics",
      companyDescription: "Cognitive Data & AI Services",
      date: "06/2025 - Present",
      duration: "1 yr 1 mo",
      location: "Chennai, India · On-site",
      highlights: [
        "Design and deliver AI-driven solutions across BFSI & Enterprise Automation domains by utilizing advanced analytics, Generative AI, Agentic AI, and intelligent decision systems to address complex business challenges.",
        "Architect enterprise AI platforms including intelligent document processing, AI copilots, and multi-agent systems, automating business workflows through Agentic AI, retrieval-augmented intelligence, and cloud-native data architectures.",
        "Collaborate with clients, technology partners, and leadership teams on technical presales, solution discovery, strategic partnerships, architecture design, and successful deployment of enterprise AI initiatives."
      ],
      skills: ["Data Science", "Generative AI", "Agentic AI", "LLM", "RAG", "Technical Presales"]
    },
    {
      id: 2,
      role: "Software Engineer Intern",
      company: "Blackstraw.AI",
      companyDescription: "AI & Software Engineering",
      date: "09/2024 - 06/2025",
      duration: "10 mos",
      location: "Chennai, India · On-site",
      highlights: [
        "Engineered autonomous multi-agent AI systems using CrewAI for legacy application modernization and intelligent workflow automation, enabling scalable orchestration of complex enterprise processes.",
        "Implemented OpenLit-based observability for prompt tracing, telemetry, performance monitoring, and operational governance for multi-agent AI systems and workflows.",
        "Built end-to-end data and AI workflows integrating machine learning, Generative AI, and enterprise applications to improve efficiency, visibility, and decision-making."
      ],
      skills: ["CrewAI", "Agentic AI", "OpenLit", "Generative AI", "Telemetry"]
    },
    {
      id: 3,
      role: "Data Scientist Intern",
      company: "Lifease Solutions LLP",
      companyDescription: "Health & Wellness Tech",
      date: "07/2023 - 10/2023",
      duration: "4 mos",
      location: "Remote, Noida",
      highlights: [
        "Developed deep learning-based speech enhancement and denoising systems using TensorFlow, PyTorch, Librosa, CNNs, Bi-LSTMs, and Autoencoders, improving signal quality and model efficiency for audio intelligence applications.",
        "Performed advanced audio feature engineering using MFCCs, Mel Spectrograms, STFT, and signal-processing techniques to enhance model performance, scalability, and prediction accuracy.",
        "Designed and evaluated multiple machine learning and deep learning architectures through experimentation, hyperparameter optimization, and performance benchmarking for production-oriented AI solutions."
      ],
      skills: ["TensorFlow", "PyTorch", "Librosa", "Audio AI", "Deep Learning"]
    },
    {
      id: 4,
      role: "Developer Intern",
      company: "Kactii (Formerly Tactlabs)",
      companyDescription: "HR & Talent Tech",
      date: "12/2021 - 10/2022",
      duration: "10 mos",
      location: "Remote, Canada",
      highlights: [
        "Developed AI-powered conversational applications and NLP solutions using Rasa, BERT, Word2Vec, and GloVe, improving query understanding and customer interaction experiences.",
        "Built and deployed cloud-native applications on AWS using Streamlit, CloudWatch, and IAM, supporting scalable, secure, and production-ready AI solutions."
      ],
      skills: ["Python", "Rasa", "BERT", "AWS", "Streamlit"]
    }
  ],
  education: [
    {
      id: 1,
      degree: "Bachelor of Technology - Artificial Intelligence and Data Science",
      field: "Artificial Intelligence and Data Science",
      institution: "St. Joseph's College of Engineering",
      institutionType: "Engineering College · Autonomous",
      date: "10/2021 - 04/2025",
      description: "Activities and societies:\n→ AWS Cloud Captain – Cohort 2025 | Selected as 1 of 28 women among 89 global captains\n→ Mentored 450+ students in AWS CLF-C02 & AIF-C01 Examination collectively\n→ Organized an industrial visit to Amazon DCI Bengaluru and launched Nephele 2.0, a robot made in end-to-end AWS Ecosystem\n→ Conducted 2 international speaker sessions, launched the Cloud Club Library to support peer learning.\n\nAchievements:\n→ First Class with Distinction Holder\n→ Smart India Hackathon Finalist - SIH 2023\n→ Runner up in IIT-M Cosmic Innovation Challenge\n→ Winner of IIM-V Predictive Analytics Challenge\n→ Winner of UIPath RPA Hackathon"
    }
  ],
  certifications: [
    { id: 1, name: "AWS Certified Generative AI Developer Professional", issuer: "Amazon Web Services (AWS)", date: "04/2026 - Present", credentialId: null, credentialUrl: null, logoUrl: null },
    { id: 2, name: "Dataiku Generative AI Practitioner Certified", issuer: "Dataiku", date: "11/2025 - Present", credentialId: null, credentialUrl: null, logoUrl: null },
    { id: 3, name: "Databricks Certified Machine Learning Professional", issuer: "Databricks", date: "12/2025 - Present", credentialId: null, credentialUrl: null, logoUrl: null },
    { id: 4, name: "Certified LLM Security Professional (CLLMSP)", issuer: "Red Team Leaders", date: "06/2026 - Present", credentialId: "32b89e4e41403db9", credentialUrl: "https://courses.redteamleaders.com/exam-completion/32b89e4e41403db9", logoUrl: null }
  ],
  awards: [
    { id: 1, name: "AWS APJC Community Award - Customer Obsession Category (AWS Re:Invent 2025, Las Vegas, USA)", issuer: "Amazon Web Services", year: "2025" },
    { id: 2, name: "Winner - Ideal Analytics Challenge", issuer: "Indian Institute of Management, Visakhapatnam", year: "2024" },
    { id: 3, name: "SIH Finalist", issuer: "AICTE-MIC, Government of India", year: "2024" },
    { id: 4, name: "Winner — Case Study Competition", issuer: "Anna University", year: "2024" },
    { id: 5, name: "3rd Place — Hack-a-Cloud", issuer: "AWS Student Builder Group (formerly AWS Cloud Club)", year: "2023" },
    { id: 6, name: "Winner — UI Path Hack-a-bot", issuer: "UiPath Community", year: "2023" },
    { id: 7, name: "2nd Runner Up — Cosmic Innovation Challenge (Microgravity Track)", issuer: "IIT Madras", year: "2023" }
  ],
  projects: [
    {
      id: 1,
      title: "LifeGraph AI – Agentic Customer Intelligence Platform",
      description: "An enterprise-scale Agentic AI architecture for banking, centered around a Customer Financial Intent Graph (CFIG) to model customer goals, financial behavior, life-stage evolution, and intent signals. Employs context-aware multi-agent workflows for Financial DNA generation, health assessment, goal readiness, and retirement forecasting. Utilizes GraphRAG, vector memory, and explainable reasoning to deliver proactive next-best-action intelligence.",
      image: null,
      link: null,
      github: null,
      tags: ["Agentic AI", "GraphRAG", "Multi-Agent Workflows", "Vector Memory", "Financial DNA", "Decision Intelligence"]
    },
    {
      id: 2,
      title: "Multi-Agent Enterprise Automation & Workflow Intelligence Platform",
      description: "A multi-agent AI orchestration platform that automates complex business operations through context engineering, RAG, and workflow execution. Enables autonomous collaboration between Planner, Context, Retrieval, Reasoning, Validation, and Execution agents while providing comprehensive workflow observability, auditability, memory management, and real-time execution tracking.",
      image: null,
      link: null,
      github: null,
      tags: ["FastAPI", "LangGraph", "Multi-Agent Orchestration", "Workflow Intelligence", "RAG", "Observability"]
    }
  ],
  publications: [
    {
      id: 1,
      title: "Data-driven Machine Learning Models for Risk Stratification and Prediction of Emergence Delirium in Pediatric Patients Underwent Tonsillectomy/Adenotonsillectomy",
      publisher: "Annali Italiani di Chirurgia",
      description: "Developed and benchmarked machine learning models for clinical risk stratification to predict emergence delirium in pediatric patients post-surgery.",
      link: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=sNlZI-4AAAAJ&citation_for_view=sNlZI-4AAAAJ:u5HHmVD_uO8C",
      date: "2024"
    },
    {
      id: 2,
      title: "Optimizing OCR Model Performance : A Comparative Study of Backbone Architectures and Hyperparameter Tuning",
      publisher: "CCIS, SPELLL Conference",
      description: "Published research on comparative study of backbone OCR models and tuning parameters for low-resource languages.",
      link: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=sNlZI-4AAAAJ&citation_for_view=sNlZI-4AAAAJ:d1gkVwhDpl0C",
      date: "2024"
    },
    {
      id: 3,
      title: "Payday loans -- blessing or growth suppressor?",
      publisher: "arXiv preprint arXiv:2205.15320",
      description: "Applied machine learning techniques to analyze the financial and socioeconomic impact of payday lending.",
      link: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=sNlZI-4AAAAJ&citation_for_view=sNlZI-4AAAAJ:u-x6o8ySG0sC",
      date: "2022"
    }
  ],
  patents: [],
  blogs: []
};
