import { AxiosInstance } from "axios";
import React, { Component } from "react";
import Modal from "../../components/UI/Modal/Modal";
import MyAux from "../MyAux/MyAux";
import { RouteComponentProps } from "react-router-dom";

interface thisState {
  error: string | number,
  errorMessage: string
  
}

interface wrappedCompInterface extends React.ComponentClass<RouteComponentProps> {

} 



const withErrorHandler = (WrappedComponent: wrappedCompInterface, axios: AxiosInstance) => {
  return class extends Component<RouteComponentProps> {
    state: thisState = {
      error: "",
      errorMessage: "you've got an error message damn...."
    };

    reqInterceptor = 0;
    resInterceptor = 0;

    componentWillMount() {
      this.reqInterceptor = axios.interceptors.request.use(req => {
        this.setState({error: ""});
        return req;
      });
      this.resInterceptor = axios.interceptors.response.use(res => res, (error) => {
        this.setState({error: "woops! " + error});
        console.log(this.state.error);
      });
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    errorConfirmedHandler = (): void => {
      this.setState({error: ""});
    }

    render() {
      return (
        <MyAux>
          <Modal show={this.state.error !== "" ? true : false} modalClosed={this.errorConfirmedHandler}>{this.state.error ? this.state.error : null}</Modal>
          <WrappedComponent {...this.props} />
        </MyAux>
      );
    }
  };
};

export default withErrorHandler;
