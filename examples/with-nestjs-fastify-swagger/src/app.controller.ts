import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({
    operationId: 'GET_hello',
    description: `An API to get the hello world`,
    summary: `Say Hi to the world`,
  })
  getHello(): string {
    return this.appService.getHello();
  }
}
