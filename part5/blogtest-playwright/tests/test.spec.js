const { test } = require('@playwright/test')

var passed = 0

test('send 20000 request', async ({ request}) => {
  for(let i = 0; i <= 2; i++){
    var response = await request.get('https://react-redux.js.org/')
    (response.status() === 200 && passed++)
  }
    console.log(passed)
})