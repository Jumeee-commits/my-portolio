import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Visibility, GitHub, Public } from '@mui/icons-material'
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
            {category.map((cat, index) =>(
                <button key={index} className='primaryBtn' onClick={() => filterItems(cat) } data-aos="zoom-out-down">
                    {cat}
                </button>
            ))}
            </div>
    
    <div className="content grid3">
        {list.map((item, index) => (
            <div key={item._id || index} className='box' data-aos="fade-up">
                <div className='img'>
                    <img src={item.cover} alt={item.title} />
                </div>
                <div className='overlay'>
                    {/* Background link that covers the whole image/overlay area */}
                    {item.webLink && (
                        <a 
                            href={item.webLink} 
                            target="_blank" 
                            rel="noreferrer" 
                            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}
                        >
                            <span style={{ display: 'none' }}>View Live Site</span>
                        </a>
                    )}
                    
                    <div style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
                        <h3>{item.title}</h3>
                        <span>{item.name}</span>
                        <div className='overlayIcons'>
                            <Link to={`/portfolio/${item._id}`} style={{ color: 'inherit' }}>
                                <Visibility />
                            </Link>
                            {item.githubLink && (
                                <a href={item.githubLink} target="_blank" rel="noreferrer" style={{ color: 'inherit' }} onClick={(e) => e.stopPropagation()}>
                                    <GitHub />
                                </a>
                            )}
                            {item.webLink && (
                                <a href={item.webLink} target="_blank" rel="noreferrer" style={{ color: 'inherit' }} onClick={(e) => e.stopPropagation()}>
                                    <Public />
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        ))}
    </div>
    </div>
  </article>
  </>
  )
}

