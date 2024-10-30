import React from 'react';
import Skleton from '../../skeletons/Skletons';
import { useTranslations } from 'next-intl';

const TopCards = ({ recOptions, rec, change, receptorData }) => {
  const t = useTranslations('Dashboard');

  return (
    <div className='flex gap-4 py-2 w-full'>
      <div className='flex-1 bg-white border p-4 rounded-lg'>
        <label htmlFor="receptorSelect" className="block ml-2 font-semibold">{t('select_receptor')}</label>
        <select
          className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
          id="receptorSelect"
          value={rec || ''}
          onChange={change}
        >
          {recOptions.map((resultado, index) => (
            <option key={index} value={resultado.receptor_name}>
              {resultado.receptor_name}
            </option>
          ))}
        </select>
      </div>
      
      <div className='flex-1 bg-white border p-4 rounded-lg'>
        <div className='flex flex-col w-full pb-4'>
          {receptorData ?
            <div>
              <p className='text-left text-xl font-semibold'>{t('macromolecule')}: {receptorData.receptor_name}</p>
              <p className='text-left text-gray-600 border-b-2 border-indigo-900'>{receptorData.molecule_name}</p>
              {receptorData.ligante_original ?
                <>
                  <p className='text-left pt-2 text-gray-600'>{t('ligand_redocking')} {receptorData.ligante_original}</p>
                  <p className='text-left text-gray-600'>{t('energy_redocking')} {receptorData.energia_original}</p>
                </>
                : <p className='text-left pt-2 text-gray-600'></p>
              }
            </div>
            : <div>
              <span className='text-black font-semibold text-lg'>{t('macromolecule')}</span>
              <Skleton />
              <Skleton />
            </div>
          }
        </div>
      </div>
      
      <div className='flex-1 bg-white border p-4 rounded-lg'>
        {receptorData ?
          <div className='flex flex-col w-full pb-4'>
            <span className='text-left text-black border-b-2 border-indigo-900 font-semibold text-xl'>GridBox Parametros</span>
            <span className='text-left text-gray-600 pt-2 text-lg'>Size: {receptorData.grid_size}</span>
            <span className='text-left text-gray-600 text-lg'>Center: {receptorData.grid_center}</span>
          </div>
          : <div>
            <span className='text-black font-semibold text-lg'>Macromolécula</span>
            <Skleton />
            <Skleton />
          </div>
        }
      </div>
    </div>
  );
};

export default TopCards;
