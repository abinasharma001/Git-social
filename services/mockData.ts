import { User, Repository, Message } from '../types';

export const CURRENT_USER: User = {
  id: 'u1',
  username: 'dev_architect',
  name: 'Alex Builder',
  avatarUrl: 'https://picsum.photos/200',
  bio: 'Full-stack developer loving React and Node.js. Building the future of social coding.',
  followers: 1243,
  following: 89,
  location: 'San Francisco, CA',
  company: '@TechCorp',
  twitter: 'alexbuilds'
};

export const MOCK_USERS: User[] = [
  {
    id: 'u2',
    username: 'react_fan',
    name: 'Sarah Jenkins',
    avatarUrl: 'https://picsum.photos/201',
    bio: 'React Core Team contributor. Open source enthusiast.',
    followers: 5400,
    following: 120,
    location: 'London, UK'
  },
  {
    id: 'u3',
    username: 'rust_ace',
    name: 'Ferris The Crab',
    avatarUrl: 'https://picsum.photos/202',
    bio: 'Rust evangelist. Memory safety is my passion.',
    followers: 890,
    following: 45,
    location: 'Berlin, DE'
  },
  {
    id: 'u4',
    username: 'design_guru',
    name: 'Emily Chen',
    avatarUrl: 'https://picsum.photos/203',
    bio: 'UI/UX Designer. Pixel perfectionist.',
    followers: 3200,
    following: 400,
    location: 'New York, USA'
  }
];

export const MOCK_REPOS: Repository[] = [
  {
    id: 'r1',
    name: 'awesome-react-ui',
    description: 'A collection of beautiful React UI components.',
    language: 'TypeScript',
    stars: 1204,
    forks: 340,
    updatedAt: '2 days ago'
  },
  {
    id: 'r2',
    name: 'node-chat-server',
    description: 'Scalable WebSocket server using Node.js and Redis.',
    language: 'JavaScript',
    stars: 890,
    forks: 120,
    updatedAt: '1 week ago'
  },
  {
    id: 'r3',
    name: 'dotfiles',
    description: 'My personal development setup.',
    language: 'Shell',
    stars: 45,
    forks: 12,
    updatedAt: '3 weeks ago'
  },
  {
    id: 'r4',
    name: 'algo-visualizer',
    description: 'Visualizing sorting algorithms in real-time.',
    language: 'TypeScript',
    stars: 3200,
    forks: 560,
    updatedAt: '1 month ago'
  }
];

export const INITIAL_MESSAGES: Message[] = [
  {
    id: 'm1',
    senderId: 'u2',
    receiverId: 'u1',
    text: 'Hey Alex! I saw your PR on the new feature. Looks great!',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    read: true
  },
  {
    id: 'm2',
    senderId: 'u1',
    receiverId: 'u2',
    text: 'Thanks Sarah! I was worried about the performance implications.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1.9),
    read: true
  },
  {
    id: 'm3',
    senderId: 'u2',
    receiverId: 'u1',
    text: 'No worries, the benchmarks look solid. Merge when ready.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1.8),
    read: true
  },
  {
    id: 'm4',
    senderId: 'u3',
    receiverId: 'u1',
    text: 'Have you tried rewriting that module in Rust? 🦀',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 mins ago
    read: false
  }
];
