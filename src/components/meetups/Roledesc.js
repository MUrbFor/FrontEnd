import { useContext } from 'react';

import classes from './MeetupItem.module.css';
import data from '../../store/favorites-context';

function Roleitem(props) {
  const favoritesCtx = useContext(FavoritesContext);

  const itemIsFavorite = favoritesCtx.itemIsFavorite(props.id);

  function toggleFavoriteStatusHandler() {
    if (itemIsFavorite) {
      favoritesCtx.removeFavorite(props.id);
    } else {
      favoritesCtx.addFavorite({
        id: props.id,
        endpoint: props.endpoint,
        title: props.title,
        cost: props.cost,

      });
    }
  }

  return (
    <li className={classes.item}>
      <div className={classes.container}>
        <div className={classes.content}>
          <p className="title">{props.title}</p>
        </div>
        <div className={classes.content}>
            <p>cost: {props.cost}</p>
        </div>
        <div className={classes.actions}>
          <button onClick={toggleFavoriteStatusHandler}>
            {itemIsFavorite ? 'Remove from Favorites' : '+ to favourite'}
          </button>
        </div>
      </div>
    </li>
  );
}

export default Roleitem;
