import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CustomerDocument } from './schemas/customer.schema';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomersService {
  constructor(
    @InjectModel('Customer') private readonly customerModel: Model<CustomerDocument>,
  ) {}

  async create(createCustomerDto: CreateCustomerDto, userId: string) {
    const existing = await this.customerModel.findOne({ email: createCustomerDto.email });
    if (existing) {
      throw new BadRequestException('Customer with this email already exists');
    }

    const createdCustomer = new this.customerModel({
      ...createCustomerDto,
      is_active: createCustomerDto.is_active ?? true,
      audit: {
        created_by: userId,
        created_at: new Date(),
      },
    });

    return createdCustomer.save();
  }

  async findAll() {
    return this.customerModel.find({ is_active: true, 'audit.is_deleted': { $ne: true } }).exec();
  }

  async findOne(id: string) {
    const customer = await this.customerModel.findById(id).exec();
    if (!customer || !customer.is_active || customer.audit?.is_deleted) {
      throw new NotFoundException('Customer not found');
    }
    return customer;
  }

  async update(id: string, updateCustomerDto: UpdateCustomerDto, userId: string) {
    const customer = await this.customerModel.findById(id);
    if (!customer || !customer.is_active || customer.audit?.is_deleted) {
      throw new NotFoundException('Customer not found');
    }

    // ERP rule: Cannot update immutable fields after confirmed documents
    // (here we assume customer itself is master data, so updates allowed)

    Object.assign(customer, updateCustomerDto);
    // optionally update audit info
    customer.audit = {
      ...customer.audit,
      updated_by: userId,
      updated_at: new Date(),
    };

    return customer.save();
  }

  async remove(id: string, userId: string) {
    const customer = await this.customerModel.findById(id);
    if (!customer || !customer.is_active || customer.audit?.is_deleted) {
      throw new NotFoundException('Customer not found');
    }

    customer.is_active = false;
    customer.audit = {
      ...customer.audit,
      deleted_by: userId,
      deleted_at: new Date(),
      is_deleted: true,
    };

    return customer.save();
  }
}
