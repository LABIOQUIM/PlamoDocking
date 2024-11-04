'use client'
import React, { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/auth-store';
import axios from 'axios';
import Footer from '@/components/plasmodocking/Footer/Footer';

interface ResultadoFinalItem {
  receptor_name: string;
  ligante_original?: string;
  rmsd_redocking?: string;
  energia_original?: string;
  grid_size: string;
  grid_center: string;
  ligantes: Ligante[];
}

interface Ligante {
  ligante_name: string;
  ligante_energia: string;
  run: string;
}

export default function Table() {
  const {  user } = useAuthStore();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [id, setId] = useState<string>('');
  const [resultadoFinal, setResultadoFinal] = useState<ResultadoFinalItem[] | null>(null);

  useEffect(() => {
    if (user) {
      const urlParams = new URLSearchParams(window.location.search);
      const idFromUrl = urlParams.get('id');

      setId(idFromUrl ?? '');

      if (idFromUrl) {
        axios.get(`/api/get_resultado/${idFromUrl}`)
          .then((response) => {
            try {
              const json: ResultadoFinalItem[] = JSON.parse(response.data.dados.resultado_final);
              setResultadoFinal(json);
            } catch (error) {
              console.error('Erro ao analisar JSON:', error);
            }
          })
          .catch((error) => {
            console.error('Erro ao buscar o item:', error);
          });
      }
    }
  }, [user]);

  return (
    <div className="">
      <div className='px-10 mt-16 bg-white w-auto mx-16  lg:h-[80vh] overflow-y-scroll border p-4 rounded-lg'>
        {resultadoFinal &&
          <div className=''>
            {resultadoFinal.map((item, index) => (
              <div key={index}>
                <ul className='border-b-2 border-indigo-900 py-0.5 font-semibold flex flex-col items-center'>
                  {item.rmsd_redocking ? 
                    <li key={0} className=''>Receptor: {item.receptor_name} | Ligante: {item.ligante_original} | RMSD Redocking: {item.rmsd_redocking} A | Energia: {item.energia_original} kcal/mol | Gridsize: {item.grid_size} | Gridcenter: {item.grid_center}</li>
                    :
                    <li key={0} className=''>Receptor: {item.receptor_name} | Gridsize: {item.grid_size} | Gridcenter: {item.grid_center}</li>
                  }
                </ul>
                <div className="text-center flex flex-col items-center m-auto mt-5">
                  <table className="w-96 ">
                    <thead className='bg-gray-50 border p-4 rounded-lg'>
                      <tr>
                        <th><b>Ligante</b></th>
                        <th><b>Energia</b></th>
                        <th><b>Run</b></th>
                      </tr>
                    </thead>
                    <tbody>
                      {item.ligantes.map((ligante, innerIndex) => (
                        <tr className="bg-white border-b" key={innerIndex}>
                          <td className="px-6 py-2">{ligante.ligante_name}</td>
                          <td className="px-6 py-2">{ligante.ligante_energia}</td>
                          <td className="px-6 py-2">{ligante.run}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <br/><br/><br/>
              </div>
            ))}
          </div>
        }
      </div>
      <Footer />

    </div>
  );
}
