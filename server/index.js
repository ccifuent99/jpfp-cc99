const { seed, conn } = require('../src/db');
const app = require('./app');

const start = async()=> {
    try{
        await conn.sync({force: true});
        await seed();
        const port = process.env.PORT || 3000;
        app.listen(port, () => console.log(`listening on port ${port}`));
    }
    catch(ex){
        console.log(ex);
    }
};

start();