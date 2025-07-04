import './css/bouncing-loader.css'
interface LoaderProps{
    vh:string,
}
export const BouncingDotsLoader = (props:LoaderProps) => {
    return (
        <div className='container' style={{
            minHeight: props.vh ? props.vh : '50vh', 
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <div className="bouncing-loader">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
};