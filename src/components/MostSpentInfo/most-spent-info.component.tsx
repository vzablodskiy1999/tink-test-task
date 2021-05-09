import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import { MostSpentPayload, Transaction } from '../../models/transactions.model'
import { SELECTED_YEAR } from '../../shared/constants';
import { getTransactions } from '../../services/tink.service';
import { getMaxSpentMerchant } from '../../shared/utils/transactions.util';
import { getLogoByCompanyName } from '../../services/logo.service';
import { LogoResponse } from '../../models/logo.model';
import ClipLoader from "react-spinners/ClipLoader";

const MostSpentInfo: React.FC = () => {
    const history = useHistory();
    const [mostSpentPayload, setMostSpentPayload] = useState<MostSpentPayload>({
        company: 'Amazon'
    } as MostSpentPayload);
    const [isLoading, setIsLoading] = useState(false);
    const [imgSrc, setImgSrc] = useState<string>('');

    useEffect(() => {
        if (mostSpentPayload.company) {
            getLogoByCompanyName(mostSpentPayload.company).then((res: LogoResponse) => {
                setImgSrc(res.logo)
            }).catch((err) => {
                console.error(err);
            });
        }
    }, [mostSpentPayload.company]);

    useEffect(() => {
        const code = new URLSearchParams(history.location.search).get('code');

        if (code) {
            setIsLoading(true);
            getTransactions(code).then((transactions: Transaction[]) => {
                setMostSpentPayload(getMaxSpentMerchant(transactions));
            }).catch((err) => {
                console.error(err);
            }).finally(() => {
                setIsLoading(false);
            });
        };
    }, []);

    return (
        <div className="wrapper">
            {!isLoading && imgSrc ? 
                (
                    <>
                        <div className="card">
                            <span className="card__subtitle">
                                Your favourite merchant:
                            </span>
                            <img className="card__img" src={imgSrc} />
                            <span className="card__title">
                                { mostSpentPayload.value } { mostSpentPayload.currency }
                            </span>
                            <span className="card__text">
                                During { SELECTED_YEAR } you have spent { mostSpentPayload.value } { mostSpentPayload.currency } in { mostSpentPayload.company }
                            </span>
                        </div>
                        <span className="card__disclaimer">
                            <a href="https://clearbit.com">Logos provided by Clearbit</a>
                        </span>
                    </>
                ) : (
                    <div className="loader">
                        <ClipLoader color="#000" loading={isLoading} size={150} />
                    </div>
                )
            }
        </ div>
    )
}

export default MostSpentInfo;