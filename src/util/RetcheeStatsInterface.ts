export interface SocialInteractionStatsInterface<T> {
    // readonly paginatedResult: T[] | [];
    // readonly totalCount: number;
    readonly datasets: [{
        data: [],
        color: []
    }
    ];
    readonly paginatedResult: T[] | [];

    labels: []
}
export interface FeedbackStatsInterface<T> {
    // readonly paginatedResult: T[] | [];
    // readonly totalCount: number;
    readonly datasets: [{
        data: [],
        color: []
    }
    ];
    readonly paginatedResult: T[] | [];

    labels: [{
        labels: [],
        allLabels: []
    }
    ];
}