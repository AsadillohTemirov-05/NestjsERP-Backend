import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductTrackingType } from 'src/common/constants/tracking-type.enum';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product')
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async create(
    dto: CreateProductDto,
    userId: string,
  ): Promise<Product> {
    const existing = await this.productModel.findOne({ sku: dto.sku });
    if (existing) {
      throw new BadRequestException('SKU already exists');
    }

    // VARIANT parent rules
    if (dto.tracking_type === ProductTrackingType.VARIANT) {
      if (!dto.is_variant_parent) {
        throw new BadRequestException(
          'Variant parent must be marked explicitly',
        );
      }
    }

    const product = new this.productModel({
      ...dto,
      is_active: true,
      is_deleted: false,
      audit: {
        created_by: userId,
        created_at: new Date(),
      },
    });

    return product.save().then((p) => p.toObject());
  }

  async findAll(): Promise<Product[]> {
    return this.productModel
      .find({
        is_deleted: false,
        is_active: true,
      })
      .lean<Product[]>();
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productModel
      .findById(id)
      .lean<Product>();

    if (!product || product.is_deleted) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async update(
    id: string,
    dto: UpdateProductDto,
    userId: string,
  ): Promise<Product> {
    const product = await this.productModel.findById(id);

    if (!product || product.is_deleted) {
      throw new NotFoundException('Product not found');
    }

    // ERP HARD RULE:
    // tracking_type cannot be changed if product is already used
    if (
      dto.tracking_type &&
      dto.tracking_type !== product.tracking_type
    ) {
      throw new BadRequestException(
        'Tracking type cannot be changed after product usage',
      );
    }

    Object.assign(product, dto);
    product.audit.updated_by = userId;
    product.audit.updated_at = new Date();

    return product.save().then((p) => p.toObject());
  }

  async remove(id: string, userId: string): Promise<Product> {
    const product = await this.productModel.findById(id);

    if (!product || product.is_deleted) {
      throw new NotFoundException('Product not found');
    }

    product.is_active = false;
    product.is_deleted = true;

    product.audit.deleted_by = userId;
    product.audit.deleted_at = new Date();

    return product.save().then((p) => p.toObject());
  }
}
