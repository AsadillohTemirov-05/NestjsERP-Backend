import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[MongooseModule.forFeature([{ name: 'Customer', schema: require('./schemas/customer.schema').CustomerSchema }]) ],
  controllers: [CustomersController],
  providers: [CustomersService],
})
export class CustomersModule {}
