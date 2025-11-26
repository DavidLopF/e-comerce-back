import { LoggerService, LogLevel } from '@nestjs/common';
import chalk from 'chalk';

export class CustomLogger implements LoggerService {
  private context?: string;

  constructor(context?: string) {
    this.context = context;
  }

  private formatTimestamp(): string {
    const now = new Date();
    return now.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  }

  log(message: any, context?: string) {
    const timestamp = this.formatTimestamp();
    const ctx = context || this.context || 'Application';
    console.log(
      `${chalk.gray(`[Nest] ${process.pid}  - `)}${chalk.gray(timestamp)}     ${chalk.bold.green('LOG')} ${chalk.yellow(`[${ctx}]`)} ${chalk.white(message)}`,
    );
  }

  error(message: any, trace?: string, context?: string) {
    const timestamp = this.formatTimestamp();
    const ctx = context || this.context || 'Application';
    console.error(
      `${chalk.gray(`[Nest] ${process.pid}  - `)}${chalk.gray(timestamp)}   ${chalk.bold.red('ERROR')} ${chalk.yellow(`[${ctx}]`)} ${chalk.red(message)}`,
    );
    if (trace) {
      console.error(chalk.dim(trace));
    }
  }

  warn(message: any, context?: string) {
    const timestamp = this.formatTimestamp();
    const ctx = context || this.context || 'Application';
    console.warn(
      `${chalk.gray(`[Nest] ${process.pid}  - `)}${chalk.gray(timestamp)}    ${chalk.bold.hex('#FFA500')('WARN')} ${chalk.yellow(`[${ctx}]`)} ${chalk.hex('#FFA500')(message)}`,
    );
  }

  debug(message: any, context?: string) {
    const timestamp = this.formatTimestamp();
    const ctx = context || this.context || 'Application';
    console.debug(
      `${chalk.gray(`[Nest] ${process.pid}  - `)}${chalk.gray(timestamp)}   ${chalk.bold.magenta('DEBUG')} ${chalk.yellow(`[${ctx}]`)} ${chalk.magenta(message)}`,
    );
  }

  verbose(message: any, context?: string) {
    const timestamp = this.formatTimestamp();
    const ctx = context || this.context || 'Application';
    console.log(
      `${chalk.gray(`[Nest] ${process.pid}  - `)}${chalk.gray(timestamp)} ${chalk.bold.cyan('VERBOSE')} ${chalk.yellow(`[${ctx}]`)} ${chalk.cyan(message)}`,
    );
  }
}
