import md5 from "md5";

export const Avatar = ({ width, email, className, ...props }) => {
    if (!email) {
        return <></>
    }
    return (
        <div
            className={`avatar ${className}`}
            style={{
                background: `url(https://gravatar.com/avatar/${md5(email)}?s=400&d=robohash&r=x) center center`,
                backgroundSize: 'cover',
                borderRadius: '50%',
                width: `${width}px`,
                height: `${width}px`
            }}
            {...props}
        />
    )
}
