const branches = ['CSE', 'IT', 'ENTC', 'Mechanical', 'Civil', 'AI-DS'];

const languageList = ['English', 'Hindi', 'Marathi'];

const skillList = [
  {
    domain_id: 0,
    domain_name: 'Backend',
    skills: [
      {
        skill_id: 0,
        skill_name: 'Java',
      },
      {
        skill_id: 1,
        skill_name: 'Python',
      },
      {
        skill_id: 4,
        skill_name: 'PHP',
      },
      {
        skill_id: 5,
        skill_name: 'NodeJS',
      },
      {
        skill_id: 11,
        skill_name: 'Django',
      },
      {
        skill_id: 12,
        skill_name: 'Flask',
      },
      {
        skill_id: 13,
        skill_name: 'Spring',
      },
    ],
  },
  {
    domain_id: 1,
    domain_name: 'Frontend',
    skills: [
      {
        skill_id: 6,
        skill_name: 'React',
      },
      {
        skill_id: 7,
        skill_name: 'Angular',
      },
      {
        skill_id: 5,
        skill_name: 'NodeJS',
      },
      {
        skill_id: 8,
        skill_name: 'Vue',
      },
      {
        skill_id: 9,
        skill_name: 'HTML',
      },
      {
        skill_id: 10,
        skill_name: 'CSS',
      },
    ],
  },
];

