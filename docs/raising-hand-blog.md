# Implementing the Raise Your Hand Feature using the Daily.co API

Think about the phrase "raise your hand". It brings to mind classrooms full of
enthused students raising their arms straight up to the sky. In social
situations, raising your hand in a group gives the visual cue that a person
would like to ask a question or give an answer.

The world we live in is progressively more remote-friendly by the day and video
calls are now commonplace. Having the ability to virtually "raise your hand"
allows a call moderator to host large meetings while still ensuring each
individual call user can ask questions when needed.

In this post we'll be covering a demo of how to implement a "hand raising" user
interface utilizing the `Daily.co` simple video chat API.

## Use Cases for "Raising Your Hand"

The use case of virtually "raising a hand" is very similar to when you would
physically raise your hand. If you are at lunch with three friends, you probably
wouldn't raise your hand to ask one of them a question. Virtually "raising your
hand" is best done in larger community calls where the moderator of the call may
need to interact with individual members of that call.

**Examples**:

- A student raising their hand to answer their teacher's question.
- In a company wide meeting, an employee can raise their hand to ask a question
  of the CEO.
- In a webinar, a customer raises her hand to ask a question about a product.

In this demo we've created a "classroom" where the moderator of the call will be
the teacher. When the teacher joins the call their audio and video is
automatically turned on. Any student who joins the same video call will
automatically have their audio and video turned off so as to not distract other
students.

When a student would like to ask a question they can click a button marked
"Raise your hand" to turn their video and audio on. Then, once the questions has
been answered, they can then "Lower their hand" to turn their audio and video
off again.

[Check out the Live Demo!][live-demo]

## Getting Started

We recommend forking the repository for this demo as reference while you follow
along:

- [Demo Code][raising-hands-github]

We additionally recommend keeping the [Daily.co documentation][daily-docs] open
as reference.

We'll start by creating the meeting room where our video call will take place.

### Creating a Meeting Room

According to the Daily.co documentation, "A 'room' represents a specific video
call location and configuration." So we will start by creating a 'room' to
easily give all our call participants the same video configuration.

We can do this by making a "POST" request to the Daily.co API "/rooms" endpoint.
We'll start by defining a `createRoom` function:

```js
async function createRoom() {}
```

We can then define a couple of helper functions for making requests:

```js
// util/api-functions.js

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
      authorization: `Bearer ${SECRET_API_KEY}`
    },
    credentials: "same-origin"
  });
}

// checks response status for errors, and returns response JSON
async function handleResponseJSON(response) {
  if (response.status >= 201) {
    console.log(response.statusText);
    throw new Error("Bad response from server");
  }
  return response.json();
}
```

> Notice in the above `makePostRequest` function that we wrap the passed in
> `properties` argument in an object. This is because the "/rooms" endpoint
> expects the properties to be passed as such (see
> [here][daily-docs-create-room] for more info.)

Now we can now create a function that, when called, will create and return a new
room object:

```js
// will return a room object with a url for joining that room
async function createMtgRoom(properties = {}) {
  let response = await makePostRequest(
    "https://api.daily.co/v1/rooms",
    properties
  );

  room = await handleResponseJSON(response);
  return room;
}

async function createRoom() {
  // here we are declaring room on the window so we
  // have access to it everywhere
  room = await createMtgRoom({
    owner_only_broadcast: true
  });
}
```

> Note: when we do invoke the above function the returned room object will have
> a name and a url we can use to join a video call.

Notice above, that we've set the `owner_only_broadcast` property for our new
room so that only the room's owner (the teacher) will be able to set their own
audio and video within the call. That raises a new problem!

We now need a way of differentiating between the owner of the room (the teacher)
and the other room occupants(the students). The easiest way to do this is to
create a "meeting token".

The ["meeting token" object][daily-docs-meet-token] will allow us to configure
the features that our meeting room's users have access to (including who the
owner of the meeting is). So we can write a function that will accept a
properties object, create a meeting room token, and then will return a link with
the newly created token appended:

