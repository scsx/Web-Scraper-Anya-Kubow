const PORT = 8000
const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')

const app = express()
const url = 'https://www.theguardian.com/'

axios(url)
    .then((response) => {
        const html = response.data
        const $ = cheerio.load(html)
        const articles = []

        $('.fc-item__title', html).each(function () {
            const title = $(this).text()
            const newsUrl = $(this).find('a').attr('href')
            articles.push({
                title,
                newsUrl
            })
        })
        console.log(articles)
    })
    .catch((err) => console.log(err))

app.listen(PORT, () => console.log('Server running on port 8000'))
