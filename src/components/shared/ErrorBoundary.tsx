import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    if (import.meta.env.DEV) {
      console.error('[ErrorBoundary]', error, errorInfo);
    }
  }

  private handleReset = (): void => {
    this.setState({ hasError: false, error: null });
  };

  render(): React.ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '40vh',
            gap: 2,
            p: 4,
            textAlign: 'center',
          }}
        >
          <ErrorOutline sx={{ fontSize: 48, color: 'error.main', opacity: 0.7 }} />
          <Typography variant="h4" fontWeight={600}>
            Что-то пошло не так
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 400 }}>
            Произошла непредвиденная ошибка. Попробуйте обновить страницу.
          </Typography>
          {import.meta.env.DEV && this.state.error && (
            <Typography
              variant="caption"
              color="error"
              sx={{
                mt: 1,
                p: 1.5,
                bgcolor: 'error.50',
                borderRadius: 1,
                maxWidth: 500,
                wordBreak: 'break-word',
                fontFamily: 'monospace',
              }}
            >
              {this.state.error.message}
            </Typography>
          )}
          <Button variant="outlined" color="primary" onClick={this.handleReset} sx={{ mt: 1 }}>
            Попробовать снова
          </Button>
        </Box>
      );
    }

    return this.props.children;
  }
}
