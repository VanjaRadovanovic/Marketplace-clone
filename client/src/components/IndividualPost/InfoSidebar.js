import React, { useState, useEffect } from 'react';
import './InfoSidebar.css';
import PersonIcon from '@material-ui/icons/Person';
import LocationOnIcon from '@material-ui/icons/LocationOn';

function InfoSidebar({ data }) {
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (data.description.length === 0) return
    let str
    if (data.description.length > 300) {
      str = data.description.substring(0, 300) + "..."
    } else {
      str = data.description;
    }
    setDescription(str)

  }, [data.description]);

  const croppingDescription = () => {
    if (description.length > 304) {
      let str = data.description.substring(0, 300) + "..."
      setDescription(str)
    } else {
      setDescription(data.description);
    }
  }

  return (
    <div className="info-sidebar-container">
      <h3 style={{ marginBottom: '2px', textAlign: 'start' }}>{data.title}</h3>
      <p style={{ fontSize: '17px', marginBottom: '0' }}>{data.price} €</p>
      <small>{data.category[0]}</small>
      <hr></hr>
      {data.description ? (
        <>
          <h5>Description</h5>
          {data.description.length < 300 ? (
            <small style={{ textAlign: 'start' }} className="mb-2 ml-1">{description}</small>
          ) : (
              <>
                {description.length > 304 ? (
                  <small style={{ textAlign: 'start' }} className="mb-2 ml-1">{description} <div className="description-button" onClick={e => croppingDescription()}>Less</div></small>
                ) : (
                    <small style={{ textAlign: 'start' }} className="mb-2 ml-1">{description} <div className="description-button" onClick={e => croppingDescription()}>More</div></small>
                  )}
              </>)}
        </>
      ) : null}
      <p className="location-data"><LocationOnIcon /> {data.location}</p>
      <hr></hr>
      <div className="user-display">
        {data.user.profileImageUrl ? (
          <img className="profile-image" src={data.user.profileImageUrl} alt="err" />
        ) : (
            <div className="profile-image-container">
              <PersonIcon />
            </div>
          )}
        <p>{data.user.username}</p>
      </div>
      <hr></hr>
    </div>
  )
}

export default InfoSidebar
