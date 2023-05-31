const Parser = require('rss-parser');
const parser = new Parser();
const notifyschema = require('../Schemas.js/notifySchema');

module.exports = (client) =>{
    client.checkUpdates = async () =>{
        let setups = await notifyschema.find()
        if(!setups) return;
        if (setups.length > 1)
        {
            await Promise.all(setups.map(async data =>
                {
                    setTimeout(async () =>
                    {
                        try{
                            let videodata = await parser.parseURL(`https://www.youtube.com/feeds/videos.xml?channel_id=${data.ID}`)
                            if(!videodata) return;

                            let guild = await client.guilds.cache.get(`${data.Guild}`)
                            if(!guild) return;

                            let channel = await guild.channels.cache.get(`${data.Channel}`)
                            if(!channel) return;

                            let {link, author, title, id} = videodata.items[0];
                            if (data.Latest.includes(id)) return;
                            else
                            {
                                await notifyschema.updateOne({Guild: data.Guild, Id: data.ID}, {$push: {Latest: id}});
                            }

                            let pingrole = data.PingRole;
                            if(pingrole)
                            {
                                if(pingrole === data.Guild) pingrole = '@everyone';
                                else pingrole = `@&${data.PingRole}>`
                            }
                            else
                            {
                                pingrole = 'non';
                            }

                            if(data.Message)
                            {
                                if (pingrole !== 'non')
                                {
                                    await channel.send({content: `${pingrole} \n\n ${data/Message.replace('{author}', author).replace('{title}', title).replace}`})
                                }
                            }

                        }
                    })
                }))
        }
    }
}