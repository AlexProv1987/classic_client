import { useEffect } from "react";
import { ContentOpts } from "../common/types"
import { Home } from "../content-components/home/parent/home";
import { Requests } from "../content-components/requests/parent/requests";

interface ContentFrameProps {
    value: ContentOpts,
}

export const ContentFrame = (props: ContentFrameProps) => {
    useEffect(() => {
        console.log(props.value)
    }, [props.value]);

    const renderView = () => {
        switch (props.value) {
            case 'home':
                return <Home />;
            case 'requests':
                return <Requests />;
            case 'people':
                return null;
            case 'knowledge':
                return null;
            case 'contacts':
                return null;
            default:
                return null;
        }
    };

    return (
        <div>
            {renderView()}
        </div>
    )
}