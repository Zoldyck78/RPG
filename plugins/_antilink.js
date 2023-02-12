const linkRegex = /chat.whatsapp.com\/(?:invite\/)?([0-9A-Za-z]{20,24})/i
export async function before(m, { isAdmin, isBotAdmin }) {
    if (m.isBaileys && m.fromMe)
        return !0
    if (!m.isGroup) return !1
    let chat = global.db.data.chats[m.chat]
    let bot = global.db.data.settings[this.user.jid] || {}
    const isGroupLink = linkRegex.exec(m.text)

    if (chat.antiLink && isGroupLink && !isAdmin) {
        if (isBotAdmin) {
            const linkThisGroup = `https://chat.whatsapp.com/${await this.groupInviteCode(m.chat)}`
            if (m.text.includes(linkThisGroup)) return !0
        }
        await conn.sendButton(m.chat, `𝘿𝙞𝙡𝙖𝙧𝙖𝙣𝙜 𝙉𝙜𝙞𝙧𝙞𝙢 𝙇𝙞𝙣𝙠 𝘿𝙞𝙨𝙞𝙣𝙞 𝙔𝙖...${isBotAdmin ? '' : '\n\n_❬Bot Bukan Admin❭_'}`, m)
        if (isBotAdmin && bot.restrict) {
            await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
        } else if (!bot.restrict) return m.reply('Owner disable auto kick!')
    }
    return !0
}
