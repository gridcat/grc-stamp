import crypto from 'crypto';
import { config } from './config';
import { connect } from './lib/gridcoin';
import { Scraper } from './Services/Scraper';
import { StampService } from './Services/StampService';
import './api';

async function initConnections(): Promise<void> {
  while (!await connect()) {
    console.log('Connecting to the gridcoin wallet...');
  }
  console.log('Connected to the gridcoin wallet...');
}

async function main(): Promise<void> {
  await initConnections();

  const stampService = new StampService();
  const scraper = new Scraper();
  // run scraper once per minute
  setInterval(() => scraper.scrape(), config.SCRAPER_TIMEOUT);
  // // ss.createStamp();
  const hash = `${Math.random() * 100000000000000}`;
  const sha = crypto.createHash('sha256');
  sha.update(hash);
  // const shaman = sha.digest('hex');
  // // 9999
  // stampService.createStamp(shaman);
  setInterval(() => stampService.publishStamp(), config.PUBLISH_TIMEOUT);
  // ss.publishStamp();
}

main();
