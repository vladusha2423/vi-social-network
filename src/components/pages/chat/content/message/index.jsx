import React, {useMemo} from 'react';
import 'antd/dist/antd.css';
import "./style.scss"
import {Button} from 'antd';
import {useAudio} from "../../../../../common/hooks/audio";
import {PauseOutlined} from '@ant-design/icons'
import {API_URL} from "../../../../../common/constants/url";

export const Message = (message) => {
    const [play, playing, toggle] = useAudio();

    const msg = message.message

    const voiceUrl = useMemo(() => {
        if (!msg.voice) {
            return '';
        }
        console.log('!! msg.url.slice(0, 4): ', msg.voice.slice(0, 4));
        if (msg.voice.slice(0, 4) === 'blob') {
            return msg.voice;
        }
        console.log('!! `${API_URL}/${msg.voice}`: ', `${API_URL}/${msg.voice}`);
        return `${API_URL}/${msg.voice}`
    }, []);

    // if(msg.mine)
    return (
        <div className={msg.mine ? 'message_my_container' : 'message_container'}>
            <div
                className={`message ${msg.mine && 'message_my'}`}
            >
                <div
                    className={`message_sender ${msg.mine && 'message_sender_my'}`}
                >
                    {msg.name}
                </div>
                <p
                    className={`message_text ${msg.mine && 'message_text_my'}`}
                >
                    {msg.text}
                </p>
                {voiceUrl && (
                    <>
                        {playing ? (
                            <Button
                                shape="circle"
                                size="large"
                                className="recordButton recordButtonStop"
                                onClick={toggle}
                            >
                                <PauseOutlined />
                            </Button>
                        ) : (
                            <Button
                                shape="circle"
                                size="large"
                                className="recordButton recordButtonStart"
                                onClick={() => { play(voiceUrl) }}
                            >
                                ▶︎
                            </Button>
                        )}
                    </>
                )}
                <Button
                    type="text"
                    className="recordButton recordButtonStart"
                    // onClick={() => { play(voiceUrl) }}
                >
                    Recognize
                </Button>
            </div>
        </div>
    );
    // else
    //     return (
    //         <div className="message_container">
    //             <div className="message">
    //                 <div className="message_sender">{msg.name}</div>
    //                 <p className="message_text">{msg.text}</p>
    //                 {voiceUrl && (
    //                     <div className="message__buttons" gap={10}>
    //                         {playing ? (
    //                             <Button
    //                                 shape="circle"
    //                                 size="large"
    //                                 className="recordButton recordButtonStop"
    //                                 onClick={toggle}
    //                             >
    //                                 <PauseOutlined />
    //                             </Button>
    //                         ) : (
    //                             <Button
    //                                 shape="circle"
    //                                 size="large"
    //                                 className="recordButton recordButtonStart"
    //                                 onClick={() => { play(voiceUrl) }}
    //                             >
    //                                 ▶
    //                             </Button>
    //                         )}
    //                         <Button
    //                             type="text"
    //                             className="recordButton recordButtonStart"
    //                             // onClick={() => { play(voiceUrl) }}
    //                         >
    //                             Recognize
    //                         </Button>
    //                     </div>
    //                 )}
    //             </div>
    //         </div>
    //     )

}
