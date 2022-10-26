import { lazy } from 'react';

export const MainPageAsync = lazy(
    () => new Promise((resolve) => {
        // @ts-ignore
        setTimeout(() => resolve(import('./MainPage')));
    }),
);
// Так в реальных проектах делать не стоит, все это делается, потому что локально подргужается
// если вдруг будут ошибки, ts-igonre к вашим услугам
