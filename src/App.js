import React, {useState} from 'react';
import useFetchJobs from './useFetchJobs';
import {Container} from 'react-bootstrap';
import Job from './Job';
import JobsPagination from './JobsPagination';
import SearchFroms from './SearchFroms';

function App() {
  const [params, setParams] = useState({});
  const [page, setPage] = useState(1)

  const {jobs, loading, error, hasNextPage} = useFetchJobs(params, page)

  function handleParamsChange(e){
    const param = e.target.name
    const value = e.target.value
    setPage(1)
    setParams(prevParams => {
      return {...prevParams, [param] : value}
    })
  }

  return (
    <Container className="my-4">
      <h1 className="mb-4">Github Jobs</h1>
      <SearchFroms params={params} onParamsChange={handleParamsChange} />
      <JobsPagination page={page} setPage={setPage} hasNextPage={hasNextPage}/>
      {loading && <h1>Loading...</h1>}
      {error && <h1>Error. Try Refreshing</h1>}
      {jobs.map(job => {
        return <Job job={job} key={job.id}></Job>
      })}
      <JobsPagination page={page} setPage={setPage} hasNextPage={hasNextPage} />
    </Container>
  );
}

export default App;
