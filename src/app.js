require('dotenv').config()
const botgram = require('botgram')
const bot = botgram(process.env.HUE_BOT_TOKEN)
const fs = require('fs')
const path = require('path')

// Search for all the audios in the directory
let audios = []
fs.readdirSync(path.join(__dirname, 'audio'))
    .forEach(file => 
        audios.push(file.split('.mp3').join('\n')))

bot.command('start', (msg, reply) => {
    reply.text('Digite o nome do áudio que você deseja')
})

bot.command('info', (msg, reply) => {
    reply.text('Mais informações em: https://github.com/ArthurPieri/Huebot')
})

bot.command('list', (msg, reply) => {
    reply.text(`Lista de áudios disponíveis: \n${audios}`)
})

bot.command('help', (msg, reply) => {
    reply.text(`Audios para tornar suas conversas ainda melhores: \n${audios}`)
})


bot.text((msg, reply) => {
    let audi = []
    audios.forEach(audio => {
        // Clear all the audio names by removing spaces and send all to lowercase
        audi.push((audio.replace(/\s+/g, '').toLowerCase()))
    })
    if(msg.chat.type === 'user') {
        if(audi.includes(msg.text.toLowerCase().replace(/\s+/g, ''))) {
            reply.audio(fs.createReadStream(
                path.join(__dirname, 'audio', `${msg.text.toLowerCase().replace(/\s/g, '')}.mp3`)))
        } else {
            reply.text(`Audio não encontrado , tente um dos seguintes: \n${audios}`)
        }    
    }else{
        if(msg.text.toLowerCase().indexOf('@ap_huehue_bot') === 0) {
            if(audi.includes(msg.text.toLowerCase().replace('@ap_huehue_bot', '').replace(/\s/g, ''))) {
                reply.audio(fs.createReadStream(
                    path.join(__dirname, 'audio', `${msg.text.toLowerCase().replace('@ap_huehue_bot', '').replace(/\s/g, '')}.mp3`)))
            } else {
                reply.text(`Audio não encontrado , tente um dos seguintes: \n${audios}`)
            }
        }
    }
})

bot.command((msg, reply) =>
  reply.text("Comando invalido"))