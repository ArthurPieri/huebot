const botgram = require('botgram')
const bot = botgram(process.env.BOT_TOKEN)
const fs = require('fs')
const path = require('path')

let audios = ['calma\n', 'errou\n', ' Filosofo Piton\n', ' grilo\n', ' leroy\n', ' morreu\n', 
' Nada a ver\n', ' Naruto triste\n',' rapaz\n', ' Tchau querida\n', ' Uepa\n', ' Vai dar merda\n', 
' vou te comer\n', ' wow\n']

bot.command('start', (msg, reply) => {
    reply.text('Digite o áudio que você deseja')
})

bot.command('help', (msg, reply) => {
    reply.text(`Lista de áudios disponíveis: \n${audios}`)
})

bot.text((msg, reply) => {
    let audi = []
    audios.forEach(audio => {
        audi.push((audio.split(' ').join('').split('\n').join('')))
    })
    if(audi.includes(msg.text.toLowerCase().replace(/\s/g, ''))) {
        reply.audio(fs.createReadStream(path.join(__dirname, 'audio', `${msg.text.toLowerCase().replace(/\s/g, '')}.mp3`)))
    } else {
        reply.text(`Audio não encontrado , tente um dos seguintes: \n${audios}`)
    } 

})

bot.command((msg, reply) =>
  reply.text("Comando invalido"))
