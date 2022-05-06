import parse from 'date-fns/parse';
import formatDistanceStrict from 'date-fns/formatDistanceStrict';

interface UseDate {
  fromNow(date: string, locale: string): Promise<string>;
}

const useDate = (): UseDate => {
  const fromNow = async (date: string, locale: string): Promise<string> => {
    const importLocale = () => import(`date-fns/locale`);
    const locales = await importLocale();
    return formatDistanceStrict(
      parse(date, 'yyyy-MM-dd', new Date()),
      new Date(),
      {
        locale: locales[locale.split('_')[0].toLowerCase()],
        addSuffix: true,
        roundingMethod: 'round',
      },
    );
  };

  return {
    fromNow,
  };
};

export default useDate;
