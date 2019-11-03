import { nextAppFactory } from './server'

const PORT = process.env.PORT || 3000

const run = async () => {
  try {
    const server = await nextAppFactory()
    server.listen(PORT, () => {
      console.log(`> Ready on http://localhost:${PORT}`)
    })
  } catch (err) {
    console.error(err)
  }
}

run()
