import { render } from '@testing-library/react';
import {  ReactNode} from 'react';
import { I18nextProvider } from 'react-i18next';
import i18nForTest from 'shared/config/i18n/i18nForTest';

const renderWithTranslation = (component: ReactNode) => {
    return render(
        <I18nextProvider i18n={i18nForTest}>
        {component}
      </I18nextProvider>
    )
};

export default renderWithTranslation;