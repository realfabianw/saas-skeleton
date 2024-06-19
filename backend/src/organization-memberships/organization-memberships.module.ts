import { Module } from '@nestjs/common';
import { OrganizationMembershipsService } from './organization-memberships.service';
import { OrganizationMembershipsController } from './organization-memberships.controller';

@Module({
  controllers: [OrganizationMembershipsController],
  providers: [OrganizationMembershipsService],
})
export class OrganizationMembershipsModule {}
