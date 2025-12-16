// src/services/adminService.ts
import { 
    type AdminIPO, 
    type AdminKYC, 
    type PlatformStats, 
    type AdminUser,
    type SystemUser 
} from '../types/admin';

// Mock admin data
export const mockAdminIPOs: AdminIPO[] = [
    {
        id: 'admin-ipo-001',
        companyName: 'Habesha Breweries S.C.',
        symbol: 'HABS',
        status: 'live',
        totalSubscriptions: 650,
        totalAmount: 97500000,
        startDate: '2024-12-01',
        endDate: '2024-12-31',
        createdAt: '2024-11-15',
        createdBy: 'admin1@wcib.com'
    },
    {
        id: 'admin-ipo-002',
        companyName: 'Dashen Bank S.C.',
        symbol: 'DASH',
        status: 'live',
        totalSubscriptions: 925,
        totalAmount: 78625000,
        startDate: '2024-11-15',
        endDate: '2024-12-15',
        createdAt: '2024-11-01',
        createdBy: 'admin1@wcib.com'
    },
    {
        id: 'admin-ipo-003',
        companyName: 'Ethio Telecom',
        symbol: 'ETEL',
        status: 'approved',
        totalSubscriptions: 0,
        totalAmount: 0,
        startDate: '2024-12-10',
        endDate: '2024-12-25',
        createdAt: '2024-11-20',
        createdBy: 'admin2@wcib.com'
    },
    {
        id: 'admin-ipo-004',
        companyName: 'Awash Insurance',
        symbol: 'AWIN',
        status: 'closed',
        totalSubscriptions: 800,
        totalAmount: 96000000,
        startDate: '2024-10-01',
        endDate: '2024-10-31',
        createdAt: '2024-09-15',
        createdBy: 'admin1@wcib.com'
    }
];

export const mockAdminKYCs: AdminKYC[] = [
    {
        id: 'kyc-admin-001',
        userId: 'user-001',
        userName: 'Test User',
        userEmail: 'user@example.com',
        status: 'approved',
        submittedAt: '2024-11-20T10:30:00Z',
        reviewedAt: '2024-11-21T14:20:00Z',
        reviewedBy: 'admin1@wcib.com',
        documents: ['national_id.pdf', 'proof_of_address.pdf']
    },
    {
        id: 'kyc-admin-002',
        userId: 'user-002',
        userName: 'John Doe',
        userEmail: 'john@example.com',
        status: 'pending',
        submittedAt: '2024-11-25T09:15:00Z',
        documents: ['passport.pdf']
    },
    {
        id: 'kyc-admin-003',
        userId: 'user-003',
        userName: 'Jane Smith',
        userEmail: 'jane@example.com',
        status: 'rejected',
        submittedAt: '2024-11-24T16:45:00Z',
        reviewedAt: '2024-11-25T11:30:00Z',
        reviewedBy: 'admin2@wcib.com',
        documents: ['driving_license.pdf', 'utility_bill.pdf']
    }
];

// Mock system users data
export const mockSystemUsers: SystemUser[] = [
    {
        id: 'user-001',
        name: 'Abebe Kebede',
        email: 'abebe@habeshabreweries.com',
        role: 'client',
        company: 'Habesha Breweries S.C.',
        status: 'active',
        createdAt: '2024-10-15T08:30:00Z',
        lastLogin: '2024-12-01T14:20:00Z',
        createdBy: 'system'
    },
    {
        id: 'user-002',
        name: 'John Doe',
        email: 'john@example.com',
        role: 'client',
        company: 'Tech Solutions Inc.',
        status: 'pending',
        createdAt: '2024-11-20T10:15:00Z',
        lastLogin: null,
        createdBy: 'self-registration'
    },
    {
        id: 'admin-001',
        name: 'Admin User',
        email: 'admin@wcib.com',
        role: 'super_admin',
        company: 'WCIB',
        status: 'active',
        createdAt: '2024-01-01T00:00:00Z',
        lastLogin: '2024-12-01T09:30:00Z',
        createdBy: 'system'
    },
    {
        id: 'it-001',
        name: 'IT Support',
        email: 'it@wcib.com',
        role: 'it_admin',
        company: 'WCIB',
        status: 'active',
        createdAt: '2024-03-15T11:20:00Z',
        lastLogin: '2024-11-30T16:45:00Z',
        createdBy: 'admin-001'
    },
    {
        id: 'broker-001',
        name: 'Brokerage Manager',
        email: 'brokerage@wcib.com',
        role: 'brokerage',
        company: 'WCIB Brokerage',
        status: 'active',
        createdAt: '2024-04-10T14:30:00Z',
        lastLogin: '2024-11-29T10:15:00Z',
        createdBy: 'admin-001'
    },
    {
        id: 'viewer-001',
        name: 'Financial Analyst',
        email: 'analyst@wcib.com',
        role: 'viewer',
        company: 'WCIB Analytics',
        status: 'active',
        createdAt: '2024-05-20T09:10:00Z',
        lastLogin: '2024-11-28T13:40:00Z',
        createdBy: 'admin-001'
    }
];

export const mockPlatformStats: PlatformStats = {
    totalUsers: 1250,
    activeUsers: 892,
    totalIPOs: 8,
    liveIPOs: 2,
    totalSubscriptions: 2375,
    totalSubscriptionAmount: 272125000,
    pendingKYCs: 45,
    totalTransactions: 3876,
    platformRevenue: 1360625
};

