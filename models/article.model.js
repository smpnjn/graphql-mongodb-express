import mongoose from 'mongoose'

const database = 'mongodb://localhost:27017/articles';

const connection = mongoose.createConnection(database, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const schema = new mongoose.Schema({ 
    title: 'String',
    description: 'String',
    articleText: 'String',
    date: 'Number'
});

const Article = mongoose.model('Article', schema);

export { Article };