// src/types/user.ts
export interface User {
    id: string;
    name: string;
    email: string;
    kycStatus: 'pending' | 'verified' | 'rejected' | 'not_started';
    kycVerifiedAt?: string; // ISO date string
}