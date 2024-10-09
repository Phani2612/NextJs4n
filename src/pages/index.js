import React from 'react'

import URL_401_Carousel from '../components/URL_401_Carousel.js'

import URL_401_UrlShortener from '../components/URL_401_UrlShortener.js'
import URL_402_Footer from '../components/URL_402_Footer.js'

import Link from 'next/link.js'

import styles from '../styles/style.module.css'

function index() {
  return (

    <div className='urls-container'>

<div className="logo-container" > 
<img src="/images/4NECOtechLOGO.png" alt="logo" className="logo"    />{" "}

</div>


<Link href="/EcoTech_303_Login" passHref>

        <button type="button" className='btn btn-primary'>
          Login
        </button>

</Link>


<URL_401_Carousel/>

<URL_401_UrlShortener/>



<URL_402_Footer/>


    </div>
  )
}

export default index