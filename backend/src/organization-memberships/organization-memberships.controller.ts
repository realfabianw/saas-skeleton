import { Controller, Get, Param } from '@nestjs/common';
import { OrganizationMembershipsService } from './organization-memberships.service';

@Controller('organization-memberships')
export class OrganizationMembershipsController {
  constructor(
    private readonly organizationMembershipsService: OrganizationMembershipsService,
  ) {}

  @Get()
  findAll() {
    return this.organizationMembershipsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.organizationMembershipsService.findOne(id);
  }
}
