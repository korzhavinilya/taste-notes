import { ButtonLink } from '../../components/ButtonLink';

export default function Home() {
  return (
    <div className="h-full flex flex-col justify-end bg-home-background bg-no-repeat bg-cover bg-center">
      <section className="w-full pb-16 px-6">
        <h1 className="pb-4 text-4xl font-semibold text-white text-center">
          Discover the Art of Tasting: Embrace Your Palate
        </h1>
        <h2 className="pb-4 text-sm text-grey-light text-center">
          Rate, review, and share your flavor experiences with fellow
          enthusiasts.
        </h2>
        <ButtonLink href="/notes">Get Started</ButtonLink>
      </section>
    </div>
  );
}