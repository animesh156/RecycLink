import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-base-200 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">About RecycLink</h1>
        <div className="prose lg:prose-xl">
          <p>
            RecycLink is a platform dedicated to making recycling easier and more
            accessible for everyone. Our mission is to create a sustainable future
            by encouraging and tracking recycling efforts worldwide.
          </p>
          <h2>Our Mission</h2>
          <p>
            We believe in creating a cleaner, more sustainable world through
            individual actions. By tracking and rewarding recycling efforts, we
            aim to make environmental consciousness a daily habit.
          </p>
          <h2>How It Works</h2>
          <p>
            Users can log their recycling activities, track their environmental
            impact, and earn rewards for their contributions. Our platform
            provides detailed analytics and insights to help users understand
            their recycling patterns and improve their habits.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;