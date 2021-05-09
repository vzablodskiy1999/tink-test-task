import { Transaction } from "../models/transactions.model";

export const getTransactions = (code: string): Promise<Transaction[]> => {
    return fetch("http://localhost:8080/callback", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            code: code,
            test: 'test'
        }),
    }).then((res) => {
        if (res.status !== 200) {
            Promise.reject();
        }
        return res.json();
    }).catch((err) => {
        return Promise.reject(err);
    })
};