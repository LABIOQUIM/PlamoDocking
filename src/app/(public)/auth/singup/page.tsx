'use client'
import Link from "next/link";
import { useState, FormEvent } from "react";
import { useTranslations} from 'next-intl';
import Input from "@/components/plasmodocking/Input/Input";
import Button from "@/components/basics/Button/Button";
import Alert from '@/components/plasmodocking/Alerts/Alert';
import axios from "axios";
import Footer from "@/components/plasmodocking/Footer/Footer";


interface AlertType {
  type: 'success' | 'error';
  message: string;
}

const SignUp: React.FC = () => {
  const t = useTranslations('SignUp');
  const [alert, setAlert] = useState<AlertType | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
  });

  const handleFormEdit = (event: React.ChangeEvent<HTMLInputElement>, name: string) => {
    setFormData({
      ...formData,
      [name]: event.target.value,
    });
  };

  const showAlert = (type: 'success' | 'error', message: string) => {
    setAlert({ type, message });
  };

  const hideAlert = () => {
    setAlert(null);
  };

  const handleForm = async (event: FormEvent) => {
    event.preventDefault(); // Evita que o formulário recarregue a página
    if (formData.password.length < 8) {
      showAlert('error', t('passwordError'));
      return;
    }

    // Validação para o username: não deve conter espaços
    if (formData.username.includes(' ')) {
      showAlert('error', t('usernameError'));
      return;
    }

    try {
      const response = await axios.post('/api/create-user', formData);

      console.log('Usuário criado com sucesso!', response.data);
      showAlert('success', t('createUserSuccess'));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response && error.response.data) {
        const errors = error.response.data;
        const emailError = errors.email?.[0] ? t('emailExistsError') : '';
        const usernameError = errors.username?.[0] ? t('usernameExistsError') : '';
        showAlert('error', `Erro ao criar o usuário: ${emailError} ${usernameError}`);
      } else {
        showAlert('error', t('genericError'));
      }
    }
  };

  return (
    <div className="bg-white flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="border-t-2  border-x-orange-900 mt-3 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          {t('title')}
        </h2>
      </div>

      <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleForm}>
          <div>
            <label className="flex items-center justify-between text-sm font-medium leading-6 text-gray-900">
              {t('usernameLabel')}
            </label>
            <Input
              placeholder={t('usernamePlaceholder')}
              type="text"
              required
              value={formData.username}
              onChange={(e) => { handleFormEdit(e, 'username') }}
            />
          </div>

          <div>
            <label className="flex items-center justify-between text-sm font-medium leading-6 text-gray-900">
              {t('nameLabel')}
            </label>
            <Input
              placeholder={t('namePlaceholder')}
              type="text"
              required
              value={formData.name}
              onChange={(e) => { handleFormEdit(e, 'name') }}
            />
          </div>

          <div>
            <label className="flex items-center justify-between text-sm font-medium leading-6 text-gray-900">
              {t('emailLabel')}
            </label>
            <Input
              placeholder={t('emailPlaceholder')}
              type="email"
              required
              value={formData.email}
              onChange={(e) => { handleFormEdit(e, 'email') }}
            />
          </div>

          <div>
            <label className="flex items-center justify-between text-sm font-medium leading-6 text-gray-900">
              {t('passwordLabel')}
            </label>
            <Input
              type="password"
              placeholder={t('passwordPlaceholder')}
              required
              minLength={8}
              value={formData.password}
              onChange={(e) => { handleFormEdit(e, 'password') }}
            />
          </div>
          {alert && (
            <Alert
              type={alert.type}
              message={alert.message}
              onClose={hideAlert}
            />
          )}
          <div>
            <Button type="submit">{t('submitButton')}</Button>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          <Link href={`/auth/login`}>{t('loginLink')}</Link>
        </p>
      </div>
      <Footer />

    </div>
  );
};

export default SignUp;
