import { Search, Globe, Menu, User,ArrowLeft,ArrowRight, Heart, Users } from "react-feather";  
import React,{useState,useRef,useEffect} from 'react'
import DatePicker from "./DatePicker";
import { useMediaQuery } from "@react-hook/media-query";
import {useRouter} from 'next/router'

function Header({placeholder}) {
    const navRef = useRef(null)
    const headerRef = useRef(null)
    const [scrolled,setScrolled]=useState(false)
  const [inputFocus, setInputFocus] = useState(false);
  const primaryLocationRef = useRef(null);
  const secondaryLocationRef = useRef(null);

  const isSmallScreen = useMediaQuery("(max-width: 36rem)");
  
  const [location, setLocation] = useState("");
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [numberOfAdults, setNumberOfAdults] = useState(0);
  const [numberOfChildren, setNumberOfChildren] = useState(0);
  const [scroll,setScroll]=useState(false)
  const [visible,setVisible]=useState(false)
  const [open,setOpen]=useState(false)
  
  const router=useRouter()

  const openDatePicker = () => {
    setInputFocus(true);

  };
  const openDater = () => {
    setOpen(true);
    setTimeout(() => {
      if (!isSmallScreen && secondaryLocationRef.current) {
        secondaryLocationRef.current.focus();
      }
    }, 10);
  };
  const openDate = () => {
    setVisible(true);
    setTimeout(() => {
      if (!isSmallScreen && secondaryLocationRef.current) {
        secondaryLocationRef.current.focus();
      }
    }, 10);
  };
 
  const closeDatePicker = () => {
    setOpen(false);
    setLocation("");
    setNumberOfChildren(0);
    setNumberOfAdults(0);
    setCheckInDate(new Date());
    setCheckOutDate(new Date());
    document.body.style.overflow = "initial";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!location) {
      primaryLocationRef.current.focus();
      return;
    }
    router.push({
      pathname: "/search",
      query: {
        location: location,
        checkIn: checkInDate.toISOString(),
        checkOut: checkOutDate.toISOString(),
        guests: numberOfChildren + numberOfAdults,
      },
    });
    setTimeout(() => closeDatePicker(), 100);
  };

  useEffect(() => {
    const handleClick = (event) => {
      if (!headerRef.current.contains(event.target)) {
        closeDatePicker();
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

    useEffect(()=>{
        const onScroll= () => {
            if(window.scrollY > 10) {
                setScrolled(true);
            } else {
                setScrolled(false)
            }
        };
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener ("scroll", onScroll);
    },[])
    useEffect(()=>{
      const inScroll= () => {
        setInputFocus(false),
        setOpen(false)
        }
      window.addEventListener("scroll", inScroll);
      return () => window.removeEventListener ("scroll", inScroll);
    },[])
    useEffect(()=>{
      const inScroll= () => {
        setVisible(false)
        }
      window.addEventListener("scroll", inScroll);
      return () => window.removeEventListener ("scroll", inScroll);
    },[])
    const closeScreen=()=>{
      setVisible(false)
    }
    return (
      <>
          <div ref={headerRef} className={`top-10 space-x-3 transition-all transform  shadow-xl left-1/2 -translate-x-1/2 -translate-y-1/2  
          ${scrolled&& 'w-full  transform transition-all py-3  duration-700  bg-white'}
         ${visible&& 'bg-white  transition-all transform h-full duration-700  w-full top-0 duration-600 translate-y-0'} fixed md:hidden   text-white z-10`}>
           
           {visible?
           <ArrowLeft className="text-gray-600 h-8 w-8 sm:h-10 sm:w-10 sm:-mt-1 absolute top-9 sm:left-10 left-3 p-1" onClick={closeScreen}/>
           :
           <Search className={`text-red-500 w-7 h-7 absolute top-3 sm:left-8 left-11 p-1 ${scrolled&& 'hidden'}`}/>
          }
            <input type="text"
              value={location}
              ref={secondaryLocationRef}
              onFocus={openDate}
              onChange={(e) => setLocation(e.target.value)}
            className={`text-black mx-auto pl-24 sm:pl-20 rounded-full h-14 sm:w-[500px] focus:outline-none transform-none
            ${visible&& ' px-20 mt-3  '}
            ${scrolled&& ' w-full '}`}
            placeholder="Where are you going?"
            />
          {visible && (
            <div className="absolute top-24 -translate-x-1/2 -translate-y-1 left-1/2 w-[320px] px-1   sm:min-w-[500px]  ">
              <div className="flex flex-col justify-center my-3">
              <h1 className="text-gray-700 font-semibold text-xs sm:text-sm  mr-3 ">VE A CUALQUIER LUGAR, EN CUALQUIER FECHA</h1>
              <button className="flex shadow-lg pl-4 sm:pl-14 -ml-2  mr-4 items-center  text-purple-700 focus:outline-none font-bold  h-12 rounded-3xl mt-5 p-2 border-2 border-gray-200  text-base">Busqueda Flexible
              <ArrowRight className="h-9 w-9 text-purple-700 ml-4"/>
              </button>
              </div>
          </div>
        )}

        
          </div>




        <div className="hidden md:inline-block"
        ref={headerRef}
        >
          <div className={`px-10 z-10  items-center transition-all justify-evenly fixed top-0 w-full p-2 flex
           ${scrolled&& 'bg-white px-44 transition-all justify-between flex'} ${inputFocus&& 'pb-12'} `} >
          <div className="flex items-center"  onClick={() => router.push("/")}>
          <svg
            viewBox="0 0 256 276"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid"
            className={`text-gray-100 h-14 xl:h-20 z-10 p-3 ${scrolled&& ' text-red-500'}`}
          >
            <path
              d="M238 223.1a41 41 0 01-46 35c-7-.8-13.8-3-21-7.1-10-5.5-19.8-14-31.4-26.8 18.2-22.3 29.2-42.7 33.4-61 1.9-8.5 2.2-16.2 1.3-23.4a44.7 44.7 0 00-7.4-18.7 46.5 46.5 0 00-38.9-19.6c-16 0-30.3 7.4-38.9 19.6a44.8 44.8 0 00-7.4 18.7 57.3 57.3 0 001.3 23.5c4.2 18.2 15.5 38.9 33.4 61.2A123.8 123.8 0 0185 251.3c-7.2 4.1-14.1 6.3-21 7.1a41 41 0 01-46-35c-.9-6.9-.3-13.8 2.4-21.5.9-2.8 2.2-5.5 3.6-8.8l6.4-13.8.2-.6c19-41 39.5-83 60.7-123.8l.8-1.7 6.7-12.7c2.2-4.4 4.6-8.5 7.7-12a28.8 28.8 0 0144.1 0c3 3.5 5.5 7.6 7.7 12 2.2 4.2 4.4 8.6 6.7 12.7l.8 1.7c21 41 41.4 83 60.4 124.1v.3c2.2 4.4 4.1 9.4 6.3 13.8 1.4 3.3 2.8 6 3.6 8.8 2.2 7.2 3 14 2 21.2zm-110-13c-14.9-18.7-24.6-36.3-27.9-51.2a44.5 44.5 0 01-.8-16.9c.6-4.4 2.2-8.2 4.4-11.5 5.3-7.5 14-12.2 24.3-12.2 10.2 0 19.3 4.4 24.3 12.2 2.2 3.3 3.8 7.1 4.4 11.5.8 5 .5 10.8-.8 16.9-3.4 14.6-13 32.2-27.9 51.3zm124.4-14.3l-4.2-10-6.3-14-.3-.2c-19-41.4-39.4-83.3-61-124.7l-.8-1.7c-2.2-4.1-4.4-8.5-6.6-13-2.7-4.9-5.5-10.1-9.9-15.1a44.5 44.5 0 00-35-17.1C114.5 0 102 6 93 16.6a95 95 0 00-10 15.1l-6.6 13-.8 1.6c-21.2 41.4-42 83.3-61 124.7l-.2.6-6.4 14c-1.4 3-2.7 6.4-4.1 10a58.6 58.6 0 0062 79.4 72.8 72.8 0 0027.6-9.4c11.3-6.3 22-15.4 34.2-28.7a144.9 144.9 0 0034.2 28.7 72.9 72.9 0 0034.8 10 58.5 58.5 0 0058.2-50.2 52.1 52.1 0 00-2.5-29.6z"
              fill="currentColor"
            />
          </svg>
          <span className={`text-gray-100 text-xl font-extrabold ${scrolled&& 'text-red-500 '}`}>airbnb</span>
        </div >
        <nav ref={navRef} className={`${inputFocus&& 'sm:inline-block sm:text-gray-600 whitespace-nowrap translate-y-10  ml-20 xl:-mr-96'} 
        xl:space-x-10 space-x-5 text-base font-bold whitespace-nowrap translate-y-16 translate-x-5 lg:translate-x-0 lg:translate-y-0  2xl:text-xl font-semi-bold  text-white  ${scrolled&& 'hidden'}`}>
          <a href="#" className="hover:border-b-4 transition-all transform " >
            Places to stay
          </a>
          <a className="hover:border-b-4 transition-all transform "   href="#">Experiences</a>
          <a className="hover:border-b-4 transition-all transform "  href="#">Online Experiences</a>
        </nav>
        {scrolled&&
          <div className={`items-center transition-all border-4 rounded-full p-1 mx-auto  -mb-3 flex transform  ${inputFocus&& 'hidden transition-all'}`}>

          <input
            onFocus={openDatePicker}
            ref={primaryLocationRef}
            required
            className={` focus:outline-none cursor-pointer mx-2  xl:text-xl transition-all `}
            placeholder={placeholder ? placeholder : "Where are you going?"}

            />
           <Search className="bg-red-400 rounded-full h-9  w-9 p-3  text-white" />
            </div>
          }
          <form  className="absolute top-1/2 mt-10 bg-white  rounded-full ">
            <div className={`absolute top-24 lg:top-16 left-1/2  -translate-x-1/2 -translate-y-1/2 transform transition-all ${scrolled&& 'hidden transition-all transform'} `}>
            <div className="flex   p-1 -mt-10 sm:divide-x-2  sm:divide-gray-400 space-x-3 rounded-full h-[70px] py-3 xl:h-[90px] bg-white ">
               <div className="px-1 lg:px-2 xl:px-3 md:w-[100px] md:text-sm lg:w-[130px]  xl:w-[530px] 2xl:w-[650px] lg:text-sm xl:text-lg ">
                <label htmlFor="location">Location</label>
                <input
                  id="location"
                  value={location}
                  ref={secondaryLocationRef}
                  onFocus={openDater}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Where are you going?"
                  className="truncate md:w-20 lg:w-[127px] xl:w-[200px] focus:outline-none"
                  />
              </div>
              <div className="px-1 lg:px-2 xl:px-3 md:w-[100px] md:text-sm lg:w-[130px] xl:w-full lg:text-sm xl:text-lg ">
                <label>Check-in</label>
                <input onClick={openDatePicker} disabled className="truncate md:w-20 lg:w-[127px] xl:w-full " placeholder="Add dates" value={checkInDate} />
              </div>

              <div className="px-1 lg:px-2 xl:px-3 md:w-[100px] md:text-sm lg:w-[130px] xl:w-full lg:text-sm xl:text-lg ">
                <label>Check-out</label>
                <input disabled placeholder="Add dates" className="truncate md:w-20 lg:w-[127px] xl:w-full " value={checkOutDate} />
              </div>
              <div className="px-1 lg:px-2 xl:px-3 md:w-[100px] md:text-sm lg:w-[130px] xl:w-full lg:text-sm xl:text-lg ">
                <label>Guests</label>
                <span className="guestNumber">
                  {numberOfChildren || numberOfAdults ? (
                    <p>{numberOfAdults + numberOfChildren} guests</p>
                    ) : (
                      <p className="empty">Add guests</p>
                      )}
                </span>
              </div>
          <button
          className="px-1 lg:px-2 xl:px-3 md:w-[100px] md:text-sm lg:w-[130px] xl:w-full lg:text-sm xl:text-lg "
          type="submit"
          disabled={
            inputFocus &&
            !(
              location &&
              checkInDate &&
              checkOutDate &&
              (numberOfAdults || numberOfChildren)
              )
            }
            onClick={handleSubmit}
            aria-label="search places"
            >
            <div className="flex rounded-3xl bg-red-500 text-white px-2 p-1 items-center">
            <Search className=" h-9 w-9 xl:w-12 xl:h-12  rounded-2xl p-1 lg:p-2 xl:p-3"/>
            <span className="text-sm lg:text-base xl:text-xl">Search</span>
            </div>
          </button>
            </div>
                </div>
        </form>
          {inputFocus&&
       <form  className="absolute hidden md:inline-block top-1/2 mt-10 bg-white  rounded-full ">
       <div className={`absolute top-16 lg:top-14 lg:-mt-2  xL:top-16  left-1/2  -translate-x-1/2 -translate-y-1/2 transform transition-all
         `}>
       <div className="flex   p-3 -mt-10 sm:divide-x-2  sm:divide-gray-400 space-x-3 rounded-full h-full bg-white ">
          <div className="px-1 lg:px-2 xl:px-3 md:w-[100px] md:text-sm lg:w-[130px] xl:w-[530px] 2xl:w-[650px] lg:text-sm xl:text-lg ">
           <label htmlFor="location">Location</label>
           <input
             id="location"
             value={location}
             ref={secondaryLocationRef}
             onFocus={openDater}
             onChange={(e) => setLocation(e.target.value)}
             placeholder="Where are you going?"
             className="truncate md:w-20 lg:w-[127px] xl:w-[200px] focus:outline-none"
             />
         </div>
         <div className="px-1 lg:px-2 xl:px-3 md:w-[100px] md:text-sm lg:w-[130px] xl:w-full lg:text-sm xl:text-lg ">
           <label>Check-in</label>
           <input onClick={openDatePicker} disabled className="truncate md:w-20 lg:w-[127px] xl:w-full " placeholder="Add dates" value={checkInDate} />
         </div>

         <div className="px-1 lg:px-2 xl:px-3 md:w-[100px] md:text-sm lg:w-[130px] xl:w-full lg:text-sm xl:text-lg ">
           <label>Check-out</label>
           <input disabled placeholder="Add dates" className="truncate md:w-20 lg:w-[127px] xl:w-full " value={checkOutDate} />
         </div>
         <div className="px-1 lg:px-2 xl:px-3 md:w-[100px] md:text-sm lg:w-[130px] xl:w-full lg:text-sm xl:text-lg ">
           <label>Guests</label>
           <span className="guestNumber">
             {numberOfChildren || numberOfAdults ? (
               <p>{numberOfAdults + numberOfChildren} guests</p>
               ) : (
                 <p className="empty">Add guests</p>
                 )}
           </span>
         </div>
     <button
     className="px-1 lg:px-2 xl:px-3 md:w-[100px] md:text-sm lg:w-[130px] xl:w-full lg:text-sm xl:text-lg "
     type="submit"
     disabled={
       inputFocus &&
       !(
         location &&
         checkInDate &&
         checkOutDate &&
         (numberOfAdults || numberOfChildren)
         )
       }
       onClick={handleSubmit}
       aria-label="search places"
       >
       <div className="flex rounded-3xl bg-red-500 text-white  px-2 p-1 items-center">
       <Search className=" h-9 w-9 xl:w-12 xl:h-12  rounded-2xl p-1 lg:p-2 xl:p-3"/>
       <span className="text-sm xl:text-xl">Search</span>
       </div>
     </button>
       </div>
           </div>
   </form>
        }
        {open && (
          <DatePicker
          className={`datepicker ${scroll && 'hidden'}`}
          close={closeDatePicker}
          checkInDate={{ value: checkInDate, setValue: setCheckInDate }}
            checkOutDate={{ value: checkOutDate, setValue: setCheckOutDate }}
            numberOfAdults={{
              value: numberOfAdults,
              setValue: setNumberOfAdults,
            }}
            numberOfChildren={{
              value: numberOfChildren,
              setValue: setNumberOfChildren,
            }}
          />
        )}



        <div className={`flex items-center text-white text-base lg:text-lg xl:text-xl font-bold space-x-2 xl:space-x-10 ${scrolled && ' '} ${inputFocus&& 'ml-7'}`}>
          <a href="#" className={`   whitespace-nowrap  ${scrolled&& 'text-gray-600'}`}>Become a host</a>
          <a href="#" className={`${scrolled&& 'text-gray-600'}`}>
            <Globe />
          </a>
          <div className={`flex bg-white  text-gray-600 p-2 rounded-full mx-auto shadow-inner border-2 border-gray-200 `}>
            <Menu  className="h-9 w-8 " />
            <User  className="h-9 w-8 " />
          </div>
        </div>
          </div>
              
        
        </div>
        {scrolled&&
        <div className="bg-white items-center transition-all transform flex w-full h-16 fixed bottom-0 justify-evenly">
          <div className="items-center flex flex-col">
        <Search onClick={openDate} className="hover:text-red-500 text-gray-400"/>
        <h1 className="text-xs font-bold text-gray-500  sm:text-sm">Explora</h1>
          </div>
          <div className="items-center flex flex-col">
        <Heart className="hover:text-red-500 text-gray-400"/>
        <h1  className="text-xs font-bold text-gray-500 sm:text-sm">Favoritos</h1>
          </div>
          <div onClick={()=>router.push('/api/auth/login')} className="items-center flex flex-col">
        <Users className="hover:text-red-500 text-gray-400"/>
        <h1  className="text-xs font-bold text-gray-500 sm:text-sm">Iniciar Session</h1>
          </div>
        </div>
        } 
        </>
    )
}

export default Header

