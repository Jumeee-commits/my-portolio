import React from 'react'
import { Heading } from '../common/Heading'
import { useFetch } from '../../hooks/useFetch'

export const Blog = () => {
  const { data: blogItems, loading } = useFetch('/api/blog');

  if (loading) return <div style={{ textAlign: 'center', padding: '50px' }}>Loading...</div>;

  return (
    <>
    <section className='blog'>
        <div className='container'>
            <Heading title='Blog'/>
         <div className='content grid3'>
            {blogItems.map((item) =>{
                return(
                <div key={item.id} className='box' data-aos="flip-left">
                    <div className='img' data-aos="flip-up">
                        <img src={item.cover} alt=''data-aos="flip-down"/>
                    </div>
                    <div className='text'>
                        <h3 data-aos="flip right">{item.title}</h3>
                        <label data-aos="flip-left">
                            By {item.author} {item.date}
                        </label>
                        <p data-aos="fade-up-right">{item.desc}</p>
        
                    </div>
                </div>
                )
            })}
         </div>
        </div>
    </section>
    </>
  )
}
