import {useCallback, useEffect, useState} from "react";

export const useAudio = () => {
    const [url, setUrl] = useState(undefined);
    const [audio, setAudio] = useState(undefined);
    const [playing, setPlaying] = useState(false);

    const toggle = () => setPlaying(!playing);

    useEffect(() => {
        if (!audio) {
            return;
        }
        playing ? audio.play() : audio.pause();
    }, [playing]);

    const play = useCallback((newUrl) => {
        if (!newUrl) {
            return;
        }
        if (newUrl !== url) {
            setUrl(newUrl)
            setAudio(new Audio(newUrl));
        }
        setPlaying(true)
    }, []);

    useEffect(() => {
        if (!audio) {
            return;
        }
        audio.addEventListener('ended', () => setPlaying(false));
        return () => {
            audio.removeEventListener('ended', () => setPlaying(false));
        };
    }, [audio]);

    return [play, playing, toggle];
};
