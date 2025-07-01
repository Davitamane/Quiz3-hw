const URL = "https://jsonplaceholder.typicode.com/users";
const container = document.querySelector(".grid");

let allUsers;

async function dataFetch() {
  try {
    container.innerHTML = `
    <div id="loader" class="loader">
        <div class="spinner"></div>
      </div>
    `;
    const res = await fetch(URL);
    const data = await res.json();
    // console.log(data);
    allUsers = data;

    drawUI(data);
  } catch (error) {
    container.innerHTML = `
    <div id="error-container" class="error-container">
        <h3 class="error-title">Error Loading Users</h3>
        <p id="error-message" class="error-message">
          An error occurred while fetching users.
        </p>
    </div>
    `;
  }
}
dataFetch();

function drawUI(users) {
  container.innerHTML = "";
  users.forEach((user) => {
    const HTML = `
            <div class="card">
          <div class="card-header">
            <div class="card-avatar">${user.name
              .split(" ")
              .map((word) => word.slice(0, 1))
              .join("")}</div>
          </div>
          <div class="card-body">
            <h3 class="card-title">${user.name}</h3>
            <p class="card-username">@${user.username}</p>

            <div class="card-details">
              <p class="card-details-title">Address</p>
              <p class="card-address">
                ${user.address.street}, ${user.address.suite}<br />
                ${user.address.city}
              </p>
            </div>
    `;

    container.insertAdjacentHTML("beforeend", HTML);
  });
}
const query = document.querySelector(".search-input");

query.addEventListener("input", () => {
  const input = query.value.toLowerCase();
  const searchedUsers = allUsers.filter((user) => {
    return user.name.toLowerCase().includes(input);
  });
  drawUI(searchedUsers);
});
