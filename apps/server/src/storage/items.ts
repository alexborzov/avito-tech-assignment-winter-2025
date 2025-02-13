import { writeFile, readFile } from 'fs/promises'
import { join } from 'node:path'
import type { TFormSchema } from '../schema/items.ts'

const filePath = join(process.cwd(), 'data.json')

const loadItems = async (): Promise<TFormSchema[]> => {
    try {
        const data: string = await readFile(filePath, 'utf8')
        return JSON.parse(data) as TFormSchema[]
    } catch (error) {
        console.error('Failed to load items:', error)
        try {
            const examplesData: string = await readFile(join(process.cwd(), 'data.json'), 'utf8')
            return JSON.parse(examplesData) as TFormSchema[]
        } catch (error) {
            console.error('Failed to load example data:', error)
            return []
        }
    }
}

const saveItems = async (items: TFormSchema[]): Promise<void> => {
    try {
        await writeFile(filePath, JSON.stringify(items, null, 2), 'utf8')
    } catch (error) {
        console.error('Failed to save items:', error)
    }
}

export { loadItems, saveItems }
