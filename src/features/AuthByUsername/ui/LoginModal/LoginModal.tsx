import { PropsWithChildren, Suspense } from 'react';
import { Modal } from 'shared/ui/Modal/Modal';
import { classNames } from 'shared/lib/classNames/classNames';
import { Loader } from 'shared/ui/Loader/Loader';
import cls from './LoginModal.module.scss';
import { LoginFormAsync } from '../LoginForm/LoginForm.async';

interface LoginModalProps {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal = (props: PropsWithChildren<LoginModalProps>) => {
    const { className, isOpen, onClose } = props;
    return (
        <Modal lazy={true} isOpen={isOpen} onClose={onClose} className={classNames(cls.LoginModal, {}, [className])}>
            <Suspense fallback={<Loader />}>
                <LoginFormAsync />
            </Suspense>
        </Modal>
    );
};
