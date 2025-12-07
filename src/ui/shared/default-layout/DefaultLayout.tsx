import { Footer } from '../footer';
import { Header } from '../header';

export const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex min-h-dvh flex-col gap-16'>
      <Header />
      <div className='flex w-full flex-1 justify-center px-6 md:px-4'>
        <div className='container w-full'>{children}</div>
      </div>
      <Footer />
    </div>
  );
};
