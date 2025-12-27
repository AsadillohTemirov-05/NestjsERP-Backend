import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WarehouseDocument } from './schemas/warehouse.schema';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';
import { Warehouse } from './interfaces/warehouse.interface';

@Injectable()
export class WarehousesService {
  constructor(
    @InjectModel('Warehouse')
    private readonly warehouseModel: Model<WarehouseDocument>,
  ) {}

  async create(
    dto: CreateWarehouseDto,
    userId: string,
  ): Promise<Warehouse> {
    const exists = await this.warehouseModel.findOne({
      code: dto.code,
    });

    if (exists) {
      throw new BadRequestException('Warehouse code already exists');
    }

    const warehouse = new this.warehouseModel({
      ...dto,
      is_active: true,
      is_deleted: false,
      audit: {
        created_by: userId,
        created_at: new Date(),
      },
    });

    return warehouse.save().then((w) => w.toObject());
  }

  async findAll(): Promise<Warehouse[]> {
    return this.warehouseModel
      .find({
        is_deleted: false,
      })
      .lean<Warehouse[]>();
  }

  async findOne(id: string): Promise<Warehouse> {
    const warehouse = await this.warehouseModel
      .findById(id)
      .lean<Warehouse>();

    if (!warehouse || warehouse.is_deleted) {
      throw new NotFoundException('Warehouse not found');
    }

    return warehouse;
  }

  async update(
    id: string,
    dto: UpdateWarehouseDto,
    userId: string,
  ): Promise<Warehouse> {
    const warehouse = await this.warehouseModel.findById(id);

    if (!warehouse || warehouse.is_deleted) {
      throw new NotFoundException('Warehouse not found');
    }

    Object.assign(warehouse, dto);
    warehouse.audit.updated_by = userId;
    warehouse.audit.updated_at = new Date();

    return warehouse.save().then((w) => w.toObject());
  }

  async remove(
    id: string,
    userId: string,
  ): Promise<Warehouse> {
    const warehouse = await this.warehouseModel.findById(id);

    if (!warehouse || warehouse.is_deleted) {
      throw new NotFoundException('Warehouse not found');
    }

    // ERP: no hard delete
    warehouse.is_active = false;
    warehouse.is_deleted = true;

    warehouse.audit.deleted_by = userId;
    warehouse.audit.deleted_at = new Date();

    return warehouse.save().then((w) => w.toObject());
  }
}
