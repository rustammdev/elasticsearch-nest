import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schemas/product.scheme';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { Model } from 'mongoose';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    private elasticsearchService: ElasticsearchService,
  ) {}

  async create(productDto: any): Promise<Product> {
    const product = await new this.productModel(productDto).save();
    await this.elasticsearchService.index({
      index: 'products',
      id: product._id.toString(),
      body: {
        name: product.name,
        description: product.description,
        price: product.price,
      },
    });
    return product;
  }

  async search(query: string) {
    const { hits } = await this.elasticsearchService.search({
      index: 'products',
      query: {
        multi_match: {
          query,
          fields: ['name', 'description'],
        },
      },
    });
    return hits.hits.map((hit) => hit._source);
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  getHello(): string {
    return 'Hello World 2!';
  }
}
