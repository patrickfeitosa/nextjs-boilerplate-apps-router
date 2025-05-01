import Image from 'next/image';

const Main = ({
  description = 'TypeScript, ReactJS, NextJS e Styled Components',
  title = 'React Avançado',
}) => (
  <main className="bg-default-background w-full h-screen text-white p-8 text-center flex-col flex justify-center items-center">
    <Image
      alt="Imagem de um átomo e React Avançado escrito ao lado."
      className="w-64 mb-1"
      height={56}
      src="/img/logo.svg"
      width={256}
    />

    <h1 className="text-2xl font-bold">{title}</h1>
    <h2 className="text-xl font-normal">{description}</h2>

    <Image
      alt="Um desenvolvedor de frente para uma tela com código."
      className="w-[min(30rem,_100%)] mt-8"
      height={42}
      src="/img/hero-illustration.svg"
      width={48}
    />
  </main>
);

export default Main;
