import React, { useState } from 'react'
import { Heading } from '../common/Heading'
import { contact } from '../data/DummyData'

export const Contact = () => {
    const [result, setResult] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        setResult("Sending....");
        
        const formObj = {
            name: event.target.name.value,
            email: event.target.email.value,
            subject: event.target.subject.value,
            message: event.target.message.value
        };

        try {
            const apiUrl = process.env.REACT_APP_API_URL || 'https://my-portolio-ulg3.vercel.app';
            const response = await fetch(`${apiUrl}/api/contact`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formObj)
            });

            const data = await response.json();
            
            if (data.success) {
                setResult("Message Sent Successfully!");
                event.target.reset(); // Clear the form
            } else {
                setResult(data.message || "Something went wrong. Please try again.");
            }
        } catch (error) {
            console.error("Form submission error:", error);
            setResult("Failed to send message. Please check your connection.");
        } finally {
            setIsSubmitting(false);
            
            // Clear success message after 5 seconds
            setTimeout(() => {
                setResult("");
            }, 5000);
        }
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
                            <input type='text' name='name' placeholder='Name' required data-aos="zoom-in-down"/>
                            <input type='email' name='email' placeholder='Email' required data-aos="zoom-in-up"/>
                        </div>
                        <input type='text' name='subject' placeholder='Subject' required data-aos="zoom-in-up"/>
                        <textarea data-aos="zoom-in-down" name='message' placeholder='Your Message...' required cols='30' rows='10'></textarea>
                        
                        <button 
                            type="submit" 
                            disabled={isSubmitting} 
                            data-aos="zoom-in-down"
                            style={{ opacity: isSubmitting ? 0.7 : 1, cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
                        >
                            {isSubmitting ? 'Sending...' : 'Submit'}
                        </button>
                        
                        {result && (
                            <p style={{ 
                                marginTop: '15px', 
                                padding: '10px', 
                                borderRadius: '5px',
                                color: result.includes("Successfully") ? '#155724' : (result.includes("Sending") ? '#004085' : '#721c24'),
                                backgroundColor: result.includes("Successfully") ? '#d4edda' : (result.includes("Sending") ? '#cce5ff' : '#f8d7da'),
                                border: `1px solid ${result.includes("Successfully") ? '#c3e6cb' : (result.includes("Sending") ? '#b8daff' : '#f5c6cb')}`
                            }}>
                                {result}
                            </p>
                        )}
                    </form>
                </div>
                <div className='left'>
                    {contact.map((item, index) => (
                        <div className='box' key={index} data-aos="zoom-in-down">
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
