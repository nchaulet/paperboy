import GitHubApi from 'github';

class Github {

    constructor(config) {
        this.user = config.user;
    }

    getData() {
        return new Promise((resolve, reject) => {
            var github = new GitHubApi({
                version: "3.0.0"
            });

            github.repos.getStarredFromUser({ user: this.user}, (error, res) => {
                if (error) {
                    return reject(error);
                }
                var repos = res.map((repo) => {
                    return {
                        id: repo.id,
                        title: repo.full_name,
                        text: repo.description,
                        link: repo.html_url
                    };
                });

                resolve(repos);
            });
        });
    }

}

export default Github;
