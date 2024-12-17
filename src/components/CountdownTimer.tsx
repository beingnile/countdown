'use client';

import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState(null);
  const [isComplete, setIsComplete] = useState(false);
  const [flipping, setFlipping] = useState({
    days: false,
    hours: false,
    minutes: false,
    seconds: false
  });
  
  const TARGET_DATE = new Date();
  TARGET_DATE.setDate(TARGET_DATE.getDate() + 18);
  TARGET_DATE.setHours(0, 0, 0, 0); // Set to midnight

  const challenges = [
    "Write a poem about your favorite memory together",
    "Send him a song that reminds you of him",
    "Share three things you admire about his personality",
    "Draw a (terrible) picture of his favorite animal",
    "Record yourself singing his favorite song",
    "Write down 5 future dates him to take you on",
    "Share what you'd like him to do to you when you meet",
    "Point out the cringiest thing he does that makes you smile",
    "List 3 qualities that make him unique",
    "Write about the moment you knew he was special",
    "Share your favorite inside joke",
    "Plan a virtual movie date",
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
    "You make my heart skip a beat 💓",
    "Your kindness inspires me to be better 🌸",
    "You're the reason I believe in magic ✨",
    "Your laugh is my favorite sound 🎵",
    "You're the missing piece to my puzzle 🧩",
    "Being with you feels like coming home 🏡",
    "You make ordinary moments extraordinary 🌈",
    "Your presence makes everything better 🌟",
    "You're my favorite notification 📱",
    "You're the best part of my every day 🌅",
    "Your heart is pure gold 💝",
    "You're my favorite what if that became my reality 🌠",
    "You make my heart smile 😊",
    "You're the reason I look forward to tomorrow 🌅",
    "Your love makes life beautiful 🌸",
    "You're my favorite hello and hardest goodbye 👋"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = TARGET_DATE - now;
      
      if (distance < 0) {
        setIsComplete(true);
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

  const FlipCard = ({ number, label, flipping }) => {
    const formatNumber = (num) => String(num).padStart(2, '0');
    
    return (
      <div className="flex flex-col items-center mx-2">
        <div className="relative">
          {/* Top card */}
          <div className="bg-black rounded-t-lg w-20 h-12 flex items-end justify-center 
                        text-3xl font-bold text-white overflow-hidden shadow-inner">
            {formatNumber(number)}
          </div>
          
          {/* Bottom card */}
          <div className="bg-black rounded-b-lg w-20 h-12 flex items-start justify-center 
                        text-3xl font-bold text-white overflow-hidden shadow-lg">
            {formatNumber(number)}
          </div>

          {/* Flip animation */}
          {flipping && (
            <>
              <div className="absolute top-0 left-0 w-full h-12 bg-black-600 rounded-t-lg 
                            origin-bottom animate-flip-top overflow-hidden">
                <div className="w-full h-full flex items-end justify-center text-3xl font-bold text-white">
                  {formatNumber(number)}
                </div>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-12 bg-black-700 rounded-b-lg 
                            origin-top animate-flip-bottom overflow-hidden">
                <div className="w-full h-full flex items-start justify-center text-3xl font-bold text-white">
                  {formatNumber(number)}
                </div>
              </div>
            </>
          )}

          {/* Horizontal line */}
          <div className="absolute w-full h-px bg-pink-800 top-1/2 transform -translate-y-1/2 z-10" />
          
          {/* Side shadows */}
          <div className="absolute inset-0 rounded-lg">
            <div className="absolute top-0 w-full h-1/2 bg-gradient-to-b from-black/10 to-transparent" />
            <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        </div>
        <div className="text-sm text-gray-600 mt-2">{label}</div>
      </div>
    );
  };

  if (!timeLeft) return <div className="min-h-screen flex items-center justify-center">
    <div className="text-purple-600 text-xl">Loading...</div>
  </div>;

  return (
    <div className="min-h-screen text-center flex items-center bg-gradient-to-b from-purple-50 to-white p-8">
      <div className="max-w-2xl mx-auto">
        {isComplete ? (
          <div className="text-center text-2xl text-purple-600 font-bold mb-8 animate-bounce">
            The wait is over! 🎉
          </div>
        ) : (
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-black-600 mb-4 flex items-center justify-center">
              For My Little Dark Princess!! <Heart className="ml-2 text-purple-900 animate-pulse" />
            </h1>
            <div className="flex justify-center mb-8">
              <FlipCard number={timeLeft.days} label="Days" flipping={flipping.days} />
              <FlipCard number={timeLeft.hours} label="Hours" flipping={flipping.hours} />
              <FlipCard number={timeLeft.minutes} label="Minutes" flipping={flipping.minutes} />
              <FlipCard number={timeLeft.seconds} label="Seconds" flipping={flipping.seconds} />
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 transform transition-all hover:scale-105">
          <h2 className="text-xl font-semibold text-purple-600 mb-4">Today's Challenge 💝</h2>
          <p className="text-gray-700">{challenges[18 - timeLeft.days] || challenges[0]}</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 transform transition-all hover:scale-105">
          <h2 className="text-xl font-semibold text-purple-600 mb-4">Cheesy, I know, but...</h2>
          <p className="text-gray-700 italic">{compliments[18 - timeLeft.days] || compliments[0]}</p>
        </div>
      </div>

      <style jsx global>{`
        @keyframes flipTop {
          0% { transform: rotateX(0deg); }
          100% { transform: rotateX(-180deg); }
        }
        
        @keyframes flipBottom {
          0% { transform: rotateX(180deg); }
          100% { transform: rotateX(0deg); }
        }

        .animate-flip-top {
          animation: flipTop 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          backface-visibility: hidden;
        }

        .animate-flip-bottom {
          animation: flipBottom 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          backface-visibility: hidden;
        }
      `}</style>
    </div>
  );
};

export default CountdownTimer;
