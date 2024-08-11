var fs = require("fs");

// fs.writeFile("msg.txt", "using nodejs for message.", (err) => {
//   if (err) throw err;
//   console.log("file has been saved.");
// });
fs.readFile("msg.txt", "utf-8", (err, data) => {
  if (err) throw err;
  console.log(data);
});
