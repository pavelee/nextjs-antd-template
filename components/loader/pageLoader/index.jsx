import { Spin } from "antd";

export const PageLoader = (props) => {

    const {
        size = 'large',
        tip = 'Loading...'
    } = props;
    
    return (
        <div style={styles.background}>
            <div style={styles.wrapper}>
                <Spin 
                    size={size}
                    tip={tip}
                />
            </div>
        </div>
    );
};

const styles = {
    background: {
        backgroundColor: "#FFF",
        height: "100%",
        width: "100%",
    },
    wrapper: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
    },
};
