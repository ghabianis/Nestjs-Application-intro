import { Injectable } from "@nestjs/common";
import {FeedbackStatsInterface } from "src/util/RetcheeStatsInterface";
import { DbService } from "src/dbService/db.service";
import { FeedbackServiceBase } from "./base/feedback.service.base";
import { ApplyedCandiateList } from "@prisma/client";
import { ApplyedCandidatesInterface } from "src/util/ApplyedCandidatesInterface";

@Injectable()
export class FeedbackService extends FeedbackServiceBase {
  constructor(protected readonly prisma: DbService) {
    super(prisma);
  }


  //function get list of candidates inroled in specifique offer with status 
  async ApplyedCandiateList(args: any): Promise<ApplyedCandidatesInterface<ApplyedCandiateList>> {
    const [data, totalCount] = await Promise.all([
      this.prisma.applyedCandiateList.findMany(args),
      this.prisma.applyedCandiateList.count()
    ]);
    return {
      paginatedResult: data,
      waitingCandidates: [],
      approvedCandidates: [],
      rejectedCandidates: [],
      inprogressCandidates: [],
      user: [
        {
          firstName: '',
          lastName: '',
          email: '',
          photo: '',
          userid: ''
        }
      ],
      totalCount
    };
  }
  //service to get Offer Feedback (applies) Statistics per month/year/day/week
  async getOfferFeedbackStats(
    args: any
  ): Promise<FeedbackStatsInterface<any>> {
    const [data] = await Promise.all([
      await this.prisma.offerFeedbackStatsView.groupBy(args),
    ]);
    return {
      labels: [
        {
          labels: [],
          allLabels: [],
        }
      ],
      paginatedResult: data,
      datasets: [
        {
          data: [],
          color: [],
        },
      ],
    };
  }
}
