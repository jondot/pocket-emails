
import consola from 'consola'
import fs from 'fs-extra'
import path from 'path'

export default () => {
    const configPath = path.join(process.cwd(), "config.json")
    if (!fs.existsSync(configPath)) {
        consola.error('No configuration file "config.json" found.')
        process.exit(1)
    }

    const config = require(configPath)
    return config
}