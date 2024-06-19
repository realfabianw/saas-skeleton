import { Injectable } from '@nestjs/common';
import { OrganizationMembership } from '@clerk/clerk-sdk-node';

@Injectable()
export class OrganizationMembershipsService {
  create(clerkOrganizationMembership: OrganizationMembership) {
    return 'This action adds a new organizationMembership';
  }

  findAll() {
    return `This action returns all organizationMemberships`;
  }

  findOne(id: string) {
    return `This action returns a #${id} organizationMembership`;
  }

  update(id: string, clerkOrganizationMembership: OrganizationMembership) {
    return `This action updates a #${id} organizationMembership`;
  }

  remove(id: string) {
    return `This action removes a #${id} organizationMembership`;
  }
}
