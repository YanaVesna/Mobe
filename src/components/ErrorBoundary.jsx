import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Тут ви можете виконати додаткові дії у разі виникнення помилки
    console.error("Error caught by error boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <p>Щось пішло не так. Будь ласка, перезавантажте сторінку.</p>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
