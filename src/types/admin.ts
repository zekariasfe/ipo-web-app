// src/types/admin.ts
export interface SystemUser {
    id: string;
    name: string;
    email: string;
    role: 'client' | 'brokerage' | 'it_admin' | 'viewer' | 'super_admin' | 'analyst';
    company?: string;
    status: 'active' | 'suspended' | 'pending';
    createdAt: string;
    lastLogin: string | null;
    createdBy: string; // 'system', 'self-registration', or admin user id
}

export interface AdminUser {
    id: string;
    name: string;
    email: string;
    role: string;
    lastLogin: string;
    permissions: string[];
}

export interface AdminIPO {
    id: string;
    companyName: string;
    symbol: string;
    status: 'draft' | 'approved' | 'live' | 'closed' | 'cancelled';
    totalSubscriptions: number;
    totalAmount: number;
    startDate: string;
    endDate: string;
    createdAt: string;
    createdBy: string;
}

export interface AdminKYC {
    id: string;
    userId: string;
    userName: string;
    userEmail: string;
    status: 'pending' | 'approved' | 'rejected';
    submittedAt: string;
    reviewedAt?: string;
    reviewedBy?: string;
    documents: string[];
}

export interface PlatformStats {
    totalUsers: number;
    activeUsers: number;
    totalIPOs: number;
    liveIPOs: number;
    totalSubscriptions: number;
    totalSubscriptionAmount: number;
    pendingKYCs: number;
    totalTransactions: number;
    platformRevenue: number;
}