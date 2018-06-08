const octokit = require('./client');



function getTrendingRepos(query){
  return octokit.search.repos({
    q: query
  })
  .then(res => {
    // console.log(res)
    return res.data.items
  })
  .catch(err => {
    console.log(err)
  })
}




module.exports = getTrendingRepos;
