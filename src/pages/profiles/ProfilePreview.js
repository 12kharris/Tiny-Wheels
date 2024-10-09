import React from 'react'

const ProfilePreview = ({imageURL, text}) => {

    const height = 45;

  return (
    <span>
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