import { Injectable } from '@nestjs/common';
import { Organization } from '@clerk/clerk-sdk-node';

@Injectable()
export class OrganizationsService {
  create(clerkOrganization: Organization) {
    return 'This action adds a new organization';
  }

  findAll() {
    return `This action returns all organizations`;
  }

  findOne(id: string) {
    return `This action returns a #${id} organization`;
  }

  update(id: string, clerkOrganization: Organization) {
    return `This action updates a #${id} organization`;
  }

  remove(id: string) {
    return `This action removes a #${id} organization`;
  }
}
