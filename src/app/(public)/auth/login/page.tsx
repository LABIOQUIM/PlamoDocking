'use client';

import Link from "next/link";
import { useState, FormEvent, useEffect } from "react";
import Input from "@/components/plasmodocking/Input/Input";
import Button from "@/components/basics/Button/Button";
import { useRouter } from 'next/navigation';
import Alert from "@/components/plasmodocking/Alerts/Alert";
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { useAuthStore } from "@/store/auth-store";
import { authenticateUser } from "@/api/auth";

interface FormData {
  email: string;
  password: string;
}

interface AlertType {
  type: 'success' | 'error';
  message: string;
}

const SignIn: React.FC = () => {
  const { login, isAuthenticated } = useAuthStore();
  const router = useRouter();
  const t = useTranslations('SignIn');
  const localeActive = useLocale();
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });
  const [alert, setAlert] = useState<AlertType | null>(null);

  // Redirecionar automaticamente se já estiver logado
  useEffect(() => {
    if (isAuthenticated) router.replace('/');
  }, [isAuthenticated, router]);

  const handleFormEdit = (event: React.ChangeEvent<HTMLInputElement>, name: string) => {
    setFormData({
      ...formData,
      [name]: event.target.value,
    });
  };

  const handleForm = async (event: FormEvent) => {
    event.preventDefault();

    try {
      // Faz a requisição de autenticação
      const userData = await authenticateUser(formData.email, formData.password);

      // Se a autenticação for bem-sucedida, faz o login
      login(userData.user, userData.access); 

      // Redireciona para a página inicial ou dashboard
      router.push('/');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      // Exibe um alerta em caso de erro
      setAlert({
        type: 'error',
        message: 'Falha na autenticação. Verifique suas credenciais.',
      });
    }
  };

  return (
    <div className="bg-white flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-3 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          {t('title')}
        </h2>
        <form className="space-y-6" onSubmit={handleForm}>
          <Input
            name="email"
            type="email"
            required
            placeholder={t('emailPlaceholder')}
            value={formData.email}
            onChange={(e) => { handleFormEdit(e, 'email') }}
          />
          <Input
            name="password"
            type="password"
            required
            placeholder={t('passwordPlaceholder')}
            value={formData.password}
            onChange={(e) => { handleFormEdit(e, 'password') }}
          />
          {alert && <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}
          <Button type="submit">{t('loginButton')}</Button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-500">
          {t('noAccount')} <Link href={`/${localeActive}/auth/singup`}>{t('signupLink')}</Link>.
        </p>
      </div>
    </div>
  );
};

export default SignIn;
