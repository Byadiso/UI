
import mongoose from 'mongoose';


mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://localhost:27017/User',{ useNewUrlParser: true ,  useUnifiedTopology: true,  })
var db = mongoose.connection
db.on('error', console.log.bind(console, 'connection error'))
db.once('open', function (callback) {
    console.log('connection succeeded')
})


export default db;

