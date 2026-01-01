import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo);
        // You can also log to an error reporting service here
    }

    handleRetry = () => {
        this.setState({ hasError: false, error: null });
    };

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '100vh',
                    padding: '24px',
                    textAlign: 'center',
                    background: 'linear-gradient(180deg, #FAFBFF 0%, #F1F5F9 100%)',
                }}>
                    <div style={{
                        width: '80px',
                        height: '80px',
                        background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(239, 68, 68, 0.2) 100%)',
                        borderRadius: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '24px',
                    }}>
                        <span style={{ fontSize: '36px' }}>⚠️</span>
                    </div>
                    <h2 style={{
                        fontFamily: 'Plus Jakarta Sans, system-ui, sans-serif',
                        fontSize: '24px',
                        fontWeight: 700,
                        color: '#1E293B',
                        marginBottom: '12px',
                    }}>
                        Something went wrong
                    </h2>
                    <p style={{
                        fontSize: '16px',
                        color: '#64748B',
                        marginBottom: '24px',
                        maxWidth: '300px',
                    }}>
                        We're sorry, but something unexpected happened. Please try again.
                    </p>
                    <button
                        onClick={this.handleRetry}
                        style={{
                            padding: '12px 32px',
                            background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '12px',
                            fontSize: '16px',
                            fontWeight: 600,
                            cursor: 'pointer',
                            boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
                        }}
                    >
                        Try Again
                    </button>
                    {process.env.NODE_ENV === 'development' && this.state.error && (
                        <pre style={{
                            marginTop: '32px',
                            padding: '16px',
                            background: '#FEE2E2',
                            borderRadius: '8px',
                            fontSize: '12px',
                            color: '#991B1B',
                            textAlign: 'left',
                            maxWidth: '100%',
                            overflow: 'auto',
                        }}>
                            {this.state.error.toString()}
                        </pre>
                    )}
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
