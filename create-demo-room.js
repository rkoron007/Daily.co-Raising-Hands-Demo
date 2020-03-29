// function for creating a post request
async function makePostRequest(url, properties = {}) {
  return fetch(url, {
    method: "POST",
    // here we ensure our passed in properties are wrapped in an object
    // with a properties key pointing at the values like so:
    // "{\"properties\":{\"start_audio_off\":true}}";
    body: JSON.stringify({ properties }),
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      // imported from a file not checked into version control
      authorization: `Bearer ${APIKEY}`
    },
    credentials: "same-origin"
  });
}

// checks response status for errors, and returns response JSON
async function handleResponseJSON(response) {
  if (response.status >= 201) {
    console.log(response.error);
    throw new Error("Bad response from server");
  }
  return response.json();
}

// will return a room object with a url for joining that room
async function createMtgRoom(properties = {}) {
  let response = await makePostRequest(
    "https://api.daily.co/v1/rooms",
    properties
  );

  room = await handleResponseJSON(response);
  return room;
}

// will create a meeting token for a provided meeting room
// then will return the room's url with the token appended
async function createMtgLinkWithToken(properties) {
  let response = await makePostRequest(
    "https://api.daily.co/v1/meeting-tokens",
    properties
  );

  let { token } = await handleResponseJSON(response);
  return `${room.url}?t=${token}`;
}
