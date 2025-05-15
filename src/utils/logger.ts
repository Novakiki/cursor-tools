import consola from 'consola';

/**
 * Creates a logger instance with consistent prefixes for better log filtering
 * @param component The component name to be used as a prefix
 * @param subComponent Optional sub-component name for more specific logging
 * @returns A logger object with various logging methods
 */
export function createLogger(component: string, subComponent?: string) {
  const prefix = subComponent ? `[${component}:${subComponent}]` : `[${component}]`;
  
  return {
    log: (message: string, ...args: any[]) => 
      consola.log(`${prefix} ${message}`, ...args),
    
    info: (message: string, ...args: any[]) => 
      consola.info(`${prefix} ${message}`, ...args),
    
    success: (message: string, ...args: any[]) => 
      consola.success(`${prefix} ${message}`, ...args),
    
    debug: (message: string, ...args: any[]) => {
      if (process.env.DEBUG) {
        consola.debug(`${prefix} ${message}`, ...args);
      }
    },
    
    warn: (message: string, ...args: any[]) => 
      consola.warn(`${prefix} ${message}`, ...args),
    
    error: (message: string, ...args: any[]) => 
      consola.error(`${prefix} ${message}`, ...args),
    
    // Helper method to create a sub-logger with an additional component prefix
    subLogger: (childComponent: string) => 
      createLogger(component, childComponent)
  };
}

// Create a global default logger
export const logger = createLogger('vibe-tools');
