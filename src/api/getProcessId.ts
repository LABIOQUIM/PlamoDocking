import { useQuery } from '@tanstack/react-query';
import { PlasmodockingResult } from '@/types/PlasmodockingResult';
import transformPlasmodockingResult from '@/utils/transformPlasmodockingResult';
import axios from 'axios';

const fetchPlasmodockingResult = async (idFromUrl: string): Promise<PlasmodockingResult> => {
    const response = await axios.get(`/api/get_resultado/${idFromUrl}`);
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