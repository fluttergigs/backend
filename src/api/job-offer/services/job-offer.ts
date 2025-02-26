'use strict';
import {CustomJobOfferService} from "./job-offer-service";
/**
 * job-offer service
 */
import {factories} from '@strapi/strapi';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const {createCoreService} = factories;

export default createCoreService('api::job-offer.job-offer', ({strapi}) => ({

  async scrape(ctx) {
    try {
      // Your code here

      console.log('HANDLE SCRAPING HERE');


      let flutterJobs = await CustomJobOfferService.getJobOffers(ctx)

      await CustomJobOfferService.saveJobsToStrapi(strapi, flutterJobs)

      //insert job offers into database


      // let response = await puppeteerScraperService.scrape("https://himalayas.app/jobs/flutter")
      // let response = await puppeteerScraperService.scrape("https://startup.jobs/remote-jobs?remote=true&q=flutter")


      // let response = await (axiosService as AxiosService).get<AxiosResponse>("https://www.himalayas.app&sourceid=chrome&ie=UTF-8&jbr=sep:0&udm=8&ved=2ahUKEwiy4avIoZ-LAxUukokEHbEAOOkQ3L8LegQIMRAN")

      // console.log('data', response)

      return []
    } catch (error) {
      console.log(error);
      throw new Error("An Error occurred");
    }
  },
}));


