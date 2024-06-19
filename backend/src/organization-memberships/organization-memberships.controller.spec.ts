import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationMembershipsController } from './organization-memberships.controller';
import { OrganizationMembershipsService } from './organization-memberships.service';

describe('OrganizationMembershipsController', () => {
  let controller: OrganizationMembershipsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrganizationMembershipsController],
      providers: [OrganizationMembershipsService],
    }).compile();

    controller = module.get<OrganizationMembershipsController>(OrganizationMembershipsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
