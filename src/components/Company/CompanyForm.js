import {useState, useEffect} from "react";
import { useHistory, useParams } from "react-router";
import * as CompanyServer from "./CompanyServer"


const CompanyForm = ()=> {
const history = useHistory();
const params = useParams();
// console.log(params);
const initialState = {id:0, name:"", foundation: 1950, website:""}
const [company, setCompany] = useState(initialState);
const handleInputChange = (e)=>{
    setCompany({...company,[e.target.name]:e.target.value});
}
const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        let res;
        res = await CompanyServer.registerCompanies(company);
        const data = await res.json();
        if(data.message === "success") {
            setCompany(initialState);
        }
        history.push("/");
        // console.log(data);
    } catch (error) {
        console.log(error);
    }
}

const getCompany = async (companyId) => {
    try {
        const res = await CompanyServer.getCompanies(companyId);
        const data = res.json();
        console.log(data);
    } catch (error) {
        console.log(error);
    }
};
    useEffect(() =>{
        if(params.id) {
            getCompany(params.id)
        }
    }, [params.id]);
    return(
    <div className="col-md-3 col-lg-3 col-sm-3 card mx-auto">
            <div className="card-header"><h2 className="mb-3 text-center card-title">New Company</h2></div>
        <div className="card-body">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <b><label className="form-label">Name</label></b>
                    <input type="email" minLength="2" maxLength="50" autoFocus required className="form-control" name="name" value={company.name} onChange={handleInputChange}></input>
                </div>
                <div className="mb-3">
                    <b><label className="form-label">Foundation year</label></b>
                    <input type="number" min="1950" max="2021"className="form-control" name="foundation" required value={company.foundation} onChange={handleInputChange}></input>
                </div>
                <div className="mb-3">
                    <b><label className="form-label">Url</label></b>
                    <input type="url" maxLength="100" className="form-control" name="website" required value={company.website} onChange={handleInputChange}></input>
                </div>

                <div className="d-grid gap-2"><button type="submit" className="btn btn-block btn-success">Save Company</button></div>
            </form>
        </div>
    </div>
    )
};
export default CompanyForm;