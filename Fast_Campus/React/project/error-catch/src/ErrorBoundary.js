import React, { Component } from 'react';
import * as Sentry from '@sentry/react';

class ErrorBoundary extends Component {
    state = {
        error: false,
    };

    componentDidCatch(error, info) {
        console.log('에러가 발생했습니다.');
        console.log({
            error,
            info
        });
        this.setState({
            error: true,
        });

        if(process.env.NODE_ENV === 'production') {
            Sentry.captureException(error, { extra: info });
        }
    }

    render() {
        if(this.state.error === true) {
            return <h1>Error Occur!</h1>
        }
        return this.props.children;
    };
}

export default ErrorBoundary;