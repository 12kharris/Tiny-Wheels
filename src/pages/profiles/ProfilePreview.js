import React from 'react'

const ProfilePreview = ({imageURL, text, height, width}) => {

  return (
    <span style={{width: width ? width : height}}>
      <img
        src={imageURL}
        height={height}
        width={height}
        alt="profile-preview"
      ></img>
      {text}
    </span>
  )
}

export default ProfilePreview