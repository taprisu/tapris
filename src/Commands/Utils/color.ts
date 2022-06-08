import { Command } from '../../Interfaces'
import { ColorResolvable, Attachment, EmbedBuilder } from 'discord.js'
import { createCanvas } from 'canvas'

export const command: Command = {
	name: 'color',
	description: 'Shows color or generates color',
	options: [
		{
			name: 'color',
			description: 'Color to be shown',
			type: 3,
			required: false
		}
	],
	run: async (client, interaction) => {
		let colorString: string = interaction.options['color']

		if (!colorString) {
			const hexCharset = 'ABCDEF0123456789'

			colorString = '#'

			for (let i = 0, n = hexCharset.length; i < 6; ++i) {
				colorString += hexCharset.charAt(Math.floor(Math.random() * n))
			}
		}

		const canvas = createCanvas(500, 500)
		const ctx = canvas.getContext('2d')

		ctx.fillStyle = colorString
		ctx.fillRect(0, 0, canvas.width, canvas.height)
		ctx.font = '50px JetBrains Mono'
		ctx.fillStyle = '#ffffff'
		ctx.textAlign = 'center'
		ctx.fillText(colorString, 250, 200)
		ctx.font = '50px JetBrains Mono'
		ctx.fillStyle = '#000000'
		ctx.textAlign = 'center'
		ctx.fillText(colorString, 250, 350)

		const attachment: Attachment = new Attachment(
			canvas.toBuffer(),
			'ColorHexSend.png'
		)

		const Embed = new EmbedBuilder()
			.setTitle(colorString)
			.setImage('attachment://ColorHexSend.png')

		try {
			Embed.setColor(colorString as ColorResolvable)
		} catch {
			Embed.setColor(client.env.BOT_COLOR)
		}

		return interaction.reply({ embeds: [Embed], files: [attachment] })
	}
}
