import React from 'react'
import { FormatQuote } from '@mui/icons-material'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useFetch } from '../../hooks/useFetch';

export const Testimonials = () => {
    const { data: testimonials, loading } = useFetch('/api/testimonials');
    
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };

    if (loading) return <div style={{ textAlign: 'center', padding: '50px' }}>Loading...</div>;

  return (
    <>
    <section className='testimonials hero'>
        <div className='container'>
            
        <Slider {...settings}>
            {testimonials.map((val) => (
                <div key={val.id} className='box'>
                    <i data-aos="zoom-out-up">
                        <FormatQuote />
                    </i>
                        <p data-aos="zoom-out-down">{val.text}</p>
                        <div className='img'>
                            <img src={val.image} alt='' data-aos="zoom-out-right" />
                        </div>
                        <h3 data-aos="zoom-out-left">{val.name}</h3>
                        <label data-aos="zoom out">{val.post}</label>
                    
                </div>
            ))}
        </Slider>
        </div>
    </section>
    </>
  )
}
