// src/utils/timeUtils.ts
export class EthiopiaTime {
  // Ethiopia is UTC+3 (East Africa Time)
  private static readonly TIMEZONE_OFFSET = 3; // UTC+3
  
  static getCurrentTime(): Date {
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    return new Date(utc + (3600000 * this.TIMEZONE_OFFSET));
  }
  
  static formatTime(date: Date): string {
    return date.toLocaleTimeString('en-ET', {
      timeZone: 'Africa/Addis_Ababa',
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  }
  
  static formatDate(date: Date): string {
    return date.toLocaleDateString('en-ET', {
      timeZone: 'Africa/Addis_Ababa',
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
  
  // Check if current time is within market hours (9 AM - 3 PM)
  static isMarketOpen(): boolean {
    const current = this.getCurrentTime();
    const hour = current.getHours();
    const day = current.getDay(); // 0 = Sunday, 6 = Saturday
    
    // Market closed on weekends
    if (day === 0 || day === 6) return false;
    
    // Market hours: 9:00 AM to 3:00 PM (inclusive)
    return hour >= 9 && hour < 15; // 15:00 = 3 PM
  }
  
  // Get minutes until market opens/closes
  static getMarketStatus(): {
    isOpen: boolean;
    nextEvent: 'open' | 'close';
    timeRemaining: number; // minutes
    message: string;
  } {
    const current = this.getCurrentTime();
    const hour = current.getHours();
    const minute = current.getMinutes();
    const day = current.getDay();
    
    // Weekend check
    if (day === 0 || day === 6) {
      const daysUntilMonday = day === 0 ? 1 : 2;
      return {
        isOpen: false,
        nextEvent: 'open',
        timeRemaining: daysUntilMonday * 24 * 60,
        message: `Market closed for weekend. Opens Monday at 9:00 AM`
      };
    }
    
    // Before market opens (before 9 AM)
    if (hour < 9) {
      const minutesToOpen = (8 - hour) * 60 + (60 - minute);
      return {
        isOpen: false,
        nextEvent: 'open',
        timeRemaining: minutesToOpen,
        message: `Market opens at 9:00 AM`
      };
    }
    
    // During market hours (9 AM - 3 PM)
    if (hour < 15) {
      const minutesToClose = (14 - hour) * 60 + (60 - minute);
      return {
        isOpen: true,
        nextEvent: 'close',
        timeRemaining: minutesToClose,
        message: `Market closes at 3:00 PM`
      };
    }
    
    // After market closes (after 3 PM)
    if (hour >= 15) {
      // Calculate until next day 9 AM
      const hoursUntilTomorrow = 24 - hour + 9;
      const minutesUntilTomorrow = hoursUntilTomorrow * 60 - minute;
      return {
        isOpen: false,
        nextEvent: 'open',
        timeRemaining: minutesUntilTomorrow,
        message: `Market opens tomorrow at 9:00 AM`
      };
    }
    
    return {
      isOpen: false,
      nextEvent: 'open',
      timeRemaining: 0,
      message: 'Market is closed'
    };
  }
  
  // Get next market opening time
  static getNextMarketOpen(): Date {
    const current = this.getCurrentTime();
    const nextOpen = new Date(current);
    const day = current.getDay();
    
    // If weekend, jump to Monday 9 AM
    if (day === 0) { // Sunday
      nextOpen.setDate(current.getDate() + 1);
    } else if (day === 6) { // Saturday
      nextOpen.setDate(current.getDate() + 2);
    } else if (current.getHours() >= 15) { // After 3 PM on weekday
      nextOpen.setDate(current.getDate() + 1);
    }
    
    // Set to 9:00 AM
    nextOpen.setHours(9, 0, 0, 0);
    return nextOpen;
  }
}