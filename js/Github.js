import config from './config.js';

export default class Github {
  async getAccountDetails(name) {
    // GET USER DETAILS
    const userRes = await fetch(
      `https://api.github.com/users/${name}?client_id=${config.clientID}&client_secret=${
        config.clientSecret
      }`
    );

    // If user is not found
    if (userRes.status === 404) {
      return { user: null, repositories: null };
    }

    const user = await userRes.json();

    // GET USER REPOSITORIES
    const reposRes = await fetch(
      `https://api.github.com/users/${name}/repos?client_id=${config.clientID}&client_secret=${
        config.clientSecret
      }`
    );
    const repositories = await reposRes.json();

    return { user, repositories };
  }
}
