import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import React from 'react';

export default function About() {
  return (
    <>
    <Navbar/>
    <div>
  <img src="../../public/about2.jpg" class="resized-image" />
</div>

    <div className='py-20 px-4 max-w-6xl mx-auto'>
      <h1 className='text-4xl font-bold mb-6 text-slate-800'>About CleverlyPets</h1>
      <p className='mb-6 text-slate-700 text-lg'>
        Welcome  to CleverlyPets, your trusted partner in providing the best care and products for your beloved pets. Our mission is to ensure every pet and pet owner enjoys a happy, healthy, and fulfilling life together.
      </p>
      
      <div className='mb-10'>
        <h2 className='text-2xl font-semibold mb-4 text-slate-800'>Our Story</h2>
        <p className='mb-4 text-slate-700'>
          CleverlyPets was founded with a deep love for animals and a commitment to excellence in pet care. From our humble beginnings as a small neighborhood store, we have grown into a leading pet store known for our exceptional products and services.
        </p>
        <p className='mb-4 text-slate-700'>
          We understand that pets are family, and we strive to offer the best for your furry, feathered, and scaled friends. Our team is passionate about animals and dedicated to helping you find exactly what you need to keep your pets happy and healthy.
        </p>
      </div>
  
      
      
      <div className='mb-10'>
        <h2 className='text-2xl font-semibold mb-4 text-slate-800'>Our Services</h2>
        <ul className='list-disc list-inside mb-4 text-slate-700'>
          <li>High-quality pet food and treats</li>
          <li>Grooming services</li>
          <li>Pet adoption and rescue</li>
          <li>Veterinary consultations</li>
          <li>Pet training and behavior advice</li>
        </ul>
      </div>
      
      <div className='mb-10'>
        <h2 className='text-2xl font-semibold mb-4 text-slate-800'>Meet Our Team</h2>
        <p className='mb-4 text-slate-700'>
          Our team of experts includes experienced veterinarians, professional groomers, and knowledgeable pet care specialists. We are all dedicated to providing the highest level of service and care to both pets and their owners.
        </p>
      </div>
      
      <div className='mb-10'>
        <h2 className='text-2xl font-semibold mb-4 text-slate-800'>Customer Testimonials</h2>
        <blockquote className='border-l-4 border-slate-800 pl-4 mb-4 text-slate-700'>
          "CleverlyPets has been a lifesaver for us! Their team is so knowledgeable and helpful, and our dog loves their grooming services. We wouldn't go anywhere else." - Jane D.
        </blockquote>
        <blockquote className='border-l-4 border-slate-800 pl-4 text-slate-700'>
          "The best pet store in town! Great selection of products and the staff truly cares about the animals. Highly recommend!" - Meowtopia.
        </blockquote>
      </div>
      
      <div className='mb-10'>
        <h2 className='text-2xl font-semibold mb-4 text-slate-800'>Contact Us</h2>
        <p className='mb-4 text-slate-700'>
          Have questions or need assistance? Reach out to us at <a href="mailto:ismail.kouar9@gmail.com" className='text-blue-600 underline'>ismail.kouar9@gmail.com</a> or call us at (+212)600000000. We're here to help!
        </p>
      </div>
      
      <div>
      

      </div>
     
    </div>

  <Footer/>
    </>
  );
}
