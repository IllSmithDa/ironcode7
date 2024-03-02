/* eslint-disable react-hooks/exhaustive-deps */
import  { useEffect, useState } from 'react'
import homeMobile from '../../assets/images/ads/mobile/home_mobile.png';
import fashionMobile from'../../assets/images/ads/mobile/fashion_mobile.png';
// import adImg3 from'../../assets/images/ads/tradingcard_banner.jpg';

const homeLink = "https://ebay.us/oLhteO";
const fashionLink = "https://ebay.us/FL0Lj2";

export default function MobileAds2() {
  const adlist  = [
    { 
      id: 1,
      imgLink: homeMobile,
      link: homeLink
    },
    { 
      id: 2,
      imgLink: fashionMobile,
      link: fashionLink
    },
    // { 
    //   id: 3,
    //   imgLink: adImg3,
    //   link: "https://ebay.us/zPdf5J"
    // },
  ]; 
  const [selectedAd, setSelectedAd] = useState(1)
  
  useEffect(() => {
    const nextVal = selectedAd ===  1 ? 2 : 1;
    setTimeout(() => { setSelectedAd(nextVal) }, 6000)
  }, [selectedAd])

  const renderAds = Object.values(adlist).map((ad) => (
    <>
      {
        ad.id === selectedAd ? 
        <div className='
        my-slides
      '  key={`ad_${ad.id}`}>
      <a href={ad.link} target='_blank'>
        <img src={ad.imgLink} className='
           block aspect-auto
        ' />
      </a>
      </div>:<></>
      }
    </>
  ))

  return (
    <section>
      {renderAds}
    </section>

  )
}