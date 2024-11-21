/* eslint-disable react/prop-types */
import React, { lazy } from "react";
import "./App.css";
import { Suspense } from "react";
const Users = lazy(() => import("users/Users"));
const Products = lazy(() => import("products/Products"));

function App() {
  return (
    <>
      <h1>This is host app</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <ErrorBoundary>
          <Users />
        </ErrorBoundary>
      </Suspense>

      <Suspense fallback={<div>Loading...</div>}>
        <ErrorBoundary>
          <Products />
        </ErrorBoundary>
      </Suspense>
    </>
  );
}

export default App;

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    console.log("error", error);
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log("error", error);
    console.log("errorInfo", errorInfo);
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
