function showEvent(e) {
  console.log("video call event -->", e);
}

// will create a link with the current room name and insert that link
// into our HTML
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

// we've left the meeting so we will empty the participant list
function emptyParticipantList() {
  const participantList = document.getElementById("participants-list");
  participantList.innerHTML = "";
}

// ui button functions
function buttonEnable(...args) {
  args.forEach(id => {
    let el = document.getElementById(id);
    if (el) {
      el.classList.remove("disabled");
    }
  });
}

function buttonDisable(...args) {
  args.forEach(id => {
    let el = document.getElementById(id);
    if (el) {
      el.classList.add("disabled");
    }
  });
}

// functions that will connect to the call as either a student or teacher and
// handle showing/hiding buttons
function joinCallTeacher() {
  callFrame.join({ url: ownerLink });
  buttonDisable("join-meeting-student", "join-meeting-teacher");
  buttonEnable("leave-meeting");
}

function joinCallStudent() {
  console.log("hello");
  callFrame.join({ url: room.url, showLeaveButton: false });
  buttonDisable("join-meeting-student", "join-meeting-teacher");
  buttonEnable("raise-hand-btn", "leave-meeting");
}

// initially hide these buttons until we have a room setup
function setupBtns() {
  UIFunctions.buttonDisable(
    "join-meeting-teacher",
    "join-meeting-student",
    "raise-hand-btn",
    "leave-meeting",
    "lower-hand-btn"
  );
}

module.exports = {
  showEvent,
  joinCallStudent,
  joinCallTeacher,
  buttonDisable,
  buttonEnable,
  emptyParticipantList,
  updateRoomUrlDisplay,
  setupBtns
};
