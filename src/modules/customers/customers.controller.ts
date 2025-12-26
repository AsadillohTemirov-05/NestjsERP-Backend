import { Controller, Get, Post, Patch, Delete, Body, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  create(@Body() createCustomerDto: CreateCustomerDto) {
    const userId = 'system'; // TODO: replace with logged-in user id
    return this.customersService.create(createCustomerDto, userId);
  }

  @Get()
  findAll() {
    return this.customersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customersService.findOne(id);
  }

  // Update customer
  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  update(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto) {
    const userId = 'system'; // TODO: replace with logged-in user id
    return this.customersService.update(id, updateCustomerDto, userId);
  }

  // Soft delete customer
  @Delete(':id')
  remove(@Param('id') id: string) {
    const userId = 'system'; // TODO: replace with logged-in user id
    return this.customersService.remove(id, userId);
  }
}
