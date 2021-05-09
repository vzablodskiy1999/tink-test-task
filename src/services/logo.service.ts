import { LogoResponse } from "../models/logo.model";

export const getLogoByCompanyName = (companyName: string): Promise<LogoResponse> => {
    return fetch('https://company.clearbit.com/v1/domains/find?name=' + companyName, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer sk_12b5868c1e6ca37fb2927aab38ffe011"
        }
    }).then((res) => {
        if (res.status !== 200) {
            Promise.reject();
        }
        return res.json();
    }).catch((err) => {
        Promise.reject(err);
    });
}