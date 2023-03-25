import type { PropsWithChildren } from 'react';
import { Modal } from 'shared/ui/Modal/Modal';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './LoginModal.module.scss';
import { LoginForm } from '../LoginForm/LoginForm';

interface LoginModalProps {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal = (props: PropsWithChildren<LoginModalProps>) => {
    const { className, isOpen, onClose } = props;

    return (
        <Modal lazy={true} isOpen={isOpen} onClose={onClose} className={classNames(cls.LoginModal, {}, [className])}>
            <LoginForm />
        </Modal>
    );
};
