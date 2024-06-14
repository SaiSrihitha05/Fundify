import React from 'react';
import './Home.css'; // Import your CSS file
import bgimage from './bg.jpg'

function Home() {
  return (
    <div className="home-container">
      <h1>We Rise By Lifting Others</h1>

      {/* Displaying the image using <img> tag */}
      <img src={bgimage} alt="Background" />

      {/* Child Education Section */}
      <section className="home-section child-education">
        <div className="section-content">
          <h2>Every Child Deserves Education</h2>
          <p>
            Every child deserves the right to education, yet many are denied this fundamental right due to socio-economic barriers. Our mission is to change this narrative by offering a lifeline to those in need. By supporting our cause, you become an advocate for change, a beacon of hope for children longing for a brighter tomorrow. Together, we can rewrite their stories and sow the seeds of empowerment that will flourish for generations to come.
          </p>
        </div>
        <img src="https://www.indiaspend.com/h-upload/2022/02/02/646292-updated-budget-2022-education-samagra-shiksha-1500.jpg" alt="Child Education" />
      </section>

      {/* Natural Disasters Section */}
      <section className="home-section natural-disasters">
        <div className="section-content">
          <h2>Natural Disasters Relief</h2>
          <p>
            Natural disasters know no bounds, indiscriminately impacting lives regardless of race, religion, or socio-economic status. Through our crowdfunding initiative, we strive to foster unity and compassion in times of adversity. Your contributions will serve as a lifeline for communities grappling with the aftermath of disasters, offering them the support and resources needed to embark on the path to recovery. Together, we can emerge stronger from the rubble, exemplifying the resilience of the human spirit.
          </p>
        </div>
        <img src="https://www.newsclick.in/sites/default/files/styles/responsive_885/public/2018-08/Kerala%20Floods_11.jpg?itok=-Nl5pFy-" alt="Natural Disasters" />
      </section>

      {/* Healthcare Access Section */}
      <section className="home-section healthcare-access">
        <div className="section-content">
          <h2>Access to Healthcare</h2>
          <p>
            Access to healthcare should be a basic human right, yet millions worldwide are denied this privilege. Our crowdfunding campaign seeks to bridge this gap by providing life-saving medical treatments to those in need. Your donations will enable us to offer critical interventions, including surgeries, medications, and therapies, to individuals battling serious illnesses. Let's come together to be the beacon of hope that shines brightly in the darkest moments of despair.
          </p>
        </div>
        <img src="https://kettocdn.gumlet.io/media/campaign/74000/74625/image/bf7dcedc70010e83fd75e4bc4b93e8abf8ff8fc2.jpeg?w=400&dpr=2.6" alt="Healthcare Access" />
      </section>
    </div>
  );
}

export default Home;