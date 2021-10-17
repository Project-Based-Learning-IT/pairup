const branches = [
  'Computer Science',
  'Information Technology',
  'Electronics and Telecommunication',
  'Mechanical',
  'Civil',
  'AI-DS',
];

const languageList = [
  'English',
  'Hindi',
  'Marathi',
  'Bengali',
  'Gujarati',
  'Punjabi',
  'Kannada',
  'Tamil',
  'Telugu',
  'Malayalam',
  'Odia',
  'Urdu',
  'Konkani',
  'Sindhi',
  'Assamese',
  'Kashmiri',
  'Nepali',
  'Sanskrit',

  'German',
  'French',
  'Spanish',
  'Italian',
  'Portuguese',
  'Russian',
  'Japanese',
  'Chinese',
  'Korean',
  'Arabic',
  'Turkish',
  'Thai',
  'Vietnamese',
  'Indonesian',
  'Malay',
  'Polish',
  'Cantonese',
  'Hakka',
  'Klingon',
  'Kazakh',
  'Kyrgyz',
  'Tagalog',
  'Farsi',
  'Hmong',
  'Khmer',
  'Laotian',
  'Malagasy',
  'Mongolian',
  'Burmese',
  'Somali',
];

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

const years = ['First Year', 'Second Year', 'Third Year', 'Fourth Year'];

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
      senderId: userChatting.cell,
      receiverId: 'me',
    },
    {
      id: 2,
      message: 'Hi ' + userChatting.name.first + ' 👋 How are you?',
      senderId: 'me',
      receiverId: userChatting.cell,
    },
    {
      id: 3,
      message: 'I am good, how about you?',
      senderId: userChatting.cell,
      receiverId: 'me',
    },
    {
      id: 4,
      message: 'I am good!',
      senderId: 'me',
      receiverId: userChatting.cell,
    },
    {
      id: 5,
      message: "How's your project work going on?",
      senderId: 'me',
      receiverId: userChatting.cell,
    },
    {
      id: 6,
      message: 'Did you solve the pending issues?',
      senderId: 'me',
      receiverId: userChatting.cell,
    },
    {
      id: 7,
      message: "No, I'll start working on it now... Thank you for reminding!",
      senderId: userChatting.cell,
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
};
