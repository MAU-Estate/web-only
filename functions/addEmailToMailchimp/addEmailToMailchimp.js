// const Mailchimp = require('mailchimp-api-v3')
// const mailchimp = new Mailchimp(process.env.MAILCHIMP_API_KEY)
const axios = require('axios')
const mailchimpAudienceKey = '9e7d7c93bc'

const mailChimpAPI = process.env.MAILCHIMP_API_KEY

exports.handler = async (event, context) => {
  const data = {
    email_address: event.body,
    status: 'subscribed',
  }

  const subscriber = JSON.stringify(data)

  return axios({
    url: `https://us2.api.mailchimp.com/3.0/lists/${mailchimpAudienceKey}/members/`,
    method: 'post',
    data: subscriber,
    auth: {
      username: 'apikey', // any value will work
      password: mailChimpAPI,
    },
  })
    .then(function (response) {
      console.log(`status:${response.status}`)
      console.log(`data:${response.data}`)
      console.log(`headers:${response.headers}`)

      return {
        statusCode: 200,
        body: JSON.stringify({ emailAdded: true }),
      }
    })
    .catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data)
        console.log(error.response.status)
        console.log(error.response.headers)
        return {
          statusCode: error.response.status,
          body: JSON.stringify(error.response.data),
        }
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request)
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message)
      }
      console.log(error.config)
    })
}