const DB_skillsList = [
  {
    domain_id: 1,
    domain_name: '3D Modelling',
    skills: [
      {
        skill_id: 171,
        skill_name: 'autocad',
      },
      {
        skill_id: 192,
        skill_name: 'ansys',
      },
      {
        skill_id: 196,
        skill_name: 'creo',
      },
      {
        skill_id: 197,
        skill_name: 'catia',
      },
      {
        skill_id: 214,
        skill_name: 'abaqus',
      },
      {
        skill_id: 411,
        skill_name: 'ptc creo',
      },
    ],
  },
  {
    domain_id: 2,
    domain_name: 'Analytics and Visualization',
    skills: [
      {
        skill_id: 5,
        skill_name: 'microsoft office',
      },
      {
        skill_id: 50,
        skill_name: 'microsoft excel',
      },
      {
        skill_id: 54,
        skill_name: 'matlab',
      },
      {
        skill_id: 82,
        skill_name: 'microsoft power bi',
      },
      {
        skill_id: 109,
        skill_name: 'r',
      },
      {
        skill_id: 150,
        skill_name: 'spreadsheets',
      },
      {
        skill_id: 234,
        skill_name: 'elasticsearch',
      },
      {
        skill_id: 254,
        skill_name: 'matplotlib',
      },
      {
        skill_id: 295,
        skill_name: 'hadoop',
      },
      {
        skill_id: 297,
        skill_name: 'hive',
      },
      {
        skill_id: 370,
        skill_name: 'big data',
      },
      {
        skill_id: 438,
        skill_name: 'etl tools',
      },
      {
        skill_id: 456,
        skill_name: 'power bi',
      },
      {
        skill_id: 457,
        skill_name: 'alteryx',
      },
    ],
  },
  {
    domain_id: 3,
    domain_name: 'AR',
    skills: [
      {
        skill_id: 3,
        skill_name: 'c++',
      },
    ],
  },
  {
    domain_id: 4,
    domain_name: 'Artificial Intelligence',
    skills: [
      {
        skill_id: 1,
        skill_name: 'python',
      },
      {
        skill_id: 50,
        skill_name: 'microsoft excel',
      },
      {
        skill_id: 54,
        skill_name: 'matlab',
      },
      {
        skill_id: 105,
        skill_name: 'ruby',
      },
      {
        skill_id: 109,
        skill_name: 'r',
      },
      {
        skill_id: 190,
        skill_name: 'artificial intelligence',
      },
      {
        skill_id: 433,
        skill_name: 'neural networks',
      },
    ],
  },
  {
    domain_id: 5,
    domain_name: 'Arts',
    skills: [
      {
        skill_id: 23,
        skill_name: 'public speaking',
      },
      {
        skill_id: 75,
        skill_name: 'photography',
      },
      {
        skill_id: 95,
        skill_name: 'painting',
      },
      {
        skill_id: 124,
        skill_name: 'poetry',
      },
      {
        skill_id: 213,
        skill_name: 'cooking',
      },
      {
        skill_id: 228,
        skill_name: 'report writing',
      },
      {
        skill_id: 241,
        skill_name: 'video editing',
      },
      {
        skill_id: 255,
        skill_name: 'sketching',
      },
      {
        skill_id: 293,
        skill_name: 'dance',
      },
      {
        skill_id: 443,
        skill_name: 'music',
      },
      {
        skill_id: 444,
        skill_name: 'singing',
      },
    ],
  },
  {
    domain_id: 6,
    domain_name: 'Assembly Programming. Robotics',
    skills: [
      {
        skill_id: 6,
        skill_name: 'c',
      },
      {
        skill_id: 420,
        skill_name: 'uipath',
      },
      {
        skill_id: 479,
        skill_name: 'robot operating system (ros)',
      },
    ],
  },
  {
    domain_id: 7,
    domain_name: 'Automation',
    skills: [
      {
        skill_id: 100,
        skill_name: 'maven',
      },
      {
        skill_id: 169,
        skill_name: 'ansible',
      },
      {
        skill_id: 261,
        skill_name: 'jenkins',
      },
      {
        skill_id: 441,
        skill_name: 'appium',
      },
      {
        skill_id: 486,
        skill_name: 'home automation',
      },
    ],
  },
  {
    domain_id: 8,
    domain_name: 'Backend',
    skills: [
      {
        skill_id: 1,
        skill_name: 'python',
      },
      {
        skill_id: 9,
        skill_name: 'flask',
      },
      {
        skill_id: 11,
        skill_name: 'firebase',
      },
      {
        skill_id: 12,
        skill_name: 'java',
      },
      {
        skill_id: 13,
        skill_name: 'javascript',
      },
      {
        skill_id: 17,
        skill_name: 'c#',
      },
      {
        skill_id: 21,
        skill_name: 'sql',
      },
      {
        skill_id: 30,
        skill_name: 'django',
      },
      {
        skill_id: 37,
        skill_name: 'node.js',
      },
      {
        skill_id: 62,
        skill_name: 'spring',
      },
      {
        skill_id: 63,
        skill_name: 'php',
      },
      {
        skill_id: 68,
        skill_name: 'microservices',
      },
      {
        skill_id: 73,
        skill_name: 'typescript',
      },
      {
        skill_id: 74,
        skill_name: 'databases',
      },
      {
        skill_id: 105,
        skill_name: 'ruby',
      },
      {
        skill_id: 121,
        skill_name: 'express.js',
      },
      {
        skill_id: 160,
        skill_name: 'hibernate',
      },
      {
        skill_id: 163,
        skill_name: 'json',
      },
      {
        skill_id: 204,
        skill_name: 'phpmyadmin',
      },
      {
        skill_id: 208,
        skill_name: 'mainframe',
      },
      {
        skill_id: 217,
        skill_name: 'struts',
      },
      {
        skill_id: 223,
        skill_name: 'ecmascript',
      },
      {
        skill_id: 226,
        skill_name: 'javaserver pages (jsp)',
      },
      {
        skill_id: 259,
        skill_name: 'sqlite',
      },
      {
        skill_id: 263,
        skill_name: 'graphql',
      },
      {
        skill_id: 276,
        skill_name: 'mongoose odm',
      },
      {
        skill_id: 355,
        skill_name: 'apache',
      },
      {
        skill_id: 375,
        skill_name: 'xml',
      },
      {
        skill_id: 383,
        skill_name: 'xampp',
      },
      {
        skill_id: 386,
        skill_name: 'npm',
      },
      {
        skill_id: 431,
        skill_name: 'jpa',
      },
      {
        skill_id: 447,
        skill_name: 'phpunit',
      },
    ],
  },
  {
    domain_id: 9,
    domain_name: 'Blockchain',
    skills: [],
  },
  {
    domain_id: 10,
    domain_name: 'Business',
    skills: [
      {
        skill_id: 5,
        skill_name: 'microsoft office',
      },
      {
        skill_id: 24,
        skill_name: 'leadership',
      },
      {
        skill_id: 47,
        skill_name: 'teamwork',
      },
      {
        skill_id: 131,
        skill_name: 'product development',
      },
      {
        skill_id: 135,
        skill_name: 'time management',
      },
      {
        skill_id: 148,
        skill_name: 'equity trading',
      },
      {
        skill_id: 151,
        skill_name: 'planning',
      },
      {
        skill_id: 207,
        skill_name: 'cobol',
      },
      {
        skill_id: 279,
        skill_name: 'operations management',
      },
      {
        skill_id: 378,
        skill_name: 'equity derivatives',
      },
      {
        skill_id: 380,
        skill_name: 'product design',
      },
      {
        skill_id: 403,
        skill_name: 'negotiation',
      },
      {
        skill_id: 405,
        skill_name: 'brand management',
      },
      {
        skill_id: 415,
        skill_name: 'market research',
      },
      {
        skill_id: 457,
        skill_name: 'alteryx',
      },
    ],
  },
  {
    domain_id: 11,
    domain_name: 'Business Intelligence',
    skills: [
      {
        skill_id: 82,
        skill_name: 'microsoft power bi',
      },
      {
        skill_id: 456,
        skill_name: 'power bi',
      },
      {
        skill_id: 457,
        skill_name: 'alteryx',
      },
    ],
  },
  {
    domain_id: 12,
    domain_name: 'Competitive',
    skills: [
      {
        skill_id: 1,
        skill_name: 'python',
      },
      {
        skill_id: 3,
        skill_name: 'c++',
      },
      {
        skill_id: 6,
        skill_name: 'c',
      },
      {
        skill_id: 12,
        skill_name: 'java',
      },
      {
        skill_id: 13,
        skill_name: 'javascript',
      },
      {
        skill_id: 108,
        skill_name: 'problem solving',
      },
      {
        skill_id: 128,
        skill_name: 'algorithms',
      },
      {
        skill_id: 252,
        skill_name: 'programming',
      },
    ],
  },
  {
    domain_id: 13,
    domain_name: 'Computer Network',
    skills: [
      {
        skill_id: 33,
        skill_name: 'distributed systems',
      },
      {
        skill_id: 163,
        skill_name: 'json',
      },
      {
        skill_id: 209,
        skill_name: 'networking',
      },
      {
        skill_id: 211,
        skill_name: 'network administration',
      },
      {
        skill_id: 266,
        skill_name: 'network security',
      },
      {
        skill_id: 342,
        skill_name: 'soap',
      },
      {
        skill_id: 475,
        skill_name: 'signal processing',
      },
    ],
  },
  {
    domain_id: 14,
    domain_name: 'Consulting',
    skills: [
      {
        skill_id: 466,
        skill_name: 'training',
      },
      {
        skill_id: 478,
        skill_name: 'recruiting',
      },
      {
        skill_id: 480,
        skill_name: 'technical recruiting',
      },
    ],
  },
  {
    domain_id: 15,
    domain_name: 'Content',
    skills: [
      {
        skill_id: 5,
        skill_name: 'microsoft office',
      },
      {
        skill_id: 19,
        skill_name: 'microsoft word',
      },
      {
        skill_id: 79,
        skill_name: 'wordpress',
      },
      {
        skill_id: 124,
        skill_name: 'poetry',
      },
      {
        skill_id: 228,
        skill_name: 'report writing',
      },
      {
        skill_id: 251,
        skill_name: 'writing',
      },
      {
        skill_id: 271,
        skill_name: 'presentations',
      },
      {
        skill_id: 317,
        skill_name: 'technical writing',
      },
      {
        skill_id: 436,
        skill_name: 'transform',
      },
    ],
  },
  {
    domain_id: 16,
    domain_name: 'Cross Platform ',
    skills: [
      {
        skill_id: 96,
        skill_name: 'react native',
      },
      {
        skill_id: 178,
        skill_name: 'flutter',
      },
    ],
  },
  {
    domain_id: 17,
    domain_name:
      'Customer Relationship Management CRM and Enterprise Relationship management ERP',
    skills: [
      {
        skill_id: 98,
        skill_name: 'salesforce',
      },
    ],
  },
  {
    domain_id: 18,
    domain_name: 'Cybersecurity',
    skills: [
      {
        skill_id: 182,
        skill_name: 'penetration testing',
      },
      {
        skill_id: 266,
        skill_name: 'network security',
      },
      {
        skill_id: 389,
        skill_name: 'ethical hacking',
      },
    ],
  },
  {
    domain_id: 19,
    domain_name: 'Data Science',
    skills: [
      {
        skill_id: 50,
        skill_name: 'microsoft excel',
      },
      {
        skill_id: 54,
        skill_name: 'matlab',
      },
      {
        skill_id: 82,
        skill_name: 'microsoft power bi',
      },
      {
        skill_id: 105,
        skill_name: 'ruby',
      },
      {
        skill_id: 109,
        skill_name: 'r',
      },
      {
        skill_id: 114,
        skill_name: 'keras',
      },
      {
        skill_id: 115,
        skill_name: 'pandas',
      },
      {
        skill_id: 117,
        skill_name: 'numpy',
      },
      {
        skill_id: 118,
        skill_name: 'deep learning',
      },
      {
        skill_id: 123,
        skill_name: 'tableau',
      },
      {
        skill_id: 150,
        skill_name: 'spreadsheets',
      },
      {
        skill_id: 286,
        skill_name: 'rapidminer',
      },
      {
        skill_id: 376,
        skill_name: 'rstudio',
      },
      {
        skill_id: 456,
        skill_name: 'power bi',
      },
    ],
  },
  {
    domain_id: 20,
    domain_name: 'DataBases',
    skills: [
      {
        skill_id: 3,
        skill_name: 'c++',
      },
      {
        skill_id: 7,
        skill_name: 'mongodb',
      },
      {
        skill_id: 21,
        skill_name: 'sql',
      },
      {
        skill_id: 26,
        skill_name: 'mysql',
      },
      {
        skill_id: 71,
        skill_name: 'microsoft sql server',
      },
      {
        skill_id: 104,
        skill_name: 'postgresql',
      },
      {
        skill_id: 127,
        skill_name: 'data mining',
      },
      {
        skill_id: 167,
        skill_name: 'nosql',
      },
      {
        skill_id: 203,
        skill_name: 'pl/sql',
      },
      {
        skill_id: 204,
        skill_name: 'phpmyadmin',
      },
      {
        skill_id: 245,
        skill_name: 'rdbms',
      },
      {
        skill_id: 264,
        skill_name: 'oracle sql',
      },
      {
        skill_id: 278,
        skill_name: 'oracle database',
      },
      {
        skill_id: 374,
        skill_name: 'pyspark',
      },
      {
        skill_id: 393,
        skill_name: 'cassandra',
      },
      {
        skill_id: 437,
        skill_name: 'load (etl)',
      },
    ],
  },
  {
    domain_id: 21,
    domain_name: 'Designer',
    skills: [
      {
        skill_id: 241,
        skill_name: 'video editing',
      },
      {
        skill_id: 308,
        skill_name: 'photoshop',
      },
      {
        skill_id: 332,
        skill_name: 'wondershare filmora',
      },
      {
        skill_id: 361,
        skill_name: 'poster design',
      },
      {
        skill_id: 363,
        skill_name: 'logo design',
      },
    ],
  },
  {
    domain_id: 22,
    domain_name: 'DevOps/Cloud',
    skills: [
      {
        skill_id: 34,
        skill_name: 'cloud computing',
      },
      {
        skill_id: 38,
        skill_name: 'docker',
      },
      {
        skill_id: 66,
        skill_name: 'kubernetes',
      },
      {
        skill_id: 68,
        skill_name: 'microservices',
      },
      {
        skill_id: 78,
        skill_name: 'microsoft azure',
      },
      {
        skill_id: 107,
        skill_name: 'gitlab',
      },
      {
        skill_id: 122,
        skill_name: 'google cloud platform (gcp)',
      },
      {
        skill_id: 159,
        skill_name: 'restful webservices',
      },
      {
        skill_id: 208,
        skill_name: 'mainframe',
      },
      {
        skill_id: 296,
        skill_name: 'google bigquery',
      },
      {
        skill_id: 311,
        skill_name: 'tfs',
      },
      {
        skill_id: 358,
        skill_name: 'mulesoft cloudhub',
      },
      {
        skill_id: 366,
        skill_name: 'cloud storage',
      },
      {
        skill_id: 392,
        skill_name: 'webpack',
      },
      {
        skill_id: 424,
        skill_name: 'terraform',
      },
      {
        skill_id: 473,
        skill_name: 'snowflake',
      },
    ],
  },
  {
    domain_id: 23,
    domain_name: 'DSA',
    skills: [
      {
        skill_id: 108,
        skill_name: 'problem solving',
      },
      {
        skill_id: 128,
        skill_name: 'algorithms',
      },
      {
        skill_id: 145,
        skill_name: 'data structures',
      },
      {
        skill_id: 252,
        skill_name: 'programming',
      },
    ],
  },
  {
    domain_id: 24,
    domain_name: 'Educator',
    skills: [
      {
        skill_id: 5,
        skill_name: 'microsoft office',
      },
      {
        skill_id: 46,
        skill_name: 'teaching',
      },
      {
        skill_id: 69,
        skill_name: 'research',
      },
    ],
  },
  {
    domain_id: 25,
    domain_name: 'Electronics',
    skills: [
      {
        skill_id: 1,
        skill_name: 'python',
      },
      {
        skill_id: 3,
        skill_name: 'c++',
      },
      {
        skill_id: 18,
        skill_name: 'machine learning',
      },
      {
        skill_id: 20,
        skill_name: 'computer vision',
      },
      {
        skill_id: 50,
        skill_name: 'microsoft excel',
      },
      {
        skill_id: 53,
        skill_name: 'pcb design',
      },
      {
        skill_id: 54,
        skill_name: 'matlab',
      },
      {
        skill_id: 101,
        skill_name: 'tensorflow',
      },
      {
        skill_id: 105,
        skill_name: 'ruby',
      },
      {
        skill_id: 109,
        skill_name: 'r',
      },
      {
        skill_id: 175,
        skill_name: 'proteus',
      },
      {
        skill_id: 201,
        skill_name: 'simulations',
      },
      {
        skill_id: 286,
        skill_name: 'rapidminer',
      },
      {
        skill_id: 328,
        skill_name: 'systemverilog',
      },
      {
        skill_id: 433,
        skill_name: 'neural networks',
      },
    ],
  },
  {
    domain_id: 26,
    domain_name: 'Embedded Systems',
    skills: [
      {
        skill_id: 6,
        skill_name: 'c',
      },
      {
        skill_id: 12,
        skill_name: 'java',
      },
    ],
  },
  {
    domain_id: 27,
    domain_name: 'Entrepreneur',
    skills: [
      {
        skill_id: 290,
        skill_name: 'start-ups',
      },
    ],
  },
  {
    domain_id: 28,
    domain_name: 'Finance',
    skills: [
      {
        skill_id: 3,
        skill_name: 'c++',
      },
      {
        skill_id: 50,
        skill_name: 'microsoft excel',
      },
      {
        skill_id: 150,
        skill_name: 'spreadsheets',
      },
      {
        skill_id: 207,
        skill_name: 'cobol',
      },
      {
        skill_id: 240,
        skill_name: 'financial analysis',
      },
      {
        skill_id: 301,
        skill_name: 'cryptocurrency',
      },
    ],
  },
  {
    domain_id: 29,
    domain_name: 'Frontend',
    skills: [
      {
        skill_id: 1,
        skill_name: 'python',
      },
      {
        skill_id: 2,
        skill_name: 'html',
      },
      {
        skill_id: 4,
        skill_name: 'css',
      },
      {
        skill_id: 13,
        skill_name: 'javascript',
      },
      {
        skill_id: 17,
        skill_name: 'c#',
      },
      {
        skill_id: 48,
        skill_name: 'jquery',
      },
      {
        skill_id: 73,
        skill_name: 'typescript',
      },
      {
        skill_id: 96,
        skill_name: 'react native',
      },
      {
        skill_id: 178,
        skill_name: 'flutter',
      },
      {
        skill_id: 191,
        skill_name: 'dart',
      },
      {
        skill_id: 218,
        skill_name: 'ajax',
      },
      {
        skill_id: 220,
        skill_name: 'laravel',
      },
      {
        skill_id: 221,
        skill_name: 'react',
      },
      {
        skill_id: 223,
        skill_name: 'ecmascript',
      },
      {
        skill_id: 312,
        skill_name: 'highcharts',
      },
      {
        skill_id: 329,
        skill_name: 'unity',
      },
      {
        skill_id: 341,
        skill_name: 'scss',
      },
      {
        skill_id: 369,
        skill_name: 'next.js',
      },
      {
        skill_id: 386,
        skill_name: 'npm',
      },
      {
        skill_id: 388,
        skill_name: 'babel.js',
      },
      {
        skill_id: 423,
        skill_name: 'ionic framework',
      },
      {
        skill_id: 449,
        skill_name: 'codeigniter',
      },
      {
        skill_id: 488,
        skill_name: 'd3.js',
      },
    ],
  },
  {
    domain_id: 30,
    domain_name: 'Full Stack',
    skills: [
      {
        skill_id: 144,
        skill_name: 'mern stack',
      },
      {
        skill_id: 179,
        skill_name: 'mean stack',
      },
      {
        skill_id: 448,
        skill_name: 'lamp',
      },
    ],
  },
  {
    domain_id: 31,
    domain_name: 'Game development',
    skills: [
      {
        skill_id: 3,
        skill_name: 'c++',
      },
      {
        skill_id: 17,
        skill_name: 'c#',
      },
      {
        skill_id: 329,
        skill_name: 'unity',
      },
    ],
  },
  {
    domain_id: 32,
    domain_name: 'Graphic Design',
    skills: [
      {
        skill_id: 56,
        skill_name: 'simulink',
      },
      {
        skill_id: 81,
        skill_name: 'adobe photoshop',
      },
      {
        skill_id: 282,
        skill_name: 'tkinter',
      },
      {
        skill_id: 308,
        skill_name: 'photoshop',
      },
      {
        skill_id: 363,
        skill_name: 'logo design',
      },
      {
        skill_id: 417,
        skill_name: 'coral draw',
      },
    ],
  },
  {
    domain_id: 33,
    domain_name: 'Hardware',
    skills: [
      {
        skill_id: 206,
        skill_name: 'microcontrollers',
      },
    ],
  },
  {
    domain_id: 34,
    domain_name: 'Human Resource Management',
    skills: [
      {
        skill_id: 215,
        skill_name: 'human resources (hr)',
      },
    ],
  },
  {
    domain_id: 35,
    domain_name: 'IOT',
    skills: [
      {
        skill_id: 3,
        skill_name: 'c++',
      },
      {
        skill_id: 12,
        skill_name: 'java',
      },
      {
        skill_id: 367,
        skill_name: 'raspberry pi',
      },
    ],
  },
  {
    domain_id: 36,
    domain_name: 'Low Code',
    skills: [],
  },
  {
    domain_id: 37,
    domain_name: 'Machine Learning',
    skills: [
      {
        skill_id: 1,
        skill_name: 'python',
      },
      {
        skill_id: 3,
        skill_name: 'c++',
      },
      {
        skill_id: 18,
        skill_name: 'machine learning',
      },
      {
        skill_id: 20,
        skill_name: 'computer vision',
      },
      {
        skill_id: 50,
        skill_name: 'microsoft excel',
      },
      {
        skill_id: 54,
        skill_name: 'matlab',
      },
      {
        skill_id: 101,
        skill_name: 'tensorflow',
      },
      {
        skill_id: 105,
        skill_name: 'ruby',
      },
      {
        skill_id: 109,
        skill_name: 'r',
      },
      {
        skill_id: 115,
        skill_name: 'pandas',
      },
      {
        skill_id: 117,
        skill_name: 'numpy',
      },
      {
        skill_id: 150,
        skill_name: 'spreadsheets',
      },
      {
        skill_id: 237,
        skill_name: 'opencv',
      },
      {
        skill_id: 286,
        skill_name: 'rapidminer',
      },
      {
        skill_id: 381,
        skill_name: 'seaborn',
      },
      {
        skill_id: 433,
        skill_name: 'neural networks',
      },
    ],
  },
  {
    domain_id: 38,
    domain_name: 'Management',
    skills: [
      {
        skill_id: 5,
        skill_name: 'microsoft office',
      },
      {
        skill_id: 16,
        skill_name: 'management',
      },
      {
        skill_id: 24,
        skill_name: 'leadership',
      },
      {
        skill_id: 47,
        skill_name: 'teamwork',
      },
      {
        skill_id: 79,
        skill_name: 'wordpress',
      },
      {
        skill_id: 113,
        skill_name: 'event planning',
      },
      {
        skill_id: 131,
        skill_name: 'product development',
      },
      {
        skill_id: 133,
        skill_name: 'team building',
      },
      {
        skill_id: 135,
        skill_name: 'time management',
      },
      {
        skill_id: 141,
        skill_name: 'event management',
      },
      {
        skill_id: 151,
        skill_name: 'planning',
      },
      {
        skill_id: 205,
        skill_name: 'strategy',
      },
      {
        skill_id: 243,
        skill_name: 'presentation skills',
      },
      {
        skill_id: 279,
        skill_name: 'operations management',
      },
      {
        skill_id: 352,
        skill_name: 'slack',
      },
      {
        skill_id: 380,
        skill_name: 'product design',
      },
      {
        skill_id: 394,
        skill_name: 'soft skills',
      },
      {
        skill_id: 403,
        skill_name: 'negotiation',
      },
    ],
  },
  {
    domain_id: 46,
    domain_name: 'Marketing',
    skills: [
      {
        skill_id: 5,
        skill_name: 'microsoft office',
      },
      {
        skill_id: 15,
        skill_name: 'microsoft powerpoint',
      },
      {
        skill_id: 19,
        skill_name: 'microsoft word',
      },
      {
        skill_id: 80,
        skill_name: 'google analytics',
      },
      {
        skill_id: 151,
        skill_name: 'planning',
      },
      {
        skill_id: 210,
        skill_name: 'powerpoint',
      },
      {
        skill_id: 216,
        skill_name: 'online marketing',
      },
      {
        skill_id: 243,
        skill_name: 'presentation skills',
      },
      {
        skill_id: 291,
        skill_name: 'product marketing',
      },
      {
        skill_id: 302,
        skill_name: 'advertising',
      },
      {
        skill_id: 303,
        skill_name: 'online advertising',
      },
      {
        skill_id: 327,
        skill_name: 'google ads',
      },
      {
        skill_id: 402,
        skill_name: 'lead generation',
      },
      {
        skill_id: 405,
        skill_name: 'brand management',
      },
      {
        skill_id: 414,
        skill_name: 'media marketing',
      },
      {
        skill_id: 464,
        skill_name: 'campaign management',
      },
      {
        skill_id: 477,
        skill_name: 'microsoft outlook',
      },
    ],
  },
  {
    domain_id: 39,
    domain_name: 'Mechanical',
    skills: [
      {
        skill_id: 194,
        skill_name: 'mechanical engineering',
      },
      {
        skill_id: 195,
        skill_name: 'solidworks',
      },
      {
        skill_id: 416,
        skill_name: 'automotive',
      },
    ],
  },
  {
    domain_id: 40,
    domain_name: 'Mobile App',
    skills: [
      {
        skill_id: 12,
        skill_name: 'java',
      },
      {
        skill_id: 28,
        skill_name: 'android development',
      },
      {
        skill_id: 65,
        skill_name: 'mockito',
      },
      {
        skill_id: 96,
        skill_name: 'react native',
      },
      {
        skill_id: 139,
        skill_name: 'objective c',
      },
      {
        skill_id: 143,
        skill_name: 'ios development',
      },
      {
        skill_id: 338,
        skill_name: 'kotlin',
      },
      {
        skill_id: 375,
        skill_name: 'xml',
      },
    ],
  },
  {
    domain_id: 41,
    domain_name: 'Networking',
    skills: [
      {
        skill_id: 23,
        skill_name: 'public speaking',
      },
      {
        skill_id: 24,
        skill_name: 'leadership',
      },
      {
        skill_id: 189,
        skill_name: 'volunteering',
      },
      {
        skill_id: 212,
        skill_name: 'interpersonal skills',
      },
      {
        skill_id: 230,
        skill_name: 'social work',
      },
      {
        skill_id: 243,
        skill_name: 'presentation skills',
      },
      {
        skill_id: 323,
        skill_name: 'ethics',
      },
      {
        skill_id: 465,
        skill_name: 'relationship building',
      },
      {
        skill_id: 466,
        skill_name: 'training',
      },
    ],
  },
  {
    domain_id: 42,
    domain_name: 'No code',
    skills: [
      {
        skill_id: 348,
        skill_name: 'technical support',
      },
    ],
  },
  {
    domain_id: 43,
    domain_name: 'Operating System',
    skills: [
      {
        skill_id: 97,
        skill_name: 'linux',
      },
      {
        skill_id: 307,
        skill_name: 'unix',
      },
    ],
  },
  {
    domain_id: 44,
    domain_name: 'Operations',
    skills: [],
  },
  {
    domain_id: 45,
    domain_name: 'Risk Management',
    skills: [
      {
        skill_id: 185,
        skill_name: 'scrum',
      },
    ],
  },
  {
    domain_id: 47,
    domain_name: 'Shell',
    skills: [
      {
        skill_id: 186,
        skill_name: 'bash',
      },
      {
        skill_id: 232,
        skill_name: 'shell scripting',
      },
      {
        skill_id: 460,
        skill_name: 'tortoise svn',
      },
    ],
  },
  {
    domain_id: 48,
    domain_name: 'Simulation',
    skills: [
      {
        skill_id: 54,
        skill_name: 'matlab',
      },
      {
        skill_id: 192,
        skill_name: 'ansys',
      },
      {
        skill_id: 199,
        skill_name: 'ni multisim',
      },
      {
        skill_id: 410,
        skill_name: 'multisim',
      },
      {
        skill_id: 428,
        skill_name: 'msc adams',
      },
    ],
  },
  {
    domain_id: 49,
    domain_name: 'Software development',
    skills: [
      {
        skill_id: 1,
        skill_name: 'python',
      },
      {
        skill_id: 12,
        skill_name: 'java',
      },
      {
        skill_id: 17,
        skill_name: 'c#',
      },
      {
        skill_id: 62,
        skill_name: 'spring',
      },
      {
        skill_id: 65,
        skill_name: 'mockito',
      },
      {
        skill_id: 100,
        skill_name: 'maven',
      },
      {
        skill_id: 105,
        skill_name: 'ruby',
      },
      {
        skill_id: 110,
        skill_name: 'go',
      },
      {
        skill_id: 165,
        skill_name: 'pycharm',
      },
      {
        skill_id: 177,
        skill_name: 'julia',
      },
      {
        skill_id: 204,
        skill_name: 'phpmyadmin',
      },
      {
        skill_id: 222,
        skill_name: 'java swing',
      },
      {
        skill_id: 235,
        skill_name: 'solr',
      },
      {
        skill_id: 326,
        skill_name: 'visual studio',
      },
      {
        skill_id: 329,
        skill_name: 'unity',
      },
      {
        skill_id: 337,
        skill_name: 'microsoft visual studio code',
      },
      {
        skill_id: 356,
        skill_name: 'mule esb',
      },
      {
        skill_id: 357,
        skill_name: 'mulesoft anypoint platform',
      },
      {
        skill_id: 358,
        skill_name: 'mulesoft cloudhub',
      },
      {
        skill_id: 374,
        skill_name: 'pyspark',
      },
      {
        skill_id: 432,
        skill_name: 'tomcat',
      },
      {
        skill_id: 447,
        skill_name: 'phpunit',
      },
      {
        skill_id: 451,
        skill_name: 'mplab',
      },
      {
        skill_id: 452,
        skill_name: 'groovy',
      },
      {
        skill_id: 472,
        skill_name: 'scala',
      },
    ],
  },
  {
    domain_id: 50,
    domain_name: 'Software Engineering',
    skills: [
      {
        skill_id: 22,
        skill_name: 'git',
      },
      {
        skill_id: 25,
        skill_name: 'jira',
      },
      {
        skill_id: 49,
        skill_name: 'github',
      },
      {
        skill_id: 131,
        skill_name: 'product development',
      },
      {
        skill_id: 162,
        skill_name: 'agile',
      },
      {
        skill_id: 166,
        skill_name: 'model-view-controller (mvc)',
      },
      {
        skill_id: 184,
        skill_name: 'trello',
      },
      {
        skill_id: 185,
        skill_name: 'scrum',
      },
      {
        skill_id: 227,
        skill_name: 'version control',
      },
      {
        skill_id: 229,
        skill_name: 'documentation',
      },
      {
        skill_id: 239,
        skill_name: 'object-oriented programming (oop)',
      },
      {
        skill_id: 313,
        skill_name: 'six sigma',
      },
      {
        skill_id: 352,
        skill_name: 'slack',
      },
      {
        skill_id: 380,
        skill_name: 'product design',
      },
      {
        skill_id: 384,
        skill_name: 'quality assurance',
      },
      {
        skill_id: 437,
        skill_name: 'load (etl)',
      },
      {
        skill_id: 450,
        skill_name: 'mvc',
      },
      {
        skill_id: 467,
        skill_name: 'root cause analysis',
      },
    ],
  },
  {
    domain_id: 51,
    domain_name: 'Spoken Languages',
    skills: [
      {
        skill_id: 112,
        skill_name: 'english',
      },
      {
        skill_id: 202,
        skill_name: 'german',
      },
      {
        skill_id: 248,
        skill_name: 'japanese',
      },
      {
        skill_id: 249,
        skill_name: 'hindi',
      },
      {
        skill_id: 250,
        skill_name: 'marathi',
      },
      {
        skill_id: 445,
        skill_name: 'french',
      },
    ],
  },
  {
    domain_id: 52,
    domain_name: 'Sports',
    skills: [
      {
        skill_id: 292,
        skill_name: 'football',
      },
    ],
  },
  {
    domain_id: 53,
    domain_name: 'Subject Knowledge',
    skills: [],
  },
  {
    domain_id: 54,
    domain_name: 'Testing/debugger',
    skills: [
      {
        skill_id: 59,
        skill_name: 'junit',
      },
      {
        skill_id: 246,
        skill_name: 'cypress',
      },
      {
        skill_id: 268,
        skill_name: 'test automation',
      },
      {
        skill_id: 280,
        skill_name: 'selenium',
      },
      {
        skill_id: 375,
        skill_name: 'xml',
      },
      {
        skill_id: 387,
        skill_name: 'jest',
      },
      {
        skill_id: 441,
        skill_name: 'appium',
      },
      {
        skill_id: 442,
        skill_name: 'sonarqube',
      },
      {
        skill_id: 447,
        skill_name: 'phpunit',
      },
      {
        skill_id: 462,
        skill_name: 'jmeter',
      },
    ],
  },
  {
    domain_id: 55,
    domain_name: 'UI/UX',
    skills: [
      {
        skill_id: 247,
        skill_name: 'web design',
      },
      {
        skill_id: 360,
        skill_name: 'adobe xd',
      },
      {
        skill_id: 470,
        skill_name: 'figma',
      },
    ],
  },
  {
    domain_id: 56,
    domain_name: 'VR',
    skills: [
      {
        skill_id: 3,
        skill_name: 'c++',
      },
      {
        skill_id: 329,
        skill_name: 'unity',
      },
    ],
  },
  {
    domain_id: 57,
    domain_name: 'Web Crawling',
    skills: [
      {
        skill_id: 187,
        skill_name: 'web scraping',
      },
      {
        skill_id: 280,
        skill_name: 'selenium',
      },
    ],
  },
];

