import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { SupplierDocument } from './schemas/supplier.schema';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { Supplier } from './interfaces/supplier.interface';

@Injectable()
export class SuppliersService {
  constructor(
    @InjectModel('Supplier')
    private readonly supplierModel: Model<SupplierDocument>,
  ) {}

  async create(
    dto: CreateSupplierDto,
    userId: string,
  ): Promise<Supplier> {
    const exists = await this.supplierModel.findOne({
      name: dto.name,
      is_deleted: false,
    });

    if (exists) {
      throw new BadRequestException(
        'Supplier already exists',
      );
    }

    const supplier = new this.supplierModel({
      ...dto,
      is_active: true,
      is_deleted: false,
      audit: {
        created_by: userId,
        created_at: new Date(),
      },
    });

    return supplier.save().then((s) => s.toObject());
  }

  async findAll(): Promise<Supplier[]> {
    return this.supplierModel
      .find({ is_deleted: false })
      .lean<Supplier[]>();
  }

  async findOne(id: string): Promise<Supplier> {
    const supplier = await this.supplierModel
      .findById(id)
      .lean<Supplier>();

    if (!supplier || supplier.is_deleted) {
      throw new NotFoundException('Supplier not found');
    }

    return supplier;
  }

  async update(
    id: string,
    dto: UpdateSupplierDto,
    userId: string,
  ): Promise<Supplier> {
    const supplier = await this.supplierModel.findById(id);

    if (!supplier || supplier.is_deleted) {
      throw new NotFoundException('Supplier not found');
    }

    Object.assign(supplier, dto);
    supplier.audit.updated_by = userId;
    supplier.audit.updated_at = new Date();

    return supplier.save().then((s) => s.toObject());
  }

  async remove(
    id: string,
    userId: string,
  ): Promise<Supplier> {
    const supplier = await this.supplierModel.findById(id);

    if (!supplier || supplier.is_deleted) {
      throw new NotFoundException('Supplier not found');
    }

    supplier.is_active = false;
    supplier.is_deleted = true;
    supplier.audit.deleted_by = userId;
    supplier.audit.deleted_at = new Date();

    return supplier.save().then((s) => s.toObject());
  }
}
