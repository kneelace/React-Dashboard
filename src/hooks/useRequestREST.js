import { useState, useEffect } from "react";
import axios from "axios";
import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";

export const REQUEST_STATUS = {
    LOADING: "loading",
    SUCCESS: "success",
    FAILURE: "failure",
}

const restURL = "api/speakers";

function useRequestREST(delayTime = 1000, initialData = []) {

    const [data, setData] = useState(initialData);
    const [requestStatus, setRequestStatus] = useState(REQUEST_STATUS.LOADING);
    const [error, setError] = useState("");


    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    useEffect(() => {

        async function delayFunc() {
            try {
                const result = await axios.get(restURL);
                setRequestStatus(REQUEST_STATUS.SUCCESS);
                setData(result.data);

            }
            catch (e) {
                setRequestStatus(REQUEST_STATUS.FAILURE);
                setError(e);
            }


        }
        delayFunc();

    }, []);

    function updateRecord(record, doneCallback) {

        const originalRecords = [...data];
        const newRecords = data.map(function (rec) {
            return rec.id === record.id ? record : rec;
        });

        async function delayFunction() {

            try {
                setData(newRecords);
                await axios.put(`${restURL}/${record.id}`, record)
                if (doneCallback) {
                    doneCallback();
                }


            }
            catch (e) {
                console.log("error in updateRecord", e)
                if (doneCallback) {
                    doneCallback();
                }
                setData(originalRecords);
            }

        }

        delayFunction();


    }


    function insertRecord(record, doneCallback) {

        const originalRecords = [...data];
        const newRecords = [record, ...data];

        async function delayFunction() {

            try {
                setData(newRecords);

                await axios.post(`${restURL}/99999`, record)
                if (doneCallback) {
                    doneCallback();
                }


            }
            catch (e) {
                console.log("error in insertRecord", e)
                if (doneCallback) {
                    doneCallback();
                }
                setData(originalRecords);
            }

        }

        delayFunction();


    }

    function deleteRecord(record, doneCallback) {

        const originalRecords = [...data];
        const newRecords = data.filter(function (rec) {
            return rec.id != record.id;
        });

        async function delayFunction() {

            try {
                setData(newRecords);

                await axios.delete(`${restURL}/${record.id}`, record)
                if (doneCallback) {
                    doneCallback();
                }


            }
            catch (e) {
                console.log("error in deleteRecord", e)
                if (doneCallback) {
                    doneCallback();
                }
                setData(originalRecords);
            }

        }

        delayFunction();


    }


    return {
        data,
        requestStatus,
        error,
        updateRecord,
        insertRecord,
        deleteRecord,
    }


}

export default useRequestREST;

