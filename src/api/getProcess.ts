import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

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
            axios.get(`/api/process-plasmodocking/by-user`, { params: { username: userName } }) // Passa username diretamente
                .then(response => response.data)
        ),
        retry: 2,
    })

    return { isLoadingProcess, isErrorProcess, dataProcess, refetchProcess };
};

export default usePlasmodockingProcess;
