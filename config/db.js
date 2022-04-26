import mongoose from 'mongoose';

export default {
    connectToDb: () => {
        const uri = process.env.DB_URI;

        mongoose.connect(uri, { useNewUrlParser: true });
        const db = mongoose.connection;

        db.once('open', () => console.log('Connected to MongoDB'));
        db.on('error', (err) => console.error(err));
    }
}
