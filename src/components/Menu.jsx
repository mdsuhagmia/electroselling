import React, { useContext, useEffect, useRef, useState } from 'react'
import Container from './Container'
import { apiData } from './ContextApi'
import FixedMenu from './FixedMenu'
import { useNavigate } from 'react-router-dom'
import ScrolldMenu from './ScrollMenu'

const Menu = () => {
  let data = useContext(apiData)
  let [categoryShow, setCategoryShow] = useState([])

  useEffect(()=>{
    setCategoryShow([...new Set(data.map((item)=>item.category))])
  },[data])

  let navigate = useNavigate()
  let handleCate = (citem)=>{
    let cateFill = data.filter((item)=>item.category === citem)
    navigate('/products', { state: { cateData: cateFill, category: citem } })
  }

  let [search, setSearch] = useState("")
  let [searchFilter, setSearchFilter] = useState([])
  let handleSearchValue = (e)=>{
    setSearch(e.target.value)
    if(e.target.value == ""){
      setSearchFilter([])
    }else{
      let searchFil = data.filter((item)=>item.title.toLowerCase().includes(e.target.value.toLowerCase()))
      setSearchFilter(searchFil)
    }
  }

  //! search btn click logic
  let handleSearchClick = () => {
    if (searchFilter.length > 0) {
      navigate('/products', { state: { cateData: searchFilter, category: 'Search Results' } });
      setSearchFilter([]);
      setSearch("");
    }
  };

  let searchRef = useRef()
  useEffect(()=>{
    let handleClickOutsite = (e)=>{
      console.log(e.target.value)
      if(searchRef.current && !searchRef.current.contains(e.target)){
        setSearchFilter([])
        setSearch("")
      }
    }
    document.addEventListener("mousedown", handleClickOutsite)
    return ()=>{
      document.removeEventListener("mousedown", handleClickOutsite)
    }
  },[])

  let handleSearchShow = (item)=>{
    navigate(`/products/${item.id}`)
    setSearchFilter([])
    setSearch("")
  }

  let [activeIndex, setActiveIndex] = useState(-1)
  let handkeKeyDown = (e)=>{
    if(e.key === "ArrowDown"){
      e.preventDefault();
      setActiveIndex(prev =>
        prev < searchFilter.length - 1 ? prev + 1 : prev
      );
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex(prev =>
        prev > 0 ? prev - 1 : - 1
      );
    }
    if (e.key === "Enter") {
      if (activeIndex !== -1) {
        handleSearchShow(searchFilter[activeIndex]);
      }
    }
  }

  let itemRefs = useRef([]);
  useEffect(() => {
    if (activeIndex !== -1 && itemRefs.current[activeIndex]) {
      itemRefs.current[activeIndex].scrollIntoView({
        block: "nearest",
      });
    }
  }, [activeIndex]);


  let [isSticky, setIsSticky] = useState(false)
  useEffect(()=>{
    let handleScroll = ()=>{
      let scrolled = window.scrollY
      if(scrolled > 130){
        setIsSticky(true)
      }else{
        setIsSticky(false)
      }
    }
    document.addEventListener("scroll", handleScroll)
    return ()=> document.removeEventListener("scroll", handleScroll)
  },[])

  let [leftMenu, setLeftMenu] = useState(false)
  let handleLeftMenu = ()=>{
    setLeftMenu(!leftMenu)
  }
  let leftMenuRef = useRef()
  useEffect(()=>{
    let handleClickOutsite = (e)=>{
      if(leftMenu && !leftMenuRef.current.contains(e.target)){
        setLeftMenu(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutsite)
    return ()=> document.removeEventListener("mousedown", handleClickOutsite)
  },[leftMenu])

  return (
    <nav className={`py-4 shadow ${isSticky == true ? "fixed top-0 w-full bg-violet-950 z-[9999] left-0" : "bg-indigo-950" }`}>
      <Container>
        <div>
          {isSticky == true ?
          <ScrolldMenu
            categoryShow={categoryShow}
            searchRef={searchRef}
            handleSearchValue={handleSearchValue}
            handkeKeyDown={handkeKeyDown}
            searchFilter={searchFilter}
            activeIndex={activeIndex}
            itemRefs={itemRefs}
            handleCate={handleCate}
            handleSearchShow={handleSearchShow}
            handleLeftMenu={handleLeftMenu}
            handleSearchClick={handleSearchClick}
          />
          :
          <FixedMenu
            categoryShow={categoryShow}
            searchRef={searchRef}
            handleSearchValue={handleSearchValue}
            handkeKeyDown={handkeKeyDown}
            searchFilter={searchFilter}
            activeIndex={activeIndex}
            itemRefs={itemRefs}
            handleCate={handleCate}
            handleSearchShow={handleSearchShow}
            handleSearchClick={handleSearchClick}
          />
          }
        </div>
        {leftMenu && (
            <div className='absolute top-0 right-0 bg-[#0000007c] capitalize z-[99999] w-full h-screen'>
              <div ref={leftMenuRef} className='bg-white shadow pb-2 capitalize z-[99999] w-1/4 h-screen pl-4 md:pl-6 lg:pl-8 xl:pl-10 2xl:pl-12'>
                <ul className='pt-8'>
                  {categoryShow.map((item) => (
                    <li onClick={() => handleCate(item)} className='text-indigo-950 py-2 hover:px-6 transition-all ease-in-out duration-300 cursor-pointer text-[14px] font-bold font-lat'>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
      </Container>
    </nav>
  )
}

export default Menu