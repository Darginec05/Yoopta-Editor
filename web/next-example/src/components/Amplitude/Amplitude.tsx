import * as amplitude from '@amplitude/analytics-browser';
import { useEffect } from 'react';

const API_KEY = process.env.NEXT_PUBLIC_AMPLITUDE_ANALYTICS;
const IS_PROD = process.env.NODE_ENV === 'production';

export const initializeAmplitude = () => {
  if (!API_KEY || !IS_PROD) {
    return null;
  }

  amplitude.init(API_KEY, undefined, {
    defaultTracking: {
      sessions: true,
      pageViews: true,
      formInteractions: true,
    },
  });

  return amplitude;
};

export const AmplitudeScript = () => {
  useEffect(() => {
    initializeAmplitude();
  }, []);

  return null;
};
