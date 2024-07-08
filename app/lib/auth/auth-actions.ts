'use server';

import { Prisma } from 'prisma/prisma-client';
import prismaClient from '../prisma';

export async function createUser(user: Prisma.usersCreateInput) {
  const newUser = await prismaClient.user.create({
    data: user
  });

  await prismaClient.userSettings.create({
    data: {
      user_id: newUser.id
    }
  });
}
