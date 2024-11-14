import * as React from 'react';
import Image from 'next/image';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white flex flex-col md:flex-row items-center justify-around mt-10 p-4 border-t-2 border-orange-900">
      {/* Logo UNIR */}
      <div className="flex items-center justify-center mb-4 md:mb-0">
        <Image
          src="/logos/unir.jpeg"
          alt="UNIR"
          width={150}
          height={150}
          className="w-28 h-auto md:w-36"
        />
      </div>

      {/* Logo LABIOQUIM */}
      <div className="flex items-center justify-center mb-4 md:mb-0">
        <Image
          src="/logos/labioquim.png"
          alt="LABIOQUIM"
          width={150}
          height={150}
          className="w-28 h-auto md:w-36"
        />
      </div>

      {/* Logo FIOCRUZ */}
      <div className="flex items-center justify-center mb-4 md:mb-0">
        <Image
          src="/logos/fiocruz.png"
          alt="FIOCRUZ"
          width={180}
          height={180}
          className="w-32 h-auto md:w-40"
        />
      </div>

      {/* Logo FIOCRUZ RO */}
      <div className="flex items-center justify-center mb-4 md:mb-0">
        <Image
          src="/logos/fiocruzro.png"
          alt="FIOCRUZ RO"
          width={180}
          height={180}
          className="w-32 h-auto md:w-40"
        />
      </div>
    </footer>
  );
};

export default Footer;
