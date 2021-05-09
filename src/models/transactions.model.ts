export interface Transaction {
    id: string,
    amount: {
        value: {
          unscaledValue: string,
          scale: number,
        },
        currencyCode: string,
    },
    descriptions: {
        original: string,
        display: string,
    },
    dates: {
        booked: string,
    },
    types: {
        type: string,
    },
    status: string,
};

export const DATE_FORMAT = "YYYY-MM-DD";

export interface MostSpentPayload { 
    company: string,
    value: number,
    currency: string 
}
