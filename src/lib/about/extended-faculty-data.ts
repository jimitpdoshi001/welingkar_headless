/**
 * Extended faculty lists (international / visiting / guest) per campus, from the
 * current site's pages at the same addresses (/<campus>/<type>-faculty).
 * Static until a Drupal source exists.
 */
import type { CdcMember } from "./cdc-data";

export type ExtendedFacultyType = "international" | "visiting" | "guest";
export type ExtendedFacultyCampus = "mumbai" | "bengaluru";
export type ExtendedFacultyPage = {
  campus: ExtendedFacultyCampus;
  type: ExtendedFacultyType;
  title: string;
  intro: string;
  members: CdcMember[];
};

export const EXTENDED_FACULTY: ExtendedFacultyPage[] = [
  {
    "campus": "mumbai",
    "type": "international",
    "title": "International Faculty",
    "intro": "Frequent visits by eminent international faculty have opened up students to global methodologies and best practices.",
    "members": [
      {
        "name": "Prof. Dr. V. Kumar",
        "designation": "Distinguished Term Professor, and Senior Fellow, Indian School of Business"
      },
      {
        "name": "Mr. Kazutera Kuroda",
        "designation": "Senior Consultant Japan Productivity Center and Chair of Global International Consulting"
      },
      {
        "name": "Matthew Breitfelder",
        "designation": "Partner and Global Head of Human Capital at Apollo Global Management"
      },
      {
        "name": "Prof. Sameer Deshpande",
        "designation": "Corporate Social Marketing,Griffith University, Australia"
      },
      {
        "name": "John Fernando",
        "designation": "MD at Accenture, Boston"
      },
      {
        "name": "Dr. Andy David",
        "designation": "Israel Consulate"
      },
      {
        "name": "Ms. Ruchi Aggarwal",
        "designation": "Head of Faculty of Business and Law, De Montfort University UK, Dubai campus"
      },
      {
        "name": "Mr. Gaurav Kumar",
        "designation": "Author, Mentor & Angel Investor,United States of America"
      },
      {
        "name": "Prof. Anette Strömberg",
        "designation": "The elephant in the room - Chat GPT, Malardalen University, Sweden"
      },
      {
        "name": "Prof. Christer Nygren",
        "designation": "The elephant in the room - Chat GPT, Malardalen University, Sweden"
      },
      {
        "name": "Prof. Bengt Gustafsson",
        "designation": "The elephant in the room - Chat GPT, Malardalen University, Sweden"
      },
      {
        "name": "Mr. Bhushan Soman",
        "designation": "IBM, Sweden"
      },
      {
        "name": "Prof. Ramesh Raskar",
        "designation": "Associate Professor at MIT Media Lab and directs the Camera Culture research group"
      },
      {
        "name": "Dr. Rainer Haas",
        "designation": "BOKU, Austria"
      }
    ]
  },
  {
    "campus": "mumbai",
    "type": "visiting",
    "title": "Visiting Faculty",
    "intro": "A well balanced mix of academicians and professionals with industry knowledge as well as years of experience behind them. Our Visiting faculty comprises:",
    "members": [
      {
        "name": "Abhay Warik",
        "designation": "Information Technology",
        "role": "Senior Consultant"
      },
      {
        "name": "Ajitabh Dutta",
        "designation": "Simplicity Communications",
        "role": "CEO"
      },
      {
        "name": "Anita Toshniwal",
        "designation": "Toshniwal Equities Services Private Limited",
        "role": "Director"
      },
      {
        "name": "Ankit Dani",
        "designation": "DSP Mutual Funds",
        "role": "Business Head - West - Passive Funds"
      },
      {
        "name": "Apurva Mankad",
        "designation": "WebXpress AI",
        "role": "Founder & CEO"
      },
      {
        "name": "Ashish Desai",
        "designation": "NCAER and ONDC Advisor",
        "role": "Sr Visiting Fellow- NCAER, Advisor- ONDC"
      },
      {
        "name": "Atin Roy",
        "designation": "Ogilvy",
        "role": "Senior Creative Director"
      },
      {
        "name": "Cajetan Dsouza",
        "designation": "RSD Hi Tech mumbai",
        "role": "Director"
      },
      {
        "name": "Chitra Chandrasekhar",
        "designation": "Kirthi Consultants P Ltd",
        "role": "Director"
      },
      {
        "name": "Debraj Sengupta",
        "designation": "Victorinox India P Ltd",
        "role": "CMO"
      },
      {
        "name": "Dr. Rahul Shah",
        "designation": "Skill Recognition and Learning Center of India",
        "role": "Founder"
      },
      {
        "name": "Durgesh Tinaikar",
        "designation": "Mizuho Bank Ltd.",
        "role": "Managing Director & Head - Corporate & Industrial Banking - India"
      },
      {
        "name": "Hamza Kazi",
        "designation": "Dharma Cornerstone Agency",
        "role": "Head of Music"
      },
      {
        "name": "Jayesh Deshmukh",
        "designation": "IndusInd Bank",
        "role": "Assistant VP2 & Sr. Product Manager"
      },
      {
        "name": "Kinnari Dave",
        "designation": "Shemaroo Entertainment Ltd.",
        "role": "DVP - Product & Innovation"
      },
      {
        "name": "Krishal Mehta",
        "designation": "BC Web Wise",
        "role": "VP Media"
      },
      {
        "name": "Mahendra Sadashiv Gupta",
        "designation": "Synergeze Consultants Pvt. Ltd. India",
        "role": "Sr. Vice President - Operations Consulting"
      },
      {
        "name": "Mayuresh Belsare",
        "designation": "South Asia FM Ltd",
        "role": "Client Solutions Specialist"
      },
      {
        "name": "Milan Modi",
        "designation": "Madison World",
        "role": "Deputy General Manager"
      },
      {
        "name": "Prakash Gehani",
        "designation": "Self Employed",
        "role": "Advocate"
      },
      {
        "name": "Priten Bangdiwala",
        "designation": "Aditya Birla Group",
        "role": "Joint President - Head Ind 4.0 and E-commerce Platforms"
      },
      {
        "name": "Puraskar Chakrabarti",
        "designation": "Department of Economics,University of Mumbai",
        "role": "Sr Research Fellow"
      },
      {
        "name": "Nishant Jaiswal",
        "designation": "Nexus day surgery centers pvt ltd",
        "role": "Director"
      },
      {
        "name": "Rohit Nair",
        "designation": "HayMarket",
        "role": "CMO"
      },
      {
        "name": "Rohit Pandharkar",
        "designation": "EY India",
        "role": "Partner, Technology Consulting"
      },
      {
        "name": "Santosh Minz",
        "designation": "Childline India Foundation",
        "role": "Head HR"
      },
      {
        "name": "Sushil Menon",
        "designation": "PD Hinduja Hospital and Medical Research center",
        "role": "Head- Marketing"
      },
      {
        "name": "Vartika Sethi",
        "designation": "Jewel Story",
        "role": "Founder-Sole Proprietor"
      },
      {
        "name": "Viswanathan R",
        "designation": "Reliance Industries Ltd",
        "role": "Sr. Gen. Manager - Business Process Mgt"
      },
      {
        "name": "Vivek Bhat",
        "designation": "Indian Molasses Co., Mumbai",
        "role": "General Manager"
      }
    ]
  },
  {
    "campus": "mumbai",
    "type": "guest",
    "title": "Guest Faculty",
    "intro": "Some of the corporate professionals who have engaged in guest lectures, knowledge sessions, seminars and conferences in our Mumbai and Bengaluru Campus are:",
    "members": [
      {
        "name": "Mr. Uttam Khobragade",
        "designation": "Senior Retired Officer of the Indian Administrative Service"
      },
      {
        "name": "Mr. Rohan Yagnik",
        "designation": "Cyber Security Consultant, Python Developer, Security Architect, Linux & AWS Solutions Architect"
      },
      {
        "name": "Prof. Raj Hirwani",
        "designation": "Emeritus Professor AcSIR, Adjunct Professor Desai Sethi School of Entrepreneurship, IIT Bombay"
      },
      {
        "name": "Dr. Anirban Sur",
        "designation": "Associate Professor, Symbiosis International University, Pune"
      },
      {
        "name": "Dr. Sharnil Pandya,",
        "designation": "Associate Professor, Symbiosis International University"
      },
      {
        "name": "Mr. Sourabh Bagrecha",
        "designation": "Software Engineer at MongoDB, Full Stack Developer, Blockchain Enthusiast"
      },
      {
        "name": "Mr. Harmeet Singh Kapoor",
        "designation": "AGM Supply Chain at L'Oréal"
      },
      {
        "name": "Mr. Rahul Deshak",
        "designation": "Plant Head, Saint Gobain, Uran"
      },
      {
        "name": "Padmashri Dr. Suresh Haware",
        "designation": "B.Sc. (1975) Nagpur University, B.Sc.Tech. (Chemical Technology, 1978), LIT-Nagpur, Nagpur University. Post Graduation Studies in Nuclear Engineering at BARC Training School, 1979. M.A. (History, 1990, Mumbai University). Ph.D. in Affordable Nano Housing"
      },
      {
        "name": "Mr Abhijit Mujumdar",
        "designation": "Director and Board member of the Association of Proposal Management Professionals"
      },
      {
        "name": "Mr. Dinesh Tilwani",
        "designation": "Category Head at VIP Industries Ltd"
      },
      {
        "name": "Mr. Anmol Dikshit",
        "designation": "Reliance Retail"
      },
      {
        "name": "Mr. Maruti Chapke",
        "designation": "Founder and Director Fresh produce value creation services pvt limited"
      },
      {
        "name": "Mr. Sanjeev Said",
        "designation": "Om Sai Nirmalya Nirmulan Kendra"
      },
      {
        "name": "Ms. Laxmi Maria Jenkins",
        "designation": "Partner Vigil Juris, Co-founder International Legal Alliance"
      },
      {
        "name": "Ms. Vidhi Shah",
        "designation": "Content & Brand Strategy Howl"
      },
      {
        "name": "Mr. Milind Shah",
        "designation": "Chief Business Officer LT Mindtree"
      }
    ]
  },
  {
    "campus": "bengaluru",
    "type": "international",
    "title": "International Faculty",
    "intro": "Frequent visits by eminent international faculty have opened up students to global methodologies and best practices.",
    "members": [
      {
        "name": "Dr. Stefan Wregler",
        "designation": "Professor of Marketing School of Business Administration, Germany"
      },
      {
        "name": "Dr. Bill Stroube",
        "designation": "Professor of Healthcare",
        "role": "University of Evansville"
      },
      {
        "name": "Mr. Ashish Mehta",
        "designation": "Managing Director APAC",
        "role": "International Institute of Business Analysis (IIBA)"
      },
      {
        "name": "Prof. Bjarne Hindersson",
        "designation": "Faculty members",
        "role": "Malardalen University, Sweden"
      },
      {
        "name": "Prof. Lasse Frank",
        "designation": "Faculty members",
        "role": "Malardalen University, Sweden"
      },
      {
        "name": "Prof. Farzaneh Ahmadzadeh",
        "designation": "Faculty members",
        "role": "Malardalen University, Sweden"
      },
      {
        "name": "Prof. Andrea Hvistendahl",
        "designation": "Faculty members",
        "role": "Malardalen University, Sweden"
      }
    ]
  },
  {
    "campus": "bengaluru",
    "type": "visiting",
    "title": "Visiting Faculty",
    "intro": "A well balanced mix of academicians and professionals with industry knowledge as well as years of experience behind them. Our Visiting faculty comprises:",
    "members": [
      {
        "name": "Prof. Kumar Saurabh",
        "designation": "Technology consultant, Data scientist",
        "role": "DXC Technology"
      },
      {
        "name": "Prof. Rajiv H",
        "designation": "Head, Data science",
        "role": "Manthan"
      },
      {
        "name": "Prof. Siddharth Pant",
        "designation": "Visiting Faculty – Analytics, Former Head Analytics",
        "role": "SG Analytics"
      },
      {
        "name": "Dr. Prathaap B Rao",
        "designation": "Social entrepreneur, Trainer",
        "role": "GroundReality Enterprises Pvt. Ltd"
      },
      {
        "name": "Prof. Indranil Saha",
        "designation": "Treasury and Trade Solutions: Corporate Banking (Local Corporates and Global MNCs) Citibank"
      },
      {
        "name": "Prof. Nandish Managi",
        "designation": "Service Delivery Manager",
        "role": "TATA Consultancy Services Limited"
      },
      {
        "name": "Dr. Kunal Saxena",
        "designation": "Administrative Director –Digital Marketing & GPS",
        "role": "Google India"
      },
      {
        "name": "Prof. Preeja Sreedhar",
        "designation": "Communication Coach, Behavioral Skill Trainer, OD Consultant"
      },
      {
        "name": "Prof. Deepa B Udasi",
        "designation": "Learning & Development Professional, Corporate Trainer"
      },
      {
        "name": "Prof. Nishanth B",
        "designation": "Founder Director / Founder Partner / Visiting faculty",
        "role": "RECTRIX Technologies (P) Ltd / XLYTICS (MS Excel Training Firm)"
      },
      {
        "name": "Aaditya Vidyarthi",
        "designation": "Head - APAC and Europe",
        "role": "PROLIM Global Corporation"
      },
      {
        "name": "Abhishek Jaiswal",
        "designation": "Digital Marketing Consultant",
        "role": "Digverve.com"
      },
      {
        "name": "Aditya Sapru",
        "designation": "Managing Director, Neumck Strategy & Advisory"
      },
      {
        "name": "Ajay M R",
        "designation": "Head, Mergers & Acquisitions",
        "role": "PricewaterhouseCoopers"
      },
      {
        "name": "Amit Gupta",
        "designation": "Co-Founder,Callidus Social Enterprises"
      },
      {
        "name": "Arun Nair",
        "designation": "Founding Partner",
        "role": "Strata Digital Consulting & Strategy"
      },
      {
        "name": "Johnson Pushpanathan",
        "designation": "Corporate Trainer, AI Practitioner and Trainer",
        "role": "FSI Infotech"
      },
      {
        "name": "Kinjal K Jain",
        "designation": "Trainer",
        "role": "Inlingua"
      },
      {
        "name": "Pallavi Bhadkamkar",
        "designation": "Founder, Principal consultant and Coach",
        "role": "Kalpak consulting"
      },
      {
        "name": "Poonam Namjoshi",
        "designation": "Freelance Trainer"
      },
      {
        "name": "Pratima Narayan",
        "designation": "Independent Legal Consultant"
      },
      {
        "name": "Rajeev Moothedath",
        "designation": "HR/ Learning consultant & Facilitator",
        "role": "Niche Learning Services"
      },
      {
        "name": "Ramesh Ranjan",
        "designation": "Founder &Chief Editor",
        "role": "Human Engineers"
      },
      {
        "name": "Sheela Krishna",
        "designation": "Independent Trainer and Visiting faculty"
      },
      {
        "name": "Prof. Swapnil Soni",
        "designation": "Senior Analyst, Infosys Limited"
      },
      {
        "name": "T Sivanandam",
        "designation": "Independent Consultant and Visiting faculty"
      },
      {
        "name": "Venkatesha Bhagavath",
        "designation": "Senior Consultant (Project Delivery)",
        "role": "Fisher Statistics Group, Edinburgh, Scotland [Working for SME]"
      },
      {
        "name": "Vidya Chira",
        "designation": "Trainer",
        "role": "Inlingua"
      },
      {
        "name": "C N Udaya Shankar",
        "designation": "Independent Consultant and Trainer"
      },
      {
        "name": "Debabratha Banerjee",
        "designation": "Independent Consultant and Visiting faculty"
      },
      {
        "name": "Kiran Steven",
        "designation": "Consultant, Talent Management & Organizational development",
        "role": "Continental Automotive India"
      },
      {
        "name": "Prabhakaran B",
        "designation": "Independent Business & Marketing Strategist"
      },
      {
        "name": "Rama Mylapore",
        "designation": "Trainer",
        "role": "Inlingua"
      },
      {
        "name": "Rishiraj Dasgupta",
        "designation": "Independent Consultant and Corporate Trainer"
      },
      {
        "name": "Santosh George",
        "designation": "Founder",
        "role": "Archangel HR Solutions, HR Consulting Firm"
      },
      {
        "name": "Shankar Thayumanavan",
        "designation": "Founder & Managing Partner,Senior Consultant & Leadership Coach, Founder & Managing Partner",
        "role": "Ash-Hubs Leadership Institute"
      },
      {
        "name": "Uma Madan",
        "designation": "Consultant Psychologist and Counsellor"
      },
      {
        "name": "Akhil M R",
        "designation": "Consultant",
        "role": "SDMS Management Consultants"
      },
      {
        "name": "Anand Parameswaran",
        "designation": "Founder",
        "role": "Beyonder Experiences"
      },
      {
        "name": "B V Manjunatha",
        "designation": "SBU Head/Vice President/COO",
        "role": "Hind High Vacuum Company Pvt. Ltd."
      },
      {
        "name": "Hemanth S Kumar",
        "designation": "Independent Trainer and Visiting faculty"
      },
      {
        "name": "Lokesh Venkatswamy",
        "designation": "Founder, Innomantra Consulting, Mysore; CEO and Strategic Adviser,The Desai group LLP USA."
      },
      {
        "name": "Rajesh Choudhary",
        "designation": "Founder",
        "role": "Margdarshi Skills Academy"
      },
      {
        "name": "Shravya K S",
        "designation": "Trainer",
        "role": "Inlingua"
      },
      {
        "name": "Sreenath S",
        "designation": "Associate Director : Productivity & Process improvement",
        "role": "Praxair Asia Inc"
      },
      {
        "name": "Hariprasad Shetty",
        "designation": "Independent Business Consultant"
      },
      {
        "name": "Jeeshan George",
        "designation": "Senior Business Manager",
        "role": "IBM"
      },
      {
        "name": "Kalyani Madan",
        "designation": "Trainer",
        "role": "Independent"
      },
      {
        "name": "Kavitha Bhosekar",
        "designation": "Trainer",
        "role": "Inlingua"
      },
      {
        "name": "M S Hiremath",
        "designation": "Project management consultant"
      },
      {
        "name": "Mahesh M V",
        "designation": "Consultant, Independent Visiting faculty"
      },
      {
        "name": "Mahesh Rao",
        "designation": "Independent Consultant"
      },
      {
        "name": "Narayan Hegde",
        "designation": "DGM - Operations",
        "role": "HGSL"
      },
      {
        "name": "Ramakrishna Srinivasan",
        "designation": "Independent Consultant"
      },
      {
        "name": "Santosh Mishra",
        "designation": "Independent Consultant"
      },
      {
        "name": "Satish Kumar",
        "designation": "Independent Trainer and Visiting faculty"
      },
      {
        "name": "Shivanand Nayak",
        "designation": "Chartered Accountant"
      },
      {
        "name": "Siddhesh Joglekar",
        "designation": "Associate VP, Marketing & Alliances",
        "role": "BYJU'S"
      },
      {
        "name": "Sujitesh Das",
        "designation": "Consultant, HR Strategy - Digital - Intelligence - Acceleration"
      },
      {
        "name": "Sundaresh Biligi",
        "designation": "Consultant, Strategic and Entrepreneurial Social businesses"
      },
      {
        "name": "Bijoe George",
        "designation": "Head-Digital Marketing",
        "role": "Cisco APJ at Cisco Systems"
      },
      {
        "name": "Satish K V",
        "designation": "Phoenix Mills"
      },
      {
        "name": "Kishore Mutalik Desai",
        "designation": "Delivery Manager, HCL Technologies Ltd"
      },
      {
        "name": "Prof. Nandini Saikia",
        "designation": "Strategic HR Business Partner, McAfee Inc"
      },
      {
        "name": "Prof. Narendra Babu B V",
        "designation": "Independent consultant, Visiting faculty"
      },
      {
        "name": "Prof. Deepak Hemadri",
        "designation": "Regional Leader (Asia & ANZ), Delivery Excellence, DXC Technology"
      },
      {
        "name": "Prof. Sachin Sharma",
        "designation": "Data Scientist, Walmart Labs"
      },
      {
        "name": "Prof. Madumita Mohanty",
        "designation": "Head – Retail Business, COMPETENCY DEVELOPMENT SERVICES"
      },
      {
        "name": "Prof. T V Thyagarajon",
        "designation": "Business Consultant, Coach & Mentor"
      },
      {
        "name": "Prof. Anand Narasimha",
        "designation": "Brand Consultant, Faculty in Marketing & Strategy"
      },
      {
        "name": "Prof. S V Subrahmanyam",
        "designation": "Independent consultant and trainer, Visiting faculty"
      },
      {
        "name": "Prof Jitendranath Patri",
        "designation": "Entrepreneur / Consultant"
      },
      {
        "name": "Prof. Sridevi",
        "designation": "Foreign Language trainer, FluenC Academy"
      },
      {
        "name": "Prof. Kausik Venkatesan",
        "designation": "Foreign Language trainer, FluenC Academy"
      },
      {
        "name": "Prof. Sukruta Prasad",
        "designation": "Foreign Language trainer, FluenC Academy"
      },
      {
        "name": "Prof. Puneet Kumar",
        "designation": "Visiting faculty - Business analytics"
      },
      {
        "name": "Prof. Lalit Ojha",
        "designation": "Independent consultant - Business analytics, Visiting faculty"
      },
      {
        "name": "Prof. Yogini Amar Kanhere",
        "designation": "Prof. Yogini Amar Kanhere"
      },
      {
        "name": "Prof. Nirmala S.V",
        "designation": "Foreign Language trainer, FluenC Academy"
      }
    ]
  },
  {
    "campus": "bengaluru",
    "type": "guest",
    "title": "Guest Faculty",
    "intro": "Some of the corporate professionals who have engaged in guest lectures, knowledge sessions, seminars and conferences in our Mumbai and Bengaluru Campus are:",
    "members": [
      {
        "name": "Preeja Sreedhar",
        "designation": "Communication Coach, Behavioral Skill Trainer, OD Consultant"
      },
      {
        "name": "Nandini Saikia",
        "designation": "Strategic HR Business Partner",
        "role": "McAfee India"
      },
      {
        "name": "Smitha Sankangoudar",
        "designation": "Sr. HR Manager",
        "role": "Honeywell Shared Services"
      },
      {
        "name": "Shivakumar Venkateswaran",
        "designation": "Chief Human Resources Officer",
        "role": "Indian Institute of Management Bangalore"
      },
      {
        "name": "Sharon Andrew-Rajkumar",
        "designation": "Director & Happiness Evangelist",
        "role": "Happiest Minds Technologies"
      },
      {
        "name": "Smitha Ranganathan",
        "designation": "Professor of Contemporary Marketing, Chief Storyteller",
        "role": "Brandlooms"
      },
      {
        "name": "Pavan Soni",
        "designation": "Innovation Evangelist; Founder",
        "role": "Inflexion Point"
      },
      {
        "name": "Prithvi Shergill",
        "designation": "Co Founder; Executive Partner",
        "role": "Tomorrow"
      },
      {
        "name": "Ganesh Chella",
        "designation": "Co-founder and Managing Director",
        "role": "CFI, India"
      },
      {
        "name": "Ashok Kumar",
        "designation": "CEO",
        "role": "RUBIXE.com"
      },
      {
        "name": "Aditya Sapru",
        "designation": "Managing Director",
        "role": "Neumck Strategy & Advisory"
      },
      {
        "name": "C S Venkatesh",
        "designation": "CEO",
        "role": "MetaCog Solutions"
      },
      {
        "name": "Kirron Bindu",
        "designation": "Principal",
        "role": "Mellon Capital"
      },
      {
        "name": "Manjula Dharmalingam",
        "designation": "Founder",
        "role": "Her Second Innings"
      },
      {
        "name": "Swapnil Tiwari",
        "designation": "Sociopreneur",
        "role": "Livemad Foundation"
      },
      {
        "name": "Ashish Mehta",
        "designation": "Managing Director APAC;",
        "role": "International Institute of Business Analysis (IIBA)"
      },
      {
        "name": "Aarif Aziz",
        "designation": "Head HR",
        "role": "GE Healthcare"
      },
      {
        "name": "Parabesh De",
        "designation": "Startup Engagement and Innovation Evangelist",
        "role": "Chief Manager at ICICI Bank"
      },
      {
        "name": "Rinku Kaul",
        "designation": "Managing Director - Talent Supply Chain",
        "role": "Accenture Services Pvt Ltd"
      },
      {
        "name": "M. Ram Naresh Yadav",
        "designation": "Managing Partner",
        "role": "DKK & Associates, Chartered Accountants"
      },
      {
        "name": "Prakash Khadam",
        "designation": "Senior Software Engineering Manager",
        "role": "Nvidia"
      },
      {
        "name": "Moses Chowdary",
        "designation": "Program Manager",
        "role": "EnAble India"
      },
      {
        "name": "Vasudevan Chinnathambi",
        "designation": "Co-Founder",
        "role": "Ninjacart"
      },
      {
        "name": "C Amarnath",
        "designation": "Emeritus Professor",
        "role": "IIT Bombay"
      },
      {
        "name": "Nameet M",
        "designation": "Director & Chief Production Head",
        "role": "First Agro"
      },
      {
        "name": "Surya Prakash Mohapatra",
        "designation": "Global Head- Talent Transformation",
        "role": "Wipro BPS"
      },
      {
        "name": "Rahul Dhawan",
        "designation": "Technical Analysis Expert",
        "role": "Stock Market Institute"
      },
      {
        "name": "Yashaswi Kumar",
        "designation": "Co-founder",
        "role": "Knappily"
      },
      {
        "name": "Ramesh Ranjan",
        "designation": "Founder &Chief Editor",
        "role": "www.humanengineers.com, an HR portal"
      },
      {
        "name": "Andrea Hvistendahl",
        "designation": "Lecturer - School of Innovation, Design and Engineering",
        "role": "Mälardalen University"
      },
      {
        "name": "Lakshmi Rangarajan",
        "designation": "Visiting Faculty & Consultant"
      }
    ]
  }
];

export function getExtendedFaculty(campus: ExtendedFacultyCampus, type: ExtendedFacultyType): ExtendedFacultyPage {
  return EXTENDED_FACULTY.find((p) => p.campus === campus && p.type === type)!;
}
