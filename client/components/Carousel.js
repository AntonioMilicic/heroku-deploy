import React from 'react';

class Carousel extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedCarousel: 0,
      carousel: [{
        cssId: 'thumbnail-1',
        thumbnailTitle: 'Multiple selection',
        thumbnail: '/static/images/carouselSelection.jpg',
        thumbtxt: `This is multiple selection quiz, your goal is to fill in the blank ____ spots`
      }, {
        cssId: 'thumbnail-2',
        thumbnailTitle: 'Can I google?',
        thumbnail: '/static/images/carouselCanGoogle.jpg',
        thumbtxt: 'You may google, but the point of quiz is to learn on your mistakes, so google it after the quiz, once we evaluate your answers'
      }, {
        cssId: 'thumbnail-3',
        thumbnailTitle: 'Be helpful',
        thumbnail: '/static/images/carouselHelpOthers.jpg',
        thumbtxt: `Don't be that guy in the middle. If you have knowledge share it, use github, stackoverflow etc.`
      }, {
        cssId: 'thumbnail-4',
        thumbnailTitle: 'Sign up',
        thumbnail: '/static/images/carouselSignin.jpg',
        thumbtxt: 'Sign up to play, share your score, expand your knowledge...'
      }, {
        cssId: 'thumbnail-5',
        thumbnailTitle: 'Have fun',
        thumbnail: '/static/images/carouselStart.jpg',
        thumbtxt: 'Most of all, have fun'
      }]
    };
  }
  componentDidMount() {
    const intervalId = setInterval(() => this.changeSelectedCarousel('next'), 10000);
    this.setState({intervalId: intervalId});
  }
  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }
  changeSelectedCarousel(command) {
    let selectedCarousel = this.state.selectedCarousel;
    const lastIndex = this.state.carousel.length - 1;

    if (command === 'previous') {
      if (selectedCarousel <= 0) selectedCarousel = lastIndex;
      else selectedCarousel--;
    } else if (command === 'next') {
      if (selectedCarousel < lastIndex) selectedCarousel++;
      else selectedCarousel = 0;
    }

    clearInterval(this.state.intervalId);
    const intervalId = setInterval(() => this.changeSelectedCarousel('next'), 10000);
    this.setState({ selectedCarousel, intervalId });
  }

  render() {
    return (
      <div className="carouselContainer carousel-wrapper">
        <div className="column-move-left"
          onClick={() => this.changeSelectedCarousel('previous')}>
          <i className="test fa fa-arrow-left" />
        </div>
        <article className="carousel-display">
          <img className="carousel-images"
            src={this.state.carousel[this.state.selectedCarousel].thumbnail} />
          <div className="carousel-box"
            id={this.state.carousel[this.state.selectedCarousel].cssId}>
            <h3>
              {this.state.carousel[this.state.selectedCarousel].thumbnailTitle}
            </h3>
            <p>
              {this.state.carousel[this.state.selectedCarousel].thumbtxt}
            </p>
          </div>
        </article>
        <div className="column-move-right"
          onClick={() => this.changeSelectedCarousel('next')}>
          <i className="fa fa-arrow-right" />
        </div>
      </div>
    );
  }
}

export default Carousel;
