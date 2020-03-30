function showEvent(e) {
  console.log("video call event -->", e);
}

function updateRoomInfoDisplay() {
  let roomEl = document.getElementById("meeting-room-info");

  let roomLink =
    document.location.href.replace("-human", "-device") +
    "?name=" +
    encodeURIComponent(room.name);

  roomEl.innerHTML = `
      <div>
        <h4>Room Info</h4>
          <a href="${roomLink}" target="_blank">
            <p>Open this link incognito mode</p>     
          </a>
        <span id='expires-countdown' />
      </div>
    `;
  if (!window.expiresUpdate) {
    window.expiresUpdate = setInterval(() => {
      let exp = room && room.config && room.config.exp;
      if (exp) {
        document.getElementById("expires-countdown").innerHTML = `
     room expires in
       ${Math.floor((new Date(exp * 1000) - Date.now()) / 1000)}
     seconds
   `;
      }
    }, 1000);
  }
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

function joinCallTeacher() {
  callFrame.join({ url: ownerLink });
  buttonDisable("join-meeting-student", "join-meeting-teacher");
  buttonEnable("leave-meeting");
}

function joinCallStudent() {
  callFrame.join({ url: room.url });
  buttonDisable("join-meeting-student", "join-meeting-teacher");
  buttonEnable("raise-hand-btn", "leave-meeting");
}
