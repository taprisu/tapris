import { Client } from 'eris'
import { Collection } from '@discordjs/collection'
import { readdirSync } from 'fs'
import { Command, Event, Env, Music, Gun } from '../Interfaces'
import env from './env'

class ExtendedClient extends Client {
	public commands: Collection<string, Command> = new Collection()
	public events: Collection<string, Event> = new Collection()
	public env: Env = env as unknown as Env
	public music: Music = {
		queue: {},
		connection: undefined
	}
	public gun: Gun = {
		drum: []
	}

	public async init() {
		this.connect()

		readdirSync('dist/Events')
			.filter((file) => file.endsWith('.js'))
			.forEach(async (file) => {
				const { event } = await import(`../Events/${file}`)
				this.events.set(event.name, event)
				this.on(event.name, event.run.bind(null, this))
			})
	}
}

export default ExtendedClient
