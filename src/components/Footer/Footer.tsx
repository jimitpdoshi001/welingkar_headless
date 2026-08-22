import { FooterLogo } from '@/assets/svg/Logos'
import React from 'react'

const Footer = () => {
  return (
    <footer className='bg-primary py-6'>
      <div className='container'>
        <FooterLogo />
      </div>
    </footer>
  )
}

export default Footer