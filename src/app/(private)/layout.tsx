'use client';
import AuthWrapper from '@/components/plasmodocking/withAuth/withAuth';
import { ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface PrivateLayoutProps {
  children: ReactNode;
}

const PrivateLayout = ({ children }: PrivateLayoutProps) => {
  return (
    <AuthWrapper>
      <div className={cn('min-h-screen bg-background font-sans antialiased')}>
      <div className="h-screen flex flex-col">
        <div className="flex flex-1 lg:justify-center lg:items-center md:justify-start md:items-start mt-12 lg:mt-0">
          <main className="flex-1 bg-white">{children}</main>
        </div>
      </div>
    </div>
    </AuthWrapper>
  );
};

export default PrivateLayout;
