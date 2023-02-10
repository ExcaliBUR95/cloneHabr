/* eslint-disable i18next/no-literal-string */
/* eslint-disable react/no-unescaped-entities */
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './NotFoundPage.module.scss';

interface NotFoundPageProps {
    className?: string;
  }

export const NotFoundPage = ({ className }: NotFoundPageProps) => {
    const { t, i18n } = useTranslation();
    return (
        <div className={classNames(cls.NotFoundPage, {}, [className])}>
            (t('Страница не найдена'))
        </div>
    );
};
