import {useLocation, useNavigate} from 'react-router-dom'
import {ReactComponent as ExploreIcon} from '../assets/svg/exploreIcon.svg'
import {ReactComponent as OfferIcon} from '../assets/svg/localOfferIcon.svg'
import {ReactComponent as ProfileIcon} from '../assets/svg/personOutlineIcon.svg'

function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()

  const pathMatchRoute = (route) => {
      if(route === location.pathname){
        return true
      }
  }

  return (
    <footer className='navbar'>
      <nav className='navbarNav'>
        <ul className='navbarListItems '>
          <li className='navbarListItem ' onClick={() => navigate('/')}>
           <ExploreIcon width={36} height={36} fill={pathMatchRoute('/') ? '#2c2c2c' : '#8f8f8f'}/>
           <p className={pathMatchRoute('/') ? "navbarListItemNameActive" : 'navbarListItemName'}>Explore</p>
          </li>
          <li className='navbarlistItem' onClick={() => navigate('/offer')}>
           <OfferIcon width={36} height={36} fill={pathMatchRoute('/offer') ? '#2c2c2c' : '#8f8f8f'}/>
           <p className={pathMatchRoute('/offer') ? "navbarListItemNameActive" : 'navbarListItemName'}>Offers</p>
          </li>
          <li className='navbarlistItem' onClick={() => navigate('/profile')}>
           <ProfileIcon width={36} height={36} fill={pathMatchRoute('/sign-in') ? '#2c2c2c' : '#8f8f8f'}/>
           <p className={pathMatchRoute('/profile') ? "navbarListItemNameActive" : 'navbarListItemName'}>Profile</p>
          </li>
        </ul>
      </nav>
    </footer>
  )
}

export default Navbar