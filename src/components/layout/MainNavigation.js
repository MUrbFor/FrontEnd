import { useContext } from 'react';
import { Link } from 'react-router-dom';

import classes from './MainNavigation.module.css';
import FavoritesContext from '../../store/favorites-context';

function MainNavigation() {
  const favoritesCtx = useContext(FavoritesContext);

  return (
    <header className={classes.header}>
      <div className={classes.logo}><Link to='/'>logo</Link></div>
      <nav>
        <ul>
          <li>
            <Link to='/catalogue'>Link 1</Link>
          </li>
          <li>
            <Link to='/contribute'>Link 2</Link>
          </li>
          <li>
            {/* <Link to='/favorites'>
              My Resources
              <span className={classes.badge}>
                {favoritesCtx.totalFavorites}
              </span>
            </Link> */}
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
