import React, { useContext, useState } from "react";
import { SpeakerFilterContext } from "../contexts/SpeakerFilterContext";
import { SpeakerProvider, SpeakerContext } from "../contexts/SpeakerContext";
import SpeakerDelete from "./SpeakerDelete";


function Session(props) {
    const { title, room } = props;
    return (
        <span className="session w-100">
            {title} <strong>Room: {room.name}</strong>
        </span>
    );
}

function Sessions() {

    const { eventYear } = useContext(SpeakerFilterContext);
    const { speaker } = useContext(SpeakerContext);
    const sessions = speaker.sessions;
    return (

        <div className="sessionBox card h-10">
            {sessions
                .filter(function (session) {
                    return session.eventYear === eventYear;
                })
                .map(function (session) {
                    return (
                        <div className="session w-100" key={session.id}>
                            <Session {...session}></Session>
                        </div>
                    )
                })}

        </div>
    );
}

function ImageWithFallBack({ src, ...props }) {

    const [error, setError] = useState(false);
    const [imgSrc, setImgSrc] = useState(src);

    function onError() {
        if (!error) {
            setImgSrc("/images/speaker-99999.jpg");
            setError(true);
        }
    }


    return <img src={imgSrc} {...props} onError={onError}></img>
}



function SpeakerImage() {
    const { speaker: { id, first, last } } = useContext(SpeakerContext);
    return (
        <div className="speaker-img d-flex flex-row justify-content-center align-items-center h-300">
            <ImageWithFallBack
                className="contain-fit"
                src={`/images/speaker-${id}.jpg`}
                width="300"
                alt={`${first} ${last}`}
            />
        </div>
    );
}
function SpeakerFavorite() {

    const { speaker, updateRecord } = useContext(SpeakerContext);

    const [inTransisition, setInTransistion] = useState(false);


    function doneCallback() {
        setInTransistion(false);

    }

    return (
        <div className="action padB1">
            <span onClick={() => {
                setInTransistion(true);
                updateRecord(
                    {
                        ...speaker, favorite: !speaker.favorite,
                    },
                    doneCallback
                )
            }}>
                <i className={speaker.favorite === true ?
                    "fa fa-star orange" : "fa fa-star-o orange"}
                />{" "}
                Favorite {" "}
                {inTransisition ? (<span className="fas fa-circle-notch fa-spin"></span>) : null}
            </span>

        </div>
    );
}

function SpeakerDemographics() {

    const { speaker } = useContext(SpeakerContext);
    const { first, last, bio, company, twitterHandle, favorite } = speaker;

    return (
        <div className="speaker-info">
            <div className="d-flex justify-content-between mb-3">
                <h3 className="text-truncate w-200">
                    {first} {last}
                </h3>
            </div>
            <SpeakerFavorite></SpeakerFavorite>
            <div>
                <p className="card-description"> {bio} </p>
                <div className="social d-flex flex-row mt-4">
                    <div className="company">
                        <h5>Company</h5>
                        <h6>{company}</h6>
                    </div>
                    <div className="twitter">
                        <h5>Twitter</h5>
                        <h6>{twitterHandle}</h6>
                    </div>
                </div>

            </div>
        </div>
    );
}

function Speaker({ speaker, updateRecord, insertRecord, deleteRecord }) {

    const { showSessions } = useContext(SpeakerFilterContext);

    return (
        <SpeakerProvider
            speaker={speaker}
            updateRecord={updateRecord}
            insertRecord={insertRecord}
            deleteRecord={deleteRecord}
        >
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-sm-12 col-xs-12">
                <div className="card card-height p-4 mt-4">
                    <SpeakerImage ></SpeakerImage>
                    <SpeakerDemographics ></SpeakerDemographics>
                </div>
                {showSessions === true ? <Sessions></Sessions> : null}
                <SpeakerDelete></SpeakerDelete>
            </div>
        </SpeakerProvider >
    );

}


export default Speaker;