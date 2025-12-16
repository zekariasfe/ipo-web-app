// src/services/ipoService.ts - ADD OVERRIDE CHECK
import { EthiopiaTime } from '../utils/timeUtils';
import { OverrideService } from './overrideService';

export class IpoService {
  static async subscribeToIpo(userId: string, ipoId: string, shares: number) {
    // 1. Check market hours OR override
    const marketStatus = OverrideService.getMarketStatus();
    
    if (!marketStatus.effectiveStatus === 'open') {
      throw new Error(
        `IPO subscription only available during market hours (9 AM - 3 PM) or when override is active. ` +
        `Current status: ${marketStatus.message}`
      );
    }
    
    // 2. Log if using override
    if (marketStatus.isOverrideActive && !EthiopiaTime.isMarketOpen()) {
      console.warn(`User ${userId} subscribed during override period`);
    }
    
    // 3. Proceed with subscription logic...
    // ... existing subscription code ...
    
    return {
      success: true,
      message: marketStatus.isOverrideActive 
        ? `Subscription received (Override Active). Will be processed immediately.`
        : `Subscription received. Will be processed after market close at 3:00 PM`,
      timestamp: EthiopiaTime.getCurrentTime().toISOString(),
      shares,
      usingOverride: marketStatus.isOverrideActive,
    };
  }
}