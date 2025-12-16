// src/services/overrideService.ts
import { EthiopiaTime } from '../utils/timeUtils';

// Types
export interface MarketOverride {
  id: string;
  enabled: boolean;
  activeUntil: string | null; // ISO string
  activatedBy: string; // User ID
  activatedAt: string; // ISO string
  reason: string;
}

export interface OverrideStatus {
  isOverrideActive: boolean;
  overrideEndsAt: string | null;
  activatedBy: string;
  timeRemaining: number; // minutes
  canBypass: boolean; // Whether current user can bypass
}

// Mock storage (In production, this would be in a database)
let currentOverride: MarketOverride | null = null;

export class OverrideService {
  // Check if market override is currently active
  static isOverrideActive(): boolean {
    if (!currentOverride || !currentOverride.enabled) return false;
    
    // Check if override has expired
    if (currentOverride.activeUntil) {
      const now = new Date();
      const endsAt = new Date(currentOverride.activeUntil);
      return now < endsAt;
    }
    
    return currentOverride.enabled;
  }

  // Get current override status
  static getOverrideStatus(userId?: string): OverrideStatus {
    const isActive = this.isOverrideActive();
    let timeRemaining = 0;
    
    if (isActive && currentOverride?.activeUntil) {
      const now = new Date();
      const endsAt = new Date(currentOverride.activeUntil);
      timeRemaining = Math.max(0, Math.floor((endsAt.getTime() - now.getTime()) / 60000));
    }

    return {
      isOverrideActive: isActive,
      overrideEndsAt: currentOverride?.activeUntil || null,
      activatedBy: currentOverride?.activatedBy || '',
      timeRemaining,
      canBypass: this.canBypassMarketHours(userId),
    };
  }

  // Check if user can bypass market hours
  static canBypassMarketHours(userId?: string): boolean {
    // In real app, check user role from backend
    // For now, we'll check localStorage
    if (typeof window === 'undefined') return false;
    
    const userData = localStorage.getItem('ipo_user');
    if (!userData) return false;
    
    try {
      const user = JSON.parse(userData);
      return user.role === 'SUPER_ADMIN' || this.isOverrideActive();
    } catch {
      return false;
    }
  }

  // Activate market override
  static activateOverride(
    activeUntil: string,
    reason: string,
    userId: string,
    userName: string
  ): MarketOverride {
    const override: MarketOverride = {
      id: `override-${Date.now()}`,
      enabled: true,
      activeUntil,
      activatedBy: userId,
      activatedAt: new Date().toISOString(),
      reason,
    };

    // Save to localStorage (mock backend)
    localStorage.setItem('market_override', JSON.stringify(override));
    currentOverride = override;
    
    // Log the action
    this.logOverrideAction('ACTIVATED', userId, userName, reason);
    
    return override;
  }

  // Deactivate override
  static deactivateOverride(userId: string, userName: string): void {
    if (currentOverride) {
      currentOverride.enabled = false;
      localStorage.setItem('market_override', JSON.stringify(currentOverride));
      this.logOverrideAction('DEACTIVATED', userId, userName, 'Manual deactivation');
    }
  }

  // Clear all overrides
  static clearOverride(userId: string, userName: string): void {
    currentOverride = null;
    localStorage.removeItem('market_override');
    this.logOverrideAction('CLEARED', userId, userName, 'All overrides cleared');
  }

  // Check market status with override consideration
  static getMarketStatus(): {
    isOpen: boolean;
    isOverrideActive: boolean;
    effectiveStatus: 'open' | 'closed';
    message: string;
  } {
    const marketOpen = EthiopiaTime.isMarketOpen();
    const overrideActive = this.isOverrideActive();
    
    let effectiveStatus: 'open' | 'closed' = marketOpen ? 'open' : 'closed';
    let message = '';
    
    if (overrideActive) {
      effectiveStatus = 'open';
      const status = this.getOverrideStatus();
      message = `Market override active (ends in ${status.timeRemaining} minutes)`;
    } else if (marketOpen) {
      message = 'Market is open';
    } else {
      const marketStatus = EthiopiaTime.getMarketStatus();
      message = marketStatus.message;
    }
    
    return {
      isOpen: marketOpen,
      isOverrideActive: overrideActive,
      effectiveStatus,
      message,
    };
  }

  // Log override actions (in production, this would go to a logging service)
  private static logOverrideAction(
    action: string,
    userId: string,
    userName: string,
    reason: string
  ): void {
    const log = {
      timestamp: new Date().toISOString(),
      action,
      userId,
      userName,
      reason,
      ip: '127.0.0.1', // In production, get from request
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : '',
    };
    
    // Save to localStorage (mock audit log)
    const logs = JSON.parse(localStorage.getItem('override_logs') || '[]');
    logs.unshift(log);
    if (logs.length > 100) logs.pop(); // Keep only 100 most recent logs
    localStorage.setItem('override_logs', JSON.stringify(logs));
    
    console.log(`Override ${action}:`, log);
  }

  // Get audit logs
  static getAuditLogs(limit = 10): any[] {
    if (typeof window === 'undefined') return [];
    
    const logs = JSON.parse(localStorage.getItem('override_logs') || '[]');
    return logs.slice(0, limit);
  }

  // Initialize from storage
  static initialize(): void {
    if (typeof window === 'undefined') return;
    
    try {
      const saved = localStorage.getItem('market_override');
      if (saved) {
        currentOverride = JSON.parse(saved);
        
        // Check if override has expired
        if (currentOverride?.activeUntil) {
          const now = new Date();
          const endsAt = new Date(currentOverride.activeUntil);
          if (now >= endsAt) {
            this.clearOverride('system', 'System');
          }
        }
      }
    } catch (error) {
      console.error('Failed to initialize override service:', error);
    }
  }
}

// Initialize on import
if (typeof window !== 'undefined') {
  OverrideService.initialize();
}