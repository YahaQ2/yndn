import express from 'express'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import { swaggerDocument } from './swagger.js'
import commentsRouter from './routes/comments.routes.js'

const app = express()

app.use(cors())
app.use(express.json())

// Serve Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.get('/api-docs/swagger.json', (req, res) => {
  res.json(swaggerDocument)
})

// Serve static Swagger HTML
app.get('/', (req, res) => {
  res.sendFile('swagger.html', { root: '.' })
})

// API routes
app.use('/api', commentsRouter)

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

