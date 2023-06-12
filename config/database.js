const mongoose  = require("mongoose");

mongoose.connect('mongodb+srv://mtlb:mtlb@clusters.pxiyuo5.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected!');
}).catch(() => {
    console.log('MongoDB not connected 🙂');
});