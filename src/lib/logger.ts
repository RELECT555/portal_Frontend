type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  level: LogLevel;
  message: string;
  context?: string;
  data?: unknown;
  timestamp: string;
}

const isDev = import.meta.env.DEV;

function formatLog(entry: LogEntry): string {
  const prefix = `[${entry.timestamp}] [${entry.level.toUpperCase()}]`;
  const ctx = entry.context ? ` [${entry.context}]` : '';
  return `${prefix}${ctx} ${entry.message}`;
}

function createEntry(level: LogLevel, message: string, context?: string, data?: unknown): LogEntry {
  return {
    level,
    message,
    context,
    data,
    timestamp: new Date().toISOString(),
  };
}

export const logger = {
  debug(message: string, context?: string, data?: unknown): void {
    if (!isDev) return;
    const entry = createEntry('debug', message, context, data);
    console.debug(formatLog(entry), data ?? '');
  },

  info(message: string, context?: string, data?: unknown): void {
    if (!isDev) return;
    const entry = createEntry('info', message, context, data);
    console.info(formatLog(entry), data ?? '');
  },

  warn(message: string, context?: string, data?: unknown): void {
    const entry = createEntry('warn', message, context, data);
    console.warn(formatLog(entry), data ?? '');
  },

  error(message: string, context?: string, data?: unknown): void {
    const entry = createEntry('error', message, context, data);
    console.error(formatLog(entry), data ?? '');
  },
};
