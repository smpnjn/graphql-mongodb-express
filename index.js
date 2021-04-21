import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';
import mongoose from 'mongoose';

// Models
import { Article } from './models/article.model.js';

// Connect to our mongoDB
const database = 'mongodb://localhost:27017/database';
mongoose.connect(database, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

// Set up our schema
let schema = buildSchema(`
  type Query {
    title: [String]
    articleAge: [Int]
  }
`);

let root = {
    title: async () => {
        let allArticles = [];
        // Query our mongoDB
        let articles = await Article.find();
        // Return data in appropriate format
        articles.forEach(function(item) {
            if(typeof item.title === "string") {
                allArticles.push(item.title);
            }
        });
        return allArticles;
    },
    articleAge: async () => {
        // Repeat
        let allDates = [];
        let articles = await Article.find();
        articles.forEach(function(item) {
            if(typeof item.date === "number") {
                allDates.push(item.date);
            }
        });
        return allDates;

    }
};
 
let app = express();
app.get('/api', graphqlHTTP({
    schema: schema,
    rootValue: root
}));

app.listen(4000);