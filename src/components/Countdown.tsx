'use client'
import React, { useState, useEffect } from 'react'
import '@/styles/countdown.scss'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

const Countdown = ({ weddingDate }: { weddingDate: string }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(weddingDate) - +new Date()
    let timeLeft: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 }

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      }
    }
    return timeLeft
  }

  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  })
  if (!timeLeft) return ;

  const isPastDate = Object.values(timeLeft).every(val => val <= 0)

  return (
    <section className="countdown">
        <div className="container">
            <h2 className="countdown__title">Той салтанатына дейін қалды:</h2>
            {isPastDate ? (
                <p className="countdown__expired">Той басталды! / Той өтті!</p>
            ) : (
                <div className="countdown__grid">
                <div className="countdown__item">
                    <span className="countdown__number">{timeLeft.days}</span>
                    <span className="countdown__label">Күн</span>
                </div>
                <div className="countdown__item">
                    <span className="countdown__number">{timeLeft.hours}</span>
                    <span className="countdown__label">Сағат</span>
                </div>
                <div className="countdown__item">
                    <span className="countdown__number">{timeLeft.minutes}</span>
                    <span className="countdown__label">Минут</span>
                </div>
                <div className="countdown__item">
                    <span className="countdown__number">{timeLeft.seconds}</span>
                    <span className="countdown__label">Секунд</span>
                </div>
                </div>
            )}
        </div>
    </section>
  )
}

export default Countdown
