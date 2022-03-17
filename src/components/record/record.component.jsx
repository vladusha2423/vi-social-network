import React, {memo, useCallback, useEffect, useState} from "react";
import {Button} from "antd";
import "./record.module.scss";
import {useReactMediaRecorder} from "react-media-recorder";
import {AudioOutlined} from "@ant-design/icons";

const Record = memo(function Record({ onAudio }) {
    const [recording, setRecording] = useState(false);

    const {
        startRecording,
        stopRecording,
        mediaBlobUrl
    } = useReactMediaRecorder({ video: false });

    const handleStartRecord = useCallback(() => {
        setRecording(true);
        startRecording();
    }, []);

    const handleStopRecording = useCallback(async () => {
        setRecording(false);
        stopRecording();
    }, []);

    useEffect(() => {
        if (!mediaBlobUrl) {
            return;
        }
        onAudio(mediaBlobUrl)
        // setLoading(true)
        // axios.get(mediaBlobUrl, {
        //     responseType: 'blob'
        // }).then((response) => {
        //     const file = new File([response.data], 'speech');
        //     const fd = new FormData();
        //     fd.append('speech', file);
        //     axios.post('http://127.0.0.1:5000/api/recognize-speech', fd).then((response) => {
        //         setText(response.data);
        //         setLoading(false);
        //     });
        // });
    }, [mediaBlobUrl])

    return recording ? (
        <Button
            shape="circle"
            size="large"
            className="recordButton recordButtonStop"
            onClick={handleStopRecording}
        >
            ■
        </Button>
    ) : (
        <Button
            shape="circle"
            size="large"
            className="recordButton recordButtonStart"
            onClick={handleStartRecord}
        >
            <AudioOutlined />
        </Button>
    );
});

export default Record;
