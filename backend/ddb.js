const {MongpoClient} = require('mongodb');

let dbconnection ;
let url = 'mongodb+srv://test:test1234@cluster0.dkjrhmk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

module.exports =  {
    connectToDb: (cb) => {
        MongpoClient.connect(url, (err, client) => {
            if (err) throw err;
            dbconnection = client.db('test');
            cb(dbconnection)
        })
    },
    getdb: () => dbconnection

}