import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const githubToken = process.env.GITHUB_TOKEN;
const parseData = (repoData) => ({
    id: repoData.id,
    stars: repoData.stargazers_count,
    owner: repoData.owner?.login,
    description: repoData.description,
    forks: repoData.forks_url,
    numberOfForks: repoData.forks_count,
    languages: repoData.language,
    topics: repoData.topics
})

export const fetchRepositoryData = async (repoName) => {
    let repos;
    try {
         repos = (await axios.get(`https://api.github.com/search/repositories?q=${repoName}`, {
            headers: {
                Authorization: `token ${githubToken}`,
            },
        })).data;
    } catch (e) {
        throw new Error('Error Fetching Repositories From GitHub: ' + e.message);
    }


    const repoData = repos.items[0];

    if (!repoData) {
        throw new Error('Repository Not Found: ' + repoName);
    }

    return parseData(repoData);
}