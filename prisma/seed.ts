oiimport { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const userId = 'clyn2w0or000408l3f8pm37mm';
const userSettingsId = 'clyn2w6z2000508l365oe0q5b';
const tea_productId = 'clyn2wads000608l3e7eh73sb';
const coffee_productId = 'clyn2wbai000708l3c2u6138e';
const teaNoteId = 'clyn2wen4000808l3ha7g3g7j';
const regionId_1 = 'clyn2wkio000008jt9zzx1bv6';
const regionId_2 = 'clyn2wlsb000108jtffvc0x7q';
const tea_color_green_id = 'clyn2wp20000308jthfehedxf';
const tea_color_yellow_id = 'clyn2wru2000408jtbnrkbyo9';

async function main() {
  await Promise.all([
    // prisma.teaNote.deleteMany(),
    // prisma.product.deleteMany(),
    prisma.productCategory.deleteMany()
    // prisma.user.deleteMany(),
    // prisma.userSettings.deleteMany(),
    // prisma.region.deleteMany(),
    // prisma.teaColor.deleteMany()
  ]);

  // const users = await prisma.user.createMany({
  //   data: [
  //     {
  //       id: userId,
  //       username: 'Ilya Korzhavin',
  //       email: 'cerber941@gmail.com',
  //       provider: 'credentials'
  //     }
  //   ]
  // });
  // console.log('users', users);

  // const settings = await prisma.userSettings.createMany({
  //   data: [
  //     {
  //       id: userSettingsId,
  //       user_id: userId
  //     }
  //   ]
  // });
  // console.log('settings', settings);

  const productCategories = await prisma.productCategory.createMany({
    data: [
      {
        name: 'tea'
      },
      {
        name: 'coffee'
      }
    ]
  });
  console.log('productCategories', productCategories);

  // const regions = await prisma.region.createMany({
  //   data: [
  //     {
  //       id: regionId_1,
  //       country: 'china',
  //       province: 'guandong'
  //     },
  //     {
  //       id: regionId_2,
  //       country: 'china',
  //       province: 'fujian'
  //     }
  //   ]
  // });
  // console.log('regions', regions);

  // const teaColors = await prisma.teaColor.createMany({
  //   data: [
  //     {
  //       id: tea_color_green_id,
  //       name: 'green',
  //       hex: '#7D806A'
  //     },
  //     {
  //       id: tea_color_yellow_id,
  //       name: 'yellow',
  //       hex: '#F1E9D6'
  //     }
  //   ]
  // });
  // console.log('teaColors', teaColors);

  // const teaNotes = await prisma.teaNote.createMany({
  //   data: [
  //     {
  //       id: teaNoteId,
  //       name: 'Дянь Хун',
  //       price: 24,
  //       product_id: tea_productId,
  //       dry_leaf_aromas: ['berry'],
  //       infusion_aromas: ['floral']
  //     }
  //   ]
  // });
  // console.log('teaNotes', teaNotes);
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
