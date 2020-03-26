const newRoomEndpoint =
  "https://fu6720epic.execute-api.us-west-2.amazonaws.com/default/dailyWwwApiDemoNewCall";

async function createMtgRoom() {
  try {
    let response = await fetch(newRoomEndpoint),
      room = await response.json();
    return room;
  } catch (e) {
    console.error(e);
  }
}
