import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Octokit } from 'octokit'

function App() {
  const [count, setCount] = useState(0)
  const [commits, setCommits] = useState([])
  let owner = "coreybutler"
  let repo = "nvm-windows"

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


  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
        <button onClick={() => getCommits(owner, repo)}>
          Fetch Latest Commits
        </button>
        {commits.length > 0 && (
          <div style={{ marginTop: '1rem' }}>
            <h3>Latest Commits:</h3>
            <ul>
              {commits.slice(0, 5).map(commit => (
                <li key={commit.sha}>
                  <strong>{commit.commit.author.name}:</strong> {commit.commit.message}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  )
}

export default App
