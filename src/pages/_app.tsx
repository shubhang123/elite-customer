/** @jsxImportSource @emotion/react */
import type { AppProps } from 'next/app';
import { AppStateProvider } from '@/state/AppStateContext';
import { AuthProvider } from '@/state/AuthContext';
import { GlobalStyles } from '@/styles/global';
import ErrorBoundary from '@/components/ErrorBoundary';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ErrorBoundary>
            <AppStateProvider>
                <AuthProvider>
                    <GlobalStyles />
                    <Component {...pageProps} />
                </AuthProvider>
            </AppStateProvider>
        </ErrorBoundary>
    );
}
