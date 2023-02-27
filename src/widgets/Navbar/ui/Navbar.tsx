/* eslint-disable i18next/no-literal-string */
import { t } from 'i18next';
import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { Modal } from 'shared/ui/Modal/Modal';
import cls from './Navbar.module.scss';

interface NavbarProps {
  className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [isAuthModal, setIsAuthModal] = React.useState(false);

    const onToggleModal = React.useCallback(() => {
        setIsAuthModal((prev) => !prev);
    }, []);

    return (
        <div className={classNames(cls.navbar, {}, [])}>
            <Button theme={ThemeButton.CLEAR_INVERTED} className={cls.links} onClick={onToggleModal}>
                {t('Войти')}
            </Button>
            <Modal isOpen={isAuthModal} onClose={onToggleModal}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Sed euismod diam et leo volutpat consequat. Praesent convallis aliquet nibh, vel commodo mauris suscipit nec.
                Integer vestibulum massa vel libero vehicula ultrices. Nullam et neque nec ante malesuada auctor eu nec urna
            </Modal>
        </div>
    );
};
