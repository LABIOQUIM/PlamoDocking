const renderItalic = (text: string) => {
    const parts = text.split(/(Plasmodium|falciparum|vivax)/gi);
    return parts.map((part) =>
      ['Plasmodium', 'falciparum', 'vivax', 'Falciparum', 'Vivax'].includes(part) ? `<em>${part}</em>` : part
    ).join('');
};

export default renderItalic;