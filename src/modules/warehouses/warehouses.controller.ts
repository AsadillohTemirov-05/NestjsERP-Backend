import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Headers,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { WarehousesService } from './warehouses.service';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';
import { Warehouse } from './interfaces/warehouse.interface';

@Controller('warehouses')
export class WarehousesController {
  constructor(
    private readonly warehousesService: WarehousesService,
  ) {}

  /**
   * Create warehouse
   */
  @Post()
  async create(
    @Body() dto: CreateWarehouseDto,
    @Headers('x-user-id') userId: string,
  ): Promise<Warehouse> {
    return this.warehousesService.create(dto, userId);
  }

  /**
   * Get all warehouses
   */
  @Get()
  async findAll(): Promise<Warehouse[]> {
    return this.warehousesService.findAll();
  }

  /**
   * Get warehouse by id
   */
  @Get(':id')
  async findOne(
    @Param('id') id: string,
  ): Promise<Warehouse> {
    return this.warehousesService.findOne(id);
  }

  /**
   * Update warehouse
   */
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateWarehouseDto,
    @Headers('x-user-id') userId: string,
  ): Promise<Warehouse> {
    return this.warehousesService.update(id, dto, userId);
  }

  /**
   * Soft delete warehouse
   */
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(
    @Param('id') id: string,
    @Headers('x-user-id') userId: string,
  ): Promise<Warehouse> {
    return this.warehousesService.remove(id, userId);
  }
}
