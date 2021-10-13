const notFound = () => (req, res) => {
  res.status(404).send('')
}

module.exports = { notFound }