#!/usr/bin/env node

/**
 * VAST Shopify Theme Setup Wizard
 * Interactive setup script to configure the development environment
 */

const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Bootstrap: Check and install required packages
async function bootstrap() {
  const requiredPackages = ['chalk', 'inquirer', 'ora'];
  const missingPackages = [];

  for (const pkg of requiredPackages) {
    try {
      require.resolve(pkg);
    } catch {
      missingPackages.push(pkg);
    }
  }

  if (missingPackages.length > 0) {
    console.log('\n📦 Installing setup wizard dependencies...');
    try {
      execSync(`npm install ${missingPackages.join(' ')} --no-save --legacy-peer-deps`, {
        stdio: 'inherit',
        cwd: path.join(__dirname, '..')
      });
      console.log('✓ Dependencies installed\n');
    } catch (error) {
      console.error('Failed to install dependencies. Falling back to basic mode.');
      return false;
    }
  }

  return true;
}

// Fallback prompts using built-in readline
async function fallbackPrompt(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

// Main setup function with fancy UI
async function setupWithUI() {
  const chalk = require('chalk');
  const inquirer = require('inquirer');
  const ora = require('ora');

  // Welcome message
  console.log('\n' + chalk.cyan.bold('🚀 VAST Shopify Theme Setup Wizard'));
  console.log(chalk.gray('Let\'s get your development environment ready!\n'));

  // Step 1: Get store name
  const { storeName } = await inquirer.prompt([
    {
      type: 'input',
      name: 'storeName',
      message: 'What\'s your Shopify store name?',
      suffix: chalk.gray(' (e.g., my-store from my-store.myshopify.com)'),
      validate: (input) => {
        if (!input) return 'Store name is required';
        if (!/^[a-zA-Z0-9-]+$/.test(input)) return 'Store name can only contain letters, numbers, and hyphens';
        return true;
      }
    }
  ]);

  // Step 2: Fetch themes from Shopify
  const spinner = ora('Fetching themes from Shopify...').start();
  let themes = [];
  let themeListError = null;

  try {
    const output = execSync(`shopify theme list --store=${storeName} --output=json`, {
      encoding: 'utf-8',
      cwd: path.join(__dirname, '..')
    });

    const data = JSON.parse(output);
    themes = data.themes || [];
    spinner.succeed(chalk.green('Themes fetched successfully'));
  } catch (error) {
    spinner.fail(chalk.red('Failed to fetch themes'));
    themeListError = error;

    // Check for common errors
    if (error.message.includes('not found') || error.message.includes('command not found')) {
      console.log(chalk.yellow('\n⚠️  Shopify CLI is not installed.'));
      console.log(chalk.gray('Install it with: npm install -g @shopify/cli@latest\n'));
    } else if (error.message.includes('auth') || error.message.includes('login')) {
      console.log(chalk.yellow('\n⚠️  You need to authenticate with Shopify.'));
      console.log(chalk.gray('Run: shopify auth login\n'));
    }
  }

  // Step 3: Select theme
  let themeId;
  let themeName;

  if (themes.length > 0) {
    // Find development themes and mark them as recommended
    const developmentThemes = themes.filter(t => t.role === 'development');
    const otherThemes = themes.filter(t => t.role !== 'development');

    // Build choices array
    const choices = [];

    if (developmentThemes.length > 0) {
      developmentThemes.forEach(theme => {
        choices.push({
          name: chalk.green(`${theme.name} (ID: ${theme.id})`) + chalk.cyan(' [RECOMMENDED]'),
          value: { id: theme.id, name: theme.name }
        });
      });
    }

    otherThemes.forEach(theme => {
      const roleLabel = theme.role === 'main' ? '[LIVE]' : '[UNPUBLISHED]';
      choices.push({
        name: `${theme.name} (ID: ${theme.id}) ${chalk.gray(roleLabel)}`,
        value: { id: theme.id, name: theme.name }
      });
    });

    choices.push(new inquirer.Separator());
    choices.push({
      name: 'Enter theme ID manually',
      value: 'manual'
    });

    const { selectedTheme } = await inquirer.prompt([
      {
        type: 'list',
        name: 'selectedTheme',
        message: 'Select a theme for development:',
        choices: choices,
        pageSize: 10
      }
    ]);

    if (selectedTheme === 'manual') {
      const { manualId } = await inquirer.prompt([
        {
          type: 'input',
          name: 'manualId',
          message: 'Enter theme ID:',
          validate: (input) => {
            if (!input || isNaN(input)) return 'Please enter a valid theme ID';
            return true;
          }
        }
      ]);
      themeId = manualId;
      themeName = 'Custom Theme';
    } else {
      themeId = selectedTheme.id;
      themeName = selectedTheme.name;
    }
  } else {
    // Fallback to manual entry
    console.log(chalk.yellow('\n⚠️  No themes found. You\'ll need to enter a theme ID manually.'));
    console.log(chalk.gray('Find theme IDs in Shopify Admin → Online Store → Themes (check the URL)\n'));

    const { manualId } = await inquirer.prompt([
      {
        type: 'input',
        name: 'manualId',
        message: 'Enter theme ID:',
        validate: (input) => {
          if (!input || isNaN(input)) return 'Please enter a valid theme ID';
          return true;
        }
      }
    ]);
    themeId = manualId;
    themeName = 'Custom Theme';
  }

  // Step 4: Confirmation
  console.log('\n' + chalk.bold('Configuration Summary:'));
  console.log(chalk.gray('─'.repeat(50)));
  console.log(`Store:  ${chalk.cyan(storeName)}.myshopify.com`);
  console.log(`Theme:  ${chalk.cyan(themeName)} ${chalk.gray(`(ID: ${themeId})`)}`);
  console.log(chalk.gray('─'.repeat(50)) + '\n');

  const { confirm } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirm',
      message: 'Does this look correct?',
      default: true
    }
  ]);

  if (!confirm) {
    console.log(chalk.yellow('\n❌ Setup cancelled. Run npm run setup to try again.\n'));
    process.exit(0);
  }

  // Step 5: Check if shopify.theme.toml already exists
  const tomlPath = path.join(__dirname, '..', 'shopify.theme.toml');
  if (fs.existsSync(tomlPath)) {
    const { overwrite } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'overwrite',
        message: chalk.yellow('shopify.theme.toml already exists. Overwrite?'),
        default: false
      }
    ]);

    if (!overwrite) {
      console.log(chalk.yellow('\n❌ Setup cancelled to preserve existing configuration.\n'));
      process.exit(0);
    }
  }

  // Step 6: Generate shopify.theme.toml
  const tomlContent = `[environments.development]
store = "${storeName}"
theme = "${themeId}"
`;

  try {
    fs.writeFileSync(tomlPath, tomlContent, 'utf-8');
    console.log(chalk.green('\n✓ Created shopify.theme.toml'));
  } catch (error) {
    console.error(chalk.red('\n✗ Failed to create shopify.theme.toml:'), error.message);
    process.exit(1);
  }

  // Step 7: Install dependencies
  console.log('\n' + chalk.bold('Installing dependencies...'));
  const installSpinner = ora('Running npm install --legacy-peer-deps...').start();

  try {
    execSync('npm install --legacy-peer-deps', {
      stdio: 'pipe',
      cwd: path.join(__dirname, '..')
    });
    installSpinner.succeed(chalk.green('Dependencies installed'));
  } catch (error) {
    installSpinner.fail(chalk.red('Failed to install dependencies'));
    console.error(chalk.gray(error.message));
    process.exit(1);
  }

  // Step 8: Start dev server
  console.log('\n' + chalk.bold('Starting development server...'));
  console.log(chalk.gray('This will start both Vite and Shopify CLI dev servers.\n'));

  const devProcess = spawn('npm', ['run', 'dev'], {
    cwd: path.join(__dirname, '..'),
    detached: true,
    stdio: 'ignore'
  });

  devProcess.unref();

  // Step 9: Handle SSL certificate
  console.log(chalk.cyan('⏳ Waiting for Vite to start...'));

  await new Promise(resolve => setTimeout(resolve, 5000));

  console.log(chalk.cyan('🔓 Opening browser to accept SSL certificate...'));

  const open = (url) => {
    const platform = process.platform;
    const cmd = platform === 'darwin' ? 'open' : platform === 'win32' ? 'start' : 'xdg-open';

    try {
      execSync(`${cmd} ${url}`, { stdio: 'ignore' });
    } catch (error) {
      console.log(chalk.yellow(`\n⚠️  Couldn't open browser automatically. Please visit: ${url}`));
    }
  };

  open('https://127.0.0.1:3000');

  // Step 10: Success message
  console.log('\n' + chalk.green.bold('✨ Setup Complete!'));
  console.log(chalk.gray('─'.repeat(50)));
  console.log('\n' + chalk.bold('Next Steps:'));
  console.log(chalk.gray('1.') + ' In the browser that just opened, click "Advanced" and accept the SSL certificate');
  console.log(chalk.gray('2.') + ' Your Shopify preview should be available shortly at:');
  console.log('   ' + chalk.cyan('http://127.0.0.1:9292'));
  console.log(chalk.gray('3.') + ' Make changes to your theme files and see them update live!');
  console.log('\n' + chalk.gray('─'.repeat(50)));
  console.log(chalk.gray('\nTip: Press Ctrl+C in the terminal where dev server is running to stop it.\n'));
}

// Main execution
(async () => {
  try {
    const hasUI = await bootstrap();

    if (hasUI) {
      await setupWithUI();
    } else {
      // Fallback to basic prompts
      console.log('\n🚀 VAST Shopify Theme Setup (Basic Mode)\n');

      const storeName = await fallbackPrompt('Enter your Shopify store name (e.g., my-store): ');
      const themeId = await fallbackPrompt('Enter your theme ID: ');

      const tomlPath = path.join(__dirname, '..', 'shopify.theme.toml');
      const tomlContent = `[environments.development]\nstore = "${storeName}"\ntheme = "${themeId}"\n`;

      fs.writeFileSync(tomlPath, tomlContent, 'utf-8');
      console.log('\n✓ Created shopify.theme.toml');
      console.log('\nRun: npm install --legacy-peer-deps');
      console.log('Then: npm run dev\n');
    }
  } catch (error) {
    console.error('\n❌ Setup failed:', error.message);
    process.exit(1);
  }
})();
