import {fetchRepositoryData} from './dataCollector.js'
import {createNewRepository} from "./database.js";
import express from 'express';

const app = express();
const PORT = process.env.PORT || 8080;

app.get('/collect/:repoName', async (req, res) => {
    const { repoName } = req.params;
    try {
        const repoData = await fetchRepositoryData(repoName);
        await createNewRepository(repoData);
        res.status(200).send(repoData);
    } catch (err) {
        res.status(500).send(err);
    }
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));