const { test, expect, beforeEach, describe } = require('@playwright/test')



describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http:localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.locator('#username')).toBeVisible()
    await expect(page.locator('#password')).toBeVisible()
    await expect(page.getByText('login')).toBeVisible()
  })
  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.locator('#username').fill('mluukkai')
      await page.locator('#password').fill('salainen')
      await page.getByText('login').click()
      await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.locator('#username').fill('mluukkaisedgb')
      await page.locator('#password').fill('salainenzthb')
      await page.getByText('login').click()
      await expect(page.getByText('Invalid username or password')).toBeVisible()
      const loctr = page.locator('.notification-container')
      const color = await loctr.evaluate((element) => window.getComputedStyle(element).getPropertyValue('color'))
      await expect(loctr).toHaveCSS('color', color)
    })
  })
  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await page.locator('#username').fill('mluukkai')
      await page.locator('#password').fill('salainen')
      await page.getByRole('button', {'name' : 'login'}).click()
    })
  
    test('a new blog can be created', async ({ page }) => {

      const blogName = 'My First Blog'
      const userName = 'Matti Luukkainen'
      await page.getByRole('button', { 'name' : 'new blog'}).click()
      await page.locator('#title').fill('My First Blog')
      await page.locator('#author').fill('Matti Luukkainen')
      await page.locator('#url').fill('http://localhost:6578')
      await page.locator('#likes').fill('25')
      
      await page.getByRole('button', {'name' : 'create'}).click()
      await expect(page.getByText(`${userName} logged in`)).toBeVisible()
      await expect(page.getByText(`a new blog ${blogName} by ${userName} added`)).toBeVisible()
      await page.waitForTimeout(5000)
      await expect(page.getByText(`a new blog ${blogName} by ${userName} added`)).not.toBeVisible()
    })
    test('a blog can be edited', async ({ page }) => {
      const blogName = 'My First Blog'
      const userName = 'Matti Luukkainen'
      await page.getByRole('button', { 'name' : 'new blog'}).click()
      await page.locator('#title').fill(blogName)
      await page.locator('#author').fill(userName)
      await page.locator('#url').fill('http://localhost:6578')
      await page.locator('#likes').fill('25')
      await page.getByRole('button', {'name' : 'create'}).click()

      await expect(page.getByText(`${userName} logged in`)).toBeVisible()
      await expect(page.getByText('My First Blog').last()).toBeVisible()
      await page.getByText('view').click()
      await page.waitForTimeout(500)
      await expect(page.getByRole('button', { name: 'like' })).toBeVisible()

      var likesBefore = await page.locator('.likes').allTextContents()
      const likebtn = await page.locator('.linkbtn').all()
      await likebtn[0].click()
      await page.waitForTimeout(500)
      var likesAfter = await page.locator('.likes').allTextContents()
      expect(Number(likesAfter[0])).toEqual(Number(likesBefore[0]) + 1)
    })
  })
  describe('delete a blog',  () => {
    const blogName = 'My First Blog'
      const userName = 'Matti Luukkainen'
    beforeEach(async ({page}) => {
      await page.locator('#username').fill('mluukkai')
      await page.locator('#password').fill('salainen')
      await page.getByText('login').click()
      await page.getByRole('button', { 'name' : 'new blog'}).click()
      await page.locator('#title').fill(blogName)
      await page.locator('#author').fill(userName)
      await page.locator('#url').fill('http://localhost:6578')
      await page.locator('#likes').fill('25')
      await page.getByRole('button', {'name' : 'create'}).click()
    })
    test(`user deletes it's own blog only`, async ({page}) => {
      await page.getByRole('button', { name: 'view' }).click()
      page.on('dialog', async dialog => {
        expect(dialog.message()).toEqual(`Remove ${blogName} by ${userName}`)
        expect(dialog.type()).toContain('confirm')
        await dialog.accept()
      });
      await page.getByRole('button', { name: 'remove' }).click()
    })
  })
  describe('orders of blog by likes', () => {
    const blogName = 'My First Blog'
      const userName = 'Matti Luukkainen'
    beforeEach(async ({page}) => {

      await page.locator('#username').fill('mluukkai')
      await page.locator('#password').fill('salainen')
      await page.getByText('login').click()
      await page.getByRole('button', { 'name' : 'new blog'}).click()
      await page.locator('#title').fill(blogName)
      await page.locator('#author').fill(userName)
      await page.locator('#url').fill('http://localhost:6578')
      await page.locator('#likes').fill('25')
      await page.getByRole('button', {'name' : 'create'}).click()
      
      await page.getByRole('button', { 'name' : 'new blog'}).click()
      await page.locator('#title').fill('blogName')
      await page.locator('#author').fill('userName')
      await page.locator('#url').fill('http://localhost:6578')
      await page.locator('#likes').fill('27')
      await page.getByRole('button', {'name' : 'create'}).click()
      await page.reload()
    })
    test('blogs in descending order by no of likes', async ({page}) => {  
      var likeString = await page.locator('.likes').allTextContents()
      const likes = likeString.map((num) => Number(num) )
      const max = Math.max.apply(null, likes)
      const firstindex = likes.findIndex((m) => m === max )
      expect(firstindex).toEqual(0)
    })
  })
})