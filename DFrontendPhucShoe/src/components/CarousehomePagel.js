import React, { useState } from 'react';
import '../assets/styles/CarouselHomePage.css'

import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption,
} from 'reactstrap';

const items = [
    {
        src: require('../assets/images-shoes/carousel5.png'),
        altText: 'Bước chân của bạn là câu chuyện, và chúng tôi cung cấp những cây giày để bạn viết nên hành trình đẹp nhất',
        caption: 'ĐỒNG HÀNH',
        key: 1,
    },
    {
        src: require('../assets/images-shoes/carousel4.png'),
        altText: 'Khám phá thế giới với đôi giày của chúng tôi - nơi nơi đẹp nhất bắt đầu từ bước chân của bạn.',
        caption: 'KHÁM PHÁ',
        key: 2,
    },
    {
        src: require('../assets/images-shoes/carousel3.png'),
        altText: 'Sứ mệnh của chúng tôi là làm cho mọi bước đi của bạn trở nên đặc biệt. Khám phá bộ sưu tập mới ngay hôm nay.',
        caption: 'SỨ MỆNH',
        key: 3,
    },
];

function CarouselHomepage(args) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    };

    const previous = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    };

    const goToIndex = (newIndex) => {
        if (animating) return;
        setActiveIndex(newIndex);
    };

    const slides = items.map((item) => {
        return (
            <CarouselItem
                onExiting={() => setAnimating(true)}
                onExited={() => setAnimating(false)}
                key={item.src}
            >
                <img src={item.src} alt={item.altText} className='img' />
                <CarouselCaption
                    captionText={item.altText}
                    captionHeader={item.caption}
                />
            </CarouselItem>
        );
    });

    return (
        <Carousel className='carousel'
            activeIndex={activeIndex}
            next={next}
            previous={previous}
            {...args}
        >
            <CarouselIndicators
                items={items}
                activeIndex={activeIndex}
                onClickHandler={goToIndex}
            />
            {slides}
            <CarouselControl
                direction="prev"
                directionText="Previous"
                onClickHandler={previous}
            />
            <CarouselControl
                direction="next"
                directionText="Next"
                onClickHandler={next}
            />
        </Carousel>
    );
}

export default CarouselHomepage;