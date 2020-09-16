import mongoose, { mongo } from 'mongoose';

import { mongodb } from './keys';

mongoose.connect(mongodb.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(db => console.log('Databae connected'));

