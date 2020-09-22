const Parser = require('rss-parser');
const db = require('./services/db');
const Article = require('./services/article');
var Bluebird = require("bluebird");
const parser = new Parser();
const CronJob = require('cron').CronJob;
 
//Lấy link rss trang web 
const VNEXPRESS_RSS = 'https://vnexpress.net/rss/tin-moi-nhat.rss';
const TUOITRE_RSS = 'https://tuoitre.vn/rss/tin-moi-nhat.rss';
const THANHNIEN_RSS = 'https://thanhnien.vn/rss/home.rss';
const RSS = [VNEXPRESS_RSS,TUOITRE_RSS,THANHNIEN_RSS];

const job = new CronJob('0 */30 * * * *',function() { //Chạy sau mỗi 30p
    db.sync().then(async function(){
        await Bluebird.each(RSS ,async function(rss){
    
            const feed = await parser.parseURL(rss);
            await Bluebird.each(feed.items , async function(item){
                if(!item.link){
                    return;
                }
                const find = await Article.findOne({
                    where: {
                        link: item.link,
                    }
                });
                if(!find) {
                    if(feed.title == 'Tin mới nhất - VnExpress RSS')
                    {
                        await Article.create({
                            link: item.link,
                            title: item.title,
                            content: item.contentSnippet,
                            pubDate: item.pubDate,
                            source: 'VnExpress'
                        })
                    }
                    if(feed.title == 'Tuổi Trẻ Online - Tin mới nhất - RSS Feed')
                    {
                                    await Article.create({
                                        link: item.link,
                                        title: item.title,
                                        content: item.contentSnippet,
                                        pubDate: item.pubDate,
                                        source: 'TuoiTre'
                                    })
    
                    }
                    if(feed.title == 'Thanh Niên')
                    {
                                    await Article.create({
                                        link: item.link,
                                        title: item.title,
                                        content: item.contentSnippet,
                                        pubDate: item.pubDate,
                                        source: 'ThanhNien'
                                    })
    
                    }
                }
            });
        })
    }).catch(console.error);

})
job.start();

module.exports = Article;