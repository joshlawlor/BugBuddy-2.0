const showAll = (req,res) => {
    console.log('Show ALL RAN')
    res.json({
        'posts': 'hi'
    })
}

module.exports = {
    showAll
}