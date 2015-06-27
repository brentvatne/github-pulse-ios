import { GithubClientId, GithubClientSecret, } from './Credentials';

export default class GithubApi {
  static baseUrl = 'https://api.github.com';
  static clientId = GithubClientId;
  static clientSecret = GithubClientSecret;

  static urlFor(path) {
    let { baseUrl, clientId, clientSecret, } = GithubApi;
    return `${baseUrl}${path}?client_id=${clientId}&client_secret=${clientSecret}`
  }

  static async getZen() {
    const url = GithubApi.urlFor('/zen');
    let response = await fetch(url);

    if (response._bodyText.match(/API rate limit/)) {
      return 'Be friendly to public APIs';
    } else {
      return response._bodyText;
    }
  }

  static async fetchUserInfo(username) {
    const url = GithubApi.urlFor(`/users/${username}`);
    let response = await fetch(url);

    return JSON.parse(response._bodyText);;
  }
}
