import { useRef } from 'react';

import Card from '../ui/Card';
import classes from './NewMeetupForm.module.css';

function NewMeetupForm(props) {
  const titleInputRef = useRef();
  const endpointInputRef = useRef();
  const dataproviderInputRef = useRef();
  const descriptionInputRef = useRef();

  function submitHandler(event) {
    event.preventDefault();

    const enteredTitle = titleInputRef.current.value;
    const enteredEndpoint = endpointInputRef.current.value;
    const enteredDataProvider = dataproviderInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;


    const meetupData = {
      title: enteredTitle,
      endpoint: enteredEndpoint,
      dataProvider: enteredDataProvider,
      description: enteredDescription,
    };

    props.onAddMeetup(meetupData);
  }

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='title'>Dataset Title</label>
          <input type='text' required id='title' ref={titleInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='endpoint'>API/Dataset Endpoint</label>
          <input type='text' required id='endpoint' ref={endpointInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='dataProvider'>Data Provider</label>
          <input type='text' required id='dataProvider' ref={dataproviderInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='description'>Description</label>
          <textarea
            id='description'
            required
            rows='5'
            ref={descriptionInputRef}
          ></textarea>
        </div>
        <div className={classes.actions}>
          <button>Submit</button>
        </div>
      </form>
    </Card>
  );
}

export default NewMeetupForm;
