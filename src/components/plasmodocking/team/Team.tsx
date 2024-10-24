import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

const Team: React.FC = () => {
    const t = useTranslations('Team');

    const team = [
        {
            avatar: "/avatars/eduardo_hernany.jpeg",
            name: t('members.0.name'),
            title: t('members.0.title'),
            desc: t('members.0.desc'),
            linkedin: "javascript:void(0)",
            twitter: "javascript:void(0)",
            lattes: "http://lattes.cnpq.br/4440558040531746",
        },
        {
            avatar: "/avatars/fernando_zanchi.png",
            name: t('members.1.name'),
            title: t('members.1.title'),
            desc: t('members.1.desc'),
            linkedin: "https://orcid.org/0000-0003-3386-0069",
            twitter: "javascript:void(0)",
            lattes: "http://lattes.cnpq.br/0564343474986429",
        },
        {
            avatar: "/avatars/fernando_loza.png",
            name: t('members.2.name'),
            title: t('members.2.title'),
            desc: t('members.2.desc'),
            linkedin: "javascript:void(0)",
            twitter: "javascript:void(0)",
            lattes: "http://lattes.cnpq.br/2490955427740417",
        }
    ];

    return (
        <section className="pb-14">
            <div className="max-w-screen-xl mx-auto px-4 text-center md:px-8">
                <div className="max-w-xl mx-auto">
                    <h3 className="text-gray-800 text-3xl font-semibold sm:text-4xl">
                        {t('title')}
                    </h3>
                    <p className="text-gray-600 mt-3">
                        {t('description')}
                    </p>
                </div>
                <div className="mt-12">
                    <ul className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
                        {team.map((item, idx) => (
                            <li key={idx}>
                                <div className="w-24 h-24 mx-auto relative">
                                    <Image
                                        src={item.avatar}
                                        alt={item.name}
                                        layout="fill" // This makes the image fill the container
                                        className="rounded-full"
                                    />
                                </div>
                                <div className="mt-2">
                                    <Link target="_blank" href={item.lattes}>
                                        <h4 className="text-blue-700 font-semibold sm:text-lg">{item.name}</h4>
                                    </Link>
                                    <p className="text-indigo-600">{item.title}</p>
                                    <p className="text-gray-600 mt-2">{item.desc}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default Team;
