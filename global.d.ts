// global.d.ts
interface Window {
  okxwallet?: {
    tronLink: {
      request: (args: {
        method: string;
        params?: unknown[];
      }) => Promise<unknown>;
    };
  };
  tronLink: {
    ready: any;
    tronWeb: any;
    request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
  };
}
