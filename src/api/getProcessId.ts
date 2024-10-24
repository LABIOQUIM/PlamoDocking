import { useQuery } from '@tanstack/react-query';
import api from '@/api/api';
import { PlasmodockingResult } from '@/types/PlasmodockingResult';
import transformPlasmodockingResult from '@/utils/transformPlasmodockingResult';

const fetchPlasmodockingResult = async (idFromUrl: string): Promise<PlasmodockingResult> => {
    const response = await api.get(`/Plasmodocking/back/get_resultado/${idFromUrl}/`);
    return transformPlasmodockingResult(response.data);
};

const usePlasmodockingResult = (idFromUrl: string) => {
    const { isLoading, isError, data, refetch } = useQuery<PlasmodockingResult>({
        queryKey: ['plasmodockingResult', idFromUrl],
        queryFn: () => fetchPlasmodockingResult(idFromUrl),
        retry: 2,
    });

    return { isLoading, isError, data, refetch };
};

export default usePlasmodockingResult;