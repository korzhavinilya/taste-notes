import { User } from 'next-auth';
import { ProductName } from 'prisma/prisma-client';

declare module 'next-auth' {
  interface User {
    username: string;
    defaultProduct?: ProductName;
  }
}
