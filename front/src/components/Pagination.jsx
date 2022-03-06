import Button from "./Button";

import '../scss/component/pagination.scss';

function Pagination(props){
    const page = props.page;
    const setPage = props.setPage;
    const isLastPage = ( props.count - ( page * 9 ) ) > 1 ? false : true

    function handleNextPage(){
        setPage( page + 1 );
        window.scrollTo(0, 0);
    };

    function handlePreviousPage(){
        setPage( page - 1);
        window.scrollTo(0, 0);
    }

    return(
        <div className="pagination">
            {!isLastPage && <Button type="button" classStyle="icon pagination--next" onclick={handleNextPage}><span><svg fill="currentColor" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path d="M64 448c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L178.8 256L41.38 118.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160c12.5 12.5 12.5 32.75 0 45.25l-160 160C80.38 444.9 72.19 448 64 448z"/></svg></span></Button>}
            {page !==1 && <Button type="button" classStyle="icon pagination--previous" onclick={handlePreviousPage}><span><svg fill="currentColor" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path d="M192 448c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l137.4 137.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448z"/></svg></span></Button>}
        </div>
    )

}

export default Pagination;