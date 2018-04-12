export default class UI {
  constructor() {
    this.container = document.querySelector('.js-container');
    this.profileDetails = document.querySelector('.js-profile');
    this.repositoriesWrapper = document.querySelector('.js-repos');
  }

  /**
   * Method for displaying notification
   *
   * @memberof UI
   */
  showNotification() {
    // Create notification div with UI-KIT classes
    const notification = document.createElement('div');
    notification.classList = 'js-alert uk-alert uk-alert-danger';

    // Append text for notification
    notification.appendChild(document.createTextNode('User not found'));

    // Get existing alert
    const existingNotification = document.querySelector('.js-alert');

    if (existingNotification !== null) {
      // Replace existing notification with new one
      existingNotification.parentElement.replaceChild(notification, existingNotification);
    } else {
      // Insert notification before provided element
      this.container.insertBefore(notification, this.container.firstChild);
    }

    // Remove notification after 3 seconds
    setTimeout(() => {
      notification.remove();
    }, 3000);
  }

  /**
   * Method for displaying profile details
   *
   * @param {Object} user
   * @memberof UI
   */
  profileDetail(user) {
    // Get element to display profile card
    const cardWrapper = this.profileDetails.querySelector('.js-profile-card');

    if (user === null) {
      // If user is null hide profile wrapper
      this.hide(this.profileDetails, () => {
        cardWrapper.innerHTML = '';
      });
    } else {
      // Show profile wrapper
      this.show(this.profileDetails);

      // Fill profile card
      cardWrapper.innerHTML = `
        <div class="uk-card uk-card-body uk-margin-top th-border">
          <div class="uk-grid">
            <div class="uk-width-1-4@m uk-width-6-6@s">
              <div class="uk-background-cover uk-height-small" style="background-image: url(${
                user.avatar_url
              }"></div>
              <a href="${
                user.html_url
              }" class="uk-button uk-button-primary uk-margin-top uk-margin-bottom uk-width-1-1" target="_blank">View profile</a>
            </div>
            <div class="uk-width-expand uk-margin-top@s">
              <div class="uk-margin-bottom">
                <span class="uk-label">Repositories: ${user.public_repos}</span>
                <span class="uk-label">Gists: ${user.public_gists}</span>
                <span class="uk-label">Followers: ${user.followers}</span>
                <span class="uk-label">Following: ${user.following}</span>
              </div>
              <ul class="uk-list uk-list-divider">
                ${user.name ? `<li>Name: ${user.name}</li>` : ``}
                ${user.company ? `<li>Company: ${user.company}</li>` : ``}
                ${user.blog ? `<li>Blog: <a href="${user.blog}">${user.blog}</a></li>` : ``}
                ${user.location ? `<li>Location: ${user.location}</li>` : ``}
                <li>Created at: ${user.created_at}</li>
              </ul>
            </div>
          </div>
        </div>
      `;
    }
  }

  /**
   * Method for displaying list of user repositories
   *
   * @param {Object} repositories
   * @memberof UI
   */
  repositoriesList(repositories) {
    const repositoriesList = this.repositoriesWrapper.querySelector('.uk-list');

    if (repositories === null || repositories.length === 0) {
      this.hide(this.repositoriesWrapper);
    } else {
      this.show(this.repositoriesWrapper);
      let list = '';

      repositories.forEach(repository => {
        list += `
        <li>
            <div class="uk-grid">
              <div class="uk-width-expand">
                <a href="${repository.html_url}" class="uk-link" target="_blank">${
          repository.name
        }</a>
              </div>
              <div class="uk-width-auto">
                <span class="uk-label">Stars: ${repository.stargazers_count}</span>
                <span class="uk-label">Watchers: ${repository.watchers_count}</span>
                <span class="uk-label">Forks: ${repository.forks}</span>
              </div>
            </div>
          </li>
        `;
      });

      repositoriesList.innerHTML = list;
    }
  }

  /**
   * Helper for hiding elements
   *
   * @param {Element} element NodeElement
   * @param {Function} cb Callback
   * @memberof UI
   */
  hide(element, cb) {
    element.classList.add('uk-animation-fade', 'uk-animation-reverse', 'uk-animation-fast');

    element.addEventListener('animationend', () => {
      element.classList.add('th-display-none');

      if (typeof cb === 'function') {
        cb();
      }
    });
  }

  /**
   * Helper for showing elements
   *
   * @param {Element} element NodeElement
   * @memberof UI
   */
  show(element) {
    element.classList.remove('uk-animation-fade', 'th-display-none');
  }
}
