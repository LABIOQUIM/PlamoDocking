import Footer from '@/components/plasmodocking/Footer/Footer';
import Team from '@/components/plasmodocking/team/Team';
import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations('About');

  const renderItalic = (text: string) => {
    const parts = text.split(/(Plasmodium|falciparum|vivax)/gi);
    return parts.map((part, index) =>
      ['Plasmodium', 'falciparum', 'vivax'].includes(part) ? <em key={index}>{part}</em> : part
    );
  };

  return (
    <main className="mt-16 px-4 md:px-8 lg:px-16">
      <div className="text-center">
        <div className="w-full md:w-3/4 lg:w-1/2 mx-auto pt-4 border-t-2 border-indigo-900">
          <p className="text-xl md:text-2xl font-semibold">
            {t('efficiency_innovation')}
          </p>
        </div>

        <div className="rounded-lg border border-slate-100 mx-auto py-6 my-6 w-full md:w-3/4 lg:w-3/4 shadow-sm">
          <p className="px-4 md:px-10 lg:px-20 opacity-60 pb-3 text-left text-sm md:text-base lg:text-lg">
            {t('welcome')}
          </p>
          <p className="px-4 md:px-10 lg:px-20 opacity-60 text-left text-sm md:text-base lg:text-lg">
            {renderItalic(t('project_description'))}
          </p>
        </div>
      </div>

      <Team />

      <div className="w-full md:w-3/4 lg:w-1/2 mx-auto pt-4 border-t-2 text-center pb-10 border-indigo-900">
        <p className="text-2xl md:text-3xl font-semibold">
          {t('contact')}
        </p>
        <p className="text-sm md:text-base lg:text-lg">
          {t('contact_email')}
        </p>
      </div>

      <Footer />
    </main>
  );
}
