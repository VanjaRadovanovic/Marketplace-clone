import React from 'react';
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

function Category() {
  return (
    <div>
      <SidebarElement icon={<DriveEtaIcon />} text='Vehicles' />
      <SidebarElement icon={<HomeWorkIcon />} text='Real estate' />
      <SidebarElement icon={<LocalOfferIcon />} text='Free stuff' />
      <SidebarElement icon={<PhoneIphoneIcon />} text='Electronics' />
      <SidebarElement icon={<StraightenIcon />} text='Musical instruments' />
      <SidebarElement icon={<SportsEsportsIcon />} text='Games and toys' />
      <SidebarElement icon={<HomeIcon />} text='Household supplies' />
      <SidebarElement icon={<FavoriteIcon />} text='Family' />
      <SidebarElement icon={<PetsIcon />} text='Pets' />
      <SidebarElement icon={<BuildIcon />} text='Home decoration supplies' />
      <SidebarElement icon={<DirectionsRunIcon />} text='Sports' />
      <SidebarElement icon={<VideocamIcon />} text='Fun' />
    </div>
  )
}

export default Category
