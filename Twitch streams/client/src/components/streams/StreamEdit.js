import React from "react";
import { connect } from "react-redux";
import { fetchStream, editStream } from "../../actions";
// edit stream = where ID comes from
import StreamForm from "./StreamForm";

class StreamEdit extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  onSubmit = (formValues) => {
    // console.log(formValues);
    this.props.editStream(this.props.match.params.id, formValues);
  };

  render() {
    // console.log(this.props);
    // Props now has stream object

    if (!this.props.stream) {
      return <div>Loading...</div>;
    }

    const { title, description } = this.props.stream;
    return (
      <div>
        <h3>Edit Stream</h3>
        <StreamForm
          // initial values in form fields
          initialValues={{ title, description }}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

// ownProps = props object in SteamEdit component
const mapStateToProps = (state, ownProps) => {
  // console.log(state);
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream, editStream })(
  StreamEdit
);
