import { useState } from 'react'
import './App.css'

function App() {
  const [loading, setLoading] = useState(false)
  const [comments, setComments] = useState([])
  const [formData, setFormData] = useState({
    productName: '',
    commentType: '',
    commentCount: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    fetch('http://127.0.0.1:8000/api/create-fake-comments', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json()).then(res => {
      if (res?.error) {
        alert(res.error)
      } else {
        setComments(res.result)
      }
    }).finally(() => setLoading(false))
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const isDisabled = Object.values(formData).some(value => !value || loading)

  return (
    <div className='max-w-[1000px] mx-auto py-10'>
      <form onSubmit={handleSubmit} className='w-full flex mb-5 items-center gap-x-4'>
        <input onChange={handleChange} placeholder='Product Name' tpye='text' value={formData.productName} name='productName' className='h-10 rounded border border-zinc-300 outline-none px-4 text-sm flex-1' />
        <select onChange={handleChange} name='commentType' value={formData.commentType} className='appearance-none h-10 rounded border border-zinc-300 outline-none px-4 text-sm flex-auto'>
          <option value=''>Comment Type</option>
          <option value='Positive'>Positive</option>
          <option value='Negative'>Negative</option>
        </select>
        <input onChange={handleChange} placeholder='How many comments should be produced?' tpye='text' value={formData.commentCount} name='commentCount' className='h-10 rounded border border-zinc-300 outline-none px-4 text-sm flex-1' />
        <button disabled={isDisabled} type='submit' className='h-10 rounded bg-zinc-500 text-white px-4 text-sm disabled:opacity-50 disable:pointer-events-none'>Create Comment</button>
        {loading ?? <span className='text-zinc-500'>Creating Comments...</span>}

      </form>
      {comments.length > 0 && (
        <div className='grid gap-y-4'>
          {comments.map(({ comment, author }) => (
            <section className='p-4 rounded border border-zinc-300'>
              <header className='text-sm font-semibold border-b mb-2'>
                <h6 className='bg-blue-500 text-white py-2 px-3 inline rounded-md mb-15'>
                  {author}
                </h6>
              </header>
              <p className='text-sm'>
                {comment}
              </p>
            </section>
          ))}
        </div>
      )}

    </div>
  )
}

export default App;