const years = [2019, 2020, 2021, 2022, 2023, 2024, 2025];

const divisions = ['A', 'B', 'C', 'D'];

const batches = [
  'A-1',
  'A-2',
  'A-3',
  'A-4',
  'B-1',
  'B-2',
  'B-3',
  'B-4',
  'C-1',
  'C-2',
  'C-3',
  'C-4',
  'D-1',
  'D-2',
  'D-3',
  'D-4',
];

function getBoilerplateChats(userChatting, user) {
  const chats = [
    {
      id: 1,
      message: 'Hello ' + user?.name?.split(' ')[0] + ' 👋',
      senderId: userChatting.pid,
      receiverId: 'me',
    },
    {
      id: 2,
      message: 'Hi ' + userChatting.Name + ' 👋 How are you?',
      senderId: 'me',
      receiverId: userChatting.pid,
    },
    {
      id: 3,
      message: 'I am good, how about you?',
      senderId: userChatting.pid,
      receiverId: 'me',
    },
    {
      id: 4,
      message: 'I am good!',
      senderId: 'me',
      receiverId: userChatting.pid,
    },
    {
      id: 5,
      message: "How's your project work going on?",
      senderId: 'me',
      receiverId: userChatting.pid,
    },
    {
      id: 6,
      message: 'Did you solve the pending issues?',
      senderId: 'me',
      receiverId: userChatting.pid,
    },
    {
      id: 7,
      message: "No, I'll start working on it now... Thank you for reminding!",
      senderId: userChatting.pid,
      receiverId: 'me',
    },
    //     {
    //       id: 200,
    //       message: `I was reading the Stripe documentation at
    // https://stripe.com/docs`,
    //       senderId: userChatting.cell,
    //       receiverId: 'me',
    //     },
    {
      id: 8,
      message: "Let's catch up at 4 pm today",
      senderId: 'me',
      receiverId: userChatting.cell,
    },
    {
      id: 9,
      message: 'Ok, see you then!',
      senderId: userChatting.cell,
      receiverId: 'me',
    },
    // {
    //   id: 10,
    //   message:
    //     'Join the meeting by clicking the link https://meet.google.com/inf-jscp-uck',
    //   senderId: 'me',
    //   receiverId: userChatting.cell,
    // },
  ];

  return chats;
}

