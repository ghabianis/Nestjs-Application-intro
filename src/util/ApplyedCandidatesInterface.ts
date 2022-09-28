import { ApplyedCandiateList } from "@prisma/client";

export interface ApplyedCandidatesInterface<T> {
    readonly paginatedResult: T[] | [];
    readonly waitingCandidates: ApplyedCandiateList[];
    readonly approvedCandidates: ApplyedCandiateList[];
    readonly rejectedCandidates: ApplyedCandiateList[];
    readonly inprogressCandidates: ApplyedCandiateList[];
    readonly user: [
        {
            firstName: '',
            lastName: '',
            email:'',
            photo: '',
            userid: ''
        }
    ];
    readonly totalCount: number;
}