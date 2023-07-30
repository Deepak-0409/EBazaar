import { Link } from "react-router-dom";

const Pagination = ({path,page,perPage,count,theme}) =>
{
    const totalLinks = Math.ceil(count/perPage); 
    let startLoop = page;
    let diff = totalLinks-page;
    if(diff<=2)
    {
        startLoop = totalLinks-2;
    }
    let endLoop = startLoop + 2;
    if(startLoop<=0)
    {
        startLoop=1;
    }

    const links = () => {
        const allLinks = [];
        for(let i = startLoop; i<=endLoop; i++)
        {
            allLinks.push(
                <li className={`${theme==='light' ? 'pagination-li-light' : 'pagination-li'}`} key={i}>
                    <Link className={`${theme==="light" ? 'pagination-link-light'  : 'pagination-link'} ${(page === i && theme==="light") && 'bg-black-950 text-white'}  ${(page === i && theme!=="light") && 'bg-gray-400 text-gray-900'}`} to = {`/${path}${i}`}>{i}</Link>
                </li>
            )
        }
        return allLinks;
    }
    const next = () =>{
        if(page<totalLinks)
        {
            return <li className={`${theme==='light' ? 'pagination-li-light' : 'pagination-li'}`}><Link className={`${theme==='light' ? 'pagination-link-light' : 'pagination-link'}`} to ={`/${path}${page+1}`}><i className="fa-solid fa-chevron-right"></i></Link></li>
        }
    }
    const prev = () =>{
        if(page>1)
        {
            return <li className={`${theme==='light' ? 'pagination-li-light' : 'pagination-li'}`}><Link className={`${theme==='light' ? 'pagination-link-light' : 'pagination-link'}`} to ={`/${path}${page-1}`}><i className="fa-solid fa-chevron-left"></i></Link></li>
        }
    }
    return count >perPage && (
        <ul className="flex mt-2">
            {prev()}
            {links()}
            {next()}
        </ul>
    );
}

export default Pagination;