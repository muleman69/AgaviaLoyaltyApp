import { Frame } from '@nativescript/core';

export class NavigationService {
  navigate(page: string, context?: any): void {
    Frame.topmost().navigate({
      moduleName: page,
      context: context,
      transition: {
        name: 'slide'
      }
    });
  }

  goBack(): void {
    Frame.topmost().goBack();
  }
}