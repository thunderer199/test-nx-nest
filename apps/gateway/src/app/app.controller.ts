import { All, Controller, Next, NotFoundException, Param, Req, Res } from '@nestjs/common';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { ServiceDiscoveryService } from './service-discovery.service';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { globalPrefix } from '../config';

@Controller()
export class AppController {
  private readonly proxyMap = new Map<string, any>();

  constructor(
    private readonly serviceDiscover: ServiceDiscoveryService,
    private readonly httpService: HttpService
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
  async getData(
    @Param('service') service: string,
    @Req() req: Request,
    @Res() res,
  ) {
    const url = this.serviceDiscover.getServiceUrl(service);
    if (!url) {
      throw new NotFoundException(`API-Gateway: Service ${service} not found`);
    }
    const endUrl = req.url.replace(`/${globalPrefix}/${service}`, '');

    console.log(`Proxying request to ${url}${endUrl}`);
    console.log(req.method);
    const response = this.httpService.request({
      method: req.method,
      data: req.body,
      url: url + endUrl,
      validateStatus: () => true,
    });

    const data = await lastValueFrom(response);

    console.log(data.data);
    console.log('Code:', data.status);

    return res.status(data.status).json(data.data);
  }
}
