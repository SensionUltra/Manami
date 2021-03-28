module.exports = {
name: "8ball",
description: "",
run: (client, message, args) => {
    const question = args.join(' ')
    if (!question) return message.channel.send('i cannot predict something from nothing')
    const answers = [
        'It is certain',
        'Without a doubt',
        'You may rely on it',
        'My sources say no',
        'It is decidedly so',
        'Reply hazy try again',
        'As I see it, yes',
        'Most likely',
        'Yes',
        'Don’t count on it',
        'Ask again later',
        'Outlook good',
        'Concentrate and ask again',
        'Yes definitely',
        'Better not tell you now',
        'Signs point to yes',
        'Cannot predict now',
        'Very doubtful',
        'Outlook not so good',
        'My reply is no'
    ]
    let answer = answers[Math.floor(Math.random() * answers.length)];

    message.channel.send(answer)
}
}