```js
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
```

Now we can update our original `createRoom` function:

```js
async function createRoom() {
  room = await createMtgRoom({
    owner_only_broadcast: true
  });

  // we want to ensure the teacher starts with their audio and video on
  window.ownerLink = await createMtgLinkWithToken({
    room_name: room.name,
    is_owner: true,
    start_audio_off: false,
    start_video_off: false
  });
}
```

> Note: In order to create a "meeting token" you will need to pass in the room
> name as one of the properties.

Looks good! We can now create a meeting room for our video call and have the
ability to differentiate between "teachers" and "students".

For our demo we wanted to ensure our users always had the same user interface so
we created a link using the room name and our current url and showed that link
to our user:

```js
// client/util/ui-functions.js
// will create a link with the current room name
// then it will insert that link into our HTML
function updateRoomUrlDisplay() {
  let roomEl = document.getElementById("meeting-room-info");

  let roomLink =
    document.location.href.replace("-human", "-device") +
    "?name=" +
    encodeURIComponent(room.name);

  roomEl.innerHTML = `
      <div>
        <h4>Room Info</h4>
          <a href="${roomLink}" target="_blank">
            <p>Open this link in incognito mode to log in as a student</p>     
          </a>
      </div>
    `;
}
```

We now have two states - "if a room was previously created" or "if a room has
not yet been created". So we can create a function to fetch a room by name if it
already exists:

```js
// function for creating a fetch request
async function makeFetchRequest(url) {
  return fetch(url, {
    method: "Get",
    headers: {
      "Content-Type": "application/json",
      // imported from a file not checked into version control
      authorization: `Bearer ${SECRET_API_KEY}`
    },
    credentials: "same-origin"
  });
}

// will return a room object with the specified name
async function fetchRoom(name) {
  let response = await makeFetchRequest(
    `https://api.daily.co/v1/rooms/${name}`
  );

  room = await handleResponseJSON(response);
  return room;
}
```

Now we can check our url to determine if we need to make a new room or not. We
can tweak our original `createRoom` function to do only create a new room when
needed:

```js
// this function will ensure we have a room object available
async function createRoom() {
  let room;
  let roomNameExists = checkForExistingRoom(document.location.href);
  // if we have a room we will fetch that room's information
  if (roomNameExists) {
    room = await APIFunctions.fetchRoom(roomNameExists);
    // this function will enable the button to join as a student
    // they CAN'T be a teacher since they are joining an existing meeting
    buttonEnable("join-meeting-student");
  } else {
    room = await createMtgRoom({
      owner_only_broadcast: true
    });

    window.ownerLink = await createMtgLinkWithToken({
      room_name: room.name,
      is_owner: true,
      start_audio_off: false,
      start_video_off: false
    });

    // update our ui with our new room url link
    updateRoomUrlDisplay();
    // the user can then choose:
    // A. join as the teacher (the owner of the meeting)
    // B. join as a student
    buttonEnable("join-meeting-teacher", "join-meeting-student");
  }
}

