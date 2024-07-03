import {
  PrismaClient,
  // brightness,
  // clarity,
  country,
  province,
  // tea_color,
  tea_notes
} from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.tea_notes.deleteMany();
  await prisma.regions.deleteMany();
  // await prisma.users.deleteMany();

  const regions = await prisma.regions.createMany({
    data: [
      {
        id: 1,
        country: 'china',
        province: 'yunnan'
      },
      {
        id: 2,
        country: 'china',
        province: 'guangdong'
      }
    ]
  });
  console.log('regions', regions);

  // const user = await prisma.users.create({
  //   data: {
  //     name: 'Test User',
  //     email: 'testuser@gmail.com',
  //     image: '',
  //     hashed_password: '123'
  //   }
  // });
  // console.log('user', user);

  const teaNotes = await prisma.tea_notes.createMany({
    data: [
      {
        name: 'Ми Лань Сян Дань Цун',
        type: 'oolong',
        price: 55,
        rating: 5,
        appearance:
          'Длинные жгутики продольной скрутыки с зеленоватыми вкрапленияями.',
        region_id: 2
      },
      {
        name: 'Шоу Мэй',
        type: 'white',
        price: 34,
        rating: 4.5,
        appearance: 'Большие листья, аромат пожухлой листвы.',
        region_id: 1
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
