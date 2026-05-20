import { useParams } from "react-router-dom"

const MovieDetailPage=()=>{

    const params = useParams();;
    console.log(params)
    return <div>moviedetailpage</div>
}

export default MovieDetailPage