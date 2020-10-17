import React from 'react';

// @ts-ignore
export const Image = ({src, index}) => {
  const imgStyles = {
    'width': '100%',
    'height': '100%',
    'object-fit': 'cover',
    'display': 'block'
  }

  return (
    <img
      src={src}
      style={imgStyles}
      alt={`Search result #${index}`}
    />
  )
}