// check and see if we have a pre-existing meeting room in our url
function checkForExistingRoom(url) {
  let urlStartIdx = url.indexOf("?name=");
  if (urlStartIdx > -1) {
    // if we do - we'll extract the room name after the "?name="
    let decodedRoomName = decodeURIComponent(url.slice(urlStartIdx + 6));
    return decodedRoomName;
  }
  return false;
}
```

Now the first time a user creates a room they have the option of joining that
room as a student or as a teacher. That user can then share the displayed link
(or open it in an incognito window) and all visitors of that link can join the
meeting room as a student.

Awesome, that should cover our room functionality now it's time to get to the
fun part! Let's make some calls.

### Creating a Call

Now that we have a room to connect to - let's set up our video! We need to make
sure to include the Daily.co library so we can use it:

```html
<!-- // index.html -->
<script src="https://unpkg.com/@daily-co/daily-js"></script>
```

Setting up a video call using the
[`DailyIframe.createFrame`][daily-docs-create-frame] method is super easy! All
we need to do is call the `window.DailyIframe.createFrame` function and pass in
a url to connect our call to.

For our demo we have two urls for connecting to our meeting room- one for the
owner of the meeting (which includes the meeting token) and one for students
(with no meeting token).

We'll handle this by first creating our `DailyIframe` instance (i.e our video
connection) then allowing the user to choose how they would like to connect.

We can start by creating our `DailyIframe` instance (which we will reference as
`callFrame` from now on):

```js
async function createFrame() {
  let container = document.getElementById("call-frame-container");
  callFrame = window.DailyIframe.createFrame(container);
}
```

Now depending on a user's actions we want to either allow them to connect as a
student or as a teacher.

So in our HTML we can provide two buttons:

```html
<!-- index.html -->
<button id="join-meeting-teacher" onclick="joinCallTeacher()">
  Join as Teacher (you can't raise your hand since you are the main speaker!)
</button>
<button id="join-meeting-student" onclick="joinCallStudent()">
  Join as a student (you can raise your hand)
</button>
```

Then we can define two functions for handling either join case:

```js
function joinCallTeacher() {
  // we will use the ownerLink here (which contains the meeting token)
  // because this user will be the meeting owner
  callFrame.join({ url: ownerLink });
  buttonDisable("join-meeting-student", "join-meeting-teacher");
  buttonEnable("leave-meeting");
}

function joinCallStudent() {
  // we will use the normal room url for a student
  callFrame.join({ url: room.url });
  buttonDisable("join-meeting-student", "join-meeting-teacher");
  buttonEnable("raise-hand-btn", "leave-meeting");
}
```

Since we created our room with `owner_only_broadcast` set to true the teacher
joining will be allowed to control their audio & video. Conversely, all joining
students will have their video and audio turned off.

Finally, we can create a function that will set up both our frame and room when
called:

```js
// create our meeting room and prepare our call to connect
async function createFrameAndRoom() {
  await createRoom();
  await createFrame();
  buttonDisable("create-room-and-frame");
}
```

Now that we have the ability to join a call as either a student or teacher lets
move on to getting our "hand raising" UI setup.

### Raising A User's Hand

In this context we've established that only the teacher is allowed to control
their audio and video settings. In order to get the teacher's attention, a
student must be able to somehow turn on their own audio and video. So "raising
your hand" virtually can be translated as a student being able to turn on their
audio and video when they have a question.

Let's take a look at how we went about building this functionality. We first
started by creating two buttons for a user to click:

```html
<!-- index.html -->
<button id="raise-hand-btn" onclick="raiseHand()">
  Raise Your Hand!
</button>
<button id="lower-hand-btn" onclick="lowerHand()">
  Lower Your Hand!
</button>
```

Once the `raiseHand` function has been invoked we need to update the current
user's audio and video settings.

We can find the current user by checking our `DailyIframe` instance. We can use
the [`DailyIframe.prototype.participants`][daily-docs-participants] method to
return all our current call's users. We can then update that local user using
the [`DailyIframe.prototype.updateParticipant`][daily-docs-update-participant]
method with a specified user's `session_id`:

```js
function raiseHand() {
  // find the session_id of the current user
  let currentUserId = callFrame.participants().local.session_id;
  // raising the hand of a student will turn their camera and video on
  // so we will update the current user to turn on their camera and audio
  callFrame.updateParticipant(currentUserId, {
    setAudio: true,
    setVideo: true
  });

  buttonDisable("raise-hand-btn");
  buttonEnable("lower-hand-btn");
}
```

Once the question has been asked the user can then turn off their audio and
video by "lowering their hand":

```js
function lowerHand() {
  let currentUserId = callFrame.participants().local.session_id;
  // lowering the hand of a student will turn their camera and video off
  callFrame.updateParticipant(currentUserId, {
    setAudio: false,
    setVideo: false
  });
  buttonEnable("raise-hand-btn");
  buttonDisable("lower-hand-btn");
}
```

Nice! We now have a way for users to "raise their hands" virtually. To finish
things off we'll create a list of all the call participants with an indicator if
their hand is raised.

### Rendering Call Participants

Finally, we'll create a function for listing our users and their hand states:

```js
// update the list of users in the call and their hand state
function updateParticipantList() {}
```

This function will rely on checking our video call's users using the
[`DailyIframe.prototype.participants`][daily-docs-participants] method. We'll
start by first iterating through our call's participants and just showing their
names:

```js
function updateParticipantList() {
  const participantList = document.getElementById("participants-list");
  const participants = callFrame.participants();
  let listHtml = "";

  for (let id in participants) {
    let participant = participants[id];
    let handRaised;
    listHtml += `
          <li>
            <p>${participant.user_name || "guest"}</p>
           </li>`;
  }
  participantList.innerHTML = listHtml;
}
```

With this function setup we now want to ensure that whenever a new person joins,
leaves, or is updated in anyway we will re-render this list to make sure it's up
to date.

To do that we can set a series of event listeners on our `DailyIframe` instance
when we instantiate it. These listeners can ensure the `updateParticipantList`
function is called whenever our participants change:

```js
// back to our createFrame function
async function createFrame() {
  let container = document.getElementById("call-frame-container");
  callFrame = window.DailyIframe.createFrame(container);

  // setting up our event listeners
  callFrame
    .on("join-meeting", updateParticipantList)
    .on("participant-joined", updateParticipantList)
    .on("participant-updated", updateParticipantList)
    .on("participant-left", updateParticipantList);
}
```

Great, we will now have a list of users in the call rendered to our page. Now's
let get to what everyone is here for - setting up our hand state!

So let's restate a few things that we know:

1. A teacher is the owner of a meeting and can control their own audio/video
   settings.
2. A teacher _can't_ raise their hand - it just wouldn't make sense.
3. A student joins the meeting with their audio and video off.
4. A student can raise their hand to turn on their audio and video or lower
   their hand to turn their video and audio off again.

We can use these above rules to create a simple condition to set our hand state:

```js
// update the list of users in the call and their hand state
function updateParticipantList(e) {
  showEvent(e);
  const participantList = document.getElementById("participants-list");
  const participants = callFrame.participants();
  let listHtml = "";

  for (let id in participants) {
    let participant = participants[id];
    let handRaised;
    // the owner of this meeting is the teacher and can therefore
    // not raise their own hand
    if (participant.owner) {
      handRaised = "";
    } else {
      // otherwise a student will only have their hand raised if
      // their camera is on
      handRaised = participant.video && participant.audio ? "✋" : "";
    }
    listHtml += `
          <li>
            <p>${participant.user_name || "guest"} ${handRaised}</p>
           </li>`;
  }
  participantList.innerHTML = listHtml;
}
```

There you go! Our user interface will now allow a student to raise their hand
and allow other users within the room to see that hand being raised and lowered.

Thank you so much for reading this guide, we hope you enjoyed it!

<!-- All the markdown links used throughout the post -->

[raising-hands-github]: https://github.com/rkoron007/Daily.co-Raising-Hands-Demo
[live-demo]: https://classroom-hand-raise-demo.herokuapp.com/
[daily-docs]: https://docs.daily.co/reference#introduction
[daily-docs-create-room]: https://docs.daily.co/reference#create-room
[daily-docs-meet-token]: https://docs.daily.co/reference#meeting-tokens
[daily-docs-create-frame]: https://docs.daily.co/reference#%EF%B8%8F-createframe
[daily-docs-participants]:
  https://docs.daily.co/reference#%EF%B8%8F-participants
[daily-docs-update-participant]:
  https://docs.daily.co/reference#%EF%B8%8F-updateparticipants
