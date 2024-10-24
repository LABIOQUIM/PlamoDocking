import React, { Dispatch, ReactNode, SetStateAction } from "react";

export type ModalProps = {
    trigger: Dispatch<SetStateAction<boolean>>;
    open?: boolean;
    title?: string;
    content?: React.ReactNode;
    children?: ReactNode;
};

export const Modal = ({ trigger, title, content, open }: ModalProps) => {
    // Função para parar a propagação do evento de clique dentro do modal
    const handleModalContentClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    return open && (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50" onClick={() => trigger(false)}>

                <div className="bg-white p-4 w-full max-w-[90%] max-h-[90vh] rounded-md shadow-lg overflow-auto mt-10" onClick={handleModalContentClick}>
                    <div className="flex justify-between items-center">
                        <h1 className='text-xl font-semibold mb-4'>{title}</h1>
                        <button onClick={() => trigger(false)} className="p-1 rounded-md text-black hover:bg-gray-200">
                            X
                        </button>
                    </div>
                    <div>
                        {content}
                    </div>
                </div>
            </div>
        </>
    );
};
