import { render } from '@testing-library/react';
import React, { ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import { MemoryRouter } from 'react-router-dom';
import i18nForTests from 'shared/config/i18n/i18nForTest';

export interface renderWithRouterOptions {
    route: string;
}

export function renderWithRouter(component: ReactNode, options: renderWithRouterOptions) {
    const {
        route,
    } = options;

    return render(

        <MemoryRouter initialEntries={[]}>
            <I18nextProvider i18n={i18nForTests}>
                {component}
            </I18nextProvider>
        </MemoryRouter>,
    );
}
