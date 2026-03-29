import React from 'react'
import { home } from "../data/DummyData"
import Typewriter from "typewriter-effect"
export const Hero = () => {
  return (
  <>
  <section className="hero">
    {home.map((val,i) =>(
        <div className='heroContainer'>
            <h3 data-aos="fade-right">{val.text}</h3>
            <h1>
                <Typewriter options={{ strings: [`${val.name}`,  `${val.design}`, `${val.post}`],
                autoStart: true, loop: true }} />
            </h1>
            <p data-aos="fade-left">{val.desc}</p>
            <a href="/Alao_Michael_CV.pdf" download="Alao_Michael_CV.pdf">
                <button className='primaryBtn'data-aos="fade-up-right">Download CV</button>
            </a>
        </div>
    ))}
  </section>
  </>
  );
}
