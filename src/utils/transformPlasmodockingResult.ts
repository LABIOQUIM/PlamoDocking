import { PlasmodockingResult } from "@/types/PlasmodockingResult";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const transformPlasmodockingResult = (data: any): PlasmodockingResult => {
    try {
      const parsedResult = JSON.parse(data.dados.resultado_final);
      return {
        dados: {
          ...data.dados,
          resultado_final: parsedResult
        }
      };
    } catch (error) {
      console.error('Erro ao analisar JSON:', error);
      throw new Error('Invalid JSON format in resultado_final');
    }
  };

  export default transformPlasmodockingResult;