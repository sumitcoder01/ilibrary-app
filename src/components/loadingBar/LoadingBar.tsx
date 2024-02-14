import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom";
import LoadingBar from "react-top-loading-bar"

export default function TopLoadingBar() {
    const [progress, setProgress] = useState(0);
    const location = useLocation();

    useEffect(() => {
        setTimeout(() => {
            setProgress(20);
        }, 500);
        setTimeout(() => {
            setProgress(50);
        }, 1000);
        setTimeout(() => {
            setProgress(100);
        }, 1500);
    }, [location.pathname])
    return (
        <div>
            <LoadingBar
                color='#f11946'
                height={2}
                progress={progress}
                onLoaderFinished={() => setProgress(0)}
            />
        </div>

    )
}
