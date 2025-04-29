import { Page, request } from '@playwright/test';
import { faker, th } from '@faker-js/faker';


export class HomePage {
  private emailInput;
  private submitButton;
  private signingUp;
  private label;

  constructor(private page: Page) {
    this.emailInput = page.locator('#email-52611e5e-cc55-4960-bf4a-a2adb36291f6_52611e5e-cc55-4960-bf4a-a2adb36291f6-0');
    this.submitButton = page.getByRole('button', { name: 'Subscribe' });
    this.signingUp = page.locator('#main > section > div > h1')
    this.label = page.locator("body > footer > section > h2")

    
  }

  async navigate() {
    await this.page.goto('https://www.netlify.com/');
  }

  async submitFormWithEmail(email: string){
    await this.emailInput.fill(email);
    await this.submitButton.click();
    return await this.signingUp.textContent();
    
  }

  async submitFormWithInvalidEmail(email: string){
    await this.emailInput.fill(email);
    await this.submitButton.click(); 
    return await this.page.locator('.error-message').textContent();
  }

  async submitButtonText() {
    const actualText = await this.submitButton.getAttribute('value');
    return actualText;
}

async labelNewsLetterText(){
  const labelText = await this.label.textContent();
  return labelText

}

  
}
