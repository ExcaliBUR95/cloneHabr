import { ButtonHTMLAttributes } from "react";
import { classNames } from "shared/lib/classnames/classNames";
import cls from "./Button.module.scss";

export enum ThemeButton {
  CLEAR = "clear",
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  theme?: ThemeButton;
}

export const Button: React.FC<ButtonProps> = (props) => {
  const { className, children, theme, ...otherProps } = props;
  return (
    <button
      className={classNames(cls.Button, { [cls[theme]]: true }, [])}
      {...otherProps}
    >
      {children}
    </button>
  );
};
