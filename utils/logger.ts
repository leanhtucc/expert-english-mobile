/**
 * Logger Utility
 * Centralized logging with different levels
 */
class Logger {
  private isDevelopment: boolean;

  constructor(isDevelopment: boolean = process.env.EXPO_PUBLIC_ENVIRONMENT === 'development') {
    this.isDevelopment = isDevelopment;
  }

  private formatMessage(level: string, message: string): string {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${level}] ${message}`;
  }

  debug(message: string, data?: any) {
    if (this.isDevelopment) {
      console.debug(this.formatMessage('DEBUG', message), data || '');
    }
  }

  info(message: string, data?: any) {
    console.info(this.formatMessage('INFO', message), data || '');
  }

  warn(message: string, data?: any) {
    console.warn(this.formatMessage('WARN', message), data || '');
  }

  error(message: string, error?: any) {
    console.error(this.formatMessage('ERROR', message), error || '');

    // TODO: Send to error tracking service (Sentry, etc.)
    if (!this.isDevelopment) {
      // this.sendToErrorTracking(message, error);
    }
  }
}

export const logger = new Logger();
