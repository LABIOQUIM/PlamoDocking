'use client'
import React, { useEffect, useState } from 'react'
import usePlasmodockingProcess from '@/api/getProcess'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useLocale, useTranslations } from 'next-intl'
import renderItalic from '@/utils/renderItalic'
import { AiOutlineCheckCircle, AiOutlineCloseCircle, AiOutlineClockCircle, AiOutlineDeploymentUnit } from "react-icons/ai"
import { Button } from "@/components/ui/button"
import { TrashIcon, DownloadIcon } from "@radix-ui/react-icons"
import Link from 'next/link'
import AtomComponent from '@/components/plasmodocking/atom/Atom'
// import { useToast } from "@/components/ui/use-toast"
import Alert from '@/components/plasmodocking/Alerts/Alert'
import formatDate from '@/utils/formatDate'
import { useAuthStore } from '@/store/auth-store'
import axios from 'axios'
import Pusher from "pusher-js";

export default function Result() {
    const { user } = useAuthStore();

    const userName = user?.username ?? 'Unknown User';
    const username = user?.username ?? 'Unknown User';
    const t = useTranslations('Result');
    const localeActive = useLocale();
    const { isLoadingProcess, isErrorProcess, dataProcess, refetchProcess } = usePlasmodockingProcess(userName);

    // const socket = new WebSocket(`ws://localhost:8000/ws/plasmodocking/${username}/`);

    const [progressData, setProgressData] = useState<{ [key: string]: number }>({});
    const [messageLog, setMessageLog] = useState<{ [key: string]: string[] }>({});

    useEffect(() => {
        // Habilitar log do Pusher para desenvolvimento
        // Pusher.logToConsole = true;
        const pusherKey = process.env.NEXT_PUBLIC_PUSHER_KEY!;
        const pusherCluster = process.env.NEXT_PUBLIC_PUSHER_CLUSTER!;
        
        // Inicializar o Pusher
        const pusher = new Pusher(pusherKey, {
            cluster: pusherCluster,
        });

        // Inscrever-se no canal do usuário
        const channel = pusher.subscribe(`${user?.username}`);

        // Escutar o evento 'process-update' para receber atualizações
        channel.bind('proces', (data: { proces: string; status: string; progress: string; message: string }) => {
            console.log('Dados recebidos:', data);

            const { proces, status, progress, message } = data;
            console.log('====================================');
            console.log(message);
            console.log('====================================');
            // Atualizar o progresso do processo
            setProgressData((prevProgress) => ({
                ...prevProgress,
                [proces]: parseFloat(progress),
            }));

            // Atualizar o log de mensagens do processo
            setMessageLog((prevLog) => ({
                ...prevLog,
                [proces]: [...(prevLog[proces] || []), message],
            }));

            // Refetch dos processos quando o status é 'done'
            if (status === 'done' || status === 'init') {
                console.log('Atualizando processo, refetching...');
                refetchProcess();
            }
        });

        // Limpar a inscrição ao desmontar o componente
        return () => {
            console.log('Desconectando do Pusher');
            channel.unbind_all();
            channel.unsubscribe();
        };
    }, [username, refetchProcess]);


    // const { toast } = useToast()

    const renderStatusIcon = (status: string) => {
        switch (status) {
            case "em fila":
                return <AiOutlineClockCircle size={30} className='text-yellow-500' />;
            case "processando":
                return <AiOutlineDeploymentUnit size={30} className='text-blue-950 spin' />;
            case "concluido":
                return <AiOutlineCheckCircle size={30} className='text-green-600' />;
            case "error":
                return <AiOutlineCloseCircle size={30} className='text-red-600' />;
            default:
                return null;
        }
    };

    const renderStatusText = (status: string) => {
        switch (status) {
            case "em fila":
                return t('status_queue');
            case "processando":
                return t('status_processing');
            case "concluido":
                return t('status_completed');
            case "error":
                return t('status_error');
            default:
                return null;
        }
    };

    const handleAction = async (action: 'delete' | 'download', idItem: string) => {
        if (action === 'delete') {
            try {
                const response = await axios.delete(`/api/api_delete/${idItem}`);
                if (response.status === 200) {
                    console.log('Arquivo apagado com sucesso!');
                    // toast({
                    //     title: "Arquivo apagado",
                    //     description: "O arquivo foi excluído com sucesso.",
                    // });
                    refetchProcess(); // Re-fetch the data to reflect the changes
                } else {
                    console.error('Erro ao excluir:', response.data.message);
                }
            } catch (error) {
                console.error('Erro ao excluir:', error);
            }
        } else if (action === 'download') {
            try {
                const response = await axios.get(`/api/api_download/${idItem}`, {
                    responseType: 'blob', // Indica que estamos esperando uma resposta binária (o arquivo zip)
                });

                if (response.status === 200) {
                    const blob = new Blob([response.data], { type: 'application/zip' });
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `${idItem}.zip`; // Nome do arquivo para download
                    document.body.appendChild(a);
                    a.click();
                    window.URL.revokeObjectURL(url);
                    a.remove();
                } else {
                    console.error('Erro ao baixar o arquivo.');
                }
            } catch (error) {
                console.error('Erro na solicitação:', error);
            }
        }
    };

    return (
        <div className="bg-white rounded-lg border border-slate-100 mx-4 md:mx-12 lg:mx-20 xl:mx-80 min-h-[90vh] p-4 mb-16 mt-16">
            <span className="text-black flex justify-center py-5 border-b-2 border-indigo-900">
                <b>{t('title')}</b>
            </span>
            <div className="flex flex-col md:flex-row justify-between mt-4 pr-4">
                <div className="flex min-w-0 gap-x-4 border-b-2 border-indigo-900 mb-4 md:mb-0">
                    <div className="min-w-0 flex-auto">
                        <p className="text-sm font-semibold leading-6 text-gray-900">
                            {`${t('process_count')} ${dataProcess?.length || ""}`}
                        </p>
                    </div>
                </div>

                <div className="flex sm:items-end">
                    <p className="text-sm leading-6 text-gray-900">{t('status')}</p>
                </div>
            </div>

            {isLoadingProcess && (
                <div className="flex flex-col justify-center items-center min-h-[40vh]">
                    <Alert type="success" message={t('search')} btnClose={false} />
                    <AtomComponent />
                </div>
            )}

            {isErrorProcess && (
                <div className="flex justify-center items-center min-h-[40vh]">
                    <Alert type="error" message={t('search_error')} btnClose={false} />
                </div>
            )}

            {!isLoadingProcess && dataProcess && dataProcess.length === 0 && (
                <div className="flex justify-center items-center min-h-[40vh]">
                    <Alert type="error" message={t('no_found_process')} btnClose={false} />
                </div>
            )}

            {dataProcess && dataProcess.length > 0 && (
                <div className="grid gap-6 overflow-y-auto">
                    {dataProcess
                        .sort((a, b) => Number(a.id) - Number(b.id))
                        .map((item, index) => {
                            const isInCache = progressData[item.id] !== undefined || messageLog[item.id] !== undefined;

                            return (
                                <div key={item.id} className="border-b border-gray-200 py-4 ">
                                    <div>
                                        <li
                                            className={`flex flex-col sm:flex-row rounded-lg px-4 py-3 my-2 justify-between items-center sm:items-center gap-x-4 gap-y-2 ${index % 2 === 0 ? 'bg-slate-50' : 'bg-slate-100'
                                                }`}
                                        >
                                            <div className="flex flex-col gap-x-4 items-start">
                                                <p className="text-sm font-semibold leading-6 text-gray-900">{item.nome}</p>
                                                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                                    {formatDate(item.data, localeActive)}
                                                </p>
                                                <p
                                                    className="mt-1 truncate text-xs leading-5 text-gray-500"
                                                    dangerouslySetInnerHTML={{
                                                        __html: `${renderItalic(
                                                            t('plasmodium_type', { type: item.type })
                                                        )} ${item.redocking
                                                            ? t('with_redocking')
                                                            : t('without_redocking')
                                                            }`,
                                                    }}
                                                ></p>
                                            </div>

                                            {isInCache && (
                                                <div className="w-full mt-2 sm:mt-0">
                                                    <div className="relative h-4 bg-gray-200 rounded">
                                                        <div
                                                            className="absolute top-0 left-0 h-4 bg-indigo-600 rounded"
                                                            style={{
                                                                width: `${progressData[item.id] ?? 0}%`,
                                                            }}
                                                        ></div>
                                                    </div>
                                                    <p className="text-xs mt-1">
                                                        {`Progresso: ${progressData[item.id]?.toFixed(2) ?? 0}%`}
                                                    </p>
                                                </div>
                                            )}

                                            <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
                                                {(item.status === 'concluido' || item.status === 'error') && (
                                                    <div className="flex flex-col">
                                                        {item.status === 'concluido' && (
                                                            <DropdownMenu>
                                                                <DropdownMenuTrigger>
                                                                    <Button variant="outline">{t('result')}</Button>
                                                                </DropdownMenuTrigger>
                                                                <DropdownMenuContent>
                                                                    <DropdownMenuItem>
                                                                        <Link href={`/result/dashboard?id=${item.id}`}>
                                                                            {t('view_dashboard')}
                                                                        </Link>
                                                                    </DropdownMenuItem>
                                                                    <DropdownMenuItem>
                                                                        <Link href={`/result/table?id=${item.id}`}>
                                                                            {t('view_table')}
                                                                        </Link>
                                                                    </DropdownMenuItem>
                                                                </DropdownMenuContent>
                                                            </DropdownMenu>
                                                        )}
                                                        <div className="flex justify-between mt-2 gap-3">
                                                            <Button
                                                                variant="destructive"
                                                                size="icon"
                                                                onClick={() => handleAction('delete', item.id)}
                                                            >
                                                                <TrashIcon className="h-4 w-4" />
                                                            </Button>
                                                            <Button
                                                                variant="outline"
                                                                size="icon"
                                                                onClick={() => handleAction('download', item.id)}
                                                            >
                                                                <DownloadIcon className="h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                )}
                                                <div className="flex flex-col items-center">
                                                    <div className="bg-purple-100 h-[54px] w-[54px] rounded-lg p-3 flex justify-center items-center">
                                                        {renderStatusIcon(item.status)}
                                                    </div>
                                                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                                        {renderStatusText(item.status)}
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                    </div>

                                    {isInCache && (
                                        <div className="w-full mt-2">
                                            <details className="bg-gray-100 rounded-lg p-2">
                                                <summary className="cursor-pointer text-sm font-semibold text-indigo-600">
                                                    Mensagens
                                                </summary>
                                                <div className="max-h-40 overflow-y-auto mt-2 p-2 border-t border-gray-300">
                                                    {messageLog[item.id]?.map((msg, idx) => (
                                                        <p
                                                            key={idx}
                                                            className="text-xs text-gray-700 text-start p-2"
                                                        >
                                                            {msg}
                                                        </p>
                                                    ))}
                                                </div>
                                            </details>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                </div>
            )}
        </div>
    );

}
