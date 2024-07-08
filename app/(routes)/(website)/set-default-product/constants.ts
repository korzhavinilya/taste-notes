import { IconType } from 'react-icons';
import { CiCoffeeCup } from 'react-icons/ci';
import { FaCocktail, FaGlassWhiskey } from 'react-icons/fa';
import {
  GiChocolateBar,
  GiCigarette,
  GiHoneyJar,
  GiTeapotLeaves
} from 'react-icons/gi';
import { IoIosWine } from 'react-icons/io';
import { IoBeerSharp } from 'react-icons/io5';
import { PiCheeseFill } from 'react-icons/pi';

export type Product = {
  label: string;
  Icon: IconType;
  comingSoon?: true;
};

export const products: Product[] = [
  {
    label: 'tea',
    Icon: GiTeapotLeaves
  },
  {
    label: 'coffee',
    Icon: CiCoffeeCup
  },
  {
    label: 'wine',
    Icon: IoIosWine,
    comingSoon: true
  },
  {
    label: 'beer',
    Icon: IoBeerSharp,
    comingSoon: true
  },
  {
    label: 'hard liquors',
    Icon: FaGlassWhiskey,
    comingSoon: true
  },
  {
    label: 'cocktails',
    Icon: FaCocktail,
    comingSoon: true
  },
  {
    label: 'cheese',
    Icon: PiCheeseFill,
    comingSoon: true
  },
  {
    label: 'chocolate',
    Icon: GiChocolateBar,
    comingSoon: true
  },
  {
    label: 'honey',
    Icon: GiHoneyJar,
    comingSoon: true
  },
  {
    label: 'cigars',
    Icon: GiCigarette,
    comingSoon: true
  }
];
