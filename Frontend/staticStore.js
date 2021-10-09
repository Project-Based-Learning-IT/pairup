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
]

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
    {
      id: 200,
      message: `I was reading the Stripe documentation at 
https://stripe.com/docs`,
      senderId: userChatting.cell,
      receiverId: 'me',
    },
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
    {
      id: 10,
      message:
        'Join the meeting by clicking the link https://meet.google.com/inf-jscp-uck',
      senderId: 'me',
      receiverId: userChatting.cell,
    },
  ];

  return chats;
}

const cards = [
  {
    id: 1,
    title: 'Title 1',
    // location: 'Andheri',
    name: 'Tanya Agrawal',
    // a good looking indian snap from wikimedia
    photo:
      'https://media-exp1.licdn.com/dms/image/C5103AQFKbyGxKxMYGA/profile-displayphoto-shrink_200_200/0/1539165110959?e=1638403200&v=beta&t=c93WpMen-FJ1jheRQ2DAhVzHWU06ocZHHvjp1BH2jSM',
    info: 'BTech | IT | B2',
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
      linkedin: 'https://www.linkedin.com/in/rohini-dutta-b9a8a817b/',
      github: 'https://www.github.com/siddheshkothadi',
      twitter: 'https://twitter.com/siddheshkothadi',
    },
  },
  {
    id: 2,
    title: 'Title 2',
    name: 'Rohini Dutta',
    photo:
      'https://upload.wikimedia.org/wikipedia/commons/5/5c/Ananya_Panday_snapped_in_Andheri.jpg',
    info: 'BTech | IT | B2',
    headline: 'AI | ML | Web Development',
    requirements:
      'Looking for a python developer who is comfortable with numpy and pandas. Someone who is capable of extracting insights from the given data. Someone with an X Factor.',
    skills: [
      'Web Development',
      'Java',
      'Python',
      'Machine Learning',
      'AI',
      'MERN',
      'Flutter',
    ],
    links: {
      linkedin: 'https://www.linkedin.com/in/rohini-dutta-b9a8a817b/',
      github: 'https://www.github.com/siddheshkothadi',
      twitter: 'https://twitter.com/siddheshkothadi',
    },
  },
  {
    id: 3,
    title: 'Title 3',
    name: 'Rohini Dutta',
    photo:
      'https://upload.wikimedia.org/wikipedia/commons/5/5c/Ananya_Panday_snapped_in_Andheri.jpg',
    info: 'BTech | IT | B2',
    headline: 'AI | ML | Web Development',
    requirements:
      'Looking for a python developer who is comfortable with numpy and pandas. Someone who is capable of extracting insights from the given data. Someone with an X Factor.',
    skills: [
      'Web Development',
      'Java',
      'Python',
      'Machine Learning',
      'AI',
      'MERN',
      'Flutter',
    ],
    links: {
      linkedin: 'https://www.linkedin.com/in/rohini-dutta-b9a8a817b/',
      github: 'https://www.github.com/siddheshkothadi',
      twitter: 'https://twitter.com/siddheshkothadi',
    },
  },
  {
    id: 4,
    title: 'Title 4',
    name: 'Rohini Dutta',
    photo:
      'https://upload.wikimedia.org/wikipedia/commons/5/5c/Ananya_Panday_snapped_in_Andheri.jpg',
    info: 'BTech | IT | B2',
    headline: 'AI | ML | Web Development',
    requirements:
      'Looking for a python developer who is comfortable with numpy and pandas. Someone who is capable of extracting insights from the given data. Someone with an X Factor.',
    skills: [
      'Web Development',
      'Java',
      'Python',
      'Machine Learning',
      'AI',
      'MERN',
      'Flutter',
    ],
    links: {
      linkedin: 'https://www.linkedin.com/in/rohini-dutta-b9a8a817b/',
      github: 'https://www.github.com/siddheshkothadi',
      twitter: 'https://twitter.com/siddheshkothadi',
    },
  },
  {
    id: 5,
    title: 'Title 5',
    name: 'Rohini Dutta',
    photo:
      'https://upload.wikimedia.org/wikipedia/commons/5/5c/Ananya_Panday_snapped_in_Andheri.jpg',
    info: 'BTech | IT | B2',
    headline: 'AI | ML | Web Development',
    requirements:
      'Looking for a python developer who is comfortable with numpy and pandas. Someone who is capable of extracting insights from the given data. Someone with an X Factor.',
    skills: [
      'Web Development',
      'Java',
      'Python',
      'Machine Learning',
      'AI',
      'MERN',
      'Flutter',
    ],
    links: {
      linkedin: 'https://www.linkedin.com/in/rohini-dutta-b9a8a817b/',
      github: 'https://www.github.com/siddheshkothadi',
      twitter: 'https://twitter.com/siddheshkothadi',
    },
  },
  {
    id: 6,
    title: 'Title 6',
    name: 'Rohini Dutta',
    photo:
      'https://upload.wikimedia.org/wikipedia/commons/5/5c/Ananya_Panday_snapped_in_Andheri.jpg',
    info: 'BTech | IT | B2',
    headline: 'AI | ML | Web Development',
    requirements:
      'Looking for a python developer who is comfortable with numpy and pandas. Someone who is capable of extracting insights from the given data. Someone with an X Factor.',
    skills: [
      'Web Development',
      'Java',
      'Python',
      'Machine Learning',
      'AI',
      'MERN',
      'Flutter',
    ],
    links: {
      linkedin: 'https://www.linkedin.com/in/rohini-dutta-b9a8a817b/',
      github: 'https://www.github.com/siddheshkothadi',
      twitter: 'https://twitter.com/siddheshkothadi',
    },
  },
];

const chats = [
  'Hey',
  "I wasn't expecting that!",
  'Good bye',
  'Never say never',
  "I'm not sure",
  'Working on Chat App',
  'Come to bay area',
  'Visit once',
  'LOL!',
  'Will meet you soon!',
  "You're genius",
  "I'm impressed",
  '3000!',
];

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
};