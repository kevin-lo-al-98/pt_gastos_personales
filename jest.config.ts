import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy', // Mapea archivos CSS y SCSS en general
    '^react-day-picker/dist/style.css$': 'identity-obj-proxy', // Asegúrate de que sea exactamente así
  },
};

export default config;
