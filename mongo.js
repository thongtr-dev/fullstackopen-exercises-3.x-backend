const mongoose = require("mongoose");

let initialEntries = [
  {
    name: "Arto Hellas",
    phone: "040-123456",
  },
  {
    name: "Ada Lovelace",
    phone: "39-44-5323523",
  },
  {
    name: "Dan Abramov",
    phone: "12-43-234345",
  },
  {
    name: "Mary Poppendieck",
    phone: "39-23-6423122",
  },
];

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://thongtrdev:${password}@clusterfullstackopen.jtgufd3.mongodb.net/phonebookApp?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);

mongoose.connect(url);

const entrySchema = new mongoose.Schema({
  name: String,
  phone: String,
});

const Entry = mongoose.model("Entry", entrySchema);

// initialEntries.forEach((entry) => {
//   new Entry(entry).save().then((result) => {
//     console.log(`added ${result.name} phone ${result.phone} to phonebook`);
//     mongoose.connection.close();
//   });
// });

Entry.find({}).then((result) => {
  console.log("phonebook:");
  result.forEach((entry) => {
    console.log(`${entry.name} ${entry.phone}`);
  });
  mongoose.connection.close();
});
