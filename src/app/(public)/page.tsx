'use client';
import { Modal } from '@/components/basics/modal/Modal';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import data from '@/data/fiocruz_macromoleculas_virtuais.json'; // Ajuste o caminho conforme necessário
import dataSemRedocking from '@/data/fiocruz_macromoleculas_virtuais_sem_redocking.json'; // Ajuste o caminho conforme necessário
import { BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import { useTranslations } from 'next-intl';
import renderItalic from '@/utils/renderItalic';
import Footer from '@/components/plasmodocking/Footer/Footer';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [equation, setEquation] = useState('');
  const [latex, setLatex] = useState('');

  useEffect(() => {
    setEquation(
      `V=W_{vdw}\\sum_{i,j}{\\left(\\frac{A_{ij}}{r_{ij}^{12}}-\\frac{B_{ij}}{r_{ij}^6}\\right)+W_{hbond}}\\sum_{i,j}{E(t)\\left(\\frac{C_{ij}}{r_{ij}^{12}}-\\frac{D_{ij}}{r_{ij}^{10}}\\right)+W_{elec}}\\sum_{i,j}{\\frac{q_iq_j}{e\\left(r_{ij}\\right)r_{ij}}+W_{sol}}\\sum_{i,j}{\\left(S_iV_j{+S}jV_i\\right)e^{\\left(-r{ij}^2/2\\sigma^2\\right)}}`
    );
    setLatex(
      `\\Delta G =  \\left( V_{\\text{bound}}^{L{-L}} - V_{\\text{unbound}}^{L{-L}} \\right) + \\left( V_{\\text{bound}}^{P{-P}} - V_{\\text{unbound}}^{P{-P}} \\right) + \\left( V_{\\text{bound}}^{L{-L}} - V_{\\text{unbound}}^{L{-L}}  + \\Delta S_{\\text{conf}} \\right)`
    );
  }, []);

  const t = useTranslations('Index');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderTable = (data: any[]) => (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Listagem</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PDB Id</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ligante cristalizado</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">{"ENERGIA REDOCKING (kcal/mol)"}</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gridsize</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gridcenter</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((item, index) => (
            <tr key={index} className="odd:bg-gray-50 even:bg-white">
              <td className="px-6 py-2 whitespace-nowrap">{index + 1}</td>
              <td className="px-6 py-2 whitespace-nowrap">{item.nome}</td>
              <td className="px-6 py-2 whitespace-nowrap">{item.rec}</td>
              <td className="px-6 py-2 whitespace-nowrap">{item.ligante_original}</td>
              <td className="px-6 py-2 whitespace-nowrap">{item.energia_orinal}</td>
              <td className="px-6 py-2 whitespace-nowrap">{item.gridsize}</td>
              <td className="px-6 py-2 whitespace-nowrap">{item.gridcenter}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const tableContent = renderTable(data);
  const tableContentSemRedocking = renderTable(dataSemRedocking);

  return (
    <main className="w-full justify-center items-center content-center">
      <section className="w-full py-8 md:py-16 lg:py-24 bg-white">
        <div className="container grid items-center justify-center gap-8 px-4 md:px-6 lg:grid-cols-2 lg:gap-12 mx-auto">
          <div className="space-y-4">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl" dangerouslySetInnerHTML={{ __html: renderItalic(t('title')) || '' }}>
               
              </h2>
              <div className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                {renderItalic(t('description'))}
              </div>
            </div>
            <div className="grid gap-4">
              <div className="rounded-lg bg-white p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">{t('advantages')}</h3>
                </div>
                <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  {renderItalic(t('advantages_description'))}
                </div>
              </div>
              <div className="rounded-lg bg-white p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">{t('techniques')}</h3>
                </div>
                <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  {renderItalic(t('techniques_description'))}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-white p-4 shadow-sm">
            <div className="flex justify-center flex-col">
              <Image
                src="/imagens/autoDock.png"
                alt="Your Company"
                width={800}
                height={800}
              />
              <div className="m-0 mt-6 text-sm opacity-50">
                <span>{t('source')}</span>
                <div className="ml-4">
                  {"SANTOS-MARTINS, Diogo et al. Accelerating AutoDock4 with GPUs and gradient-based local search. Journal of chemical theory and computation, v. 17, n. 2, p. 1060-1073, 2021."}
                </div>

                <div className="ml-4 mt-4">
                  <span>{t('manual')}</span>
                  <Link
                    href="https://autodock.scripps.edu/wp-content/uploads/sites/56/2021/10/AutoDock4.2.6_UserGuide.pdf"
                    className="group text-blue-700 rounded-lg border border-transparent py-2 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://autodock.scripps.edu/wp-content/uploads/sites/56/2021/10/AutoDock4.2.6_UserGuide.pdf
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start">
            <h3 className="text-lg font-semibold">{t('formulas_title')}</h3>
            <BlockMath math={latex} />
            <BlockMath math={equation} />
          </div>
        </div>
        <hr className="my-8" />

        <div className="space-y-2 w-[80%] mx-auto mt-20">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            {renderItalic(t('project_title'))}
          </h2>
          <div className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400" dangerouslySetInnerHTML={{ __html: renderItalic(t('project_description')) || '' }}>

          </div>
        </div>

        <div className="container grid items-center justify-center gap-8 px-4 md:px-6 lg:grid-cols-2 lg:gap-12 mx-auto mt-6">
          <div className="rounded-lg bg-white p-4 shadow-sm">
            <div className="flex justify-center flex-col">
              <Image
                src="/imagens/plasmodockingfluxo.jpeg"
                alt="Fluxo do processo de Plasmodocking"
                width={700}
                height={700}
              />
            </div>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-3xl md:text-4xl">
                {renderItalic(t('advances_title'))}
              </h2>
              <div className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                {renderItalic(t('advances_description'))}
              </div>
            </div>
            <div className="grid gap-4">
              <div className="rounded-lg bg-white p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">{t('molecular_interactions')}</h3>
                </div>
                <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  {renderItalic(t('molecular_interactions_description'))}
                </div>
              </div>
              <div className="rounded-lg bg-white p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">{t('virtual_screening')}</h3>
                </div>
                <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  {renderItalic(t('virtual_screening_description'))}
                </div>
              </div>
            </div>
            <div className="grid gap-4">
              <div className="rounded-lg bg-white p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">{t('drug_candidates')}</h3>
                </div>
                <div className="mt-2 text-sm text-gray-500 dark:text-gray-400" dangerouslySetInnerHTML={{ __html: renderItalic(t('drug_candidates_description')) || '' }}/>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-4 w-[80%] mx-auto mt-20">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-3xl md:text-4xl">
              {renderItalic(t('target_preparation_title'))}
            </h2>
            <div className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400" dangerouslySetInnerHTML={{ __html: renderItalic(t('target_preparation_description')) || '' }}/>
          </div>

          <div className="grid gap-4">
            <div className="rounded-lg bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{t('target_standardization')}</h3>
              </div>
              <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                {renderItalic(t('target_standardization_description'))}
              </div>
            </div>
            <div className="lg:grid-cols-2 grid space-x-2">
              <div className="rounded-lg bg-white p-4 shadow-sm">
                <div className="flex items-center justify-center">
                  <h3 className="text-lg font-semibold" dangerouslySetInnerHTML={{ __html: renderItalic(t('targets_falciparum')) || '' }}/>
                </div>
                <div className="grid gap-4 lg:grid-cols-2 mt-2">
                  <div className="hover:bg-gray-100 cursor-pointer rounded-lg shadow-sm" onClick={() => setIsModalOpen(true)}>
                    <div className="mt-2 p-4 text-sm text-gray-500 dark:text-gray-400">
                      {renderItalic(t('validated_ligands'))}
                      <span className="inline-block pl-12 transition-transform group-hover:translate-x-1 motion-reduce:transform-none"> -&gt; </span>
                    </div>
                  </div>
                  <div className="hover:bg-gray-100 cursor-pointer rounded-lg shadow-sm" onClick={() => setIsModalOpen2(true)}>
                    <div className="mt-2 p-4 text-sm text-gray-500 dark:text-gray-400">
                      {renderItalic(t('non_validated_ligands'))}
                      <span className="inline-block pl-12 transition-transform group-hover:translate-x-1 motion-reduce:transform-none"> -&gt; </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg bg-white p-4 shadow-sm">
                <div className="flex items-center justify-center">
                  <h3 className="text-lg font-semibold" dangerouslySetInnerHTML={{ __html: renderItalic(t('targets_vivax')) || '' }}/>
                </div>
                <div className="grid gap-4 lg:grid-cols-2 mt-2">
                  <div className="hover:bg-gray-100 cursor-pointer rounded-lg shadow-sm">
                    <div className="mt-2 p-4 text-sm text-gray-500 dark:text-gray-400">
                      {renderItalic(t('validated_ligands'))}
                      <span className="inline-block pl-12 transition-transform group-hover:translate-x-1 motion-reduce:transform-none"> -&gt; </span>
                    </div>
                  </div>
                  <div className="hover:bg-gray-100 cursor-pointer rounded-lg shadow-sm">
                    <div className="mt-2 p-4 text-sm text-gray-500 dark:text-gray-400">
                      {renderItalic(t('non_validated_ligands'))}
                      <span className="inline-block pl-12 transition-transform group-hover:translate-x-1 motion-reduce:transform-none"> -&gt; </span>
                      <div className="px-4 text-sm text-red-500">
                        {t('coming_soon')}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal
          trigger={setIsModalOpen}
          open={isModalOpen}
          title="Dados macromoleculas com redocking"
          content={tableContent}
        />

        <Modal
          trigger={setIsModalOpen2}
          open={isModalOpen2}
          title="Dados macromoleculas alvos sem validação redocking"
          content={tableContentSemRedocking}
        />
      </section>
      <Footer />
    </main>
  );
}
