import React, { useState } from 'react';
import HomeScetionCard from './HomeScetionCard';
import AliceCarousel from 'react-alice-carousel';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import 'react-alice-carousel/lib/alice-carousel.css';
import { useNavigate } from 'react-router-dom';
// 

const HomeScetionCarousel = ({ mens_kurta_data, sectionName }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        // Navigate to the product detail page when the product is clicked
        navigate('/product'); // Replace ':productId' with the actual product ID
    };

    const [activeIndex, setActiveIndex] = useState(0);

    // Calculate the total number of items based on the provided array length
    const totalItems = mens_kurta_data.length;

    const responsive = {
        0: { items: 1.8 },
        400: { items: 2.5 },
        600: { items: 3 },
        770: { items: 4 },
        1000: { items: 5 },
        1300: { items: 5 },
        1400: { items: 7 },
        1600: { items: 8 },
    };

    const slideNext = () => {
        // Check if activeIndex is within valid range (0 to totalItems - 1)
        if (activeIndex < totalItems - 1) {
            setActiveIndex(activeIndex + 1);
        }
    };

    const slidePrev = () => {
        // Check if activeIndex is within valid range (0 to totalItems - 1)
        if (activeIndex > 0) {
            setActiveIndex(activeIndex - 1);
        }
    };

    const handleSlideChanged = ({ item }) => {
        setActiveIndex(item);
    };

    const items = mens_kurta_data.slice(0, 25).map((item) => <HomeScetionCard product={item} />);

    return (
        <div className="mt-2 " >
            <h2 className='text-2xl ml-6 border-b-2 w-fit font-bold'>{sectionName}</h2>
            <div className='relative m-auto md:pl-3 p-2 thumbs '
 >
                <AliceCarousel
                    onClick={handleClick}
                    mouseTracking
                    items={items}
                    responsive={responsive}
                    controlsStrategy="alternate"
                    infinite
                    autoPlay
                    autoPlayInterval={3000}
                    disableDotsControls
                    onSlideChanged={handleSlideChanged}
                    activeIndex={activeIndex}
                    renderPrevButton={({ isDisabled }) => (
                        <button onClick={slidePrev} className={`left-0 btn-prev z-10 absolute top-[7rem] shadow-lg bg-white shadow-black rounded-sm active:text-slate-600 active:shadow-lg py-2 hover:scale-[1.1] ${activeIndex === 0 ? 'opacity-50 pointer-events-none' : ''}`}>
                            <ArrowLeftIcon />
                        </button>
                    )}
                    renderNextButton={({ isDisabled }) => (
                        <button onClick={slideNext} className={`btn-next z-10 absolute right-3 top-[7rem] shadow-lg shadow-black rounded-sm bg-white active:text-slate-600 active:shadow-lg py-2 hover:scale-[1.1] ${activeIndex === items.length - 1 ? 'opacity-50 pointer-events-none' : ''}`}>
                            <ArrowRightIcon />
                        </button>
                    )}
                />
            </div>
        </div>
    );
};

export default HomeScetionCarousel;
