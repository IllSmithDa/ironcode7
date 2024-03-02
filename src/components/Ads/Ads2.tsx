/* eslint-disable react-hooks/exhaustive-deps */
import  { useEffect, useState } from 'react'
import adImg from '../../assets/images/ads/home_banner.png';
import adImg2 from'../../assets/images/ads/tradingcard_banner.jpg';
// import adImg3 from'../../assets/images/ads/tradingcard_banner.jpg';

const homeLink = "https://ebay.us/oLhteO";
const tradingCardLink = "https://ebay.us/hkw3l5"

export default function Ads2() {
  const adList  = [
    { 
      id: 1,
      imgLink: adImg,
      link: homeLink
    },
    { 
      id: 2,
      imgLink: adImg2,
      link: tradingCardLink
    },
    // { 
    //   id: 3,
    //   imgLink: adImg3,
    //   link: "https://ebay.us/zPdf5J"
    // },
  ]; 
  const [selectedAd, setSelectedAd] = useState(1)
  
  useEffect(() => {
    // // const nextVal = selectedAd === adlist.length ? 1 : (selectedAd + 1);
    const nextVal = selectedAd ===  1 ? 2 : 1;
    // console.log(nextVal);
    const moveLeft = () => {
      const adContainer = document.getElementById(`ads2_container`)
      if (adContainer) {
        if (selectedAd === 1) {
         adContainer.scrollLeft += 728;
        } else {
          adContainer.scrollLeft -= 728;
        }
      }
    }
    const timer = setTimeout(() => {
      moveLeft();
      setSelectedAd(nextVal);
    }, 6000)

    return (() => clearTimeout(timer))
  }, [selectedAd])

  const renderAds = Object.values(adList).map((ad, index) => (
  
    <a
      id={`ads2_${ad.id}`}
      href={ad.link}
      target='_blank'
      className={`
        lg:w-[728px] w-[100%] left-[${index * 728}px]
      `}  
    >
      <img
        src={ad.imgLink}
        className='w-[728px] max-w-[100vw]'
      />
    </a>
  ))

  return (
    <section id="ads2_container"  className='pt-[2rem] flex lg:w-[728px] w-[auto] h-[auto] overflow-x-hidden scroll-smooth'>
      {renderAds}
    </section>

  )
}
