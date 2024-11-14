'use client'
import React, { useState, ChangeEvent, FormEvent} from "react";
import Alert from '@/components/plasmodocking/Alerts/Alert';

import { useTranslations } from 'next-intl';
import { useAuthStore } from '@/store/auth-store';
import axios from "axios";
import Footer from "@/components/plasmodocking/Footer/Footer";

interface FormData {
  nome: string;
  arquivo: File | null;
}

interface AlertType {
  type: 'success' | 'error';
  message: string;
}

export default function PlasmoDockigWithRedocking() {

  const { user } = useAuthStore();

  const [formData, setFormData] = useState<FormData>({ nome: '', arquivo: null });
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState<AlertType | null>(null);

  const userName = user?.username ?? 'Unknown User'; // Substitua por uma lógica adequada
  // const userName = session?.user?.username ?? 'Unknown User'; // Substitua por uma lógica adequada
  // const emailUser = session?.user?.email ?? 'user@example.com'; // Substitua por uma lógica adequada
  const emailUser = user?.email ?? 'user@example.com'; // Substitua por uma lógica adequada

  const t = useTranslations('Plasmodocking');

  const showAlert = (type: 'success' | 'error', message: string) => {
    setAlert({ type, message });
  };

  const hideAlert = () => {
    setAlert(null);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    console.log('====================================');
    console.log(userName);
    console.log('====================================');
    const { nome, arquivo } = formData;
    const data = new FormData();
    data.append('nome', nome);
    if (arquivo) {
      data.append('arquivo', arquivo);
    }
    data.append('username', userName);
    data.append('type', "falciparum");
    data.append('redocking', "true");
    data.append('email_user', emailUser);

    try {
      const response = await axios.post('/api/process-plasmodocking', data);

      if (response.status === 200 || response.status === 201) {
        showAlert('success', "Processo adicionado a fila com sucesso. em breve estará disponivel nos resultados.");
      } else {
        showAlert('error', "Erro ao adicionar processo, tempo novamente!");
      }
    } catch (error) {

      showAlert('error', String(error));
    }
    setIsLoading(false);
  };

  const renderItalic = (text: string): string => {
    const parts = text.split(/(Plasmodium|falciparum|vivax)/gi);
    return parts.map((part) =>
      ['Plasmodium', 'falciparum', 'vivax', 'Falciparum', 'Vivax'].includes(part) ? `<em>${part}</em>` : part
    ).join('');
  };

  return (
    <div className="bg-white min-h-[70vh] flex flex-1 flex-col px-4 sm:px-6 lg:px-8">
        <span className="text-black flex justify-center mx-4 sm:mx-12 lg:mx-20 xl:mx-80 py-5 border-b-2 border-indigo-900">
            <b dangerouslySetInnerHTML={{ __html: `${renderItalic(t('title_falciparum_with_redocking'))} - ${userName}` }} />
        </span>

        <div className="mt-5 sm:mx-auto w-full sm:max-w-md lg:max-w-lg">
            <Alert
                type={"success"}
                message={renderItalic(t('alert_info_falciparum_with_redocking'))}
                onClose={hideAlert}
                btnClose={false}
            />

            <form onSubmit={handleSubmit} className="space-y-6" action="#" method="POST">
                {/* Input de Nome do Processo */}
                <div>
                    <label htmlFor="nome_processo" className="flex justify-between text-sm font-medium text-gray-900">
                        {t('nome_processo_label')}
                    </label>

                    <input
                        required
                        id="nome_processo"
                        name="nome"
                        pattern="[a-zA-Z0-9_]*"
                        type="text"
                        value={formData.nome}
                        onChange={handleInputChange}
                        className="block w-full p-3 mt-2 rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                    />
                </div>

                {/* Input de Arquivo */}
                <div>
                    <label htmlFor="file_processo" className="flex justify-between text-sm font-medium text-gray-900">
                        {t('arquivo_label')}
                    </label>

                    <div className="mt-2 w-full flex flex-col sm:flex-row rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-600">
                        <label htmlFor="inputTag" className="cursor-pointer flex w-full sm:w-40 justify-center rounded-md bg-slate-800 px-3 py-1.5 text-sm font-semibold text-white hover:bg-gray-600">
                            <span>{t('arquivo_button')}</span>
                            <input
                                required
                                className="hidden"
                                id="inputTag"
                                name="arquivo"
                                type="file"
                                onChange={handleInputChange}
                                accept=".sdf"
                            />
                        </label>
                        {formData.arquivo && (
                            <p className="text-gray-600 mt-2 sm:mt-0 sm:ml-2">{formData.arquivo.name}</p>
                        )}
                    </div>
                    <div className="text-xs mt-1 opacity-50">
                        <span>{t('arquivo_info')}</span>
                    </div>
                </div>

                {/* Botão de Submissão */}
                <div>
                    <button
                        className="flex w-full justify-center rounded-md bg-slate-800 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-600 focus:ring-2 focus:ring-indigo-600"
                        type="submit"
                    >
                        {t('submit_button')}
                    </button>
                </div>
            </form>

            {/* Renderizar Alert */}
            {alert && (
                <Alert
                    type={alert.type}
                    message={alert.message}
                    onClose={hideAlert}
                />
            )}

            {/* Loader */}
            {isLoading && <div className="loader my-10 mx-auto"></div>}
        </div>

        <Footer />
    </div>
);

}
//session?.user?.name