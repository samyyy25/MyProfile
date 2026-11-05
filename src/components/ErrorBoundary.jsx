import { Component } from "react";

/** Catches failed lazy chunks / render errors so a hiccup never leaves a blank page. */
export default class ErrorBoundary extends Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <div className="fallback" role="alert">
        <p>Something went wrong loading this view.</p>
        <button type="button" className="btn btn--solid" onClick={() => window.location.reload()}>
          Reload
        </button>
      </div>
    );
  }
}
