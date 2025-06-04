'use client'
import { useEffect } from 'react'
import '@/styles/map.scss'
import Link from 'next/link'

export default function MapEmbed() {
  const twoGisUrl = "https://2gis.kz/almaty/geo/70000001054231911/76.774417,43.170569"

  return (
    <section className="map">
      <h2 className="map__title">Мекен-жайымыз:</h2>
      <p className="map__address">
        Алматы қаласы,<br/>
        Кыргауылды көшесі, 1а<br/>
        "Томирис" мейрамханасы</p>
      <Link href={twoGisUrl} passHref className='btn' target='_blank'>

          {/* 2GIS icon - you'd likely want to use an actual SVG or image icon */}
          <img
            src="/images/2gis.jpg" // You'll need to place a 2GIS icon image in your public folder
            alt="2GIS Icon"
          />
          Картаны ашу
      </Link>
      <br />
      <br />
      <br />
      <h2 className="map__title">Той иелері:</h2>
      <p className="map__address">Сұңғат - Айгүл</p>
    </section>
  )
}
