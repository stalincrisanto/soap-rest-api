declare module "debug" {
  interface Debugger {
    (formatter: unknown, ...args: unknown[]): void;
    extend: (namespace: string, delimiter?: string) => Debugger;
    enabled: boolean;
  }

  interface CreateDebug {
    (namespace: string): Debugger;
    enable: (namespaces: string) => void;
    disable: () => string;
  }

  const createDebug: CreateDebug;
  export default createDebug;
}
