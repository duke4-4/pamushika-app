import { Component, ReactNode, useState } from "react";
import { AlertTriangle } from "lucide-react";
import Welcome from "./pages/Welcome";
import SplashScreen from "./components/SplashScreen";

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<{ children: ReactNode }, ErrorBoundaryState> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-white px-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
            <h2 className="font-bold text-gray-900 mb-2">Something went wrong</h2>
            <p className="text-sm text-gray-500 mb-4">{this.state.error?.message}</p>
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              className="px-6 py-2.5 bg-green-600 text-white rounded-full font-semibold text-sm"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  const [splashDone, setSplashDone] = useState(false);

  return (
    <div className="w-full min-h-screen max-w-md mx-auto bg-white relative">
      {/* MARKER-MAKE-KIT-INVOKED */}
      {!splashDone && <SplashScreen onDone={() => setSplashDone(true)} />}
      <ErrorBoundary>
        <Welcome />
      </ErrorBoundary>
    </div>
  );
}
