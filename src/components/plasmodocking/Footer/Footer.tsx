// components/Footer.tsx
import * as React from 'react';
import Image from 'next/image';

const Footer: React.FC = () => {
  return (
    <footer className="footer bg-white flex mt-20 min-h-[200px] p-2 border-t-2 border-x-orange-900">
      <div className="mx-auto h-16 w-auto">
        <Image
          className='w-auto'
          src="/logos/unir.jpeg"
          alt="Your Company"
          width={180}  // Defina a largura conforme necessário
          height={180} // Defina a altura conforme necessário
        />
      </div>
      <div className="mx-auto h-16 w-auto">
        <Image
          className='w-auto'
          src="/logos/labioquim.png"
          alt="Your Company"
          width={180}
          height={180}
        />
      </div>
      <div className="mx-auto mt-2 h-16 w-auto">
        <Image
          className='w-auto'
          src="/logos/fiocruz.png"
          alt="Your Company"
          width={200}
          height={200}
        />
      </div>
      <div className="mx-auto mt-2 h-16 w-auto">
        <Image
          className='w-auto'
          src="/logos/fiocruzro.png"
          alt="Your Company"
          width={200}
          height={200}
        />
      </div>
    </footer>
  );
};

export default Footer;
