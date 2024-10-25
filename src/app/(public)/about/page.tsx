
import Team from '@/components/plasmodocking/team/Team';
import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations('About');

  const renderItalic = (text:string) => {
    const parts = text.split(/(Plasmodium|falciparum|vivax)/gi);
    return parts.map((part, index) => 
      ['Plasmodium', 'falciparum', 'vivax'].includes(part) ? <em key={index}>{part}</em> : part
    );
  };
  
  return (
    <main className="mt-24">
      <div className="text-center">
        <div className='w-1/2 mx-auto pt-2 border-t-2 border-indigo-900'>
          <p className="text-2xl font-semibold">
            {t('efficiency_innovation')}
          </p>
        </div>

        <div className='rounded-lg border border-slate-100 mx-80 py-7 my-6'>
          <p className='px-20 opacity-60 pb-3 text-left'>
            {t('welcome')}
          </p>
          <p className='px-20 opacity-60 text-left'>
            {renderItalic(t('project_description'))}
          </p>
        </div>
      </div>

      <Team />

      <div className='w-1/2 mx-auto pt-2 border-t-2 text-center pb-10 border-indigo-900'>
        <p className="text-3xl font-semibold">
          {t('contact')}
        </p>
        <p>
          {t('contact_email')}
        </p>
      </div>
    </main>
  )
}
