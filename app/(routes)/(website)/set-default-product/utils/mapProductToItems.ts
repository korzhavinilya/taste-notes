import { Product } from 'prisma/prisma-client';
import { CiCoffeeCup } from 'react-icons/ci';
import { FaCocktail, FaGlassWhiskey } from 'react-icons/fa';
import {
  GiChocolateBar,
  GiCigarette,
  GiHoneyJar,
  GiTeapotLeaves
} from 'react-icons/gi';
import { GrStatusUnknown } from 'react-icons/gr';
import { IoIosWine } from 'react-icons/io';
import { IoBeerSharp } from 'react-icons/io5';
import { PiCheeseFill } from 'react-icons/pi';
import { ProductItem } from '../components/ProductItem.types';

// export default function mapProductToItems(products: Product[]): ProductItem[] {
//   return products.map(({ id, name }) => {
//     return {
//       label: name,
//       id,
//       Icon: getIcon(name)
//     };
//   });
// }

function getIcon(productName: string) {
  switch (productName) {
    case 'tea':
      return GiTeapotLeaves;
    case 'coffee':
      return CiCoffeeCup;
    case 'wine':
      return IoIosWine;
    case 'beer':
      return IoBeerSharp;
    case 'hard_liquors':
      return FaGlassWhiskey;
    case 'cocktails':
      return FaCocktail;
    case 'cheese':
      return PiCheeseFill;
    case 'chocolate':
      return GiChocolateBar;
    case 'honey':
      return GiHoneyJar;
    case 'cigars':
      return GiCigarette;
    default:
      return GrStatusUnknown;
  }
}
