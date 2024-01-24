import { Component, ReactNode, ReactElement } from "react";

interface IErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactElement;
}

interface IErrorBoundaryState {
  hasError: boolean;
}
export class ErrorBoundary extends Component<
  IErrorBoundaryProps,
  IErrorBoundaryState
> {
  constructor(props: IErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    const { children, fallback = <h1>Something went wrong.</h1> } = this.props;

    return this.state.hasError ? fallback : children;
  }
}

export default ErrorBoundary;
