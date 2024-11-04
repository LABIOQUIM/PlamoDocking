'use client'
import React, { useEffect, useState } from 'react';
import usePlasmodockingResult from '@/api/getProcessId';
import { useLocale, useTranslations } from 'next-intl';
import renderItalic from '@/utils/renderItalic';
import TopCards from '@/components/plasmodocking/dashboard/cards/TopCards';
import BarChart from '@/components/plasmodocking/dashboard/graficos/BarChart';
import TabelaLigantes from '@/components/plasmodocking/dashboard/tabela/TabelaLigantes';
import formatDate from '@/utils/formatDate';
import Alert from '@/components/plasmodocking/Alerts/Alert';
import AtomComponent from '@/components/plasmodocking/atom/Atom';
import { useAuthStore } from '@/store/auth-store';
import Footer from '@/components/plasmodocking/Footer/Footer';

export default function Dashboard() {
  const {  user } = useAuthStore();
  
    const urlParams = new URLSearchParams(window.location.search);
    const idFromUrl = urlParams.get('id');
    const { isLoading, isError, data } = usePlasmodockingResult(idFromUrl as string);
    const t = useTranslations('Dashboard');
    const [selectedReceptor, setSelectedReceptor] = useState<string | null>(null);
    const localeActive = useLocale();

    console.log('====================================');
    console.log(data);
    console.log('====================================');
    useEffect(() => {
        if (data && data.dados.resultado_final.length > 0) {
            setSelectedReceptor(data.dados.resultado_final[0].receptor_name);
        }
    }, [data]);

    if (isLoading) {
        return (
            <div className='flex flex-col justify-center items-center min-h-[40vh]'>
            <Alert type="success" message={t('search')} btnClose={false} />
            <AtomComponent />
        </div>
        );
    }

    if (isError) {
        return (
            <div className='flex flex-col justify-center items-center min-h-[40vh]'>
            <Alert type="error" message={t('search_error')} btnClose={false} />
        </div>
        )
    }

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedReceptor(event.target.value);
    };

    const receptorData = data?.dados.resultado_final.find((resultado) => resultado.receptor_name === selectedReceptor);

    const liganteNames = receptorData?.ligantes.map(ligante => ligante.ligante_name) || [];
    const liganteEnergias = receptorData?.ligantes.map(ligante => parseFloat(ligante.ligante_energia)) || [];
    const energiaRedocking = receptorData ? parseFloat(receptorData.energia_original) : undefined;

    console.log(receptorData);

    return (
        <div className='p-4 bg-gray-100 mt-12'>
            <div className="pt-4">
                {/* Cabeçalho/Barra de informações com username e nameProcess */}
                <div className="flex justify-between items-center bg-white border p-4 rounded-lg">
                    <h2 className="font-semibold">{t('user')}: {user?.username}</h2>
                    <h2 className="font-semibold">{t('process')}: {data?.dados.nome}</h2>
                    <h2 className="font-semibold">{t('date')}: {formatDate(data?.dados.data, localeActive)}</h2>
                    <h2 className="font-semibold">{renderItalic(t('type'))}: <em>{data?.dados.type}</em></h2>
                </div>

                <TopCards recOptions={data?.dados.resultado_final} rec={selectedReceptor} change={handleSelectChange} receptorData={receptorData} />

                <div className='flex bg-transparent gap-4'>
                    <BarChart 
                        key={selectedReceptor} 
                        liganteNames={liganteNames} 
                        liganteEnergias={liganteEnergias} 
                        energiaRedocking={energiaRedocking} 
                    />
                    <TabelaLigantes 
                        user={user?.username} 
                        name_process={data?.dados.nome} 
                        macromolecula={selectedReceptor} 
                        ligantes={receptorData?.ligantes} 
                    />
                </div>
            </div>
      <Footer />

        </div>
    );
}
