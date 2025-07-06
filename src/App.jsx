import { useState } from 'react'
import './App.css'
import { Octokit } from 'octokit'

function App() {
  const [commits, setCommits] = useState([])
  const [commit, setCommit] = useState("")
  const [owner, setOwner] = useState("")
  const [repo, setRepo] = useState("")
  const [ref, setRef] = useState("")

  const getCommits = async (owner = "nodejs", repo = "nvm-node") => {
    const octokit = new Octokit()

    const response = await octokit.request(`GET /repos/{owner}/{repo}/commits`, {
      owner: owner,
      repo: repo,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    })

    setCommits(response.data)
  }

  const getCommit = async (
      owner = "coreybutler", 
      repo = "nvm-windows", 
      ref = "9bee6e77e40a422f4e6d10f23ca3ab518f572f7b") => {
    const octokit = new Octokit()

    const response = await octokit.request('GET /repos/{owner}/{repo}/commits/{ref}', {
      owner: owner,
      repo: repo,
      ref: ref,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    })

    setCommit(JSON.stringify(response, null, 2))
  }

  return (
    <>
      <h1>Visualize My Code</h1>

      <div>
        Owner <input name="owner" onChange={(e)=>setOwner(e.target.value)}></input>
        Repo <input name="repo" onChange={(e)=>setRepo(e.target.value)}></input>
      </div>

      <div className="card">
        <button onClick={() => getCommits(owner, repo)}>
          Fetch Latest Commits
        </button>
        {commits.length > 0 && (
          <div style={{ marginTop: '1rem' }}>
            <h3>Latest Commits:</h3>
            <ul>
              {commits.slice(0, 5).map(commit => (
                <li key={commit.sha}>
                  <strong>{commit.commit.author.name}:</strong> {commit.sha} {commit.commit.message}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      Ref <input name="ref" onChange={(e)=>setRef(e.target.value)}></input>
      <button onClick={() => getCommit(owner, repo, ref)}>
        Fetch a commit
      </button>
      {commit !== "" && (<pre>{commit}</pre>)}
    </>
  )
}

export default App
