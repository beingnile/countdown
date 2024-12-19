'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Heart } from 'lucide-react';
import { Loader } from 'lucide-react';

const CountdownTimer = () => {
  interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }

  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [currentDay, setCurrentDay] = useState<number>(0);
  const [flipping, setFlipping] = useState({
    days: false,
    hours: false,
    minutes: false,
    seconds: false
  });
  
  // Set start and target dates
  const START_DATE = new Date(2024, 11, 17, 0, 0, 0); // December 17, 2024, 00:00
  const TARGET_DATE = new Date(2025, 0, 7, 13, 0, 0); // January 7, 2025, 13:00
  
  // Calculate the day index manually based on current date
  const calculateDayIndex = () => {
    const today = new Date();
    const diffTime = today.getTime() - START_DATE.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const challenges = [
    "Write a poem about your favorite memory together",
    "Send him a song that reminds you of him",
    "Share three things you admire about his personality",
    "Tell him, in detail, your definition of amazing sex",
    "Draw a (terrible) picture of his favorite animal",
    "Record yourself singing his favorite song",
    "Write down 5 future dates him to take you on",
    "Share what you'd like him to do to you when you meet",
    "Point out the cringiest thing he does that makes you smile",
    "List 3 qualities that make him unique",
    "Write about the moment you knew he was special",
    "Share your favorite inside joke",
    "Plan a virtual movie date",
    "What's the dirtiest thing you'd like to hear me say during sex?",
    "Create a playlist of songs that tell your story",
    "Write about your perfect day together",
    "Share your favorite memory of his laugh",
    "List reasons why he inspires you",
    "Write about what you're looking forward to doing together",
    "Share what makes him beautiful inside and out"
  ];

  const compliments = [
    "Your smile lights up my entire world ✨",
    "Every day with you feels like an adventure 🌟",
    "Alright, here I am. Tell me the other two desires you have 😏",
    "You make my heart skip a beat 💓",
    "You must be jelly, cause jam doesn't shake like that. 🌸",
    "You're the reason I believe in magic ✨",
    "Your laugh is my favorite sound 🎵",
    "You're so gorgeous they need a new word for gorgeous. 🫠",
    "Being with you feels like home 🏡",
    "Even in zero gravity, I would still fall for you! 📡",
    "Your presence makes everything better 🌟",
    "You're my favorite notification 📱",
    "You're the best part of my every day 🌅",
    "Your heart is pure gold 💝",
    "You know I can't get enough of you, right? 🌠",
    "You make my heart smile 😊",
    "You're the reason I look forward to tomorrow 🌅",
    "Your love makes life beautiful 🌸",
    "You're my favorite hello and hardest goodbye 👋",
    "I adore you 💜",
    "Is it hot in here, or is that just you? 🔥"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = TARGET_DATE.getTime() - now;
      // Update current day index
      const dayIndex = calculateDayIndex();
      setCurrentDay(dayIndex);
      
      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft(prev => {
        if (prev) {
          setFlipping({
            days: prev.days !== days,
            hours: prev.hours !== hours,
            minutes: prev.minutes !== minutes,
            seconds: prev.seconds !== seconds
          });
        }
        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!timeLeft) return <div className="min-h-screen flex items-center justify-center">
    <Loader />
  </div>;

  const countdownStyle = (value: number | undefined) => ({
    '--value': value
  } as React.CSSProperties);

  // Get current challenge and compliment based on the current day
  const currentChallenge = challenges[Math.min(currentDay, challenges.length - 1)];
  const currentCompliment = compliments[Math.min(currentDay, compliments.length - 1)];

  return (
    <div className="min-h-screen text-center flex items-center bg-gradient-to-b from-purple-50 to-white p-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-black-600 mb-4 flex items-center justify-center">
            For My Little Dark Princess!! <Heart className="ml-2 text-purple-900 animate-pulse" />
          </h1>
          <div className="flex justify-center mb-8">
            <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
              <div className="flex flex-col">
                <span className="countdown font-mono text-5xl">
                  <span style={countdownStyle(timeLeft?.days)}></span>
                </span>
                days
              </div>
              <div className="flex flex-col">
                <span className="countdown font-mono text-5xl">
                  <span style={countdownStyle(timeLeft?.hours)}></span>
                </span>
                hours
              </div>
              <div className="flex flex-col">
                <span className="countdown font-mono text-5xl">
                  <span style={countdownStyle(timeLeft?.minutes)}></span>
                </span>
                min
              </div>
              <div className="flex flex-col">
                <span className="countdown font-mono text-5xl">
                  <span style={countdownStyle(timeLeft?.seconds)}></span>
                </span>
                sec
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 transform transition-all hover:scale-105">
          <h2 className="text-xl font-semibold text-purple-600 mb-4">Today's Challenge 💝</h2>
          <p className="text-gray-700">{currentChallenge}</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 transform transition-all hover:scale-105">
          <h2 className="text-xl font-semibold text-purple-600 mb-4">Cheesy, I know, but...</h2>
          <p className="text-gray-700 italic">{currentCompliment}</p>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
