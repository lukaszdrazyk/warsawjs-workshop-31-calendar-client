export const REQUEST_ADD_EVENT = "REQUEST_ADD_EVENT";
export const RECEIVE_ADD_EVENT = "RECEIVE_ADD_EVENT";
export const REQUEST_UPDATE_EVENT = "REQUEST_UPDATE_EVENT";
export const RECEIVE_UPDATE_EVENT = "RECEIVE_UPDATE_EVENT";
export const REQUEST_DELETE_EVENT = "REQUEST_DELETE_EVENT";
export const RECEIVE_DELETE_EVENT = "RECEIVE_DELETE_EVENT";
export const REQUEST_DAY = "REQUEST_DAY";
export const RECEIVE_DAY = "RECEIVE_DAY";

export interface IDayEvent {
  id: string;
  title: string;
  description: string;
  time: string;
  notification: boolean;
}

export interface IDay {
  date: string;
  events: IDayEvent[];
}

export interface IDayDataProviderResponse {
  data: IDayEvent[];
}

export const requestDay = (date: string) => ({
  date,
  type: REQUEST_DAY,
});

export const receiveDay = (date: string, data: IDayDataProviderResponse) => ({
  data,
  date,
  type: RECEIVE_DAY,
});

export const requestAddEvent = () => ({
  type: REQUEST_ADD_EVENT,
});

export const receiveAddEvent = (data: IDayEvent) => ({
  data,
  type: RECEIVE_ADD_EVENT,
});

export const requestUpdateEvent = () => ({
  type: REQUEST_UPDATE_EVENT,
});

export const receiveUpdateEvent = (data: IDayEvent) => ({
  data,
  type: RECEIVE_UPDATE_EVENT,
});

export const requestDeleteEvent = () => ({
  type: REQUEST_DELETE_EVENT,
});

export const receiveDeleteEvent = (deletedEventId: string) => ({
  deletedEventId,
  type: RECEIVE_DELETE_EVENT,
});

const fetchDay = (date: string) => (dispatch: any) => {
  dispatch(requestDay(date));

  return fetch(`/day?date=${date}`, { method: "GET", credentials: "same-origin" })
    .then((response) => response.json())
    .then(({ data }) => dispatch(receiveDay(date, data)));
};

const addEvent = (event: IDayEvent) => (dispatch: any) => {
  dispatch(requestAddEvent());

  return fetch("event", {
    body: JSON.stringify(event),
    credentials: "same-origin",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
  })
    .then((response) => response.json())
    .then(({ id }) => dispatch(receiveAddEvent({ id, ...event })));
};

const updateEvent = (event: IDayEvent) => async (dispatch: any) => {
  dispatch(requestUpdateEvent());

  return fetch(`event?id=${event.id}`, {
    body: JSON.stringify(event),
    credentials: "same-origin",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    method: "PUT",
  })
    .then((response) => response.json())
    .then(({ id }) => dispatch(receiveUpdateEvent({ id, ...event })));
};

const deleteEvent = (eventId: string) => async (dispatch: any) => {
  dispatch(requestDeleteEvent());

  await fetch(`event?id=${eventId}`, { method: "DELETE", credentials: "same-origin" });

  dispatch(receiveDeleteEvent(eventId));
};

export const dispatchFetchDay = (date: string) => (dispatch: any) => {
  return dispatch(fetchDay(date));
};

export const dispatchDeleteEvent = (eventId: string) => (dispatch: any) => {
  return dispatch(deleteEvent(eventId));
};

export const dispatchAddEvent = (data: IDayEvent) => (dispatch: any) => {
  return dispatch(addEvent(data));
};

export const dispatchUpdateEvent = (data: IDayEvent) => (dispatch: any) => {
  return dispatch(updateEvent(data));
};
