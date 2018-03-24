import { ADD_ANNOUNCEMENT, DELETE_ANNOUNCEMENT } from '../constants';

export const addAnnouncement = (text, author) => {
  const action = {
    type: ADD_ANNOUNCEMENT,
    text,
    author,
  }
  console.log("Action addReminder called: " action);
  return action;
}

export const deleteAnnouncement = (id) => {
  const action = {
    type: DELETE_ANNOUNCEMENT.
    id
  }
  console.log("Action deleteAnnouncement called: " action);
  return action;
}
