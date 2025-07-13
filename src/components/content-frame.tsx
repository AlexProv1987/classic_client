import { useEffect } from "react";
import { ContentOpts } from "../common/types"
import { Home } from "../content-components/home/home";
import { Requests } from "../content-components/requests/requests";
import { People } from "../content-components/people/people";

interface ContentFrameProps {
    value: ContentOpts,
}

export const ContentFrame: React.FC<ContentFrameProps> = (props) => {

    const renderView = () => {
        switch (props.value) {
            case 'home':
                return <Home />;
            case 'requests':
                return <Requests />;
            case 'people':
                return <People/>;
            case 'knowledge':
                return null;
            case 'contacts':
                return null;
            case 'portal':
                return null;
            default:
                return null;
        }
    };

    return (
        <div style={{flex:1,minHeight:'100vh'}}>
            {renderView()}
        </div>
    )
}