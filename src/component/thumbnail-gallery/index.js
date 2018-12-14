import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';

class ThumbnailGallery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentImage: 0,
    };

    this.nextImage = this.nextImage.bind(this);
    this.prevImage = this.prevImage.bind(this);
  }

  nextImage(event) {
    event.stopPropagation();

    const currentImage = this.state.currentImage;
    const nextImage = currentImage + 1;

    if (nextImage >= this.props.images.length) return;

    this.setState({ currentImage: nextImage });
  }

  prevImage(event) {
    event.stopPropagation();

    const currentImage = this.state.currentImage;
    const prevImage = this.state.currentImage - 1;

    if (currentImage <= 0) return;

    this.setState({ currentImage: prevImage });
  }

  render() {
    const { currentImage } = this.state;
    const { images } = this.props;
    const hasNextImage = currentImage < images.length - 1;
    const hasPrevImage = currentImage > 0;
    const leftArrowStateClass = hasPrevImage ? 'disabled' : '';
    const rightArrowStateClass = hasNextImage ? 'disabled' : '';

    return (
      <div className="thumbnail">
        <div
          className={`thumbnail-arrow-container thumbnail-left-arrow-container ${leftArrowStateClass}`}
          onClick={this.prevImage}
        >
          <div className="thumbnail-arrow thumbnail-left-arrow" />
        </div>
        <img src={images[currentImage]} alt="Fotos do imóvel" />
        <div
          className={`thumbnail-arrow-container thumbnail-right-arrow-container ${rightArrowStateClass}`}
          onClick={this.nextImage}
        >
          <div className="thumbnail-arrow thumbnail-right-arrow" />
        </div>
      </div>
    );
  }
}

ThumbnailGallery.defaultProps = {
  images: [],
};

ThumbnailGallery.propTypes = {
  images: PropTypes.arrayOf(String),
};

export default ThumbnailGallery;
