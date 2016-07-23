import GitHubApi from 'github';
import BPromise from 'bluebird';

class Github {
  constructor(config) {
    this.user = config.user;
  }

  getInfo() {
    return {
      'slug': 'github',
      'name': 'Github',
      'logo': 'https://github.com/favicon.ico'
    };
  }

  getData() {
    const github = new GitHubApi({
      version: "3.0.0",
      Promise: BPromise
    });

    return github.activity.getStarredReposForUser({ user: this.user})
      .then(res => {
        if (!res instanceof Array) {
          res = [];
        }

        const repos = res.map((repo) => {
          return {
            id: repo.id,
            title: repo.full_name,
            text: repo.description,
            link: repo.html_url
          };
        });

        return {
          data: repos,
          hasNextPage: !!github.hasNextPage(res)
        };
    });
  }
}

export default Github;
