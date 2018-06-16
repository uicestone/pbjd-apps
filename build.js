const fs = require("fs")
const path = require("path")

let staticPath = {
  talk: "./static/talk",
  movie: "./static/movie"
}

let output = {
  talk: {},
  movie: {}
}

for (let [key, val] of Object.entries(staticPath)) {
  let files = fs.readdirSync(val)
  files.forEach(file => {
    
    if (file.match(/^\./)) {
      return;
    }

    const filename = path.basename(file, path.extname(file))


    output[key][filename] = {
      label: filename,
      url: `${val}/${file}`

    }

  })
}

console.log(output)
fs.writeFileSync("src/renderer/static-gen.js", `export default ${JSON.stringify(output)}`)