import {fetchRepositoryData} from './dataCollector.js'
import {createNewRepository} from "./database.js";

createNewRepository(await fetchRepositoryData('twenty'))