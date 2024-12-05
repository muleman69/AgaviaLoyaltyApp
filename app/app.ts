import { Application } from '@nativescript/core';
import { initializeI18n } from './utils/i18n';
import { LottieView } from '@nativescript-community/lottie';

// Initialize i18n before app starts
initializeI18n();

// Register Lottie for animations
Application.registerElement(
  'LottieView',
  () => LottieView
);

Application.run({ moduleName: 'app-root' });