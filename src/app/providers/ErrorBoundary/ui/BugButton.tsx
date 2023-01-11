import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'shared/ui/Button/Button';

interface BugButtonProps {
  className?: string;
}
// Компонент для тестирования error boundary
export const BugButton = () => {
    const [error, setError] = useState(false)
    const {t} = useTranslation()
    const throwError = () => setError(!error)

    useEffect(() => {
        if(error){
            throw new Error
        }
    }, [error])

    return(
        <Button onClick={throwError} >
            {t('throw error')}
        </Button>
    )
  
}


 