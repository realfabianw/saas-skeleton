import { Module } from '@nestjs/common';
import { OrganizationMembershipsService } from './organization-memberships.service';

@Module({
  controllers: [],
  providers: [OrganizationMembershipsService],
})
export class OrganizationMembershipsModule {}
