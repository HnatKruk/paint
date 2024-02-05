const fs = require('fs')
const path = require('path')

class ImageController {
  async writeImage(req, res) {
    try {
      const data = req.body.img.replace('data:image/png;base64,', '')
      fs.writeFileSync(path.resolve(__dirname, 'files', `${req.query.id}.jpg`), data, 'base64')
      return res.status(200).json({ message: 'Downloaded' })
    } catch (err) {
      console.log(err)
      return res.sendStatus(500).json(`Error: ${err}`)
    }
  }

  async getImage(req, res) {
    try {
      const filePath = path.resolve(__dirname, 'files', `${req.query.id}.jpg`)
      if (fs.existsSync(filePath)) {
        const file = fs.readFileSync(filePath)
        const data = 'data:image/png;base64,' + file.toString('base64')
        res.json(data)
      } else {
        res.status(404).json({ message: 'File not found' })
      }
    } catch (err) {
      console.log(err)
      return res.sendStatus(500).json(`Error: ${err}`)
    }
  }
}

module.exports = new ImageController()