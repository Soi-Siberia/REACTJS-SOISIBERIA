import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars'; // Dùng bản cũ
import './CustomScrollbars.scss';

class CustomScrollbars extends Component {
    ref = React.createRef();

    componentDidMount() {
        if (this.ref.current) {
            this.ref.current.container.addEventListener("wheel", this.handleWheel, { passive: true });
            this.ref.current.container.addEventListener("touchstart", this.handleTouchStart, { passive: true });
        }
    }

    componentWillUnmount() {
        if (this.ref.current) {
            this.ref.current.container.removeEventListener("wheel", this.handleWheel);
            this.ref.current.container.removeEventListener("touchstart", this.handleTouchStart);
        }
    }

    handleWheel = (e) => {
        e.stopPropagation();
    };

    handleTouchStart = (e) => {
        // Không chặn hành vi mặc định của touchstart
    };

    getScrollLeft = () => this.ref.current?.getScrollLeft();
    getScrollTop = () => this.ref.current?.getScrollTop();

    scrollToBottom = () => {
        if (!this.ref.current) return;
        const targetScrollTop = this.ref.current.getScrollHeight();
        this.scrollTo(targetScrollTop);
    };

    scrollTo = (targetTop) => {
        if (!this.ref.current) return;
        const scrollbars = this.ref.current;
        const originalTop = scrollbars.getScrollTop();
        let iteration = 0;

        const scroll = () => {
            if (iteration > 30) return;
            iteration++;
            scrollbars.scrollTop(originalTop + ((targetTop - originalTop) / 30) * iteration);
            requestAnimationFrame(scroll);
        };

        scroll();
    };

    renderTrackHorizontal = (props) => <div {...props} className="track-horizontal" />;
    renderTrackVertical = (props) => <div {...props} className="track-vertical" />;
    renderThumbHorizontal = (props) => <div {...props} className="thumb-horizontal" />;
    renderThumbVertical = (props) => <div {...props} className="thumb-vertical" />;
    renderNone = () => <div />;

    render() {
        const { className, disableVerticalScroll, disableHorizontalScroll, children, ...otherProps } = this.props;
        return (
            <Scrollbars
                ref={this.ref}
                autoHide
                autoHideTimeout={200}
                hideTracksWhenNotNeeded
                className={`${className ? className + ' ' : ''}custom-scrollbar`}
                {...otherProps}
                renderTrackHorizontal={disableHorizontalScroll ? this.renderNone : this.renderTrackHorizontal}
                renderTrackVertical={disableVerticalScroll ? this.renderNone : this.renderTrackVertical}
                renderThumbHorizontal={disableHorizontalScroll ? this.renderNone : this.renderThumbHorizontal}
                renderThumbVertical={disableVerticalScroll ? this.renderNone : this.renderThumbVertical}
            >
                {children}
            </Scrollbars>
        );
    }
}

export default CustomScrollbars;
