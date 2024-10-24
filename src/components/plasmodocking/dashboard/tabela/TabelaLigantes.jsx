import React from 'react';
import { TbHexagonLetterL } from "react-icons/tb";
import Link from 'next/link';
import { ResponsiveContainer } from "recharts"
import { useTranslations } from 'next-intl';

const TabelaLigantes = ({ ligantes, user, name_process, macromolecula }) => {
  const t = useTranslations('Dashboard');

  return (
    <ResponsiveContainer width="25%" height={500}>
    <div className='p-4 border w-full rounded-lg h-full bg-white overflow-y-scroll'>
      <span className='text-black border-b-2 border-indigo-900 font-semibold text-xl'>{t('Ligands')}: </span>

      {ligantes && ligantes.length > 0 ? (
        <ul>
          {ligantes.map((ligante, id) => (
            <Link
              key={id}
              target="_blank"
              href={`https://www.plasmodocking-labioquim.unir.br/back/view3d/${user}/${name_process}/${macromolecula}/${ligante.ligante_name}`}
            >
              <li className='bg-gray-50 hover:bg-gray-100 w-full justify-between rounded-lg my-2 p-2 flex items-center cursor-pointer'>
                <div className='flex flex-row'>
                  <div className='bg-purple-100 rounded-lg p-2'>
                    <TbHexagonLetterL size={25} className='text-purple-800' />
                  </div>
                  <div className='pl-2 flex-grow'>
                    <div>
                      <p className='text-gray-800 text-left'>{ligante.ligante_name}</p>
                      <p className='text-gray-400 text-left text-sm'>Run: {ligante.run}</p>
                    </div>
                  </div>
                </div>
                <div className='flex flex-col items-end'>
                  <p className='text-gray-800 text-sm'>{t('energy')}</p>
                  <p className='text-gray-700 text-sm'>{ligante.ligante_energia} kcal/mol</p>
                </div>
              </li>
            </Link>
          ))}
        </ul>
      ) : (
        <div>
          <p className='text-gray-500'>{t('No ligands found.')}</p>
        </div>
      )}
    </div>
  </ResponsiveContainer>
  )
};

export default TabelaLigantes;
