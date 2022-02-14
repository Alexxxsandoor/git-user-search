const container = document.querySelector(".container__info-output")
const userAvatar = document.querySelector(".info-output__avatar")
const userName = document.querySelector(".name")
const userLogin = document.querySelector(".login")
const userFollowers = document.querySelector(".followers")
const userRepositories = document.querySelector(".repositories")
const followersRepositoriesList = document.querySelector(".container__followers-repositories")
const searchUserInput = document.querySelector(".search__user")



function createGitUser(url, type) {
	fetch(url, {
		method: 'GET'
	}).then(e => {

		return e.json()
	}).then(result => {


		if (type === "name") {
			userName.innerHTML = result.name || "(no name)"
			userName.setAttribute("href", result.html_url)
			userAvatar.setAttribute("src", result.avatar_url || "http://hypeava.ru/uploads/posts/2019-12/1577006194_1.jpg")
			userLogin.innerHTML = `Login: ${result.login || "(no login)"}`
			userFollowers.innerHTML = `Followers: ${result.followers || "(no followers)"}`
			userRepositories.innerHTML = `Repositories: ${result.public_repos || "(no repositories)"}`

		}
		else if (type === "followers") {
			const followersList = document.querySelector(".followers-list")
			followersList.remove()

			const newFollowersList = document.createElement("div")
			newFollowersList.className = "followers-list"
			newFollowersList.innerHTML = `<h2>Followers(${result.length}):</h2>`
			followersRepositoriesList.append(newFollowersList)

			for (let i = 0; i < result.length; i++) {
				const list = document.createElement('a')
				list.setAttribute("href", result[i].html_url)
				list.innerHTML = result[i].login + "<br>"
				newFollowersList.append(list)
			}
		}
		else if (type === "repositories") {
			const repositoriesList = document.querySelector(".repositories-list")
			repositoriesList.remove()
			const newRepositoriesList = document.createElement("div")
			newRepositoriesList.className = "repositories-list"
			newRepositoriesList.innerHTML = `<h2>Repositories(${result.length}):</h2>`
			followersRepositoriesList.append(newRepositoriesList)
			for (let i = 0; i < result.length; i++) {
				const list = document.createElement('a')
				list.setAttribute("href", result[i].html_url)
				list.innerHTML = result[i].name
				newRepositoriesList.append(list)
			}
		}
	})
}

function search() {
	const searchUser = document.querySelector(".search__user").value
	const urlUser = `https://api.github.com/users/${searchUser}`
	const urlFollowers = urlUser + '/followers';
	const urlRepos = urlUser + '/repos';

	createGitUser(urlUser, "name")
	createGitUser(urlFollowers, "followers")
	createGitUser(urlRepos, "repositories")
}

function debounce(func, wait) {
	let timeout;
	return function executedFunction(...args) {
		const later = () => {
			clearTimeout(timeout);
			func(...args);
		};
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
	};
}

let debounced = debounce(search, 1000);
searchUserInput.addEventListener("input", debounced);
