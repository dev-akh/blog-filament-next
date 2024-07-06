declare module 'js-cookie' {
    const Cookies: {
      get: (name: string) => string | undefined;
      set: (name: string, value: any, options?: any) => void;
      remove: (name: string, options?: any) => void;
      // Add other methods as needed
    };
    export = Cookies;
  }
  