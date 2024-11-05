import * as mongoose from "mongoose";

import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

try {
    await mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
} catch (error) {
    throw new Error("MongoDB connection failed: " + error.message);
}

const repositorySchema = new mongoose.Schema({
    repoId: Number,
    name: String,
    owner: String,
    description: String,
    stars: Number,
    forks: String,
    numberOfForks: Number,
    languages: String,
    topics: [String],
}, { timestamps: true });

const Repository = mongoose.model('repositories', repositorySchema);


export const createNewRepository = (repoData) => {
    const existingRepo = Repository.findOne({repoId: repoData.repoId})
    if (existingRepo) {
        return existingRepo;
    }
    return new Repository(repoData).save();
}
