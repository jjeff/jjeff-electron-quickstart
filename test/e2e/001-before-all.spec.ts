import test, { expect } from '@playwright/test'
import { getAppInfo } from './appInfo'

import { _electron as electron } from 'playwright'
import { getApp, setApp } from './app'

test.beforeAll(async () => {
  const appInfo = getAppInfo()
  console.log('App Info', appInfo)
  await test.step('Launch Electron App', async () => {
    // Launch Electron app
    const launchPromise = electron.launch({
      executablePath: appInfo.executable,
    })
    await expect(launchPromise, 'App did not launch').resolves.toBeTruthy()
    const app = await launchPromise
    // Set app for other tests to use
    setApp(app)
  })
})

test('Wait for the first window', async () => {
  const app = getApp()
  const readyPromise = app.firstWindow()
  await expect(readyPromise, 'App did not become ready').resolves.toBeTruthy()
})
