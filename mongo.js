const mongoose = require('mongoose');

if (process.argv.length < 3) {
	console.log('give password as argument');
	process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://fullstack:${password}@cluster0.jkdhc.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set('strictQuery', false);

mongoose.connect(url);

const noteSchema = new mongoose.Schema({
	content: String,
	important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

// const note = new Note({
// 	content: 'HTML is easy',
// 	important: true
// })

// const note1 = new Note({
// 	content: "CSS is hard",
// 	important: true
// });

// const note2 = new Note({
// 	content: "Mongoose makes things easy",
// 	important: true
// })


// note1.save().then(result => {
// 	console.log("Note1 was save");
// })

// note2.save().then(result => {
// 	console.log("Note2 was saved");
// 	mongoose.connection.close()
// })



Note.find({content: "CSS is hard"}).then(result => {
	result.forEach(note => {
		console.log(note)
	})
	mongoose.connection.close()
})


// note.save().then(result => {
// 	console.log('note saved!', result);
// 	mongoose.connection.close();
// })
