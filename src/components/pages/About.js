import React from 'react'
import { Heading } from "../common/Heading";
import { about } from "../data/DummyData";

export const About = () => {
  return  <>
  <section className="about">
    <div className='container flex'>
        {about.map((val, i) =>(
            <>
                <div className="left">
                    <img src={val.cover} alt='' data-aos="fade-down-right"/>
                </div>
                <div className='right' data-aos="fade-down-left">
                    <Heading title= "About Me"/>
                    <p>{val.desc}</p>
                    <p>{val.desc1}</p>
                    <a href="/Alao_Michael_CV.pdf" download="Alao_Michael_CV.pdf">
                        <button>Download CV</button>
                    </a>
                    <a href="/Alao_Michael_CV.pdf" download="Alao_Michael_CV.pdf">
                        <button className='primaryBtn'>Download CV</button>
                    </a>
                </div>
            </>
        ))}
    </div>
</section>
</>
  
}
