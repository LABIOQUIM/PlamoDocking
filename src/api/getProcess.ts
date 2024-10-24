import { useQuery } from '@tanstack/react-query';
import api from '@/api/api';

interface DataItem {
    nome: string;
    formatted_data?: string;
    status: string;
    id: string;
    data: string;
    type?: string;
    redocking?: boolean;
}

const usePlasmodockingProcess = (userName: string) => {

    const {
        isLoading: isLoadingProcess,
        isError: isErrorProcess,
        data: dataProcess,
        refetch: refetchProcess
    } = useQuery<DataItem[]>({
        queryKey: ["key"],
        queryFn: () => (
            api.get(`/Plasmodocking/back/process-plasmodocking/by-user/?username=${userName}`)
                .then(response => {
                    return response.data
                })
        ),
        retry: 2,
    })

    return { isLoadingProcess, isErrorProcess, dataProcess, refetchProcess };
};

export default usePlasmodockingProcess;
