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
    title: "Data Scientist & Generative AI Engineer",
    tagline: "Engineering the Future with Generative AI & Data | AWS Community Builder (AI) | Data Scientist @ BigTapp",
    about: "Data Scientist at BigTapp Analytics, building AI-driven solutions across insurance, logistics, and banking domains. Specialized in Agentic AI, LLM systems, intelligent document processing, workflow automation, and technical pre-sales. AWS Community Builder (AI Engineering), speaker, blogger, and mentor who has guided 450+ students and supported 25+ AWS Student Builder Groups (formerly AWS Cloud Clubs) across India. Recipient of the AWS APJC Community Award and attendee of AWS re:Invent 2025. Certified across AWS, Azure, Dataiku, and Databricks. Passionate about AI, automation, cloud technologies, AI Security, and enterprise-scale systems.",
    techSkills: [
      "Python", "TensorFlow", "PyTorch", "LangChain", "Rasa", "MLflow", 
      "Azure", "AWS", "Hugging Face", "Agentic AI", "Apache Spark", "CrewAI", 
      "FastAPI", "Streamlit", "ClickHouse", "SQL", "Elasticsearch", "OpenTelemetry"
    ],
    avatarUrl: "/Jeevitha.png",
    yearsExperience: "4+",
    studentsMentored: "450+",
    github: "https://github.com/jeevithamurugan",
    linkedin: "https://www.linkedin.com/in/jeevitha-murugan-357979223",
    email: "jeevithamurugan.2512@gmail.com",
    googleScholarUrl: "https://scholar.google.com/citations?user=sNlZI-4AAAAJ&hl=en",
    location: "Chennai, India",
    role: "Data Scientist @ BigTapp",
    community: "AWS Community Builder",
    experienceTitle: "Experience",
    experienceSub: "Full-time & Internship work",
    mentorshipTitle: "Mentorship",
    mentorshipSub: "AWS SBG students & AWS User Groups members guided",
  },
  experiences: [
    {
      id: 1,
      role: "Data Scientist",
      company: "BigTapp Analytics",
      companyDescription: "Cognitive Data & AI Services",
      date: "Jun 2025 - Present",
      duration: "1 yr 1 mo",
      location: "Chennai, Tamil Nadu, India · On-site",
      highlights: [
        "Design and implement Agentic AI and LLM-based reasoning systems for core business workflows across insurance, logistics, and banking (commercial, corporate, and investment).",
        "Develop intelligent document processing pipelines combining OCR and LLMs for automated data extraction and validation.",
        "Build RAG-based architectures and decision support systems for financial log analysis and incident investigation.",
        "Integrate cloud-native AI solutions using AWS Bedrock and Elastic technologies in enterprise architectures.",
        "Collaborate in technical pre-sales to translate business requirements into scalable AI solutions and architecture designs."
      ],
      skills: ["Data Science", "Generative AI", "Agentic AI", "LLM", "RAG", "Technical Presales"]
    },
    {
      id: 2,
      role: "Software Engineer Intern",
      company: "Blackstraw",
      companyDescription: "AI & Software Engineering",
      date: "Sep 2024 - Jun 2025",
      duration: "10 mos",
      location: "Chennai, Tamil Nadu, India · On-site",
      highlights: [
        "Built autonomous multi-agent pipelines using CrewAI for code migration and refactoring tasks with inter-agent memory sharing and task delegation.",
        "Integrated with OpenLit to provide real-time traceability and observability of agent behaviors.",
        "Designed and deployed a full-stack analytics pipeline using Microsoft's Fabric Analytics, utilizing Dataflows and Power BI dashboards to reduce manual analysis cycles by 60%.",
        "Used Kusto Query Language (KQL) to analyze Azure Bot Framework logs to identify key drop-off points, latency issues, and fine-tune bot flows."
      ],
      skills: ["CrewAI", "Fabric Analytics", "Power BI", "KQL", "Azure", "Agentic AI", "OpenLit"]
    },
    {
      id: 3,
      role: "Intern - Data Scientist",
      company: "Lifease Solutions LLP",
      companyDescription: "Health & Wellness Tech",
      date: "Jul 2023 - Oct 2023",
      duration: "4 mos",
      location: "Noida, Uttar Pradesh, India · Remote",
      highlights: [
        "Processed raw audio inputs using Librosa, SoundFile, pydub, and PyAudio, extracting Mel-spectrograms, STFT, and MFCC features for feature engineering.",
        "Developed and trained CNN, Bi-LSTM, and AutoEncoder architectures using TensorFlow and PyTorch for audio denoising tasks.",
        "Integrated Audo AI's pretrained APIs for production-grade noise suppression and compared against in-house models for latency and accuracy.",
        "Explored TTS synthesis using pyttsx3 and validated naturalness of generated speech against transcripts."
      ],
      skills: ["Python", "TensorFlow", "PyTorch", "Librosa", "Audio AI", "Deep Learning"]
    },
    {
      id: 4,
      role: "Developer Intern",
      company: "Tactii (formerly TalentAccurate)",
      companyDescription: "HR & Talent Tech",
      date: "Jan 2022 - Oct 2022",
      duration: "10 mos",
      location: "Toronto, Ontario, Canada · Remote",
      highlights: [
        "Built custom NLU pipelines for domain-specific chatbots using Rasa and Spacy, enhancing intent classification accuracy with synonym mapping and fallback logic.",
        "Deployed ML models with Flask APIs and Streamlit dashboards, including an sentiment analysis tool with prediction breakdowns.",
        "Designed schema models for chatbot session logging and user feedback using ClickHouse for high-throughput analytical queries in performance dashboards.",
        "Participated in internal Python mentoring sessions and peer reviews for junior interns."
      ],
      skills: ["Python", "Rasa", "Spacy", "Flask", "Streamlit", "ClickHouse", "SQL"]
    }
  ],
  education: [
    {
      id: 1,
      degree: "Bachelor of Technology - BTech",
      field: "Artificial Intelligence and Data Science",
      institution: "St. Joseph's College Of Engineering",
      institutionType: "Engineering College · Autonomous",
      date: "Nov 2021 – May 2025",
      description: "Pursued intensive academic coursework in Artificial Intelligence and Data Science. Major curriculum areas covered programming languages, data structures, database design, and machine learning theory. Participated in technical hackathons, laboratory experiments, and project design evaluations to apply software engineering and analytical approaches to real-world datasets."
    },
    {
      id: 2,
      degree: "12th equivalent grade",
      field: "Biology, General",
      institution: "St. Johns Sr. Sec. School & Junior College",
      institutionType: "Senior Secondary School",
      date: "2006 – 2021",
      description: "Completed foundational education with a focus on science and biology. Built a strong academic base in mathematics, physics, and computer applications."
    }
  ],
  certifications: [
    { id: 1, name: "AWS Certified Generative AI Developer - Professional", issuer: "Amazon Web Services (AWS)", date: null, credentialId: null, credentialUrl: null, logoUrl: null },
    { id: 2, name: "Databricks Certified Machine Learning Professional", issuer: "Databricks", date: null, credentialId: null, credentialUrl: null, logoUrl: null },
    { id: 3, name: "Cast AI APA Hero - Cloud Native & Application Performance Automation", issuer: "Cast AI", date: null, credentialId: null, credentialUrl: null, logoUrl: null },
    { id: 4, name: "Dataiku Generative AI Practitioner", issuer: "Dataiku", date: null, credentialId: null, credentialUrl: null, logoUrl: null },
    { id: 5, name: "Databricks Certified Data Engineer Associate", issuer: "Databricks", date: null, credentialId: null, credentialUrl: null, logoUrl: null },
    { id: 6, name: "AWS Certified AI Practitioner", issuer: "Amazon Web Services (AWS)", date: null, credentialId: null, credentialUrl: null, logoUrl: null },
    { id: 7, name: "Microsoft Certified: Azure Data Engineer Associate", issuer: "Microsoft", date: null, credentialId: null, credentialUrl: null, logoUrl: null },
    { id: 8, name: "AWS Student Builder Groups (formerly AWS Cloud Clubs) Certified Instructor", issuer: "AWS User Groups", date: null, credentialId: null, credentialUrl: null, logoUrl: null },
    { id: 9, name: "Certified Python Developer Associate", issuer: "ISO 14001 Certification", date: null, credentialId: null, credentialUrl: null, logoUrl: null },
    { id: 10, name: "Microsoft Certified: Azure Fundamentals", issuer: "Microsoft", date: null, credentialId: null, credentialUrl: null, logoUrl: null },
    { id: 11, name: "Oracle Cloud Infrastructure 2023 AI Certified Foundations Associate", issuer: "Oracle", date: null, credentialId: null, credentialUrl: null, logoUrl: null },
    { id: 12, name: "Google Cybersecurity Certificate", issuer: "Coursera", date: null, credentialId: null, credentialUrl: null, logoUrl: null },
    { id: 13, name: "Microsoft Certified: Fabric Analytics Engineer Associate", issuer: "Microsoft", date: null, credentialId: null, credentialUrl: null, logoUrl: null },
    { id: 14, name: "Microsoft Certified: Azure AI Engineer Associate", issuer: "Microsoft", date: null, credentialId: null, credentialUrl: null, logoUrl: null },
    { id: 15, name: "Microsoft Certified: Azure AI Fundamentals", issuer: "Microsoft", date: null, credentialId: null, credentialUrl: null, logoUrl: null },
    { id: 16, name: "Cambridge Business English Certification", issuer: "Cambridge University Press & Assessment", date: null, credentialId: null, credentialUrl: null, logoUrl: null },
    { id: 17, name: "IBM Data Science Professional Certificate", issuer: "IBM", date: null, credentialId: null, credentialUrl: null, logoUrl: null }
  ],
  awards: [
    { id: 1, name: "AWS Community Awards APJC — Customer Obsession Category", issuer: "Amazon Web Services", year: "2025" },
    { id: 2, name: "Winner — Ideal Analytics Challenge", issuer: "IIM Visakhapatnam", year: "2024" },
    { id: 3, name: "SIH Finalist", issuer: "AICTE-MIC, Government of India", year: "2024" },
    { id: 4, name: "Winner — Case Study Competition", issuer: "Anna University", year: "2024" },
    { id: 5, name: "3rd Place — Hack-a-Cloud", issuer: "AWS Student Builder Group (formerly AWS Cloud Club)", year: "2023" },
    { id: 6, name: "Winner — UI Path Hack-a-bot", issuer: "UiPath Community", year: "2023" },
    { id: 7, name: "2nd Runner Up — Cosmic Innovation Challenge (Microgravity Track)", issuer: "IIT Madras", year: "2023" }
  ],
  projects: [],
  publications: [
    {
      id: 1,
      title: "Data-driven machine learning models for risk stratification and prediction of Emergence Delirium in pediatric patients underwent tonsillectomy/adenotonsillectomy",
      publisher: "Annali Italiani di Chirurgia 95 (5), 944-955, 2024",
      description: "Authors: A Simonini, J Murugan, A Vittori, R Pallotto, EG Bignami, MG Calevo, .... Developed and benchmarked machine learning models for clinical risk stratification to predict emergence delirium in pediatric patients post-surgery.",
      link: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=sNlZI-4AAAAJ&citation_for_view=sNlZI-4AAAAJ:u5HHmVD_uO8C",
      date: "2024"
    },
    {
      id: 2,
      title: "Optimizing OCR Model Performance: A Comparative Study of Backbone Architectures and Hyperparameter Tuning",
      publisher: "CCIS, SPELLL Conference, 2024",
      description: "Authors: M Jeevitha, R DhanushKumar, S Harisudhan, GB Vishal, M Karthi, .... Published research on comparative study of backbone OCR models and tuning parameters for low-resource languages.",
      link: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=sNlZI-4AAAAJ&citation_for_view=sNlZI-4AAAAJ:d1gkVwhDpl0C",
      date: "2024"
    },
    {
      id: 3,
      title: "Payday loans--blessing or growth suppressor? Machine Learning Analysis",
      publisher: "arXiv preprint arXiv:2205.15320, 2022",
      description: "Authors: R Mahadevan, S Richard, KH Kumar, J Murugan, S Kannan, .... Applied machine learning techniques to analyze the financial and socioeconomic impact of payday lending.",
      link: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=sNlZI-4AAAAJ&citation_for_view=sNlZI-4AAAAJ:u-x6o8ySG0sC",
      date: "2022"
    }
  ],
  patents: [
    {
      id: 1,
      title: "Smart Sprinkler system : Leveraging Machine Learning and IoT for heat mapping",
      description: "Patented IoT-based smart irrigation system (Application: 202341052464) using ML algorithms and heat mapping to intelligently control sprinklers, optimizing water usage while ensuring effective coverage.",
      link: "",
      date: "2023"
    }
  ],
  blogs: []
};
