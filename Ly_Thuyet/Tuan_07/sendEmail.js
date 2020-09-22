const user = require("./services/user");
const Article = require("./services/article");
const Email = require("./services/email");
const ejs = require("ejs");

const CronJob = require('cron').CronJob;
const job = new CronJob('0 22 * * *', function() { //vào 22h tối hằng ngày 
	const start = async function() {
		const findAllUser = await user.findAllUser();
		const display = await Article.findall();
		const data = await ejs.renderFile(__dirname + "/index.ejs", { display });
		for (let i = 0; i < findAllUser.length; i++) {
			await Email.SendEmail( findAllUser[i].dataValues.email,"Thông tin mới nhất covid 19 ngày hôm nay",null,data);
			console.log(findAllUser[i].dataValues.email);
		}
	}
	start();
	const d = new Date();
	console.log('Every second:', d);
});
job.start();
