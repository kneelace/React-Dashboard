
import Toolbar from "./Toolbar";
import SpeakerList from "./SpeakersList";
import { useState } from "react";
import { SpeakerFilterProvider } from "../contexts/SpeakerFilterContext";

function Speakers() {

    const [showSessions, setShowSessions] = useState(true);

    return (
        <SpeakerFilterProvider startingShowSessions={false}>
            <Toolbar></Toolbar>
            <SpeakerList></SpeakerList>
        </SpeakerFilterProvider>

    );


}
export default Speakers;