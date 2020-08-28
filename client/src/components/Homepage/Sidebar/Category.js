import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SidebarElement from './SidebarElement';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import StraightenIcon from '@material-ui/icons/Straighten';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import HomeIcon from '@material-ui/icons/Home';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PetsIcon from '@material-ui/icons/Pets';
import BuildIcon from '@material-ui/icons/Build';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import VideocamIcon from '@material-ui/icons/Videocam';

function Category({ handleCategoryClick, selectedClass }) {
  return (
    <div>
      <Link to="/vehicles" className={selectedClass.vehicles} onClick={e => handleCategoryClick(e, 'vehicles', "/vehicles")}>
        <SidebarElement icon={<DriveEtaIcon />} text='Vehicles' />
      </Link>
      <Link to="/real-estate" className={selectedClass.realEstate} onClick={e => handleCategoryClick(e, 'realEstate', "/real-estate")}>
        <SidebarElement icon={<HomeWorkIcon />} text='Real estate' />
      </Link>
      <Link to="/free-stuff" className={selectedClass.freeStuff} onClick={e => handleCategoryClick(e, 'freeStuff', "/free-stuff")}>
        <SidebarElement icon={<LocalOfferIcon />} text='Free stuff' />
      </Link>
      <Link to="/electronics" className={selectedClass.electronics} onClick={e => handleCategoryClick(e, 'electronics', "/electronics")}>
        <SidebarElement icon={<PhoneIphoneIcon />} text='Electronics' />
      </Link>
      <Link to="/musical-instruments" className={selectedClass.musicalInstruments} onClick={e => handleCategoryClick(e, 'musicalInstruments', "/musical-instruments")}>
        <SidebarElement icon={<StraightenIcon />} text='Musical instruments' />
      </Link>
      <Link to="/games-and-toys" className={selectedClass.gamesAndToys} onClick={e => handleCategoryClick(e, 'gamesAndToys', "/games-and-toys")}>
        <SidebarElement icon={<SportsEsportsIcon />} text='Games and toys' />
      </Link>
      <Link to="/household-supplies" className={selectedClass.householdSupplies} onClick={e => handleCategoryClick(e, 'householdSupplies', "/household-supplies")}>
        <SidebarElement icon={<HomeIcon />} text='Household supplies' />
      </Link>
      <Link to="/family" className={selectedClass.family} onClick={e => handleCategoryClick(e, 'family', "/family")}>
        <SidebarElement icon={<FavoriteIcon />} text='Family' />
      </Link>
      <Link to="/pets" className={selectedClass.pets} onClick={e => handleCategoryClick(e, 'pets', "/pets")}>
        <SidebarElement icon={<PetsIcon />} text='Pets' />
      </Link>
      <Link to="/home-decoration-supplies" className={selectedClass.homeDecorationSupplies} onClick={e => handleCategoryClick(e, 'homeDecorationSupplies', "/home-decoration-supplies")}>
        <SidebarElement icon={<BuildIcon />} text='Home decoration supplies' />
      </Link>
      <Link to="/sports" className={selectedClass.sports} onClick={e => handleCategoryClick(e, 'sports', "/sports")}>
        <SidebarElement icon={<DirectionsRunIcon />} text='Sports' />
      </Link>
      <Link to="/fun" className={selectedClass.fun} onClick={e => handleCategoryClick(e, 'fun', "/fun")}>
        <SidebarElement icon={<VideocamIcon />} text='Fun' />
      </Link>
    </div>
  )
}

export default Category
