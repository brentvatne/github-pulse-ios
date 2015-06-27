export default class GithubApi {

  static baseUrl = 'https://api.github.com';

  static async getZen() {
    const url = GithubApi.baseUrl + '/zen';
    let response = await fetch(url);

    if (response._bodyText.match(/API rate limit/)) {
      return 'Be friendly to public APIs';
    } else {
      return response._bodyText;
    }
  }

}
