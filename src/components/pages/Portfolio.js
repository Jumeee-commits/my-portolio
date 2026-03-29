import React, { useState, useEffect } from 'react'
import { Visibility } from '@mui/icons-material'
import { Heading } from '../common/Heading'
import { useFetch } from '../../hooks/useFetch'

export const Portfolio = () => {
    const { data: portfolioItems, loading } = useFetch('/api/portfolio');
    const [list, setList] = useState([])
    const [category, setCategory] = useState(['all'])

    useEffect(() => {
        if (portfolioItems && portfolioItems.length > 0) {
            setList(portfolioItems);
            setCategory(['all', ...new Set(portfolioItems.map((item) => item.category))]);
        }
    }, [portfolioItems]);

    const filterItems = (cat) => {
        if (cat === "all") {
            setList(portfolioItems)
        } else {
            const newItems = portfolioItems.filter((item) => item.category === cat)
            setList(newItems)
        }
    }

    if (loading) return <div style={{ textAlign: 'center', padding: '50px' }}>Loading...</div>;

  return(
   <>
  <article>
    <div className="container">
        <Heading title='Portfolio'/>
        <div className="catButton">
            {category.map((category) =>(
                <button className='primaryBtn' onClick={() => filterItems(category) } data-aos="zoom-out-down">
                    {category}
                </button>
            ))}
            </div>
    
    <div className="content grid3">
        {list.map((item) => (
            <div className='box' data-aos="fade-up">
                <div className='img'>
                    <img src= {item.cover} alt='' />
                </div>
                <div className='overlay'>
                    <h3>{item.title}</h3>
                    <span>{item.name}</span>
                    <Visibility />
                </div>
            </div>
        ))}
    </div>
    </div>
  </article>
  </>
  )
}

