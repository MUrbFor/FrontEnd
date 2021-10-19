import { useContext } from 'react';

import classes from './MeetupItem.module.css';
import FavoritesContext from '../../store/favorites-context';

function MeetupItem(props) {
  const favoritesCtx = useContext(FavoritesContext);

  const itemIsFavorite = favoritesCtx.itemIsFavorite(props.id);

  function toggleFavoriteStatusHandler() {
    if (itemIsFavorite) {
      favoritesCtx.removeFavorite(props.id);
    } else {
      favoritesCtx.addFavorite({
        id: props.id,
        title: props.title,
        dataprovider: props.dataprovider,
        description: props.description,
      });
    }
  }

  return (
    <li className={classes.item}>
      <div className={classes.container}>
        <div className={classes.content}>
            <h4 className={classes.content}>{props.title}</h4>
            {/* <div className={classes.actions}>
              <button onClick={toggleFavoriteStatusHandler}>
                {itemIsFavorite ? 'Remove from Favorites' : '+ to favourite'}
              </button>
            </div> */}
            <p>{props.description}</p>
            <p>{props.dataProvider}</p>
            <p><span className="bold">{props.access}</span></p>
        </div>
        <div className={classes.break}></div>
      </div>
    </li>
  );
}

export default MeetupItem;
