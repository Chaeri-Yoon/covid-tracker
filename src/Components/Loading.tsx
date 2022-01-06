import styled from "styled-components";
import Spinner from 'react-bootstrap/Spinner'
import 'bootstrap/dist/css/bootstrap.min.css';

const SpinnerContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 100vh;

    animation: spinner-opacity 1s linear infinite;
    @keyframes spinner-opacity {
        0% { opacity: 1; }
        50% { opacity: 0; }
        100% { opacity: 1; }
    }
`;
function Loading() {
    return (
        <SpinnerContainer>
            <Spinner animation="border" variant="danger" />
        </SpinnerContainer>
    );
}
export default Loading;