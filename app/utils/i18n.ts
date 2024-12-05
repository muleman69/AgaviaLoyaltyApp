import { Device } from '@nativescript/core';
import { getString, setString } from '@nativescript/localize';

export function initializeI18n() {
  // Set default language based on device locale
  const deviceLanguage = Device.language.split('-')[0];
  const supportedLanguages = ['en', 'es'];
  
  const defaultLanguage = supportedLanguages.includes(deviceLanguage) 
    ? deviceLanguage 
    : 'en';

  setString('currentLanguage', defaultLanguage);
}

export function translate(key: string, params?: object): string {
  return getString(key, params);
}