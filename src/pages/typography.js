import React from 'react'

const fonts = [
  'f-1',
  'f-2',
  'f-3',
  'f-5',
  'f-6',
  'f-7',
  'f-8',
  'f-9',
  'f-10',
  'f-11',
  'f-12',
  'f-13',
  'f-14',
  'f-15',
  'f-16',
  'f-17',
  'f-18',
  'f-19',
  'f-20', // (maybe not required)
  'f-21',
  'f-22',
  'f-23',
  'f-24',
  'f-25',
  'f-26',
  'f-27',
  'f-28',
]

const FontPreview = ({ font }) => {
  return (
    <div className="grid md:grid-cols-2 gap-10 mb-20 p t-20">
      <div>
        <div className={`border`}>
          <p className={`${font}`}>
            {font} - Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod!
          </p>
        </div>
        <div>
          <p className={`${font}`}>About Mary Ann</p>
        </div>
      </div>
      <div>
        <div className={`border mb-10`}>
          <p className={`${font}`}>{font} - About Mary Ann</p>
        </div>
        <div className="grid grid-cols-2">
          <img src="https://via.placeholder.com/320x180" alt="placholder" />
        </div>
      </div>
    </div>
  )
}

export default function Typography() {
  return (
    <div>
      {fonts.map(font => (
        <FontPreview key={font} font={font} />
      ))}
    </div>
  )
}
