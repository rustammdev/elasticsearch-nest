import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  async create(@Body() productDto: any) {
    return this.appService.create(productDto);
  }

  @Get('search')
  async search(@Query('q') query: string) {
    return this.appService.search(query);
  }

  @Get('all')
  async findAll() {
    return this.appService.findAll();
  }
}
