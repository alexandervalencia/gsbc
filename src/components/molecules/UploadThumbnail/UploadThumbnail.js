import React, { Component } from 'react';

class UploadThumbnail extends Component {
  state = {
    loading: false,
    thumb: undefined,
  };

  componentDidUpdate(prevProps) {
    if (prevProps.file !== this.props.file) {
      this.setState({ loading: true }, () => {
        let reader = new FileReader();

        reader.onloadend = () => {
          this.setState({ loading: false, thumb: reader.result });
        };

        reader.readAsDataURL(this.props.file);
      });
    }
  }

  render() {
    const { file } = this.props;
    const { loading, thumb } = this.state;

    if (!file) {
      return null;
    }

    if (loading) {
      return <p>loading...</p>;
    }

    return <img src={thumb} alt={file.name} className="img-thumbnail my-2" height={400} width={250} />;
  }
}

export default UploadThumbnail;
