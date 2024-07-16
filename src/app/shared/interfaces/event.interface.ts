export interface EventAPIResponse {
    _embedded: {
        events: Event[]
    },
    page: { totalPages: number }
}

export interface Event {
    id: string;
    name: string;
    locale: string;
    priceRanges: [
        { currency: string, min: number, max: number }
    ],
    images: [
        { ratio: string; url: string }
    ],
    dates: {
        start: { localDate: string, localTime: string },
        status: { code: string }
        timezone: string;
    },
    _embedded: {
        venues: [
            { city: { name: string } }
        ]
    }
}