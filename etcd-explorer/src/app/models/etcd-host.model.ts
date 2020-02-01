export class EtcdHost {
  hostname: string;
  port: number;

  constructor(params?: Partial<EtcdHost>) {
    if (params) {
      Object.assign(this, params);
    }
  }

  get url() {
    return `http://${this.hostname}:${this.port}/v3`;
  }
}
