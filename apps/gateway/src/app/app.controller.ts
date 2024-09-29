import { All, Controller, Next, Param, Req, Res } from '@nestjs/common';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { ServiceDiscoveryService } from './service-discovery.service';

@Controller()
export class AppController {
  private readonly proxyMap = new Map<string, any>();

  constructor(
    private readonly serviceDiscover: ServiceDiscoveryService
  ) {}

  getProxy(service: string) {
    if (this.proxyMap.has(service)) {
      return this.proxyMap.get(service);
    }
    const url = this.serviceDiscover.getServiceUrl(service);
    const proxy = createProxyMiddleware({
      target: url,
      // changeOrigin: true,
      pathRewrite: { [`/${service}`]: '' },
    });
    this.proxyMap.set(service, proxy);

    return proxy;
  }

  @All(':service/*')
  getData(
    @Param('service') service: string,
    @Req() req,
    @Res() res,
    @Next() next
  ) {
    const proxy = this.getProxy(service);
    proxy(req, res, next);
  }
}
