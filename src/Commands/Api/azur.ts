import { Command } from '../../Interfaces'
import { MessageEmbed } from 'discord.js'
import axios from 'axios'

export const command: Command = {
	name: 'azur',
	description: 'Get data about Azur Lane',
	aliases: ['name'],
	run: async (client, message, args) => {
		try {
			let response
			let request = args.join('_').toLowerCase()

			try {
				response = await (
					await axios.get(
						`https://raw.githubusercontent.com/alg-wiki/wikia/master/Ships/${request}.json`
					)
				).data
			} catch {
				message.channel.send('Error :no_entry_sign:')
			}

			const Embed = new MessageEmbed()
				.setColor(client.config.botColor)
				.setTitle(response.name)
				.setURL(`https://azurlane.koumakan.jp/${request}`)
				.setDescription(response.rarity)
				.addFields(
					{ name: 'ID', value: response.ID, inline: true },
					{ name: 'Hull', value: response.hull, inline: true },
					{ name: 'Navy', value: response.navy, inline: true },
					{ name: 'Class', value: response.class, inline: true },
					{ name: 'Voice acting', value: response.voiceActress, inline: true }
				)

			return message.channel.send({ embeds: [Embed] })
		} catch {
			return message.channel.send('Error :no_entry_sign:')
		}
	}
}
