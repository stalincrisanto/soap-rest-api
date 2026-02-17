declare module "debug" {
  interface Debugger {
    (formatter: any, ...args: any[]): void;
    enabled: boolean;
    namespace: string;
    extend: (namespace: string, delimiter?: string) => Debugger;
  }

  interface CreateDebug {
    (namespace: string): Debugger;
    enable: (namespaces: string) => void;
    disable: () => string;
    enabled: (namespace: string) => boolean;
  }

  const createDebug: CreateDebug;
  export default createDebug;
}
