import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'uz.healthaccess.app',
  appName: 'Health Access',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
