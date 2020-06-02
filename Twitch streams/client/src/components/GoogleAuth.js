import React from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";

class GoogleAuth extends React.Component {
  // state = { isSignedIn: null };

  componentDidMount() {
    // Init library
    window.gapi.load("client: auth2", () => {
      window.gapi.client
        .init({
          client_id:
            "461122257725-ijbu3u9lchqh1g68agrunil16qpk2mgv.apps.googleusercontent.com",
          scope: "email",
        })
        .then(() => {
          // Assign auth instance
          this.auth = window.gapi.auth2.getAuthInstance();

          // Update component state, rerender
          // Update auth state on redux store
          this.onAuthChange(this.auth.isSignedIn.get());

          // console.log(this.auth.currentUser.get().getId());
          // listener for changes
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      //  (auth user ID)
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button className="ui red google button" onClick={this.onSignOutClick}>
          <i className="google icon" /> Sign Out
        </button>
      );
    } else {
      return (
        <button className="ui red google button" onClick={this.onSignInClick}>
          <i className="google icon" /> Use Google to Sign In
        </button>
      );
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
