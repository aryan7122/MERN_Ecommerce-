import React from 'react'

const HomeScetionCard = ({product}) => {
    return (
        <div className='cursor-pointer flex flex-col items-center rounded-lg shadow-md overflow-hidden w-[15rem] mx-3'>
            <div className='h-[13rem] w-full'>
                <img src={product.imageUrl} alt=" "
                className='object-cover object-top w-full h-full'/>
            </div>
            <div className='p-4 '>
                <h3 className='text-lg font-medium text-black'>{product.brand} </h3>
                <p className='mt-1 text-sm text-gray-700'>{product.title} </p>

            </div>

        </div>
    )
}

export default HomeScetionCard
