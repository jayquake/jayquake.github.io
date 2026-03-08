/// <reference types="react-scripts" />

// Prismjs ships CJS without types bundled in older versions
declare module 'prismjs' {
  const Prism: {
    highlightAll: () => void;
    highlight: (code: string, grammar: any, language: string) => string;
    languages: Record<string, any>;
    [key: string]: any;
  };
  export default Prism;
}

declare module 'prismjs/components/prism-*' {}
declare module 'prismjs/themes/*' {}
