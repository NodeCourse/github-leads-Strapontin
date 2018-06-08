const octokit = require('./client');



function getStargazersForRepo(owner, repo){

  return octokit.activity.getStargazersForRepo({
    owner: owner,
    repo: repo
  })
  .then(res => {

    return res.data.map(d => {
      return d.user
    })
  })
  .catch(err => {
    
    console.log(err)
  })
}




module.exports = getStargazersForRepo;
