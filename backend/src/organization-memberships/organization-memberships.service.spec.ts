import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationMembershipsService } from './organization-memberships.service';

describe('OrganizationMembershipsService', () => {
  let service: OrganizationMembershipsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrganizationMembershipsService],
    }).compile();

    service = module.get<OrganizationMembershipsService>(OrganizationMembershipsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
