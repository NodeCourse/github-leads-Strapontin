const program = require('commander');
const flatten = require('flatten-array');
const client = require('./client');
const getTrendingRepos = require('./getTrendingRepos');
const getStargazersForRepo = require('./getStargazersForRepo');
const flattenArray = require('flatten-array')
const fs = require('fs')
const json2csv = require('json2csv')
const Json2csvParser = require('json2csv').Parser;
const fields = ['login', 'url'];
const opts = { fields };



function toList(str){
	return str.split(',');
}


program
	.version('0.1.0')
	.option('-t, --token [token]', 'Github token')
	.parse(process.argv);



if (program.token) {
	client.authenticate({
		type: 'token',
		token: program.token
	})
}



getTrendingRepos("language:javascript created:>2018-06-06 stars:>10")
.then(repos => {

	return Promise.all(repos.map(repo => {

		return getStargazersForRepo(repo.owner.login, repo.name)
		.then(stargazers => {

			const stargazersArray = flattenArray(stargazers)

			return stargazersArray.map(stargazer => {
				return { login:stargazer.login, url: stargazer.html_url}
			})
		})
	}))
})
.then(repo => {
	return flattenArray(repo)
})
.then(userData => {
	fs.unlink('./userData.csv', (err) => {

		try {
		  const parser = new Json2csvParser(opts);
		  const csv = parser.parse(userData);

			fs.writeFile('./userData.csv', csv, err => {

			})

		} catch (err) {
		  console.error(err);
		}
	});
})
