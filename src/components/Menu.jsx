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
          />
          }
        </div>
      </Container>
    </nav>
  )
}

export default Menu