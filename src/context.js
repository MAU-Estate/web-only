import React, { useState } from 'react'

const Context = React.createContext()

function ContextProvider({ children }) {
  const [projectEdges, setProjectEdges] = useState()
  const [projectFilterString, setProjectFilterString] = useState()

  // useEffect(() => {
  //   const projectEdgesData = localStorage.getItem('projectEdges')
  //   const projectFilterStringData = localStorage.getItem('projectFilterString')
  //   if (projectEdgesData !== 'undefined') {
  //     setProjectEdges(JSON.parse(projectEdgesData))
  //   }
  //   if (projectFilterStringData !== 'undefined') {
  //     setProjectFilterString(JSON.parse(projectFilterStringData))
  //   }
  // }, [])

  // useEffect(() => {
  //   localStorage.setItem('projectEdges', JSON.stringify(projectEdges))
  // }, [projectEdges])

  // useEffect(() => {
  //   localStorage.setItem(
  //     'projectFilterString',
  //     JSON.stringify(projectFilterString)
  //   )
  // }, [projectEdges, projectFilterString])

  return (
    <Context.Provider
      value={{
        projectEdges,
        setProjectEdges,
        projectFilterString,
        setProjectFilterString,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export { ContextProvider, Context }

// Retrieving state using useContext
// =================================

// import React, {useState, useContext} from "react"
// import PropTypes from "prop-types"

// import {Context} from "../Context"

// function Image({className, img}) {
//     const [hovered, setHovered] = useState(false)
//     const {toggleFavorite, addToCart, cartItems, removeFromCart} = useContext(Context)

//     function heartIcon() {
//         if(img.isFavorite) {
//             return <i className="ri-heart-fill favorite" onClick={() => toggleFavorite(img.id)}></i>
//         } else if(hovered) {
//             return <i className="ri-heart-line favorite" onClick={() => toggleFavorite(img.id)}></i>
//         }
//     }

//     function cartIcon() {
//         const alreadyInCart = cartItems.some(item => item.id === img.id)
//         if(alreadyInCart) {
//             return <i className="ri-shopping-cart-fill cart" onClick={() => removeFromCart(img.id)}></i>
//         } else if(hovered) {
//             return <i className="ri-add-circle-line cart" onClick={() => addToCart(img)}></i>
//         }
//     }

//     return (
//         <div
//             className={`${className} image-container`}
//             onMouseEnter={() => setHovered(true)}
//             onMouseLeave={() => setHovered(false)}
//         >
//             <img src={img.url} className="image-grid"/>
//             {heartIcon()}
//             {cartIcon()}
//         </div>
//     )
// }

// Image.propTypes = {
//     className: PropTypes.string,
//     img: PropTypes.shape({
//         id: PropTypes.string.isRequired,
//         url: PropTypes.string.isRequired,
//         isFavorite: PropTypes.bool
//     })
// }

// export default Image
