/** @jsxImportSource @emotion/react */
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/state/AuthContext';
import { LoadingIndicator } from '@/components/StyledWidgets';

interface AuthWrapperProps {
    children: React.ReactNode;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
    const { isLoggedIn, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !isLoggedIn) {
            router.replace('/');
        }
    }, [isLoading, isLoggedIn, router]);

    if (isLoading) {
        return <LoadingIndicator />;
    }

    if (!isLoggedIn) {
        return <LoadingIndicator />;
    }

    return <>{children}</>;
};

export default AuthWrapper;
