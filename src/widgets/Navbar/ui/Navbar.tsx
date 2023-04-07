/* eslint-disable i18next/no-literal-string */
import { getUserAuthData, userAction } from 'entries/User';
import { LoginModal } from 'features/AuthByUsername';
import { t } from 'i18next';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import cls from './Navbar.module.scss';

interface NavbarProps {
  className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [isAuthModal, setIsAuthModal] = React.useState(false);
    const authData = useSelector(getUserAuthData);
    const dispatch = useDispatch();

    const onCloseModal = React.useCallback(() => {
        setIsAuthModal(false);
    }, []);

    const onShowModal = React.useCallback(() => {
        setIsAuthModal(true);
    }, []);

    const onLogout = useCallback(() => {
        dispatch(userAction.Logout());
    }, [dispatch]);

    if (authData) {
        return (
            <div className={classNames(cls.navbar, {}, [])}>
                <Button theme={ThemeButton.CLEAR_INVERTED} className={cls.links} onClick={onLogout}>
                    {t('Выйти')}
                </Button>
            </div>
        );
    }

    return (
        <div className={classNames(cls.navbar, {}, [])}>
            <Button theme={ThemeButton.CLEAR_INVERTED} className={cls.links} onClick={onShowModal}>
                {t('Войти')}
            </Button>
            {isAuthModal && (
                <LoginModal isOpen={isAuthModal} onClose={onCloseModal}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </LoginModal>
            )}
        </div>
    );
};
