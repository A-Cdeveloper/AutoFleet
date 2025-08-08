import React, { Component, type ReactNode } from "react";
import Button from "./Button";
import Headline from "./Headline";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleRetry = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex flex-col min-h-screen">
          <main className="flex-1 w-full max-w-7xl mx-auto p-5 flex flex-col justify-center items-center">
            <div className="w-[150px] h-[150px] bg-auto-error/10 rounded-full flex items-center justify-center mb-6">
              <svg
                className="w-16 h-16 text-auto-error"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>

            <Headline level={2} className="text-center mb-4">
              Nešto je pošlo naopako
            </Headline>

            <p className="text-gray-600 text-center mb-6 max-w-md">
              Došlo je do neočekivane greške. Molimo pokušajte ponovo.
            </p>

            <div className="flex gap-4">
              <Button
                variation="primary"
                size="medium"
                onClick={this.handleReload}
              >
                Osveži stranicu
              </Button>
              <Button
                variation="secondary"
                size="medium"
                onClick={this.handleRetry}
              >
                Pokušaj ponovo
              </Button>
            </div>
          </main>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