const cards = [
  {
    Degree_ID: -1,
    batch: 'BANF',
    branch: 'BRNF',
    headline: 'Headline NULL',
    id: 20,
    info: '404 | BRNF | BANF',
    name: 'kunal ambekar',
    photo: 'https://static.thenounproject.com/png/64485-200.png',
    requirements: 'REQ NULL',
    skills: ['python', 'c++', 'c', 'mongodb', 'java', 'javascript'],
    year: 404,
  },
  {
    Degree_ID: -1,
    batch: 'BANF',
    branch: 'BRNF',
    headline: 'Headline NULL',
    id: 27,
    info: '404 | BRNF | BANF',
    name: 'aniruddha tonge',
    photo: 'https://static.thenounproject.com/png/64485-200.png',
    requirements: 'REQ NULL',
    skills: ['python', 'c++', 'c', 'mongodb', 'java', 'javascript'],
    year: 404,
  },
];

const sample_cards = [
  {
    id: 1,
    name: 'Tanya Agrawal',
    email: 'abc@viit.ac.in',
    personalEmail: 'lol@lol.com',
    bio: 'Common man',
    photo:
      'https://media-exp1.licdn.com/dms/image/C5103AQFKbyGxKxMYGA/profile-displayphoto-shrink_200_200/0/1539165110959?e=1638403200&v=beta&t=c93WpMen-FJ1jheRQ2DAhVzHWU06ocZHHvjp1BH2jSM',
    info: 'BTech | CS | A1',
    year: '2023',
    division: 'A',
    batch: 'A1',
    branch: 'Information Technology',
    headline: 'Student at VIIT | Passionate about NodeJS, Angular and iOS',
    requirements:
      'Looking for a python developer who is comfortable with numpy and pandas. Need someone who is capable of extracting insights from the given data. Knowledge of iOS development or Web Development is a plus.',
    skills: [
      'Web Development',
      'iOS App Development',
      'NodeJS',
      'Angular',
      'Swift',
      'Objective-C',
    ],
    links: {
      // https://www.linkedin.com/in/
      linkedin: 'rohini-dutta-b9a8a817b',
      // https://www.github.com/
      github: 'siddheshkothadi',
      // https://twitter.com/
      twitter: 'siddheshkothadi',
    },
    languages: ['Marathi', 'English', 'Hindi'],
  },
  {
    id: 2,
    name: 'Mayank Sahu',
    email: 'abc@viit.ac.in',
    personalEmail: 'lol@lol.com',
    bio: 'Common man',
    photo:
      'https://media-exp1.licdn.com/dms/image/C5103AQGEwJJ_uuCE9w/profile-displayphoto-shrink_800_800/0/1585890211566?e=1639008000&v=beta&t=z-wLnNPFVKuNtIMkAAbYxi4N006lk8qoQSLD2eBnEKM',
    info: 'BTech | IT | B2',
    branch: 'Information Technology',
    year: '2023',
    division: 'B',
    batch: 'B2',
    headline:
      'Web Development Enthusiast | MERN Developer |Freelancer | Programmer | Looking for Internship in Web Development',
    requirements:
      'Hello All, I am Mayank Sahu pursuing B.Tech in IT, highly passionate to be a web developer. My belief is that Web development is not about writing code but more of craftsmanship. This belief has driven me towards choosing my career in this field.',
    skills: ['Python', 'Javascript', 'Web Development'],
    links: {
      linkedin: 'https://www.linkedin.com/in/rohini-dutta-b9a8a817b/',
      github: 'https://www.github.com/siddheshkothadi',
      twitter: 'https://twitter.com/siddheshkothadi',
    },
    languages: ['Marathi', 'English', 'Hindi'],
  },
  {
    id: 3,
    name: 'Sidhant Khamankar',
    email: 'abc@viit.ac.in',
    personalEmail: 'lol@lol.com',
    bio: 'Common man',
    photo:
      'https://media-exp1.licdn.com/dms/image/D5635AQHY87navBQIxA/profile-framedphoto-shrink_800_800/0/1628069175615?e=1633849200&v=beta&t=gWJ4jWPytePBQIbpfvQkv26ofOG7N-8BcUMm0l8Re_8',
    info: 'BTech | IT | B2',
    branch: 'Information Technology',
    year: '2023',
    division: 'B',
    batch: 'B2',
    headline:
      "Aspiring Software Engineer | 2⭐ Leetcode | Web Development | B.Tech IT'23 | Shining Humans | VEC",
    requirements:
      'Looking for Software Engineering Intern role. I love to build and scale softwares and apps. Skilled in Data Structures and Algorithms, C++ 2⭐ on Leetcode',
    skills: ['Data Structures', 'Algorithms', 'C++'],
    links: {
      linkedin: 'https://www.linkedin.com/in/rohini-dutta-b9a8a817b/',
      github: 'https://www.github.com/siddheshkothadi',
      twitter: 'https://twitter.com/siddheshkothadi',
    },
    languages: ['Marathi', 'English', 'Hindi'],
  },
  {
    id: 4,
    name: 'Atharva Parikh',
    email: 'abc@viit.ac.in',
    personalEmail: 'lol@lol.com',
    bio: 'Common man',
    photo:
      'https://media-exp1.licdn.com/dms/image/C4D03AQGWBaarNoZmRQ/profile-displayphoto-shrink_800_800/0/1630302510756?e=1639008000&v=beta&t=h-WOITyvTFg03o1MJX5D-E5VSx52I4dfC1JDlY_dC_E',
    info: 'BTech | IT | B2',
    branch: 'Information Technology',
    year: '2023',
    division: 'B',
    batch: 'B2',
    headline: 'FinTech | Data Science | TY IT VIIT',
    requirements:
      'I am a TY Information Technology student at VIIT Pune. I have keen interest in Data Science 📊 & Finance 📈📉. Exploring opportunities..',
    skills: ['C++', 'Python', 'Data Structures'],
    links: {
      linkedin: 'https://www.linkedin.com/in/rohini-dutta-b9a8a817b/',
      github: 'https://www.github.com/siddheshkothadi',
      twitter: 'https://twitter.com/siddheshkothadi',
    },
    languages: ['Marathi', 'English', 'Hindi'],
  },
  {
    id: 5,
    name: 'Siddhesh Kothadi',
    email: 'abc@viit.ac.in',
    personalEmail: 'lol@lol.com',
    bio: 'Common man',
    photo:
      'https://media-exp1.licdn.com/dms/image/C5603AQGN_bsNHXjP6A/profile-displayphoto-shrink_800_800/0/1595991445474?e=1639008000&v=beta&t=P2y9a7eAjgy7qWYUX1u_xM71a7MKoO34Q9ZNDoeTJws',
    info: 'BTech | IT | B2',
    branch: 'Information Technology',
    year: '2023',
    division: 'B',
    batch: 'B2',
    headline: 'Android Developer at DSC VIIT Pune',
    requirements:
      'Self-motivated and hardworking undergrad student with an ability to provide simple solutions to complex problems. Passionate about developing new projects and learning new skills. Proficient in C++, Android Development and Web Development with intuitive problem-solving skills.',
    skills: [
      'C++',
      'Android Development',
      'Kotlin',
      'Web Development',
      'React Native',
    ],
    links: {
      linkedin: 'https://www.linkedin.com/in/rohini-dutta-b9a8a817b/',
      github: 'https://www.github.com/siddheshkothadi',
      twitter: 'https://twitter.com/siddheshkothadi',
    },
    languages: ['Marathi', 'English', 'Hindi'],
  },
];

const chats = [
  'Hey',
  "I wasn't expecting that!",
  'Good bye',
  'Never say never',
  "I'm not sure",
  'Working on a Chat App',
  'Bay area',
  'Visit once',
  'LOL!',
  'Will meet you soon!',
  "You're a genius",
  'Cool!',
  'Hello',
  'Have a nice day',
  'No',
  'Proc at 5 move away from Knull, keep doing this',
  'Jira',
  'Make it responsive now',
  'Great going',
  '7 javascript frameworks to learn',
  'I created a time machine',
  'Back to the future',
  'I am a time machine',
  'This is worth watching',
  'You should attend the webinar',
];

const leftOptions = [
  'Skills',
  'Language',
  'Year',
  'Branch',
  'Division',
  'Batch',
  'Social Media',
];

const socialMedia = ['Twitter', 'LinkedIn', 'Github'];

export {
  branches,
  languageList,
  skillList,
  years,
  divisions,
  batches,
  getBoilerplateChats,
  cards,
  chats,
  leftOptions,
  socialMedia,
  DB_skillsList,
};
