import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Css.css';

const FAQs = () => {
    const [faqs, setFaqs] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/faqs')
            .then(response => {
                setFaqs(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the FAQ data!', error);
            });
    }, []);

    return (
        <div className="App">
            <header>
                <h1>PetSmart Services FAQ</h1>
                <nav>
                    <ul>
                        <li><a href="#grooming">Grooming</a></li>
                        <li><a href="#boarding">Boarding</a></li>
                        <li><a href="#daycare">Doggie Day Camp</a></li>
                        <li><a href="#training">Training</a></li>
                    </ul>
                </nav>
            </header>
            <main>
                {faqs.map(faq => (
                    <section key={faq._id} id={faq.category.toLowerCase()}>
                        <h2>{faq.category}</h2>
                        <h3>{faq.question}</h3>
                        <p>{faq.answer}</p>
                    </section>
                ))}
            </main>
        </div>
    );
};

export default FAQs;
