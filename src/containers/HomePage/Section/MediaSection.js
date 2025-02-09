import React, { Component } from "react";
import { connect } from "react-redux";
import "./MediaSection.scss";


class MediaSection extends Component {


  render() {
    return (
        <React.Fragment>

            <div className="Media-section">
                <div className="Media-title">
                    <h2>Truyền thông nói về BookingCare</h2>
                </div>
                <div className="Media-conten">
                    <div className="Media-conten-videos">
                    <iframe
                      className="media-videos"
                      src="https://www.youtube.com/embed/KYgZ8glWozk?enablejsapi=1"
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      loading="lazy"
                  ></iframe>
                    </div>
                    <div className="Media-logo">
                        <div className="media-logo-item">logo 1</div>
                        <div className="media-logo-item">logo 2</div>
                        <div className="media-logo-item">logo 3</div>
                        <div className="media-logo-item">logo 4</div>
                        <div className="media-logo-item">logo 5</div>
                        <div className="media-logo-item">logo 6</div>
                        <div className="media-logo-item">logo 7</div>
                        <div className="media-logo-item">logo 8</div>

                    </div>
                </div>
            </div>


        </React.Fragment>

    );
  }
}



const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(MediaSection);
