import MeetupItem from './MeetupItem';
import classes from './MeetupList.module.css';

function DatasetList(props) {
  return (
    <ul className={classes.list}>
      {props.meetups.map((meetup) => (
        <MeetupItem
          key={meetup.id}
          id={meetup.id}
          title={meetup.title}
          access={meetup.access}
          dataProvider={meetup.dataProvider}
          description={meetup.description}
          endpoint={meetup.endpoint}
        />
      ))}
    </ul>
  );
}

export default DatasetList;
