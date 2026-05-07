import React, { ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-red-50 p-6">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-lg w-full border border-red-100">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h2>
            <p className="text-gray-700 mb-4">The application crashed. Here is the error:</p>
            <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm text-red-500 mb-6 max-h-60">
              {this.state.error?.message}
              {"\n"}
              {this.state.error?.stack}
            </pre>
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
