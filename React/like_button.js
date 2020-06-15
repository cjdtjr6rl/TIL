'use strict';

const e = React.createElement;

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    if (this.state.liked) {
      return 'You liked this.';
    }

    // return e(
    //   'button',
    //   { onClick: () => this.setState({ liked: true }) },
    //   'Like'
    // );
    
    // use JSX
    // It is useful when you write UI code
    // express 'Like' button
    return (
        <button onClick={() => this.setState({ liked: true })}>
            Like
        </button>
    );
  }
}

// Find the div tag and add a React Component to it called 'Like' button
const domContainer =
document.querySelector('#like_button_container');
ReactDOM.render(e(LikeButton), domContainer);