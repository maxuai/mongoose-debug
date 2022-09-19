const mongoose = require('mongoose');
const {MongoMemoryServer} = require('mongodb-memory-server')


const mySchema = new mongoose.Schema({
    select: {
        type: Map,
        of: Object,
    },
    doNotSelect: {
        type: Map,
        of: Object,
        select: false
    }
})


async function reproduce() {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri(), {dbName: "test"});

    const MyModel = mongoose.model('MyModel', mySchema)
    const myItem = new MyModel({select: {key: {some: 'value'}}, doNotSelect: {otherKey: {someOther: 'value'}}})
    await myItem.save()
    const items = await MyModel.find()
    console.log(items)

    await mongoose.disconnect();
}

reproduce().then(() =>  process.exit())

