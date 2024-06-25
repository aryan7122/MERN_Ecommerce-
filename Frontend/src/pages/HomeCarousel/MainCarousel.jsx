import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { MainCarouselData } from './MainCarouselData';

const MainCarousel = () => {
    const items = MainCarouselData.map((item, index) => (
        <div className='mb-5  '>
            <img src={item.image} alt=' ' className='cursor-pointer w-full h-[250px] object-contain absolute z-50 mt-2 xl:h-[400px] ' role='presentation' />
            <div key={index} style={{ backgroundImage: `url(${item.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }} className='blur-md w-full h-[280px]  xl:h-[420px] ' ></div>
        </div>
    ));

    return (
        <AliceCarousel
            autoPlay
            mouseTracking
            autoPlayInterval={1500}
            animationDuration={1500}
            animationType="fadeout"
            infinite
            items={items}
            touchTracking={false}
            disableButtonsControls
            disableSlideInfo
            disableDotsControls
        />
    );
};

export default MainCarousel;
