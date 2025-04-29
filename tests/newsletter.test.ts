import { expect, test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { HomePage } from '../pages/homePage';

// Test case: Sign up with a valid email and verify the success message
test('test_case_01_signing_up_user_valid', { tag: '@smoke' }, async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigate();
  const submitted = await homePage.submitFormWithEmail(faker.internet.email());
  await expect(submitted).toEqual('Thank you for signing up!');
});

// Test case: Sign up with an invalid email and verify the error message
test('test_case_02_signing_up_user_invalid_email', { tag: '@regression' }, async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigate();
  const submission = await homePage.submitFormWithInvalidEmail('test');
  await expect(submission).toEqual('Invalid email!');
});

// Test case: Submit form with an empty email and check for the error message
test('test_case_03_empty_email', { tag: '@regression' }, async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigate();
  const submission = await homePage.submitFormWithInvalidEmail('');
  await expect(submission).toEqual('Invalid email!');
});

// Test case: Validate the text of the submit button
test('test_case_04_validate_submit_button_text', { tag: '@regression' }, async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigate();
  let value = await homePage.submitButtonText();
  await expect(value).toEqual('Subscribe');
});

// Test case: Validate the background color of the submit button
test('test_case_05_validate_submit_button_color', { tag: '@regression' }, async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigate();
  const subscribeButton = page.getByRole('button', { name: 'Subscribe' });
  const backgroundColor = await subscribeButton.evaluate((element) => {
    return window.getComputedStyle(element).backgroundColor;
  });
  expect(backgroundColor).toBe('rgb(50, 230, 226)');
});

// Test case: Validate the label text of the newsletter
test('test_case_06_validate_label_newsletter', { tag: '@regression' }, async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigate();
  const text = await homePage.labelNewsLetterText();
  console.log(text);
  expect(text).toBe('Stay up to date with Netlify news');
});
