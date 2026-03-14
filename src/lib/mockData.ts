import type { User, Class, Booking } from '../types';

export const mockUsers: User[] = [
  {
    id: 1,
    email: 'admin@ygngym.com',
    name: 'Admin User',
    role: 'ADMIN',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    email: 'trainer1@ygngym.com',
    name: 'John Doe',
    role: 'TRAINER',
    bio: 'Expert in HIIT and Strength training with over 10 years of experience.',
    specialties: ['HIIT', 'Strength Training', 'CrossFit'],
    image: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&q=80&w=800',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 6,
    email: 'trainer4@ygngym.com',
    name: 'Sarah Johnson',
    role: 'TRAINER',
    bio: 'High-energy cardio specialist who makes every workout fun.',
    specialties: ['Zumba', 'Cardio', 'Dance Fitness'],
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=800',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 7,
    email: 'trainer5@ygngym.com',
    name: 'David Wilson',
    role: 'TRAINER',
    bio: 'Professional boxing coach with a background in MMA.',
    specialties: ['Boxing', 'MMA', 'Self Defense'],
    image: 'https://images.unsplash.com/photo-1549476464-37392f717541?auto=format&fit=crop&q=80&w=800',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 8,
    email: 'trainer6@ygngym.com',
    name: 'Elena Rodriguez',
    role: 'TRAINER',
    bio: 'Cycling enthusiast and specialist in indoor spinning classes.',
    specialties: ['Spinning', 'Cycling', 'Endurance'],
    image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&q=80&w=800',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 4,
    email: 'user@example.com',
    name: 'Regular Member',
    role: 'USER',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

export const mockClasses: Class[] = [
  {
    id: 1,
    name: 'Morning HIIT',
    description: 'High intensity interval training to start your day with maximum energy.',
    trainerId: 2,
    trainer: mockUsers[1],
    schedule: new Date(new Date().setHours(8, 0, 0, 0)).toISOString(),
    capacity: 20,
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    name: 'Power Yoga',
    description: 'Dynamic yoga flow focusing on strength, balance, and flexibility.',
    trainerId: 3,
    trainer: mockUsers[2],
    schedule: new Date(new Date().setHours(10, 0, 0, 0)).toISOString(),
    capacity: 15,
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 3,
    name: 'Heavy Weights Bodybuilding',
    description: 'Focus on hypertrophy and muscle building with professional guidance.',
    trainerId: 5,
    trainer: mockUsers[3],
    schedule: new Date(new Date().setHours(14, 0, 0, 0)).toISOString(),
    capacity: 12,
    image: 'https://img.freepik.com/premium-photo/closeup-weightlifter-lifting-heavy-weights-gym_964444-17735.jpg',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 4,
    name: 'Zumba Cardio Dance',
    description: 'Burn calories while having fun with this high-energy dance workout.',
    trainerId: 6,
    trainer: mockUsers[4],
    schedule: new Date(new Date().setHours(18, 0, 0, 0)).toISOString(),
    capacity: 30,
    image: 'https://images.unsplash.com/photo-1524594152303-9fd13543fe6e?auto=format&fit=crop&q=80&w=800',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 5,
    name: 'Boxing Essentials',
    description: 'Learn the fundamentals of boxing, from footwork to punching combinations.',
    trainerId: 7,
    trainer: mockUsers[5],
    schedule: new Date(new Date().setHours(17, 0, 0, 0)).toISOString(),
    capacity: 10,
    image: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&q=80&w=800',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 6,
    name: 'Indoor Cycling',
    description: 'High-intensity cycling class designed to improve cardiovascular endurance.',
    trainerId: 8,
    trainer: mockUsers[6],
    schedule: new Date(new Date().setHours(19, 30, 0, 0)).toISOString(),
    capacity: 25,
    image: 'https://img.freepik.com/premium-photo/group-people-intensely-riding-stationary-bikes-dimly-lit-indoor-cycling-gym-with-neon-lights-creating-dynamic-atmosphere_95891-105681.jpg',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 7,
    name: 'Elite Conditioning',
    description: 'Professional-level athletic training for power and agility.',
    trainerId: 9,
    trainer: mockUsers[7],
    schedule: new Date(new Date().setHours(16, 0, 0, 0)).toISOString(),
    capacity: 15,
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=800',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

export const mockBookings: Booking[] = [
  {
    id: 1,
    userId: 4,
    classId: 1,
    class: mockClasses[0],
    createdAt: new Date().toISOString(),
  }
];

export const getMockData = (url: string) => {
  if (url.startsWith('/users')) {
    if (url.includes('role=TRAINER')) {
      return mockUsers.filter(u => u.role === 'TRAINER');
    }
    return mockUsers;
  }
  if (url.startsWith('/classes')) {
    return mockClasses;
  }
  if (url.startsWith('/bookings')) {
    return mockBookings;
  }
  if (url.startsWith('/profile')) {
    return mockUsers[3]; // Return the regular member profile
  }
  return null;
};
