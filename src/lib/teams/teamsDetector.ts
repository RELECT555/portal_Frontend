import * as microsoftTeams from '@microsoft/teams-js';
import { logger } from '@/lib/logger';

const TEAMS_INIT_TIMEOUT_MS = 2000;

let isTeamsEnvironment: boolean | null = null;

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('Teams init timeout')), ms);
    promise
      .then((val) => {
        clearTimeout(timer);
        resolve(val);
      })
      .catch((err) => {
        clearTimeout(timer);
        reject(err);
      });
  });
}

export async function detectTeamsEnvironment(): Promise<boolean> {
  if (isTeamsEnvironment !== null) {
    return isTeamsEnvironment;
  }

  try {
    await withTimeout(microsoftTeams.app.initialize(), TEAMS_INIT_TIMEOUT_MS);
    const context = await withTimeout(microsoftTeams.app.getContext(), TEAMS_INIT_TIMEOUT_MS);
    isTeamsEnvironment = Boolean(context);
    logger.info('Running inside Microsoft Teams', 'Teams');
    return isTeamsEnvironment;
  } catch {
    isTeamsEnvironment = false;
    logger.info('Running in standalone browser mode', 'Teams');
    return false;
  }
}

export function getIsTeams(): boolean {
  return isTeamsEnvironment ?? false;
}
