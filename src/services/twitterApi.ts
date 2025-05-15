import {TwitterApi} from "twitter-api-v2";
import {JobFormatter} from "../../helpers/JobFormatter";

export interface Tweet {
  text: string;

  [key: string]: any;
}


const appKey: string = process.env.TWITTER_APP_TOKEN;
const appSecret: string = process.env.TWITTER_APP_SECRET;
const accessToken: string = process.env.TWITTER_ACCESS_TOKEN;
const accessSecret: string = process.env.TWITTER_ACCESS_SECRET;

const twitterClient = new TwitterApi({
    accessToken,
    appSecret,
    appKey,
    accessSecret
  }
);

abstract class TwitterWrapper {
  abstract createTweet<T extends Tweet>(data: T): Promise<void>;


  buildJobTweet<T extends {
    companyName?: string;
    title?: string;
    location?: string;
    salaryRange?: string;
    howToApply?: string
    salaryFrom?: string;
    salaryTo?: string
    slug?: string
    workPermits: []
    company: {
      name: string,
    },
    remoteOptions: string,
  }>(data: T): string {
    const companyName = data.companyName ?? data.company.name ?? 'GarbusCorp';
    const jobTitle = data.title ?? 'Flutter Developer';
    const salaryRange = data.salaryFrom ? `💵 Salary: $${data.salaryFrom} - ${data.salaryTo}` : 'N/A'
    const applicationLink = `https://fluttergigs.com/jobs/${data.slug ?? ''}`
    const remote = JobFormatter.formatRemoteOption(data.remoteOptions);
    const location = JobFormatter.formatWorkPermits(data.workPermits);

    return `
🚀 Hiring Flutter Devs! 🚀

🏢 Company: ${companyName}
💼 Role: ${jobTitle}
🌍 Location: ${location}
🏡 Remote: ${remote}

${salaryRange}

Apply now 👇
${applicationLink}

#FlutterJobs #Hiring #RemoteJobs
    `.trim();
  }
}


export class TwitterWrapperImpl extends TwitterWrapper {
  async createTweet<T extends Tweet>(data: T) {
    try {
      if (process.env.NODE_ENV !== 'development' && data.text.trim() !== '') {
        const {data: createdTweet} = await twitterClient.v2.tweet(data.text);
        console.log('Tweet', createdTweet.id, ':', createdTweet.text);
      }
    } catch (e) {
      console.error('Error creating tweet:', e);
    }
  }


}
