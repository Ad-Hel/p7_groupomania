import Button from "./Button";

function LikeButton(props){
    const isLiked = props.isLiked;
    const handleLike = props.handleLike;
    return (
        <Button classStyle={`like button--like--${isLiked}`} type='button' onclick={handleLike}>
          <div> <svg fill="currentColor" height="15" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M310.6 182.6c-12.51 12.51-32.76 12.49-45.25 0L192 109.3V480c0 17.69-14.31 32-32 32s-32-14.31-32-32V109.3L54.63 182.6c-12.5 12.5-32.75 12.5-45.25 0s-12.5-32.75 0-45.25l128-128c12.5-12.5 32.75-12.5 45.25 0l128 128C323.1 149.9 323.1 170.1 310.6 182.6z"/></svg></div>
        </Button>
    )
}

export default LikeButton;