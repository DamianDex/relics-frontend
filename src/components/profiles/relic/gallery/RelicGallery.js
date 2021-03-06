import React, {Component} from 'react';
import {
    Card,
    CardBody,
    CardHeader,
    Carousel,
    CarouselCaption,
    CarouselControl,
    CarouselIndicators,
    CarouselItem
} from 'reactstrap';

import './RelicGallery.css'

const items = [
    {
        src: process.env.PUBLIC_URL + '/images/slide1.jpg',
    },
    {
        src: process.env.PUBLIC_URL + '/images/slide2.jpg',
    },
    {
        src: process.env.PUBLIC_URL + '/images/slide3.jpg',
    }
];

export default class RelicGallery extends Component {
    constructor(props) {
        super(props);
        this.state = {activeIndex: 0};
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.goToIndex = this.goToIndex.bind(this);
        this.onExiting = this.onExiting.bind(this);
        this.onExited = this.onExited.bind(this);
    }

    onExiting() {
        this.animating = true;
    }

    onExited() {
        this.animating = false;
    }

    next() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
        this.setState({activeIndex: nextIndex});
    }

    previous() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
        this.setState({activeIndex: nextIndex});
    }

    goToIndex(newIndex) {
        if (this.animating) return;
        this.setState({activeIndex: newIndex});
    }

    render() {
        const {activeIndex} = this.state;

        const slides = items.map((item) => {
            return (
                <CarouselItem
                    onExiting={this.onExiting}
                    onExited={this.onExited}
                    key={item.src}
                >
                    <img class="carousel-photo" src={item.src} alt={item.altText}/>
                    <CarouselCaption captionText={item.caption} captionHeader={item.caption}/>
                </CarouselItem>
            );
        });

        return (
            <Card>
                <CardHeader>Zobacz zdjęcia</CardHeader>
                <CardBody>
                    <div style={{padding: "15px"}}>
                        <Carousel
                            activeIndex={activeIndex}
                            next={this.next}
                            previous={this.previous}
                        >
                            <CarouselIndicators items={items} activeIndex={activeIndex}
                                                onClickHandler={this.goToIndex}/>
                            {slides}
                            <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous}/>
                            <CarouselControl direction="next" directionText="Next" onClickHandler={this.next}/>
                        </Carousel>
                    </div>
                </CardBody>
            </Card>
        );
    }
}