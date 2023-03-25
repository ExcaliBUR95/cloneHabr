import { classNames } from 'shared/lib/classNames/classNames';
import type { PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import cls from './LoginForm.module.scss';

interface LoginFormProps {
className?: string;
}

export const LoginForm = (props: PropsWithChildren<LoginFormProps>) => {
    const { className } = props;
    const { t } = useTranslation();
    return (
        <div className={classNames(cls.LoginForm, {}, [className])}>
            <Input autoFocus={true} placeholder={t('Введите username')} className={cls.input} type="text" />
            <Input placeholder={t('Введите password')} className={cls.input} type="text" />
            <Button className={cls.loginBtn}>
                {t('Войти')}
            </Button>
        </div>
    );
};
