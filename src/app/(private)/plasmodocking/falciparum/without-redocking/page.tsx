'use client'
import React, { useState, ChangeEvent, FormEvent } from "react";
import Alert from '@/components/plasmodocking/Alerts/Alert';
import { useTranslations } from 'next-intl';
import { useAuthStore } from "@/store/auth-store";
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

export default function PlasmoDockigWithoutRedocking() {
  const { user } = useAuthStore();


  const [formData, setFormData] = useState<FormData>({ nome: '', arquivo: null });
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState<AlertType | null>(null);

  const userName = user?.username ?? 'Unknown User'; // Substitua por uma lógica adequada
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

    const { nome, arquivo } = formData;
    const data = new FormData();
    data.append('nome', nome);
    if (arquivo) {
      data.append('arquivo', arquivo);
    }
    data.append('username', userName);
    data.append('type', "falciparum");
    data.append('redocking', "false");
    data.append('email_user', emailUser)

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
    <div className="bg-white min-h-[70vh] flex flex-col px-4 sm:px-6 lg:px-8">
        <span className="text-black flex justify-center px-4 sm:px-12 lg:px-20 xl:px-80 py-5 border-b-2 border-indigo-900">
            <b dangerouslySetInnerHTML={{ __html: `${renderItalic(t('title_falciparum_without_redocking'))} - ${userName}` }} />
        </span>

        <div className="mt-5 mx-auto w-full max-w-xs sm:max-w-sm lg:max-w-md">
            <Alert
                type={"success"}
                message={String(renderItalic(t('alert_info_falciparum_without_redocking')))}
                onClose={hideAlert}
                btnClose={false}
            />

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Input de Nome do Processo */}
                <div>
                    <label htmlFor="nome_processo" className="block text-sm font-medium text-gray-900">
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
                        className="block w-full p-3 mt-2 rounded-md border text-gray-900 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                    />
                </div>

                {/* Input de Arquivo */}
                <div>
                    <label htmlFor="file_processo" className="block text-sm font-medium text-gray-900">
                        {t('arquivo_label')}
                    </label>
                    <div className="mt-2 flex flex-col sm:flex-row items-center">
                        <label htmlFor="inputTag" className="cursor-pointer flex justify-center w-full sm:w-40 rounded-md bg-slate-800 px-3 py-2 text-sm font-semibold text-white hover:bg-gray-600">
                            {t('arquivo_button')}
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
                        className="w-full rounded-md bg-slate-800 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-600 focus:ring-2 focus:ring-indigo-600"
                        type="submit"
                    >
                        {t('submit_button')}
                    </button>
                </div>
            </form>

            {/* Exibir Alert se houver */}
            {alert && (
                <Alert
                    type={alert.type}
                    message={alert.message}
                    onClose={hideAlert}
                />
            )}

            {/* Exibir Loader */}
            {isLoading && <div className="loader my-10 mx-auto"></div>}
        </div>

        <Footer />
    </div>
);

}
//session?.user?.name