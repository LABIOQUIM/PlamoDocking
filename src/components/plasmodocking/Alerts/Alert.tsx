// components/Alert.tsx
import React from 'react';

// Definindo o tipo para as propriedades que o componente Alert aceitará
interface AlertProps {
  type: 'error' | 'success' | 'warning';
  message: string;
  onClose?: () => void;
  btnClose?: boolean;
}

const alertStyles = {
  error: {
    container: "flex items-center p-4 mt-4 mb-4 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400",
    icon: "text-red-500",
    closeButton: "bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200",
  },
  success: {
    container: "flex items-center p-4 mt-4 mb-4 text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400",
    icon: "text-green-500",
    closeButton: "bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200",
  },
  warning: {
    container: "flex items-center p-4 mt-4 mb-4 text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300",
    icon: "text-yellow-500",
    closeButton: "bg-yellow-50 text-yellow-500 rounded-lg focus:ring-2 focus:ring-yellow-400 p-1.5 hover:bg-yellow-200",
  },
};

// Função componente Alert, agora com as props tipadas
const Alert: React.FC<AlertProps> = ({ type, message, onClose, btnClose = true }) => {
  const styles = alertStyles[type];

  return (
    <div className={styles.container} role="alert">
      <svg className={`flex-shrink-0 w-4 h-4 ${styles.icon}`} aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
      </svg>
      <span className="sr-only">Info</span>
      <div className="ml-3 text-sm font-medium" dangerouslySetInnerHTML={{ __html: message || '' }}/>
      {btnClose &&
        <button
          type="button"
          className={`ml-auto -mx-1.5 -my-1.5 ${styles.closeButton}`}
          onClick={onClose}
          aria-label="Close"
        >
          <span className="sr-only">Close</span>
          <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
          </svg>
        </button>
      }
    </div>
  );
};

export default Alert;
