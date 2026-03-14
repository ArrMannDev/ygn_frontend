export type Role = 'ADMIN' | 'USER' | 'TRAINER';

export interface User {
  id: number;
  email: string;
  name?: string;
  role: Role;
  createdAt: string;
  updatedAt: string;
  bio?: string;
  specialties?: string[];
  socialLinks?: Record<string, string>;
  image?: string;
  classes?: Class[];
  memberships?: Membership[];
  bookings?: Booking[];
}

export interface Membership {
  id: number;
  userId: number;
  startDate: string;
  endDate: string;
  type: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface Class {
  id: number;
  name: string;
  description?: string;
  trainerId: number;
  trainer?: User;
  schedule: string;
  capacity: number;
  bookings?: Booking[];
  createdAt: string;
  updatedAt: string;
  image?: string;
}

export interface Booking {
  id: number;
  userId: number;
  classId: number;
  class?: Class;
  createdAt: string;
}
