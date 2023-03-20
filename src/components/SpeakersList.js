
import { useContext } from "react";
import Speaker from "./Speaker";
import ReactPlaceholder from "react-placeholder/lib";
import useRequestREST, { REQUEST_STATUS } from "../hooks/useRequestREST";
import { data } from "../../SpeakerData";
import { SpeakerFilterContext } from "../contexts/SpeakerFilterContext";
import SpeakerAdd from "./SpeakerAdd";

function SpeakerList() {

    const {
        data: speakersData,
        requestStatus, error,
        updateRecord,
        insertRecord,
        deleteRecord,
    } = useRequestREST();

    const { searchQuery, eventYear } = useContext(SpeakerFilterContext);


    if (requestStatus === REQUEST_STATUS.FAILURE) {
        return (
            <div className="text-danger">
                ERROR: <b> Loading Speaker Data</b>
            </div>
        )
    }


    return (
        <div className="container speakers-list">
            <ReactPlaceholder
                type="media"
                rows={15}
                className="speakerslist-placeholder"
                ready={requestStatus === REQUEST_STATUS.SUCCESS}>

                <SpeakerAdd eventYear={eventYear} insertRecord={insertRecord}></SpeakerAdd>

                <div className="row">
                    {speakersData
                        .filter(function (speaker) {
                            return (
                                speaker.first.toLowerCase().includes(searchQuery) ||
                                speaker.last.toLowerCase().includes(searchQuery)

                            )
                        })
                        .filter(function (speaker) {
                            return (
                                speaker.sessions.find((session) => {
                                    return session.eventYear === eventYear;
                                })
                            )
                        })
                        .map(function (speaker) {
                            return <Speaker
                                key={speaker.id}
                                speaker={speaker}
                                updateRecord={updateRecord}
                                insertRecord={insertRecord}
                                deleteRecord={deleteRecord}
                            ></Speaker>;
                        })}
                </div>

            </ReactPlaceholder>

        </div>
    );
}

export default SpeakerList;