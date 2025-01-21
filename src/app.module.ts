import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import 'dotenv/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { Product, ProductSchema } from './schemas/product.scheme';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI),
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    // Elasticsearch server manzili
    // kerakli module ichida bo'ladi
    ElasticsearchModule.register({
      node: process.env.ELASTICSEARCH_NODE,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
