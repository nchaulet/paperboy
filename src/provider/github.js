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
      'logo': 'https://github.com/favicon.ico',
      'rate_ms': 60 * 1000
    };
  }

  getData(page) {
    const _page = page || 1;

    const github = new GitHubApi({
      version: "3.0.0",
      Promise: BPromise,
      headers: {
        Accept: "application/vnd.github.v3.star+json"
      }
    });

    return github.activity.getStarredReposForUser({ user: this.user, page: _page})
      .then(res => {
        if (!res instanceof Array) {
          res = [];
        }

        const repos = res.map((repo) => {
          return {
            id: repo.repo.id,
            title: repo.repo.full_name,
            text: repo.repo.description,
            link: repo.repo.html_url,
            created_at: repo.starred_at
          };
        });

        return {
          items: repos,
          nextPage: !!github.hasNextPage(res) ? page + 1 : null
        };
    });
  }
}

export default Github;
