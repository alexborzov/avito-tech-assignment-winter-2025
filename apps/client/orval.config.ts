import { defineConfig } from 'orval'

export default defineConfig({
    petstore: {
        input: 'http://localhost:3000/documentation/json',
        output: {
            mode: 'split',
            target: 'app/shared/api',
            baseUrl: 'http://localhost:3000',
            client: 'react-query',
        },
        hooks: {
            afterAllFilesWrite: 'biome format --write',
        },
    },
})
