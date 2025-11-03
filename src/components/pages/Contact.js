import React, { useState } from 'react'
import { Heading } from '../common/Heading'
import { contact } from '../data/DummyData'

export const Contact = () => {

    const [result, setResult] = useState("");

    const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.append("access_key", "4a0918c4-8a6b-4fe7-b502-658cf628451c");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();
    setResult(data.success ? "Sent!" : "Error");
  };

  return (
    <>
    <div className='contact'>
        <div className='container'>
            <Heading title='Keep In Touch'/>
            <div className='content flexsb'>
                <div className='right'>
                    <form onSubmit={onSubmit}>
                        <div className='flex'>
                            <input type='text' placeholder='Name'  data-aos="zoom-in-down"/>
                            <input type='email' placeholder='Email'  data-aos="zoom-in-up"/>
                        </div>
                        <input type='text' placeholder='Subject' data-aos="zoom-in-up"/>
                        <textarea data-aos="zoom-in-down" name='' id='' cols='30' rows='10'></textarea>
                        <button data-aos="zoom-in-down">Submit</button>
                        <p>{result}</p>
                    </form>
                </div>
                <div className='left'>
                    {contact.map((item) => (
                        <div className='box' data-aos="zoom-in-down">
                            <i>{item.icon}</i>
                            <p>{item.text1}</p>
                            <p>{item.text2}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
    </>
  )
}
