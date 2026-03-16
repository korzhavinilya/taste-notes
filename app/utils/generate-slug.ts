import { nanoid } from 'nanoid';
import slugify from 'slugify';

export default function generateSlug(name: string) {
  const id = nanoid(5);
  const slug = slugify(name, { lower: true, strict: true });
  return `${id}-${slug}`;
}
