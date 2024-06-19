import { Module } from '@nestjs/common';
import { OrganizationsService } from './organizations.service';

@Module({
  controllers: [],
  providers: [OrganizationsService],
})
export class OrganizationsModule {}
