import moment from "moment";
import { DATE_FORMAT, MostSpentPayload, Transaction } from "../../models/transactions.model";
import { SELECTED_YEAR } from "../constants";

export const getMaxSpentMerchant = (transactions: Transaction[]): MostSpentPayload => {
    const result = {
        value: 0
    } as MostSpentPayload;
    
    transactions.reduce<any>((prev: { [ key: string ]: MostSpentPayload }, transaction: Transaction) => {
        if ((transaction.types.type === 'PAYMENT' || transaction.types.type === 'TRANSFER') && 
            moment(transaction.dates.booked, DATE_FORMAT).year() === SELECTED_YEAR) {
                const companyName = transaction.descriptions.display;
                const countedValue = prev[companyName]?.value ? prev[companyName].value + Math.abs(+transaction.amount.value.unscaledValue)
                                    : Math.abs(+transaction.amount.value.unscaledValue);

                if (result.value < countedValue) {
                    result.company = companyName;
                    result.value = countedValue;
                    result.currency = transaction.amount.currencyCode;
                };

                return { 
                    ...prev, 
                    [companyName]: {
                        ...prev[companyName],
                        company: companyName,
                        value: countedValue,
                        currency: transaction.amount.currencyCode,
                    } 
                }
            };

        return prev;
    }, {});
    
    return result;
};