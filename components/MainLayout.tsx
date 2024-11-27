import { PropsWithChildren } from 'react';

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <div
      className={`${
        !!children
          ? 'bg-orangePrimary sm:bg-bgMainPrimary pb-48 sm:h-auto'
          : 'bg-orangePrimary'
      } bg-cover text-white `}
    >
      {children}
    </div>
  );
}