// Mock admin users
export const mockAdminUsers: AdminUser[] = [
    {
        id: 'admin-001',
        name: 'Admin User',
        email: 'admin@wcib.com',
        role: 'super_admin',
        lastLogin: '2024-12-01T09:30:00Z',
        permissions: ['all']
    },
    {
        id: 'admin-002',
        name: 'Support Agent',
        email: 'support@wcib.com',
        role: 'support',
        lastLogin: '2024-11-30T14:20:00Z',
        permissions: ['view_users', 'view_kyc', 'view_transactions']
    }
];

// Simulate API calls
export const fetchAdminIPOs = (): Promise<AdminIPO[]> => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(mockAdminIPOs), 600);
    });
};

export const fetchAdminKYCs = (): Promise<AdminKYC[]> => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(mockAdminKYCs), 600);
    });
};

export const fetchPlatformStats = (): Promise<PlatformStats> => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(mockPlatformStats), 400);
    });
};

export const fetchSystemUsers = (filters?: {
    role?: string;
    status?: string;
    search?: string;
}): Promise<SystemUser[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            let filteredUsers = [...mockSystemUsers];
            
            if (filters) {
                if (filters.role) {
                    filteredUsers = filteredUsers.filter(user => user.role === filters.role);
                }
                if (filters.status) {
                    filteredUsers = filteredUsers.filter(user => user.status === filters.status);
                }
                if (filters.search) {
                    const searchTerm = filters.search.toLowerCase();
                    filteredUsers = filteredUsers.filter(user => 
                        user.name.toLowerCase().includes(searchTerm) ||
                        user.email.toLowerCase().includes(searchTerm) ||
                        user.company?.toLowerCase().includes(searchTerm)
                    );
                }
            }
            
            resolve(filteredUsers);
        }, 500);
    });
};

export const createInternalUser = (userData: {
    name: string;
    email: string;
    role: 'brokerage' | 'it_admin' | 'viewer' | 'analyst';
    company?: string;
    temporaryPassword: string;
}): Promise<SystemUser> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const newUser: SystemUser = {
                id: `user-${Date.now()}`,
                name: userData.name,
                email: userData.email,
                role: userData.role,
                company: userData.company || 'WCIB',
                status: 'active',
                createdAt: new Date().toISOString(),
                lastLogin: null,
                createdBy: 'admin-001' // In real app, get from current admin session
            };
            
            // Add to mock data (in real app this would be a backend call)
            mockSystemUsers.push(newUser);
            
            console.log(`Created ${userData.role} user: ${userData.email} with temp password: ${userData.temporaryPassword}`);
            
            resolve(newUser);
        }, 800);
    });
};

export const updateUserStatus = (userId: string, status: 'active' | 'suspended' | 'pending'): Promise<boolean> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const user = mockSystemUsers.find(u => u.id === userId);
            if (user) {
                user.status = status;
                console.log(`Updated user ${userId} status to ${status}`);
                resolve(true);
            } else {
                resolve(false);
            }
        }, 600);
    });
};

export const deleteUser = (userId: string): Promise<boolean> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const index = mockSystemUsers.findIndex(u => u.id === userId);
            if (index !== -1) {
                const user = mockSystemUsers[index];
                // Don't allow deletion of super_admin or it_admin
                if (user.role === 'super_admin' || user.role === 'it_admin') {
                    console.warn(`Cannot delete ${user.role} user: ${userId}`);
                    resolve(false);
                } else {
                    mockSystemUsers.splice(index, 1);
                    console.log(`Deleted user: ${userId}`);
                    resolve(true);
                }
            } else {
                resolve(false);
            }
        }, 600);
    });
};

export const resetUserPassword = (userId: string): Promise<{ temporaryPassword: string }> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            // Generate a temporary password
            const tempPassword = Math.random().toString(36).slice(-8) + 'A1!';
            console.log(`Reset password for user ${userId}. New temp password: ${tempPassword}`);
            resolve({ temporaryPassword: tempPassword });
        }, 700);
    });
};

export const approveKYC = (kycId: string, adminEmail: string): Promise<boolean> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`KYC ${kycId} approved by ${adminEmail}`);
            resolve(true);
        }, 800);
    });
};

export const rejectKYC = (kycId: string, adminEmail: string): Promise<boolean> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`KYC ${kycId} rejected by ${adminEmail}`);
            resolve(true);
        }, 800);
    });
};

// User role management
export const getUserRoles = (): Promise<Array<{ value: string; label: string; description: string }>> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                {
                    value: 'client',
                    label: 'Client',
                    description: 'External companies applying for IPO. Can submit applications and manage their portfolio.'
                },
                {
                    value: 'brokerage',
                    label: 'Brokerage',
                    description: 'Internal brokerage team. Can process applications, manage subscriptions, and handle client accounts.'
                },
                {
                    value: 'it_admin',
                    label: 'IT Administrator',
                    description: 'System administrators. Can manage users, system settings, and technical configurations.'
                },
                {
                    value: 'viewer',
                    label: 'Viewer/Analyst',
                    description: 'Read-only access to view reports, analytics, and platform data.'
                },
                {
                    value: 'super_admin',
                    label: 'Super Administrator',
                    description: 'Full system access. Can manage all users, settings, and platform configurations.'
                }
            ]);
        }, 300);
    });
};

// Export as a service object for easier imports
export const adminService = {
    fetchAdminIPOs,
    fetchAdminKYCs,
    fetchPlatformStats,
    fetchSystemUsers,
    createInternalUser,
    updateUserStatus,
    deleteUser,
    resetUserPassword,
    approveKYC,
    rejectKYC,
    getUserRoles,
    mockSystemUsers // For testing/development
};