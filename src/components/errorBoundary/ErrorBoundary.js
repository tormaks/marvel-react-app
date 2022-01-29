import { Component } from "react";
import ErrorMessage from "../errorMessage/ErrorMessage";

class ErrorBoundary extends Component {

   state = {
      error: false,
   }

   // static getDerivedStateFromError(error) {
   //    return {error: true};
   // }

   componentDidCatch() {
      this.setState({
         error: true,
      })
   }

   render() {
      return (
         this.state.error ? <ErrorMessage/> : this.props.children
      )
   }
}

export default ErrorBoundary;