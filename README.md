# Playwright Automation Project

This is an automation project using [Playwright](https://playwright.dev/) for end-to-end testing.

## Prerequisites

Before setting up the project, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (Recommended: LTS version)
- [Git](https://git-scm.com/)
- [IntelliJ IDEA](https://www.jetbrains.com/idea/) (optional but recommended)

## Setup Instructions

1. **Clone the repository**
   ```sh
   git clone https://github.com/viktorbarinov/mate-academy.git
   cd mate-academy

2. **Install dependencies**
   ```sh
   npm install

3. **Install Playwright browsers**
   ```sh
   npx playwright install

## Running Tests

1. **Run all tests**
   ```sh
   npx playwright test

2. **Run tests in headed mode (with UI)**
   ```sh
   npx playwright test --headed

3. **Run tests in a specific browser**
   ```sh
   npx playwright test --browser=chromium

4. **Run a specific test file**
   ```sh
   npx playwright test tests/signIn.spec.js

## Debugging Tests

Use the Playwright inspector for debugging:

   ```sh
   npx playwright test --debug