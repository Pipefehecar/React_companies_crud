import React, { useEffect, useState } from "react";
import * as CompanyServer from "./CompanyServer";

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);
  const listCompanies = async () => {
    try {
      const res = await CompanyServer.listCompanies();
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    listCompanies();
  }, []);
  return (
    <div>
      {companies.map((company) => (
        <h2>{company.name}</h2>
      ))}
    </div>
  );
};

export default CompanyList;
