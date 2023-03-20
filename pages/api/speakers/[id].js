
import path, { resolve } from "path";
import fs from "fs";

const { promisify } = require("util");
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const delay = (ms) => new Promise((resolve) => { setTimeout(resolve, ms) });

export default async function handler(req, res) {

    //res.status(200).send(JSON.stringify(data, null, 2))

    const method = req?.method;
    const id = parseInt(req?.query.id);
    const recordFromBody = req?.body;
    const jsonFile = path.resolve("./", "db.json");

    switch (method) {
        case "POST":
            await postMethod();
            break;
        case "PUT":
            await putMethod();
            break;
        case "DELETE":
            await deleteMethod();
            break;
        default:
            res.status(501).send(`Method ${method} not implemented`);
            console.log(`Method ${method} not implemented`);

    }


    async function putMethod() {
        try {
            const readFileData = await readFile(jsonFile);
            await delay(3000);
            const speakers = JSON.parse(readFileData).speakers;
            if (!speakers) {
                res.status(404).send("Error: Request failed with status code 404");
            }
            else {
                const newSpeakersArray = speakers.map(function (rec) {
                    return rec.id == id ? recordFromBody : rec;
                });
                writeFile(jsonFile, JSON.stringify({ speakers: newSpeakersArray }, null, 2))
                res.setHeader("Content-Type", "application/json");
                res.status(200).send(JSON.stringify(speakers, null, 2))
                console.log(`PUT /api/speakers/${id} status: 200`)
            }
        }
        catch (e) {
            console.log(`PUT /api/speakers/${id} status: 500`, e);
            res.status(500).send("unexpected error");
        }
    }


    async function postMethod() {
        try {
            const readFileData = await readFile(jsonFile);
            await delay(3000);
            const speakers = JSON.parse(readFileData).speakers;
            if (!speakers) {
                res.status(404).send("Error: Request failed with status code 404");
            }
            else {
                const idNew = speakers.reduce((accumulator, currentValue) => {
                    const idCurrent = parseInt(currentValue.id);
                    return idCurrent > accumulator ? idCurrent : accumulator;
                }, 0) + 1;

                const newSpeakersRec = { ...recordFromBody, id: idNew.toString() }


                const newSpeakersArray = [newSpeakersRec, ...speakers];

                writeFile(jsonFile, JSON.stringify({ speakers: newSpeakersArray }, null, 2))
                res.setHeader("Content-Type", "application/json");
                res.status(200).send(JSON.stringify(speakers, null, 2))
                console.log(`POST /api/speakers/${id} status: 200`)
            }
        }
        catch (e) {
            console.log(`POST /api/speakers/${id} status: 500`, e);
            res.status(500).send("unexpected error");
        }
    }



    async function deleteMethod() {
        try {
            const readFileData = await readFile(jsonFile);
            await delay(3000);
            const speakers = JSON.parse(readFileData).speakers;
            if (!speakers) {
                res.status(404).send("Error: Request failed with status code 404");
            }
            else {
                const newSpeakersArray = speakers.filter(function (rec) {
                    return rec.id != id;
                })
                writeFile(jsonFile, JSON.stringify({ speakers: newSpeakersArray }, null, 2))
                res.setHeader("Content-Type", "application/json");
                res.status(200).send(JSON.stringify(speakers, null, 2))
                console.log(`DELETE /api/speakers/${id} status: 200`)
            }
        }
        catch (e) {
            console.log(`DELETE /api/speakers/${id} status: 500`, e);
            res.status(500).send("unexpected error");
        }
    }

}