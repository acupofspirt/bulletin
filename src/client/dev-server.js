const app = require('express')(),
	staticServer = require('serve-static'),
	path = require('path')

app.use(staticServer(
	path.resolve(__dirname),
	{ index: false })
)

app.get('*', (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.sendFile(path.resolve(__dirname, 'index.html'))
})

app.listen(1488)
	.on('listening', () => console.log('# Development server started.'))	
	.on('connection', sock => sock.setNoDelay(true))