export const BouncingDotsLoader = () => {
    return (
        <div className='container' style={{
            minHeight: '50vh', 
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