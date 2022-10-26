import { lazy } from 'react';

export const AboutPageAsync = lazy(
    () => new Promise((resolve) => {
        setTimeout(() => {
            // @ts-ignore
            resolve(import('./AboutPage'));
        }, 1500);
    }),
);
// export const AboutPageAsync = lazy(() => import("./AboutPage"))
