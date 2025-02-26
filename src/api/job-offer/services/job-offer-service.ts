import {HttpService} from "../../../core/services/network/httpService";
import {AxiosService} from "../../../core/services/network/axiosService";
import {AxiosResponse} from "axios";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));


export class CustomJobOfferService {

  static async saveJobsToStrapi(strapi, jobs) {
    for (const job of jobs) {
      try {
        // Use Strapi Entity Service to create a job entry
        await strapi.entityService.create('api::job-offer.job-offer', {
          data: {
            title: job.title,
            description: job.description,
            company: job.company,
            salaryFrom: job.salary,
            salaryTo: job.salary,
            url: job.url,
            howToApply: job.applicationLink,
            publishedAt: new Date().toISOString(),
          },
        });
        console.log(`Job saved: ${job.title}`);
      } catch (error) {
        console.error(`Error saving job "${job.title}":`, error.message);
      }
    }
  };

  static async getJobOffers(ctx: any) {
    const baseUrl = 'https://himalayas.app/jobs/api';
    const limit = 200;
    let offset = 0;
    let hasMoreJobs = true;
    const flutterJobs = [];

    const axiosService: HttpService<any, any> = new AxiosService()

    while (hasMoreJobs) {
      try {

        const response = await (axiosService as AxiosService).get<AxiosResponse>(`${baseUrl}?offset=${offset}&limit=${limit}`)

        const jobs = response.data.jobs;

        if (jobs.length === 0) {
          hasMoreJobs = false;
          break;
        }

        const flutterJobsBatch = jobs.filter((job) => {
          const title = job.title.toLowerCase();
          const description = job.description.toLowerCase();
          const excerpt = job.excerpt.toLowerCase();
          return title.includes('flutter') || description.includes('flutter') || excerpt.includes('flutter');
        });

        flutterJobs.push(...flutterJobsBatch);
        offset += limit;

        // Add a delay between requests (e.g., 1 second)
        await delay(1000);
      } catch (error) {
        console.error('Error fetching jobs:', error.message);
        hasMoreJobs = false;
      }
    }

    return flutterJobs;
  }

}
