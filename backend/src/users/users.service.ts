import { Injectable } from '@nestjs/common';

import { User } from '@clerk/clerk-sdk-node';

@Injectable()
export class UsersService {
  create(clerkUser: User) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: string) {
    return `This action returns a #${id} user`;
  }

  update(id: string, user: User) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
