import React from 'react'
import { useState ,useEffect} from 'react'
import './style.scss'
import {useNavigate } from 'react-router-dom'
import UseFetch from '../../../hooks/UseFetch';
import { useSelector } from 'react-redux';
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper"
// import Img from '../../../components/lazyLoadImage/Img';




const HeroBanner = () => {

    const [background,setBackground]= useState("");
    const [query,setQuery] = useState("");
    const navigate = useNavigate();
    const { url } = useSelector((state)=> state.home);
    const {data,loading}=UseFetch("/movie/upcoming");

    useEffect(()=>{
        const bg = url.backdrop + data?.results?.[Math.floor(Math.random()*20)]?.backdrop_path
        setBackground(bg);
    },[data])

    const searchQueryHandler=(eve)=>{
        if(eve.key ==="Enter" && query.length > 0){
          navigate(`/search/${query}`);
        }
    };
  
  return (
    <div className='heroBanner'>

      {!loading && <div className='backdrop-img'>
        <img src={background}/>
      </div>}
      {/* <div className="opacity-layer">

      </div> */}

        <ContentWrapper>
        <div className="heroBannerContent">
          <span className="title">Welcome</span>
          <span className="subTitle">
            Millions of movies,Tv shows,people to discover.
            Explore Now.
          </span>
          <div className="searchInput">
            <input 
              type='text'
              placeholder='Search for a movie or tv show...'
              onKeyUp={searchQueryHandler}
              onChange={(e)=> setQuery(e.target.value)}
            />
            <button>Search</button>
          </div>
        </div>
      </ContentWrapper>

    </div>
  )
}

export default HeroBanner
