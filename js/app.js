import Github from './Github.js';
import UI from './UI.js';

// UI ELEMENTS
const formInput = document.querySelector('.js-input');

// Instance of Github Class
const github = new Github();

// Instance of UI Class
const ui = new UI();

formInput.addEventListener('keyup', async event => {
  const userName = event.target.value;

  if (userName != '') {
    // Fetch user data and repositories list
    const { user, repositories } = await github.getAccountDetails(userName);

    if (user === null) {
      // Show notification that user doesn't exist
      ui.showNotification();
    } else {
      // Show profile of found user
      ui.profileDetail(user);

      // Show repositories list of found user
      ui.repositoriesList(repositories);
    }
  } else {
    // Hide profile details
    ui.profileDetail(null);

    // Hide repositories list
    ui.repositoriesList(null);
  }
});
