const puppeteer = require('puppeteer')
const faker = require('faker')
const url = "http://localhost:3000/"

const registeredUser = {
	email: faker.internet.email(),
	password: faker.internet.password(),
}

const newUser = {
	email: faker.internet.email(),
	password: faker.internet.password(),
}

async function register(page, ) {
	await page.evaluate(() => {
			document.querySelector("#root > div > div.MuiPaper-root.MuiPaper-elevation10.MuiPaper-rounded > div > div:nth-child(4) > button > span.MuiButton-label").click()
	})
	const email = 'input.MuiInputBase-input.MuiInput-input'
	await page.type(email, registeredUser.email)
	await page.keyboard.press('Tab')
	await page.keyboard.type(registeredUser.password)
	await page.keyboard.press('Tab')
	await page.keyboard.type(registeredUser.password)
	await page.evaluate(() => {
		document.querySelector("#root > div > div > div > div:nth-child(5) > button").click()
	})
	await page.waitForNavigation()
}

async function login(page, user) {
	const email = 'input.MuiInputBase-input.MuiInput-input'
	await page.type(email, user.email)
	await page.keyboard.press('Tab')
	await page.keyboard.type(user.password)
	await page.evaluate(() => {
		document.querySelector("#root > div > div.MuiPaper-root.MuiPaper-elevation10.MuiPaper-rounded > div > div:nth-child(5) > button").click()
	})
} 

async function checkSuccess(page) {
	await page.waitForNavigation()
	if (page.url() == 'http://localhost:3000/Success') {
		console.log('Authentication successful')
	} else {
		console.log('Authentication failed')
	}
}

async function authencationTest(page) {
	console.log('Authentication test start')
	await register(page)
	await login(page, registeredUser)
	await checkSuccess(page)
	console.log('\n')
}

async function failedAuthTest(page) {
	console.log('Failed auth start')
	await page.goto(url)
	await login(page, newUser)
	const selector = '#root > div > div.MuiSnackbar-root.MuiSnackbar-anchorOriginBottomCenter > div > div'
	try {
		await page.waitForSelector(selector, {
			timeout: 1000
		})
		console.log('successfull')
	} catch(err) {
		console.log('Wrong auth failed')
	}
}

async function run () {
		const browser = await puppeteer.launch({
			headless: true,
		})
		const page = await browser.newPage()
		await page.goto(url)
		await authencationTest(page)
		await failedAuthTest(page)
		browser.close()
	}

run()
