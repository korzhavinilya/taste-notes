import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const userId = '12d9f43d-44e0-4b8b-ac62-4293bb322a5e';
const userSettingsId = '9cc6085a-e3cd-410d-9c3e-2be9729ebdf2';
const tea_productId = '983abbfe-a106-4547-af4c-e64f7cce33a7';
const coffee_productId = '513a16fe-ba23-4217-a54c-e56j7cce33a7';
const teaNoteId = 'fd3ac77e-3b61-4e95-8a1c-6edd974896d3';

async function main() {
  await Promise.all([
    prisma.teaNote.deleteMany(),
    prisma.product.deleteMany(),
    prisma.userSettings.deleteMany(),
    prisma.user.deleteMany()
  ]);

  const users = await prisma.user.createMany({
    data: [
      {
        id: userId,
        username: 'Ilya Korzhavin',
        email: 'cerber941@gmail.com',
        provider: 'credentials'
      }
    ]
  });
  console.log('users', users);

  const settings = await prisma.userSettings.createMany({
    data: [
      {
        id: userSettingsId,
        user_id: userId
      }
    ]
  });
  console.log('settings', settings);

  const products = await prisma.product.createMany({
    data: [
      {
        id: tea_productId,
        name: 'tea',
        description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.'
      },
      {
        id: coffee_productId,
        name: 'coffee',
        description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.'
      }
    ]
  });
  console.log('products', products);

  const teaNotes = await prisma.teaNote.createMany({
    data: [
      {
        id: teaNoteId,
        name: 'Дянь Хун',
        price: 24,
        product_id: tea_productId
      }
    ]
  });
  console.log('teaNotes', teaNotes);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
