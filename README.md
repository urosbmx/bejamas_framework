# Test Automation Framework

## Overview
This repository contains automated tests for the Bejamas project. The tests are written using [Playwright](https://playwright.dev/) and focus on validating the functionality, accessibility, and crawlability of the website.

## Test Descriptions

### Newsletter Tests (`newsletter.test.ts`)
- **`test_case_01_signing_up_user_valid`**: Verifies that signing up with a valid email displays a success message.
- **`test_case_02_signing_up_user_invalid_email`**: Ensures an error message is displayed when signing up with an invalid email.
- **`test_case_03_empty_email`**: Checks that submitting an empty email shows an appropriate error message.
- **`test_case_04_validate_submit_button_text`**: Validates the text of the "Subscribe" button.
- **`test_case_05_validate_submit_button_color`**: Confirms the background color of the "Subscribe" button matches the expected value.
- **`test_case_06_validate_label_newsletter`**: Validates the label text of the newsletter section.

### Sitemap and Crawlability Tests (`sitemap.test.ts`)
- **`verify_sitemap_exists`**: Ensures the sitemap.xml file is accessible.
- **`verify_sitemap_urls_accessible`**: Checks that all URLs listed in the sitemap are accessible.

## Setup Instructions

### 1. Install Dependencies
Make sure you have Node.js installed. Run the following command to install dependencies:
```bash
npm install
```

### 2. Run Tests
Use the Playwright test runner to execute the tests:
```bash
npx playwright test
```

### 3. View Test Results
After running the tests, results will be available in the terminal. For detailed debugging, check the trace files in the `/test-results` folder.

### 4. Generate Trace Viewer
To view the trace for a failed test:
```bash
npx playwright show-trace test-results/newsletter-test-case-01-signing-up-user-valid/trace.zip
```

## Key Dependencies
- [Playwright](https://playwright.dev/): For browser automation and testing.
- [Faker.js](https://fakerjs.dev/): For generating random test data.
- [xml2js](https://www.npmjs.com/package/xml2js): For parsing XML content in sitemap tests.

## Best Practices
- Ensure the website is accessible before running the tests.
- Use the `@smoke` tag for quick validation of critical functionality.
- Use the `@regression` tag for comprehensive testing during major releases.

## Contributing
1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your message here"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a pull request.

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.