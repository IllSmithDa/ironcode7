/* eslint-disable react-hooks/exhaustive-deps */
import  { useEffect, useState } from 'react'
import watchAd from '../../assets/images/ads/watches_banner.png';
// import sneakerAd from '../../assets/images/ads/Sneakers_banner.png';
import homeAd from '../../assets/images/ads/home_banner.png';
// import cardAd from'../../assets/images/ads/tradingcard_banner.jpg';

const watchLink = "https://ebay.us/zPdf5J";
// const sneakersLink = "https://ebay.us/9F4wIK";
const homeLink = "https://ebay.us/oLhteO";
// const tradingCardLink = "https://ebay.us/hkw3l5";

export default function Ads() {
  const adList = [
    { 
      id: 1,
      imgLink: homeAd,
      link: homeLink
    },
    { 
      id: 2,
      imgLink: watchAd,
      link: watchLink
    },
    // { 
    //   id: 3,
    //   imgLink: adImg3,
    //   link: "https://ebay.us/hkw3l5"
    // }
  ]; 
const [selectedAd, setSelectedAd] = useState(1)
  
  useEffect(() => {
    // // const nextVal = selectedAd === adlist.length ? 1 : (selectedAd + 1);
    const nextVal = selectedAd ===  1 ? 2 : 1;
    // console.log(nextVal);
    const moveLeft = () => {
      const adContainer = document.getElementById(`ads1_container`)
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
      id={`ads1_${ad.id}`}
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
    <section id="ads1_container" className='pt-[2rem] flex lg:w-[728px] w-[auto] h-[auto] overflow-x-hidden scroll-smooth'>
      {renderAds}
    </section>

  )
}
